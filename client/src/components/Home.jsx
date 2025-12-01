import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";
import Footer from "../components/Footer";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar
        onCategorySelect={setSelectedCategory}
        onSearch={setSearchQuery}
      />
      <main>
        <PostList category={selectedCategory} search={searchQuery} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
