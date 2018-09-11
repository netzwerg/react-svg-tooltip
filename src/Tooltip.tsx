import * as React from 'react';
import * as ReactDOM from 'react-dom';
import svgPoint from './svg-point';

export type Props = Readonly<{
    triggerRef: React.RefObject<SVGElement>
    containerRef?: React.RefObject<SVGSVGElement>
}>;

export type TooltipHidden = {
    readonly type: 'TooltipHidden'
};

export type TooltipVisible = {
    readonly type: 'TooltipVisible'
    readonly svgSvgElement: SVGSVGElement;
    readonly x: number
    readonly y: number
};

export type State = TooltipHidden | TooltipVisible;

export class TooltipComponent extends React.Component<Props, State> {

    readonly state: Readonly<State> = {type: 'TooltipHidden'};

    componentDidMount() {
        const mouseTrigger = this.props.triggerRef.current;
        if (mouseTrigger) {
            mouseTrigger.addEventListener(`mouseover`, this.updateTooltipListener);
            mouseTrigger.addEventListener(`mousemove`, this.updateTooltipListener);
            mouseTrigger.addEventListener(`mouseleave`, this.hideTooltipListener);
        }
    }

    render() {
        if (this.state.type === 'TooltipHidden') {
            return <g/>;
        } else {
            const x = this.state.x;
            const y = this.state.y;

            const tooltip =
                (
                    <g
                        className="Tooltip"
                        transform={`translate(${x}, ${y})`}
                        pointerEvents="none" // tooltip should never grab mouse > prevent flickering
                    >
                        {this.props.children}
                    </g>
                );

            return ReactDOM.createPortal(tooltip, this.state.svgSvgElement);
        }
    }

    componentWillUnmount() {
        const mouseTrigger = this.props.triggerRef.current;
        if (mouseTrigger) {
            mouseTrigger.removeEventListener(`mouseover`, this.updateTooltipListener);
            mouseTrigger.removeEventListener(`mousemove`, this.updateTooltipListener);
            mouseTrigger.removeEventListener(`mouseleave`, this.hideTooltipListener);
        }
    }

    private readonly updateTooltipListener = (evt: MouseEvent) => {
        const mouseTrigger = this.props.triggerRef.current;
        const svg = this.props.containerRef
            ? this.props.containerRef.current
            : (mouseTrigger ? mouseTrigger.ownerSVGElement : undefined);
        if (svg) {
            const mousePosition = svgPoint(svg, evt);
            svg.setAttribute('visibility', 'visible');
            this.setState({
                type: 'TooltipVisible',
                svgSvgElement: svg,
                x: mousePosition[0],
                y: mousePosition[1]
            });
        }
    }

    private readonly hideTooltipListener = () => {
        if (this.props.containerRef && this.props.containerRef.current) {
            this.props.containerRef.current.setAttribute('visibility', 'hidden');
        }
        this.setState({type: 'TooltipHidden'});
    }

}

export default TooltipComponent;
