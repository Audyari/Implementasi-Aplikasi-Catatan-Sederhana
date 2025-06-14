
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NoteCard from './NoteCard';
import '../assets/CSS/NoteList.css';

function NoteList({ notes = [], onDeleteNote }) {
  useEffect(() => {
    document.title = "Daftar Catatan";
  }, []);

  return (
    <div className="note-list">
      <h2 className="note-list__title">Daftar Catatan</h2>
      <div className="notes-grid">
        {notes.length === 0 ? (
          <p className="empty-message">Tidak ada catatan.</p>
        ) : (
          notes.map((note, index) => (
            <NoteCard
              key={note.id || index}
              title={note.title}
              content={note.content}
              date={note.createdAt}
              onDelete={() => onDeleteNote(note.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
      ]).isRequired
    })
  ).isRequired,
  onDeleteNote: PropTypes.func.isRequired
};

export default NoteList;