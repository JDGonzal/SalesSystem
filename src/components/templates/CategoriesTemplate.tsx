import styled from 'styled-components';

function CategoriesTemplate() {
  return (
    <Container>
      <section className='area1'>
        area1
      </section>
      <section className='area2'>
        area2
      </section>
      <section className='main'>
        main
      </section>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  padding: 15px;
  width: 100%;
  display: grid;
  grid-template:
    'area1' 100px
    'area2' 100px
    'main' auto;
  .area1{
    grid-area:area1;
    background-color:rgba(103,93,241,0.14);
  }
  .area2{
    grid-area:area2;
    background-color:rgba(229,67,26,0.14);
  }
  .main{
    grid-area:main;
    background-color:rgba(237,7,221,0.14);
  }
`;

export default CategoriesTemplate;
