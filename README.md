# React SVG Tooltip [![Build Status](https://travis-ci.org/fhnw-stec/stec-recorder.svg?branch=master)](https://travis-ci.org/netzwerg/react-svg-tooltip) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react-svg-tooltip.svg?style=flat)](https://www.npmjs.com/package/react-svg-tooltip)

A React component to create tooltips for SVG elements.

The library offers a `Tooltip` component which can be embedded into any SVG element hierarchy.
The component does not actually provide a tooltip.
Instead, it provides a 0-based coordinate system relative to the current mouse position, so you can place your favorite SVG elements in whichever style suits your needs.
Behind the scenes, the library handles all mouse listener logic and makes sure that your tooltip is always rendered on top of all other SVG elements (by using a [React portal](https://reactjs.org/docs/portals.html)).

You might want to read [this blog post](https://netzwerg.ch/blog/2018/05/24/react-svg-tooltips/) for further details.

## Installation

`npm install react-svg-tooltip`

Note that `react` and `react-dom` peer dependencies must already be installed in version `16.3.x` or above.

## Example Usage

This example demonstrates how to attach a rectangular tooltip with some text to a circle shape.
The `triggerRef` property accepts a reference to an arbitrary element (a circle in our example), which further serves as the mouse trigger.
Note how the x/y-coordinates of the tooltip contents (`rect` and `text`) can be expressed relative to the mouse position. 

```jsx
import * as React from 'react';
import { Tooltip } from 'react-svg-tooltip';

const App = () => {

    const circleRef = React.createRef<SVGCircleElement>();

    return (
        <div className='App'>
            <svg viewBox='0 0 100 100'>
                <circle ref={circleRef} cx={50} cy={50} r={10} fill='steelblue'/>
                <Tooltip triggerRef={circleRef}>
                    <rect x={2} y={2} width={10} height={5} rx={.5} ry={.5} fill='black'/>
                    <text x={5} y={5} fontSize={2} fill='white'>Yay!</text>
                </Tooltip>
            </svg>
        </div>
    );
};

export default App;
```

[![Edit pk7p4y9v3q](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pk7p4y9v3q)

![Example Usage](screenshot.png)

## Acknowledgements

Based on [typescript-library-starter-lite](https://github.com/tonysneed/typescript-library-starter-lite.git).

## License

Licensed under [MIT License](LICENSE).

&copy; Rahel Lüthy 2018
