"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import dynamic  from "next/dynamic"
const dynamicProfile = dynamic(() => import("@components/Profile"), { ssr: false });
const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const posts = await response.json();
      setPosts(posts);
    };
    fetchPosts();
  }, [id]);
  return (
    <>
      {posts.length > 0 && (
        <dynamicProfile
          name={posts[0].creator.username}
          data={posts}
          desc={"welcome to " + posts[0].creator.username + " profile page"}
        />
      )}
    </>
  );
};

export default MyProfile;
