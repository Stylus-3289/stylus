import { Button } from './ui/button';
import { Card } from './ui/card';
import { Trash2, Square } from 'lucide-react';
import { elementTypes } from '../types/Box';

export const Toolbar = ({ 
  boxes, 
  setBoxes, 
  selectedBoxId, 
  setSelectedBoxId,
  selectedElementType,
  setSelectedElementType 
}) => {
  const clearCanvas = () => {
    setBoxes([]);
    setSelectedBoxId(null);
  };

  const deleteSelected = () => {
    if (selectedBoxId) {
      setBoxes(boxes.filter((box) => box.id !== selectedBoxId));
      setSelectedBoxId(null);
    }
  };

  return (
    <Card className="bg-editor-bg border-editor-border p-4">
      <div className="flex items-center gap-3">
        <div className="flex items-start gap-3">
          <Square className="w-5 h-5 mt-1.5 text-primary flex-shrink-0" />
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-sm">
            <span className="inline-block">
              <span className="flex items-center gap-2">
                <span className="block text-4xl leading-none">Stylus</span>
              </span>
              <span className="text-sm font-medium tracking-wider text-muted-foreground block mt-1">
                Think it • Drag it • Style it
              </span>
            </span>
          </h1>
        </div>

        <div className="flex-1" />

        {/* Element type selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedElementType}
            onChange={(e) => setSelectedElementType(e.target.value)}
            className="bg-input border-muted rounded-md p-1 text-xs"
          >
            {elementTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={deleteSelected}
            disabled={!selectedBoxId}
            className="text-xs"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete Selected
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={clearCanvas}
            disabled={boxes.length === 0}
            className="text-xs"
          >
            Clear All
          </Button>

          <div className="text-xs text-muted-foreground">
            {boxes.length} element{boxes.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </Card>
  );
};