import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";

export default function ForumPage() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const postsPerPage = 2; 
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const paginatedPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(`http://localhost:5000/api/posts`);
            const data = await res.json();

            if (res.ok) {
                setPosts(data.posts);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="flex flex-col items-center gap-y-6 p-6">
            <h1 className="text-3xl font-bold">Forum</h1>
            <CreatePost />
            <div className="w-full max-w-2xl flex flex-col gap-y-4">
                {paginatedPosts.map(post => (
                    <div 
                        key={post._id} 
                        className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
                        onClick={() => navigate(`/post/${post._id}`)}
                    >
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
                        <p className="text-sm text-gray-400">Posté par {post.author.pseudo}</p>
                    </div>
                ))}
            </div>
            <div className="flex gap-x-4">
                <button 
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Précédent
                </button>
                <span>Page {currentPage} / {totalPages}</span>
                <button 
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
}
