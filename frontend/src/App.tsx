import React, { useState } from 'react';
import './App.css';

import { Button, Navbar, Alignment, Collapse, Pre } from "@blueprintjs/core";

import CytoscapeComponent from 'react-cytoscapejs';

import Split from 'react-split'

import ReactJson from 'react-json-view-ts'

import useWindowDimensions from './useWindowDimensions';


const nodes = [
  { 
    data: { 
      id: 'one', 
      label: 'Node 1',
      name: 'bar',
      isCool: false,
      faveColors: ["red", "green", "blue"],
    },
  },
  { 
    data: { 
      id: 'two', 
      label: 'Node 2',
      name: 'foo',
      isCool: true,
      faveColors: ["red", "purple"],
    }, 
  },
];
const edges = [
  { 
    data: { 
      id: "one-to-two",
      source: "one", 
      target: "two", 
      label: "Edge from Node1 to Node2", 
      isCool: false,
    }
  },
  { 
    data: { 
      id: "two-to-one",
      source: "two", 
      target: "one", 
      label: "Edge from Node2 to Node1", 
      isCool: true,
    }
  },
];
const elements = [...nodes, ...edges];



function AppNav({ ...props }) {
  return (
    <Navbar { ...props }>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Blueprint</Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp3-minimal" icon="home" text="Home" />
        <Button className="bp3-minimal" icon="document" text="Files" />
      </Navbar.Group>
    </Navbar>
  )
}


function AppGraph({ width = 600, height = 600, setActiveElement = ()=>{} }: { width?: number, height?: number, setActiveElement?: (e: any)=>void }) {
  return (
    <div
      style={{
        height: height,
        width: "100%",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <CytoscapeComponent 
        elements={CytoscapeComponent.normalizeElements(elements)} 
        style={{
          width: `${width}px`,
          height: height,
          overflow: "hidden",
        }}
        layout={{
          // name: "circle",
          // name: "random",
          // name: "grid",
          name: "breadthfirst",
        }}
        cy={cy => {
          const selectedGroup = cy.collection();

          cy.on('select', e => {
            console.log(`Clicked node ${e.target.id()} :: ${e.target.data().label}`);

            const selectedNode = e.target;
            selectedGroup.union(selectedNode);

            setActiveElement(e.target.data());
          })

          cy.on('unselect',  e => {
            setActiveElement({});
          })
        }}
      />
    </div>
  )
}


function AppSidebar({ width = 600, height = 600, activeElement = {}, ...props }: { width?: number, height?: number, activeElement?: object }) {
  console.log(activeElement);
  const data = activeElement !== null ? activeElement : {};
  return (
    <div 
      style={{
        height: height,
        width: "100%",
        overflow: "hidden",
      }}
      {...props}
    >
      Hello, world!
      <ReactJson 
        src={data} 
        name={null}
        collapsed={false}
        indentWidth={2}
        onSelect={(s) => { console.log(s) }}
        onAdd={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  )
}


function App() {
  // Capture window dimensions
  const { width, height } = useWindowDimensions();

  // Create hooks for setting the slider pannel widths
  const sliderHandleWidth = 10;
  const defaultWidth = (width - sliderHandleWidth) / 2;

  const [leftWidth, _setLeftWidth] = useState(defaultWidth);
  const setLeftWidth = (pct: number) => _setLeftWidth((width - sliderHandleWidth) * pct / 100);

  const [rightWidth, _setRightWidth] = useState(defaultWidth);
  const setRightWidth = (pct: number) => _setRightWidth((width - sliderHandleWidth) * pct / 100);

  // Create hooks for setting the graph active node
  const [activeElement, setActiveElement] = useState({});

  return (
    <div className="App">
      <AppNav style={{ height: "50px" }}/>
      <div 
        id="main" 
        style={{ 
          width: width, 
          height: `${height - 50}px`,
          overflow: "hidden",
          margin: "auto",
        }}
      >
        <Split
          className="split"
          style={{
            height: `${height - 50}px`,
          }}
          onDragEnd={sizes => {
            const [left, right] = sizes;
            console.log(`Drag end! Left: ${left}, right: ${right}`);
            try {
              setLeftWidth(left);
              setRightWidth(right);
            } catch (e) {
              console.error(e);
            }
          }}
          minSize={0}
        >
          <AppGraph width={leftWidth} height={height} setActiveElement={setActiveElement}/>
          <AppSidebar width={rightWidth} height={height} activeElement={activeElement}/>
        </Split>
      </div>
    </div>
  );
}

export default App;
