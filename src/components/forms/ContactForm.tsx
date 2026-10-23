import { LoaderCircle, Lock, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useNetlifyForm } from '@/hooks/useNetlifyForm';
import { formDataToFields } from '@/lib/forms';
import { FormError, FormSuccess, Honeypot, TextArea, TextField, firstName } from './Fields';
import f from './Form.module.css';

export default function ContactForm() {
  const { status, submit, reset } = useNetlifyForm('contact');
  const [sent, setSent] = useState({ name: '', message: '' });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = formDataToFields(new FormData(form));
    setSent({ name: fields.name ?? '', message: fields.message ?? '' });
    if (await submit(fields)) form.reset();
  }

  const whatsappMessage = `Bonjour MOSAIQ, je suis ${sent.name}.\n${sent.message}`;

  if (status === 'success') {
    return (
      <FormSuccess
        title={`Merci ${firstName(sent.name)} !`}
        text="Votre message est bien arrivé. Nous vous répondons très vite, par e-mail ou par téléphone."
        whatsappMessage={whatsappMessage}
        onReset={reset}
      />
    );
  }

  return (
    <form className={f.form} onSubmit={onSubmit} aria-label="Formulaire de contact">
      <Honeypot />
      <div className={f.row}>
        <TextField label="Nom complet" name="name" autoComplete="name" placeholder="Ex. Moussa Diarra" />
        <TextField label="E-mail" name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" />
      </div>
      <TextField label="Téléphone / WhatsApp" name="phone" type="tel" autoComplete="tel" placeholder="+223 …" optional />
      <TextArea label="Votre message" name="message" rows={5} placeholder="Bonjour, je souhaite…" />

      {status === 'error' && <FormError fallbackMessage={whatsappMessage} />}

      <button type="submit" className={`btn btn--primary btn--lg ${f.submit}`} disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <LoaderCircle className={f.spin} aria-hidden="true" />
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer le message
            <Send aria-hidden="true" />
          </>
        )}
      </button>
      <p className={f.privacy}>
        <Lock aria-hidden="true" />
        Vos informations servent uniquement à vous répondre. Elles ne sont jamais partagées.
      </p>
    </form>
  );
}
