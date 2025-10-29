<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $table = 'participants';
    protected $primaryKey = 'idParticipant';
    public $incrementing = false; // On utilise l'idUtilisateur comme clé
    public $timestamps = false;

    protected $fillable = [
        'idParticipant',      // correspond à l'utilisateur
        'utilisateur_id',     // si tu as ce champ
    ];

    /**
     * Relation vers l'utilisateur
     */
    public function utilisateur()
    {
        // Si ta table participants a un champ 'idParticipant' = 'idUtilisateur' :
        return $this->belongsTo(Utilisateur::class, 'idParticipant', 'idUtilisateur');

        // OU si tu utilises 'utilisateur_id' :
        // return $this->belongsTo(Utilisateur::class, 'utilisateur_id', 'idUtilisateur');
    }

    /**
     * Relation many-to-many avec les activités
     */
    public function activites()
    {
        return $this->belongsToMany(
            Activite::class,
            'participations',   // nom de la table pivot
            'idParticipant',    // clé étrangère dans pivot pour ce modèle
            'idActivite'        // clé étrangère dans pivot pour Activite
        )->withTimestamps();
    }
}
