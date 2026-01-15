// numberNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NumberNode = ({ id, data }) => {
  const [numberValue, setNumberValue] = useState(data?.numberValue || 0);
  const [numberType, setNumberType] = useState(data?.numberType || 'Integer');

  const handleValueChange = (e) => {
    const value = numberType === 'Integer' 
      ? parseInt(e.target.value) || 0
      : parseFloat(e.target.value) || 0;
    setNumberValue(value);
  };

  const handleTypeChange = (e) => {
    setNumberType(e.target.value);
    setNumberValue(0);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Number"
      className="number-node"
      outputHandles={[{ id: `${id}-value`, label: 'number' }]}
    >
      <label>
        Type:
        <select value={numberType} onChange={handleTypeChange}>
          <option value="Integer">Integer</option>
          <option value="Float">Float</option>
        </select>
      </label>
      <label>
        Value:
        <input 
          type="number" 
          value={numberValue} 
          onChange={handleValueChange}
          step={numberType === 'Float' ? 0.1 : 1}
        />
      </label>
    </BaseNode>
  );
}
