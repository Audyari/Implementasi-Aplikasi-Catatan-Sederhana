import { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import './assets/CSS/app.css';
import AddNoteForm from './components/AddNoteForm';

// Sorting options
const SORT_OPTIONS = {
  DATE_DESC: { key: 'date', order: 'desc', label: 'Terbaru' },
  DATE_ASC: { key: 'date', order: 'asc', label: 'Terlama' },
  TITLE_ASC: { key: 'title', order: 'asc', label: 'Judul (A-Z)' },
  TITLE_DESC: { key: 'title', order: 'desc', label: 'Judul (Z-A)' },
};

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Belajar React Dasar',
      content: 'Mempelajari dasar-dasar React termasuk komponen dan JSX',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Mengenal State & Props',
      content: 'Memahami cara kerja state dan props dalam React',
      createdAt: new Date(Date.now() - 86400000).toISOString() // Kemarin
    }
  ]);

  const [sortOption, setSortOption] = useState('DATE_DESC');
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi untuk menambah catatan baru
  const addNote = (newNote) => {
    const note = {
      id: +new Date(),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString()
    };
    setNotes([...notes, note]);
  };

  // Fungsi untuk menghapus catatan
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Fungsi untuk mengurutkan catatan
  const getSortedNotes = () => {
    const sortedNotes = [...notes];
    const { key, order } = SORT_OPTIONS[sortOption];

    return sortedNotes.sort((a, b) => {
      if (key === 'date') {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        // key === 'title'
        return order === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      }
    });
  };

  // Fungsi untuk memfilter catatan berdasarkan pencarian
  const getFilteredNotes = () => {
    if (!searchQuery.trim()) return getSortedNotes();
    
    const query = searchQuery.toLowerCase();
    return getSortedNotes().filter(note => 
      note.title.toLowerCase().includes(query) || 
      note.content.toLowerCase().includes(query)
    );
  };

  // Format sort options untuk komponen NoteList
  const formatSortOptions = () => {
    return Object.entries(SORT_OPTIONS).reduce((acc, [key, value]) => {
      acc[key] = { label: value.label };
      return acc;
    }, {});
  };

  return (
    <div className="app">
      <h1>Aplikasi Catatan Sederhana</h1>

      <AddNoteForm onAddNote={addNote} />
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari catatan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <NoteList
        notes={getFilteredNotes()}
        onDeleteNote={deleteNote}
        sortOption={sortOption}
        onSortChange={setSortOption}
        sortOptions={formatSortOptions()}
      />
    </div>
  );
}

export default App;