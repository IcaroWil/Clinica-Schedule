<?php

namespace App\Application\Appointments;

use App\Domain\Appointments\Contracts\AppointmentRepositoryInterface;
use Illuminate\Validation\ValidationException;

class CreateAppointmentService {
    public function __construct(private AppointmentRepositoryInterface $repo) {}

    public function handle(int $doctorId, array $data) {
        if ($this->repo->existsOverlap($doctorId, $data['start_at'], $data['end_at'])) {
            throw ValidationException::withMessages([
                'start_at' => 'Conflito: já existe consulta nesse intervalo',
            ])
        }
        return $this->repo->createForDoctor($doctorId, $data);
    }
}