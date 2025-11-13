import React, { useState } from 'react';
import { PlusCircleIcon } from 'lucide-react';
import { createActivity } from '../services/api'; // Assurez-vous que cette fonction existe
import { useAuth } from '../context/AuthContext';

export default function NewActivity() {
  const {user} = useAuth();

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type: '',
    lieu: '',
    dateActivite: '',
    heureActivite: '',
    nbMaxParticipants: '',
    image: null,
    statut: 'ouverte',
    rating: 0,
    categorie_id: '',
    organisateur_id: user.idUtilisateur
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

     try {
    const data = new FormData();

    // ✅ N'ajoute que les champs non vides
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      if (value !== '' && value !== null) {
        data.append(key, value);
      }
    });

    // ✅ Statut par défaut si vide ou invalide
    if (!formData.statut) {
      data.set('statut', 'ouverte'); // correspond à l'enum Laravel
    }

    await createActivity(data);
    alert('Activité créée avec succès !');
    } catch (err) {
        console.error(err);

        // Si le backend renvoie un message
        if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        } else {
        setError('Erreur lors de la création de l’activité.');
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-2xl mt-10 border border-gray-100">
      <h1 className="text-3xl font-extrabold text-gray-900 flex items-center mb-8 border-b pb-3">
        <PlusCircleIcon className="w-8 h-8 mr-3 text-green-600" /> Créer une Nouvelle Activité
      </h1>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Row 1: Titre & Lieu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input 
            type="text" 
            name="titre" 
            placeholder="Titre de l'activité" 
            value={formData.titre} 
            onChange={handleChange} 
            className={inputClasses} 
            required 
          />
          <input 
            type="text" 
            name="lieu" 
            placeholder="Lieu (Ville ou Adresse)" 
            value={formData.lieu} 
            onChange={handleChange} 
            className={inputClasses} 
            required 
          />
        </div>

        {/* Row 2: Date & Heure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <input 
            type="date" 
            name="dateActivite" 
            value={formData.dateActivite} 
            onChange={handleChange} 
            className={inputClasses} 
            required 
          />
          <input 
            type="time" 
            name="heureActivite" 
            value={formData.heureActivite} 
            onChange={handleChange} 
            className={inputClasses} 
            required 
          />
          <input 
            type="number" 
            name="nbMaxParticipants" 
            placeholder="Max Participants" 
            value={formData.nbMaxParticipants} 
            onChange={handleChange} 
            className={inputClasses} 
            min="1"
          />
        </div>

        {/* Description */}
        <textarea 
          name="description" 
          placeholder="Description détaillée de l'activité..." 
          value={formData.description} 
          onChange={handleChange} 
          rows="3" 
          className={`${inputClasses} resize-y`} 
          required 
        />

        {/* Metadata & Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <input 
            type="text" 
            name="type" 
            placeholder="Type (Ex: Sport, Culture)" 
            value={formData.type} 
            onChange={handleChange} 
            className={inputClasses} 
          />
          <select 
            name="statut" 
            value={formData.statut} 
            onChange={handleChange} 
            className={inputClasses}
            >
            <option value="ouverte">Ouverte (Prête)</option> 
            <option value="fermée">Fermée (Pleine)</option>
            <option value="annulée">Annulée</option>
            </select>
          <input 
            type="file" 
            name="image" 
            onChange={handleChange} 
            className={`${inputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer`} 
          />
        </div>

        {/* Advanced/Hidden Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 border-t mt-5">
          <input 
            type="number" 
            name="rating" 
            placeholder="Rating (0-5)" 
            value={formData.rating} 
            onChange={handleChange} 
            className={inputClasses} 
            min="0" 
            max="5" 
            step="0.1" 
          />
          <input 
            type="text" 
            name="categorie_id" 
            placeholder="Catégorie ID" 
            value={formData.categorie_id} 
            onChange={handleChange} 
            className={inputClasses} 
          />
          {/* <input 
            type="text" 
            name="organisateur_id" 
            placeholder="Organisateur ID" 
            value={formData.organisateur_id} 
            onChange={handleChange} 
            className={inputClasses} 
          /> */}
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full px-6 py-3 mt-6 text-lg bg-green-600 text-white font-bold rounded-xl 
                     hover:bg-green-700 transition duration-200 
                     shadow-lg hover:shadow-xl 
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"></path>
              </svg>
              Création en cours...
            </span>
          ) : (
            'Créer l\'Activité'
          )}
        </button>
      </form>
    </div>
  );
}
