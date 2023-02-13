import React from 'react';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Crear Empleado',
    path: '/createEmployees',
    icon: <IoIcons.IoIosCreate />,
    cName: 'nav-text'
  },
  {
    title: 'Ver Empleado',
    path: '/viewEmployees',
    icon: <IoIcons.IoMdSearch />,
    cName: 'nav-text'
  },
  {
    title: 'Crear Ticket',
    path: '/createTicket',
    icon: <IoIcons.IoIosHammer />,
    cName: 'nav-text'
  },
  {
    title: 'Ver Ticket',
    path: '/viewTicket',
    icon: <IoIcons.IoIosSearch />,
    cName: 'nav-text'
  },
  {
    title: 'Cerrar Sesión',
    path: '/login',
    icon: <IoIcons.IoIosClose />,
    cName: 'nav-text'
  },
];