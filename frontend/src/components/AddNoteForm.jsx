import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/CSS/AddNoteForm.css';

const AddNoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    onAddNote({
      title: title.trim(),
      content: content.trim()
    });
    
    // Reset form
    setTitle('');
    setContent('');
  };

  return (
    <form className="add-note-form" onSubmit={handleSubmit}>
      <h2>Tambah Catatan Baru</h2>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul catatan"
          maxLength="50"
          required
        />
        <small>Sisa karakter: {50 - title.length}</small>
      </div>
      <div className="form-group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis catatan Anda di sini..."
          required
        ></textarea>
      </div>
      <button type="submit" className="btn-add">
        Tambah Catatan
      </button>
    </form>
  );
};

AddNoteForm.propTypes = {
  onAddNote: PropTypes.func.isRequired
};

export default AddNoteForm;