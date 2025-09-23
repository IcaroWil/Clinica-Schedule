<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'patient_id' => $this->patient_id,
            'start_at'   => $this->start_at?->format('Y-m-d H:i:s'),
            'end_at'     => $this->end_at?->format('Y-m-d H:i:s'),
            'status'     => $this->status,
            'notes'      => $this->notes,
            'patient'    => new PatientResource($this->whenLoaded('patient')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
