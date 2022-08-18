import { useState, useRef, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";
import Buscador from "./Buscador";
import logo from '../assets/logo.png'
import Hamburger from 'hamburger-react'
import useOnClickOutside from '../hooks/useOnClickOutside'
import {FaUserCircle} from 'react-icons/fa'

const Header = ({ tokenExist, cerrarSesion }) => {
  const location = useLocation()
  const ref = useRef();

  const [isOpen, setOpen] = useState(false)
  const [isDroppable, setIsDroppable] = useState(false)
  const [isDroppableMobile, setIsDroppableMobile] = useState(false)

  const token = sessionStorage.getItem('token')

  useOnClickOutside(ref, () => setIsDroppable(false));
  
  useEffect(() => {
    setIsDroppable(false)
  }, [])
  

  return (
    <>
      <header className="absolute w-full top-0 bg-dark z-40">
        <nav className="m-auto flex justify-between items-center max-w-6xl">
          <ul className={`flex py-4 justify-between items-center mx-6 md:py-3 sm:mx-16 w-full 
          ${(token || tokenExist) && 'py-1'}`}>
            <li >
              <Link to="/" className="flex items-center">
                <img src={logo} className="h-5" />
                <h3 className="text-light uppercase font-semibold ml-2">Movies online</h3>
              </Link>
            </li>
            {
              (token || tokenExist) &&
              <div className="hidden md:flex items-center space-x-6">
                <li className=" bg-dark">
                  <Link to="/listado" className={`text-decoration-none text-light hover:text-primary transition-colors duration-100 ${location.pathname === "/listado" && 'text-primary'}`}>
                    Explorar
                  </Link>
                </li>
                <li className=" bg-dark">
                  <Link to="/favoritos" className={`text-decoration-none text-light hover:text-primary transition-colors duration-100 ${location.pathname === "/favoritos" && 'text-primary'}`}>
                    Favoritos
                  </Link>
                </li>
                <Buscador />
                {/*User droppable menu */}
                <div className="group ml-3 relative" ref={ref}>
                  <div>
                    <button type="button" className="bg-gray-500 flex text-sm rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary hover:bg-gray-400" onClick={() => setIsDroppable(!isDroppable)}>
                      <FaUserCircle className=" h-auto w-8 "/>
                    </button>
                  </div>
                  <div className={`origin-top-right absolute right-0 w-48 rounded-md mt-2 shadow-lg py-1 bg-dark bg-opacity-80 backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none ${!isDroppable && 'hidden'}`} >
                    <button className="block w-full text-start px-4 py-2 text-sm transition-colors duration-100 text-gray-500 hover:text-gray-600" role="menuitem" tabIndex="-1" id="user-menu-item-0">Perfil</button>
                    <button className="block w-full text-start px-4 py-2 text-sm transition-colors duration-100 text-gray-500 hover:text-gray-600" role="menuitem" tabIndex="-1" id="user-menu-item-1">Configuración</button>
                    <button className="block w-full text-start px-4 py-2 text-sm transition-colors duration-100 text-light hover:text-primary" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={() => cerrarSesion()}>Cerrar sesión</button>
                  </div>
                </div>

              </div>

            }
            {
              (token || tokenExist) &&
              <div className="md:hidden">
                <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} color="#ffc605" size={20} />
              </div>
            }
          </ul>
        </nav>
      </header>

      {/*Mobile Sidebar*/}
      {
        (token || tokenExist) &&
        <>
        <div className={`absolute bg-black opacity-70 w-full h-screen z-30 ${!isOpen && 'hidden'} md:hidden`} onClick={() => setOpen(!isOpen)}></div>
      <div className={`absolute -translate-x-full h-screen z-50 w-4/5 bg-dark py-20 ${isOpen && "-translate-x-1"} transition ease-in-out duration-500 md:hidden`}>
        <ul className="space-y-6 ml-8">
          <li className="pb-2">
            <Link to="/" className="flex items-center">
              <img src={logo} className="h-5" />
              <h3 className="text-light uppercase font-semibold ml-2">Movies online</h3>
            </Link>
          </li>
          <li>
            <Buscador />
          </li>
          <li className=" bg-dark text-xl">
            <Link to="/listado" className={`text-decoration-none text-light transition-colors duration-100 hover:text-primary ${location.pathname === "/listado" && 'text-primary'}`}>
              Explorar
            </Link>
          </li>
          <li className=" bg-dark text-xl">
            <Link to="/favoritos" className={`text-decoration-none text-light transition-colors duration-100 hover:text-primary ${location.pathname === "/favoritos" && 'text-primary'}`}>
              Favoritos
            </Link>
          </li>
         
          <li>
            {/*User droppable menu */}
            <div className="group relative" >
              <div >
                <button type="button" className="text-light text-xl flex  focus:text-primary" onClick={() => setIsDroppableMobile(!isDroppableMobile)}>
                  Usuario
                </button>
              </div>
              <div className={`origin-top-right absolute left-0 w-48 rounded-md mt-2 py-1 bg-dark bg-opacity-80 backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none ${!isDroppableMobile && 'hidden'}`} >
                <button className="block w-full text-start py-2 text-xl text-gray-500 hover:text-gray-600" role="menuitem" tabIndex="-1" id="user-menu-item-0">Perfil</button>
                <button className="block w-full text-start py-2 text-xl text-gray-500 hover:text-gray-600" role="menuitem" tabIndex="-1" id="user-menu-item-1">Configuración</button>
                <button className="block w-full text-start py-2 text-xl text-light hover:text-primary" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={() => cerrarSesion()}>Cerrar sesión</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
        </>
      }
      

    </>
  );
};

export default Header;
