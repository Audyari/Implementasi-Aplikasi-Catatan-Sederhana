import React from 'react';
import PropTypes from 'prop-types';
import '../assets/CSS/NoteCard.css';

const NoteCard = ({ title, content, date, onDelete }) => {
  const formattedDate = new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="note-card">
      <div className="note-card__header">
        <h3 className="note-card__title">{title}</h3>
        <small className="note-card__date">{formattedDate}</small>
      </div>
      <div className="note-card__content">
        {content.length > 100 ? `${content.substring(0, 100)}...` : content}
      </div>
      <button 
        className="note-card__delete"
        onClick={onDelete}
        data-testid="note-card-delete"
      >
        Hapus
      </button>
    </div>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default NoteCard;