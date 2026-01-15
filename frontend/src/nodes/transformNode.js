// transformNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customFunction, setCustomFunction] = useState(data?.customFunction || '');

  const handleTypeChange = (e) => {
    setTransformType(e.target.value);
  };

  const handleFunctionChange = (e) => {
    setCustomFunction(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      className="transform-node"
      inputHandles={[{ id: `${id}-input`, label: 'data' }]}
      outputHandles={[{ id: `${id}-output`, label: 'transformed' }]}
    >
      <label>
        Transform Type:
        <select value={transformType} onChange={handleTypeChange}>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
          <option value="reverse">Reverse</option>
          <option value="custom">Custom Function</option>
        </select>
      </label>
      {transformType === 'custom' && (
        <label>
          Function:
          <input 
            type="text" 
            value={customFunction} 
            onChange={handleFunctionChange}
            placeholder="x => x.toUpperCase()"
          />
        </label>
      )}
    </BaseNode>
  );
}
