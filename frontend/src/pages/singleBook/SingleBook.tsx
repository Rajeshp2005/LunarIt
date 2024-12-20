import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';


const SingleBook = () => {
  const { id } = useParams();  // Get the book ID from URL params
  const navigate = useNavigate();
  const [book, setBook] = useState({
    bookName: '',
    author: '',
    publishedDate: '',
    image: '',
    price: 0,
    description: '',
    isbnNumber: '',
  });
  const [error, setError] = useState('');

  // Fetch the book details from the API
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        setError('Error fetching book details');
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [id]);

  const handleEditClick = () => {
    navigate(`/editBook/${id}`);  // Navigate to the EditBook page for the current book
  };

  

  return (
    <>
    
    <div className="p-4 py-28">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white dark:bg-slate-800 dark:text-slate-200 shadow-lg p-6 rounded">
          <img 
            src={book.image || 'https://plus.unsplash.com/premium_photo-1733864822205-f521d24b1319?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D'} 
            alt={book.bookName}
            className="w-full h-[850px] object-fill mb-4"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = 'img'; 
            }}
          />
          <h2 className="text-xl font-semibold mb-2">{book.bookName}</h2>
          <p className="text-lg mb-2">Author: {book.author}</p>
          <p className="mb-2">Published Date: {book.publishedDate}</p>
          <p className="mb-2">Price: Rs.{book.price}</p>
          <p className="mb-4">Description: {book.description}</p>
          <p className="mb-4">ISBN: {book.isbnNumber}</p>
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Edit Book
          </button>
        </div>
      )}
      
    </div>
    
    </>
  );
};

export default SingleBook;
