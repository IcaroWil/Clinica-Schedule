'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthRoute = pathname === '/login' || pathname === '/register';

  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(!!localStorage.getItem('token'));
  }, [pathname]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === 'token') setAuthed(!!e.newValue);
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function logout() {
    localStorage.removeItem('token');
    setAuthed(false);
    router.replace('/login');
  }

  const LinkItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const active = pathname?.startsWith(href);
    return (
      <Link
        href={href}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          active ? 'bg-teal-700 text-white' : 'text-slate-700 hover:bg-slate-100'
        }`}
      >
        {children}
      </Link>
    );
  };

  if (isAuthRoute) return null;

  return (
    <header className="border-b bg-white">
      <nav className="container-page h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-teal-800">Clínica</Link>
          {authed && (
            <>
              <span className="text-slate-300">|</span>
              <LinkItem href="/appointments">Agendamentos</LinkItem>
              <LinkItem href="/patients">Pacientes</LinkItem>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {authed ? (
            <button onClick={logout} className="btn-ghost">Sair</button>
          ) : (
            <>
              <Link href="/login" className="btn-ghost">Login</Link>
              <Link href="/register" className="btn-primary">Cadastrar</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
