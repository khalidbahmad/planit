<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // --- Signup ---
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs,email',
            'motDePasse' => 'required|min:6',
            'ville' => 'nullable|string|max:255',
            'typeUtilisateur' => 'required|in:participant,organisateur'
        ]);

        $user = Utilisateur::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'motDePasse' => Hash::make($request->motDePasse),       
            'ville' => $request->ville,
            'typeUtilisateur' => $request->typeUtilisateur,
            'statut' => 'actif',
        ]);

        return response()->json([
            'message' => 'Inscription réussie',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        
        $request->validate([
            'email' => 'required|email',
            'motDePasse' => 'required'
        ]);

        $user = Utilisateur::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->motDePasse, $user->motDePasse)) {
            return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
        }

        // 🔹 Create Sanctum token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }


}
