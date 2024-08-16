import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        <div className="flex flex-col items-start">
          <Image src="/logo.svg" alt="SIID Tech Logo" width={100} height={100} />
          <div className="flex mt-4">
            <Link href="/instagram">
              <span className="mr-4"><Image src="/instagram.webp" alt="Instagram" width={24} height={24} /></span>
            </Link>
            <Link href="/facebook">
              <span className="mr-4"><Image src="/facebook.webp" alt="Facebook" width={24} height={24} /></span>
            </Link>
            <Link href="/twitter">
              <span><Image src="/twitter.webp" alt="Twitter" width={24} height={24} /></span>
            </Link>
            <Link href="/linkedin">
              <span><Image src="/linkedin.webp" alt="Linkedin" width={24} height={24} /></span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Home</h3>
          <ul className="space-y-2">
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/contact">Contact us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Features</h3>
          <ul className="space-y-2">
            <li><Link href="/courses">Course</Link></li>
            <li><Link href="/notifications">Notification</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/support">Support</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
          <ul className="space-y-2">
            <li>Privacy & Policy</li>
            <li>+1 000 000 000</li>
            <li>yourmail@gmail.com</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
