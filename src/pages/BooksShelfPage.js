import React, { useState, useEffect } from 'react';
import Bookcard from "../components/Bookcard";


const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div>
      <div className=' flex items-center px-12 justify-between bg-yellow-200 '>
          <button onClick={() => window.location.href = '/'} className=" bg-blue-200 px-4 py-2 text-black-300 rounded-md font-serif font-semibold hover:text-yellow-500">
                 Back to Search
             </button>
      <h1 className=' p-4 font-bold text-2xl '>My Bookshelf</h1>
      <p className='font-semibold'>Total Book : {bookshelf.length}</p>
      </div>
      <div className="sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-[30px] mt-[40px] lg:mt-[10px]">
            {bookshelf.map((book, index) => (
              <Bookcard bookshelf={bookshelf} library={true} key={index} book={book} setBookshelf={setBookshelf} />
            ))}
          </div>
      
    </div>
  );
};

export default BookshelfPage;
