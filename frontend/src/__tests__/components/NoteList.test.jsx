// NoteList.test.jsx
import { render, screen } from '@testing-library/react' 
import NoteList from '../../components/NoteList.jsx'

// Deskripsi komponen yang di-test
describe('NoteList', () => {
  // Data test
  const mockNotes = [
    'Belajar React',
    'Membuat komponen',
    'Testing React'
  ]

  // Test case 1: Rendering dasar
  test('merender daftar catatan', () => {
    render(<NoteList notes={mockNotes} />)
    
    // Assertions
    mockNotes.forEach(note => {
      expect(screen.getByText(note)).toBeInTheDocument()
    })
  })

  // Test case 2: Kondisi kosong
  test('menampilkan pesan ketika tidak ada catatan', () => {
    render(<NoteList notes={[]} />)
    expect(screen.getByText('Tidak ada catatan.')).toBeInTheDocument()
  })


})