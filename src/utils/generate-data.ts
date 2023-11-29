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

export function generateDataWithSentiment(n: number): ElementsDefinition {
  const nodes: NodeDefinition[] = [];
  const edges: EdgeDefinition[] = [];
  const positiveElements: string[] = [];
  const negativeElements: string[] = [];
  const neutralElements: string[] = [];

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
    if (sentiment === "positive") {
      positiveElements.push(`n${i}`);
    } else if (sentiment === "negative") {
      negativeElements.push(`n${i}`);
    } else if (sentiment === "neutral") {
      neutralElements.push(`n${i}`);
    }
  }

  edges.push(
    ...generateEdgesByNodes(positiveElements, n),
    ...generateEdgesByNodes(negativeElements, n),
    ...generateEdgesByNodes(neutralElements, n)
  );

  return {
    nodes,
    edges,
  };
}

export function generateEdgesByNodes(
  nodes: string[],
  n: number
): EdgeDefinition[] {
  const edges: EdgeDefinition[] = [];
  for (let i = 0; i < n; i++) {
    const sourceIndex = Math.floor(Math.random() * nodes.length);
    const source = nodes[sourceIndex];
    const targetIndex = Math.floor(Math.random() * nodes.length);
    const target = nodes[targetIndex];
    if (target) {
      edges.push({
        data: {
          id: `e${i}`,
          source,
          target,
        },
      });
    }
  }
  return edges;
}
