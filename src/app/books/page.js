// src/app/books/page.js
"use client"; // This line marks the component as a Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import useAuth from './../../hooks/useAuth';

export default function Books() {
  useAuth();  // Call to check authentication

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token'); // Get token from local storage
      const response = await fetch('http://localhost:3001/api/books', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Failed to fetch books');
      }
    };

    fetchBooks();
  }, []);


  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Get token from local storage
    
    try{
      const response = await fetch(`http://localhost:3001/api/books/delete/${id}`, {
        method: 'Delete',
        headers: {
          Authorization: `Bearer ${token}`,  // Include token in Authorization header
        }
      });

      if (!response.ok) throw new Error('Failed to delete book');

      // Remove the deleted book from state
      setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    }catch(error){
      setError(error.message);
    }

  }



  return (
    <div>
      <h1 className="text-2xl mb-4">Books</h1>
      <Link href="/books/add" className="bg-blue-500 text-white p-2 rounded mb-4">Add New Book</Link>
      <ul className="space-y-4">
        {books.map(book => (
          <li key={book.id} className="border p-4 rounded">
            <h2 className="text-xl">{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <Link href={`/books/${book.id}`} className="text-blue-500">View Details</Link> {/* Link to book details */}
            <Link href={`/books/edit/${book.id}`} className="text-blue-500">Edit</Link> {/* Link to edit book */}
            <button 
              onClick={() => handleDelete(book.id)} 
              className="text-red-500 ml-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}