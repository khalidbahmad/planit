<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organisateur extends Model
{
    use HasFactory;

    protected $table = 'organisateurs';
    protected $primaryKey = 'idOrganisateur';
    public $incrementing = false; // car lié à l’utilisateur
    public $timestamps = false;

    // 🔗 Relation : un organisateur est un utilisateur
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'idUtilisateur', 'idUtilisateur');
    }

    // 🔗 Relation : un organisateur peut créer plusieurs activités
    public function activites()
    {
        return $this->hasMany(Activite::class, 'organisateur_id', 'idOrganisateur');
    }
}
