<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentaire extends Model
{
    use HasFactory;

    protected $table = 'commentaires';
    protected $primaryKey = 'idCommentaire';

    protected $fillable = ['contenu', 'idUtilisateur', 'idActivite'];

    public function auteur()
    {
        return $this->belongsTo(Utilisateur::class, 'idUtilisateur', 'idUtilisateur');
    }

    public function activite()
    {
        return $this->belongsTo(Activite::class, 'idActivite', 'idActivite');
    }
}
