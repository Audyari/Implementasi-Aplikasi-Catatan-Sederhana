import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteCard from '../../components/NoteCard';

describe('NoteCard Component', () => {
  const mockOnDelete = jest.fn();
  const defaultProps = {
    title: 'Test Title',
    content: 'This is a test content for the note card component.',
    date: '2025-06-14T10:00:00Z',
    onDelete: mockOnDelete,
  };

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  /**
   * Test case 1: Rendering dasar
   * - Mengecek apakah komponen NoteCard dapat di-render dengan benar
   * - Mengecek apakah format tanggal sudah benar
   */
  it('formats the date correctly', () => {
    render(<NoteCard {...defaultProps} />);
    
    // The exact format might vary based on the locale, but we can check for parts of it
    const dateElement = screen.getByText(/14 Juni 2025/);
    expect(dateElement).toBeInTheDocument();
  });
  

  /**
   * Test case 2: Kondisi delete button di klik
   * - Mengecek apakah fungsi onDelete di panggil ketika delete button di klik
   */
  it('calls onDelete when delete button is clicked', () => {
    render(<NoteCard {...defaultProps} />);
    
    const deleteButton = screen.getByRole('button', { name: /hapus/i });
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  /**
   * Test case 3: Kondisi content kurang dari 100 karakter
   * - Mengecek apakah konten yang kurang dari 100 karakter di tampilkan
   * - Mengecek apakah konten yang di tampilkan sama dengan konten yang di input
   */
  it('shows full content when less than 100 characters', () => {
    const shortContent = 'Short content';
    render(<NoteCard {...defaultProps} content={shortContent} />);
    
    expect(screen.getByText(shortContent)).toBeInTheDocument();
  });
});
