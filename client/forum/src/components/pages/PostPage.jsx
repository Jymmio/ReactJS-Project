import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

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

    if (!post) return <p className="text-center mt-6">Chargement...</p>;

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            {post.image && <img src={`http://localhost:5000${post.image}`} alt="Post" className="w-full max-w-md my-4 rounded" />}
            <p className="text-gray-700 text-lg">{post.content}</p>
            <p className="text-sm text-gray-400 mt-4">Posté par {post.author.pseudo}</p>
        </div>
    );
}
