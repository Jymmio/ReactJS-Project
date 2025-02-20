import ReviewSection from "../sections/ReviewSection";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

async function disconnect(){
    console.log("disconnecting...");
    return await fetch('http://localhost:5000/api/auth/logout', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: "include"
        });
}
export default function HomePage(){
    return (
        <div>
            HomePage
            <button onClick={disconnect}>Se déconnecter</button>
            <LoginPage />
            <SignupPage />
        </div>
    )
}