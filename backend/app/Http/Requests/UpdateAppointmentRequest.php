<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAppointmentRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'patient_id' => ['sometimes', 'integer', 'exists:patients,id'],
            'start_at'   => ['sometimes', 'date_format:Y-m-d H:i:s'],
            'end_at'     => ['sometimes', 'date_format:Y-m-d H:i:s', 'after:start_at'],
            'status'     => ['sometimes', 'in:scheduled,completed,cancelled'],
            'notes'      => ['sometimes', 'nullable', 'string'],
        ];
    }
}
