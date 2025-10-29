import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FilterIcon,
  SearchIcon,
  MapPinIcon,
  CalendarIcon,
  TagIcon,
  XIcon,
} from "lucide-react";
import { ActivityCard } from "../components/ActivityCard";
import { Button } from "../components/ui/Button";
import { categories } from "../data/mockActivities";
import { getActivities, joinActivity } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useAuth();

  // ✅ Charger toutes les activités
  useEffect(() => {
    getActivities()
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Erreur de récupération :", error);
      });
  }, []);

  // Dans Home.js et Activities.js
  const handleJoin = async (activityId, userId) => {
    try {
      await joinActivity(activityId, userId);
      alert("Participation réussie !");
    } catch (err) {
      // Cette ligne affichera la réponse exacte du serveur (si disponible)
      const serverMessage = err.response?.data?.message || err.message;

      alert(`Erreur lors de la participation : ${serverMessage}`);
      console.error("Erreur complète de participation :", err);
    }
  };

  // ✅ Filtrage des activités
  const filteredActivities = selectedCategory
    ? activities.filter((activity) => activity.category === selectedCategory)
    : activities;

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Discover Activities
          </h1>
          <button
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
          >
            <FilterIcon size={18} className="mr-2" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters Panel */}
        <motion.div
          id="filter-panel"
          className="bg-white rounded-2xl shadow-card mb-8 overflow-hidden"
          initial={false}
          animate={{
            height: showFilters ? "auto" : 0,
            opacity: showFilters ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {showFilters && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filter Activities</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close filters"
                >
                  <XIcon size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Location Filter */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      placeholder="Enter location"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                    />
                  </div>
                </div>

                {/* Date Filter */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="date"
                      placeholder="Select date"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <TagIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-2">
                <Button variant="ghost" onClick={() => setSelectedCategory("")}>
                  Clear Filters
                </Button>
                <Button variant="primary" icon={<SearchIcon size={16} />}>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.name
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? "" : category.name
                )
              }
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600 mb-6">
          Showing {filteredActivities.length} activities
          {selectedCategory && ` in ${selectedCategory}`}
        </p>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.idActivite}
              {...activity}
              loggedInUser={user}
              onJoin={handleJoin}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
