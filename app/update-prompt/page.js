'use client';
import {useEffect, useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import axios from 'axios';

const EditPrompt = () => {
  let [submitting, setSubmitting] = useState(false);
  let [post, setPost] = useState({prompt: '', tag: ''});

  let router = useRouter();
  let searchParams = useSearchParams();//gets the GET params
  let promptId = searchParams.get('id');

  useEffect(() => {
    let getPromptDetails = async () => {
      let response = await axios.get(`/api/prompt/${promptId}`);
      setPost({
        prompt: response.data.prompt,
        tag: response.data.tag
      });
    };
    if(promptId) getPromptDetails();
  },[promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert('Prompt ID not found');

    try {
      let response = await axios.patch('/api/prompt/'+promptId,{
        prompt: post.prompt,
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
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt;