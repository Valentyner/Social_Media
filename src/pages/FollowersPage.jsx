import React, { useEffect, useState } from 'react'
import UserFollowers from '../components/UserFollowers'
import { useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'

const FollowersPage = () => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { username } = useParams()
    const showToast = useShowToast();

    useEffect(() => {
        setLoading(true);
        const getFollowers = async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`)
                const data = await res.json()
                if(data.error) return
                setFollowers(data.followers)
            } catch (error) {
                showToast("Error", error, "error")
            } finally {
                setLoading(false);
            }
        }
        getFollowers()
    }, [showToast, followers])

    return (
        <>
            {followers.map((follower) => (
                <UserFollowers key={follower} follower={follower} />
            ))}
        </>
    )
}

export default FollowersPage
