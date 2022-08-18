import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineInfo } from 'react-icons/ai'
import { useSpring, animated } from 'react-spring'

const Resultados = (props) => {
  const navigateTo = useNavigate();
  const token = sessionStorage.getItem("token");
  const querString = new URLSearchParams(window.location.search);
  const keyWord = querString.get("keyword");
  const apiKey = "4479c8da513385de6697a704f3630e3e";
  const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${keyWord}&page=1&include_adult=false`;

  const [moviesResults, setMoviesResults] = useState(null);

  const favStorage = JSON.parse(localStorage.getItem("favs"));

  const animationProps = useSpring(
    {
      to: { opacity: 1 },
      from: { opacity: 0 },
      delay: 500
    }
  )

  useEffect(() => {
    axios.get(endpoint).then((res) => {
      const resultados = res.data.results;
      setMoviesResults(resultados);
      return;
    });
  }, [moviesResults]);

  return (
    <div className="max-w-7xl mx-auto">
      {!token && navigateTo("/")}
      {!moviesResults && 
      <div className="m-auto flex flex-column justify-center items-center text-light mt-24">
        <span className="text-light">Cargando...</span>
      </div>}
      {(moviesResults && moviesResults.length  === 0) && (
        <h3 className="text-light mt-24">No se han encontrado resultados</h3>
      )}
      {(moviesResults && moviesResults.length > 0) &&
        (
          <>
            <animated.h3 style={animationProps} className="text-light pt-20 ml-5 text-2xl sm:ml-16">Resultados de "{keyWord}"</animated.h3>
            <animated.div style={animationProps} className="px-5 m-auto pb-6 pt-5 max-w-6xl  grid gap-2 grid-cols-3 sm:px-16 md:grid-cols-4 lg:grid-cols-5">
              {moviesResults.map((movie, index) => {
                let isAddedToFavorite = false;

                favStorage.map((peli) => {
                  let number = peli.id - movie.id;
                  if (number === 0) {
                    isAddedToFavorite = true;
                  }
                });

                return (
                  //TODO - arreglar el hover y el loading...
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden transition duration-150 md:border md:border-zinc-700 hover:border-zinc-500"
                  >

                    <button
                      className="absolute m-2  rounded-full  hover:filter hover:brightness-75 transition-opacity duration-100 md:p-2 md:bg-light md:backdrop-blur-sm md:bg-opacity-20 z-30"
                      onClick={props.addOrRemoveFromFavs}
                      data-movie-id={movie.id}
                    >
                      {isAddedToFavorite ? "❤️" : "💙"}
                    </button>
                    <Link to={`/detalle?movieID=${movie.id}`}>
                      <img
                        src={
                          movie.poster_path !== null
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : "../src/assets/no-poster.png"
                        }
                        className="w-auto h-full"
                        alt="movie poster"
                      />
                      <div className="absolute bg-opacity-0 flex items-center justify-center w-full h-full bg-black top-0 right-0 transition duration-200 group-hover:bg-opacity-50 ">
                        <AiOutlineInfo className="opacity-0 text-6xl text-gray-300 rounded-full border-2 border-gray-300 p-2 transition duration-200 group-hover:opacity-100" />
                      </div>

                      {/*the sole purpose of this element is to pass the name of the movie */}
                      <h5 className="hidden">
                        {movie.title}
                      </h5>
                    </Link>
                  </div>
                );
              })}
            </animated.div>
          </>
        )}
    </div>
  );
};

export default Resultados;
