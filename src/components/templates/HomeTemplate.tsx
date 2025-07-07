import styled from 'styled-components';
import { useAuthStore } from '../../store/AuthStore';
import { useAuthContext } from '../../context/AuthContext';

function HomeTemplate() {
  const { logout } = useAuthStore();
  const { authState } = useAuthContext();
  // console.log('authState in HomeTemplate:', authState);
  return (
    <Container>
      <span>HomeTemplate</span>
      <button onClick={logout}>Logout</button>
      <img src={authState?.user_metadata?.avatar_url} />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

export default HomeTemplate;
