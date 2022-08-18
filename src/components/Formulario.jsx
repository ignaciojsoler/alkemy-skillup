import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import logo from '../assets/logo.png'
import Swal from 'sweetalert2'

const Formulario = ({setTokenExist}) => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === "" || password === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Debes completar todos los campos.",
        iconColor: '#ffc605',
        showConfirmButton: false,
        timer: 1300
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes ingresar una dirección de correo válida',
        iconColor: '#ffc605',
        showConfirmButton: false,
        timer: 1300
      });
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Correo electrónico o contraseña inválidos. Inténtalo con usuario: challenge@alkemy.org contraseña: react',
        iconColor: '#ffc605',
        showConfirmButton: false,
      });
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org/", { email, password })
      .then((res) => {
        const token = res.data.token;
        sessionStorage.setItem("token", token);
        setTokenExist(true)
        navigate("/listado");
      });
  };

  return (
    <>
      {token ? (
        <Navigate to="/listado" />
      ) : (
        <div className="pt-32 min-h-screen flex flex-col justify-between bg-hero-pattern bg-cover bg-center space-y-10 md:justify-center md:items-center md:pt-16 md:overflow-hidden md:space-y-5">
          <div className="space-y-5 px-10 md:space-y-2">
            <div className="flex justify-center">
              <img src={logo} className=" h-36"/>
            </div>
            <h1 className="text-4xl text-light text-center uppercase font-bold">Movies online</h1>
          </div>
          <div className="h-full px-10 pt-10 pb-28 rounded-t-3xl bg-tertiary bg-opacity-80 backdrop-blur-lg sm:py-10 sm:px-32 md:px-10 md:w-96 md:h-80 md:rounded-xl">
            <h2 className="mb-8 text-2xl font-semibold text-light md:mb-4">Iniciar sesión</h2>
            <form onSubmit={handleSubmit} className="relative bottom-0 space-y-5 flex flex-col">
              <input type="email" name="email" className="p-3 bg-tertiary border-dark text-lg text-light rounded active:bg-tertiary" placeholder="Email" />
              <input type="password" name="password" className="p-3 bg-tertiary border-dark text-lg text-light rounded" placeholder="Password" />
              <button type="submit" className="bg-primary py-3 rounded font-semibold hover:bg-yellow-500">
                Ingresar
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};

export default Formulario;
