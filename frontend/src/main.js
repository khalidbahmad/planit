import { createApp } from 'vue'; // Si vous utilisez Vue.js
import axios from 'axios';
import App from './App.vue';
// ... autres imports (router, store, etc.)

// --- 1. Configuration Globale d'Axios (CRUCIAL) ---
axios.defaults.baseURL = 'http://127.0.0.1:8000'; 
axios.defaults.withCredentials = true; // Permet l'envoi des cookies (session & CSRF)


// --- 2. Fonction d'Initialisation Sanctum ---
function initializeSanctum() {
    // La requête GET qui demande à Laravel de placer le cookie CSRF.
    return axios.get('/sanctum/csrf-cookie')
        .then(() => {
            console.log("✅ Cookie CSRF de Sanctum initialisé.");
        })
        .catch(error => {
            // Important : Si cette étape échoue, les POST/PUT/DELETE échoueront ensuite.
            console.error("❌ ERREUR LORS DE L'INITIALISATION CSRF:", error);
            // Vous pouvez choisir d'afficher un message d'erreur ou de loguer.
        });
}


// --- 3. Démarrage de l'Application ---
// On s'assure que le cookie CSRF est là AVANT de monter l'application.
initializeSanctum().then(() => {
    // Créez et montez l'application seulement après avoir initialisé Sanctum
    // createApp(App).mount('#app'); 
});

// Si vous n'avez pas de framework, vous faites juste :
// initializeSanctum();
// // ... puis le reste de votre logique d'application