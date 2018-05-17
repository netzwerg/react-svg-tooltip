# React SVG Tooltip [![Build Status](https://travis-ci.org/fhnw-stec/stec-recorder.svg?branch=master)](https://travis-ci.org/netzwerg/react-svg-tooltip) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react-svg-tooltip.svg?style=flat)](https://www.npmjs.com/package/react-svg-tooltip)

A React component to create tooltips for SVG elements.

## Example Usage

```jsx
import * as React from 'react';
import { Tooltip } from 'react-svg-tooltip';

const App = () => {

    const circleRef = React.createRef<SVGCircleElement>();

    return (
        <div className='App'>
            <svg viewBox='0 0 100 100'>
                <circle ref={circleRef} cx={50} cy={50} r={10} fill='steelblue'/>
                <Tooltip for={circleRef}>
                    <rect x={2} y={2} width={10} height={5} rx={.5} ry={.5} fill='black'/>
                    <text x={5} y={5} fontSize={2} fill='white'>Yay!</text>
                </Tooltip>
            </svg>
        </div>
    );
};

export default App;
```

![Example Usage](screenshot.png)

## Acknowledgements

Based on [typescript-library-starter-lite](https://github.com/tonysneed/typescript-library-starter-lite.git).

## License

Licensed under [MIT License](LICENSE).

&copy; Rahel Lüthy 2018
