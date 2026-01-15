// BaseNode.js
// Base abstraction for all node types

import { Handle, Position } from 'reactflow';
import './BaseNode.css';

export const BaseNode = ({
  id,
  data,
  title,
  children,
  inputHandles = [],
  outputHandles = [],
  className = '',
  minWidth = 200,
  minHeight = 80,
  style = {}
}) => {
  const nodeStyle = {
    minWidth,
    minHeight,
    ...style
  };

  return (
    <div className={`base-node ${className}`} style={nodeStyle}>
      {/* Input Handles */}
      {inputHandles.map((handle, index) => (
        <Handle
          key={handle.id || `input-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id || `input-${index}`}
          style={handle.style || {}}
          label={handle.label || ''}
        />
      ))}

      {/* Node Header */}
      {title && (
        <div className="base-node-header">
          <span className="base-node-title">{title}</span>
        </div>
      )}

      {/* Node Content */}
      <div className="base-node-content">
        {children}
      </div>

      {/* Output Handles */}
      {outputHandles.map((handle, index) => (
        <Handle
          key={handle.id || `output-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id || `output-${index}`}
          style={handle.style || {}}
          label={handle.label || ''}
        />
      ))}
    </div>
  );
};
