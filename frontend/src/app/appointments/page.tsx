'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import AppointmentForm from '@/components/AppointmentForm';
import { TableSkeleton } from '@/components/Skeleton';
import ConfirmDialog from '@/components/ConfirmDialog';

type Patient = { id: number; name: string };
type Appointment = {
  id: number;
  patient_id: number;
  start_at: string;
  end_at: string;
  status?: string;
  notes?: string;
  patient?: Patient;
};

const statusMap: Record<string, string> = {
  scheduled: "Agendado",
  completed: "Concluído",
  cancelled: "Cancelado",
};

export default function AppointmentsPage() {
  const router = useRouter();
  const [list, setList] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [date, setDate] = useState<string>('');
  const [err, setErr] = useState('');
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [pendingStatus, setPendingStatus] = useState<{ id: number; status: string } | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace('/login');
      return;
    }
    fetchPatients();
    fetchList();
  }, []);

  async function fetchPatients() {
    const { data } = await api.get('/patients', { params: { per_page: 999 } });
    setPatients((data.data ?? data).map((p: any) => ({ id: p.id, name: p.name })));
  }

  async function fetchList() {
    setLoading(true);
    setErr('');
    try {
      const { data } = await api.get('/appointments', { params: { date: date || undefined } });
      setList(data.data ?? data);
    } catch (e) {
      setErr('Erro ao listar agendamentos');
    } finally {
      setLoading(false);
    }
  }

  async function createAppointment(data: any) {
    setSubmitting(true);
    setErr('');
    try {
      const fix = (s: string) => s.replace('T', ' ') + ':00';
      data.start_at = fix(data.start_at);
      data.end_at = fix(data.end_at);
      await api.post('/appointments', data);
      setCreating(false);
      fetchList();
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? 'Erro ao criar (conflito?)');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleConfirmRemove() {
    if (!confirmId) return;
    await api.delete(`/appointments/${confirmId}`);
    setList(prev => prev.filter(a => a.id !== confirmId));
    setConfirmId(null);
  }
  
  async function updateStatus(id: number, status: string) {
    try {
      if (status === 'completed' || status === 'cancelled') {
        await api.delete(`/appointments/${id}`);
        setList(prev => prev.filter(a => a.id !== id));
      } else {
        await api.patch(`/appointments/${id}`, { status });
        setList(prev =>
          prev.map(a => (a.id === id ? { ...a, status } : a))
        );
      }
    } catch {
      setErr('Erro ao atualizar ou remover agendamento');
    }
  }

  async function handleConfirmStatusChange() {
    if (!pendingStatus) return;
    await updateStatus(pendingStatus.id, pendingStatus.status);
    setPendingStatus(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-teal-800">Agendamentos</h1>
          <p className="text-sm text-slate-600">Gerencie os horários do dia e crie novos agendamentos.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <input
            type="date"
            className="input w-full sm:w-44"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="btn-ghost" onClick={fetchList}>Filtrar</button>
          <button className="btn-primary" onClick={() => setCreating(v => !v)}>
            {creating ? 'Cancelar' : 'Novo agendamento'}
          </button>
        </div>
      </div>

      {creating && (
        <div className="card">
          <div className="card-body">
            <AppointmentForm patients={patients} onSubmit={createAppointment} submitting={submitting} />
          </div>
        </div>
      )}

      {loading ? (
        <div><TableSkeleton rows={6} /></div>
      ) : (
        <div className="card">
          <div className="card-body p-0">
            {list.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-600">
                Nenhum agendamento encontrado. Filtre por outra data ou crie um novo.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Paciente</th>
                      <th>Início</th>
                      <th>Fim</th>
                      <th>Status</th>
                      <th className="w-32"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map(a => (
                      <tr key={a.id}>
                        <td>{a.patient?.name ?? patients.find(p => p.id === a.patient_id)?.name ?? a.patient_id}</td>
                        <td>{a.start_at?.replace('T', ' ').replace('Z', '')}</td>
                        <td>{a.end_at?.replace('T', ' ').replace('Z', '')}</td>
                        <td>
                          <select
                            value={a.status ?? 'scheduled'}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              if (newStatus === 'completed' || newStatus === 'cancelled') {
                                setPendingStatus({ id: a.id, status: newStatus });
                              } else {
                                updateStatus(a.id, newStatus);
                              }
                            }}
                            className="input text-sm"
                          >
                            <option value="scheduled">Agendado</option>
                            <option value="completed">Concluído</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => setConfirmId(a.id)}
                            className="btn-danger px-2 text-xs"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {err && <p className="text-red-600 text-sm">{err}</p>}

      <ConfirmDialog
        open={!!confirmId}
        title="Excluir agendamento"
        message="Tem certeza que deseja excluir este agendamento?"
        onCancel={() => setConfirmId(null)}
        onConfirm={handleConfirmRemove}
      />

      <ConfirmDialog
        open={!!pendingStatus}
        title={`Marcar como ${pendingStatus?.status === 'completed' ? 'Concluído' : 'Cancelado'}`}
        message={`Tem certeza que deseja marcar este agendamento como ${statusMap[pendingStatus?.status ?? ''] }? Isso vai removê-lo do sistema.`}
        onCancel={() => setPendingStatus(null)}
        onConfirm={handleConfirmStatusChange}
      />
    </div>
  );
}
