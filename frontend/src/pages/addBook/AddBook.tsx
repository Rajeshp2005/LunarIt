import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';


const AddBook = () => {
  const [book, setBook] = useState({
    bookName: '',
    author: '',
    publishedDate: '',
    image: '',
    price: '',
    description: '',
    isbnNumber: '',
  });
  const [file, setFile] = useState<File | null>(null); // to handle the uploaded file
  const navigate = useNavigate();
  const { bookId } = useParams(); // For updating the book based on bookId

  // Fetch book data if we're updating an existing book
  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        try {
          const response = await api.get(`/books/${bookId}`);
          setBook(response.data);
        } catch (error) {
          console.error('Error fetching book data:', error);
        }
      };
      fetchBook();
    }
  }, [bookId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // Append book data to FormData
    formData.append('bookName', book.bookName);
    formData.append('author', book.author);
    formData.append('publishedDate', book.publishedDate);
    formData.append('price', book.price.toString());
    formData.append('description', book.description);
    formData.append('isbnNumber', book.isbnNumber);

    // Append image file if exists
    if (file) {
      formData.append('image', file);
    } else if (book.image) {
      formData.append('image', book.image); // In case no new image is selected but it's an update
    }

    try {
      if (bookId) {
        // Update book
        await api.patch(`/${bookId}`, formData);
      } else {
        // Add new book
        await api.post('/books', formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <>
   
    <div className="p-4 dark:bg-black bg-white dark:text-slate-800 py-28">
      <h1 className="text-2xl font-bold mb-4">{bookId ? 'Edit Book' : 'Add Book'}</h1>
      <form onSubmit={handleSubmit} className=" dark:bg-slate-600 bg-slate-400 shadow-lg p-6 rounded" encType="multipart/form-data">
        <input
          type="text"
          name="bookName"
          value={book.bookName}
          onChange={handleChange}
          placeholder="Book Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="publishedDate"
          value={book.publishedDate}
          onChange={handleChange}
          placeholder="Published Date"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="description"
          value={book.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="isbnNumber"
          value={book.isbnNumber}
          onChange={handleChange}
          placeholder="ISBN Number"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        
        {/* Image upload input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          {book.image && !file && <img src={`http://localhost:3000/${book.image}`} alt="Current book cover" className="w-32 h-32 object-cover mt-2" />}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
          {bookId ? 'Update Book' : 'Add Book'}
        </button>
      </form>
      
    </div>
    
    </>
  );
};

export default AddBook;
