import styled from 'styled-components';
import { BtnMolecule, Title, Finder } from '../../index.ts';
import { v } from '../../styles/variables.ts';

function CategoriesTemplate() {
  return (
    <Container>
      <section className='area1'>
        <Title $paddingBottom='0px'>Categorias</Title>
        <BtnMolecule
          title='Nuevo'
          bgcolor={v.colorPrincipal}
          icon={<v.iconoagregar /> /* {React.createElement(v.iconoagregar)} */}
        />
      </section>
      <section className='area2'>
        <Finder />
      </section>
      <section className='main'>main</section>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 30px);
  padding: 15px;
  display: grid;
  grid-template:
    'area1' 80px
    'area2' 60px
    'main' auto;
  .area1 {
    grid-area: area1;
    background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .area2 {
    grid-area: area2;
    background-color: rgba(7, 237, 45, 0.14);
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .main {
    grid-area: main;
    background-color: rgba(237, 7, 221, 0.14);
  }
`;

export default CategoriesTemplate;
