import styled from 'styled-components';
interface TitleProps {
  $paddingBottom: string;
}

const Title = styled.span<TitleProps>`
  font-weight: 700;
  font-size: 30px;
  padding-bottom: ${(props) => props.$paddingBottom || '10px'};
`;

export default Title;
