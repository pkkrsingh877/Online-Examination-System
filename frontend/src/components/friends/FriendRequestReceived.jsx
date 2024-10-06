import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FriendRequestReceived = () => {
    const [potentialFriends, setpotentialFriends] = useState([]);

    const fetchpotentialFriends = async () => {
        const response = await axios.get('http://localhost:5000/api/friendrequestreceived');
        setpotentialFriends(response.data);
    };

    useEffect(() => {
        fetchpotentialFriends();
    }, [potentialFriends]);
    return (
        <div>
            <h2>Friend Requests Received</h2>
            <ul>
                {potentialFriends ? (
                    potentialFriends.map((potentialFriend) => (
                        <div key={potentialFriend._id}>
                            <h4><Link to={`/friendRequestRecieved/${potentialFriend._id}`}>{potentialFriend.username}</Link></h4>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>You have not received any friend requests.</p>
                )}
            </ul>
        </div>
    );
}

export default FriendRequestReceived;