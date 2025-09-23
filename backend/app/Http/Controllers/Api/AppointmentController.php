<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Domain\Appointments\Contracts\AppointmentRepositoryInterface;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AppointmentController extends Controller
{
    public function __construct(private AppointmentRepositoryInterface $appointments) {}

    public function index(Request $request)
    {
        $doctorId = $request->user()->id;
        $filters  = [
            'date'       => $request->query('date'),
            'patient_id' => $request->query('patient_id'),
        ];
        $perPage = (int) $request->query('per_page', 15);

        $data = $this->appointments->paginateForDoctor($doctorId, $filters, $perPage);
        return AppointmentResource::collection($data);
    }

    public function store(StoreAppointmentRequest $request)
    {
        $doctorId = $request->user()->id;
        $data     = $request->validated();
        
        if ($this->appointments->existsOverlap($doctorId, $data['start_at'], $data['end_at'])) {
            throw new HttpException(422, 'Conflito de horário com outro agendamento.');
        }

        $appt = $this->appointments->createForDoctor($doctorId, $data);
        $appt->load('patient');

        return new AppointmentResource($appt);
    }

    public function show(Request $request, int $id)
    {
        $doctorId = $request->user()->id;
        $appt     = $this->appointments->findForDoctor($doctorId, $id);
        abort_if(!$appt, 404);

        $appt->load('patient');
        return new AppointmentResource($appt);
    }

    public function update(UpdateAppointmentRequest $request, int $id)
    {
        $doctorId = $request->user()->id;
        $appt     = $this->appointments->findForDoctor($doctorId, $id);
        abort_if(!$appt, 404);

        $data = $request->validated();

        $start = $data['start_at'] ?? $appt->start_at->format('Y-m-d H:i:s');
        $end   = $data['end_at']   ?? $appt->end_at->format('Y-m-d H:i:s');

        if ($this->appointments->existsOverlap($doctorId, $start, $end, $appt->id)) {
            throw new HttpException(422, 'Conflito de horário com outro agendamento.');
        }

        $appt = $this->appointments->updateForDoctor($appt, $data);
        $appt->load('patient');

        return new AppointmentResource($appt);
    }

    public function destroy(Request $request, int $id)
    {
        $doctorId = $request->user()->id;
        $appt     = $this->appointments->findForDoctor($doctorId, $id);
        abort_if(!$appt, 404);

        $this->appointments->deleteForDoctor($appt);
        return response()->noContent();
    }
}
