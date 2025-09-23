export default function Alert({ type='info', children }: { type?: 'info'|'success'|'error'; children: React.ReactNode}) {
    const map = {
      info:    'bg-slate-50 text-slate-700 border-slate-200',
      success: 'bg-green-50 text-green-700 border-green-200',
      error:   'bg-red-50 text-red-700 border-red-200',
    } as const;
    return <div className={`border rounded-md px-3 py-2 text-sm ${map[type]}`}>{children}</div>;
  }
  