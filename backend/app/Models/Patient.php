<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = ['doctor_id','name','email','phone','birth_date','notes'];

    protected $casts = [
        'birth_date' => 'date',
    ];

    public function doctor()      { return $this->belongsTo(User::class, 'doctor_id'); }
    public function appointments(){ return $this->hasMany(Appointment::class); }
}
