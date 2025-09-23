<?php

namespace App\Infrastructure\Persistence;

use App\Domain\Appointments\Contracts\AppointmentRepositoryInterface;
use App\Models\Appointment;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentAppointmentRepository implements AppointmentRepositoryInterface
{
    public function paginateForDoctor(int $doctorId, array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $q = Appointment::with('patient')
            ->where('doctor_id', $doctorId)
            ->orderBy('start_at');

        if (!empty($filters['date'])) {
            $q->whereDate('start_at', $filters['date']);
        }
        if (!empty($filters['patient_id'])) {
            $q->where('patient_id', $filters['patient_id']);
        }

        return $q->paginate($perPage);
    }

    public function findForDoctor(int $doctorId, int $id): ?Appointment
    {
        return Appointment::where('doctor_id', $doctorId)
            ->where('id', $id)
            ->first();
    }

    public function createForDoctor(int $doctorId, array $data): Appointment
    {
        $data['doctor_id'] = $doctorId;
        return Appointment::create($data);
    }

    public function updateForDoctor(Appointment $appointment, array $data): Appointment
    {
        $appointment->update($data);
        return $appointment->refresh();
    }

    public function deleteForDoctor(Appointment $appointment): void
    {
        $appointment->delete();
    }

    public function existsOverlap(int $doctorId, string $start, string $end, ?int $ignoreId = null): bool
    {
        $q = Appointment::where('doctor_id', $doctorId)
            ->where(function ($qq) use ($start, $end) {
                $qq->whereBetween('start_at', [$start, $end])
                   ->orWhereBetween('end_at', [$start, $end])
                   ->orWhere(function ($q2) use ($start, $end) {
                       $q2->where('start_at', '<=', $start)
                          ->where('end_at', '>=', $end);
                   });
            });

        if ($ignoreId) {
            $q->where('id', '<>', $ignoreId);
        }

        return $q->exists();
    }
}
