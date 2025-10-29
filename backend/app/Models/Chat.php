<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $table = 'notes'; // facultatif si le nom respecte la convention
    protected $primaryKey = 'idNote';
    public $timestamps = false; // si tu n’as pas created_at / updated_at

    protected $fillable = [
        'valeur',
        'commentaireOptionnel',
        'idUtilisateur',
        'idActivite',
    ];

    // Relation avec l'utilisateur
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'idUtilisateur', 'idUtilisateur');
    }

    // Relation avec l'activité
    public function activite()
    {
        return $this->belongsTo(Activite::class, 'idActivite', 'idActivite');
    }
}
