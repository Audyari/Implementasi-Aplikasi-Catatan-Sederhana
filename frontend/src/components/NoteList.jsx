import React from 'react';
import PropTypes from 'prop-types';

function NoteList({ notes = [] }) {
  return (
    <div className="note-list">
      <h2>Daftar Catatan</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index} className="note-item">
            {note}
          </li>
        ))}
        {notes.length === 0 && <li className="empty-message">Tidak ada catatan.</li>}
      </ul>
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.string)
};

export default NoteList;