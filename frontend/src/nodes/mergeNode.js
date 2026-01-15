// mergeNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [mergeStrategy, setMergeStrategy] = useState(data?.mergeStrategy || 'concat');
  const [separator, setSeparator] = useState(data?.separator || ', ');

  const handleStrategyChange = (e) => {
    setMergeStrategy(e.target.value);
  };

  const handleSeparatorChange = (e) => {
    setSeparator(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      className="merge-node"
      inputHandles={[
        { id: `${id}-input1`, label: 'input 1', style: { top: '25%' } },
        { id: `${id}-input2`, label: 'input 2', style: { top: '50%' } },
        { id: `${id}-input3`, label: 'input 3', style: { top: '75%' } }
      ]}
      outputHandles={[{ id: `${id}-merged`, label: 'merged' }]}
    >
      <label>
        Strategy:
        <select value={mergeStrategy} onChange={handleStrategyChange}>
          <option value="concat">Concatenate</option>
          <option value="sum">Sum</option>
          <option value="average">Average</option>
          <option value="join">Join</option>
        </select>
      </label>
      {mergeStrategy === 'join' && (
        <label>
          Separator:
          <input 
            type="text" 
            value={separator} 
            onChange={handleSeparatorChange}
            placeholder="Separator"
          />
        </label>
      )}
    </BaseNode>
  );
}
