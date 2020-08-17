import React from "react";
import Home from "../../views/main/Home";
import Notes from "../../views/Notes";
import FrmNotes from "../Notes/FrmNote";

import StackNavigator from "../Navigation/StackNavigator";

export const routes = [
  {
    main: () => (
      <StackNavigator
        routes={[
          {
            title: "Listado de Tareas",
            main: () => <Home />,
          },
        ]}
      />
    ),
    icon: "list-ul",
    title: "Lista de Tareas",
  },
  {
    main: () => (
      <StackNavigator
        routes={[
          {
            title: "Lista de Notas",
            main: () => <Notes />,
          },
          {
            title: "Registro de Notas",
            main: () => <FrmNotes />,
          },
        ]}
      />
    ),
    icon: "sticky-note",
    title: "Lista de Notas",
  },
];
