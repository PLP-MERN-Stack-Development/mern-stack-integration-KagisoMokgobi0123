import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { useUser, SignInButton, SignOutButton } from "@clerk/clerk-react";

const Navbar = ({ onCategorySelect, onSearch }) => {
  const { categories } = useContext(PostContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser(); // Clerk hook to get current user

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-800 text-white gap-4">
      <Link to="/" className="text-2xl font-bold">
        MERN Blog
      </Link>

      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 py-1 rounded text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => onCategorySelect(cat._id)}
            className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          <>
            <span>Hello, {user.firstName}</span>
            <SignOutButton>
              <button className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
                Logout
              </button>
            </SignOutButton>
          </>
        ) : (
          <>
            <SignInButton>
              <button className="px-3 py-1 rounded bg-green-600 hover:bg-green-700">
                Login
              </button>
            </SignInButton>
            <Link
              to="/register"
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
