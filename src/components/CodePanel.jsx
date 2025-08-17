import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

export const CodePanel = ({ boxes }) => {
  const [codeType, setCodeType] = useState('css');
  const [componentType, setComponentType] = useState('html');

  const generateCSS = () => {
    if (boxes.length === 0) return '/* No elements created yet */';

    return boxes.map((box, index) => {
      let css = `.element-${index + 1} {\n`;
      css += `  position: absolute;\n`;
      css += `  left: ${box.left}px;\n`;
      css += `  top: ${box.top}px;\n`;
      css += `  width: ${box.width}px;\n`;
      css += `  height: ${box.height}px;\n`;
      
      if (box.backgroundColor !== 'transparent') {
        css += `  background-color: ${box.backgroundColor};\n`;
      }
      
      if (box.borderWidth > 0) {
        css += `  border: ${box.borderWidth}px solid ${box.borderColor};\n`;
      }
      
      css += `  border-radius: ${box.borderRadius}px;\n`;
      css += `  opacity: ${box.opacity};\n`;
      
      // Type-specific CSS
      switch (box.type) {
        case 'text':
          css += `  font-size: ${box.fontSize}px;\n`;
          css += `  font-family: ${box.fontFamily};\n`;
          css += `  font-weight: ${box.fontWeight};\n`;
          css += `  color: ${box.color};\n`;
          css += `  text-align: ${box.textAlign};\n`;
          css += `  padding: 4px;\n`;
          break;
        case 'button':
          css += `  display: flex;\n`;
          css += `  align-items: center;\n`;
          css += `  justify-content: center;\n`;
          css += `  color: white;\n`;
          css += `  cursor: pointer;\n`;
          break;
        case 'image':
          css += `  overflow: hidden;\n`;
          css += `  object-fit: cover;\n`;
          break;
        case 'input':
          css += `  padding: 0 8px;\n`;
          css += `  color: ${box.color || '#000'};\n`;
          css += `  outline: none;\n`;
          break;
      }
      
      css += `}`;
      return css;
    }).join('\n\n');
  };

  const generateHTML = () => {
    if (boxes.length === 0) return '<!-- No elements created yet -->';

    return boxes.map((box, index) => {
      switch (box.type) {
        case 'text':
          return `<div class="element-${index + 1}">${box.text}</div>`;
        case 'button':
          return `<button class="element-${index + 1}">${box.buttonText}</button>`;
        case 'image':
          return `<img class="element-${index + 1}" src="${box.imageUrl}" alt="" />`;
        case 'input':
          return `<input class="element-${index + 1}" type="${box.inputType}" placeholder="${box.placeholder}" />`;
        default:
          return `<div class="element-${index + 1}"></div>`;
      }
    }).join('\n');
  };

  const generateReactComponent = () => {
    if (boxes.length === 0) return '// No elements created yet';

    const css = generateCSS();
    const elements = boxes.map((box, index) => {
      switch (box.type) {
        case 'text':
          return `    <div className="element-${index + 1}">${box.text}</div>`;
        case 'button':
          return `    <button className="element-${index + 1}">${box.buttonText}</button>`;
        case 'image':
          return `    <img className="element-${index + 1}" src="${box.imageUrl}" alt="" />`;
        case 'input':
          return `    <input className="element-${index + 1}" type="${box.inputType}" placeholder="${box.placeholder}" />`;
        default:
          return `    <div className="element-${index + 1}"></div>`;
      }
    }).join('\n');

    return `import './App.css';\n\n` +
      `function GeneratedComponent() {\n` +
      `  return (\n` +
      `    <div className="container">\n` +
      `${elements}\n` +
      `    </div>\n` +
      `  );\n` +
      `}\n\n` +
      `export default GeneratedComponent;\n\n` +
      `/* CSS (App.css) */\n` +
      `.container {\n` +
      `  position: relative;\n` +
      `  width: 100%;\n` +
      `  height: 100vh;\n` +
      `}\n\n` +
      `${css}`;
  };

  const getCode = () => {
    if (componentType === 'react') {
      return generateReactComponent();
    }
    return codeType === 'css' ? generateCSS() : generateHTML();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCode());
      toast.success('Code copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const code = getCode();
    const extension = componentType === 'react' ? 'jsx' : codeType;
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `generated-${componentType === 'react' ? 'component' : 'elements'}.${extension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`${componentType === 'react' ? 'React component' : codeType.toUpperCase()} file downloaded!`);
  };

  return (
    <Card className="w-96 h-full bg-code-bg border-code-border flex flex-col">
      <div className="p-4 border-b border-code-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Generated Code</h3>
          <div className="flex gap-2">
            <Button
              variant={componentType === 'html' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setComponentType('html')}
              className="text-xs"
            >
              HTML/CSS
            </Button>
            <Button
              variant={componentType === 'react' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setComponentType('react')}
              className="text-xs"
            >
              React
            </Button>
          </div>
        </div>
        {componentType === 'html' && (
          <div className="flex gap-2 mb-3">
            <Button
              variant={codeType === 'css' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCodeType('css')}
              className="text-xs"
            >
              CSS
            </Button>
            <Button
              variant={codeType === 'html' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCodeType('html')}
              className="text-xs"
            >
              HTML
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={copyToClipboard}
            className="flex-1 text-xs"
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={downloadCode}
            className="flex-1 text-xs"
          >
            <Download className="w-3 h-3 mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="text-foreground font-mono whitespace-pre-wrap">
            {getCode()}
          </code>
        </pre>
      </div>
    </Card>
  );
};