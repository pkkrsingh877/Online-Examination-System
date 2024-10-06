import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import PotentialFriends from './PotentialFriends';

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const { user } = useContext(UserContext);

    const fetchFriends = async () => {
        try {
            if (user) {
                const response = await axios.get(`http://localhost:5000/api/friends/${user.id}`);
                setFriends(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, [user]);

    return (
        <div>
            <h2>Friends</h2>
            <ul>
                {friends.length > 0 ? (
                    friends.map((friend) => (
                        <div key={friend._id}>
                            <h4><Link to={`/friends/${friend._id}`}>{friend.username}</Link></h4>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No friends Available to view!</p>
                )}
            </ul>
            <PotentialFriends />
        </div>
    );
}

export default Friends;