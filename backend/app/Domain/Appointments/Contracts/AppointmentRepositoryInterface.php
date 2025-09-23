<?php

namespace App\Domain\Appointments\Contracts;

use App\Models\Appointment;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface AppointmentRepositoryInterface {
    public function paginateForDoctor(int $doctorId, array $filters = [], int $perPage = 15): LengthAwarePaginator;
    public function findForDoctor(int $doctorId, int $id): ?Appointment;
    public function createForDoctor(int $doctorId, array $data): Appointment;
    public function updateForDoctor(Appointment $appointment, array $data): Appointment;
    public function deleteForDoctor(Appointment $appointment): void;
    public function existsOverlap(int $doctorId, string $start, string $end, ?int $ignoreId = null): bool;
}