import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { clientPoint } from 'd3-selection';

export type Props = {
    readonly mouseTrigger: React.RefObject<SVGElement>
    readonly width: number;
    readonly height: number;
    readonly xOffset?: number;
    readonly yOffset?: number;
};

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
        const mouseTrigger = this.props.mouseTrigger.current;
        if (mouseTrigger) {
            mouseTrigger.onmouseover = this.updateTooltip(mouseTrigger);
            mouseTrigger.onmousemove = this.updateTooltip(mouseTrigger);
            mouseTrigger.onmouseout = () => this.setState({type: 'TooltipHidden'});
        }
    }

    render() {
        if (this.state.type === 'TooltipHidden') {
            return <g/>;
        } else {
            const x = this.state.x + (this.props.xOffset || 0);
            const y = this.state.y + (this.props.yOffset || 0);

            const tooltip =
                (
                    <g
                        className="Tooltip"
                        transform={`translate(${x}, ${y})`}
                        pointerEvents="none" // tooltip should never grab mouse > prevent flickering
                    >
                        <rect x={0} y={0} width={this.props.width} height={this.props.height}/>
                        {this.props.children}
                    </g>
                );

            return ReactDOM.createPortal(tooltip, this.state.svgSvgElement);
        }
    }

    private updateTooltip(mouseTriggerElement: SVGElement) {
        return (evt: MouseEvent) => {
            if (mouseTriggerElement.ownerSVGElement) {
                const mousePosition = clientPoint(mouseTriggerElement.ownerSVGElement, evt);
                this.setState({
                    type: 'TooltipVisible',
                    svgSvgElement: mouseTriggerElement.ownerSVGElement,
                    x: mousePosition[0],
                    y: mousePosition[1]
                });
            }
        };
    }

}

export default TooltipComponent;
