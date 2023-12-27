"use client"

import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {

    const {data:session}=useSession();

    const [post,setPost]=useState([]);

    useEffect(()=>{
        const fetchPosts=async ()=>{
            const response=await fetch(`/api/users/${session?.user.id}/posts`,
            {method:"GET"})

            const data=await response.json();

            setPost(data);
        }

        if(session?.user.id) fetchPosts();
    },[])

    const handleEdit=()=>{

    }

    const handleDelete=()=>{

    }

  return (
    <Profile
        name="My"
        desc="Welcome to your personalised profile page"
        data={post}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile