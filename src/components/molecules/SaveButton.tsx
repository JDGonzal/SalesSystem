import styled from 'styled-components';
import { Icono } from '../../index';
import type { JSX } from 'react';


interface SaveButtonProps {  
  funcion?: ()=> void; // Optional, to pass a function on click
  titulo: string;
  bgcolor: string; 
  icono?: JSX.Element; // import type { JSX } from 'react';
  url?: string; // Optional, if you want to use it as a link
  color: string; // Optional, to set the text color of the button
  disabled?: boolean; // Optional, if you want to disable the button
  width?: string; // Optional, to set the width of the button
}

export function SaveButton({
  funcion,
  titulo,
  bgcolor,
  icono,
  url,
  color,
  disabled,
  width,
}: SaveButtonProps) {
  return (
    <Container
      $width={width}
      disabled={disabled}
      $color={color}
      type='submit'
      $bgcolor={bgcolor}
      onClick={funcion}
    >
      <section className='content'>
        <Icono $color={color}>{icono}</Icono>
        {titulo && (
          <span className='btn'>
            <a href={url} target='_blank'>
              {titulo}
            </a>
          </span>
        )}
      </section>
    </Container>
  );
}

const Container = styled.button<{ $width?: string; $bgcolor: string; $color: string; }>`
  font-weight: 700;
  display: flex;
  font-size: 15px;
  padding: 10px 25px;
  border-radius: 16px;
  background-color: ${(props) => props.$bgcolor};
  border: 2px solid rgba(50, 50, 50, 0.2);
  border-bottom: 5px solid rgba(50, 50, 50, 0.2);
  transform: translate(0, -3px);
  cursor: pointer;
  transition: 0.2s;
  transition-timing-function: linear;
  color: rgb(${(props) => props.$color});
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$width};
  .content {
    display: flex;
    gap: 12px;
  }
  &:active {
    transform: translate(0, 0);
    border-bottom: 2px solid rgba(50, 50, 50, 0.5);
  }
  &[disabled] {
    background-color: #646464;
    cursor: no-drop;
    box-shadow: none;
  }
`;
