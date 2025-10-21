import { useEffect, useState } from "react";
import { omdb } from "../api/omdb";
import { Link } from "react-router-dom";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔹 Daftar keyword film populer untuk tampilan awal
    const popularKeywords = [
        "Avengers", "Batman", "Spiderman", "Iron Man", "Superman",
        "Harry Potter", "Fast and Furious", "Captain America",
        "Thor", "Doctor Strange"
    ];

    // 🔹 Ambil data film populer (gabungkan hasil dari beberapa keyword)
    const fetchPopularMovies = async () => {
        setLoading(true);
        let allMovies = [];
        for (const keyword of popularKeywords) {
            try {
                const res = await omdb.get("", { params: { s: keyword } });
                if (res.data.Search) {
                    allMovies = [...allMovies, ...res.data.Search];
                }
            } catch (error) {
                console.error("Error fetch popular movies:", error);
            }
        }

        // 🔹 Hapus duplikat berdasarkan imdbID dan batasi 25 film saja
        const uniqueMovies = Array.from(
            new Map(allMovies.map((m) => [m.imdbID, m])).values()
        ).slice(0, 25);

        setMovies(uniqueMovies);
        setLoading(false);
    };

    // 🔹 Fungsi pencarian manual
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return fetchPopularMovies();
        setLoading(true);
        try {
            const res = await omdb.get("", { params: { s: search } });
            // 🔹 Ambil maksimal 20 hasil
            const limitedResults = (res.data.Search || []).slice(0, 20);
            setMovies(limitedResults);
        } catch (error) {
            console.error("Error search:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat pt-24"
            style={{
                backgroundImage:
                    "url('https://wallpapercave.com/fuwp-510/uwp4668597.png')",
            }}
        >
            <div className="bg-black/70 min-h-screen -mt-24 pt-24 px-4">
                {/* 🔹 Search Bar */}
                <div className="max-w-4xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-yellow-400 text-center mb-4">
                        <span className="text-white">Popular</span> Movies
                    </h1>
                    <form
                        onSubmit={handleSearch}
                        className="flex justify-center gap-2 mb-6"
                    >
                        <input
                            type="text"
                            placeholder="Search movie..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-2/3 md:w-1/2 p-2 rounded-lg outline-none text-white"
                        />
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* 🔹 Loading / List Film */}
                {loading ? (
                    <p className="text-center text-white text-lg">Loading movies...</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {movies.length > 0 ? (
                            movies.map((movie) => (
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
                                    <h2 className="mt-2 text-lg font-semibold text-yellow-400">
                                        {movie.Title}
                                    </h2>
                                    <p className="text-sm text-white">{movie.Year}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-white col-span-full">
                                No movies found.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
