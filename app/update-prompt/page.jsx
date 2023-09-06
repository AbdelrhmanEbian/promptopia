"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const CreatePost = () => {
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const searchpParams =useSearchParams()
  const postId = searchpParams.get("id")
  
  const {data:session} = useSession()
  const [submitting, setSubmitting] = useState(false);
  useEffect(()=>{
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${postId}`)
        const data = await response.json()
        setPost({
            prompt: data.prompt,
            tag: data.tag
          })
    }
    if (postId) getPromptDetails()
  
  },[postId])
  const EditPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if(!postId) return
    try {
      const response = await fetch(`/api/prompt/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    }catch(error){
        console.log(error)
    }finally{
        setSubmitting(false)
    }
  };
  return (
    <Form
      post={post}
      type="edit"
      setPost={setPost}
      submitting={submitting}
      CreatePrompt={EditPrompt}
    />
  );
};

export default CreatePost;
