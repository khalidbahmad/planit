<?php

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\UtilisateurController;
// use App\Http\Controllers\AuthController;
// use App\Http\Controllers\ActiviteController;
// use App\Http\Controllers\ConversationController;
// use App\Http\Controllers\MessageController;

// // --- Routes publiques (non authentifiées) ---
// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login']);

// // --- Routes d'Activités (si elles doivent rester publiques, sinon les déplacer) ---
// Route::get('/activites', [ActiviteController::class, 'index']);
// Route::get('/activites/{id}', [ActiviteController::class, 'show']);
// // Les autres routes CRUD des activités devraient être sécurisées si l'Auth est utilisé
// // Route::apiResource('activites', ActiviteController::class)->except(['index', 'show']);

// // --- Routes sécurisées (nécessitent un jeton Sanctum) ---
// Route::middleware('auth:sanctum')->group(function () {
//     // Auth
//     Route::post('/logout', [AuthController::class, 'logout']);

//     // Activités
//     Route::post('activities/{activity}/join', [ActiviteController::class, 'join'])->name('activities.join');
    
//     // Utilisateurs
//     Route::get('/utilisateurs', [UtilisateurController::class, 'index']); // Lister
//     Route::get('/utilisateurs/{id}', [UtilisateurController::class, 'show']); // Afficher
//     Route::put('/utilisateurs/{id}', [UtilisateurController::class, 'update']); // Mettre à jour
//     Route::get('/utilisateurs/{id}/activites', [ActiviteController::class, 'getByUser']); // Activités par utilisateur
    
//     // NOUVELLE ROUTE POUR LA RECHERCHE D'UTILISATEURS
//     Route::get('/utilisateurs/search', [UtilisateurController::class, 'search']); // Recherche par nom/prénom
    
//     // Conversations & Messages
//     Route::get('/conversations', [ConversationController::class, 'index']);
//     Route::get('/conversations/{id}', [ConversationController::class, 'show']);
//     Route::post('/conversations', [ConversationController::class, 'store']);
//     Route::post('/conversations/{id}/messages', [MessageController::class, 'store']);

//     // Autres routes CRUD d'Activités qui nécessitent l'authentification
//     Route::post('/activites', [ActiviteController::class, 'store']);
//     Route::put('/activites/{id}', [ActiviteController::class, 'update']);
//     Route::delete('/activites/{id}', [ActiviteController::class, 'destroy']);
// });

// // --- Tableau récapitulatif des routes Utilisateurs (Commentaire informatif) ---
// /*
// | Méthode | URI                                                         | Action                                            |
// |:--------|:------------------------------------------------------------|:--------------------------------------------------|
// | GET     | /api/utilisateurs                                           | Lister tous les utilisateurs                      |
// | GET     | /api/utilisateurs/{id}                                      | Détails de l’utilisateur #5                       |
// | GET     | /api/utilisateurs/search?query=Ali                          | Cherche les utilisateurs par nom ou prénom        |
// | POST    | /api/utilisateurs                                           | Crée un utilisateur                               |
// | PUT     | /api/utilisateurs/{id}                                      | Met à jour l’utilisateur                          |
// | DELETE  | /api/utilisateurs/{id}                                      | Supprime un utilisateur                           |
// */



// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\{
//     UtilisateurController,
//     AuthController,
//     ActiviteController,
//     ConversationController,
//     MessageController,
//     AdminDashboardController
// };



// // --- 🔓 Routes publiques (sans authentification) ---
// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login']);

// // --- 🔹 Activités publiques (lecture seulement) ---
// Route::get('/activites', [ActiviteController::class, 'index']);
// Route::get('/activites/{id}', [ActiviteController::class, 'show']);

// // --- 🔒 Routes protégées par Sanctum ---
// Route::middleware('auth:sanctum')->group(function () {

//     // --- Auth ---
//     Route::post('/logout', [AuthController::class, 'logout']);

//     // --- 🔹 Activités ---
//     Route::post('/activities/{activityId}/join', [ActiviteController::class, 'join']); 
//     // ⚠️ Garde bien le même nom de paramètre "activityId" que dans ton frontend
//     // (ton api.js fait un POST sur `/activities/${activityId}/join`)

//     Route::get('/utilisateurs/{id}/activites', [ActiviteController::class, 'getByUser']);
//     Route::post('/activites', [ActiviteController::class, 'store']);
//     Route::put('/activites/{id}', [ActiviteController::class, 'update']);
//     Route::delete('/activites/{id}', [ActiviteController::class, 'destroy']);

//     // --- 🔹 Utilisateurs ---
//     Route::get('/utilisateurs', [UtilisateurController::class, 'index']);
//     Route::get('/utilisateurs/{id}', [UtilisateurController::class, 'show']);
//     Route::put('/utilisateurs/{id}', [UtilisateurController::class, 'update']);
//     Route::get('/utilisateurs/search', [UtilisateurController::class, 'search']);
//     // ⚠️ IMPORTANT : déplace cette route ICI (dans le groupe sanctum)
//     // sinon tu ne pourras pas faire une recherche si tu n'es pas connecté.

//     // --- 🔹 Conversations & Messages ---
//     Route::get('/conversations', [ConversationController::class, 'index']);
//     Route::get('/conversations/{id}', [ConversationController::class, 'show']);
//     Route::post('/conversations', [ConversationController::class, 'store']);
//     Route::post('/conversations/{id}/messages', [MessageController::class, 'store']);

// });


// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/admin/dashboard-stats', [AdminDashboardController::class, 'getStats']);
// });



use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    UtilisateurController,
    AuthController,
    ActiviteController,
    ConversationController,
    MessageController,
    AdminDashboardController
};

// --- 🔓 Routes publiques (sans authentification) ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// --- 🔹 Activités publiques (lecture seulement) ---
Route::get('/activites', [ActiviteController::class, 'index']);
Route::get('/activites/{id}', [ActiviteController::class, 'show']);

// --- 🔒 Routes protégées par Sanctum ---
Route::middleware('auth:sanctum')->group(function () {

    // --- Auth ---
    Route::post('/logout', [AuthController::class, 'logout']);

    // --- 🔹 Activités ---
    Route::post('/activities/{activity}/join', [ActiviteController::class, 'join']);
    Route::get('/utilisateurs/{id}/activites', [ActiviteController::class, 'getByUser']);
    Route::post('/activites', [ActiviteController::class, 'store']);
    Route::put('/activites/{id}', [ActiviteController::class, 'update']);
    Route::delete('/activites/{id}', [ActiviteController::class, 'destroy']); // ✅ suppression activité
    

    // --- 🔹 Utilisateurs ---
    Route::get('/utilisateurs', [UtilisateurController::class, 'index']);
    Route::get('/utilisateurs/{id}', [UtilisateurController::class, 'show']);
    Route::put('/utilisateurs/{id}', [UtilisateurController::class, 'update']);
    Route::get('/utilisateurs/search', [UtilisateurController::class, 'search']);
    Route::delete('/utilisateurs/{id}', [UtilisateurController::class, 'destroy']); // ✅ suppression utilisateur

    // --- 🔹 Conversations & Messages ---
    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::get('/conversations/{id}', [ConversationController::class, 'show']);
    Route::post('/conversations', [ConversationController::class, 'store']);
    Route::post('/conversations/{id}/messages', [MessageController::class, 'store']);

    // --- 🎯 Administration ---
    Route::get('/admin/dashboard-stats', [AdminDashboardController::class, 'getStats']);
});



