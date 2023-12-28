"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";



const UserProfile = ({params}) => {
    const getUserName=useSearchParams();
    const nameOfUser=getUserName.get("name");

    const [userPosts,setUserPosts]=useState([]);

    useEffect(()=>{
        const fetchPosts=async()=>{
            const response=await fetch(`/api/users/${params?.id}/posts`,
            {
                method:"GET"
            })

            const data=await response.json();

            setUserPosts(data);
        }

        if(params?.id) fetchPosts();
    },[params?.id])


  return (
    <Profile
        name={nameOfUser}
        desc={`Welcome to ${nameOfUser}'s personalized profile page. Explore ${nameOfUser}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPosts}
    />
  )
}

export default UserProfile
