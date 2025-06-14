
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NoteCard from './NoteCard';
import '../assets/CSS/NoteList.css';

function NoteList({ 
  notes = [], 
  onDeleteNote, 
  sortOption, 
  onSortChange, 
  sortOptions = {}
}) {
  useEffect(() => {
    document.title = "Daftar Catatan";
  }, []);

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="note-list">
      <div className="note-list__header">
        <h2 className="note-list__title">Daftar Catatan</h2>
        <div className="sort-controls">
          <label htmlFor="sort-select" className="sort-label">Urutkan:</label>
          <select 
            id="sort-select"
            className="sort-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            {Object.entries(sortOptions).map(([key, option]) => (
              <option key={key} value={key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
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
  onDeleteNote: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  sortOptions: PropTypes.object.isRequired
};

export default NoteList;