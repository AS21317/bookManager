import { AiFillYoutube, AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { RiLinkedinFill } from "react-icons/ri";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";

import { IoCalendarOutline } from "react-icons/io5";
import { MdLanguage } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";
import testimg from '../images/testbook.jpg'

import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";




const BookDetailPage = (props) => {
  const [tab, setTab] = useState("publisher");
  const [active, setActive] = useState("publisher");
  const location = useLocation();
  const { book, bookImg, addToBookshelf,disabled } = location.state;
  console.log("book info: ",book);
  return (
    <section className='hero__section min-h-[100vh] h-fit py-4  sm:py-[25px] '>
        <h1 className=" font-bold text-3xl pb-10">Welcome to Description Page</h1>

      <div className="max-w-[1370px] px-5 mx-auto">
       <div className=" flex justify-center">
     
       </div>
        {  (
          <>
          <div className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[20px]">
            <div className="md:col-span-1">
              <div className="flex flex-col  gap-20">
                <div className=" flex flex-col">
                  <div class="flex h-60 flex-col text-black  justify-between overflow-hidden">
                    <img
                      src={bookImg || testimg}
                      class=" h-full w-full object-cover "
                    />
                  </div>

                  <div className="flex-auto  justify-evenly py-3">
                    <div className="flex flex-wrap ">
                      <div className="w-full  flex justify-between  font-semibold text-xl text-black-500  ">
                        <p>Title: {book.title}</p>

                      </div>
                      <div className="w-full  flex justify-between   text-md text-black-500  ">
                        <p className="font-serif font-semibold">Author: <span className=" font-medium">{book.author_name[0]}</span></p>

                      </div>
                      <div className="w-full  flex justify-between   text-md text-black-500  ">
                        <p className="font-serif font-semibold">Subtitle: <span className=" font-medium text-gray-800">{book.subtitle || "N/A"}</span> </p>

                      </div>
                      <div className="w-full  flex justify-between   text-md text-black-500  ">
                        <p className="font-serif font-semibold">Suggested Title: <span className=" font-medium text-gray-800">{book.title_suggest || "N/A"}</span> </p>

                      </div>
                      <div className="w-full  flex justify-between   text-md text-black-500  ">
                        <p className="font-serif font-semibold">Work Title: <span className=" font-medium text-gray-800">{book.work_title || "N/A"}</span> </p>

                      </div>
                      <div className="w-full  flex justify-between   text-md text-black-500  ">
                        <p className="font-serif font-semibold">Type: <span className=" font-medium text-gray-800">{book.type || "N/A"}</span> </p>

                      </div>
                        
                    </div>

                    <h2 className="flex-auto  text-lg font-bold">
                     <span> {book.author}</span>
                    </h2>

                
                 
                   
                  </div>
                </div>
              </div>
            </div>

          

           <div className=" flex flex-col   lg:ml-8 lg:items-center">
           <p><span className=" font-semibold">First Publish Year:</span> 
           {book.first_publish_year}</p>
           <p><span className=" font-semibold">Version:</span> 
           {book._version_}</p>
           <p><span className=" font-semibold">Edition Count:</span> 
           {book.edition_count}</p>
          
           
           </div>
           <div className=" lg:pl-5  ">
             
             <div className=" flex flex-col mb-2 lg:item-center">
             <p className=" lg:text-center font-bold text-lg">Languages Available: </p>
            <div className=" lg:text-center flex-wrap flex capitalize">
            {book.language.map(language=><span className=" ml-1 text-green-800 font-semibold">{language},</span>)}
            </div>
             </div>
 
             <div className=" flex flex-col mb-2 lg:item-center">
             <p className=" lg:text-center font-bold text-lg"> Available Formats: </p>
            <div className=" lg:text-center capitalize">
            {book.format.map(language=><span className=" ml-1 text-green-800 font-semibold">{language},</span>)}
            </div>
             </div>
             <div className=" mt-5 flex justify-center">
            <button onClick={() => window.location.href = '/'} className=" bg-blue-500 px-4 py-3 min-w-[203px] mt-5 text-black-300 rounded-md font-serif font-semibold hover:text-yellow-500">
                 Back to Search Page
             </button>
             
            </div>

            <div className=" mt-5 flex justify-center">
            <button  className={`${disabled?"bg-orange-500 hover:bg-orange-500":"bg-blue-500 hover:bg-blue-700 hover:text-yellow-500 "} min-w-[203px] mt-5  text-black font-semibold py-3 px-4 rounded-md `}>
                 {disabled?"Already added":"Add to Your Bookshelf"}
             </button>
             
            </div>
           
             
        
            </div>
            
          </div>

        <div className="flex  mt-[20px] border-b border-solid border-[#0066ff34]">
        <button
            onClick={() => {setTab("publisher");setActive("publisher")}}
            className={`${
              active === "publisher" && "border-b-2 border-solid border-blue-600" 
            } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
          >
            Publishers
          </button>
          <button
            onClick={() => {setTab("dates");setActive("dates")}}
            className={`${
              tab === "dates" && "border-b border-solid border-primaryColor"
            } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
          >
            Publish Dates
          </button>

        
          <button
            onClick={() => {setTab("contributors");setActive("contributors")}}
            className={`${
              tab === "contributors" && "border-b border-solid border-primaryColor"
            } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
          >
            Contributors
          </button>
        </div>
        <div className="mt-[50px]">
          {/* {tab === "about" && <h1>{event.description}</h1>} */}

          {tab === "publisher" && (
            <div className=" flex flex-col mb-2 item-center">
            <p className=" text-center font-bold text-lg">All Publishers </p>
           <div className=" text-center capitalize">
           {book.publisher.map(language=><span className=" ml-1 text-green-800 font-semibold">{language},</span>)}
           </div>
            </div>
          )}

{tab === "dates" && (
            <div className=" flex flex-col mb-2 item-center">
            <p className=" text-center font-bold text-lg">Publish Dates </p>
           <div className=" text-center  capitalize">
           {book.publish_date.map(language=><span className=" ml-2 text-green-800 font-semibold">{language},</span>)}
           </div>
            </div>
          )}


          {tab === "contributors" && (
             <div className=" flex flex-col mb-2 item-center">
             <p className=" text-center font-bold text-lg">All Contributors </p>
            <div className=" text-center capitalize">
            {book.contributor.map(language=><span className=" ml-1 text-green-800 font-semibold">{language},</span>)}
            </div>
             </div>
          )}
       
       
        </div>

        </>
      )}

      </div>
    </section>
  );
};

export default BookDetailPage;

