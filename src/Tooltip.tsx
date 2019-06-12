import * as React from 'react'
import * as ReactDOM from 'react-dom'
import svgPoint from './svg-point'

type Props = Readonly<{
    triggerRef: React.RefObject<SVGElement>
    containerRef?: React.RefObject<SVGSVGElement>
    children: React.ReactNode | ((xOffset: number, yOffset: number) => React.ReactNode)
}>

type TooltipHidden = Readonly<{
    type: 'TooltipHidden'
}>

type TooltipVisible = Readonly<{
    type: 'TooltipVisible'
    svgSvgElement: SVGSVGElement
    x: number
    y: number
}>

type State = TooltipHidden | TooltipVisible

export class TooltipComponent extends React.Component<Props, State> {
    public readonly state: Readonly<State> = { type: 'TooltipHidden' }

    public componentDidMount() {
        const mouseTrigger = this.props.triggerRef.current
        if (mouseTrigger && mouseTrigger.addEventListener) {
            mouseTrigger.addEventListener(`mouseover`, this.updateTooltipListener)
            mouseTrigger.addEventListener(`mousemove`, this.updateTooltipListener)
            mouseTrigger.addEventListener(`mouseleave`, this.hideTooltipListener)
        }
    }

    public render() {
        if (this.state.type === 'TooltipHidden') {
            return <g />
        } else {
            const x = this.state.x
            const y = this.state.y

            const tooltip = (
                <g
                    className="Tooltip"
                    transform={`translate(${x}, ${y})`}
                    pointerEvents="none" // tooltip should never grab mouse > prevent flickering
                >
                    {this.props.children instanceof Function ? this.props.children(x, y) : this.props.children}
                </g>
            )

            return ReactDOM.createPortal(tooltip, this.state.svgSvgElement)
        }
    }

    public componentWillUnmount() {
        const mouseTrigger = this.props.triggerRef.current
        if (mouseTrigger && mouseTrigger.removeEventListener) {
            mouseTrigger.removeEventListener(`mouseover`, this.updateTooltipListener)
            mouseTrigger.removeEventListener(`mousemove`, this.updateTooltipListener)
            mouseTrigger.removeEventListener(`mouseleave`, this.hideTooltipListener)
        }
    }

    private readonly updateTooltipListener = (evt: MouseEvent) => {
        if (this.props) {
            const mouseTrigger = this.props.triggerRef.current
            const svg = this.props.containerRef
                ? this.props.containerRef.current
                : mouseTrigger
                ? mouseTrigger.ownerSVGElement
                : undefined
            if (svg) {
                const mousePosition = svgPoint(svg, evt)
                this.setState({
                    type: 'TooltipVisible',
                    svgSvgElement: svg,
                    x: mousePosition[0],
                    y: mousePosition[1]
                })
            }
        }
    }

    private readonly hideTooltipListener = () => {
        this.setState({ type: 'TooltipHidden' })
    }
}

export default TooltipComponent
