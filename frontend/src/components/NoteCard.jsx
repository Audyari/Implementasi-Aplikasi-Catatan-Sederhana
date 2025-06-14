import React from 'react';
import PropTypes from 'prop-types';
import '../assets/CSS/NoteCard.css';

const NoteCard = ({ title, content, date, onDelete }) => {
  // Format tanggal menjadi format yang lebih mudah dibaca
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
      {onDelete && (
        <div className="note-card__actions">
         <button 
            className="note-card__delete" 
            onClick={onDelete}
            aria-label="Hapus catatan"
            data-testid="delete-button"  // Tambahkan ini
        >
            Hapus
        </button>
        </div>
      )}
    </div>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]).isRequired,
  onDelete: PropTypes.func
};

export default NoteCard;