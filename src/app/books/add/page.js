// src/app/books/add/page.js
"use client"; // This line marks the component as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await fetch('http://localhost:3001/api/books/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
      body: JSON.stringify({ title, author, isbn, genre, coverUrl }),
    });

    router.push('/books'); // Redirect to books list after submission.
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <input type="text" placeholder="Cover Image URL" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
      <button type="submit" className="bg-blue-500 text-white p-2">Add Book</button>
    </form>
  );
}