export const activities = [
  {
    id: 1,
    title: "Weekend Hiking Adventure",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    date: "Sat, Aug 26 · 9:00 AM",
    location: "Mountain View Trail, CA",
    category: "Outdoors",
    attendees: [1, 2], // user IDs
    maxAttendees: 25,
    organizer: {
      id: 1,
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    description: "Join us for a refreshing hike through scenic Mountain View Trail. Perfect for all experience levels!",
    rating: 4.8,
    comments: [
      {
        id: 101,
        author: { id: 2, name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
        text: "This looks amazing! I've been wanting to explore this trail for a while.",
        date: "2 days ago",
        likes: 5
      },
      {
        id: 102,
        author: { id: 3, name: "Mike Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" },
        text: "Is this suitable for beginners? I'm new to hiking but would love to join.",
        date: "1 day ago",
        likes: 2
      }
    ]
  },
  {
    id: 2,
    title: "Tech Meetup: AI Innovations",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    date: "Wed, Aug 30 · 6:30 PM",
    location: "Innovation Hub, San Francisco",
    category: "Technology",
    attendees: [2],
    maxAttendees: 50,
    organizer: {
      id: 2,
      name: "Maya Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    description: "Explore the latest in AI technology with industry experts. Networking and refreshments included!",
    rating: 4.5,
    comments: []
  },
  {
    id: 3,
    title: "Community Yoga in the Park",
    image: "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    date: "Sun, Aug 27 · 8:00 AM",
    location: "Central Park, New York",
    category: "Wellness",
    attendees: [3],
    maxAttendees: 30,
    organizer: {
      id: 3,
      name: "Sam Taylor",
      avatar: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    description: "Start your Sunday with a relaxing yoga session in the park. All levels welcome. Bring your own mat!",
    rating: 4.9,
    comments: []
  },
  {
    id: 4,
    title: "Local Food Festival",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    date: "Sat, Sep 2 · 12:00 PM",
    location: "Waterfront Plaza, Seattle",
    category: "Food & Drink",
    attendees: [1, 2],
    maxAttendees: 200,
    organizer: {
      id: 4,
      name: "Jamie Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    description: "Sample delicious cuisine from local restaurants and food trucks. Live music and entertainment all day!",
    rating: 4.7,
    comments: []
  },
  {
    id: 5,
    title: "Photography Workshop",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    date: "Thu, Aug 31 · 5:00 PM",
    location: "Urban Arts Center, Chicago",
    category: "Arts",
    attendees: [2, 3],
    maxAttendees: 20,
    organizer: {
      id: 5,
      name: "Chris Morgan",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    description: "Learn composition, lighting, and editing techniques from professional photographers in this hands-on workshop.",
    rating: 4.6,
    comments: []
  },
  {
    id: 6,
    title: "Beach Cleanup Volunteer Day",
    image: "https://images.unsplash.com/photo-1618477202872-2c8127f9328c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    date: "Sat, Sep 9 · 10:00 AM",
    location: "Sunset Beach, Los Angeles",
    category: "Community",
    attendees: [1, 3],
    maxAttendees: 50,
    organizer: {
      id: 6,
      name: "Pat Wilson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    description: "Help keep our beaches clean! Equipment provided. Lunch and refreshments for all volunteers.",
    rating: 4.8,
    comments: []
  }
];

export const categories = [{
  name: "Outdoors",
  icon: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  color: "bg-green-100"
}, {
  name: "Technology",
  icon: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  color: "bg-blue-100"
}, {
  name: "Arts",
  icon: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  color: "bg-purple-100"
}, {
  name: "Food & Drink",
  icon: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  color: "bg-yellow-100"
}, {
  name: "Wellness",
  icon: "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  color: "bg-red-100"
}, {
  name: "Community",
  icon: "https://images.unsplash.com/photo-1618477202872-2c8127f9328c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  color: "bg-orange-100"
}];
export const mockGroups = [{
  id: 1,
  name: "Hiking Enthusiasts",
  image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  members: 128,
  description: "A group for people who love exploring trails and mountains together."
}, {
  id: 2,
  name: "Tech Meetups",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  members: 256,
  description: "Connect with tech enthusiasts and professionals for networking and knowledge sharing."
}, {
  id: 3,
  name: "Local Foodies",
  image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  members: 175,
  description: "Discover and share the best local restaurants and food experiences."
}, {
  id: 4,
  name: "Photography Club",
  image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  members: 94,
  description: "For photography lovers of all skill levels to share their work and learn together."
}, {
  id: 5,
  name: "Wellness & Yoga",
  image: "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  members: 112,
  description: "Focus on physical and mental wellbeing through yoga, meditation, and mindfulness."
}, {
  id: 6,
  name: "Beach Cleanup Crew",
  image: "https://images.unsplash.com/photo-1618477202872-2c8127f9328c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  members: 67,
  description: "Environmental volunteers dedicated to keeping our local beaches clean and beautiful."
}];
export const mockUsers = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex@example.com",
    password: "alex123",          // password for login
    type: "organizer",            // user type
    location: "San Francisco, CA",
    bio: "Hiking enthusiast and community organizer. Love exploring the outdoors and meeting new people!",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    interests: ["Hiking", "Photography", "Cooking", "Tech"],
    badges: [
      { name: "Active Organizer", icon: "🏆" },
      { name: "Explorer", icon: "🧭" },
      { name: "Community Builder", icon: "👥" }
    ],
    isOnline: true
  },
  {
    id: 2,
    name: "Maya Johnson",
    email: "maya@example.com",
    password: "maya123",
    type: "participant",
    location: "New York, NY",
    bio: "Tech enthusiast and event organizer. Always looking to connect with like-minded professionals.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    interests: ["Technology", "Networking", "AI", "Startups"],
    badges: [
      { name: "Tech Guru", icon: "💻" },
      { name: "Networker", icon: "🔗" }
    ],
    isOnline: true
  },
  {
    id: 3,
    name: "Sam Taylor",
    email: "sam@example.com",
    password: "sam123",
    type: "participant",
    location: "Los Angeles, CA",
    bio: "Yoga instructor and wellness advocate. Passionate about helping others find balance and inner peace.",
    avatar: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    interests: ["Yoga", "Meditation", "Wellness", "Nutrition"],
    badges: [
      { name: "Wellness Expert", icon: "🧘‍♀️" },
      { name: "Instructor", icon: "📚" }
    ],
    isOnline: false
  }
];
