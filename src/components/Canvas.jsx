import { useState, useRef, useCallback } from "react";

export const Canvas = ({ boxes, setBoxes, selectedBoxId, setSelectedBoxId }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState(null);
  const canvasRef = useRef(null);

  const handleMouseDown = useCallback(
    (e) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setIsDrawing(true);
      setStartPos({ x, y });
      setSelectedBoxId(null);
    },
    [setSelectedBoxId]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDrawing || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const width = Math.abs(currentX - startPos.x);
      const height = Math.abs(currentY - startPos.y);
      const left = Math.min(startPos.x, currentX);
      const top = Math.min(startPos.y, currentY);

      const newBox = {
        id: `box-${Date.now()}`,
        left,
        top,
        width,
        height,
        backgroundColor: "#3b82f6",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#1e40af",
        opacity: 1,
      };

      setCurrentBox(newBox);
    },
    [isDrawing, startPos]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawing || !currentBox) return;

    if (currentBox.width > 10 && currentBox.height > 10) {
      setBoxes([...boxes, currentBox]);
      setSelectedBoxId(currentBox.id);
    }

    setIsDrawing(false);
    setCurrentBox(null);
  }, [isDrawing, currentBox, boxes, setBoxes, setSelectedBoxId]);

  const handleBoxClick = useCallback(
    (boxId, e) => {
      e.stopPropagation();
      setSelectedBoxId(boxId);
    },
    [setSelectedBoxId]
  );

  return (
    <div className="flex-1 bg-canvas-bg relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--canvas-grid)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--canvas-grid)) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Rendered boxes */}
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`absolute cursor-pointer transition-all duration-200 ${
              selectedBoxId === box.id ? "ring-2 ring-primary" : ""
            }`}
            style={{
              left: box.left,
              top: box.top,
              width: box.width,
              height: box.height,
              backgroundColor: box.backgroundColor,
              borderRadius: `${box.borderRadius}px`,
              border: `${box.borderWidth}px solid ${box.borderColor}`,
              opacity: box.opacity,
            }}
            onClick={(e) => handleBoxClick(box.id, e)}
          />
        ))}

        {/* Current drawing box */}
        {currentBox && (
          <div
            className="absolute pointer-events-none opacity-70"
            style={{
              left: currentBox.left,
              top: currentBox.top,
              width: currentBox.width,
              height: currentBox.height,
              backgroundColor: currentBox.backgroundColor,
              borderRadius: `${currentBox.borderRadius}px`,
              border: `${currentBox.borderWidth}px solid ${currentBox.borderColor}`,
            }}
          />
        )}
      </div>
    </div>
  );
};
