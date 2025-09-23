<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = ['doctor_id','patient_id','start_at','end_at','status','notes'];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at'   => 'datetime',
    ];

    public function doctor()  { return $this->belongsTo(User::class, 'doctor_id'); }
    public function patient() { return $this->belongsTo(Patient::class); }
}
