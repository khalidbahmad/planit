<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activite extends Model
{
    use HasFactory;

    protected $table = 'activites';
    protected $primaryKey = 'idActivite';

    protected $fillable = [
        'titre', 'description', 'type', 'lieu', 'dateActivite',
        'heureActivite', 'nbMaxParticipants', 'image', 'statut',
        'rating', 'categorie_id', 'organisateur_id'
    ];

    // 🔗 Relation : une activité appartient à un organisateur
    public function organisateur()
    {
        return $this->belongsTo(Organisateur::class, 'organisateur_id', 'idOrganisateur');
    }

    // 🔗 Relation : une activité a plusieurs commentaires
    public function commentaires()
    {
        return $this->hasMany(Commentaire::class, 'idActivite', 'idActivite');
    }

    public function organizer()
    {
        return $this->belongsTo(Utilisateur::class, 'idUtilisateur');
    }


    // 🔗 Relation Many-to-Many : participants inscrits à l’activité
    public function participants()
    {
    // Votre migration utilise 'idParticipant' (clé étrangère de 'participants')
    // et 'idActivite' (clé étrangère de 'activites').
    return $this->belongsToMany(
            Participant::class,  // Le modèle pivot pour la table 'participants'
            'participations',    // Le nom de la table pivot
            'idActivite',        // La clé étrangère de l'activité sur la table pivot
            'idParticipant'      // La clé étrangère de l'autre modèle sur la table pivot
        )->withTimestamps();

    }
}
