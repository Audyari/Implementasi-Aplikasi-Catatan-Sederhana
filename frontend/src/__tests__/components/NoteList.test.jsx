import { render, screen, fireEvent } from '@testing-library/react';
import NoteList from '../../components/NoteList';
import '@testing-library/jest-dom';

describe('NoteList', () => {
  const mockNotes = [
    {
      id: 1,
      title: 'Belajar React',
      content: 'Mempelajari dasar-dasar React',
      createdAt: '2025-06-14T10:00:00Z'
    },
    {
      id: 2,
      title: 'Membuat komponen',
      content: 'Membuat komponen React yang reusable',
      createdAt: '2025-06-13T15:30:00Z'
    }
  ];

  const mockOnDeleteNote = jest.fn();

  beforeEach(() => {
    mockOnDeleteNote.mockClear();
  });

  it('renders the list title', () => {
    render(<NoteList notes={mockNotes} onDeleteNote={mockOnDeleteNote} />);
    expect(screen.getByText('Daftar Catatan')).toBeInTheDocument();
  });

  it('renders NoteCard for each note', () => {
    render(<NoteList notes={mockNotes} onDeleteNote={mockOnDeleteNote} />);
    
    // Check if each note's title is rendered
    mockNotes.forEach(note => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
      expect(screen.getByText(note.content.substring(0, 100))).toBeInTheDocument();
    });
  });

  it('displays empty message when no notes', () => {
    render(<NoteList notes={[]} onDeleteNote={mockOnDeleteNote} />);
    expect(screen.getByText('Tidak ada catatan.')).toBeInTheDocument();
  });

  it('calls onDeleteNote with correct id when delete button is clicked', () => {
    render(<NoteList notes={mockNotes} onDeleteNote={mockOnDeleteNote} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /hapus/i });
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOnDeleteNote).toHaveBeenCalledWith(mockNotes[0].id);
    expect(mockOnDeleteNote).toHaveBeenCalledTimes(1);
  });

  it('formats dates correctly', () => {
    render(<NoteList notes={mockNotes} onDeleteNote={mockOnDeleteNote} />);
    
    // Check if the formatted date is in the document
    // The exact format might vary based on locale
    expect(screen.getByText(/14 Juni 2025/)).toBeInTheDocument();
    expect(screen.getByText(/13 Juni 2025/)).toBeInTheDocument();
  });
});