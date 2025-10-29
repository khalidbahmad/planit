<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    // ✅ Tell Laravel this model uses the "planit_users" table
    protected $table = 'planit_users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'type',
        'location',
        'bio',
        'avatar',
        'cover',
        'is_online',
    ];

    protected $hidden = ['password'];

    // ✅ Relationships
    public function organizedActivities()
    {
        return $this->hasMany(Activity::class, 'organizer_id');
    }

    public function attendingActivities()
    {
        return $this->belongsToMany(Activity::class, 'activity_user');
    }
}
