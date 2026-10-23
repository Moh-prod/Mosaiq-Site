import { useState } from 'react';
import { submitNetlifyForm, type FormName } from '@/lib/forms';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/** État d'envoi d'un formulaire Netlify (envoi, succès, erreur). */
export function useNetlifyForm(formName: FormName) {
  const [status, setStatus] = useState<FormStatus>('idle');

  async function submit(fields: Record<string, string>): Promise<boolean> {
    setStatus('submitting');
    try {
      await submitNetlifyForm(formName, fields);
      setStatus('success');
      return true;
    } catch (error) {
      console.error(error);
      setStatus('error');
      return false;
    }
  }

  return { status, submit, reset: () => setStatus('idle') };
}
