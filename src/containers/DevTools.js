import React from 'react';

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools';


// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

//import SliderMonitor from 'redux-slider-monitor';
//import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor'


// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
    // Monitors are individually adjustable with props.
    // Consult their repositories to learn about those props.
    // Here, we put LogMonitor inside a DockMonitor.

    // <SliderMonitor keyboardEnabled />

    // <FilterableLogMonitor/>

    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'
                 defaultPosition='right'
                 defaultSize={ 0.35 }
                 defaultIsVisible={ false }>
        <LogMonitor theme='tomorrow'/>
    </DockMonitor>
);

export default DevTools;