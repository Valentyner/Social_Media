import { Avatar, Box, Button, Flex, Link, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import { Link as RouterLink } from "react-router-dom"

const UserFollowers = ({ follower }) => {
    const [user, setUser] = useState()
    const showToast = useShowToast()
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/users/profile/${follower}`)
                const data = await res.json()
                if(data.error) {
                    
                }
                setUser(data)
            } catch (error) {
                showToast("Error", error, "error")
            }
        }
        getUser()
    }, [showToast])
    if (!user) return null
    return (
        <>
            <Flex mt={8} alignItems={"center"} justifyContent={"space-between"}>
                <Flex w={"full"}>
                    <Link color={"gray.light"} as={RouterLink} to={`/${user.username}`}>
                        <Flex>
                            <Avatar src={user.profilePic} name={user.name} size={"lg"} />
                            <Box ml={3}>
                                <Text fontSize={"22px"}>{user.username}</Text>
                                <Text fontSize={"12px"} color={"gray.600"}>{user.name}</Text>
                            </Box>
                        </Flex>
                    </Link>
                </Flex>
                <Flex ml={100} gap={2} alignItems={"center"}>
                    <Button size={"sm"}>Following</Button>
                </Flex>
            </Flex>
        </>
    )
}

export default UserFollowers
