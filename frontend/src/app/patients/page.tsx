'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import PatientForm from '@/components/PatientForm';
import { TableSkeleton } from '@/components/Skeleton';
import ConfirmDialog from '@/components/ConfirmDialog';

type Patient = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  birth_date?: string;
  notes?: string;
};

export default function PatientsPage() {
  const router = useRouter();
  const [list, setList] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState('');
  const [confirmId, setConfirmId] = useState<number | null>(null);

  useEffect(() => {
    if (!getToken()) router.replace('/login');
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    setErr('');
    try {
      const { data } = await api.get('/patients', { params: { per_page: 999 } });
      setList(data.data ?? data);
    } catch {
      setErr('Erro ao listar pacientes');
    } finally {
      setLoading(false);
    }
  }

  async function createPatient(data: any) {
    setSubmitting(true);
    setErr('');
    try {
      await api.post('/patients', data);
      setCreating(false);
      fetchList();
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? 'Erro ao criar');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleConfirmRemove() {
    if (!confirmId) return;
    await api.delete(`/patients/${confirmId}`);
    setList(prev => prev.filter(p => p.id !== confirmId));
    setConfirmId(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-teal-800">Pacientes</h1>
          <p className="text-sm text-slate-600">Cadastro e gerenciamento de pacientes do médico.</p>
        </div>
        <button className="btn-primary" onClick={() => setCreating(v => !v)}>
          {creating ? 'Cancelar' : 'Novo paciente'}
        </button>
      </div>

      {creating && (
        <div className="card">
          <div className="card-body">
            <PatientForm onSubmit={createPatient} submitting={submitting} />
          </div>
        </div>
      )}

      {loading ? (
        <TableSkeleton rows={6} />
      ) : (
        <div className="card">
          <div className="card-body p-0">
            {list.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-600">
                Nenhum paciente cadastrado. Clique em “Novo paciente” para começar.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>E-mail</th>
                      <th>Telefone</th>
                      <th className="w-24"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map(p => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.email}</td>
                        <td>{p.phone}</td>
                        <td>
                            <button
                                onClick={() => setConfirmId(p.id)}
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
        title="Excluir paciente"
        message="Tem certeza que deseja excluir este paciente?"
        onCancel={() => setConfirmId(null)}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
}
