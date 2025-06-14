import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteCard from '../NoteCard';

describe('NoteCard Component', () => {
  const mockNote = {
    title: 'Test Note',
    content: 'This is a test note content that is longer than 100 characters. '.repeat(2),
    date: '2023-05-15T10:30:00.000Z',
  };

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders note title, content, and date correctly', () => {
    render(<NoteCard {...mockNote} />);
    
    expect(screen.getByText(mockNote.title)).toBeInTheDocument();
    expect(screen.getByText(/This is a test note content/)).toBeInTheDocument();
    expect(screen.getByText(/15 Mei 2023/)).toBeInTheDocument();
  });

  it('formats date in Indonesian locale', () => {
    render(<NoteCard {...mockNote} />);
    
    // Should format as "15 Mei 2023, 17.30" in WIB (UTC+7)
    expect(screen.getByText(/15 Mei 2023/)).toBeInTheDocument();
  });

  it('truncates long content with ellipsis', () => {
    render(<NoteCard {...mockNote} />);
    
    const contentElement = screen.getByText(/This is a test note content/);
    expect(contentElement.textContent).toContain('...');
  });

  it('shows delete button when onDelete prop is provided', () => {
    render(<NoteCard {...mockNote} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /hapus/i });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveTextContent('Hapus');
  });

  it('does not show delete button when onDelete prop is not provided', () => {
    render(<NoteCard {...mockNote} onDelete={undefined} />);
    
    const deleteButton = screen.queryByRole('button', { name: /hapus/i });
    expect(deleteButton).not.toBeInTheDocument();
  });

  it('calls onDelete handler when delete button is clicked', () => {
    render(<NoteCard {...mockNote} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /hapus/i });
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('handles various date formats', () => {
    const dateFormats = [
      '2023-05-15T10:30:00.000Z',
      new Date('2023-05-15T10:30:00.000Z'),
      '2023-05-15T10:30:00+07:00',
    ];

    dateFormats.forEach((date) => {
      const { container } = render(<NoteCard {...mockNote} date={date} />);
      expect(container.textContent).toMatch(/Mei.*2023/);
    });
  });
});
