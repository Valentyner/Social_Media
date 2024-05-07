import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"
import usePreviewImg from '../hooks/usePreviewImg'
import useShowToast from '../hooks/useShowToast'
import { Navigate, useNavigate } from 'react-router-dom'

export default function UpdateProfilePage() {
  const showToast = useShowToast()
  const navigate = useNavigate()
  const [updating, setUpdating] = useState(false)
  const [user, setUser] = useRecoilState(userAtom)
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    email: user.email,
    password: "",
    profilePic: "",
  })
  const fileRef = useRef(null)

  const { handleImageChange, imgUrl } = usePreviewImg()

  const handleCancelClick = () => {
    navigate(`/${user.username}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (updating) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl })
      })
      const data = await res.json()
      if (data.error) {
        showToast("Error", data.error, "error")
        return
      }

      showToast("Done", "Your profile updated successfully", "success")
      setUser(data)
      await localStorage.setItem("user-threads", JSON.stringify(data));
      navigate(`/${data.username}`)
    } catch (error) {
      showToast("Error", error, "error")
    } finally {
      setUpdating(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        align={'center'}
        justify={'center'}
        my={6}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.800')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={10}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar boxShadow={"md"} size="xl" src={imgUrl || user.profilePic}>
                </Avatar>
              </Center>
              <Center w="full">
                <Button onClick={() => fileRef.current.click()} w="full">Change Avatar</Button>
                <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="John Doe"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              default={user.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              value={inputs.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="johndoe"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Your bio"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              onClick={handleCancelClick}
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              isLoading={updating}
              type='submit'
              bg={'green.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'green.500',
              }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  )
}