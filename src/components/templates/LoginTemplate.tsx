import styled from 'styled-components';
import { Title, InputText2 } from '../../index.ts';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function LoginTemplate() {
  return (
    <Container>
      <section className='contentCard'>
        <div className='card'>
          <Title>Ingresar</Title>
          <form action=''>
          <InputText2>
              <label htmlFor='email'></label>
              <input type='text' className='form__field' placeholder='email' name='email' id='email'/>
            </InputText2>            <InputText2>
              <label htmlFor='password'></label>
              <input type='password' className='form__field' placeholder='password' name='password' id='password'/>
            </InputText2>
          </form>
        </div>
      </section>
    </Container>
  );
}

export default LoginTemplate;
