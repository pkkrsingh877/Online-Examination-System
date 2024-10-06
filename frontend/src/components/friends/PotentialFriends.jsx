import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const PotentialFriends = () => {
    const [potentialFriends, setPotentialFriends] = useState([]);
    const { user } = useContext(UserContext);

    const fetchPotentialFriends = async () => {
        try {
            if (user) {
                const response = await axios.get(`http://localhost:5000/api/potentialfriends`);
                console.log(response.data)
                setPotentialFriends(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPotentialFriends();
    }, [user]);

    const handleSendFriendRequest = async (userId, potentialFriendId) => {
        try {
            if (user) {
                const response = await axios.post(`http://localhost:5000/api/sendFriendRequest`, { userId, potentialFriendId });
                console.log(response.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Potential Friends</h2>
            <ul>
                {potentialFriends.length > 0 ? (
                    potentialFriends.map((potentialFriend) => (
                        <div key={potentialFriend._id}>
                            <h4><Link to={`/friends/${potentialFriend._id}`}>{potentialFriend.username}</Link></h4>
                            <button type="submit" onClick={() => handleSendFriendRequest(user.id, potentialFriend._id)}>Add Friend</button>
                            <Link to={`/chat/${potentialFriend._id}`}>Chat</Link>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No potential friends Available to view!</p>
                )}
            </ul>
        </div>
    );
}

export default PotentialFriends;