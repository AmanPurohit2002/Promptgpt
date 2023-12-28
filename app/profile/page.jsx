"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [post, setPost] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`, {
        method: "GET",
      });

      const data = await response.json();

      setPost(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (posts) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt ? "
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${posts._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost=post.filter((p)=> p._id !==posts._id);

        setPost(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page"
      data={post}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
