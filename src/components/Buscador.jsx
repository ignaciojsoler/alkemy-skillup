import React from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'

const Buscador = () => {
    const navigateTo = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const userInput = e.currentTarget.userInput.value;
        if (userInput.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: "Escribe una película.",
                iconColor: '#ffc605',
                showConfirmButton: false,
                timer: 1300
            });
        } 
        else {
            e.currentTarget.userInput.value = ""
            navigateTo(`/resultados?keyword=${userInput}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative inline-flex items-center rounded-lg bg-zinc-800">
            <input type="text" className=" rounded-lg pl-4 pr-2 py-2 w-5/6 bg-tertiary text-light text-lg placeholder:text-zinc-500 sm:text-base md:w-5/6 focus:outline-none" placeholder="Buscar películas..." name='userInput'autoComplete="off" />
            <button type='submit' className='absolute right-4'>
            <AiOutlineSearch className=' text-zinc-500 transition hover:text-zinc-400'/>
            </button>
            
        </form>
    );
};

export default Buscador;