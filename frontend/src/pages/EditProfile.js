import { useState, useEffect } from "react";
import { updateUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  // 🔹 Initialise le formulaire avec les données du user connecté
  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  // 🔹 Gère les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Envoi des données au backend Laravel
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateUser(user.idUtilisateur, formData);
      alert("✅ Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("❌ Échec de la mise à jour !");
    } finally {
      setSaving(false);
    }
  };


  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Utilisateur non connecté
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        {/* --- En-tête --- */}
        <div className="bg-blue-600 text-white py-8 px-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Modifier le Profil</h1>
            <p className="text-blue-100 mt-2">
              Gérez vos informations personnelles et votre activité
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="font-semibold text-lg">
              {formData.nom} {formData.prenom}
            </p>
            <p className="text-blue-200">{formData.email}</p>
          </div>
        </div>

        {/* --- Formulaire principal --- */}
        <form
          onSubmit={handleSubmit}
          className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Nom */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg p-2.5"
            />
          </div>

          {/* Prénom */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Prénom
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg p-2.5"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg p-2.5"
            />
          </div>

          {/* Ville */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ville
            </label>
            <input
              type="text"
              name="ville"
              value={formData.ville || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg p-2.5"
              placeholder="Ex: Rabat"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg p-2.5"
              placeholder="Parlez un peu de vous..."
            />
          </div>

          {/* Statut */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Statut
            </label>
            <select
              name="statut"
              value={formData.statut || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg p-2.5 bg-white"
            >
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>

          {/* Type utilisateur */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Type d’utilisateur
            </label>
            <select
              name="typeUtilisateur"
              value={formData.typeUtilisateur || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg p-2.5 bg-white"
            >
              <option value="participant">Participant</option>
              <option value="organisateur">Organisateur</option>
            </select>
          </div>

          {/* Bouton enregistrer */}
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              disabled={saving}
              className={`w-full ${
                saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } transition-colors duration-200 text-white font-semibold py-3 rounded-lg shadow-md`}
            >
              {saving ? "Enregistrement..." : "💾 Enregistrer les modifications"}
            </button>
          </div>
        </form>

        {/* --- Commentaires --- */}
        <div className="p-10 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-700">💬 Commentaires</h2>
          {user.commentaires?.length > 0 ? (
            <ul className="space-y-3">
              {user.commentaires.map((c) => (
                <li
                  key={c.idCommentaire}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <p className="text-gray-700">{c.contenu}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(c.dateCommentaire).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun commentaire pour le moment.</p>
          )}
        </div>

        {/* --- Notifications --- */}
        <div className="p-10 border-t border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold mb-4 text-gray-700">🔔 Notifications</h2>
          {user.notifications?.length > 0 ? (
            <ul className="space-y-3">
              {user.notifications.map((n, index) => (
                <li
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg bg-white hover:bg-blue-50 transition"
                >
                  {n.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune notification.</p>
          )}
        </div>
      </div>
    </div>
  );
}
