import { Avatar, Flex, Text } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '../atoms/conversationAtom'
import userAtom from '../atoms/userAtom';

const Message = ({ ownMessage, message }) => {
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    const currentUser = useRecoilValue(userAtom)
    return (
        <>
            {ownMessage ? (
                <Flex gap={2} alignSelf={"flex-end"}>
                    <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>{message.text}</Text>
                    <Avatar src={currentUser.profilePic} w={7} h={7} />
                </Flex>
            ) : (
                <Flex gap={2}>
                    <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
                    <Text maxW={"350px"} bg={"gray.700"} p={1} borderRadius={"md"}>{message.text}</Text>
                </Flex>
            )}
        </>
    )
}

export default Message
