import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteCard from '../../components/NoteCard';

describe('NoteCard Component', () => {
  const mockOnDelete = jest.fn();
  const defaultProps = {
    id: 1,
    title: 'Test Title',
    content: 'This is a test content for the note card component.',
    date: '2025-06-14T10:00:00Z',
    onDelete: mockOnDelete,
  };

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it('renders the note title', () => {
    render(<NoteCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('formats and displays the date correctly', () => {
    render(<NoteCard {...defaultProps} />);
    // Check for the formatted date (adjust the format based on your locale)
    expect(screen.getByText(/14 Juni 2025/)).toBeInTheDocument();
  });

  it('displays truncated content when longer than 100 characters', () => {
    const longContent = 'a'.repeat(150);
    render(<NoteCard {...defaultProps} content={longContent} />);
    
    const displayedContent = screen.getByText(/^a{100}/);
    expect(displayedContent).toBeInTheDocument();
    expect(displayedContent.textContent.endsWith('...')).toBe(true);
  });

  it('displays full content when 100 characters or less', () => {
    const shortContent = 'a'.repeat(100);
    render(<NoteCard {...defaultProps} content={shortContent} />);
    
    const displayedContent = screen.getByText(shortContent);
    expect(displayedContent).toBeInTheDocument();
    expect(displayedContent.textContent.endsWith('...')).toBe(false);
  });

  it('calls onDelete with note id when delete button is clicked', () => {
    render(<NoteCard {...defaultProps} />);
    
    const deleteButton = screen.getByRole('button', { name: /hapus/i });
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('renders correctly without onDelete prop', () => {
    const { title, content, date } = defaultProps;
    render(<NoteCard title={title} content={content} date={date} />);
    
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /hapus/i })).not.toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<NoteCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
