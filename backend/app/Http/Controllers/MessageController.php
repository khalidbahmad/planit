<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function store(Request $request, $conversationId)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                // S'assurer que l'utilisateur est bien authentifié
                return response()->json(['error' => 'Utilisateur non authentifié'], 401);
            }

            $validated = $request->validate([
                'text' => 'required|string|max:1000',
            ]);

            // FIX 1: Utiliser $user->idUtilisateur comme ID de l'expéditeur
            $message = Message::create([
                'conversation_id' => $conversationId,
                'sender_id' => $user->idUtilisateur, 
                'text' => $validated['text'],
            ]);

            // FIX 2: Utiliser les noms de colonnes personnalisés (idUtilisateur, nom, photoProfil)
            // pour charger les données de l'expéditeur dans la réponse.
            return response()->json($message->load('sender:idUtilisateur,nom,photoProfil'), 201);

        } catch (\Exception $e) {
            \Log::error("Erreur envoi message: " . $e->getMessage()); 
            // Retourner l'erreur détaillée pour aider au débogage
            return response()->json([
                'error' => "Erreur serveur lors de l'envoi du message",
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
