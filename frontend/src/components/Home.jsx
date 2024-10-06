import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import styles from "../css/Home.module.css";

const Home = () => {
    const { user } = useContext(UserContext);
    return (
        <div className={styles.main}>
            <h1>Interspace Online</h1>
            <div className={styles.links}>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/posts/new">CreatePost</Link>
            </div>
            {/* Check if user exists and then render the username and email */}
            {user ? (
                <p>
                    <strong>Username:</strong> {user.username}<br />
                    <strong>Email:</strong> {user.email}<br />
                    <strong>userId:</strong> {user.id}
                </p>
            ) : (
                <p>No user information available</p>
            )}
        </div>
    );
}

export default Home;