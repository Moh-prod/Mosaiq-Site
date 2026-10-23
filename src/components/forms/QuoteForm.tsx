import { LoaderCircle, Lock, Send } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState, type FormEvent } from 'react';
import type { Offer } from '@/data/offers';
import { useNetlifyForm } from '@/hooks/useNetlifyForm';
import { onSelectQuote, type QuoteSelection } from '@/lib/events';
import { formatPrice } from '@/lib/format';
import { formDataToFields } from '@/lib/forms';
import { FormError, FormSuccess, Honeypot, SelectField, TextArea, TextField, firstName } from './Fields';
import f from './Form.module.css';

const SERVICE_OPTIONS = [
  { slug: 'sites-web', label: 'Site web vitrine' },
  { slug: 'motion-design', label: 'Vidéo motion-design / UGC' },
  { slug: 'integration-ia', label: 'Chatbot / automatisation IA' },
  { slug: 'autre', label: 'Autre besoin' },
];

const BUDGETS = [
  'Moins de 50 000 F CFA',
  'De 50 000 à 150 000 F CFA',
  'De 150 000 à 300 000 F CFA',
  'Plus de 300 000 F CFA',
  'Je ne sais pas encore',
];

const DEADLINES = ['Dès que possible', 'Dans les 2 semaines', 'Dans le mois', 'Pas de date précise'];

const offerLabel = (offer: Offer) => `${offer.name} — ${formatPrice(offer.price)}`;

export default function QuoteForm({ offers }: { offers: Offer[] }) {
  const router = useRouter();
  const { status, submit, reset } = useNetlifyForm('devis');
  const [services, setServices] = useState<string[]>([]);
  const [offerId, setOfferId] = useState('');
  const [sent, setSent] = useState({ name: '', summary: '' });

  // Pré-sélection d'une offre ou d'un service (bouton « Choisir cette offre », lien depuis une page service…).
  useEffect(() => {
    const apply = ({ offer, service }: QuoteSelection) => {
      const matchedOffer = offers.find((item) => item.id === offer);
      if (matchedOffer) {
        setOfferId(matchedOffer.id);
        setServices(matchedOffer.services);
      }
      if (service && SERVICE_OPTIONS.some((option) => option.slug === service)) {
        setServices((current) => (current.includes(service) ? current : [...current, service]));
      }
    };

    const params = new URLSearchParams(window.location.search);
    apply({ offer: params.get('offre') ?? undefined, service: params.get('service') ?? undefined });

    // Arrivée depuis une autre page : on s'assure d'afficher le formulaire.
    let timer: number | undefined;
    if (window.location.hash === '#devis') {
      timer = window.setTimeout(() => document.getElementById('devis')?.scrollIntoView({ block: 'start' }), 80);
    }
    const unsubscribe = onSelectQuote(apply);
    return () => {
      unsubscribe();
      window.clearTimeout(timer);
    };
  }, [offers, router.asPath]);

  const toggleService = (slug: string) =>
    setServices((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]));

  const onOfferChange = (id: string) => {
    setOfferId(id);
    const offer = offers.find((item) => item.id === id);
    if (offer) setServices((current) => Array.from(new Set([...current, ...offer.services])));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = formDataToFields(new FormData(form));
    const offer = offers.find((item) => item.id === fields.offer);
    fields.offer = offer ? offerLabel(offer) : fields.offer || 'Pas encore choisie';

    setSent({
      name: fields.name ?? '',
      summary: [
        'Bonjour MOSAIQ, je viens de demander un devis sur votre site.',
        `Nom : ${fields.name}`,
        fields.services && `Besoin : ${fields.services}`,
        `Offre : ${fields.offer}`,
        fields.message && `Projet : ${fields.message}`,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    if (await submit(fields)) {
      form.reset();
      setServices([]);
      setOfferId('');
    }
  }

  if (status === 'success') {
    return (
      <FormSuccess
        title={`Merci ${firstName(sent.name)} !`}
        text="Votre demande de devis est bien reçue. Nous l'étudions et revenons vers vous très vite avec une proposition adaptée."
        whatsappMessage={sent.summary}
        onReset={reset}
        resetLabel="Nouvelle demande"
      />
    );
  }

  return (
    <form className={f.form} onSubmit={onSubmit} aria-label="Formulaire de demande de devis">
      <Honeypot />
      <div className={f.row}>
        <TextField label="Nom complet" name="name" autoComplete="name" placeholder="Ex. Moussa Diarra" />
        <TextField label="Entreprise" name="company" autoComplete="organization" placeholder="Nom de votre activité" optional />
      </div>
      <div className={f.row}>
        <TextField label="Téléphone / WhatsApp" name="phone" type="tel" autoComplete="tel" placeholder="+223 …" />
        <TextField label="E-mail" name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" optional />
      </div>

      <fieldset className={f.fieldset}>
        <legend className={f.legend}>
          Services souhaités <span className={f.optional}>(plusieurs choix possibles)</span>
        </legend>
        <div className={f.chips}>
          {SERVICE_OPTIONS.map((option) => (
            <label key={option.slug} className={f.chip}>
              <input
                type="checkbox"
                name="services"
                value={option.label}
                checked={services.includes(option.slug)}
                onChange={() => toggleService(option.slug)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={f.row}>
        <SelectField label="Offre qui vous intéresse" name="offer" value={offerId} onChange={(event) => onOfferChange(event.target.value)} optional>
          <option value="">Je ne sais pas encore</option>
          {offers.map((offer) => (
            <option key={offer.id} value={offer.id}>
              {offerLabel(offer)}
            </option>
          ))}
          <option value="Projet sur mesure">Projet sur mesure</option>
        </SelectField>
        <SelectField label="Budget estimé" name="budget" defaultValue="" optional>
          <option value="">Choisir…</option>
          {BUDGETS.map((budget) => (
            <option key={budget}>{budget}</option>
          ))}
        </SelectField>
      </div>

      <SelectField label={'Pour quand ?'} name="deadline" defaultValue="" optional>
        <option value="">Choisir…</option>
        {DEADLINES.map((deadline) => (
          <option key={deadline}>{deadline}</option>
        ))}
      </SelectField>

      <TextArea
        label="Décrivez votre projet"
        name="message"
        rows={5}
        placeholder="Votre activité, vos objectifs, vos idées… Plus vous êtes précis, plus le devis sera juste."
      />

      {status === 'error' && <FormError fallbackMessage={sent.summary} />}

      <button type="submit" className={`btn btn--primary btn--lg ${f.submit}`} disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <LoaderCircle className={f.spin} aria-hidden="true" />
            Envoi en cours…
          </>
        ) : (
          <>
            Recevoir mon devis gratuit
            <Send aria-hidden="true" />
          </>
        )}
      </button>
      <p className={f.privacy}>
        <Lock aria-hidden="true" />
        Devis gratuit et sans engagement. Vos informations servent uniquement à préparer votre proposition.
      </p>
    </form>
  );
}
