'use client';
import {useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile';
import axios from 'axios';

const UserProfile = ({params}) => {//userId var is in the route
  let [posts, setPosts] = useState([]);
  let serachParams = useSearchParams();
  let name = serachParams.get('name');

  useEffect(() => {
    const fetchPosts = async () => {

      let response = await axios.get(`/api/users/${params.userId}/posts`);
      setPosts(response.data);
    };
    if(params?.userId)
      fetchPosts();
  },[params.userId]);

  return (
    <Profile 
      name={name}
      desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  )
}

export default UserProfile;