// textNode.js

import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import './TextNode.css';

// Helper function to extract variables from text (e.g., {{ variableName }})
const extractVariables = (text) => {
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = [];
  let match;
  
  while ((match = variableRegex.exec(text)) !== null) {
    const varName = match[1];
    if (!variables.includes(varName)) {
      variables.push(varName);
    }
  }
  
  return variables;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const [nodeDimensions, setNodeDimensions] = useState({ width: 200, height: 80 });

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    
    // Extract variables
    const extractedVars = extractVariables(newText);
    setVariables(extractedVars);
  };

  // Update node size based on text content
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      
      // Reset height to get accurate scrollHeight
      textarea.style.height = 'auto';
      
      // Calculate new dimensions
      const scrollHeight = textarea.scrollHeight;
      const scrollWidth = textarea.scrollWidth;
      
      // Set minimum dimensions and add padding
      const newWidth = Math.max(200, Math.min(400, scrollWidth + 40));
      const newHeight = Math.max(80, scrollHeight + 60);
      
      setNodeDimensions({ width: newWidth, height: newHeight });
      
      // Set textarea height to match content
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [currText]);

  // Extract variables on mount
  useEffect(() => {
    const extractedVars = extractVariables(currText);
    setVariables(extractedVars);
  }, []);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      className="text-node"
      minWidth={nodeDimensions.width}
      minHeight={nodeDimensions.height}
      inputHandles={variables.map((varName, index) => ({
        id: `${id}-${varName}`,
        label: varName,
        style: { 
          top: `${20 + (index * 30)}px`,
        }
      }))}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className="text-node-textarea"
          placeholder="Enter text with {{ variables }}"
        />
      </label>
      {variables.length > 0 && (
        <div className="text-node-variables">
          <small>Variables: {variables.join(', ')}</small>
        </div>
      )}
    </BaseNode>
  );
}
