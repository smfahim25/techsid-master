import CoursesSection from "@/component/Courses";
import Pagination from "@/component/pagination";
import Footer from "@/layout/Footer/Footer";
import Header from "@/layout/Header/Header";
import React from "react";

const Courses = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <CoursesSection />
        {/* <Pagination /> */}
      </main>
      <Footer />
    </>
  );
};

export default Courses;
