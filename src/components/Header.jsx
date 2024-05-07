import React from 'react'
import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react"
import { AiFillHome } from "react-icons/ai"
import { RxAvatar } from "react-icons/rx"
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link as RouterLink } from "react-router-dom"
import { FiLogOut } from 'react-icons/fi'
import useLogout from '../hooks/useLogout'
import { ImEnter } from 'react-icons/im'
import { BsFillChatQuoteFill } from 'react-icons/bs'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const logout = useLogout()
  const user = useRecoilValue(userAtom)
  return (
    <>
      {user && (
        <Flex justifyContent={"space-between"} mt={6} mb={12}>
          <Link as={RouterLink} to={"/"}>
            <AiFillHome size={24} />
          </Link>
          <Image
            cursor={"pointer"}
            alt='logo'
            w={6}
            src={colorMode === 'dark' ? "/light-logo.svg" : '/dark-logo.svg'}
            onClick={toggleColorMode}
          />
          <Flex alignItems={"center"} gap={4}>
            <Link as={RouterLink} to={`/${user.username}`}>
              <RxAvatar size={24} />
            </Link>
            <Link as={RouterLink} to={'/chat'}>
              <BsFillChatQuoteFill size={20} />
            </Link>
            <Button size={"xs"} onClick={logout}><FiLogOut size={20} /></Button>
          </Flex>
        </Flex>
      )}
      {!user && (
        <Flex justifyContent={"space-between"} mt={6} mb={12}>
          <Image
            cursor={"pointer"}
            alt='logo'
            w={6}
            src={colorMode === 'dark' ? "/light-logo.svg" : '/dark-logo.svg'}
            onClick={toggleColorMode}
          />
          <Link as={RouterLink} to={"/"}>
            <Button size={"sm"}>
              <ImEnter size={24}/>
            </Button>
          </Link>
        </Flex>
      )}
    </>

  )
}

export default Header
