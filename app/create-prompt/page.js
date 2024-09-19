'use client';
import {useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import axios from 'axios';

const CreatePrompt = () => {
  let [submitting, setSubmitting] = useState(false);
  let [post, setPost] = useState({prompt: '', tag: ''});

  let router = useRouter();
  let {data: session} = useSession();//destructing data and renaming it to session
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let response = await axios.post('/api/prompt/new',{
        prompt: post.prompt,
        userId: session?.user.id,
        tag: post.tag
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }finally{
      setSubmitting(false);
    }
  };

  return (
    <Form 
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt