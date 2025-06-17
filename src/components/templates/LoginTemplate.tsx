import styled from 'styled-components';
import {
  Title,
  InputText2,
  SaveButton,
  Linea,
  Footer,
  useAuthStore,
} from '../../index.ts';
import { v } from '../../styles/variables.ts';
import { Device } from '../../styles/breakpoints.ts';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 10px;
    margin: 0 auto;

    @media ${Device.tablet} {
      width: 400px;
    }
  }
`;

const ContentLogo = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  span {
    font-weight: 700;
  }
`;

function LoginTemplate() {
  const { loginGoogle } = useAuthStore();
  return (
    <Container>
      <div className='card'>
        <ContentLogo>
          <img src={v.logo_64x64} alt='Logo' />
          <span>{import.meta.env.VITE_SITE}</span>
        </ContentLogo>
        <Title $paddingBottom='20px'>Ingresar</Title>
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
          </InputText2>{' '}
          <SaveButton
            titulo='INGRESAR'
            bgcolor='#1cb0f6'
            color='255,255,255'
            width='100%'
          />
        </form>
        <Linea>
          <span>O</span>
        </Linea>
        <SaveButton
          funcion={loginGoogle}
          titulo='Google'
          bgcolor='#fff'
          color='0,0,0'
          width='100%'
          icono={<v.iconogoogle />}
        />
      </div>

      <Footer />
    </Container>
  );
}

export default LoginTemplate;
