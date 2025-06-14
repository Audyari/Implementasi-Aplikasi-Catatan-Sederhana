import { useState } from 'react';
import NoteList from './components/NoteList';
import './assets/CSS/app.css';

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
      createdAt: new Date(Date.now() - 86400000).toISOString() // Yesterday
    },
    {
      id: 3,
      title: 'React Hooks',
      content: 'Menggunakan useState dan useEffect dalam komponen fungsi',
      createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
    }
  ]);

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  return (
    <div className="app">
      <h1>Aplikasi Catatan</h1>
      <NoteList 
        notes={notes} 
        onDeleteNote={handleDeleteNote} 
      />
    </div>
  );
}

export default App;