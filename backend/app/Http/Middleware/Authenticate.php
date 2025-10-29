<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo(Request $request): ?string
    {
        // Pour une API, on ne redirige JAMAIS.
        // On retourne 'null' pour que le gestionnaire d'exceptions
        // renvoie une réponse JSON 401 Unauthorized.
        return null;
    }
}