import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles, MyRoutes, Sidebar, useThemeStore } from './index.ts';
import { Device } from './styles/breakpoints.ts';

const Container = styled.main`
  // Es un componente de estilo
  display: grid;
  grid-template-columns: 1fr;
  background-color: lightyellow;
  .leftSidebar {
    display: none; /* Oculta la barra lateral izquierda */
    background-color: lightblue;
  }
  .mainMenu {
    position: absolute;
    background-color: lightgreen;
  }
  .rightRoutes {
    background-color: lightcoral;
    grid-column: 1; /* Ocupa toda la fila */
    width: 100%; /* Asegura que ocupe todo el ancho disponible */
  }
  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr; /* una columnas */
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
  const { themesStyle } = useThemeStore();
  return (
    <ThemeProvider theme={themesStyle}>
      <Container>
        <GlobalStyles />
        <section className='leftSidebar'>
          <Sidebar />
        </section>
        <section className='mainMenu'>
          <p>MainMenu</p>
        </section>
        <section className='rightRoutes'>
          <MyRoutes />
        </section>
      </Container>
    </ThemeProvider>
  );
}

export default App;
