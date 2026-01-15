// filterNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterCriteria, setFilterCriteria] = useState(data?.filterCriteria || 'all');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  const handleCriteriaChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  const handleValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      className="filter-node"
      inputHandles={[{ id: `${id}-input`, label: 'data' }]}
      outputHandles={[
        { id: `${id}-filtered`, label: 'filtered' },
        { id: `${id}-rejected`, label: 'rejected' }
      ]}
    >
      <label>
        Filter By:
        <select value={filterCriteria} onChange={handleCriteriaChange}>
          <option value="all">All</option>
          <option value="contains">Contains</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
          <option value="length">Length</option>
        </select>
      </label>
      {filterCriteria !== 'all' && (
        <label>
          Value:
          <input 
            type="text" 
            value={filterValue} 
            onChange={handleValueChange}
            placeholder="Filter value"
          />
        </label>
      )}
    </BaseNode>
  );
}
