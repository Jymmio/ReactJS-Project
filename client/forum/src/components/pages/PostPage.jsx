import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function fetchPost() {
            const res = await fetch(`http://localhost:5000/api/posts/${id}`);
            const data = await res.json();

            if (res.ok) {
                setPost(data);
            }
        }
        fetchPost();
    }, [id]);
    async function handleDelete() {
        if (!window.confirm("Voulez-vous vraiment supprimer ce post ?")) return;

        const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (res.ok) {
            navigate("/forum"); 
        } else {
            alert("Erreur lors de la suppression !");
        }
    }

    if (!post) return <p className="text-center mt-6">Chargement...</p>;

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            {post.image && <img src={`http://localhost:5000${post.image}`} alt="Post" className="w-full max-w-md my-4 rounded" />}
            <p className="text-gray-700 text-lg">{post.content}</p>
            <p className="text-sm text-gray-400 mt-4">Posté par {post.author.pseudo}</p>
            {console.log(user)}
            {user && post.author._id === user.id && (
                <button 
                    onClick={handleDelete} 
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Supprimer le post
                </button>
            )}
        </div>
    );
}
