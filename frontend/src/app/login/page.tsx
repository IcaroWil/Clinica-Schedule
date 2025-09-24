'use client';

import { Suspense } from 'react';
import { useState, FormEvent, useEffect } from 'react';
import { api } from '@/lib/api';
import { setToken, getToken } from '@/lib/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Alert from '@/components/Alert';

export const dynamic = 'force-dynamic';

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const registered = params.get('registered') === '1';

  useEffect(() => { if (getToken()) router.replace('/appointments'); }, [router]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      const { data } = await api.post('/login', { email, password });
      setToken(data.token);
      router.replace('/appointments');
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? 'Falha ao autenticar');
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <div className="card-body space-y-4">
          <h1 className="text-xl font-semibold text-teal-800">Login do Médico</h1>

          {registered && <Alert type="success">Cadastro realizado! Entre com suas credenciais.</Alert>}
          {err && <Alert type="error">{err}</Alert>}

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="label">E-mail</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">Senha</label>
              <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <button className="btn-primary w-full">Entrar</button>
          </form>

          <div className="text-sm text-slate-600">
            Não tem conta? <a href="/register" className="text-teal-700 hover:underline">Cadastre-se</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
