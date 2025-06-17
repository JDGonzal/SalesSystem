import styled, { ThemeProvider } from 'styled-components';
import {
  AuthContextProvider,
  GlobalStyles,
  Login,
  MyRoutes,
  Sidebar,
  useThemeStore,
} from './index.ts';
import { Device } from './styles/breakpoints.ts';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Container = styled.main`
  // Es un componente de estilo
  display: grid;
  grid-template-columns: 1fr;
  /*background-color: lightyellow;*/
  transition: 0.1s ease-in-out;
  .leftSidebar {
    display: none; /* Oculta la barra lateral izquierda */
    /* background-color: lightblue; */
  }
  .mainMenu {
    position: absolute;
    /* background-color: lightgreen; */
  }
  .rightRoutes {
    /* background-color: lightcoral; */
    grid-column: 1; /* Ocupa toda la fila */
    width: 100%; /* Asegura que ocupe todo el ancho disponible */
  }
  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr; /* una columnas */
    &.active {
      grid-template-columns: 260px 1fr;
    }
    .leftSidebar {
      display: initial; /* Barra lateral izquierda en tablets */
    }
    .mainMenu {
      display: none;
    }
    .rightRoutes {
      grid-column: 2; /* Ocupa la segunda columna */
    }
  }
`;

function App() {
  // Estado para Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Estado para el tema
  const { themesStyle } = useThemeStore();
  // Para obtener ubicación actual
  const { pathname } = useLocation();
  return (
    <ThemeProvider theme={themesStyle}>
      <AuthContextProvider>
        <GlobalStyles />
        {pathname == '/login' ? (
          <Login />
        ) : (
          <Container className={sidebarOpen ? 'active' : ''}>
            <section className='leftSidebar'>
              <Sidebar
                state={sidebarOpen}
                setState={() => setSidebarOpen(!sidebarOpen)}
              />
            </section>
            <section className='mainMenu'>
              <p>MainMenu</p>
            </section>
            <section className='rightRoutes'>
              <MyRoutes />
            </section>
          </Container>
        )}
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
