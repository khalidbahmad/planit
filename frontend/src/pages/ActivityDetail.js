import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/Avatar';
import { RatingStars } from '../components/RatingStars';
import { CommentList } from '../components/CommentList';
import {
  CalendarIcon, MapPinIcon, UsersIcon,
  InfoIcon, MessageSquareIcon, ShareIcon,
  HeartIcon, BookmarkIcon
} from 'lucide-react';
import { getActivities, joinActivity } from "../services/api"; 

export default function ActivityDetail() {
  const { idActivite } = useParams();
  const [activity, setActivity] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 MOCK USER - remplacer par ton AuthContext réel
  const loggedInUser = { 
    id: 101,
    nom: "Dupont",
    prenom: "Alice",
    photoProfil: "https://i.pravatar.cc/150?img=1"
  };

  // Memoize l'utilisateur pour useCallback
  const memoizedUser = useMemo(() => loggedInUser, [loggedInUser]);

  // --- Fetch activity by ID ---
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await getActivities();
        const allActivities = response.data;
        const foundActivity = allActivities.find(a => a.idActivite.toString() === idActivite);
        setActivity(foundActivity);
      } catch (err) {
        console.error("Erreur de récupération :", err);
        setError("Impossible de charger l'activité.");
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, [idActivite]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!activity) return <p className="text-center mt-10">Activité non trouvée</p>;

  const attendeesCount = activity?.attendees?.length || 0;
  const isJoined = memoizedUser && activity?.attendees?.some(p => p.idUtilisateur === memoizedUser.id);

  // --- Join Activity ---
  const handleJoinActivity = useCallback(async (id) => {
    if (!memoizedUser) {
      alert("Veuillez vous connecter pour participer.");
      return;
    }

    if (isJoined || (activity.nbMaxParticipants && attendeesCount >= activity.nbMaxParticipants)) {
      alert("Impossible de rejoindre : activité complète ou déjà inscrite !");
      return;
    }

    try {
      const updatedActivityData = await joinActivity(id, memoizedUser.id);
      setActivity(prev => ({
        ...prev,
        attendees: updatedActivityData.attendees,
      }));
      alert("Vous avez rejoint l'activité avec succès ! 🎉");
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      alert("Erreur lors de l'inscription.");
    }
  }, [memoizedUser, isJoined, attendeesCount, activity?.nbMaxParticipants]);

  // --- Organizer ---
  const organizer = activity.organisateur?.utilisateur || {
    nom: "Inconnu",
    prenom: "",
    photoProfil: null
  };
  const categoryName = activity.type || "Autre";

  const tabs = [
    { id: 'details', label: 'Détails', icon: <InfoIcon size={18} /> },
    { id: 'participants', label: 'Participants', icon: <UsersIcon size={18} /> },
    { id: 'comments', label: 'Commentaires', icon: <MessageSquareIcon size={18} /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">À propos de cette activité</h3>
              <p className="text-gray-600">{activity.description || "Aucune description fournie."}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Lieu</h3>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">{activity.lieu}</p>
              </div>
            </div>
          </div>
        );
      case 'participants':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Participants ({attendeesCount} / {activity.nbMaxParticipants || '∞'})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activity.attendees?.map((p, i) => (
                <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Avatar
                    src={p.utilisateur?.photoProfil || `https://i.pravatar.cc/150?img=${i + 10}`}
                    alt={`${p.utilisateur?.prenom || 'Utilisateur'} ${p.utilisateur?.nom || ''}`}
                    size="md"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-sm">
                      {p.utilisateur ? `${p.utilisateur.prenom} ${p.utilisateur.nom}` : `Participant ${i + 1}`}
                    </p>
                    <p className="text-xs text-gray-500">{p.utilisateur?.ville || "Ville inconnue"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'comments':
        const canComment = isJoined || (activity.organisateur?.idUtilisateur === memoizedUser.id);
        if (!canComment) {
          return (
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <MessageSquareIcon size={24} className="mx-auto text-yellow-600 mb-3" />
              <p className="font-semibold text-yellow-800 mb-2">Participez pour commenter !</p>
              <p className="text-sm text-yellow-700">Vous devez être inscrit à cette activité pour laisser un commentaire.</p>
            </div>
          );
        }

        return (
          <CommentList
            comments={activity.commentaires?.map(c => ({
              id: c.idCommentaire,
              content: c.contenu,
              author: `${c.auteur?.prenom || 'Anonyme'} ${c.auteur?.nom || ''}`,
              date: c.dateCommentaire
            })) || []}
            onAddComment={c => console.log('Nouveau commentaire :', c)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Image de couverture */}
      <div className="h-64 sm:h-96 w-full bg-gray-200 relative">
        <img
          src={activity.image || "https://via.placeholder.com/800x400?text=Pas+d'image"}
          alt={activity.titre}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="p-2 bg-white/80 rounded-full hover:bg-white"><ShareIcon size={20} /></button>
          <button className="p-2 bg-white/80 rounded-full hover:bg-white"><HeartIcon size={20} /></button>
          <button className="p-2 bg-white/80 rounded-full hover:bg-white"><BookmarkIcon size={20} /></button>
        </div>
      </div>

      {/* Infos principales */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-2">
                {categoryName}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{activity.titre}</h1>
              <div className="mt-2 flex items-center">
                <RatingStars rating={Number(activity.rating) || 4.5} size="sm" />
                <span className="ml-2 text-sm text-gray-500">({Number(activity.rating) || 4.5} / 5)</span>
              </div>
            </div>

            {/* Join Button */}
            <div className="mt-4 md:mt-0">
              <Button 
                variant={isJoined ? "secondary" : "primary"} 
                size="lg"
                onClick={() => handleJoinActivity(activity.idActivite)}
                disabled={isJoined || attendeesCount >= (activity.nbMaxParticipants || Infinity)}
              >
                {isJoined ? "Inscrit" : "Participer"}
              </Button>
            </div>
          </div>

          {/* Détails clés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center">
              <CalendarIcon size={20} className="mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{activity.dateActivite}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPinIcon size={20} className="mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Lieu</p>
                <p className="font-medium">{activity.lieu}</p>
              </div>
            </div>
            <div className="flex items-center">
              <UsersIcon size={20} className="mr-3 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Participants max</p>
                <p className="font-medium">{activity.nbMaxParticipants}</p>
              </div>
            </div>
          </div>

          {/* Organisateur */}
          <div className="flex items-start mb-6">
            <Avatar
              src={organizer.photoProfil || "https://i.pravatar.cc/150?img=8"}
              alt={`${organizer.prenom} ${organizer.nom}`}
              size="lg"
              status="online"
            />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Organisé par</p>
              <p className="font-medium">{`${organizer.prenom} ${organizer.nom}`}</p>
              <Button variant="ghost" size="sm" className="mt-1 px-0">Voir le profil</Button>
            </div>
          </div>

          {/* Onglets */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto" aria-label="Activity tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenu de l'onglet */}
          <div className="py-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
