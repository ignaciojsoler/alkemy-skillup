import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineInfo } from 'react-icons/ai'
import { useSpring, animated } from 'react-spring'

const Listado = (props) => {
  const apiKey = "4479c8da513385de6697a704f3630e3e";
  const navigateTo = useNavigate();
  const token = sessionStorage.getItem("token");

  const [moviesList, setMoviesList] = useState(null);

  const favStorage = JSON.parse(localStorage.getItem("favs")) || [];

  const animationProps = useSpring(
    {
      to: { opacity: 1 },
      from: { opacity: 0 },
      delay: 300
    }
  )

  useEffect(() => {
    !token && navigateTo("/");
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es`
      )
      .then((res) => {
        const data = res.data.results;
        setMoviesList(data);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: "Intentalo de nuevo más tarde.",
          iconColor: '#ffc605',
          showConfirmButton: false,
          timer: 1300
        });
      });
  }, [setMoviesList]);

  return (
    <>
      {!token ? (
        navigateTo("/")
      ) : (
        <div className="max-w-7xl mx-auto">
          {!moviesList ? (
            <div className="m-auto d-flex flex-column justify-content-center align-items-center">
              <div className="spinner-border" role="status"></div>
              <span className="sr-only">Cargando...</span>
            </div>
          ) : (
            <>
              <animated.h3 style={animationProps} className="text-light pt-20 ml-5 text-2xl sm:ml-16">Explorar</animated.h3>
              <animated.div style={animationProps} className=" px-5 m-auto pb-6 pt-5 max-w-6xl  grid gap-2 grid-cols-3 sm:px-16 md:grid-cols-4 lg:grid-cols-5">
                {moviesList.map((movie, index) => {

                  let isAddedToFavorite = false;

                  favStorage.map((favMovie) => {
                    let number = favMovie.id - movie.id
                    if (number === 0) {
                      isAddedToFavorite = true;
                    }
                  })
                  return (
                    //TODO - arreglar el hover y el loading...
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden transition duration-150 md:border md:border-zinc-700 hover:border-zinc-500"
                    >

                      {/* Botón para agregar películas a favoritos */}
                      <button
                        className="absolute m-2  rounded-full  hover:filter hover:brightness-125 transition-opacity duration-100 md:p-2 md:bg-light md:backdrop-blur-sm md:bg-opacity-20 z-30"
                        onClick={props.addOrRemoveFromFavs}
                        data-movie-id={movie.id}
                      >
                        {isAddedToFavorite ? "❤️" : "💙"}
                      </button>
                      <Link to={`/detalle?movieID=${movie.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
      )}
    </>
  );
};

export default Listado;
