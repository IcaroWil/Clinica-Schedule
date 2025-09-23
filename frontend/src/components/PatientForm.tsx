'use client';

import { useForm } from 'react-hook-form';

type Props = {
  initial?: any;
  onSubmit: (data: any) => Promise<void>;
  submitting?: boolean;
};

export default function PatientForm({ initial, onSubmit, submitting }: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: initial ?? { name: '', email: '', phone: '', birth_date: '', notes: '' }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="label">Nome</label>
        <input className="input" {...register('name', { required: true })} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="label">E-mail</label>
          <input className="input" {...register('email')} />
        </div>
        <div>
          <label className="label">Telefone</label>
          <input className="input" {...register('phone')} />
        </div>
      </div>

      <div>
        <label className="label">Nascimento</label>
        <input type="date" className="input" {...register('birth_date')} />
      </div>

      <div>
        <label className="label">Observações</label>
        <textarea className="input" rows={3} {...register('notes')} />
      </div>

      <button disabled={!!submitting} className="btn-primary">
        {submitting ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
}
