import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

const PropertiesPanel = ({ selectedBox, onUpdateBox }) => {
  if (!selectedBox) {
    return (
      <Card className="w-80 p-6 bg-editor-bg border-editor-border">
        <div className="text-center text-muted-foreground">
          <div className="mb-2">🎨</div>
          <p>Select a box to edit properties</p>
        </div>
      </Card>
    );
  }

  const handleChange = (property, value) => {
    onUpdateBox({ ...selectedBox, [property]: value });
  };

  return (
    <Card className="w-80 p-6 bg-editor-bg border-editor-border space-y-6">
      <div className="border-b border-editor-border pb-4">
        <h3 className="font-semibold text-foreground mb-2">Box Properties</h3>
        <p className="text-sm text-muted-foreground">ID: {selectedBox.id}</p>
      </div>

      {/* Dimensions */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Dimensions</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="width" className="text-xs text-muted-foreground">Width</Label>
            <Input
              id="width"
              type="number"
              value={selectedBox.width}
              onChange={(e) => handleChange("width", parseInt(e.target.value) || 0)}
              className="bg-input border-muted"
            />
          </div>
          <div>
            <Label htmlFor="height" className="text-xs text-muted-foreground">Height</Label>
            <Input
              id="height"
              type="number"
              value={selectedBox.height}
              onChange={(e) => handleChange("height", parseInt(e.target.value) || 0)}
              className="bg-input border-muted"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="left" className="text-xs text-muted-foreground">Left</Label>
            <Input
              id="left"
              type="number"
              value={selectedBox.left}
              onChange={(e) => handleChange("left", parseInt(e.target.value) || 0)}
              className="bg-input border-muted"
            />
          </div>
          <div>
            <Label htmlFor="top" className="text-xs text-muted-foreground">Top</Label>
            <Input
              id="top"
              type="number"
              value={selectedBox.top}
              onChange={(e) => handleChange("top", parseInt(e.target.value) || 0)}
              className="bg-input border-muted"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Appearance</h4>
        <div>
          <Label htmlFor="bg-color" className="text-xs text-muted-foreground">Background Color</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="bg-color"
              type="color"
              value={selectedBox.backgroundColor}
              onChange={(e) => handleChange("backgroundColor", e.target.value)}
              className="w-12 h-8 p-1 bg-input border-muted"
            />
            <Input
              type="text"
              value={selectedBox.backgroundColor}
              onChange={(e) => handleChange("backgroundColor", e.target.value)}
              className="flex-1 bg-input border-muted"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="border-color" className="text-xs text-muted-foreground">Border Color</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="border-color"
              type="color"
              value={selectedBox.borderColor}
              onChange={(e) => handleChange("borderColor", e.target.value)}
              className="w-12 h-8 p-1 bg-input border-muted"
            />
            <Input
              type="text"
              value={selectedBox.borderColor}
              onChange={(e) => handleChange("borderColor", e.target.value)}
              className="flex-1 bg-input border-muted"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="border-width" className="text-xs text-muted-foreground">Border Width</Label>
          <Input
            id="border-width"
            type="number"
            value={selectedBox.borderWidth}
            onChange={(e) => handleChange("borderWidth", parseInt(e.target.value) || 0)}
            className="bg-input border-muted"
          />
        </div>
        <div>
          <Label htmlFor="border-radius" className="text-xs text-muted-foreground">Border Radius</Label>
          <Input
            id="border-radius"
            type="number"
            value={selectedBox.borderRadius}
            onChange={(e) => handleChange("borderRadius", parseInt(e.target.value) || 0)}
            className="bg-input border-muted"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Opacity: {selectedBox.opacity}</Label>
          <Slider
            value={[selectedBox.opacity]}
            onValueChange={([value]) => handleChange("opacity", value)}
            max={1}
            min={0}
            step={0.1}
            className="mt-2"
          />
        </div>
      </div>
    </Card>
  );
};

export default PropertiesPanel;
