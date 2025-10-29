import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ActivityCard } from "../components/ActivityCard";
import { RatingStars } from "../components/RatingStars";
import { MapPinIcon, SettingsIcon, UsersIcon, MessageCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getUserById, getActivitiesForUser } from "../services/api";

export default function Profile() {
  const { user } = useAuth();
  const { idUtilisateur } = useParams();

  const [profileUser, setProfileUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (idUtilisateur === "me") {
          setProfileUser(user);
          const actRes = await getActivitiesForUser(user.idUtilisateur);
          setActivities(actRes.data);
        } else {
          const resUser = await getUserById(idUtilisateur);
          setProfileUser(resUser.data);

          const resActivities = await getActivitiesForUser(idUtilisateur);
          setActivities(resActivities.data);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchData();
  }, [idUtilisateur, user]);

  if (!profileUser) return <p>Loading user data...</p>;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Cover Photo */}
      <div className="h-48 sm:h-64 w-full bg-gray-200 relative">
        <img
          src={profileUser.photoProfil || "/default-cover.jpg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-card -mt-16 relative z-10 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end">
            <div className="relative">
              <img
                src={profileUser.photoProfil || "/default-avatar.jpg"}
                alt={profileUser.nom}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-sm object-cover -mt-16 sm:-mt-24"
              />
            </div>

            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {profileUser.nom} {profileUser.prenom}
              </h1>
              <div className="flex items-center justify-center sm:justify-start mt-1">
                <MapPinIcon size={16} className="text-gray-400 mr-1" />
                <span className="text-gray-600">{profileUser.ville || "N/A"}</span>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex space-x-2">
              <Button variant="primary" size="sm" icon={<UsersIcon size={16} />}>
                Connect
              </Button>
              <Link to="/chat">
                <Button variant="ghost" size="sm" icon={<MessageCircle size={16} />}>
                  Message
                </Button>
              </Link>
              {profileUser.idUtilisateur === user.idUtilisateur && (
                <Link to={`/profile/${user.idUtilisateur}/edit`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<SettingsIcon size={16} />}
                    className="hidden sm:flex"
                  >
                    Edit Profile
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-gray-600">{profileUser.bio || "No bio available."}</p>
          </div>

          <div className="mt-6 flex items-center space-x-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{profileUser.commentaires?.length || 0}</p>
              <p className="text-sm text-gray-500">Commentaires</p>
            </div>
            <div className="flex items-center ml-auto">
              <RatingStars rating={4.8} />
              <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
            </div>
          </div>
        </div>

        {/* Activities Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Activities
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "past"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Past Activities
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "organized"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("organized")}
            >
              Organized
            </button>
          </div>

          {activeTab === "upcoming" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.slice(0, 3).map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
              ))}
            </div>
          )}

          {activeTab === "past" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.slice(3, 6).map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
              ))}
            </div>
          )}

          {activeTab === "organized" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((a) => a.organizer.idUtilisateur === profileUser.idUtilisateur)
                .map((activity) => (
                  <ActivityCard key={activity.id} {...activity} />
                ))}

              {activities.filter((a) => a.organizer.idUtilisateur === profileUser.idUtilisateur)
                .length === 0 && (
                <div className="col-span-3 py-12 text-center">
                  <p className="text-gray-500">No organized activities yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}