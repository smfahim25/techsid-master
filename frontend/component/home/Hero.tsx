import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div>
      <section className="bg-white text-gray-800">
        <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex-1 sm:mb-5">
            <h2 className="text-4xl font-bold mb-2">
              Your Gateway to a Dream Tech Career
            </h2>
            <p className="text-gray-600 mb-6">
              At SiidTech, we are committed to expanding your career
              opportunities. Our targeted training, mentorship, and practical
              assignments are designed to not just teach, but to transform your
              potential into a promising career in technology.
            </p>
            <p className="text-gray-600 mb-6">
              Our comprehensive curriculum, hands-on assignments, and guaranteed
              internships and job placements for dedicated students set you on a
              direct path to success.
            </p>
            <Link href="/courses">
              <button className="bg-primary text-white px-4 py-2 rounded transition duration-300 hover:bg-opacity-90">
                Begin Learning Now
              </button>
            </Link>
          </div>

          <div className="">
            <Image
              src="/showcase.jpg"
              alt="Learning illustration"
              width={500}
              height={400}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
