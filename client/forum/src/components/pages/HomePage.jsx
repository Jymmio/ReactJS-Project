import ReviewSection from "../sections/ReviewSection";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";


export default function HomePage(){
    return (
        <div className="flex flex-col gap-y-8">
            <LoginPage />
            <hr className="border-t border-gray-400 my-4" />
            <SignupPage />
        </div>
    )
}