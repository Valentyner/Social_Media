import { Flex, Avatar, Text, Image, Box, Divider, Button, Spinner, Link } from "@chakra-ui/react"
import Actions from "../components/Actions"
import { useEffect, useState } from "react"
import Comment from "../components/Comment"
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import CommentField from "../components/CommentField"
import { useParams } from "react-router-dom"
import useShowToast from "../hooks/useShowToast"
import PostPageSkeleton from '../components/PostPageSkeleton'
import useGetUserProfile from "../hooks/useGetUserProfile"
import postsAtom from "../atoms/postsAtoms"
import { formatDistanceToNow } from "date-fns"
import { DeleteIcon } from "@chakra-ui/icons"
import { Link as RouterLink } from "react-router-dom"


const PostPage = () => {
    const showToast = useShowToast()
    const { pid } = useParams()
    const { user, loading } = useGetUserProfile()
    const currentUser = useRecoilValue(userAtom)
    const [posts, setPosts] = useRecoilState(postsAtom)

    const currentPost = posts[0]

    useEffect(() => {
        setPosts([])
        const getPost = async () => {
            try {
                const res = await fetch('/api/posts/' + pid)
                const data = await res.json()
                if (data.error) {
                    showToast("Error", data.error, "error")
                    return;
                }
                setPosts([data])
            } catch (error) {
                showToast("Error", error.message, "error")
            }
        }
        getPost()
    }, [showToast, pid, setPosts])

    const handleDeletePost = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete this post?")) return;

            const res = await fetch(`/api/posts/${currentPost._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Post deleted", "success");
            navigate(`/${user.username}`);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    if (!user && loading) {
        return (
            <PostPageSkeleton />
        );
    }

    if (!currentPost && loading) {
        return (
            <PostPageSkeleton />
        )
    }

    if (!currentPost) return null

    return (
        <>
            <Flex>
                <Flex w={"full"} alignItems={"center"} gap={3}>
                    <Link as={RouterLink} to={`/${user.username}`}>
                        <Flex alignItems={"center"} gap={3}>
                            <Avatar src={user?.profilePic} size={"md"} name="Mark Zuckerberg" />

                            <Text fontSize={"sm"} fontWeight={"bold"}>{user?.username}</Text>
                            <Image src="/verified.png" w={4} h={4} ml={4} />
                        </Flex>
                    </Link>
                </Flex>
                <Flex gap={4} w={"full"} alignItems={"center"} justifyContent={"flex-end"}>
                    <Text fontSize={"xs"} color={"gray.light"}>{formatDistanceToNow(new Date(currentPost.createdAt))} ago</Text>

                    {currentUser?._id === user._id && (
                        <DeleteIcon size={20} cursor={"pointer"} onClick={handleDeletePost} />
                    )}

                </Flex>
            </Flex>
            <Text my={3}>{currentPost?.text}</Text>

            <Box borderRadius={6} overflow={"hidden"} border={"1px solid "}
                borderColor={"gray.light"}>
                <Image src={currentPost?.img} w={"full"} />
            </Box>

            <Flex gap={3} my={3}>
                <Actions post={currentPost} />
            </Flex>
            <Divider my={4} />
            <Flex justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"2xl"}>👋</Text>
                    <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>
            <Divider my={4} />
            {currentPost?.replies.map((reply) => (
                <Comment key={reply._id} reply={reply} userId={reply.userId} lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id} />
            ))}
        </>
    )
}

export default PostPage
