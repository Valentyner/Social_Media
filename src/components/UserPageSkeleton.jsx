import { Avatar, Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'

const UserPageSkeleton = () => {
    return (
        <VStack gap={4} alignItems={"start"} mb={100}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Skeleton startColor="gray.700" endColor="gray.800" borderRadius={20} height={"20px"} width={"150px"} mb={3} />
                    <Flex gap={2} alignItems={"center"}>
                        <Skeleton startColor="gray.700" endColor="gray.800" borderRadius={20} height={"15px"} width={"300px"} />
                    </Flex>
                </Box>
                <Box>
                    <SkeletonCircle startColor="gray.700" endColor="gray.800" size={"100px"} />
                </Box>
            </Flex>
            <Skeleton startColor="gray.700" endColor="gray.800" borderRadius={5} height={"30px"} width={"150px"} />
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Skeleton startColor="gray.700" endColor="gray.800" borderRadius={20} height={"10px"} width={"120px"} />
                    <Box w={"1"} h={"1"} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Skeleton startColor="gray.700" endColor="gray.800" borderRadius={20} height={"10px"} width={"120px"} />
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <Skeleton startColor="gray.700" endColor="gray.800" width={"30px"} borderRadius={"30px"} height={"30px"} />
                    </Box>
                    <Box className='icon-container'>
                        <Skeleton startColor="gray.700" endColor="gray.800" width={"30px"} borderRadius={"30px"} height={"30px"} />
                    </Box>
                </Flex>
            </Flex>
            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserPageSkeleton
