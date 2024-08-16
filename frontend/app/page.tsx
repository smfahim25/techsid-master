// pages/index.tsx
import CoursesSection from "@/component/Courses";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="bg-white flex flex-col min-h-screen">
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
      <main className="flex-grow">
        <section className="text-center py-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Master New Skills with Our Courses
          </h1>
          <p className="text-gray-600 mb-8">
            Explore a wide range of skills with our expertly curated courses.
          </p>
          <Link href="/courses">
            <span className="inline-block bg-primary text-white px-6 py-3 rounded transition-colors duration-300 cursor-pointer">
              Explore Courses
            </span>
          </Link>
        </section>
        <section className="bg-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-4 text-center">
                <div className="mx-auto inline-block">
                  <Image
                    src="/aims/1.jpg"
                    alt="Certifications"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-xl font-semibold">Certifications</h3>
                <p className="text-gray-600">
                  Earn industry-recognized certifications that validate your
                  skills and enhance your job market credibility.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <div className="mx-auto inline-block">
                  <Image
                    src="/aims/2.jpg"
                    alt="Community Support"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-xl font-semibold">
                  Community & Networking
                </h3>
                <p className="text-gray-600">
                  Join a vibrant community of learners and professionals to
                  share knowledge and build a strong network.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <div className="mx-auto inline-block">
                  <Image
                    src="/aims/3.jpg"
                    alt="Internships"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-xl font-semibold">
                  Internships & Projects
                </h3>
                <p className="text-gray-600">
                  Gain hands-on experience through internships and real-world
                  projects to build an impressive portfolio.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <div className="mx-auto inline-block">
                  <Image
                    src="/aims/4.jpg"
                    alt="24/7 Support"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-xl font-semibold">24/7 Support</h3>
                <p className="text-gray-600">
                  Whether you are a night owl or an early bird, get
                  round-the-clock support from our dedicated team.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <div className="mx-auto inline-block">
                  <Image
                    src="/aims/5.jpg"
                    alt="Industry Experts"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-xl font-semibold">Mentorship by Experts</h3>
                <p className="text-gray-600">
                  Our curriculum is crafted and taught by professionals at the
                  top of their field to guide you to your tech career.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <div className="mx-auto inline-block">
                  <Image
                    src="/aims/6.jpg"
                    alt="Job Guarantee"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-xl font-semibold">Job Guarantee</h3>
                <p className="text-gray-600">
                  Commit to our career path and get a job guarantee, ensuring
                  your education leads to employment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <CoursesSection />
    </div>
  );
};

export default Home;
