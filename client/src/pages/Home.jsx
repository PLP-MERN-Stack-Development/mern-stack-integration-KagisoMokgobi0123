import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";
import Footer from "../components/Footer";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar with category filter and search */}
      <Navbar
        onCategorySelect={setSelectedCategory}
        onSearch={setSearchQuery}
      />

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Latest Blog Posts
        </h1>

        <PostList category={selectedCategory} search={searchQuery} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
