import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function FavoritePage() {
    const { user } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return; 
        async function fetchFavorites() {
            try {
                const res = await fetch(`http://localhost:5000/api/users/${user.id}/favorites`, {
                    credentials: "include",
                });
                const data = await res.json();
                if (res.ok) {
                    setFavorites(data.favorites);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des favoris :", error);
            }
        }
        fetchFavorites();
    }, [user]);

    async function removeFavorite(postId) {
        const res = await fetch(`http://localhost:5000/api/users/${postId}/favorites`, {
            method: "DELETE",
            credentials: "include"
        });

        if (res.ok) {
            setFavorites(prev => prev.filter(post => post._id !== postId));
        }
    }

    return (
        <div className="flex flex-col items-center gap-y-6 p-6">
            <h1 className="text-3xl font-bold">Mes Favoris</h1>

            {favorites.length === 0 ? (
                <p className="text-gray-500">Vous n'avez aucun post en favori.</p>
            ) : (
                <div className="w-full max-w-2xl flex flex-col gap-y-4">
                    {favorites.map(post => (
                        <div 
                            key={post._id} 
                            className="relative p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate(`/post/${post._id}`)}
                        >
                            <div 
                                className="absolute top-2 right-2 text-2xl cursor-pointer text-red-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFavorite(post._id);
                                }}
                            >
                                ❌
                            </div>

                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
                            <p className="text-sm text-gray-400">Posté par {post.author.pseudo}</p>
                        </div>
                    ))}
                </div>
            )}

            <button 
                onClick={() => navigate("/forum")} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Retour au forum
            </button>
        </div>
    );
}
