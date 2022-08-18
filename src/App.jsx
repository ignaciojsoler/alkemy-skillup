import "./app.css";
import { useState, useEffect } from "react";
//Libraries
import { Routes, Route, useNavigate } from "react-router-dom";

//Components
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

function App() {
  const [tokenExist, setTokenExist] = useState(false)
  const [favorites, setFavorites] = useState([]);
  const favMovies = localStorage.getItem("favs");
  const navigate = useNavigate()
  
  const addOrRemoveFromFavs = (e) => {
    const favMovies = localStorage.getItem("favs");

    let tempMoviesInFavs;

    favMovies === null
      ? (tempMoviesInFavs = [])
      : (tempMoviesInFavs = JSON.parse(favMovies));

    const btn = e.target;
    const btnParent = btn.parentElement;
    const imgUrl = btnParent.querySelector("img").getAttribute("src");
    const title = btnParent.querySelector("h5").innerText;
    const movieData = {
      imgUrl,
      title,
      id: btn.dataset.movieId,
    };

    let moviesInArray = tempMoviesInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });

    if (!moviesInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs)
    } else {
      let moviesLeft = tempMoviesInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft)
    }
    localStorage.getItem("favs");
  };

  const cerrarSesion = () => {
    sessionStorage.clear()
    setTokenExist(false)
    navigate('/')
  }


  useEffect(() => {
    setFavorites(JSON.parse(favMovies));
  }, []);

  //TODO - revisar el loading...

  return (
    <div className="bg-black min-h-screen h-full flex flex-col justify-between font-montserrat">
      <Header tokenExist={tokenExist} cerrarSesion={cerrarSesion}/>

      <>
        <Routes>
          <Route exact path="/" element={<Formulario setTokenExist={setTokenExist}/>} />

          <Route
            path="/listado"
            element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />}
          />

          <Route path={"/detalle"} element={<Detalle />} />

          <Route
            path={"/resultados"}
            element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs} />}
          />

          <Route
            path={"/favoritos"}
            element={<Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} />}
          />
        </Routes>
      </>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
