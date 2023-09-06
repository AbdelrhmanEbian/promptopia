"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptList = ({ data, handleTagClick, setSearchText }) => {
  if (!Array.isArray(data)) {
    return null; // Or you can render an error message or loading indicator
  }
  return (
    <div className="mt-16 prompt_layout">
      {data && data.map((post) => (
        <PromptCard
          key={post._id}
          setSearchText={setSearchText}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [Posts, setPosts] = useState([]);
  const [error, seterror] = useState("");

  const handleSearchChange = async (text) => {
    // Handle search text change here
    const query = text || searchText;
    if (query === "") return
    try {
      let response = await fetch("api/prompt/filtered", {
        method: "POST",
        body: JSON.stringify({
          text: query,
        }),
      });
      
      const res = await response.json();
      if (response.status === 200) {
        seterror(res.msg);
        setPosts(null);
        return
      }
      setPosts(res);
      seterror("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const posts = await response.json();
      setPosts(posts);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <div className="relative w-full flex-center gap-5">
        <input
          value={searchText}
          required
          className="search_input peer"
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="search for tag or username"
        />
        <button
          onClick={() => handleSearchChange(searchText)}
          className="orange_gradient text-xl font-bold"
        >
          search
        </button>
      </div>
      {error && <p className=" text-center text-xl orange_gradient font-semibold mt-10">{error}</p>}
      {Posts &&<PromptList
        data={Posts}
        setSearchText={setSearchText}
        handleTagClick={handleSearchChange}
      />}
    </section>
  );
};

export default Feed;
