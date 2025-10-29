import React, { useState } from 'react';
import { Avatar } from './Avatar';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUpIcon, ThumbsDownIcon, ReplyIcon, MoreHorizontalIcon } from 'lucide-react';

/**
 * CommentList compatible avec Laravel API
 * @param {Array} comments - Liste des commentaires Laravel
 * @param {Function} onAddComment - Callback pour ajouter un commentaire
 */
export function CommentList({ comments = [], onAddComment }) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment({
        contenu: newComment,
        parentId: replyingTo
      });
      setNewComment('');
      setReplyingTo(null);
    }
  };

  const handleReply = commentId => {
    setReplyingTo(commentId);
  };

  // Aucun parentId dans ton JSON → on considère tout comme top-level
  const topLevelComments = comments.filter(c => !c.parentId);

  const renderComment = comment => {
    const id = comment.idCommentaire || comment.id;
    const auteur = comment.auteur || {};
    const nomComplet = `${auteur.prenom || ''} ${auteur.nom || ''}`.trim() || 'Utilisateur';
    const avatar = auteur.photoProfil || `https://i.pravatar.cc/150?u=${id}`;

    return (
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <div className="flex">
          <Avatar src={avatar} alt={nomComplet} size="md" className="mr-3 flex-shrink-0" />
          <div className="flex-1">
            <div className="bg-gray-50 p-4 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{nomComplet}</h4>
                  <p className="text-xs text-gray-500">
                    {comment.dateCommentaire
                      ? new Date(comment.dateCommentaire).toLocaleString()
                      : 'Date inconnue'}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontalIcon size={16} />
                </button>
              </div>
              <p className="text-gray-700">{comment.contenu}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-2 ml-2">
              <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                <ThumbsUpIcon size={14} className="mr-1" />
                <span>{comment.likes || 0}</span>
              </button>
              <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                <ThumbsDownIcon size={14} className="mr-1" />
                <span>{comment.dislikes || 0}</span>
              </button>
              <button
                className="flex items-center text-xs text-gray-500 hover:text-gray-700"
                onClick={() => handleReply(id)}
              >
                <ReplyIcon size={14} className="mr-1" />
                <span>Répondre</span>
              </button>
            </div>

            {/* Formulaire de réponse */}
            <AnimatePresence>
              {replyingTo === id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 ml-2"
                >
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      placeholder={`Répondre à ${nomComplet}...`}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button type="submit" size="sm">Envoyer</Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                      Annuler
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Formulaire de nouveau commentaire */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <Avatar
            src="https://i.pravatar.cc/150?u=default"
            size="md"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows="3"
            />
            <div className="flex justify-end mt-2">
              <Button type="submit" disabled={!newComment.trim()}>
                Commenter
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Liste des commentaires */}
      <div>
        {topLevelComments.length > 0 ? (
          topLevelComments.map(comment => renderComment(comment))
        ) : (
          <p className="text-center text-gray-500">Aucun commentaire pour le moment.</p>
        )}
      </div>
    </div>
  );
}
