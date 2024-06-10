import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import testimg from '../images/testbook.jpg'
import { useNavigate } from 'react-router-dom';
import BookDetailPage from '../pages/BookDetailPage';
import { toast } from 'react-toastify';

const BookCard = ({library=false,disabled=false, book, addToBookshelf ,setBookshelf,bookshelf }) => {
  const [bookImg, setBookImg] = useState('');
  const navigate = useNavigate();

  const removeFromBookshelf = (book) => {
    let updatedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    updatedBookshelf = updatedBookshelf.filter(item => item.key !== book.key);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    setBookshelf(updatedBookshelf);
    toast.error("Book removed successfully !!");
  };
  


 console.log("disabled is : ",disabled);

  const seeDetails = () => {
    navigate('/bookdetail', {
      state: {
        book,
        bookImg,
        disabled
      },
    });
  };

  useEffect(() => {
    const fetchBookImage = async () => {
      try {
        const response = await axios.get(`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`);
        setBookImg(response.config.url);
      } catch (error) {
        console.error('Error fetching book image:', error);
      }
    };

    if (book.cover_edition_key) {
      fetchBookImage();
    }
  }, [book.cover_edition_key]);

  console.log("");

  return (
    <div className="relative flex flex-row items-center justify-center mb-5">
    <div className="max-w-[300px] min-h-[300px] w-full bg-white shadow-md rounded-3xl p-3">
      <div className="flex flex-col items-left">
        <div className=" w-full h-[150px] flex mx-auto lg:h-[200px]">
          <img
            src={bookImg || testimg}
            alt={book.title}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="flex-auto justify-evenly py-2 text-left">
        <h2 className="text-lg font-bold">Title: {book.title.slice(0, 15)}</h2>


          <p className="text-sm text-left text-gray-500">Author: {book.author_name[0] || 'Unknown'}</p>
          <p className="text-sm text-left text-gray-500">Language: {(book.language[0], book.language[1],book.language[2]) || 'Unknown'}</p>
          <div className=' flex justify-between text-sm text-gray-500'>
            <p>Total Rating: {book.ratings_count}</p>
            <p><p>Average Rating: {book.ratings_average ? parseFloat(book.ratings_average).toFixed(2) : 'N/A'}</p>
            </p>
          </div>
    <div className=' flex justify-between text-gray-500'>
    <p className='text-sm'>Publish Date: {book.publish_date[0]}</p>
          <p className='text-sm text-gray-500'>Pages: {book.
number_of_pages_median
}</p>
    </div>

          
        </div> 
      </div>
      <div className= {`flex justify-between`} >
     {!library && <button
     disabled={disabled}
            onClick={() => addToBookshelf(book)}
            className={`${disabled?"bg-orange-500 hover:bg-orange-500":"bg-blue-500 hover:bg-blue-700 hover:text-yellow-500 "} mt-2  text-black font-semibold py-1 px-4 rounded-full `}
          >
            {disabled ?"Already added":"Add to shelf"}
          </button>}

          {library && <button
            onClick={() => removeFromBookshelf(book)}
            className="mt-2 bg-blue-500 font-semibold text-white py-1 px-4 rounded-full hover:bg-blue-700 hover:text-yellow-500"
          >
            Remove
          </button>}
         
           <button
            onClick={seeDetails}
            className="mt-2 bg-blue-500 font-semibold text-white py-1 px-4 rounded-full hover:bg-blue-700 hover:text-yellow-500"
          >
            See Details
          </button>
      </div>
    </div>
  </div>
  
  );
};

export default BookCard;
