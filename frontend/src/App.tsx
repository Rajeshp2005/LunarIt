
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import AddBook from './pages/addBook/AddBook';
import SingleBook from './pages/singleBook/SingleBook';
import EditBook from './pages/editBook/EditBook';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
   <div className='dark:bg-black bg-slate-300'>
     <Router>
      <Navbar/>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/singleBook/:id" element={<SingleBook />} />
        <Route path="/editBook/:id" element={<EditBook />} />
      </Routes>
    </Router>
  
   </div>
   <Footer/>
   </>
  );
};

export default App;
