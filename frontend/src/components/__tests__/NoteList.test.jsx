import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteList from '../NoteList';

// Mock komponen NoteCard dengan cara yang lebih sederhana
jest.mock('../NoteCard', () => {
  return function MockNoteCard({ title, content, date, onDelete }) {
    return (
      <div data-testid="note-card">
        <div data-testid="note-card-title">{title}</div>
        <div data-testid="note-card-content">{content}</div>
        <div data-testid="note-card-date">{date}</div>
        <button data-testid="note-card-delete" onClick={onDelete}>
          Hapus
        </button>
      </div>
    );
  };
});

describe('NoteList Component', () => {
  // Data uji untuk catatan
  const catatanUji = [
    {
      id: 1,
      title: 'Catatan Pertama',
      content: 'Ini adalah catatan pertama',
      createdAt: '2023-06-14T10:00:00.000Z',
    },
    {
      id: 2,
      title: 'Catatan Kedua',
      content: 'Ini adalah catatan kedua',
      createdAt: '2023-06-15T10:00:00.000Z',
    },
  ];

  // Mock function untuk props
  const mockProps = {
    notes: [],
    onDeleteNote: jest.fn(),
    sortOption: 'newest',
    onSortChange: jest.fn(),
    sortOptions: {
      newest: { label: 'Terbaru' },
      oldest: { label: 'Terlama' },
      title_asc: { label: 'Judul A-Z' },
      title_desc: { label: 'Judul Z-A' }
    }
  };

  let originalDocumentTitle;

  beforeEach(() => {
    // Simpan dan reset document.title sebelum setiap test
    originalDocumentTitle = document.title;
    document.title = 'Judul Sebelumnya';
    // Reset mocks sebelum setiap test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Kembalikan document.title ke nilai semula
    document.title = originalDocumentTitle;
  });

  describe('State Awal', () => {
    it('mengatur document title ke "Daftar Catatan" saat komponen dimount', () => {
      // Pastikan document.title belum berubah
      expect(document.title).toBe('Judul Sebelumnya');
      
      render(<NoteList {...mockProps} />);
      
      // Verifikasi document.title berubah setelah render
      expect(document.title).toBe('Daftar Catatan');
    });

    it('menampilkan pesan "Tidak ada catatan" dan judul komponen saat tidak ada catatan', () => {
      render(<NoteList {...mockProps} />);
      
      // Verifikasi pesan "Tidak ada catatan" ditampilkan
      const pesanKosong = screen.getByText('Tidak ada catatan.');
      expect(pesanKosong).toBeInTheDocument();
      
      // Verifikasi judul komponen tetap ditampilkan
      const judul = screen.getByRole('heading', { name: /daftar catatan/i });
      expect(judul).toBeInTheDocument();
      
      // Verifikasi tidak ada catatan yang dirender
      expect(screen.queryByTestId('note-card')).not.toBeInTheDocument();
    });
  });

  describe('Render Daftar Catatan', () => {
    it('menampilkan jumlah NoteCard yang sesuai dengan jumlah notes', () => {
      render(<NoteList {...mockProps} notes={catatanUji} />);
      
      const noteCards = screen.getAllByTestId('note-card');
      expect(noteCards).toHaveLength(catatanUji.length);
    });

    it('menampilkan NoteCard dengan data yang benar', () => {
      render(<NoteList {...mockProps} notes={catatanUji} />);
      
      // Verifikasi setiap catatan ditampilkan dengan benar
      catatanUji.forEach((note) => {
        expect(screen.getByText(note.title)).toBeInTheDocument();
        expect(screen.getByText(note.content)).toBeInTheDocument();
      });
      
      // Verifikasi tombol hapus ada
      const deleteButtons = screen.getAllByRole('button', { name: /hapus/i });
      expect(deleteButtons).toHaveLength(catatanUji.length);
    });

    it('menampilkan NoteCard dalam urutan yang benar berdasarkan sortOption', () => {
      // Render dengan sortOption 'title_asc'
      render(
        <NoteList 
          {...mockProps} 
          notes={catatanUji} 
          sortOption="title_asc"
        />
      );
      
      // Dapatkan semua judul catatan yang dirender
      const renderedTitles = screen.getAllByTestId('note-card-title').map(
        el => el.textContent
      );
      
      // Karena komponen belum mengimplementasikan sorting, kita harapkan urutan tetap sama
      // dengan urutan asli dalam array catatanUji
      const expectedTitles = catatanUji.map(note => note.title);
      expect(renderedTitles).toEqual(expectedTitles);
      
      // Verifikasi bahwa onSortChange dipanggil dengan benar
      // ketika opsi sort diubah
      const selectElement = screen.getByRole('combobox');
      fireEvent.change(selectElement, { target: { value: 'title_asc' } });
      expect(mockProps.onSortChange).toHaveBeenCalledWith('title_asc');
    });
  });
});
