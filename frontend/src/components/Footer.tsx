import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";
const Footer: React.FC = () => {
  useGSAP(()=>{
    gsap.from("footer",{
      opacity:0,
      duration:2,
      delay:1
    })
  })
  return (
    
    <>
      <footer className="bg-slate-300 dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 flex items-center">
            
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Rj6Add1OjrIeVXL4z84YzG4QIEuM4ptvvQ&s"
                  className="h-9 w-9 me-3 rounded-full"
                  alt="Book Store Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Book Store
                </span>
              
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 items-center">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Resources
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://project-lms-phi.vercel.app/" className="hover:underline" target="_blank">
                      Book store
                    </a>
                  </li>
                  <li>
                    <a href="https://tailwindcss.com/docs/guides/vite" className="hover:underline" target="_blank">
                      Tailwind CSS
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://github.com/Rajeshp2005" className="hover:underline" target="_blank">
                      Github
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/profile.php?id=100065321473452" className="hover:underline" target="_blank">
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 ">
              © 2024{" "}
              <a href="https://www.facebook.com/profile.php?id=100065321473452" className="hover:underline" target="_blank">
                Book Store™
              </a>
              . All Rights Reserved.
            </span>
            
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
