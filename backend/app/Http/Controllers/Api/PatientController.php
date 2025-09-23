<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Http\Resources\PatientResource;
use App\Domain\Patients\Contracts\PatientRepositoryInterface;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function __construct(private PatientRepositoryInterface $patients) {}

    public function index(Request $request)
    {
        $doctorId = $request->user()->id;
        $perPage  = (int) ($request->query('per_page', 15));
        $data     = $this->patients->paginateForDoctor($doctorId, $perPage);
        return PatientResource::collection($data);
    }

    public function store(StorePatientRequest $request)
    {
        $doctorId = $request->user()->id;
        $patient  = $this->patients->createForDoctor($doctorId, $request->validated());
        return new PatientResource($patient);
    }

    public function show(Request $request, int $id)
    {
        $doctorId = $request->user()->id;
        $patient  = $this->patients->findForDoctor($doctorId, $id);
        abort_if(!$patient, 404);
        return new PatientResource($patient);
    }

    public function update(UpdatePatientRequest $request, int $id)
    {
        $doctorId = $request->user()->id;
        $patient  = $this->patients->findForDoctor($doctorId, $id);
        abort_if(!$patient, 404);

        $patient = $this->patients->updateForDoctor($patient, $request->validated());
        return new PatientResource($patient);
    }

    public function destroy(Request $request, int $id)
    {
        $doctorId = $request->user()->id;
        $patient  = $this->patients->findForDoctor($doctorId, $id);
        abort_if(!$patient, 404);

        $this->patients->deleteForDoctor($patient);
        return response()->noContent();
    }
}
