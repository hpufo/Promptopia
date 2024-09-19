'use client';
import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
import axios from 'axios';

const MyProfile = () => {
  let [posts, setPosts] = useState([]);

  let {data: session} = useSession();
  let router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      let response = await axios.get(`/api/users/${session?.user.id}/posts`);
      setPosts(response.data);
    };
    if(session?.user.id)
      fetchPosts();
  },[session?.user.id]);//Session needs to be fetched so watch for changes in the session

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    let confirmed = confirm('Are you sure you want to delete this prompt?');
    if(confirmed){
      try {
        await axios.delete('/api/prompt/'+post._id.toString());
        let filteredPosts = posts.filter(p => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile 
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile;