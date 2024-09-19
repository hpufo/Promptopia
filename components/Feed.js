'use client';
import {useState, useEffect} from 'react';
import axios from 'axios';
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={() => handleTagClick(post)}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  let [searchText, setSearchText] = useState('');
  let [posts,setPosts] = useState([]);
  let [timer, setTimer] = useState(null);
  let [filteredPosts, setFilteredPosts] = useState([]);

  const filterPrompts = (searchText) => {
    let regex = new RegExp(searchText,"i");//'i' flag for case-insensitive search
    return posts.filter(item => regex.test(item.creator.username) || 
      regex.test(item.tag) ||
      regex.test(item.prompt)
    );
  };
  const handleTagClick = (post) => {
    setSearchText(post.tag);
    setFilteredPosts(filterPrompts(post.tag));
  };
  const handleSearchChange = (e) => {
    clearTimeout(timer);
    setSearchText(e.target.value);

    setTimer(setTimeout(() => {
      setFilteredPosts(filterPrompts(e.target.value));
    }, 500));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      let response = await axios.get('/api/prompt');
      setPosts(response.data);
    };
    fetchPosts();
  },[]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={searchText ? filteredPosts:posts}
        handleTagClick={handleTagClick}
      />
    </section>    
  )
}

export default Feed