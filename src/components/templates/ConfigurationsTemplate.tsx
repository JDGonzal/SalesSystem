import styled from 'styled-components';
import fondocuadros from '../../assets/fondocuadros.svg';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { useModulesStore, type moduleType } from '../../index.ts';

function ConfigurationsTemplate() {
  const { dataModules } = useModulesStore() as {
    dataModules: moduleType[];
  };
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      document.querySelectorAll('.card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };
    const cardsContainer = document.getElementById('cards');
    if (cardsContainer) {
      cardsContainer.addEventListener('mousemove', handleMouseMove);
      return () => {
        cardsContainer.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);
  return (
    <Container>
      <div id='cards'>
        {dataModules.map((item, index) => {
          return (
            <Link
              to={item.link}
              className={item.checked ? 'card' : 'card false'}
              key={index}
            >
              {/*{item.state}*/}
              <div className='card-content'>
                <div className='card-image'>
                  <img src={item.icon} /> {/*{item.icono}*/}
                </div>

                <div className='card-info-wrapper'>
                  <div className='card-info'>
                    <i className='fa-duotone fa-unicorn'></i>
                    <div className='card-info-title'>
                      <h3>{item.name}</h3> {/*{item.title}*/}
                      <h4>{item.description}</h4> {/*{item.subtitle}*/}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${fondocuadros});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat, repeat;
  align-items: center;
  background-color: ${({ theme }) => theme.bgtotal};
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
  align-items: flex-start;

  #cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 16px;
    max-width: 650px;
    width: calc(100% - 20px);
    padding: 10px;
  }

  #cards:hover > .card::after {
    opacity: 1;
  }

  .card {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    height: 200px;
    flex-direction: row;
    position: relative;
    width: 100%;
    &:hover {
      .card-image {
        img {
          filter: grayscale(0);
        }
      }
    }
  }

  .card:hover::before {
    opacity: 1;
  }

  .card::before,
  .card::after {
    border-radius: inherit;
    content: '';
    height: 100%;
    left: 0px;
    opacity: 0;
    position: absolute;
    top: 0px;
    transition: opacity 500ms;
    width: 100%;
  }

  .card::before {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
    z-index: 3;
  }
  */ .card::after {
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.4),
      transparent 80%
    );
    z-index: 1;
  }

  /* * card class and card-content class */
  .card > .card-content {
    background-color: ${({ theme }) => theme.bgcards};
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-wrap: wrap;
    inset: 1px;
    padding: 10px;
    /* position: absolute; show only the last element */
    position: relative; // Changed to relative for better layout
    z-index: 2;
    align-items: center; // Added to center content
  }

  h1,
  h2,
  h3,
  h4,
  span {
    color: ${({ theme }) => theme.colorsubtitlecard};
    font-family: 'Rubik', sans-serif;
    font-weight: 600;
    margin: 0px;
  }

  i {
    color: ${({ theme }) => theme.colorsubtitlecard};
  }

  .card-image {
    align-items: center;
    display: flex;
    height: 140px;
    justify-content: center;

    img {
      transition: 0.3s;
      height: 70%;
      filter: grayscale(100%);
    }
  }

  .card-info-wrapper {
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
    padding: 0px 20px;
  }

  .card-info {
    align-items: flex-start;
    display: flex;
    gap: 10px;
  }

  .card-info > i {
    font-size: 1em;
    height: 20px;
    line-height: 20px;
  }

  .card-info-title > h3 {
    font-size: 1.1em;
    line-height: 20px;
  }

  .card-info-title > h4 {
    color: ${({ theme }) => theme.colortitlecard};
    font-size: 0.85em;
    margin-top: 8px;
    font-weight: 500;
  }
  #cards:hover > .card::after {
    opacity: 1;
  }
  &::before {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
    z-index: 3;
  }
  /* * $ {(props) => props. $color0}, - Unknown*/
  &::after {
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      ${(props) => props.color || 'rgba(255, 255, 255, 0.4)'},
      transparent 40%
    );
    z-index: 1;
  }

  @media (max-width: 1000px) {
    align-items: flex-start;
    overflow: auto;

    #cards {
      max-width: 1000px;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
    }

    .card {
      flex-shrink: 1;
      width: 100%;
    }
  }

  @media (max-width: 500px) {
    #cards {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(5, 1fr);
      gap: 12px;
    }

    .card {
      height: 180px;
      width: 100%;
    }

    .card-image {
      height: 80px;
    }

    .card-image > i {
      font-size: 3em;
    }

    .card-info-wrapper {
      padding: 0px 10px;
    }

    .card-info > i {
      font-size: 0.8em;
    }

    .card-info-title > h3 {
      font-size: 0.9em;
    }

    .card-info-title > h4 {
      font-size: 0.8em;
      margin-top: 4px;
    }
  }
`;

export default ConfigurationsTemplate;
