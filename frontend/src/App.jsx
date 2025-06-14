import NoteList from './components/NoteList';

function App() {
  const notes = [
    'Belajar React Dasar',
    'Mengenal Komponen React',
    'Memahami State & Props'
  ];

  return (
    <div className="app">
      <h1>Daftar Catatan</h1>
      <NoteList notes={notes} />
    </div>
  );
}

export default App;