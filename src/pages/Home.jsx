import { useEffect, useState } from "react";
import { omdb } from "../api/omdb";
import { Link } from "react-router-dom";

export default function Home() {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async (keyword = "avengers") => {
        try {
            const res = await omdb.get("", { params: { s: keyword } });
            if (res.data.Search) {
                setMovies(res.data.Search);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error("Error fetch:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat pt-24"
            style={{
                backgroundImage:
                    "url('https://wallpapercave.com/fuwp-510/uwp4668597.png')",
            }}
        >
            <div className="bg-black/60 min-h-screen -mt-24 pt-24 px-4">
                <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center">
                    <span className="text-white">Avenger</span> Movie List
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <Link
                            to={`/movie/${movie.imdbID}`}
                            key={movie.imdbID}
                            className="bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:scale-105 transition transform"
                        >
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="w-full h-72 object-cover rounded-md"
                            />
                            <h2 className="mt-2 text-lg font-semibold text-white">
                                {movie.Title}
                            </h2>
                            <p className="text-sm text-gray-300">{movie.Year}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
