import { useContext } from "react";
import UserContext from "../context/UserContext";

const Home = () => {
    const { user } = useContext(UserContext);
    return (
        <div className="box">
            {/* Check if user exists and then render the username and email */}
            {user ? (
                <section>
                    <h1 className="display-1">Hi {user.username}, Welcome To SkillGauge</h1>
                    <p className="display-6 text-secondary">World Greatest Place to Take Online Exams</p>
                </section>
            ) : (
                <section>
                    <h1 className="display-1">Hi There, Welcome To SkillGauge</h1>
                    <p className="display-6 text-secondary">World Greatest Place to Take Online Exams</p>
                </section>
            )}
            <JoinQuiz />
        </div>
    );
}

export default Home;