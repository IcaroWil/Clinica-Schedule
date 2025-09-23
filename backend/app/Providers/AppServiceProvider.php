<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Domain\Patients\Contracts\PatientRepositoryInterface;
use App\Domain\Appointments\Contracts\AppointmentRepositoryInterface;
use App\Infrastructure\Persistence\EloquentPatientRepository;
use App\Infrastructure\Persistence\EloquentAppointmentRepository;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(PatientRepositoryInterface::class, EloquentPatientRepository::class);
        $this->app->bind(AppointmentRepositoryInterface::class, EloquentAppointmentRepository::class);
    }

    public function boot(): void {}
}
