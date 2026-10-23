/**
 * Envoi des formulaires via Netlify Forms.
 *
 * Netlify détecte les formulaires dans les fichiers HTML statiques au moment du déploiement :
 * leur structure est déclarée dans /public/__forms.html (mêmes noms de formulaires et de champs).
 * Les données sont ensuite envoyées en AJAX vers ce fichier.
 */

export type FormName = 'contact' | 'devis' | 'assistant';

export async function submitNetlifyForm(formName: FormName, fields: Record<string, string>): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    // `npm run dev` ne connaît pas Netlify Forms : on simule l'envoi pour tester l'interface.
    console.info(`[Netlify Forms] Formulaire « ${formName} » (simulation locale)`, fields);
    await new Promise((resolve) => setTimeout(resolve, 700));
    return;
  }

  const response = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ 'form-name': formName, ...fields }).toString(),
  });

  if (!response.ok) {
    throw new Error(`Envoi du formulaire « ${formName} » impossible (HTTP ${response.status})`);
  }
}

/** Convertit un FormData en objet de chaînes (les cases à cocher multiples sont jointes par des virgules). */
export function formDataToFields(formData: FormData): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const key of new Set(formData.keys())) {
    fields[key] = formData
      .getAll(key)
      .filter((value): value is string => typeof value === 'string')
      .map((value) => value.trim())
      .filter(Boolean)
      .join(', ');
  }
  return fields;
}
