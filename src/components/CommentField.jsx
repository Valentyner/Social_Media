import { Button, Flex, Input, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'

const CommentField = () => {

    const handleComment = async () => {
        const res = fetch("/")
    }
    const [comment, setComment] = useState("")
    return (
        <>
            <Flex flexDirection="column" justifyContent="start" p={1} w="full" h="full">
                <Textarea
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    h="100px"
                    fontSize="16px"
                    lineHeight={1.5}
                    overflow="hidden"
                    resize="vertical"
                    borderRadius="0px"
                    borderTopLeftRadius="7px"
                    borderTopRightRadius="7px"
                    borderBottom={"none"}
                    placeholder="Type your comment here"
                />
                <Flex justifyContent="start" mt={0} bg="gray.700" w="full" h="30px" pl={3} color="gray.light" borderBottomLeftRadius="7px" borderBottomRightRadius="7px">Comment here</Flex>
                <Flex justifyContent="start">
                    <Button size="sm" color="white" mt={3} bg="gray.500" _hover={{ bg: "gray.700" }} onClick={handleComment}>Comment</Button>
                </Flex>
            </Flex>
        </>
    )
}

export default CommentField
