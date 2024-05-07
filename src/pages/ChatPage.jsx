import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import Conversation from '../components/Conversation'
import MessageContainer from '../components/MessageContainer'
import { useEffect, useState } from 'react'
import useShowToast from "../hooks/useShowToast"
import conversationsAtom, { selectedConversationAtom } from '../atoms/conversationAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { GiConversation } from "react-icons/gi";
import userAtom from '../atoms/userAtom'

const ChatPage = () => {
    const showToast = useShowToast()
    const [conversations, setConversations] = useRecoilState(conversationsAtom)
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
    const [loadigConverstaion, setLoadingConversation] = useState(true)
    const [searchText, setSearchText] = useState("")
    const [searchingUser, setSearchingUser] = useState(false)
    const currentUser = useRecoilValue(userAtom)

    const handleConversationsSearch = async (e) => {
        e.preventDefault()
        setSearchingUser(true)
        try {
            const res = await fetch(`/api/users/profile/${searchText}`);
            const searchedUser = await res.json()
            if (searchedUser.error) {
                showToast("Error", searchedUser.error, "error")
                return
            }

            const messagingYourself = searchedUser._id === currentUser._id
            if (messagingYourself) {
                showToast("Error", "You cannot message yourself", "error",)
                return
            }

            const conversationAlreadyExists = conversations.find(conversation => conversation.participants[0]._id === searchedUser._id);
            if (conversationAlreadyExists) {
                setSelectedConversation({
                    _id: conversationAlreadyExists._id,
                    userId: searchedUser._id,
                    userProfilePic: searchedUser.profilePic,
                    username: searchedUser.username,
                })
                return
            }

            const mockConversation = {
                mock: true,
                lastMessage: {
                    text: "",
                    sender: ""
                },
                _id: Date.now(),
                participants: [
                    {
                        _id: searchedUser._id,
                        username: searchedUser.username,
                        profilePic: searchedUser.profilePic,
                    }
                ],
            }
            setConversations((prevConvs) => [...prevConvs, mockConversation])
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setSearchingUser(false)
        }
    }

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await fetch("/api/messages/conversations")
                const data = await res.json()
                if (data.error) {
                    showToast("Error", data.error, "error")
                    return
                }
                setConversations(data)
            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setLoadingConversation(false)
            }
        }
        getConversations()
    }, [showToast, setConversations])
    return (
        <Box position={"absolute"} left={"50%"} transform={"translateX(-50%)"} p={4} w={{ lg: "950px", md: "100%", base: "100%" }} >
            <Flex gap={4} flexDirection={{
                base: "column",
                md: "row"
            }}
                maxW={{
                    sm: "400px",
                    md: "full"
                }} mx={"auto"}>
                <Flex flex={30} gap={2} p={4} flexDirection={"column"} maxW={{ sm: "250px", md: "full" }} maxH={"760px"} mx={"auto"} overflow={"auto"}>
                    <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>Your Conversations</Text>
                    <form onSubmit={handleConversationsSearch}>
                        <Flex alignItems={"center"} gap={2} position={"sticky"}>
                            <Input placeholder='Search for user...' onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                            <Button isLoading={searchingUser} size={"sm"} onClick={handleConversationsSearch}><SearchIcon /></Button>
                        </Flex>
                    </form >
                    {loadigConverstaion &&
                        [0, 1, 2, 3, 4].map((_, i) => (
                            <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                                <Box>
                                    <SkeletonCircle size={"12"} />
                                </Box>
                                <Flex w={"full"} flexDirection={"column"} gap={3}>
                                    <Skeleton h={"10px"} w={"80px"} />
                                    <Skeleton h={"8px"} w={"90%"} />
                                </Flex>
                            </Flex>
                        ))}

                    {!loadigConverstaion && (
                        conversations.map(conversation => (
                            <Conversation key={conversation._id} conversation={conversation} />
                        ))
                    )}
                </Flex>
                {!selectedConversation._id && (
                    <Flex flex={70} borderRadius={"md"} p={2} flexDir={"column"} alignItems={"center"} justifyContent={"center"} height={"400px"}>
                        <GiConversation size={100} />
                        <Text fontSize={20}>Select a conversation to start messaging</Text>
                    </Flex>
                )}

                {selectedConversation._id && (
                    <MessageContainer conversatinId={selectedConversation._id} />
                )}
            </Flex>
        </Box>
    )
}

export default ChatPage
