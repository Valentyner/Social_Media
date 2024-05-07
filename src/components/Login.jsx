import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import { useNavigate } from 'react-router-dom'

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreen = useSetRecoilState(authScreenAtom)
    const showToast = useShowToast()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userAtom)
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })
    const handleLogin = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            })
            const data = await res.json()
            if (data.error) {
                showToast("Error", data.error, "error")
                return
            }
            await localStorage.setItem("user-threads", JSON.stringify(data))
            await setUser(data)
            navigate(`/${data.username}`)
        } catch (error) {
            showToast("Error", error, "error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Login
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    boxShadow={'lg'}
                    p={8}
                    w={{
                        base: "full",
                        sm: "400px",
                    }}
                >
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" onChange={(e) => setInputs({ ...inputs, username: e.target.value })} value={inputs.username} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} value={inputs.password} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                isLoading={loading}
                                loadingText="Logging in"
                                size="lg"
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={'white'}
                                _hover={{
                                    bg: useColorModeValue("gray.700", "gray.800"),
                                }}
                                onClick={handleLogin}>
                                Login
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Don`t have an account? <Link color={'blue.400'}
                                    onClick={() => setAuthScreen("signup")}>Sign up</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}