import styled from 'styled-components';
import type { JSX } from 'react';

interface TableActionsProps {
  icono:JSX.Element;
  funcion: () => void;
  color: string;
  fontSize?: string | number;
}

function TableActions({ icono, funcion, color, fontSize }: TableActionsProps) {
  return (
    <Container onClick={funcion} color={color} $fontSize={fontSize}>
      {icono}
    </Container>
  );
}

const Container = styled.span<{ color: string; $fontSize?: string | number }>`
  cursor: pointer;
  color: ${({ color }) => color};
  font-size: ${({ $fontSize }) =>
    typeof $fontSize === 'number' ? `${$fontSize}px` : $fontSize || '1rem'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export default TableActions;
