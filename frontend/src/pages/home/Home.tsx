import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


interface Book {
  id: number;
  bookName: string;
  author: string;
  publishedDate: string;
  image: string;
  price: number;
  description: string;
  isbnNumber: string;
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        console.log(response.data);

        // Adjust the image URLs to ensure forward slashes in the path
        const booksWithFullImageUrl = response.data.map((book: any) => ({
          ...book,
          image: `${book.image}`, 
        }));

        setBooks(booksWithFullImageUrl);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const deleteBook = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`/books/${id}`);
        setBooks(books.filter(book => book.id !== id));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };
  useGSAP(()=>{
    gsap.from(".gsap",{
      y:100,
      opacity:0,
      duration:2,
     
    })
  })


  return (
    <>
    
    <div className="p-4 py-28 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 dark:text-slate-300 gsap">
        {books.map(book => (
          <div key={book.id} className="bg-slate-100 dark:bg-gray-800 shadow-lg rounded-lg p-4">
            <img
              src={book.image || 'https://plus.unsplash.com/premium_photo-1733864822205-f521d24b1319?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D'} 
              alt={book.bookName}
              className="w-full h-64 object-cover rounded"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = ''; 
              }}
            />
            <h2 className="font-bold text-xl mt-2">{book.bookName}</h2>
            <p>{book.author}</p>
            <p>Rs.{book.price}</p>
            <Link to={`/singleBook/${book.id}`} className="text-blue-500 mt-2 inline-block m-3">
              <button className='px-4 py-2 bg-yellow-600 dark:bg-yellow-200 text-black mt-2 rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-700 hover:trasition dark:hover:transition'>see more</button>
            </Link>
            <button 
              onClick={() => deleteBook(book.id)} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-700 hover:trasition dark:hover:transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
    </div>
   
    </>
  );
};

export default Home;
