import styled from 'styled-components';
import { /*GridLoader*/ RingLoader } from 'react-spinners';

function Spinner() {
  return (
    <Container>
      {/*<GridLoader*/}
      <RingLoader
        color='#36D7B7'
        loading={true}
        cssOverride={{
          display: 'block',
          margin: '0 auto',
          borderColor: 'red',
        }}
        size={100}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Spinner;
