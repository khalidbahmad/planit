import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  SendIcon,
  SearchIcon,
  SmileIcon,
  PaperclipIcon,
  ChevronLeftIcon,
  MessageCircle,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  getConversations,
  getConversationById,
  sendMessage,
  createConversation,
  getUtilisateurs,
  formatMessageTime,
} from "../services/api";

// =============================
// --- AVATAR COMPONENT ---
// =============================
const Avatar = ({ src, alt, isOnline = false, size = "md" }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]}`}>
      <div
        className={`flex items-center justify-center ${sizeClasses[size]} rounded-full bg-gray-300 overflow-hidden shadow-inner`}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/150x150/9ca3af/ffffff?text=U";
            }}
          />
        ) : (
          <User className="text-white h-5 w-5" />
        )}
      </div>
      {isOnline && (
        <div className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400"></div>
      )}
    </div>
  );
};

// =============================
// --- CHAT COMPONENT ---
// =============================
export default function Chat() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Charger conversations
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const res = await getConversations();
        setConversations(res.data);
      } catch (error) {
        console.error("Erreur de chargement des conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  // Charger messages
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await getConversationById(selectedConversation.id);
        setMessages(res.data.messages || []);
      } catch (error) {
        console.error("Erreur de chargement des messages:", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  // Charger utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUtilisateurs();
        setUsers(res.data.filter((u) => u.idUtilisateur !== user.idUtilisateur));
      } catch (error) {
        console.error("Erreur de chargement des utilisateurs:", error);
      }
    };
    fetchUsers();
  }, [user.idUtilisateur]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Envoyer message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!selectedConversation) {
      console.warn("Aucune conversation sélectionnée");
      return;
    }

    await sendMessageToConversation(selectedConversation.id, message.trim());
    setMessage("");
  };

  // Créer ou récupérer conversation et envoyer message
  const sendMessageToConversation = async (convId, text) => {
    try {
      const response = await sendMessage(convId, { text });
      const newMessage = response.data;

      setMessages((prev) => [...prev, newMessage]);

      // Mettre à jour lastMessage dans la conversation
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? { ...c, lastMessage: { text: newMessage.text, created_at: newMessage.created_at } }
            : c
        )
      );

      setSelectedConversation((prev) => ({
        ...prev,
        lastMessage: { text: newMessage.text, created_at: newMessage.created_at },
      }));
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

  // Envoyer message à un utilisateur (pas encore de conversation)
 const sendMessageToUser = async (userId, text = "") => {
  try {
    // Créer la conversation même si aucun message n'est encore envoyé
    const res = await createConversation(userId);
    const conv = res.data;

    if (!conversations.some((c) => c.id === conv.id)) {
      setConversations((prev) => [conv, ...prev]);
    }

    setSelectedConversation(conv);

    if (text.trim()) {
      await sendMessageToConversation(conv.id, text);
    }

    // Charger les messages après création
    const resMessages = await getConversationById(conv.id);
    setMessages(resMessages.data.messages || []);
  } catch (error) {
    console.error("Erreur lors de l'envoi du message à l'utilisateur :", error);
  }
};


  // Sélection utilisateur
  const handleSelectUser = (userId) => {
    sendMessageToUser(userId, "");
  };

  // Filtrage
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage?.text?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter((u) =>
    u.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ConversationItem = ({ conv, isSelected, onClick }) => (
    <motion.div
      className={`flex items-center p-3 cursor-pointer transition duration-150 rounded-xl m-1 ${
        isSelected
          ? "bg-green-100 dark:bg-green-700 shadow-sm"
          : "hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
      onClick={() => onClick(conv)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <Avatar src={conv.avatar} alt={conv.name} isOnline={conv.isOnline} />
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {conv.name}
          </p>
          {conv.lastMessage && (
            <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
              {formatMessageTime(conv.lastMessage.created_at)}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
          {conv.lastMessage?.text || "Aucun message récent"}
        </p>
      </div>
    </motion.div>
  );

  const MessageBubble = ({ message }) => {
    const isMine = message.sender_id === user.idUtilisateur;
    const time = formatMessageTime(message.created_at);

    return (
      <div className={`flex mb-4 ${isMine ? "justify-end" : "justify-start"}`}>
        <div className={`flex max-w-xs md:max-w-md ${isMine ? "flex-row-reverse" : "flex-row"}`}>
          {!isMine && (
            <div className="flex-shrink-0 ml-2">
              <Avatar src={message.sender?.photoProfil} alt={message.sender?.nom || "Expéditeur"} size="sm" />
            </div>
          )}
          <div className={`relative p-3 rounded-xl shadow-md ${
            isMine ? "bg-green-500 text-white rounded-tr-none" : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none"
          }`}>
            <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
            <span className={`block mt-1 text-right text-[10px] ${
              isMine ? "text-green-200" : "text-gray-400 dark:text-gray-400"
            }`}>
              {time}
            </span>
          </div>
          {isMine && <div className="w-10 ml-2"></div>}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* SIDEBAR */}
      <div className="flex-shrink-0 w-full md:w-80 border-r dark:border-gray-700 flex flex-col absolute md:relative z-40 h-full bg-white dark:bg-gray-800">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h2>
        </div>
        <div className="p-4 border-b dark:border-gray-700">
          <div className="relative">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="text-center p-4 text-gray-500 dark:text-gray-400">Chargement...</div>
          ) : filteredConversations.length > 0 || filteredUsers.length > 0 ? (
            <>
              {filteredConversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  isSelected={selectedConversation?.id === conv.id}
                  onClick={setSelectedConversation}
                />
              ))}

              {filteredUsers.map((u) => (
                <ConversationItem
                  key={u.idUtilisateur}
                  conv={{
                    id: u.idUtilisateur,
                    name: u.nom,
                    avatar: u.photoProfil,
                    isOnline: u.isOnline || false,
                    lastMessage: null,
                  }}
                  isSelected={selectedConversation?.id === u.idUtilisateur}
                  onClick={() => handleSelectUser(u.idUtilisateur)}
                />
              ))}
            </>
          ) : (
            <div className="text-center p-4 text-gray-500 dark:text-gray-400">
              Aucune conversation ni utilisateur trouvé.
            </div>
          )}
        </div>
      </div>

      {/* ZONE DE CHAT PRINCIPALE */}
      <div className={`flex-1 flex flex-col ${!selectedConversation ? "hidden md:flex" : ""}`}>
        {selectedConversation ? (
          <>
            {/* HEADER */}
            <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm flex items-center">
              <button
                className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-2"
                onClick={() => setSelectedConversation(null)}
              >
                <ChevronLeftIcon size={24} />
              </button>
              <Avatar
                src={selectedConversation.avatar}
                alt={selectedConversation.name}
                size="md"
                isOnline={selectedConversation.isOnline}
              />
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedConversation.name}</h3>
                <p className={`text-xs ${selectedConversation.isOnline ? "text-green-500" : "text-gray-500 dark:text-gray-400"}`}>
                  {selectedConversation.isOnline ? "En ligne" : "Hors ligne"}
                </p>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900">
              {loading ? (
                <div className="flex justify-center items-center h-full text-gray-500 dark:text-gray-400">
                  <p>Chargement des messages...</p>
                </div>
              ) : messages.length > 0 ? (
                messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">
                    Commencez la conversation avec {selectedConversation.name} !
                  </p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition">
                  <PaperclipIcon size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Écrire un message..."
                  className="flex-1 mx-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading}
                />
                <button type="button" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition">
                  <SmileIcon size={20} />
                </button>
                <button type="submit" className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50 transition" disabled={!message.trim() || loading}>
                  <SendIcon size={20} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center p-6">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-6 inline-block mb-4">
                <MessageCircle size={32} className="text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-1">Vos messages</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Sélectionnez un utilisateur ou une conversation pour commencer.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
