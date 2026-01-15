// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './SubmitButton.css';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      // Prepare pipeline data
      const pipelineData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle
        }))
      };

      // Send to backend
      const formData = new FormData();
      formData.append('pipeline', JSON.stringify(pipelineData));

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to parse pipeline');
      }

      const result = await response.json();
      
      // Display alert with results
      const message = `Pipeline Analysis Results:\n\n` +
        `Number of Nodes: ${result.num_nodes}\n` +
        `Number of Edges: ${result.num_edges}\n` +
        `Is DAG: ${result.is_dag ? 'Yes ✓' : 'No ✗'}`;
      
      alert(message);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="submit-button-container">
      <button className="submit-button" type="button" onClick={handleSubmit}>
        Submit Pipeline
      </button>
    </div>
  );
}
