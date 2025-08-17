export const Box = {
  id: "",
  type: "div",
  tagName: "div", // Actual HTML tag name
  parentId: null,
  // Positioning
  left: 0,
  top: 0,
  width: 100,
  height: 100,
  zIndex: 0,
  
  // ... (keep all your existing properties)
  
  // Form element specific properties
  options: [], // For dropdown/select
  checked: false, // For checkbox/radio
  label: "", // For checkbox/radio/labeled elements
  value: null, // For progress/range/input
  max: null, // For progress/range
  
  // HTML element attributes
  href: "", // For links
  target: "", // For links
  alt: "", // For images
  src: "", // For media elements
  controls: true, // For video/audio
  autoplay: false, // For video/audio
  loop: false, // For video/audio
  muted: false, // For video/audio
  poster: "", // For video
  // ... add more HTML attributes as needed
};

export const elementTypes = [
  // Basic text elements
  { value: "p", label: "Paragraph", tagName: "p" },
  { value: "h1", label: "Heading 1", tagName: "h1" },
  { value: "h2", label: "Heading 2", tagName: "h2" },
  { value: "h3", label: "Heading 3", tagName: "h3" },
  { value: "h4", label: "Heading 4", tagName: "h4" },
  { value: "h5", label: "Heading 5", tagName: "h5" },
  { value: "h6", label: "Heading 6", tagName: "h6" },
  { value: "span", label: "Span", tagName: "span" },
  
  // Form elements
  { value: "button", label: "Button", tagName: "button" },
  { value: "input", label: "Input", tagName: "input" },
  { value: "textarea", label: "Textarea", tagName: "textarea" },
  { value: "dropdown", label: "Dropdown", tagName: "select" },
  { value: "checkbox", label: "Checkbox", tagName: "input", inputType: "checkbox" },
  { value: "radio", label: "Radio", tagName: "input", inputType: "radio" },
  { value: "progress", label: "Progress", tagName: "progress" },
  { value: "range", label: "Range", tagName: "input", inputType: "range" },
  
  // Media elements
  { value: "image", label: "Image", tagName: "img" },
  { value: "video", label: "Video", tagName: "video" },
  { value: "audio", label: "Audio", tagName: "audio" },
  
  // Structural elements
  { value: "div", label: "Div", tagName: "div" },
  { value: "section", label: "Section", tagName: "section" },
  { value: "article", label: "Article", tagName: "article" },
  { value: "header", label: "Header", tagName: "header" },
  { value: "footer", label: "Footer", tagName: "footer" },
  { value: "nav", label: "Navigation", tagName: "nav" },
  { value: "aside", label: "Aside", tagName: "aside" },
  { value: "main", label: "Main", tagName: "main" },
  
  // List elements
  { value: "ul", label: "Unordered List", tagName: "ul" },
  { value: "ol", label: "Ordered List", tagName: "ol" },
  { value: "li", label: "List Item", tagName: "li" },
  
  // Table elements
  { value: "table", label: "Table", tagName: "table" },
  { value: "tr", label: "Table Row", tagName: "tr" },
  { value: "td", label: "Table Cell", tagName: "td" },
  { value: "th", label: "Table Header", tagName: "th" },
  
  // Interactive elements
  { value: "a", label: "Link", tagName: "a" },
  { value: "label", label: "Label", tagName: "label" },
  { value: "details", label: "Details", tagName: "details" },
  { value: "summary", label: "Summary", tagName: "summary" },
  
  // Add more HTML elements as needed
];