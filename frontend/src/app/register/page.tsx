'use client';

import { FormEvent, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Alert from '@/components/Alert';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    crm: '',
    phone: ''
  });
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  useEffect(() => {
    if (getToken()) router.replace('/appointments');
  }, [router]);

  function onChange(e: any) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr('');
    setOk('');

    if (form.password.length < 6) {
      setErr('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setErr('Digite um e-mail válido.');
      return;
    }

    if (form.phone && form.phone.length < 11) {
      setErr('O telefone deve ter 11 dígitos (DDD + número).');
      return;
    }

    try {
      await api.post('/register', form);
      router.replace('/login?registered=1');
    } catch (e: any) {
      let msg = e?.response?.data?.message ?? 'Erro ao registrar. Verifique os campos.';

      if (msg.includes('password') && msg.includes('at least 6')) {
        msg = 'A senha deve ter no mínimo 6 caracteres.';
      } else if (msg.includes('email') && msg.includes('taken')) {
        msg = 'Este e-mail já está em uso.';
      } else if (msg.toLowerCase().includes('crm')) {
        msg = 'O CRM informado não é válido.';
      }

      setErr(msg);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="card">
        <div className="card-body space-y-4">
          <h1 className="text-xl font-semibold text-teal-800">Cadastro do Médico</h1>

          {err && <Alert type="error">{err}</Alert>}
          {ok && <Alert type="success">{ok}</Alert>}

          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="label">Nome</label>
              <input
                name="name"
                className="input"
                value={form.name}
                onChange={onChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">E-mail</label>
              <input
                name="email"
                type="email"
                className="input"
                value={form.email}
                onChange={onChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Senha</label>
              <input
                name="password"
                type="password"
                className="input"
                value={form.password}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="label">Especialidade</label>
              <input
                name="specialty"
                className="input"
                value={form.specialty}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="label">CRM</label>
              <input
                name="crm"
                className="input"
                value={form.crm}
                onChange={onChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Telefone</label>
              <input
                name="phone"
                className="input"
                value={form.phone}
                onChange={onChange}
              />
            </div>

            <div className="sm:col-span-2 flex gap-2 pt-2">
              <button className="btn-primary flex-1">Cadastrar</button>
              <a href="/login" className="btn-ghost flex-1 text-center">
                Voltar ao login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
