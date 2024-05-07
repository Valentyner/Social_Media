import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoSendSharp } from "react-icons/io5"
import useShowToast from '../hooks/useShowToast'
import conversationsAtom, { selectedConversationAtom } from '../atoms/conversationAtom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const MessageInput = ({ setMessages }) => {
    const [message, setMessage] = useState("")
    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const setConversations = useSetRecoilState(conversationsAtom)
    const showToast = useShowToast()


    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!message) return

        try {
            const res = await fetch(`/api/messages/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: message,
                    recipientId: selectedConversation.userId
                })
            })
            const data = await res.json()
            if (data.error) {
                showToast("Error", data.error, 'error')
                return
            }

            setMessages((messages) => [...messages, data])
            setConversations(prevConv => {
                const updatedConversations = prevConv.map( conversation => {
                    if(conversation._id === selectedConversation._id) {
                        return {
                            ...conversation,
                            lastMessage: {
                                text: message,
                                sender: data.sender,
                            }
                        }
                    }
                    return conversation
                })
                return updatedConversations;
            })
            setMessage("")
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
    return (
        <form onSubmit={handleSendMessage}>
            <InputGroup>
                <Input w={"full"} placeholder='Type a massage' onChange={(e) => setMessage(e.target.value)} value={message} />
                <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
                    <IoSendSharp />
                </InputRightElement>
            </InputGroup>
        </form>
    )
}

export default MessageInput
