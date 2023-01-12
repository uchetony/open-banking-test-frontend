import SVGIconWrapper, { SVGIconWrapperProps } from "./SVGIconWrapper";

export default function ArrowDown(props: SVGIconWrapperProps) {
	return (
		<SVGIconWrapper {...props}>
			<>
				<line x1="12" y1="5" x2="12" y2="19"></line>
				<polyline points="19 12 12 19 5 12"></polyline>
			</>
		</SVGIconWrapper>
	)
}