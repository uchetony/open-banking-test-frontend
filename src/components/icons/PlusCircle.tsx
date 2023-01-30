// import React from 'react';
import SVGIconWrapper, { SVGIconWrapperProps } from './SVGIconWrapper';

function PlusCircle(props: SVGIconWrapperProps) {
  return (
    <SVGIconWrapper {...props}>
      <>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </>
    </SVGIconWrapper>
  );
}

export default PlusCircle;
