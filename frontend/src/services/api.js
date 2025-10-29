import axios from "axios"; 

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- 🔹 ACTIVITÉS ---
// --- 🔹 ACTIVITÉS : CRÉER UNE NOUVELLE ACTIVITÉ ---
export const createActivity = (formData) =>
  api.post("/activites", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getActivities = () => api.get("/activites");
export const getActivitiesForUser = (id) => api.get(`/utilisateurs/${id}/activites`);
// export const joinActivity = (activityId, userId) => api.post(`/activities/${activityId}/join`, { user_id: userId });
export const deleteActivity = (activityId) => api.delete(`/activites/${activityId}`); // ✅ suppression activité

// --- 🔹 UTILISATEURS ---
export const getUtilisateurs = () => api.get("/utilisateurs");
export const getUserById = (id) => api.get(`/utilisateurs/${id}`);
export const updateUser = (id, data) => api.put(`/utilisateurs/${id}`, data);
export const searchUtilisateurs = (query) => api.get(`/utilisateurs/search?query=${query}`);
export const deleteUtilisateur = (userId) => api.delete(`/utilisateurs/${userId}`); // ✅ suppression utilisateur

// --- 🔹 AUTHENTIFICATION ---
export const registerUser = (data) => api.post("/register", data);
export const loginUser = (data) => api.post("/login", data);

// --- 🔹 CONVERSATIONS & MESSAGES ---
export const getConversations = () => api.get("/conversations");
export const getConversationById = (id) => api.get(`/conversations/${id}`);
export const sendMessage = (id, data) => api.post(`/conversations/${id}/messages`, data);
export const createConversation = (userId) => api.post(`/conversations`, { user_id: userId });

// --- 🔹 UTILITAIRE ---
export const formatMessageTime = (isoString) => {
  const date = new Date(isoString);
  if (isNaN(date)) return "Inconnu";
  const now = new Date();
  const diffInDays = (now - date) / (1000 * 60 * 60 * 24);

  if (diffInDays < 1)
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  if (diffInDays < 7)
    return date.toLocaleDateString("fr-FR", { weekday: "short" });
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
};

// --- 🎯 ADMINISTRATION / DASHBOARD ---
export const getAdminDashboardStats = () => api.get("/admin/dashboard-stats");

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`; // Le token est ajouté ici
  return config;
});

export const joinActivity = (activityId, userId) => api.post(`/activities/${activityId}/join`, { user_id: userId });
