import React from "react";
import CreateEditor from "../../../component/editor/createEditor";
import Header from "@/layout/Header/Header";
import Footer from "@/layout/Footer/Footer";

export default function Page() {
  return (
    <div>
      <Header />
      <main>
        <CreateEditor />
      </main>
      <Footer />
    </div>
  );
}
