import React from 'react';
/**
 * Avatar component displays a user's profile image with optional online status indicator
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text for the image
 * @param {string} props.size - Size of the avatar (xs, sm, md, lg, xl)
 * @param {string} props.status - Online status (online, offline, away, busy, or null for no indicator)
 * @param {string} props.className - Additional CSS classes
 */
export function Avatar({
  src,
  alt,
  size = "md",
  status = null,
  className = ""
}) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500"
  };
  // Size of status indicator based on avatar size
  const statusSizeClasses = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-4 h-4"
  };
  return <div className={`relative inline-block ${className}`}>
      {src ? <img src={src} alt={alt || "Avatar"} className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm`} /> : <div className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center text-gray-600`}>
          {alt ? alt.charAt(0).toUpperCase() : "U"}
        </div>}
      {status && <span className={`absolute bottom-0 right-0 ${statusSizeClasses[size]} ${statusColors[status]} rounded-full border-2 border-white`} aria-label={`Status: ${status}`} />}
    </div>;
}