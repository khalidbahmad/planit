import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UsersIcon,
  CalendarIcon,
  AlertCircleIcon,
  BarChart2Icon,
  Trash2Icon,
  UserXIcon,
  ClockIcon,
  CheckCircleIcon
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useAuth } from "../context/AuthContext"; // Hook réel d'auth
import { getActivitiesForUser } from "../services/api"; // API pour les activités utilisateur

// --- Composant Button simple ---
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

// ----------------------------------------------------
// --- DASHBOARD UTILISATEUR (Participant / Organisateur) ---
// ----------------------------------------------------
const UserActivitiesDashboard = ({ user, activities, loading }) => {
  const isParticipant = user?.typeUtilisateur === "participant";

  if (loading) {
    return (
      <div className="p-8 text-center text-xl text-blue-500">
        Chargement de vos activités...
      </div>
    );
  }

  const isActivityCurrent = (activity) => {
    const activityDate = new Date(activity.dateActivite || activity.date);
    const today = new Date();
    activityDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return activityDate >= today;
  };

  const currentActivities = activities.filter(isActivityCurrent);
  const pastActivities = activities.filter((a) => !isActivityCurrent(a));

  const title = isParticipant ? "Mes Participations" : "Mes Activités Créées";

  const ActivityList = ({ list, type }) => (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        {type === 'current' ? <ClockIcon size={20} className="mr-2 text-green-600" /> : <CheckCircleIcon size={20} className="mr-2 text-gray-500" />}
        {type === 'current' ? "Activités en Cours" : "Activités Passées"} ({list.length})
      </h3>
      {list.length === 0 ? (
        <p className="text-gray-500 italic">
          {isParticipant
            ? `Vous n'avez aucune participation ${type === 'current' ? 'prévue' : 'passée'}.`
            : `Aucune activité ${type === 'current' ? 'en cours' : 'passée'} n'a été trouvée.`}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {list.map((activity) => (
                <tr key={activity.idActivite || activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{activity.titre || activity.name}</td>
                  <td className="px-6 py-4">{activity.dateActivite || activity.date}</td>
                  <td className="px-6 py-4">{activity.lieu || 'N/A'}</td>
                  <td className="px-6 py-4">
                    {activity.participants?.length > 0 ? (
                      activity.participants.map((attendee) => (
                        <span key={attendee.idParticipant} className="inline-block mr-2">
                          {attendee.utilisateur.nom} {attendee.utilisateur.prenom}
                        </span>
                      ))
                    ) : 'Aucun participant'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <ActivityList list={currentActivities} type="current" />
      <ActivityList list={pastActivities} type="past" />
    </div>
  );
};

// ----------------------------------------------------
// --- DASHBOARD ADMIN ---
// ----------------------------------------------------
const COLORS = ["#3B82F6", "#10B981", "#8B5CF6"];

const StatCard = ({ title, value, icon, color, change }) => (
  <motion.div
    className={`p-6 rounded-xl shadow-lg flex items-center justify-between ${color} text-white`}
    whileHover={{ scale: 1.02 }}
  >
    <div>
      <p className="text-sm font-light opacity-80">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
      <p className="text-xs mt-2 opacity-90">{change} depuis le mois dernier</p>
    </div>
    <div className="text-4xl opacity-70">{icon}</div>
  </motion.div>
);

const AdminDashboardContent = ({
  dashboardStats,
  recentActivities,
  allUsers,
  handleDeleteUtilisateur,
  handleDeleteActivity,
  activeTab,
  setActiveTab
}) => {
  const OverviewTab = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Activité Mensuelle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardStats[0]?.monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="Activités" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Utilisateurs" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Distribution des Utilisateurs</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardStats[0]?.userDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {dashboardStats[0]?.userDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Activités Récentes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                <th className="relative px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{activity.name}</td>
                  <td className="px-6 py-4">{activity.organizer}</td>
                  <td className="px-6 py-4">{activity.date}</td>
                  <td className="px-6 py-4">{activity.participants}</td>
                  <td className="px-6 py-4 text-right">
                    <Button onClick={() => handleDeleteActivity(activity.id)} className="text-red-600 hover:text-red-900 p-1">
                      <Trash2Icon size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );

  const UserManagementTab = () => (
    <motion.div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Gestion des Utilisateurs ({allUsers.length})</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
              <th className="relative px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allUsers.map((u) => (
              <tr key={u.idUtilisateur} className="hover:bg-gray-50">
                <td className="px-6 py-4">{u.nom} {u.prenom}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    u.typeUtilisateur === "administrateur"
                      ? "bg-red-100 text-red-800"
                      : u.typeUtilisateur === "organisateur"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                  }`}>{u.typeUtilisateur}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button onClick={() => handleDeleteUtilisateur(u.idUtilisateur)} className="text-red-600 hover:text-red-900 p-1 bg-transparent">
                    <UserXIcon size={18} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  return (
    <>
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {["overview", "users"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab === "overview" ? "Vue d'ensemble" : "Gestion Utilisateurs"}
            </button>
          ))}
        </nav>
      </div>
      <main>
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "users" && <UserManagementTab />}
      </main>
    </>
  );
};

// ----------------------------------------------------
// --- COMPOSANT PRINCIPAL (AdminDashboard / UserDashboard) ---
// ----------------------------------------------------
export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [userActivities, setUserActivities] = useState([]);
  const [dashboardStats, setDashboardStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (authLoading) return;

    setLoading(true);

    if (user?.typeUtilisateur === "administrateur") {
      setTimeout(() => {
        setDashboardStats([{
          title: "Total Users",
          value: 120,
          icon: <UsersIcon />,
          color: "bg-blue-500",
          change: 5,
          monthlyData: [
            { name: "Jan", Activités: 4000, Utilisateurs: 2400 },
            { name: "Fév", Activités: 3000, Utilisateurs: 1398 },
            { name: "Mar", Activités: 2000, Utilisateurs: 9800 },
          ],
          userDistribution: [
            { name: "Participants", value: 400 },
            { name: "Organisateurs", value: 300 },
            { name: "Administrateurs", value: 300 },
          ],
        }]);
        setRecentActivities([
          { id: 1, name: "Yoga Class", organizer: "Alice", date: "2025-10-29", participants: 10 },
          { id: 2, name: "Coding Workshop", organizer: "Bob", date: "2025-10-28", participants: 15 },
          { id: 3, name: "Football Match", organizer: "Charlie", date: "2025-10-27", participants: 22 },
        ]);
        setAllUsers([
          { idUtilisateur: 1, nom: "Alice", prenom: "Dupont", email: "alice@test.com", typeUtilisateur: "organisateur" },
          { idUtilisateur: 2, nom: "Bob", prenom: "Martin", email: "bob@test.com", typeUtilisateur: "administrateur" },
          { idUtilisateur: 3, nom: "Charlie", prenom: "Durand", email: "charlie@test.com", typeUtilisateur: "participant" },
        ]);
        setLoading(false);
      }, 800);
    } else if (user?.idUtilisateur) {
      getActivitiesForUser(user.idUtilisateur)
        .then(res => setUserActivities(res.data))
        .catch(err => {
          console.error(err);
          setUserActivities([]);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleDeleteUtilisateur = (userId) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      setAllUsers(allUsers.filter((u) => u.idUtilisateur !== userId));
      alert("Utilisateur supprimé (simulation).");
    }
  };

  const handleDeleteActivity = (activityId) => {
    if (window.confirm("Supprimer cette activité ?")) {
      setRecentActivities(recentActivities.filter((a) => a.id !== activityId));
      alert("Activité supprimée (simulation).");
    }
  };

  if (authLoading) {
    return <div className="p-8 text-center text-xl text-blue-500">Chargement de l'authentification...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center text-xl text-red-500">Accès refusé. Veuillez vous connecter.</div>;
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-inter">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
          <BarChart2Icon className="w-8 h-8 mr-3 text-blue-600" /> Tableau de Bord {user.typeUtilisateur.charAt(0).toUpperCase() + user.typeUtilisateur.slice(1)}
        </h1>
      </header>

      {user.typeUtilisateur === "administrateur" ? (
        <AdminDashboardContent
          dashboardStats={dashboardStats}
          recentActivities={recentActivities}
          allUsers={allUsers}
          handleDeleteUtilisateur={handleDeleteUtilisateur}
          handleDeleteActivity={handleDeleteActivity}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ) : (
        <UserActivitiesDashboard
          user={user}
          activities={userActivities}
          loading={loading}
        />
      )}
    </div>
  );
}
