import styled from 'styled-components';
import { GlobalStyles } from './index.ts';
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
  }
  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr ; /* una columnas */
    .leftSidebar {
      display: initial; /* Barra lateral izquierda en tablets */
    }
    .mainMenu {
      position: none; /* Elimina la posición absoluta en tablets */
      width: 100%;
    }
    .rightRoutes {
      width: 100%;
    }
  }
`;

function App() {
  return (
    <Container>
      <GlobalStyles />
      <section className='leftSidebar'>
        <p>Sidebar</p>
      </section>
      <section className='mainMenu'>
        <p>MainMenu</p>
      </section>
      <section className='rightRoutes'>
        <p>Content</p>
      </section>
    </Container>
  );
}

export default App;
