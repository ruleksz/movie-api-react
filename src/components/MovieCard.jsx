import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition">
            <Link to={`/movie/${movie.imdbID}`}>
                <img
                    src={
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/300"
                    }
                    alt={movie.Title}
                    className="w-full"
                />
                <div className="p-3">
                    <h2 className="text-lg font-bold">{movie.Title}</h2>
                    <p className="text-sm opacity-75">{movie.Year}</p>
                </div>
            </Link>
        </div>
    );
}
