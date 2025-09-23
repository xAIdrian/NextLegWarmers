import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';

const Navbar = async () => {

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-gray-800">MyApp</div>

        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Contact
            </a>
          </li>
        </ul>

        <div className='flex items-center space-x-4'>
          
            <>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </>
        </div>

      </nav>
    </header>
  )
}

export default Navbar
