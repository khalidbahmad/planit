import { useState } from "react";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { login } = useAuth(); // optional: log in after signup
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    ville: "",
    typeUtilisateur: "participant",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await registerUser(form);

      // Optional: log the user in immediately after signup
      await login(form.email, form.motDePasse);

      alert("Inscription réussie ! Bienvenue " + res.data.user.nom);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur inscription");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Inscription
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nom</label>
          <input
            name="nom"
            value={form.nom}
            onChange={handleChange}
            placeholder="Nom"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Prénom</label>
          <input
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Mot de passe</label>
          <input
            name="motDePasse"
            type="password"
            value={form.motDePasse}
            onChange={handleChange}
            placeholder="Mot de passe"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ville</label>
          <input
            name="ville"
            value={form.ville}
            onChange={handleChange}
            placeholder="Ville"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Type d’utilisateur</label>
          <select
            name="typeUtilisateur"
            value={form.typeUtilisateur}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="participant">Participant</option>
            <option value="organisateur">Organisateur</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
