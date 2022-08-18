import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { BsTwitter, BsFacebook, BsShareFill } from 'react-icons/bs'
import { useSpring, animated } from 'react-spring'

const Detalle = () => {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  const navigate = useNavigate()

  const token = sessionStorage.getItem("token");
  const apiKey = "4479c8da513385de6697a704f3630e3e";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let movieID = urlParams.get("movieID");

  const animationProps = useSpring(
    {
      to: { opacity: 1 },
      from: { opacity: 0 },
      delay: 400
    }
  )

  useEffect(() => {
    //Get movie details
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=es-ES`
      )
      .then((res) => {
        setMovie(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal',
          text: `${err}`,
          iconColor: '#ffc605',
          showConfirmButton: false,
          timer: 1300
        });
      });

    //Get movie credits
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`)
      .then((res) => {
        setCredits(res.data)

      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal',
          text: `${err}`,
          iconColor: '#ffc605',
          showConfirmButton: false,
          timer: 1300
        });
      });

  }, [movieID]);

  return (
    <>
      {!token && navigate('/')}
      {!movie && (
        <div className="m-auto flex flex-column justify-center items-center text-light">
          <div role="status">
          </div>
          <span>Cargando...</span>
        </div>
      )}
      {movie && credits && (
        <>
          {/*Background image */}
          {/*This should be done with background class, but tailwind does not respond to load a bg-url() dynamically */}
          <animated.div style={animationProps} className="fixed h-screen z-0 w-full overflow-hidden">
            <img
              src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '../src/assets/no-poster.png'}
              alt="movie"
              className="relative filter blur-sm brightness-50 w-full z-20 mt-12 md:hidden"
            />
            <img
              src={movie.backdrop_path !== null ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : '../src/assets/no-poster.png'}
              alt="movie"
              className="hidden relative filter blur-sm brightness-50 w-full z-20 md:block"
            />
            <div className="absolute w-full bg-gradient-to-t from-black to-transparent z-30 bottom-0 h-4/5 lg:h-3/5"></div>
          </animated.div>

          {/*Details body */}
          <animated.div style={animationProps} className="relative max-w-6xl mx-auto px-6 py-16 text-light sm:px-16">
            <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 ">
              <div className="col-span-5 pt-6 sm:col-span-4 lg:col-span-4">
                <img
                  src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '../src/assets/no-poster.png'}
                  alt="movie"
                  className="rounded-xl border border-zinc-500"
                ></img>
              </div>
              <div className="col-span-7 space-y-2 sm:space-y-4  sm:col-span-8">
                <h2 className="text-xl pt-6 font-semibold sm:block sm:text-3xl">{movie.title}</h2>
                <h5 className="pr-6 text-zinc-400 text-xl">Año </h5>
                <span className="text-secondary">{movie.release_date ? movie.release_date.substring(0, 4) : "No disponible"}</span>
                <h5 className="pr-6 text-zinc-400 text-xl">Calificación </h5>
                <span className="text-secondary">⭐️ {movie.vote_average ? movie.vote_average.toFixed(2) : "No disponible"}</span>
                <div className=" flex">
                  <button className="flex items-center mr-2"><BsShareFill className="text-seccondary mr-2" /> Compartir</button>
                  <button className="p-2 rounded-full mx-1 bg-cyan-500"><BsTwitter /></button>
                  <button className="p-2 rounded-full mx-1 bg-blue-500"><BsFacebook /></button>
                </div>
                <div className="hidden space-y-5 mt-4 lg:block">
                  <p className="text-light text-lg ">
                    {movie.overview ? movie.overview : "Resumen no disponible"}
                  </p>
                  <h5 className="text-zinc-400 text-lg ">
                    Géneros:&nbsp;
                    {movie.genres.map((oneGenre, idx) => { return <span key={idx} className=" text-light">{(idx ? ', ' : '') + oneGenre.name}</span> })}
                  </h5>
                  <h5 className="text-zinc-400 text-lg ">
                    Actores principales: {
                      credits.cast.slice(0, 5).map((actor, idx) => {
                        return <span key={idx} className=" text-light">{(idx ? ', ' : '') + actor.name}</span>
                      })
                    }
                  </h5>
                </div>
              </div>
            </div>
            <div className=" space-y-5 mt-4 lg:hidden">
              <p className=" text-lg text-light">
                {movie.overview ? movie.overview : "Resumen no disponible"}
              </p>
              <h5 className="text-zinc-400 text-lg ">
                Géneros:&nbsp;
                {movie.genres.map((oneGenre, idx) => { return <span key={idx} className=" text-light">{(idx ? ', ' : '') + oneGenre.name}</span> })}
              </h5>
              <h5 className="text-zinc-400 text-lg ">
                Actores principales: {
                  credits.cast.slice(0, 5).map((actor, idx) => {
                    return <span key={idx} className=" text-light">{(idx ? ', ' : '') + actor.name}</span>
                  })
                }
              </h5>
            </div>
          </animated.div>
        </>
      )}
    </>
  );
};

export default Detalle;
