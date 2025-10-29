<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'utilisateurs';
    protected $primaryKey = 'idUtilisateur';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = true;


    // Si ta table n'a PAS created_at / updated_at, décommente la ligne suivante :
    // public $timestamps = false;

    protected $hidden = ['motDePasse'];

    protected $fillable = [
        'nom', 'prenom', 'email', 'motDePasse', 'photoProfil',
        'bio', 'ville', 'statut', 'typeUtilisateur'
    ];

    // Retourne le champ du mot de passe pour l'authentification
    public function getAuthPassword()
    {
        return $this->motDePasse;
    }

    // relations (exemples)
    public function activites()
    {
        return $this->hasMany(Activite::class, 'idUtilisateur', 'idUtilisateur');
    }

    public function commentaires()
    {
        return $this->hasMany(Commentaire::class, 'idUtilisateur');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'idUtilisateur');
    }

    

    public function conversations()
    {
        return $this->belongsToMany(Conversation::class, 'conversation_user', 'utilisateur_id', 'conversation_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }
}
