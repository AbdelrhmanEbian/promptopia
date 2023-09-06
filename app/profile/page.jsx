"use client"
import { useState , useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from '@components/Profile'
const MyProfile = () => {
  
    const handleDelete = async(post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this post?')
        if(hasConfirmed){
          try {
            await fetch(`/api/prompt/${post._id.toString()}`, {method:"DELETE"})
            const filteredPosts = posts.filter(p => p._id !== post._id)
            setPosts(filteredPosts)
          }catch (error) {
            console.log(error);
          }
        
    }
  }
    const {data:session} = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()
    const handleEdit =async (post) => {
      router.push('/update-prompt?id='+post._id)
    }
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const posts = await response.json()
          setPosts(posts)
        }
        if(session?.user)fetchPosts()
      }, [session])
  return (
    <Profile
    name="My"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    desc='welcome to your pesonalized profile page'
    />    
)
}

export default MyProfile