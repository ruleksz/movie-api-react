import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { omdb } from "../api/omdb";

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const fetchDetail = async () => {
        try {
            const res = await omdb.get("", { params: { i: id } });
            setMovie(res.data);
        } catch (error) {
            console.error("Error fetch:", error);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, [id]);

    if (!movie) return <div className="p-4 text-white">Loading...</div>;

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative pt-12"
            style={{
                backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/800"})`,
            }}
        >
            {/* Overlay hitam transparan */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

            <div className="relative z-10 p-6 md:p-12 text-white">
                <Link
                    to="/"
                    className="text-yellow-400 hover:text-yellow-300 underline mb-6 inline-block text-lg"
                >
                    ← Back to list
                </Link>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full md:w-1/3 rounded-lg shadow-2xl border border-white/20"
                    />

                    <div className="flex-1 space-y-4">
                        <h1 className="text-4xl font-bold leading-tight">{movie.Title}</h1>
                        <p className="text-gray-300 text-lg">
                            {movie.Year} • {movie.Genre}
                        </p>
                        <p className="text-gray-200 text-base leading-relaxed">
                            {movie.Plot}
                        </p>

                        <div className="space-y-2 pt-4 text-gray-100">
                            <p>
                                <span className="font-semibold text-yellow-400">Director:</span>{" "}
                                {movie.Director}
                            </p>
                            <p>
                                <span className="font-semibold text-yellow-400">Actors:</span>{" "}
                                {movie.Actors}
                            </p>
                            <p>
                                <span className="font-semibold text-yellow-400">IMDB Rating:</span>{" "}
                                ⭐ {movie.imdbRating}
                            </p>
                        </div>

                        <div className="pt-4">
                            <a
                                href={`https://www.imdb.com/title/${movie.imdbID}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg transition"
                            >
                                View on IMDb
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
