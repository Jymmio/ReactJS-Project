import { useState } from "react";
export default function SignupPage(){
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [pseudo, setPseudo] = useState('');
        const [avatar, setAvatar] = useState('');
    
        function handleEmail(e)
        {
            setEmail(e.target.value);
        }
        function handlePassword(e)
        {
            setPassword(e.target.value);
        }
        function handlePseudo(e)
        {
            setPseudo(e.target.value);
        }

        function handleAvatar(e)
        {
            setAvatar(e.target.files[0]);
        }
        
        async function submit(){
            const formData = new FormData();
            formData.append("pseudo", pseudo);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("avatar", avatar);
            console.log("Données envoyées :", formData);
            const resp = await fetch('http://localhost:5000/api/auth/register', {
                method: "POST",
                body: formData,
            });
            const data = await resp.json();
            console.log(data);
        }
    return (
        <div className="flex flex-col items-center gap-y-8">
            <h1>Signup</h1>
            <input type="text" placeholder="pseudo" onChange={handlePseudo}/>
            <input type="email" placeholder="jean.dupont@gmail.com" onChange={handleEmail}/>
            <input type="password" placeholder="********" onChange={handlePassword}/>
            <input type="file" accept="image/*" onChange={handleAvatar}/>
            <button onClick={submit}>Inscription</button>
        </div>
    )
}