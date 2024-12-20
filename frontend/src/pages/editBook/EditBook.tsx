import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';


const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    bookName: '',
    author: '',
    publishedDate: '',
    image: '',
    price: '',
    description: '',
    isbnNumber: '',
  });
  const [file, setFile] = useState<File | null>(null); // state for the image file

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // Append book details to FormData
    formData.append('bookName', book.bookName);
    formData.append('author', book.author);
    formData.append('publishedDate', book.publishedDate);
    formData.append('price', book.price.toString());
    formData.append('description', book.description);
    formData.append('isbnNumber', book.isbnNumber);

    // Append the selected file if it exists
    if (file) {
      formData.append('image', file);
      
    } else if (book.image) {
      formData.append('image', book.image); // in case the image is not updated but it's an existing book
    }

    try {
      await api.patch(`/books/${id}`, formData); // Update book API request
      navigate('/');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <>
   
    <div className="p-4 dark:bg-black bg-white dark:text-slate-300 py-28 ">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="bg-slate-400 dark:bg-slate-600 dark:text-slate-800 shadow-lg p-6 rounded" encType="multipart/form-data">
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
        <div className="mb-4">
          <label className="block text-sm font-semibold">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-slate-200"
          />
          {book.image && !file && (
            <img src={book.image} alt="Current book cover" className="w-32 h-32 object-cover mt-2" />
          )}
        </div>
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 mb-4 border border-gray-300 rounded "
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
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
          Update Book
        </button>
      </form>
      
    </div>
    
    </>
  );
};

export default EditBook;
