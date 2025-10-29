<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Utilisateur; // 💡 Il faut importer le modèle Utilisateur
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    public function index()
    {
        try {
            // FIX CRITIQUE: Utiliser l'utilisateur authentifié (Auth::user())
            // au lieu de tenter de le récupérer avec Utilisateur::first().
            $user = Auth::user();

            if (!$user) {
                // Si l'utilisateur n'est pas authentifié, retournez une erreur 401 (Non autorisé)
                return response()->json(['error' => 'Utilisateur non authentifié'], 401);
            }

            // Assurez-vous que la relation 'conversations' est bien définie dans votre modèle Utilisateur.
            $conversations = $user->conversations()
                // IMPORTANT: Assurez-vous que vos clés correspondent (ex: idUtilisateur si c'est la clé de Utilisateur)
                ->with(['utilisateurs:idUtilisateur,nom,photoProfil', 'lastMessage'])
                ->get()
                ->map(function ($conv) use ($user) {
                    // Cherche l'autre utilisateur dans la conversation (doit être une conversation P2P)
                    $other = $conv->utilisateurs->where('idUtilisateur', '!=', $user->idUtilisateur)->first();

                    // Nous utilisons l'ID de l'utilisateur pour lier la conversation,
                    // mais votre modèle utilisateur utilise peut-être 'id' ou 'idUtilisateur'.
                    // J'ai présumé 'idUtilisateur' basé sur les autres fichiers.
                    
                    return [
                        'id' => $conv->id,
                        'name' => $other->nom ?? 'Conversation Inconnue',
                        'avatar' => $other->photoProfil ?? '/default-avatar.png',
                        'lastMessage' => $conv->lastMessage,
                        'isOnline' => false,
                    ];
                });

            return response()->json($conversations);
        } catch (\Exception $e) {
            // Loggez l'erreur pour le débogage côté serveur
            \Log::error("Erreur de chargement des conversations: " . $e->getMessage()); 
            
            return response()->json([
                'error' => 'Erreur serveur interne lors du chargement des conversations',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    // ... autres méthodes (show, store) ...

    public function show($id)
    {
        try {
            // FIX: Assurez-vous que le nom des colonnes de Utilisateur correspond à ceux utilisés dans 'index'.
            // J'ai remplacé ':id,name,avatar' par ':idUtilisateur,nom,photoProfil'
            $conversation = Conversation::with(['messages.sender:idUtilisateur,nom,photoProfil']) 
                ->findOrFail($id);

            return response()->json($conversation);
        } catch (\Exception $e) {
            // Ajout du bloc try/catch pour le débogage.
            \Log::error("Erreur de chargement de la conversation $id: " . $e->getMessage()); 
            return response()->json([
                'error' => "Erreur serveur lors du chargement de la conversation $id",
                'details' => $e->getMessage()
            ], 500);
        }
    }
    
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['error' => 'Utilisateur non authentifié'], 401);
            }

            $otherUserId = $request->input('user_id');

            if (!$otherUserId) {
                return response()->json(['error' => 'user_id manquant'], 400);
            }

            // Vérifie que l'utilisateur existe
            $otherUser = Utilisateur::find($otherUserId);
            if (!$otherUser) {
                return response()->json(['error' => 'Utilisateur introuvable'], 404);
            }

            // Vérifie si une conversation existe déjà
            $existing = Conversation::whereHas('utilisateurs', function ($q) use ($user) {
                    $q->where('utilisateur_id', $user->idUtilisateur);
                })
                ->whereHas('utilisateurs', function ($q) use ($otherUserId) {
                    $q->where('utilisateur_id', $otherUserId);
                })
                ->first();

            if ($existing) {
                return response()->json($existing);
            }

            // Crée la conversation
            $conversation = Conversation::create([
                'name' => 'Chat entre ' . $user->nom . ' et ' . $otherUser->nom,
            ]);

            // Attache les deux utilisateurs
            $conversation->utilisateurs()->attach([$user->idUtilisateur, $otherUserId]);

            return response()->json($conversation, 201);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
