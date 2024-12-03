"use client"; // This line marks the component as a Client Component

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from "next/navigation";

export default function EditBook({ params }) {
  const router = useRouter();
  const { id } = params; // Dynamic parameter passed by Next.js App Router
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    coverUrl: ''
  });
  
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    if (id) {
      // Fetch existing book details when component mounts
      fetch(`http://localhost:3001/api/books/${id}`)
        .then(response => response.json())
        .then(data => setBook(data))
        .catch(err => setError('Failed to fetch book details'));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`http://localhost:3001/api/books/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        body: JSON.stringify(book),
      });
      
      if (!response.ok) throw new Error('Failed to update book');
      
      const updatedBook = await response.json();
      console.log('Updated Book:', updatedBook);
      router.push('/books'); // Redirect to books list after successful update
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <div>{error}</div>; // Display error message if any

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl mb-4">Edit Book</h1>
      
      <label>
        Title:
        <input type="text" name="title" value={book.title} onChange={handleChange} required />
      </label>
      
      <label>
        Author:
        <input type="text" name="author" value={book.author} onChange={handleChange} required />
      </label>

      <label>
        ISBN:
        <input type="text" name="isbn" value={book.isbn} onChange={handleChange} required />
      </label>

      <label>
        Genre:
        <input type="text" name="genre" value={book.genre} onChange={handleChange} />
      </label>

      <label>
        Cover URL:
        <input type="text" name="coverUrl" value={book.coverUrl} onChange={handleChange} />
      </label>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Book</button>
    </form>
  );
}