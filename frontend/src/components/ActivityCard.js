import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarIcon, MapPinIcon, UsersIcon, StarIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { Avatar } from "./Avatar";

export function ActivityCard({
  idActivite,
  titre,
  image,
  dateActivite,
  lieu,
  type,
  nbMaxParticipants,
  organisateur,
  attendees = [],
  rating,
  loggedInUser,
  onJoin,
}) {
  const isJoined =
    loggedInUser &&
    attendees.some(
      (participant) => participant.idUtilisateur === loggedInUser.idUtilisateur
    );

  const categoryName = type || "Autre";
  const organizer = organisateur || { name: "Inconnu", avatar: "" };
  
                  console.log('loggedInUser', loggedInUser);
                  console.log('attendees', attendees);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/activities/${idActivite}`} className="block">
        <div className="relative h-48">
          <img
            src={image || "/default-activity.jpg"}
            alt={titre}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white bg-opacity-90 text-primary text-xs font-medium px-2 py-1 rounded-full">
              {categoryName}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/activities/${idActivite}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
            {titre}
          </h3>
        </Link>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon size={16} className="mr-2 text-gray-400" />
            <span>{dateActivite}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPinIcon size={16} className="mr-2 text-gray-400" />
            <span>{lieu}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <UsersIcon size={16} className="mr-2 text-gray-400" />
            <span>
              {attendees.length}
              {nbMaxParticipants ? ` / ${nbMaxParticipants}` : ""} participants
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <StarIcon size={16} className="mr-2 text-yellow-500" />
            <span>{rating ?? "N/A"}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Avatar src={organizer.avatar} alt={organizer.name} size="sm" />
            <span className="ml-2 text-sm text-gray-600">
              {organizer.name || "Organisateur inconnu"}
            </span>
          </div>

          <Button
            onClick={() => {
              if (!loggedInUser) {
                alert("Vous devez être connecté pour participer !");
                return;
              }
              onJoin(idActivite, loggedInUser.idUtilisateur);
            }}
            disabled={!loggedInUser || isJoined}
          >
            {!loggedInUser
              ? "Connexion requise"
              : isJoined
              ? "Déjà inscrit"
              : "Participer"}
          </Button>
          </div>
      </div>
    </motion.div>
  );
}
