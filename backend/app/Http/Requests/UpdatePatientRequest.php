<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePatientRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'       => ['sometimes', 'string', 'max:255'],
            'email'      => ['sometimes', 'nullable', 'email', 'max:255'],
            'phone'      => ['sometimes', 'nullable', 'string', 'max:30'],
            'birth_date' => ['sometimes', 'nullable', 'date'],
            'notes'      => ['sometimes', 'nullable', 'string'],
        ];
    }
}
