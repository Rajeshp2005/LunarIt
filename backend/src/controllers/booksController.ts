import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import Book from "../model/book";

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create the directory if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = Date.now() + fileExtension; // Add timestamp to file name
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Create Book 
const createBook = async (req: Request, res: Response) => {
  upload.single('image')(req, res, async (err: any) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file' });
    }
    let fileName;
    if (!req.file) {
        fileName =
          "https://images.unsplash.com/photo-1731332066050-47efac6e884f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8";
      } else {
        fileName = `http://localhost:3000/uploads/${req.file.filename}`;
      }
    const { bookName, author, description, price, publishedDate, isbnNumber } = req.body;

    try {
      const book = await Book.create({
        bookName,
        author,
        description,
        price,
        publishedDate,
        isbnNumber,
        image: fileName,  
      });
      res.status(201).json(book);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });
};

// Update Book 
const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  upload.single('image')(req, res, async (err: any) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file' });
    }

    const { bookName, author, description, price, publishedDate, isbnNumber } = req.body;

    let imagePath = book.image; // Keep the old image path by default
    if (req.file) {
      if (book.image && book.image.startsWith('http://localhost:3000/')) {
        const localPath = book.image.replace('http://localhost:3000/', '');
        if (fs.existsSync(localPath)) {
          fs.unlinkSync(localPath); // Delete the old image file
        }
      }
      imagePath = `http://localhost:3000/uploads/${req.file.filename}`; // New image URL
    }

    book.bookName = bookName || book.bookName;
    book.author = author || book.author;
    book.description = description || book.description;
    book.price = price || book.price;
    book.publishedDate = publishedDate || book.publishedDate;
    book.isbnNumber = isbnNumber || book.isbnNumber;
    book.image = imagePath;

    try {
      const updatedBook = await book.save();
      res.status(202).json(updatedBook);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });
};

// Delete Book 
const deleteBook = async (req: Request, res: Response) => {
  const book = await Book.findByPk(req.params.id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  try {
    if (book.image && book.image.startsWith('http://localhost:3000/')) {
      const localPath = book.image.replace('http://localhost:3000/', '');
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath); // Delete the image file
      }
    }

    await book.destroy();
    res.status(200).json({ message: 'Book and associated image deleted successfully' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


// Get All Books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// Get a Single Book by ID
const getBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export { createBook, updateBook, deleteBook, getAllBooks, getBook }; 