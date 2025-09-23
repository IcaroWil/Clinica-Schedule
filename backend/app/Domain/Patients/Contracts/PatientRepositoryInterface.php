<?php

namespace App\Domain\Patients\Contracts;

use App\Models\Patient;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface PatientRepositoryInterface {
    public function paginateForDoctor(int $doctorId, int $perPage = 15): LengthAwarePaginator;
    public function findForDoctor(int $doctorId, int $id): ?Patient;
    public function createForDoctor(int $doctorId, array $data): Patient;
    public function updateForDoctor(Patient $patient, array $data): Patient;
    public function deleteForDoctor(Patient $patient): void;
}