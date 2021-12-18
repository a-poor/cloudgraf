import React, { useState } from 'react';
import './App.css';

import { Button, Navbar, Alignment, Collapse, Pre } from "@blueprintjs/core";

import CytoscapeComponent from 'react-cytoscapejs';


const nodes = [
  { 
    data: { 
      id: 'one', 
      label: 'Node 1' 
    }, 
    // position: { 
      // x: 0, 
      // y: 0 
    // }, 
  },
  { 
    data: { 
      id: 'two', 
      label: 'Node 2',
    }, 
    // position: { 
      // x: 100, 
      // y: 0 
    // }, 
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

// const elements = [
//   { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
//   { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
//   { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
// ];


function AppNav() {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Blueprint</Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp3-minimal" icon="home" text="Home" />
        <Button className="bp3-minimal" icon="document" text="Files" />
      </Navbar.Group>
    </Navbar>
  )
}


function AppGraph() {
  const style = { 
    width: '600px', 
    height: '600px',
    curveStyle: "unbundled-bezier",
  }
  return (
    <CytoscapeComponent 
      elements={CytoscapeComponent.normalizeElements(elements)} 
      style={ style }
      layout={{
        // name: "circle",
        // name: "random",
        // name: "grid",
        name: "breadthfirst",
      }}
      cy={cy => {
        cy.on('tap', 'node', e => {
          console.log(`Clicked node ${e.target.id()} :: ${e.target.data().label}`);
        })

        cy.on('tap', 'edge', e => {
          console.log(`Clicked edge ${e.target.id()} :: ${e.target.data().label}`);
        })
      }}
    />
  )
}


function AppSidebar({ isOpen = true }) {
  return (
    <div id="app-sidebar" style={{ 
      flex: 1, 
      border: "2px solid yellow", 
      marginRight: "20px" 
    }}>
      <Collapse isOpen={isOpen}>
        <Pre>Hello, world!</Pre>
      </Collapse>
    </div>
  )
}


function AppBody() {
  return (
    <div id="app-body" style={{ flex: 1, border: "2px solid yellow" }}>
      <AppGraph />
    </div>
  )
}


function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="App">
      <AppNav />
      <div style={{ width: "98%", margin: "auto" }}>
        <Button onClick={() => setIsOpen(!isOpen)}>Toggle Sidebar</Button>
        <div style={{ display: 'flex' }}>
          {
            isOpen ? <AppSidebar /> : <></>
          }
          <AppBody />
        </div>
      </div>
    </div>
  );
}

export default App;
