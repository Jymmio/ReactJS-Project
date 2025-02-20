import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const { setUser } = useContext(UserContext);
        const navigate = useNavigate();
        function handleEmail(e)
        {
            setEmail(e.target.value);
        }
        function handlePassword(e)
        {
            setPassword(e.target.value);
        }
        
        async function submit(){
            const resp = await fetch('http://localhost:5000/api/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({email, password}),
                credentials: "include"
            });
            const data = await resp.json();
            if (resp.ok) {
                setUser(data.user);
                navigate("/forum");
            }
        }
    return (
        <div className="flex flex-col gap-y-8">
            <h1>Login</h1>
            <div className="flex flex-col items-center gap-y-8">
                <input type="email" placeholder="jean.dupont@gmail.com" onChange={handleEmail}/>
                <input type="password" placeholder="********" onChange={handlePassword}/>
                <button onClick={submit}>Se connecter</button>
            </div>
        </div>
    )
}