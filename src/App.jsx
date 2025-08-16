import { useState } from 'react';
import { Box } from '../src/types/Box';
import { Canvas } from '../src/components/Canvas';
import PropertiesPanel from '../src/components/PropertiesPanel';
import { CodePanel } from '../src/components/CodePanel';
import { Toolbar } from '../src/components/Toolbar';
import './index.css';

function App() {
const [boxes, setBoxes] = useState([]);
  const [selectedBoxId, setSelectedBoxId] = useState(null);

  const selectedBox = boxes.find(box => box.id === selectedBoxId) || null;

  const updateBox = (updatedBox) => {
    setBoxes(boxes.map(box => (box.id === updatedBox.id ? updatedBox : box)));
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Toolbar */}
      <Toolbar 
        boxes={boxes}
        setBoxes={setBoxes}
        selectedBoxId={selectedBoxId}
        setSelectedBoxId={setSelectedBoxId}
      />
      
      {/* Main content */}
      <div className="flex-1 flex">
        {/* Properties Panel */}
        <div className="p-4">
          <PropertiesPanel 
            selectedBox={selectedBox}
            onUpdateBox={updateBox}
          />
        </div>
        
        {/* Canvas */}
        <Canvas
          boxes={boxes}
          setBoxes={setBoxes}
          selectedBoxId={selectedBoxId}
          setSelectedBoxId={setSelectedBoxId}
        />
        
        {/* Code Panel */}
        <div className="p-4">
          <CodePanel boxes={boxes} />
        </div>
      </div>
    </div>
  );
};

export default App;