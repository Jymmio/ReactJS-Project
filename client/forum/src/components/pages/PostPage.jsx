import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); 
    const [newComment, setNewComment] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1); 
    const commentsPerPage = 2; 

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

        async function fetchComments() {
            const res = await fetch(`http://localhost:5000/api/comments/posts/${id}/comments`);
            const data = await res.json();
            console.log(data.comments);
            if (res.ok) {
                setComments(data.comments);
            }
        }
        fetchComments();
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

    async function handleCommentSubmit() {
        if (!newComment.trim()) return;

        const res = await fetch(`http://localhost:5000/api/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ content: newComment, post: id })
        });

        if (res.ok) {
            const data = await res.json();
            setComments([...comments, data.comment]);
            setNewComment("");
        } else {
            alert("Erreur lors de l'ajout du commentaire !");
        }
    }
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const paginatedComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    if (!post) return <p className="text-center mt-6">Chargement...</p>;

    return (
        <div className="p-6 flex flex-col items-center gap-y-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            {post.image && <img src={`http://localhost:5000${post.image}`} alt="Post" className="w-full max-w-md my-4 rounded" />}
            <p className="text-gray-700 text-lg">{post.content}</p>
            <p className="text-sm text-gray-400 mt-4">Posté par {post.author.pseudo}</p>

            {user && post.author._id === user.id && (
                <button 
                    onClick={handleDelete} 
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Supprimer le post
                </button>
            )}

            <div className="w-full max-w-2xl mt-6">
                <h2 className="text-xl font-bold">Laisser un commentaire</h2>
                <div className="flex flex-row gap-4 mt-2">
                    <textarea 
                        placeholder="Votre commentaire..." 
                        className="border border-gray-500 bg-white text-black w-full p-2 rounded"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button 
                        onClick={handleCommentSubmit} 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Envoyer
                    </button>
                </div>
            </div>

            <div className="w-full max-w-2xl mt-6">
                <h2 className="text-xl font-bold">Commentaires</h2>
                {comments.length === 0 ? (
                    <p className="text-gray-500">Aucun commentaire pour l'instant.</p>
                ) : (
                    paginatedComments.map((comment) => (
                        <div key={comment._id} className="p-4 border-b border-gray-300">
                            <p className="font-semibold">{comment.author.pseudo}</p>
                            <p>{comment.content}</p>
                            <p className="text-sm text-gray-400">{new Date(comment.date).toLocaleString()}</p>
                        </div>
                    ))
                )}

                <div className="flex justify-center mt-4 gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </button>
                    <span>Page {currentPage} / {totalPages}</span>
                    <button
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
}
