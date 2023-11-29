import { EdgeDefinition, ElementsDefinition, NodeDefinition } from "cytoscape";
import { SentimentValues } from "../types";

export function generateData(n: number): ElementsDefinition {
  const nodes: NodeDefinition[] = [];
  const edges: EdgeDefinition[] = [];

  for (let i = 0; i < n; i++) {
    const sentimentIndex = Math.floor(Math.random() * 3);
    const sentiment = SentimentValues[sentimentIndex];

    nodes.push({
      data: {
        id: `n${i}`,
        label: `Node ${i}`,
        sentiment: sentiment,
      },
    });
  }

  for (let i = 0; i < n * 2; i++) {
    const sourceIdx = Math.floor(Math.random() * nodes.length);
    const source = nodes[sourceIdx].data.id as string;
    const targetIdx = Math.floor(Math.random() * nodes.length);
    const target = nodes[targetIdx].data.id as string;

    edges.push({
      data: {
        id: `e${i}`,
        source,
        target,
      },
    });
  }

  return {
    nodes,
    edges,
  };
}
