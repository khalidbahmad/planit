<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Utilisateur;
use App\Models\Organisateur;
use App\Models\Participant;
use App\Models\Activite;
use App\Models\Conversation;
use App\Models\Message;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // --- Utilisateurs fixes ---
        $organisateurUser = Utilisateur::create([
            'nom' => 'Organisateur',
            'prenom' => 'Test',
            'email' => 'testORG@test.com',
            'motDePasse' => Hash::make('password'),
            'ville' => 'Casablanca',
            'typeUtilisateur' => 'organisateur'
        ]);

        $participantUser = Utilisateur::create([
            'nom' => 'Participant',
            'prenom' => 'Test',
            'email' => 'testPAR@test.com',
            'motDePasse' => Hash::make('password'),
            'ville' => 'Rabat',
            'typeUtilisateur' => 'participant'
        ]);

        $organisateur = Organisateur::create(['idOrganisateur' => $organisateurUser->idUtilisateur]);
        $participant = Participant::create(['idParticipant' => $participantUser->idUtilisateur]);

        // --- Création de 13 activités ---
        $activites = [];
        for ($i = 1; $i <= 13; $i++) {
            $activites[] = Activite::create([
                'titre' => "Activité $i",
                'description' => "Description de l'activité $i",
                'type' => ['Sport', 'Culture', 'Nature', 'Musique'][array_rand(['Sport', 'Culture', 'Nature', 'Musique'])],
                'lieu' => ['Casablanca', 'Rabat', 'Marrakech'][array_rand(['Casablanca', 'Rabat', 'Marrakech'])],
                'dateActivite' => now()->addDays($i)->toDateString(),
                'heureActivite' => "10:00:00",
                'nbMaxParticipants' => 10 + $i,
                'image' => "https://source.unsplash.com/400x300/?activity,$i",
                'organisateur_id' => $organisateur->idOrganisateur
            ]);
        }

        // --- Participation de testPAR à 3 activités aléatoires ---
        $participations = array_rand($activites, 3);
        foreach ((array)$participations as $key) {
            $activites[$key]->participants()->attach($participant->idParticipant);
        }

        // --- Création de 5 utilisateurs aléatoires ---
        $autresUsers = [];
        for ($i = 1; $i <= 5; $i++) {
            $user = Utilisateur::create([
                'nom' => "User$i",
                'prenom' => "Random",
                'email' => "user$i@example.com",
                'motDePasse' => Hash::make('password'),
                'ville' => ['Casablanca','Rabat','Marrakech'][array_rand(['Casablanca','Rabat','Marrakech'])],
                'typeUtilisateur' => 'participant'
            ]);
            $autresUsers[] = $user;
            Participant::create(['idParticipant' => $user->idUtilisateur]);

            // Chaque utilisateur participe aléatoirement à 1-3 activités
            $activiteAleatoire = array_rand($activites, rand(1, 3));
            foreach ((array)$activiteAleatoire as $key) {
                $activites[$key]->participants()->attach($user->idUtilisateur);
            }
        }

        // --- Création d'une conversation test entre testORG, testPAR et tous les autres utilisateurs ---
        $conv = Conversation::create(['name' => 'Conversation Test']);
        $userIds = array_merge(
            [$organisateurUser->idUtilisateur, $participantUser->idUtilisateur],
            array_map(fn($u) => $u->idUtilisateur, $autresUsers)
        );
        $conv->utilisateurs()->attach($userIds);

        // --- Messages de test ---
        Message::create([
            'conversation_id' => $conv->id,
            'sender_id' => $organisateurUser->idUtilisateur,
            'text' => 'Bienvenue à tous dans cette conversation de test !'
        ]);
        Message::create([
            'conversation_id' => $conv->id,
            'sender_id' => $participantUser->idUtilisateur,
            'text' => 'Merci, ravi d’être ici !'
        ]);

        $this->command->info('✅ Base de données seedée avec testORG, testPAR, utilisateurs aléatoires, 13 activités et conversation test.');
    }
}
