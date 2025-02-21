import { useState, useEffect } from "react";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        const res = await fetch("http://localhost:5000/api/posts", {
            method: "POST",
            body: formData,
            credentials: "include" 
        });

        const data = await res.json();
        if (res.ok) {
            setMessage("Post créé avec succès !");
        } else {
            setMessage(data.message);
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Créer un Post</h2>
            {message && <p className="text-green-600">{message}</p>}
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Titre" 
                    className="border p-2" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea 
                    placeholder="Contenu" 
                    className="border p-2" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                />
                <input 
                    type="file" 
                    className="border p-2" 
                    onChange={(e) => setImage(e.target.files[0])} 
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Publier
                </button>
            </form>
        </div>
    );
}