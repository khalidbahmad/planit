<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
use App\Models\Activite; // Si ton modèle s’appelle autrement, adapte
use App\Models\Conversation;
use Illuminate\Support\Facades\Auth;


class AdminDashboardController extends Controller
{
    public function getStats()
    {
        try {
            $user = Auth::user();

            if (!$user) {
                // S'assurer que l'utilisateur est bien authentifié
                // return response()->json(['error' => 'Utilisateur non authentifié'], 401);
            }
            // 🔹 Compter les éléments principaux
            $totalUsers = Utilisateur::count();
            $totalActivities = Activite::count();
            $activeGroups = Conversation::count(); // Exemple : nombre de conversations actives
            $reports = rand(0, 20); // Exemple, tu peux remplacer par un vrai modèle plus tard

            // 🔹 Générer des stats mensuelles (exemple basé sur created_at)
            $monthlyData = [];
            for ($i = 1; $i <= 6; $i++) {
                $month = now()->subMonths(6 - $i)->format('M');
                $monthlyData[] = [
                    'name' => $month,
                    'Activités' => Activite::whereMonth('created_at', now()->subMonths(6 - $i))->count(),
                    'Utilisateurs' => Utilisateur::whereMonth('created_at', now()->subMonths(6 - $i))->count(),
                ];
            }

            // 🔹 Distribution des rôles
            $userDistribution = [
                ['name' => 'Participants', 'value' => Utilisateur::where('typeUtilisateur', 'participant')->count()],
                ['name' => 'Organisateurs', 'value' => Utilisateur::where('typeUtilisateur', 'organisateur')->count()],
                ['name' => 'Administrateurs', 'value' => Utilisateur::where('typeUtilisateur', 'administrateur')->count()],
            ];

            // 🔹 Activités récentes
            $activities = Activite::latest()->take(5)->get(['id', 'category', 'date', 'description', 'location', 'maxAttendees', 'organisateur_id']);

            // 🔹 Tous les utilisateurs
            $users = Utilisateur::latest()->get(['idUtilisateur', 'nom', 'prenom', 'email', 'typeUtilisateur', 'ville', 'created_at']);

            // 🔹 Exemple de variation mensuelle
            $stats = [
                'totalUsers' => $totalUsers,
                'totalActivities' => $totalActivities,
                'activeGroups' => $activeGroups,
                'reports' => $reports,
                'userChange' => '+5%',
                'ActiviteChange' => '+12%',
                'groupChange' => '+3%',
                'reportChange' => '-2%',
                'monthlyData' => $monthlyData,
                'userDistribution' => $userDistribution
            ];

            return response()->json([
                'stats' => $stats,
                'activities' => $activities,
                'users' => $users,
            ]);

        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
