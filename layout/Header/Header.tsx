import React from 'react'; 
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="flex flex-wrap justify-between items-center p-3 md:p-5
     bg-primary shadow-md text-white">
      <Link href="/" passHref>
        <span className="cursor-pointer shrink-0">
          <Image src="/logo.svg" alt="Logo" width={60} height={60}  />
        </span>
      </Link>
      <nav>
        <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
          <li>
            <Link href="/courses" passHref>
              <span className="text-white hover:text-gray-400">Courses</span>
            </Link>
          </li>
          <li>
            <Link href="/tutorials" passHref>
              <span className="text-white hover:text-gray-400">Tutorials</span>
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              <span className="text-white hover:text-gray-400">About Us</span>
            </Link>
          </li>
          <li>
            <Link href="/community" passHref>
              <span className="text-white hover:text-gray-400">Community</span>
            </Link>
          </li>
          <li>
            <Link href="/contest" passHref>
              <span className="text-white hover:text-gray-400">Contest</span>
            </Link>
          </li>
          <li>
            <Link href="/jobs" passHref>
              <span className="text-white hover:text-gray-400">jobs</span>
            </Link>
          </li>
          <li>
            <Link href="/lab" passHref>
              <span className="text-white hover:text-gray-400">lab</span>
            </Link>
          </li>
          {/* <li>
            <Link href="/quiz" passHref>
              <span className="text-white hover:text-gray-400">Quiz</span>
            </Link>
          </li> */}
          <li>
            <Link href="/blogs" passHref>
              <span className="text-white hover:text-gray-400">Blogs</span>
            </Link>
          </li>
          {/* <li>
            <Link href="/jobs" passHref>
              <span className="text-white hover:text-gray-400">Contact</span>
            </Link>
          </li> */}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <Link href="/login" passHref>
          <span className="text-white hover:text-gray-400">Login</span>
        </Link>
        <Link href="/signup" passHref>
          <span className="text-white hover:text-gray-400">Sign Up</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
