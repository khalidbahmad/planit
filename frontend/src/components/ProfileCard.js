import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPinIcon, UserIcon } from 'lucide-react';
import { Avatar } from './Avatar';
import { Button } from './ui/Button';
/**
 * ProfileCard component displays a user profile preview
 * @param {Object} props
 * @param {string|number} props.id - User ID
 * @param {string} props.name - User's name
 * @param {string} props.avatar - URL to user's avatar
 * @param {string} props.location - User's location
 * @param {string[]} props.interests - Array of user interests
 * @param {boolean} props.isOnline - Whether user is currently online
 */
export function ProfileCard({
  id,
  name,
  avatar,
  location,
  interests = [],
  isOnline = false
}) {
  return <motion.div className="bg-white rounded-2xl shadow-card overflow-hidden" whileHover={{
    y: -4
  }} transition={{
    duration: 0.3
  }}>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Avatar src={avatar} alt={name} size="lg" status={isOnline ? "online" : "offline"} />
          <div className="ml-4">
            <Link to={`/profile/${id}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors">
                {name}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPinIcon size={14} className="mr-1" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        {interests.length > 0 && <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {interest}
                </span>)}
            </div>
          </div>}
        <div className="flex space-x-2">
          <Button variant="primary" size="sm" fullWidth>
            Connect
          </Button>
          <Button variant="ghost" size="sm" icon={<UserIcon size={16} />}>
            Profile
          </Button>
        </div>
      </div>
    </motion.div>;
}