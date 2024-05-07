import React, { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import { Flex, Spinner } from '@chakra-ui/react';
import Post from '../components/Post';
import PostSkeleton from '../components/PostSkeleton';
import postsAtom from '../atoms/postsAtoms';
import { useRecoilState } from 'recoil';


const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [loading, setLoading] = useState(false)

  const showToast = useShowToast()

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true)
      setPosts([])
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if(data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error")
      } finally {
        setLoading(false)
      }
    }
    getFeedPosts()
  }, [showToast, setPosts])
  return (
    <>
      {loading && (
        <Flex justify={"center"} flexDirection={"column"}>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
        </Flex>
      )}
      {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy = {post.postedBy}/>
      ))}
    </>
  )
}

export default HomePage