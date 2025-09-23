<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\AppointmentController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::apiResource('patients', PatientController::class);

    Route::apiResource('appointments', AppointmentController::class)
        ->only(['index','store','show','update','destroy']);

    Route::get('doctor/appointments', [AppointmentController::class, 'index']);
});
