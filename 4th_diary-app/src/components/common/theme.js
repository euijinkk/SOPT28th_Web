import { css } from 'styled-components';

const sizes = {
    desktop: 1440,
    fiveCard: 1200,
    tablet: 769,
  };

const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}px) {
        ${css(...args)};
      }
    `;
    return acc;
  }, {});

  const theme = {
    media,
  };
  
  export default theme;
  