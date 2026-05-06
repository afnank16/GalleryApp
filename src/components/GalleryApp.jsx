import { Search, Video } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function GalleryApp() {

    const pics = [
        {
            img: "https://images.pexels.com/photos/36250884/pexels-photo-36250884.jpeg",
            tags: ["building, river"]
        },
        {
            img: "https://images.pexels.com/photos/21352832/pexels-photo-21352832.jpeg",
            tags: ["street", "lamp", "building", "bike"]
        },
        {
            img: "https://images.pexels.com/photos/8624734/pexels-photo-8624734.jpeg",
            tags: ["river", "man", "grass", "green", "fishing"]
        },
        {
            img: "https://images.pexels.com/photos/37295912/pexels-photo-37295912.jpeg",
            tags: ["mountain", "sky", "clouds", "flowers"]
        },
        {
            img: "https://images.pexels.com/photos/34744003/pexels-photo-34744003.jpeg",
            tags: ["shop", "bicycle", "street", "bike"]
        },
        {
            img: "https://images.pexels.com/photos/37298148/pexels-photo-37298148.jpeg",
            tags: ["building", "scooter", "city"]
        },
        {
            img: "https://images.pexels.com/photos/36776232/pexels-photo-36776232.jpeg",
            tags: ["forest", "trees", "clouds", "homes"]
        },
        {
            img: "https://images.pexels.com/photos/36327391/pexels-photo-36327391.jpeg",
            tags: ["building", "river", "island", "beauty"]
        },
    ];


    const [favorites, setFavorites] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);
    const [active, setActive] = useState("home");
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const addToFavorites = (item) => {
        if (favorites.some(fav => fav.img === item.img)) return; // Prevent duplicates 
        setFavorites(prev => [...prev, item]);
        toast.success("Added to favorites!");
    };


    return (
        <div className="flex min-h-screen">
            <Toaster position="bottom-right" reverseOrder={false} />
            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 left-0 z-50 h-full w-60 bg-white shadow-xl rounded-r-2xl p-6 border border-gray-100
                    transform transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                <h2 className="text-2xl font-extrabold text-gray-900 mb-8 tracking-tight">
                    Menu
                </h2>

                <ul className="space-y-2">
                    <li>
                        <a
                            onClick={() => {
                                setActive("home");
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium cursor-pointer transition
                ${active === "home"
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-700 hover:bg-gray-100/70 hover:text-blue-600"
                                }`}
                        >
                            Home
                        </a>
                    </li>

                    <li>
                        <a
                            onClick={() => {
                                setActive("favorites");
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium cursor-pointer transition
                ${active === "favorites"
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-700 hover:bg-gray-100/70 hover:text-blue-600"
                                }`}
                        >
                            Favorites
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-60 pt-16 overflow-y-auto">

                {/* Navbar */}
                <header className="flex justify-between items-center px-4 lg:px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 left-0 lg:left-60 right-0 z-10">                    <button
                        className="lg:hidden mr-4"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    {/* Title with a cleaner weight and tighter tracking */}
                    <h1 className="lg:text-2xl sm:text-xl font-semibold text-gray-800 tracking-tight">
                        Photo Gallery
                    </h1>

                    {/* Search Bar Container */}
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-all duration-200 group">

                        <span className="text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search photos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder:text-gray-400 w-48 lg:w-64"
                        />
                    </div>
                </header>


                {/* Gallery */}
                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {active === "home" && (
                            <>
                                {pics
                                    .filter(item =>
                                        item.tags.some(tag => tag.includes(search.toLowerCase()))
                                    )
                                    .map((item, index) => (
                                        <div key={index} className="relative rounded-xl overflow-hidden shadow group cursor-pointer">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToFavorites(item);
                                                }}
                                                className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition"
                                            >
                                                <FaRegStar
                                                    className={`${favorites.some(fav => fav.img === item.img)
                                                        ? "text-yellow-400"
                                                        : "text-white"
                                                        }`}
                                                    size={26}
                                                />
                                            </button>
                                            <img
                                                src={item.img}
                                                alt=""
                                                onClick={() => setSelectedImage(item.img)}
                                                className="w-full h-80 object-cover transition duration-300 group-hover:scale-110"
                                            />

                                        </div>
                                    ))}
                            </>
                        )}
                        {active === "favorites" && (//favorites section
                            <>
                                {favorites.length === 0 ? (
                                    <div className="col-span-full text-center text-gray-500">
                                        No favorites yet. Click the star icon on images to add them here!
                                    </div>
                                ) : (
                                    favorites.map((item, index) => (
                                        <div key={index} className="rounded-xl overflow-hidden shadow group cursor-pointer">
                                            <button
                                                className="absolute z-10 hover:cursor-pointer" onClick={() => {
                                                    setFavorites(prev => prev.filter(fav => fav.img !== item.img));
                                                    toast.error("Removed from favorites!");
                                                }}>
                                                <RiDeleteBin6Line className="absolute z-10 pl-2 pt-2 text-white hover:text-red-500 transition-all" size={26} />
                                            </button>
                                            <img
                                                src={item.img}
                                                alt=""
                                                onClick={() => setSelectedImage(item.img)}
                                                className="w-full h-80 object-cover transition duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                    ))
                                )}
                            </>
                        )}
                    </div>
                </div>

            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Backdrop with a blur effect for that "premium" feel */}
                    <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-xl" />

                    <div
                        className="relative z-10 max-w-5xl w-full flex flex-col items-center animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking the image
                    >
                        {/* Refined Close Button */}
                        <button
                            className="absolute -top-1 right-0 md:-right-12 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        {/* The Image Container */}
                        <div className="relative group overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                            <img
                                src={selectedImage}
                                alt="Preview"
                                className="w-full h-[96vh] object-contain block transform transition-transform duration-500 hover:scale-[1.02]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GalleryApp;