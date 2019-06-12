/**
 * Returns the *x* and *y* coordinates of the mouse relative to the svg root container element.
 * The coordinates are returned as an array of two-elements \[*x*, *y*].
 * Inspired by https://raw.githubusercontent.com/d3/d3-selection/master/src/point.js
 * @param svg the root svg container element
 * @param event the mouse event
 */
const svgPoint = (svg: SVGSVGElement, event: MouseEvent) => {
    if (svg.createSVGPoint) {
        let point = svg.createSVGPoint()
        point.x = event.clientX
        point.y = event.clientY
        point = point.matrixTransform(svg.getScreenCTM().inverse())
        return [point.x, point.y]
    }
    const rect = svg.getBoundingClientRect()
    return [event.clientX - rect.left - svg.clientLeft, event.clientY - rect.top - svg.clientTop]
}

export default svgPoint
