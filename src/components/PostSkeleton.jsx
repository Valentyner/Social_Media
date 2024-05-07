import { Link } from "react-router-dom"
import { Flex, Box, Text } from "@chakra-ui/layout"
import { Skeleton, SkeletonCircle } from "@chakra-ui/react"


const PostSkeleton = () => {
  return (
    <Link to={"/markzuckerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Box>
            <SkeletonCircle startColor="gray.700" endColor="gray.800" size={"12"} />
          </Box>
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <SkeletonCircle
              startColor="gray.700" 
              endColor="gray.800"
              size={"6"}
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"} />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Skeleton startColor="gray.700" endColor="gray.800" width={"150px"} height={"20px"} />
            </Flex>
            <Flex gap={4} alignItems={"center"} onClick={(e) => e.preventDefault()}>
            </Flex>
          </Flex>
          <Text fontSize={"sm"}><Skeleton startColor="gray.700" endColor="gray.800" width={"450px"} height={"10px"} /></Text>
          <Box borderRadius={6} overflow={"hidden"}
            borderColor={"gray.light"}>
            <Skeleton startColor="gray.700" endColor="gray.800" height={"300px"} />
          </Box>
          <Flex gap={3} my={1}>
            <Skeleton startColor="gray.700" endColor="gray.800" height={"30px"} width={"150px"} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  )
}

export default PostSkeleton
