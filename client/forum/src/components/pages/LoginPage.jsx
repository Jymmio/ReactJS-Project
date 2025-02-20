import { useState } from "react";
import { UserContext } from "../context/UserContext";
export default function LoginPage(){
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const { setUser } = useContext(UserContext);
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
            if (res.ok) {
                setUser(data.user);
            }
        }
    return (
        <div>
            <input type="email" placeholder="jean.dupont@gmail.com" onChange={handleEmail}/>
            <input type="password" placeholder="********" onChange={handlePassword}/>
            <button onClick={submit}>Se connecter</button>
        </div>
    )
}