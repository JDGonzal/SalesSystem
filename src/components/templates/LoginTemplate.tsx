import styled from 'styled-components';
import { Title, InputText2, SaveButton, Linea } from '../../index.ts';
import {v} from '../../styles/variables.ts';

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
              <input
                type='text'
                className='form__field'
                placeholder='email'
                name='email'
                id='email'
              />
            </InputText2>{' '}
            <InputText2>
              <label htmlFor='password'></label>
              <input
                type='password'
                className='form__field'
                placeholder='password'
                name='password'
                id='password'
              />
              <SaveButton
                titulo='INGRESAR'
                bgcolor='#1cb0f6'
                color='255,255,255'
                width='100%'
              />
            </InputText2>
          </form>
          <Linea>
            <span>O</span>
          </Linea>
          <SaveButton
            titulo='Google'
            bgcolor='#fff'
            color='0,0,0'
            width='100%'
            icono={<v.iconogoogle/>}
          />
        </div>
      </section>
    </Container>
  );
}

export default LoginTemplate;
