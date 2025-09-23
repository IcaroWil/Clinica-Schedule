<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppointmentRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'patient_id' => ['required', 'integer', 'exists:patients,id'],
            'start_at'   => ['required', 'date_format:Y-m-d H:i:s'],
            'end_at'     => ['required', 'date_format:Y-m-d H:i:s', 'after:start_at'],
            'status'     => ['nullable', 'in:scheduled,completed,cancelled'],
            'notes'      => ['nullable', 'string'],
        ];
    }
}
