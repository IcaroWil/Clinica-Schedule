'use client';

import { useForm } from 'react-hook-form';

type Props = {
  patients: { id: number; name: string }[];
  initial?: any;
  onSubmit: (data: any) => Promise<void>;
  submitting?: boolean;
};

export default function AppointmentForm({ patients, initial, onSubmit, submitting }: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: initial ?? {
      patient_id: patients[0]?.id ?? '',
      start_at: '',
      end_at: '',
      status: 'scheduled',
      notes: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="label">Paciente</label>
        <select className="input" {...register('patient_id', { required: true })}>
          {patients.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="label">Início</label>
          <input className="input" type="datetime-local" {...register('start_at', { required: true })} />
        </div>
        <div>
          <label className="label">Fim</label>
          <input className="input" type="datetime-local" {...register('end_at', { required: true })} />
        </div>
      </div>

      <div>
        <label className="label">Status</label>
        <select className="input" {...register('status')}>
          <option value="scheduled">Agendado</option>
          <option value="completed">Concluído</option>
          <option value="cancelled">Cancelado</option>
        </select>
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
