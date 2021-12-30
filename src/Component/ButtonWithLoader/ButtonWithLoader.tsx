import React from 'react';

import { ButtonTop, Container, Loader } from './ButtonWithLoader.styles';

interface ButtonWithLoaderProps {
  title?: string;
  isLoading?: boolean;
  onClick?: any;
  disable?: boolean;
  style?: any;
}

function ButtonWithLoader({
  title,
  isLoading,
  onClick,
  disable,
  style,
}: ButtonWithLoaderProps) {
  return (
    <Container style={style}>
      <ButtonTop onClick={disable ? null : onClick} props={disable}>
        {isLoading ? (
          <Loader>
            <i className="fa fa-spinner fa-spin"></i>
          </Loader>
        ) : null}
        {title || 'Click here'}
      </ButtonTop>
    </Container>
  );
}

export default ButtonWithLoader;
