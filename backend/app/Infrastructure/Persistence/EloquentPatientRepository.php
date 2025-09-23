<?php

namespace App\Infrastructure\Persistence;

use App\Domain\Patients\Contracts\PatientRepositoryInterface;
use App\Models\Patient;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentPatientRepository implements PatientRepositoryInterface
{
    public function paginateForDoctor(int $doctorId, int $perPage = 15): LengthAwarePaginator
    {
        return Patient::where('doctor_id', $doctorId)->latest()->paginate($perPage);
    }

    public function findForDoctor(int $doctorId, int $id): ?Patient
    {
        return Patient::where('doctor_id', $doctorId)->where('id', $id)->first();
    }

    public function createForDoctor(int $doctorId, array $data): Patient
    {
        $data['doctor_id'] = $doctorId;
        return Patient::create($data);
    }

    public function updateForDoctor(Patient $patient, array $data): Patient
    {
        $patient->update($data);
        return $patient->refresh();
    }

    public function deleteForDoctor(Patient $patient): void
    {
        $patient->delete();
    }
}
