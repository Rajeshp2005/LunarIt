import React from "react";
import { Link } from "react-router-dom";
import Switcher from "./toggle/Switcher";
import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const Navbar: React.FC = () => {
  useGSAP(()=>{
    gsap.from("nav",{
      opacity:0,
      duration:2,
      delay:1
    })
  })

  return (
    <>
      <nav className="bg-slate-200  dark:bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Rj6Add1OjrIeVXL4z84YzG4QIEuM4ptvvQ&s"
              className="h-8 w-8 rounded-full"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-slate-300">
              BookStore
            </span>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center gap-3">
            {/* Home Button */}
            <Link to="/" className="flex items-center">
              <HomeIcon
                className="h-8 w-8 text-blue-700 dark:text-slate-300 md:hidden"
                title="Home"
              />
              <button
                className="hidden md:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                title="Home"
              >
                Home
              </button>
            </Link>
            {/* Add Book Button */}
            <Link to="/addBook" className="flex items-center">
              <PlusIcon
                className="h-8 w-8 text-blue-700 dark:text-white md:hidden"
                title="Add Book"
              />
              <button
                className="hidden md:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                title="Add Book"
              >
                Add Book
              </button>
            </Link>
            
            <span className="lg:translate-x-12 mt-4">
              <Switcher />
            </span>
           
          </div>
          
        </div>
       
      </nav>
    </>
  );
};

export default Navbar;
