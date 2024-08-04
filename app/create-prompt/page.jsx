"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic  from "next/dynamic"
const DynamicForm = dynamic(() => import("@components/Form"), { ssr: false });
const CreatePost = () => {
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const {data:session} = useSession()
  const [submitting, setSubmitting] = useState(false);
  const CreatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <DynamicForm
      post={post}
      type="create"
      setPost={setPost}
      submitting={submitting}
      CreatePrompt={CreatePrompt}
    />
  );
};

export default CreatePost;
