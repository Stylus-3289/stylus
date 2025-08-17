import React from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { elementTypes } from '../types/Box';

// Font family options
const fontFamilies = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "'Helvetica Neue', sans-serif", label: "Helvetica" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "'Courier New', monospace", label: "Courier New" },
  { value: "'Brush Script MT', cursive", label: "Brush Script" },
  { value: "'Garamond', serif", label: "Garamond" },
  { value: "'Verdana', sans-serif", label: "Verdana" },
  { value: "'Trebuchet MS', sans-serif", label: "Trebuchet" },
  { value: "'Palatino Linotype', serif", label: "Palatino" },
];

// Font weight options
const fontWeights = [
  { value: "100", label: "Thin" },
  { value: "200", label: "Extra Light" },
  { value: "300", label: "Light" },
  { value: "400", label: "Normal" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semi Bold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extra Bold" },
  { value: "900", label: "Black" },
];

// Text align options
const textAligns = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
  { value: "justify", label: "Justify" },
];

// Text transform options
const textTransforms = [
  { value: "none", label: "None" },
  { value: "capitalize", label: "Capitalize" },
  { value: "uppercase", label: "Uppercase" },
  { value: "lowercase", label: "Lowercase" },
];

// Border style options
const borderStyles = [
  { value: "none", label: "None" },
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
  { value: "groove", label: "Groove" },
  { value: "ridge", label: "Ridge" },
  { value: "inset", label: "Inset" },
  { value: "outset", label: "Outset" },
];

// Display options
const displayOptions = [
  { value: "block", label: "Block" },
  { value: "inline", label: "Inline" },
  { value: "inline-block", label: "Inline Block" },
  { value: "flex", label: "Flex" },
  { value: "inline-flex", label: "Inline Flex" },
  { value: "grid", label: "Grid" },
  { value: "none", label: "None" },
];

// Flex direction options
const flexDirections = [
  { value: "row", label: "Row" },
  { value: "row-reverse", label: "Row Reverse" },
  { value: "column", label: "Column" },
  { value: "column-reverse", label: "Column Reverse" },
];

// Justify content options
const justifyContentOptions = [
  { value: "flex-start", label: "Flex Start" },
  { value: "flex-end", label: "Flex End" },
  { value: "center", label: "Center" },
  { value: "space-between", label: "Space Between" },
  { value: "space-around", label: "Space Around" },
  { value: "space-evenly", label: "Space Evenly" },
];

// Align items options
const alignItemsOptions = [
  { value: "flex-start", label: "Flex Start" },
  { value: "flex-end", label: "Flex End" },
  { value: "center", label: "Center" },
  { value: "baseline", label: "Baseline" },
  { value: "stretch", label: "Stretch" },
];

// Object fit options (for images)
const objectFitOptions = [
  { value: "fill", label: "Fill" },
  { value: "contain", label: "Contain" },
  { value: "cover", label: "Cover" },
  { value: "none", label: "None" },
  { value: "scale-down", label: "Scale Down" },
];

const PropertiesPanel = ({ selectedBox, onUpdateBox }) => {
  if (!selectedBox) {
    return (
      <Card className="w-80 p-6 bg-editor-bg border-editor-border">
        <div className="text-center text-muted-foreground">
          <div className="mb-2">🎨</div>
          <p>Select an element to edit properties</p>
        </div>
      </Card>
    );
  }

  const handleChange = (property, value) => {
    onUpdateBox({ ...selectedBox, [property]: value });
  };

  const renderCommonProperties = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Layout</h4>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="display" className="text-xs text-muted-foreground">Display</Label>
          <select
            id="display"
            value={selectedBox.display}
            onChange={(e) => handleChange("display", e.target.value)}
            className="w-full bg-input border-muted rounded-md p-2 text-sm"
          >
            {displayOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="zIndex" className="text-xs text-muted-foreground">Z-Index</Label>
          <Input
            id="zIndex"
            type="number"
            value={selectedBox.zIndex}
            onChange={(e) => handleChange("zIndex", parseInt(e.target.value) || 0)}
            className="bg-input border-muted"
          />
        </div>
      </div>

      {selectedBox.display === 'flex' || selectedBox.display === 'inline-flex' ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="flexDirection" className="text-xs text-muted-foreground">Flex Direction</Label>
              <select
                id="flexDirection"
                value={selectedBox.flexDirection}
                onChange={(e) => handleChange("flexDirection", e.target.value)}
                className="w-full bg-input border-muted rounded-md p-2 text-sm"
              >
                {flexDirections.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="justifyContent" className="text-xs text-muted-foreground">Justify Content</Label>
              <select
                id="justifyContent"
                value={selectedBox.justifyContent}
                onChange={(e) => handleChange("justifyContent", e.target.value)}
                className="w-full bg-input border-muted rounded-md p-2 text-sm"
              >
                {justifyContentOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="alignItems" className="text-xs text-muted-foreground">Align Items</Label>
              <select
                id="alignItems"
                value={selectedBox.alignItems}
                onChange={(e) => handleChange("alignItems", e.target.value)}
                className="w-full bg-input border-muted rounded-md p-2 text-sm"
              >
                {alignItemsOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="gap" className="text-xs text-muted-foreground">Gap</Label>
              <Input
                id="gap"
                type="number"
                value={selectedBox.gap}
                onChange={(e) => handleChange("gap", parseInt(e.target.value) || 0)}
                className="bg-input border-muted"
              />
            </div>
          </div>
        </>
      ) : null}

      <h4 className="text-sm font-medium text-foreground">Spacing</h4>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="padding" className="text-xs text-muted-foreground">Padding</Label>
          <Input
            id="padding"
            type="number"
            value={selectedBox.padding}
            onChange={(e) => handleChange("padding", parseInt(e.target.value) || 0)}
            className="bg-input border-muted"
          />
        </div>
        <div>
          <Label htmlFor="margin" className="text-xs text-muted-foreground">Margin</Label>
          <Input
            id="margin"
            type="number"
            value={selectedBox.margin}
            onChange={(e) => handleChange("margin", parseInt(e.target.value) || 0)}
            className="bg-input border-muted"
          />
        </div>
      </div>
    </div>
  );

  const renderBackgroundProperties = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Background</h4>
      <div>
        <Label htmlFor="backgroundColor" className="text-xs text-muted-foreground">Color</Label>
        <div className="flex gap-2 items-center">
          <Input
            id="backgroundColor"
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
      {/* <div>
        <Label htmlFor="backgroundImage" className="text-xs text-muted-foreground">Image URL</Label>
        <Input
          id="backgroundImage"
          type="text"
          value={selectedBox.backgroundImage}
          onChange={(e) => handleChange("backgroundImage", e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="bg-input border-muted"
        />
      </div> */}
      {selectedBox.backgroundImage && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="backgroundSize" className="text-xs text-muted-foreground">Size</Label>
            <select
              id="backgroundSize"
              value={selectedBox.backgroundSize}
              onChange={(e) => handleChange("backgroundSize", e.target.value)}
              className="w-full bg-input border-muted rounded-md p-2 text-sm"
            >
              <option value="auto">Auto</option>
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
            </select>
          </div>
          <div>
            <Label htmlFor="backgroundPosition" className="text-xs text-muted-foreground">Position</Label>
            <select
              id="backgroundPosition"
              value={selectedBox.backgroundPosition}
              onChange={(e) => handleChange("backgroundPosition", e.target.value)}
              className="w-full bg-input border-muted rounded-md p-2 text-sm"
            >
              <option value="center">Center</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );

  const renderBorderProperties = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Border</h4>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="borderWidth" className="text-xs text-muted-foreground">Width</Label>
          <Input
            id="borderWidth"
            type="number"
            value={selectedBox.borderWidth}
            onChange={(e) => handleChange("borderWidth", parseInt(e.target.value) || 0)}
            className="bg-input border-muted"
          />
        </div>
        <div>
          <Label htmlFor="borderStyle" className="text-xs text-muted-foreground">Style</Label>
          <select
            id="borderStyle"
            value={selectedBox.borderStyle}
            onChange={(e) => handleChange("borderStyle", e.target.value)}
            className="w-full bg-input border-muted rounded-md p-2 text-sm"
          >
            {borderStyles.map(style => (
              <option key={style.value} value={style.value}>{style.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="borderColor" className="text-xs text-muted-foreground">Color</Label>
        <div className="flex gap-2 items-center">
          <Input
            id="borderColor"
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
        <Label htmlFor="borderRadius" className="text-xs text-muted-foreground">Radius</Label>
        <Input
          id="borderRadius"
          type="number"
          value={selectedBox.borderRadius}
          onChange={(e) => handleChange("borderRadius", parseInt(e.target.value) || 0)}
          className="bg-input border-muted"
        />
      </div>
    </div>
  );

  const renderShadowProperties = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Shadow</h4>
      <div>
        <Label htmlFor="boxShadow" className="text-xs text-muted-foreground">Box Shadow</Label>
        <Input
          id="boxShadow"
          type="text"
          value={selectedBox.boxShadow}
          onChange={(e) => handleChange("boxShadow", e.target.value)}
          placeholder="e.g., 2px 2px 5px rgba(0,0,0,0.3)"
          className="bg-input border-muted"
        />
      </div>
    </div>
  );

  const renderTextProperties = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Text</h4>
      <div>
        <Label htmlFor="text" className="text-xs text-muted-foreground">Content</Label>
        {selectedBox.type === 'textarea' ? (
          <textarea
            id="text"
            value={selectedBox.text}
            onChange={(e) => handleChange("text", e.target.value)}
            className="w-full bg-input border-muted rounded-md p-2 text-sm min-h-[80px]"
          />
        ) : (
          <Input
            id="text"
            type="text"
            value={selectedBox.text}
            onChange={(e) => handleChange("text", e.target.value)}
            className="bg-input border-muted"
          />
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="fontFamily" className="text-xs text-muted-foreground">Font Family</Label>
          <select
            id="fontFamily"
            value={selectedBox.fontFamily}
            onChange={(e) => handleChange("fontFamily", e.target.value)}
            className="w-full bg-input border-muted rounded-md p-2 text-sm"
          >
            {fontFamilies.map(font => (
              <option key={font.value} value={font.value}>{font.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="fontSize" className="text-xs text-muted-foreground">Font Size</Label>
          <Input
            id="fontSize"
            type="number"
            value={selectedBox.fontSize}
            onChange={(e) => handleChange("fontSize", parseInt(e.target.value) || 16)}
            className="bg-input border-muted"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="fontWeight" className="text-xs text-muted-foreground">Font Weight</Label>
          <select
            id="fontWeight"
            value={selectedBox.fontWeight}
            onChange={(e) => handleChange("fontWeight", e.target.value)}
            className="w-full bg-input border-muted rounded-md p-2 text-sm"
          >
            {fontWeights.map(weight => (
              <option key={weight.value} value={weight.value}>{weight.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="fontStyle" className="text-xs text-muted-foreground">Font Style</Label>
          <select
            id="fontStyle"
            value={selectedBox.fontStyle}
            onChange={(e) => handleChange("fontStyle", e.target.value)}
            className="w-full bg-input border-muted rounded-md p-2 text-sm"
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="oblique">Oblique</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="textAlign" className="text-xs text-muted-foreground">Text Align</Label>
          <select
            id="textAlign"
            value={selectedBox.textAlign}
            onChange={(e) => handleChange("textAlign", e.target.value)}
            className="w-full bg-input border-muted rounded-md p-2 text-sm"
          >
            {textAligns.map(align => (
              <option key={align.value} value={align.value}>{align.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="textTransform" className="text-xs text-muted-foreground">Text Transform</Label>
          <select
            id="textTransform"
            value={selectedBox.textTransform}
            onChange={(e) => handleChange("textTransform", e.target.value)}
            className="w-full bg-input border-muted rounded-md p-2 text-sm"
          >
            {textTransforms.map(transform => (
              <option key={transform.value} value={transform.value}>{transform.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="lineHeight" className="text-xs text-muted-foreground">Line Height</Label>
          <Input
            id="lineHeight"
            type="number"
            step="0.1"
            value={selectedBox.lineHeight}
            onChange={(e) => handleChange("lineHeight", parseFloat(e.target.value) || 1.5)}
            className="bg-input border-muted"
          />
        </div>
        <div>
          <Label htmlFor="letterSpacing" className="text-xs text-muted-foreground">Letter Spacing</Label>
          <Input
            id="letterSpacing"
            type="number"
            value={selectedBox.letterSpacing}
            onChange={(e) => handleChange("letterSpacing", parseInt(e.target.value) || 0)}
            className="bg-input border-muted"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="color" className="text-xs text-muted-foreground">Color</Label>
        <div className="flex gap-2 items-center">
          <Input
            id="color"
            type="color"
            value={selectedBox.color}
            onChange={(e) => handleChange("color", e.target.value)}
            className="w-12 h-8 p-1 bg-input border-muted"
          />
          <Input
            type="text"
            value={selectedBox.color}
            onChange={(e) => handleChange("color", e.target.value)}
            className="flex-1 bg-input border-muted"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="textDecoration" className="text-xs text-muted-foreground">Text Decoration</Label>
        <select
          id="textDecoration"
          value={selectedBox.textDecoration}
          onChange={(e) => handleChange("textDecoration", e.target.value)}
          className="w-full bg-input border-muted rounded-md p-2 text-sm"
        >
          <option value="none">None</option>
          <option value="underline">Underline</option>
          <option value="overline">Overline</option>
          <option value="line-through">Line Through</option>
        </select>
      </div>
    </div>
  );

  const renderImageProperties = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Image</h4>
      <div>
        <Label htmlFor="imageUrl" className="text-xs text-muted-foreground">Image URL</Label>
        <Input
          id="imageUrl"
          type="text"
          value={selectedBox.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="bg-input border-muted"
        />
      </div>
      {selectedBox.imageUrl && (
        <div>
          <Label htmlFor="objectFit" className="text-xs text-muted-foreground">Object Fit</Label>
          <select
            id="objectFit"
            value={selectedBox.objectFit}
            onChange={(e) => handleChange("objectFit", e.target.value)}
            className="w-full bg-input border-muted rounded-md p-2 text-sm"
          >
            {objectFitOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );

  const renderInputProperties = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Input</h4>
      <div>
        <Label htmlFor="inputType" className="text-xs text-muted-foreground">Type</Label>
        <select
          id="inputType"
          value={selectedBox.inputType}
          onChange={(e) => handleChange("inputType", e.target.value)}
          className="w-full bg-input border-muted rounded-md p-2 text-sm"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
          <option value="color">Color</option>
          <option value="range">Range</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
        </select>
      </div>
      <div>
        <Label htmlFor="placeholder" className="text-xs text-muted-foreground">Placeholder</Label>
        <Input
          id="placeholder"
          type="text"
          value={selectedBox.placeholder}
          onChange={(e) => handleChange("placeholder", e.target.value)}
          className="bg-input border-muted"
        />
      </div>
    </div>
  );

  return (
    <Card className="w-80 p-6 bg-editor-bg border-editor-border space-y-6 overflow-auto">
      <div className="border-b border-editor-border pb-4">
        <h3 className="font-semibold text-foreground mb-2">Element Properties</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">ID: {selectedBox.id}</p>
          <div>
            <Label htmlFor="element-type" className="text-xs text-muted-foreground">Type</Label>
            <select
              id="element-type"
              value={selectedBox.type}
              onChange={(e) => {
                const newType = e.target.value;
                const updatedBox = { ...selectedBox, type: newType };
                // Set default values when changing type
                if (newType === "button") {
                  updatedBox.buttonText = "Button";
                  updatedBox.backgroundColor = "#3b82f6";
                  updatedBox.color = "#ffffff";
                } else if (newType === "text") {
                  updatedBox.text = "Text";
                  updatedBox.backgroundColor = "transparent";
                  updatedBox.color = "#000000";
                } else if (newType === "input") {
                  updatedBox.backgroundColor = "#ffffff";
                  updatedBox.borderColor = "#cccccc";
                  updatedBox.color = "#000000";
                } else if (newType === "textarea") {
                  updatedBox.text = "";
                  updatedBox.backgroundColor = "#ffffff";
                  updatedBox.color = "#000000";
                }
                onUpdateBox(updatedBox);
              }}
              className="w-full bg-input border-muted rounded-md p-1 text-xs"
            >
              {elementTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Common properties */}
      {renderCommonProperties()}
      {renderBackgroundProperties()}
      {renderBorderProperties()}
      {renderShadowProperties()}

      {/* Type-specific properties */}
      {(selectedBox.type === "text" || selectedBox.type === "button" || selectedBox.type === "textarea") && renderTextProperties()}
      {selectedBox.type === "button" && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Button</h4>
          <div>
            <Label htmlFor="buttonText" className="text-xs text-muted-foreground">Button Text</Label>
            <Input
              id="buttonText"
              type="text"
              value={selectedBox.buttonText}
              onChange={(e) => handleChange("buttonText", e.target.value)}
              className="bg-input border-muted"
            />
          </div>
          <div>
            <Label htmlFor="cursor" className="text-xs text-muted-foreground">Cursor</Label>
            <select
              id="cursor"
              value={selectedBox.cursor}
              onChange={(e) => handleChange("cursor", e.target.value)}
              className="w-full bg-input border-muted rounded-md p-2 text-sm"
            >
              <option value="default">Default</option>
              <option value="pointer">Pointer</option>
              <option value="text">Text</option>
              <option value="move">Move</option>
              <option value="not-allowed">Not Allowed</option>
            </select>
          </div>
        </div>
      )}
      {selectedBox.type === "image" && renderImageProperties()}
      {(selectedBox.type === "input" || selectedBox.type === "textarea") && renderInputProperties()}

      {/* Advanced properties */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Advanced</h4>
        <div>
          <Label htmlFor="opacity" className="text-xs text-muted-foreground">Opacity</Label>
          <Slider
            value={[selectedBox.opacity]}
            onValueChange={([value]) => handleChange("opacity", value)}
            max={1}
            min={0}
            step={0.1}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="overflow" className="text-xs text-muted-foreground">Overflow</Label>
          <select
            id="overflow"
            value={selectedBox.overflow}
            onChange={(e) => handleChange("overflow", e.target.value)}
            className="w-full bg-input border-muted rounded-md p-2 text-sm"
          >
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
            <option value="scroll">Scroll</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div>
          <Label htmlFor="transform" className="text-xs text-muted-foreground">Transform</Label>
          <Input
            id="transform"
            type="text"
            value={selectedBox.transform}
            onChange={(e) => handleChange("transform", e.target.value)}
            placeholder="e.g., rotate(45deg) scale(1.2)"
            className="bg-input border-muted"
          />
        </div>
        <div>
          <Label htmlFor="transition" className="text-xs text-muted-foreground">Transition</Label>
          <Input
            id="transition"
            type="text"
            value={selectedBox.transition}
            onChange={(e) => handleChange("transition", e.target.value)}
            placeholder="e.g., all 0.3s ease"
            className="bg-input border-muted"
          />
        </div>
      </div>
    </Card>
  );
};

export default PropertiesPanel;