import styled from 'styled-components';
import { v } from '../../styles/variables.ts';

function Finder({
  setFinder,
}: {
  setFinder?: React.Dispatch<React.SetStateAction<string>>;
}) {
  function onChangeFinder(e: React.ChangeEvent<HTMLInputElement>) {
    if (setFinder) setFinder(e.target.value);
  }
  return (
    <Container>
      <section className='content'>
        <v.iconobuscar className='icon' />
        <input placeholder='buscar...' onChange={onChangeFinder}/>
      </section>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 10px;
  height: 60px;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.text};
  border: spx solid ${(props) => props.theme.color2};
  .content {
    padding: 15px;
    gap: 10px;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    .icon {
      font-size: 18px;
    }
    input {
      font-size: 18px;
      width: 100%;
      outline: none;
      background: none;
      border: 0;
      color: ${(props) => props.theme.text};
    }
  }
`;

export default Finder;
