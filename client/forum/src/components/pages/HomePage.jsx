import ReviewSection from "../sections/ReviewSection";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

async function disconnect(){
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
        <div className="flex flex-col gap-y-8">
            {/*<button onClick={disconnect}>Se déconnecter</button>*/}
            <LoginPage />
            <hr className="border-t border-gray-400 my-4" />
            <SignupPage />
        </div>
    )
}