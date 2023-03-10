import React from 'react';

import SVGIconWrapper, { SVGIconWrapperProps } from './SVGIconWrapper';

export default function ArrowUp(props: SVGIconWrapperProps) {
  return (
    <SVGIconWrapper {...props}>
      <>
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </>
    </SVGIconWrapper>
  );
}
