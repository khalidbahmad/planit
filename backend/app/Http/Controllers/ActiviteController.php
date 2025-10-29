<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ActiviteController extends Controller
{
    /**
     * 🟢 Afficher toutes les activités (avec relations)
     */
    public function index()
    {
        $activites = Activite::with([
            'organisateur.utilisateur',
            'participants.utilisateur',
            'commentaires.auteur'
        ])->orderBy('dateActivite', 'asc')->get();

        return response()->json($activites);
    }

    /**
     * 🟢 Afficher une activité spécifique
     */
    public function show($id)
    {
        $activite = Activite::with([
            'organisateur.utilisateur',
            'participants.utilisateur',
            'commentaires.auteur'
        ])->findOrFail($id);

        return response()->json($activite);
    }

    /**
     * 🟢 Afficher les activités d’un utilisateur
     */
    public function getActivitiesByUser($userId)
    {
        $activites = Activite::where('organisateur_id', $userId)->get();
        return response()->json($activites);
    }   

    /**
     * 🟡 Créer une nouvelle activité
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié.'], 401);
        }

        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'nullable|string',
            'lieu' => 'required|string',
            'dateActivite' => 'required|date',
            'heureActivite' => 'required',
            'nbMaxParticipants' => 'nullable|integer|min:0',
            'statut' => 'required|in:ouverte,fermée,annulée',
            'rating' => 'nullable|numeric|min:0|max:5',
            'categorie_id' => 'nullable|integer',
            'image' => 'nullable|image|max:2048'
        ]);

        $validated['organisateur_id'] = $user->idUtilisateur;

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('activites', 'public');
        }

        $activite = Activite::create($validated);

        return response()->json([
            'message' => 'Activité créée avec succès.',
            'data' => $activite
        ], 201);
    }

    /**
     * 🟠 Mettre à jour une activité existante
     */
    public function update(Request $request, $id)
    {
        $activite = Activite::findOrFail($id);

        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'type' => 'nullable|string',
            'lieu' => 'sometimes|string',
            'dateActivite' => 'sometimes|date',
            'heureActivite' => 'sometimes',
            'nbMaxParticipants' => 'nullable|integer|min:0',
            'statut' => 'nullable|in:ouverte,fermée,annulée',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            if ($activite->image) {
                Storage::disk('public')->delete($activite->image);
            }
            $validated['image'] = $request->file('image')->store('activites', 'public');
        }

        $activite->update($validated);

        return response()->json([
            'message' => 'Activité mise à jour avec succès.',
            'data' => $activite
        ]);
    }

    /**
     * 🔴 Supprimer une activité
     */
    public function destroy($id)
    {
        $activite = Activite::findOrFail($id);

        if ($activite->image) {
            Storage::disk('public')->delete($activite->image);
        }

        $activite->delete();

        return response()->json(['message' => 'Activité supprimée avec succès.']);
    }

    /**
     * 🔵 Rejoindre une activité
     */
    public function join(Activite $activity)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié.'], 401);
        }

        $participant = Participant::where('idParticipant', $user->idUtilisateur)->first();
        if (!$participant) {
            return response()->json(['message' => 'Profil participant introuvable.'], 404);
        }

        // ✅ Sync without detaching
        $activity->participants()->syncWithoutDetaching([$participant->idParticipant]);

        $activity->load('participants.utilisateur');

        return response()->json([
            'message' => 'Participation enregistrée avec succès.',
            'activity' => $activity,
            'attendees_count' => $activity->participants->count(),
        ], 200);
    }

    /**
     * 🟢 Récupérer toutes les activités auxquelles un utilisateur participe
     */
    public function getByUser($userId)
    {
        // Récupérer le participant correspondant
        $participant = Participant::where('idParticipant', $userId)->first();

        if (!$participant) {
            return response()->json(['message' => 'Profil participant introuvable.'], 404);
        }

        // Charger toutes les activités auxquelles il participe avec les relations
        $activites = $participant->activites()->with([
            'organisateur.utilisateur',
            'participants.utilisateur',
            'commentaires.auteur'
        ])->get();

        return response()->json($activites);
    }


}
