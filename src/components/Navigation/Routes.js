import React from 'react';
import Home from '../../views/main/Home';
import Notes from '../../views/Notes';

export const routes= [
{
    main: ()=> <Home />,
    icon: "list-ul",
    title: 'Lista de Tareas'
    
},
{
    main: ()=> <Notes />,
    icon: "sticky-note",
    title: 'Lista de Notas'
}]