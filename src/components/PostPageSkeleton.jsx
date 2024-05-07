import { Box, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React from 'react'

const PostPageSkeleton = () => {
    return (
        <>
            <Flex >
                <Flex w={"full"} alignItems={"center"} gap={3}>
                    <SkeletonCircle size="14" />
                    <Flex>
                        <Skeleton borderRadius={"10px"} startColor="gray.700" endColor="gray.800" height={"10px"} width={"200px"} />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Skeleton startColor="gray.700" endColor="gray.800" borderRadius={"10px"} height={"10px"} width={"10px"} />
                </Flex>
            </Flex>
            <Skeleton borderRadius={"10px"} startColor="gray.700" endColor="gray.800" width={"300px"} height={"15px"} my={3} />
            <Box borderRadius={6} overflow={"hidden"}>
                <Skeleton startColor="gray.700" endColor="gray.800" width={"full"} height={"350px"} />
            </Box>
        </>
    )
}

export default PostPageSkeleton
