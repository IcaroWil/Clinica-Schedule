<?php

namespace App\Policies;

use App\Models\Patient;
use App\Models\User;

class PatientPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Patient $patient): bool
    {
        return $patient->doctor_id === $user->id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Patient $patient): bool
    {
        return $patient->doctor_id === $user->id;
    }

    public function delete(User $user, Patient $patient): bool
    {
        return $patient->doctor_id === $user->id;
    }

    public function restore(User $user, Patient $patient): bool
    {
        return $patient->doctor_id === $user->id;
    }

    public function forceDelete(User $user, Patient $patient): bool
    {
        return $patient->doctor_id === $user->id;
    }
}
