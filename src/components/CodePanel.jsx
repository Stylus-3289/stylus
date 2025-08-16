import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

export const CodePanel = ({ boxes }) => {
  const [codeType, setCodeType] = useState('css');

  const generateCSS = () => {
    if (boxes.length === 0) return '/* No boxes created yet */';

    return boxes.map((box, index) => {
      return `.box-${index + 1} {
  position: absolute;
  left: ${box.left}px;
  top: ${box.top}px;
  width: ${box.width}px;
  height: ${box.height}px;
  background-color: ${box.backgroundColor};
  border: ${box.borderWidth}px solid ${box.borderColor};
  border-radius: ${box.borderRadius}px;
  opacity: ${box.opacity};
}`;
    }).join('\n\n');
  };

  const generateHTML = () => {
    if (boxes.length === 0) return '<!-- No boxes created yet -->';

    return boxes.map((_, index) => 
      `<div class="box-${index + 1}"></div>`
    ).join('\n');
  };

  const code = codeType === 'css' ? generateCSS() : generateHTML();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `generated-boxes.${codeType}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`${codeType.toUpperCase()} file downloaded!`);
  };

  return (
    <Card className="w-96 h-full bg-code-bg border-code-border flex flex-col">
      <div className="p-4 border-b border-code-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Generated Code</h3>
          <div className="flex gap-2">
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
        </div>
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
            {code}
          </code>
        </pre>
      </div>
    </Card>
  );
};
