import React, { useEffect, useState } from 'react'
import { Flex, Avatar, Text, Divider } from "@chakra-ui/react"
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'
import useShowToast from '../hooks/useShowToast'

const Comment = ({ reply, lastReply }) => {
    const showToast = useShowToast()

    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={reply.userProfilePic} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{reply.username}</Text>
                    </Flex>
                    <Text>{reply.comment}</Text>
                </Flex>
            </Flex>
            {!lastReply && (
                <Divider my={4} />
            )}
        </>
    )
}

export default Comment
