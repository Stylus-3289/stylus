import { useState, useRef, useCallback, useEffect } from "react";
import { elementTypes } from "../types/Box";

export const Canvas = ({
  boxes,
  setBoxes,
  selectedBoxId,
  setSelectedBoxId,
  selectedElementType,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState(null);
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const canvasRef = useRef(null);

  // Track Ctrl/Cmd key state
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) setCtrlPressed(true);
    };
    const handleKeyUp = () => setCtrlPressed(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      if (!canvasRef.current) return;
      e.preventDefault(); // Prevent text selection during interactions

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if we're clicking on an existing box or its handles
      const clickedBox = boxes.find(
        (box) =>
          x >= box.left &&
          x <= box.left + box.width &&
          y >= box.top &&
          y <= box.top + box.height
      );

      // Check rotation handle first (it's outside the main box area)
      if (clickedBox) {
        const rotationHandleY = clickedBox.top - 30;
        const rotationHandleSize = 12;
        
        if (
          x >= clickedBox.left + clickedBox.width / 2 - rotationHandleSize &&
          x <= clickedBox.left + clickedBox.width / 2 + rotationHandleSize &&
          y >= rotationHandleY - rotationHandleSize &&
          y <= rotationHandleY + rotationHandleSize
        ) {
          setIsRotating(true);
          setSelectedBoxId(clickedBox.id);
          setStartPos({ x, y });
          return;
        }
      }

      // Check resize handles
      if (clickedBox) {
        const handleSize = 8;
        const handles = [
          { position: "nw", x: clickedBox.left, y: clickedBox.top },
          { position: "ne", x: clickedBox.left + clickedBox.width, y: clickedBox.top },
          { position: "sw", x: clickedBox.left, y: clickedBox.top + clickedBox.height },
          { position: "se", x: clickedBox.left + clickedBox.width, y: clickedBox.top + clickedBox.height },
          { position: "n", x: clickedBox.left + clickedBox.width / 2, y: clickedBox.top },
          { position: "s", x: clickedBox.left + clickedBox.width / 2, y: clickedBox.top + clickedBox.height },
          { position: "w", x: clickedBox.left, y: clickedBox.top + clickedBox.height / 2 },
          { position: "e", x: clickedBox.left + clickedBox.width, y: clickedBox.top + clickedBox.height / 2 },
        ];

        const clickedHandle = handles.find(
          (handle) =>
            x >= handle.x - handleSize &&
            x <= handle.x + handleSize &&
            y >= handle.y - handleSize &&
            y <= handle.y + handleSize
        );

        if (clickedHandle) {
          setIsResizing(true);
          setResizeDirection(clickedHandle.position);
          setSelectedBoxId(clickedBox.id);
          setStartPos({ x, y });
          return;
        }
      }

      // For text elements, create immediately on click
      if (selectedElementType === "text" && !clickedBox) {
        const newBox = {
          id: `box-${Date.now()}`,
          type: "text",
          tagName: "p", // Use <p> for text elements
          left: x,
          top: y,
          width: 100,
          height: 30,
          backgroundColor: "transparent",
          text: "Double click to edit",
          fontSize: 16,
          color: "#000000",
          fontFamily: "Arial, sans-serif",
          fontWeight: "normal",
          textAlign: "left",
          borderRadius: 0,
          borderWidth: 0,
          borderColor: "#000000",
          opacity: 1,
          transform: "rotate(0deg)",
          transformOrigin: "center center",
          zIndex: boxes.length,
        };
        setBoxes([...boxes, newBox]);
        setSelectedBoxId(newBox.id);
        return;
      }

      // If Ctrl/Cmd is pressed or clicking empty space, start drawing
      if (ctrlPressed || !clickedBox) {
        setIsDrawing(true);
        setStartPos({ x, y });
        setSelectedBoxId(null);
      } else {
        // Start dragging
        setIsDragging(true);
        setSelectedBoxId(clickedBox.id);
        setDragOffset({
          x: x - clickedBox.left,
          y: y - clickedBox.top,
        });
      }
    },
    [setSelectedBoxId, boxes, setBoxes, selectedElementType, ctrlPressed]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (isRotating && selectedBoxId) {
        const box = boxes.find(b => b.id === selectedBoxId);
        if (box) {
          const centerX = box.left + box.width / 2;
          const centerY = box.top + box.height / 2;
          const angle = Math.atan2(currentY - centerY, currentX - centerX) * (180 / Math.PI) + 90;
          
          setBoxes(boxes.map(b => 
            b.id === selectedBoxId ? { ...b, transform: `rotate(${angle}deg)` } : b
          ));
        }
        return;
      }

      if (isResizing && selectedBoxId) {
        const box = boxes.find(b => b.id === selectedBoxId);
        if (box) {
          let newBox = { ...box };
          const deltaX = currentX - startPos.x;
          const deltaY = currentY - startPos.y;
          
          switch (resizeDirection) {
            case 'nw':
              newBox.left += deltaX;
              newBox.top += deltaY;
              newBox.width = Math.max(10, box.width - deltaX);
              newBox.height = Math.max(10, box.height - deltaY);
              break;
            case 'ne':
              newBox.top += deltaY;
              newBox.width = Math.max(10, box.width + deltaX);
              newBox.height = Math.max(10, box.height - deltaY);
              break;
            case 'sw':
              newBox.left += deltaX;
              newBox.width = Math.max(10, box.width - deltaX);
              newBox.height = Math.max(10, box.height + deltaY);
              break;
            case 'se':
              newBox.width = Math.max(10, box.width + deltaX);
              newBox.height = Math.max(10, box.height + deltaY);
              break;
            case 'n':
              newBox.top += deltaY;
              newBox.height = Math.max(10, box.height - deltaY);
              break;
            case 's':
              newBox.height = Math.max(10, box.height + deltaY);
              break;
            case 'w':
              newBox.left += deltaX;
              newBox.width = Math.max(10, box.width - deltaX);
              break;
            case 'e':
              newBox.width = Math.max(10, box.width + deltaX);
              break;
          }
          
          setBoxes(boxes.map(b => b.id === selectedBoxId ? newBox : b));
          setStartPos({ x: currentX, y: currentY });
        }
        return;
      }

      if (isDragging && selectedBoxId) {
        setBoxes(
          boxes.map((box) =>
            box.id === selectedBoxId
              ? {
                  ...box,
                  left: currentX - dragOffset.x,
                  top: currentY - dragOffset.y,
                }
              : box
          )
        );
        return;
      }

      if (isDrawing && !selectedBoxId && selectedElementType !== "text") {
        const width = Math.abs(currentX - startPos.x);
        const height = Math.abs(currentY - startPos.y);
        const left = Math.min(startPos.x, currentX);
        const top = Math.min(startPos.y, currentY);

        // Default tag names for different element types
        const tagNames = {
          button: "button",
          input: "input",
          textarea: "textarea",
          image: "img",
          video: "video",
          dropdown: "select",
          checkbox: "input",
          radio: "input",
          progress: "progress",
          div: "div",
          // Add more mappings as needed
        };

        const newBox = {
          id: `box-${Date.now()}`,
          type: selectedElementType || "div",
          tagName: tagNames[selectedElementType] || "div",
          left,
          top,
          width,
          height,
          backgroundColor:
            selectedElementType === "button"
              ? "#3b82f6"
              : selectedElementType === "input"
              ? "#ffffff"
              : "#3b82f6",
          borderRadius: selectedElementType === "button" ? 4 : 8,
          borderWidth: selectedElementType === "input" ? 1 : 1,
          borderColor: selectedElementType === "input" ? "#cccccc" : "#1e40af",
          opacity: 0.7,
          text: "",
          buttonText: selectedElementType === "button" ? "Button" : "",
          imageUrl:
            selectedElementType === "image"
              ? "https://via.placeholder.com/150"
              : "",
          inputType: selectedElementType === "input" ? "text" : "",
          placeholder: selectedElementType === "input" ? "Enter text..." : "",
          fontSize: 16,
          color: "#000000",
          fontFamily: "Arial, sans-serif",
          fontWeight: "normal",
          textAlign: "left",
          transform: "rotate(0deg)",
          transformOrigin: "center center",
          zIndex: boxes.length,
          // Form element specific defaults
          options: selectedElementType === "dropdown" ? [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" }
          ] : undefined,
          checked: selectedElementType === "checkbox" || selectedElementType === "radio" ? false : undefined,
          label: selectedElementType === "checkbox" || selectedElementType === "radio" ? "Label" : undefined,
          value: selectedElementType === "progress" ? 50 : undefined,
          max: selectedElementType === "progress" ? 100 : undefined,
        };

        setCurrentBox(newBox);
      }
    },
    [isDrawing, isDragging, isResizing, isRotating, startPos, selectedElementType, selectedBoxId, boxes, setBoxes, dragOffset, resizeDirection]
  );

  const handleMouseUp = useCallback(() => {
    if (isDrawing && currentBox) {
      if (currentBox.width > 10 && currentBox.height > 10) {
        const finalizedBox = { ...currentBox, opacity: 1 };
        setBoxes([...boxes, finalizedBox]);
        setSelectedBoxId(finalizedBox.id);
      }
    }

    setIsDrawing(false);
    setIsDragging(false);
    setIsResizing(false);
    setIsRotating(false);
    setCurrentBox(null);
    setResizeDirection(null);
  }, [isDrawing, currentBox, boxes, setBoxes, setSelectedBoxId]);

  const handleBoxClick = useCallback(
    (boxId, e) => {
      e.stopPropagation();
      setSelectedBoxId(boxId);
    },
    [setSelectedBoxId]
  );

  const handleDoubleClick = useCallback(
    (boxId, e) => {
      e.stopPropagation();
      const box = boxes.find((b) => b.id === boxId);
      if (!box) return;

      if (box.type === "text" || box.type === "button" || box.type === "p" || box.type === "h1" || box.type === "h2") {
        const newText = prompt("Edit text:", box.text || box.buttonText || "");
        if (newText !== null) {
          setBoxes(
            boxes.map((b) => 
              b.id === boxId 
                ? { ...b, ...(box.type === "button" ? { buttonText: newText } : { text: newText }) }
                : b
            )
          );
        }
      } 
      else if (box.type === "checkbox" || box.type === "radio") {
        const newLabel = prompt("Edit label:", box.label || "Label");
        if (newLabel !== null) {
          const newChecked = box.type === "checkbox" ? !box.checked : true;
          setBoxes(
            boxes.map((b) =>
              b.id === boxId 
                ? { ...b, label: newLabel, checked: newChecked } 
                : b
            )
          );
        }
      }
      else if (box.type === "dropdown") {
        const optionsString = box.options?.map(opt => `${opt.value}:${opt.label}`).join('\n') || '';
        const newOptions = prompt("Enter options (one per line, format 'value:label'):", optionsString);
        if (newOptions !== null) {
          const options = newOptions.split('\n')
            .filter(line => line.trim())
            .map(line => {
              const [value, label] = line.split(':');
              return { 
                value: value?.trim() || Math.random().toString(36).substring(2, 8), 
                label: label?.trim() || value?.trim() || "Option" 
              };
            });
          setBoxes(
            boxes.map((b) =>
              b.id === boxId 
                ? { ...b, options: options.length ? options : [{ value: 'option1', label: 'Option 1' }] } 
                : b
            )
          );
        }
      }
      else if (box.type === "progress") {
        const newValue = prompt("Enter progress value:", box.value?.toString() || "50");
        const newMax = prompt("Enter maximum value:", box.max?.toString() || "100");
        if (newValue !== null && newMax !== null) {
          setBoxes(
            boxes.map((b) =>
              b.id === boxId 
                ? { 
                    ...b, 
                    value: parseInt(newValue) || 0,
                    max: parseInt(newMax) || 100
                  } 
                : b
            )
          );
        }
      }
    },
    [boxes, setBoxes]
  );

  const renderBoxContent = (box) => {
    const baseStyle = {
      // Layout
      display: box.display,
      flexDirection: box.flexDirection,
      justifyContent: box.justifyContent,
      alignItems: box.alignItems,
      flexWrap: box.flexWrap,
      gap: `${box.gap}px`,
      // Background
      backgroundColor: box.backgroundColor,
      backgroundImage: box.backgroundImage
        ? `url(${box.backgroundImage})`
        : undefined,
      backgroundSize: box.backgroundSize,
      backgroundPosition: box.backgroundPosition,
      backgroundRepeat: box.backgroundRepeat,
      // Border
      borderRadius: `${box.borderRadius}px`,
      border: `${box.borderWidth}px ${box.borderStyle} ${box.borderColor}`,
      // Shadow
      boxShadow: box.boxShadow,
      // Text
      fontSize: `${box.fontSize}px`,
      fontFamily: box.fontFamily,
      fontWeight: box.fontWeight,
      fontStyle: box.fontStyle,
      textDecoration: box.textDecoration,
      lineHeight: box.lineHeight,
      letterSpacing: `${box.letterSpacing}px`,
      color: box.color,
      textAlign: box.textAlign,
      textTransform: box.textTransform,
      // Other
      opacity: box.opacity,
      cursor: box.cursor,
      overflow: box.overflow,
      padding: `${box.padding}px`,
      margin: `${box.margin}px`,
      transform: box.transform,
      transition: box.transition,
      transformOrigin: box.transformOrigin,
      width: "100%",
      height: "100%",
    };

    switch (box.type) {
      case "text":
      case "p":
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return (
          <box.tagName style={baseStyle}>
            {box.text}
          </box.tagName>
        );
      
      case "button":
        return (
          <button 
            style={{
              ...baseStyle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {box.buttonText}
          </button>
        );
      
      case "image":
        return box.imageUrl ? (
          <img
            src={box.imageUrl}
            alt=""
            style={{
              ...baseStyle,
              objectFit: box.objectFit,
            }}
          />
        ) : (
          <div
            style={{
              ...baseStyle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No image
          </div>
        );
      
      case "input":
        return (
          <input
            type={box.inputType}
            placeholder={box.placeholder}
            style={baseStyle}
          />
        );
      
      case "textarea":
        return (
          <textarea
            placeholder={box.placeholder}
            style={baseStyle}
            value={box.text}
          />
        );
      
      case "video":
        return box.videoUrl ? (
          <video
            src={box.videoUrl}
            controls={box.videoControls}
            autoPlay={box.videoAutoplay}
            loop={box.videoLoop}
            muted={box.videoMuted}
            style={{
              ...baseStyle,
              objectFit: box.objectFit,
            }}
          />
        ) : (
          <div
            style={{
              ...baseStyle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No video
          </div>
        );
      
      case "dropdown":
        return (
          <select style={baseStyle}>
            {box.options?.map((option, i) => (
              <option key={i} value={option.value}>{option.label}</option>
            ))}
          </select>
        );
      
      case "checkbox":
        return (
          <label style={{ ...baseStyle, display: "flex", alignItems: "center", gap: "8px" }}>
            <input 
              type="checkbox" 
              checked={box.checked} 
              onChange={() => {}}
              style={{ width: "16px", height: "16px" }}
            />
            {box.label || "Checkbox"}
          </label>
        );
      
      case "radio":
        return (
          <label style={{ ...baseStyle, display: "flex", alignItems: "center", gap: "8px" }}>
            <input 
              type="radio" 
              checked={box.checked} 
              onChange={() => {}}
              style={{ width: "16px", height: "16px" }}
            />
            {box.label || "Radio"}
          </label>
        );
      
      case "progress":
        return (
          <div style={{ ...baseStyle, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {box.label && <div style={{ marginBottom: "4px" }}>{box.label}</div>}
            <progress 
              value={box.value} 
              max={box.max} 
              style={{ width: "100%", height: "10px" }}
            />
            {box.showValue && <div style={{ marginTop: "4px", textAlign: "center" }}>{box.value}/{box.max}</div>}
          </div>
        );
      
      default:
        // For generic divs and unsupported types
        return <div style={baseStyle}>{box.text}</div>;
    }
  };

  const renderBoxHandles = (box) => {
    if (selectedBoxId !== box.id) return null;

    const handleSize = 8;
    const rotationHandleSize = 12;
    
    const baseHandleStyle = {
      position: "absolute",
      backgroundColor: "#3b82f6",
      border: "2px solid white",
      borderRadius: "50%",
      zIndex: 1000,
    };

    const rotationHandleStyle = {
      ...baseHandleStyle,
      width: `${rotationHandleSize}px`,
      height: `${rotationHandleSize}px`,
      top: `${-30}px`,
      left: "50%",
      transform: "translateX(-50%)",
      cursor: "grab",
    };

    const resizeHandleStyle = {
      ...baseHandleStyle,
      width: `${handleSize}px`,
      height: `${handleSize}px`,
    };

    return (
      <>
        {/* Rotation handle */}
        <div style={rotationHandleStyle} />
        
        {/* Corner handles */}
        <div style={{ ...resizeHandleStyle, top: `${-handleSize/2}px`, left: `${-handleSize/2}px`, cursor: 'nwse-resize' }} />
        <div style={{ ...resizeHandleStyle, top: `${-handleSize/2}px`, left: `${box.width-handleSize/2}px`, cursor: 'nesw-resize' }} />
        <div style={{ ...resizeHandleStyle, top: `${box.height-handleSize/2}px`, left: `${-handleSize/2}px`, cursor: 'nesw-resize' }} />
        <div style={{ ...resizeHandleStyle, top: `${box.height-handleSize/2}px`, left: `${box.width-handleSize/2}px`, cursor: 'nwse-resize' }} />
        
        {/* Side handles */}
        <div style={{ ...resizeHandleStyle, top: `${-handleSize/2}px`, left: `${box.width/2-handleSize/2}px`, cursor: 'ns-resize' }} />
        <div style={{ ...resizeHandleStyle, top: `${box.height-handleSize/2}px`, left: `${box.width/2-handleSize/2}px`, cursor: 'ns-resize' }} />
        <div style={{ ...resizeHandleStyle, top: `${box.height/2-handleSize/2}px`, left: `${-handleSize/2}px`, cursor: 'ew-resize' }} />
        <div style={{ ...resizeHandleStyle, top: `${box.height/2-handleSize/2}px`, left: `${box.width-handleSize/2}px`, cursor: 'ew-resize' }} />
      </>
    );
  };

  const renderBoxes = () => {
    return boxes.map((box) => (
      <div
        key={box.id}
        style={{
          position: "absolute",
          left: `${box.left}px`,
          top: `${box.top}px`,
          width: `${box.width}px`,
          height: `${box.height}px`,
          backgroundColor: box.type === "img" || box.type === "video" ? "transparent" : box.backgroundColor,
          borderRadius: `${box.borderRadius}px`,
          border: `${box.borderWidth}px solid ${box.borderColor}`,
          opacity: box.opacity,
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: selectedBoxId === box.id ? "0 0 0 2px #3b82f6" : "none",
          transform: box.transform,
          transformOrigin: box.transformOrigin,
          zIndex: box.zIndex,
        }}
        onClick={(e) => handleBoxClick(box.id, e)}
        onDoubleClick={(e) => handleDoubleClick(box.id, e)}
      >
        {renderBoxContent(box)}
        {renderBoxHandles(box)}
      </div>
    ));
  };

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          backgroundImage: `
            linear-gradient(#e5e7eb 1px, transparent 1px),
            linear-gradient(90deg, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Canvas */}
      <div
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          cursor: ctrlPressed ? "crosshair" : "default",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Rendered boxes */}
        {renderBoxes()}

        {/* Current drawing box */}
        {currentBox && (
          <div
            style={{
              position: "absolute",
              left: `${currentBox.left}px`,
              top: `${currentBox.top}px`,
              width: `${currentBox.width}px`,
              height: `${currentBox.height}px`,
              backgroundColor: currentBox.backgroundColor,
              borderRadius: `${currentBox.borderRadius}px`,
              border: `${currentBox.borderWidth}px solid ${currentBox.borderColor}`,
              opacity: currentBox.opacity,
              pointerEvents: "none",
              transform: currentBox.transform,
              transformOrigin: currentBox.transformOrigin,
            }}
          >
            {renderBoxContent(currentBox)}
          </div>
        )}
      </div>
    </div>
  );
};