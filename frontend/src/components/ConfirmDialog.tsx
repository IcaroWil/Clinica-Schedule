'use client';

import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }: Props) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 animate-fadeIn">
        <h2 className="text-lg font-bold mb-2">{title ?? 'Confirmar ação'}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {message ?? 'Tem certeza que deseja continuar?'}
        </p>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
