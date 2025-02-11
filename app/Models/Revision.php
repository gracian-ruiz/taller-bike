<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revision extends Model
{
    use HasFactory;

    protected $fillable = ['bike_id', 'fecha_revision', 'descripcion', 'proxima_revision'];

    public function bike()
    {
        return $this->belongsTo(Bike::class);
    }
}
