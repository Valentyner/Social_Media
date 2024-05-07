import { useEffect, useState } from "react"
import UserHeader from "../components/UserHeader"
import { useParams } from "react-router-dom"
import useShowToast from "../hooks/useShowToast"
import { Flex, Spinner } from "@chakra-ui/react"
import Post from "../components/Post"
import useGetUserProfile from "../hooks/useGetUserProfile"
import { useRecoilState } from "recoil"
import postsAtom from "../atoms/postsAtoms"
import UserPageSkeleton from "../components/UserPageSkeleton"

const UserPage = () => {
    const { user, loading } = useGetUserProfile()
    const showToast = useShowToast()
    const { username } = useParams()
    const [posts, setPosts] = useRecoilState(postsAtom)
    const [feetchingPosts, isFetchingPosts] = useState(true)


    useEffect(() => {
        const getPosts = async () => {
            isFetchingPosts(true)
            try {
                const res = await fetch(`/api/posts/user/${username}`)
                const data = await res.json()
                if (data.error) {
                    showToast("Error", data.error, "error")
                }
                setPosts(data)
            } catch (error) {
                showToast("Error", error.message, "error")
                setPosts([])
            } finally {
                isFetchingPosts(false)
            }
        }
        getPosts();
    }, [username, showToast, setPosts]);

    if (!user && loading) {
        return (
            <UserPageSkeleton/>
        )
    }

    if (!user && !loading) {
        <h1>User not found</h1>
    }

    if (!user) return null

    return (
        <>
            <UserHeader user={user} />
            {posts.map((post) => (
                <Post key={post._id} post={post} postedBy={post.postedBy} />
            ))}
        </>
    )
}

export default UserPage
