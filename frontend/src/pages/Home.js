import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchIcon, MapPinIcon, CalendarIcon, TagIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ActivityCard } from '../components/ActivityCard';
import { categories } from '../data/mockActivities';
import { getActivities, joinActivity } from "../services/api"; 
import { useAuth } from "../context/AuthContext";


export default function Home() {
  const [activities, setActivities] = useState([]);

   const { user } = useAuth();

  useEffect(() => {
    getActivities().then((res) => setActivities(res.data));
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
  return <div className="bg-slate-50 min-h-screen">
    
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }}>
              Join Your Next <span className="text-primary">Adventure</span>
            </motion.h1>
            <motion.p className="text-lg sm:text-xl text-gray-600 mb-8" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
              Connect with people who share your interests and discover exciting activities in your community.
            </motion.p>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </motion.div>
          </div>
          {/* Search Bar */}
          <motion.div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-soft p-2 sm:p-4" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" placeholder="Location" className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TagIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white" aria-label="Activity type">
                  <option value="">Activity Type</option>
                  <option value="outdoors">Outdoors</option>
                  <option value="technology">Technology</option>
                  <option value="arts">Arts</option>
                  <option value="food">Food & Drink</option>
                  <option value="wellness">Wellness</option>
                </select>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" placeholder="Date" className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white" />
              </div>
            </div>
            <div className="mt-3">
              <Button variant="primary" fullWidth icon={<SearchIcon size={18} />}>
                Search Activities
              </Button>
            </div>
          </motion.div>
        </div>
        {/* Decorative Elements */}
        <div className="hidden sm:block absolute top-10 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="hidden sm:block absolute bottom-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </section>

      {/* Popular Activities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popular Activities Near You</h2>
            <Link to="/activities" className="text-primary hover:underline flex items-center">
              <span>View all</span>
              <ArrowRightIcon size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            { activities.slice(0, 3).map(activity => <ActivityCard
                          key={activity.idActivite}
                          {...activity}
                          loggedInUser={user}
                          onJoin={handleJoin}
                        />)}
          </div>
        </div>
      </section>

      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => <motion.div key={index} className={`${category.color} rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow`} whileHover={{
            y: -5
          }}>
                <img src={category.icon} alt={category.name} className="w-12 h-12 rounded-full mb-3 object-cover" />
                <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
              </motion.div>)}
          </div>
        </div>
      </section>
      {/* Community Section */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Join the Community</h2>
            <p className="text-lg text-gray-600">
              Connect with thousands of people who share your interests and passions.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => <motion.div key={i} className="aspect-square overflow-hidden rounded-lg" initial={{
                  opacity: 0,
                  scale: 0.8
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  duration: 0.3,
                  delay: i * 0.05
                }}>
                      <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="Community member" className="w-full h-full object-cover" />
                    </motion.div>)}
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                  <span className="text-sm font-semibold">+5,000 members</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="space-y-4">
                {[{
                name: "Discover",
                description: "Find activities that match your interests and schedule."
              }, {
                name: "Connect",
                description: "Meet new people and build meaningful relationships."
              }, {
                name: "Organize",
                description: "Create your own activities and grow your community."
              }].map((item, index) => <motion.div key={index} className="flex items-start" initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.3,
                delay: index * 0.1
              }}>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>)}
              </div>
              <Button variant="primary" size="lg">
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center">
            What Our Members Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            quote: "Plan'It helped me find amazing hiking groups in my area. I've made lifelong friends!",
            name: "Sarah Johnson",
            role: "Member since 2022",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
          }, {
            quote: "As someone new to the city, this platform made it easy to connect with like-minded people.",
            name: "Michael Chen",
            role: "Member since 2021",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
          }, {
            quote: "I've organized over 20 events through Plan'It. The tools make it simple and fun!",
            name: "Aisha Patel",
            role: "Organizer since 2020",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
          }].map((testimonial, index) => <motion.div key={index} className="bg-slate-50 p-6 rounded-2xl" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3,
            delay: index * 0.1
          }}>
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>)}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Ready to Join Your Next Adventure?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Sign up today and start connecting with people who share your interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Sign Up
              </Button>
              <Button variant="ghost" size="lg" className="bg-white/10 text-white border border-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
}