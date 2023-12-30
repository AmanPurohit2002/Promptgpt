"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedResult, setSearchedResult] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");  // "i"-> is used for case insensitive

    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.prompt) ||
        regex.test(item.tag)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const result = filterPrompts(e.target.value);
        setSearchedResult(result);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const result = filterPrompts(tagName);

    setSearchedResult(result);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt", {
        method: "GET",
      });

      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for tag/username/prompt-text"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* filtered prompts */}

      {searchText ? (
        <PromptCardList data={searchedResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
