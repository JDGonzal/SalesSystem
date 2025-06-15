import styled from 'styled-components';
import { useAuthStore } from '../../store/AuthStore';

const Container = styled.div`
  height: 100vh;
`;

function HomeTemplate() {
  const { logout } = useAuthStore();
  return (
    <Container>
      <span>HomeTemplate</span>
      <button onClick={logout}>Logout</button>
    </Container>
  );
}

export default HomeTemplate;
