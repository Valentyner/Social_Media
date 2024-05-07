import { Box, Container } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import HomePage from "./pages/HomePage";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import FollowersPage from "./pages/FollowersPage";
import ChatPage from "./pages/ChatPage";

export default function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Box position={"relative"} w={"full"}>
      <Container maxW={"800px"}>
        <Header />
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to={"/auth"} />} />
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to={"/"} />} />
          <Route path="/:username" element={user ?
            (
              <>
                <UserPage />
                <CreatePost />
              </>
            ) : (
              <UserPage />
            )} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route path="/chat" element={user ? <ChatPage /> : <Navigate to={"/"} />} />
          <Route path="/followers/:username" element={user ? <FollowersPage /> : <Navigate to={"/auth"} />} />
          <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to={"/auth"} />} />
        </Routes>
      </Container>
    </Box>
  );
}
