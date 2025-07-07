import { v } from '../styles/variables';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';

export const DesplegableUser = [
  {
    text: 'Mi perfil',
    icono: v.iconoUser, // <v.iconoUser />,
    tipo: 'miperfil',
  },
  {
    text: 'Configuracion',
    icono: v.iconoSettings, // <v.iconoSettings />,
    tipo: 'configuracion',
  },
  {
    text: 'Cerrar sesión',
    icono: v.iconoCerrarSesion, // <v.iconoCerrarSesion />,
    tipo: 'cerrarsesion',
  },
];

//data SIDEBAR
export const LinksArray = [
  {
    label: 'Home',
    icon: 'noto-v1:house', // ícono de https://icon-sets.iconify.design
    to: '/', // A donde va a navegar
  },
  {
    label: 'VENDER',
    icon: 'flat-color-icons:shop', // ícono de https://icon-sets.iconify.design
    to: '/pos', // A donde va a navegar
  },
  {
    label: 'Kardex',
    icon: 'flat-ui:box', // ícono de https://icon-sets.iconify.design
    to: '/kardex', // A donde va a navegar
  },
  {
    label: 'Reportes',
    icon: 'flat-ui:graph', // ícono de https://icon-sets.iconify.design
    to: '/reportes', // A donde va a navegar
  },
];
export const SecondarylinksArray = [
  {
    label: 'Configuración',
    icon: 'icon-park:setting-two',
    to: '/config',
    color: '#CE82FF',
  },
];
//temas
export const TemasData = [
  {
    icono: '🌞',
    descripcion: 'light',
  },
  {
    icono: '🌚',
    descripcion: 'dark',
  },
];

//data configuracion
export const DataModulosConfiguracion = [
  {
    title: 'Productos',
    subtitle: 'registra tus productos',
    icono: 'https://i.ibb.co/85zJ6yG/caja-del-paquete.png',
    link: '/configurar/productos',
    state: true,
  },
  {
    title: 'Personal',
    subtitle: 'ten el control de tu personal',
    icono: 'https://i.ibb.co/5vgZ0fX/hombre.png',
    link: '/configurar/usuarios',
    state: true,
  },

  {
    title: 'Tu empresa',
    subtitle: 'configura tus opciones básicas',
    icono: 'https://i.ibb.co/x7mHPgm/administracion-de-empresas.png',
    link: '/configurar/empresa',
    state: true
  },
  {
    title: 'Categoria de productos',
    subtitle: 'asigna categorias a tus productos',
    icono: 'https://i.ibb.co/VYbMRLZ/categoria.png',
    link: '/config/categories',
    state: true,
  },
  {
    title: 'Marca de productos',
    subtitle: 'gestiona tus marcas',
    icono: 'https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png',
    link: '/configurar/marca',
    state: true,
  },
];
//tipo usuario
export const TipouserData = [
  {
    descripcion: 'empleado',
    icono: '🪖',
  },
  {
    descripcion: 'administrador',
    icono: '👑',
  },
];
//tipodoc
export const TipoDocData = [
  {
    descripcion: 'Dni',
    icono: '🪖',
  },
  {
    descripcion: 'Libreta electoral',
    icono: '👑',
  },
  {
    descripcion: 'Otros',
    icono: '👑',
  },
];
