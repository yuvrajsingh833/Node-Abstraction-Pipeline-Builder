// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      className="llm-node"
      inputHandles={[
        { id: `${id}-system`, style: { top: `${100/3}%` } },
        { id: `${id}-prompt`, style: { top: `${200/3}%` } }
      ]}
      outputHandles={[{ id: `${id}-response` }]}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
}
