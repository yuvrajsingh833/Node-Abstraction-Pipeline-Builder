// conditionNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [conditionType, setConditionType] = useState(data?.conditionType || 'equals');
  const [comparisonValue, setComparisonValue] = useState(data?.comparisonValue || '');

  const handleTypeChange = (e) => {
    setConditionType(e.target.value);
  };

  const handleValueChange = (e) => {
    setComparisonValue(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      className="condition-node"
      inputHandles={[{ id: `${id}-input`, label: 'value' }]}
      outputHandles={[
        { id: `${id}-true`, label: 'true' },
        { id: `${id}-false`, label: 'false' }
      ]}
    >
      <label>
        Condition:
        <select value={conditionType} onChange={handleTypeChange}>
          <option value="equals">Equals</option>
          <option value="greater">Greater Than</option>
          <option value="less">Less Than</option>
          <option value="contains">Contains</option>
        </select>
      </label>
      <label>
        Compare To:
        <input 
          type="text" 
          value={comparisonValue} 
          onChange={handleValueChange} 
          placeholder="Value to compare"
        />
      </label>
    </BaseNode>
  );
}
