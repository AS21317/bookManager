import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import axios from "axios";
import Bookcard from "../components/Bookcard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BookSearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [image,setImage] = useState("");
  const [bookshelf, setBookshelf] = useState([]);

  // Fetch books on page mount
  useEffect(() => {
    setLoading(true);
    axios.get('https://openlibrary.org/search.json?q=book&limit=10&page=1')
      .then(response => {
        setBooks(response.data.docs);

        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching initial data:', error);
        setLoading(false);
      });
  }, []);

  // Fetch books based on query input
  useEffect(() => {
    if (query) {
      setLoading(true);
      axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
        .then(response => {
          setBooks(response.data.docs);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [query]);



 // Load bookshelf from local storage on component mount
 useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);



 // Function to check if a book is already in the bookshelf
 const isBookInBookshelf = (book) => {
    return bookshelf.some(item => item.key === book.key);
  };


  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, book]));
    toast.success("book added")
   

  };

  const removeFromBookshelf = (book) => {
    console.log("removing ");
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    console.log("book key: ",book.key);
    bookshelf = bookshelf.filter(item => item.key !== book.key);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  };

  return (
    <>
      <section className="hero__section1 p-5">
        <div className="w-full text-center pt-8">
          <h2 className="font-bold text-3xl">Find a Book</h2>
          <div className="max-w-[570px] w-full mt-[10px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="pl-4 pr-2 text-base placeholder:text-base bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search for a Book ..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="w-full max-w-[100%]">
        <div className="lg:w-[470px] mx-auto flex justify-center">
        
            <button onClick={() => window.location.href = '/bookshelf'} 
            className=" bg-blue-200 px-4 py-2 mt-5 text-black-300 rounded-md font-serif font-semibold hover:text-yellow-500">
                 Go to your Bookshelf
             </button>
             

        </div>

        <div className="text-center flex justify-center mt-0 sm:mt-10 font-bold text-2xl text-red-600">
          {loading && (<div className=" flex gap-3">
            <HashLoader className="text-center" size={35} color="red" />
            <p>Loading books...</p>
            </div>
          )}
         
        </div>

        {!loading && books.length === 0 && (
          <div className="text-center">
            <h1>No books available</h1>
          </div>
        )}

        {!loading && books.length > 0 && (
          <div className="sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-[30px] mt-[40px] lg:mt-[10px]">
            {books?.map((book, index) => (
                

              <Bookcard key={index}
               book={book} 
            disabled = {isBookInBookshelf(book)}
               addToBookshelf={addToBookshelf} 
               removeFromBookshelf={removeFromBookshelf} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BookSearchPage;
