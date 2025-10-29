<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrateur extends Model
{
    use HasFactory;

    protected $table = 'administrateurs';
    protected $primaryKey = 'idAdministrateur';
    public $incrementing = false;
    public $timestamps = false; // ✅ Désactive les colonnes created_at et updated_at
}
