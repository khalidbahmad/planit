<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use App\Models\Activite;
use Illuminate\Support\Facades\Auth; // Ajout pour exclure l'utilisateur courant

class UtilisateurController extends Controller
{
    /**
     * 🟢 Lister tous les utilisateurs (avec relations)
     */
    public function index()
    { 
        $utilisateurs = Utilisateur::with(['commentaires', 'notifications'])
            ->orderBy('nom')
            ->get();

        return response()->json($utilisateurs);
    }

    /**
     * 🟢 Afficher un utilisateur spécifique par ID
     */
    public function show($id)
    {
        $user = Utilisateur::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
        }
        return response()->json($user);
    }


     public function update(Request $request, $id)
    {
        $user = Utilisateur::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
        }

        $user->update($request->all());

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => $user
        ]);
    }

    public function getActivities($id)
    {
        $user = Utilisateur::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
        }

        $activities = $user->activities()
            ->with(['organisateur', 'categorie', 'participants'])
            ->orderByDesc('dateActivite')
            ->get();

        return response()->json($activities);
    }

    /**
     * NOUVELLE MÉTHODE : Rechercher des utilisateurs par nom ou prénom.
     */
    public function search(Request $request)
    {
        try {
            $query = $request->input('query');
            $currentUser = Auth::user();

            if (!$query) {
                return response()->json([]); // Retourne un tableau vide si aucune requête de recherche
            }

            // Exclure l'utilisateur actuellement connecté
            $utilisateurs = Utilisateur::where('idUtilisateur', '!=', $currentUser->idUtilisateur ?? null)
                // Chercher dans le nom OU le prénom
                ->where(function ($q) use ($query) {
                    $q->where('nom', 'LIKE', "%{$query}%")
                      ->orWhere('prenom', 'LIKE', "%{$query}%");
                })
                // Sélectionner uniquement les colonnes nécessaires pour le chat
                ->select('idUtilisateur', 'nom', 'prenom', 'photoProfil', 'typeUtilisateur', 'email')
                ->limit(10) // Limite pour la performance
                ->get();

            return response()->json($utilisateurs);
        } catch (\Exception $e) {
            // Loggez l'erreur pour le débogage
            \Log::error("Erreur de recherche d'utilisateurs: " . $e->getMessage());
            return response()->json([
                'error' => 'Erreur serveur lors de la recherche',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 🔴 Supprimer un utilisateur
     */
    public function destroy($id)
    {
        $user = Utilisateur::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
        }

        // ⚠️ Optionnel : tu peux ajouter une protection pour ne pas supprimer l'admin courant
        $currentUser = Auth::user();
        if ($currentUser && $currentUser->idUtilisateur == $id) {
            return response()->json(['message' => 'Impossible de supprimer votre propre compte'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }

}
