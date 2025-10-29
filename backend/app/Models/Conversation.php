<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    
    protected $fillable = ['name'];

    protected $table = 'conversations';

    public function utilisateurs()
    {
        return $this->belongsToMany(Utilisateur::class, 'conversation_user', 'conversation_id', 'utilisateur_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'conversation_id');
    }

    public function lastMessage()
    {
        return $this->hasOne(Message::class, 'conversation_id')->latestOfMany();
    }
}
