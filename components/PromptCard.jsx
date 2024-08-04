"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
const PromptCard = ({ post, handleTagClick , handleEdit , handleDelete , setSearchText }) => {
    const [copied, setCopied] = useState("");
    const handleCopy = ()=>{
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => {
            setCopied("")
        }, 3000);
    }
    const router = useRouter()
    const pathname = usePathname() 
    const {data:session} = useSession() 
    const profilePage = ()=>{
      if (session?.user.id === post.creator._id) {
        router.push(`/profile`)
        return
      }else{
        router.push(`/profile/${post.creator._id}`)
        return
    }
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div onClick={profilePage} className="flex-1 flex ga-3 justify-between
             items-center cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className=" flex-col flex">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="text-gray-500 text-sm font-inter" >{post.creator.email}</p>
          </div>
        </div>
        <div className="btn_copy" onClick={handleCopy}>
            <Image
            src={copied === post.prompt? '/assets/assets/icons/tick.svg':"/assets/assets/icons/copy.svg"}
            height={16}
            alt="copy image"
            width={16}
            className=" cursor-pointer"
            />

        </div>
      </div>
      <p className=" my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className=" font-inter text-sm blue_gradient cursor-pointer " onClick={()=>{
        const query = post.tag.replace('#',"")
        setSearchText(query)
        handleTagClick(query)
      }}>#{post.tag}</p>
        {session?.user.id === post.creator._id && pathname === '/profile' && (
            <div className="mt-5 gap-4 border-t border-gray-100 pt-3 flex-center">
                <p className="font-inter text-sm green_gradient cursor-pointer " onClick={handleEdit}>Edit</p>
                <p className="font-inter text-sm orange_gradient cursor-pointer " onClick={handleDelete}>Delete</p>
            </div>
        )}
    </div>
  );
};

export default PromptCard;
