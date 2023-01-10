import { SVGAttributes } from 'react';


export interface SVGIconWrapperProps extends SVGAttributes<SVGSVGElement> {
    size?: number;
}

export default function SVGIconWrapper(props: SVGIconWrapperProps) {
    const { size = 24, children, color = "currentColor", ...rest } = props;

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            color={color}
            {...rest}
        >
            {children}
        </svg>
    )
}