import { useEffect, useMemo, useRef } from "react";
import "./App.css";
import cytoscape from "cytoscape";
import { generateDataWithSentiment } from "./utils/generate-data";
import d3Force from "cytoscape-d3-force";
import cytoscapeD3Force from "cytoscape-d3-force";

cytoscape.use(d3Force);

export default function App() {
  const data = useMemo(() => generateDataWithSentiment(200), []);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    let cy = cytoscape({
      container: ref.current, // container to render in
      elements: data,
      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            "background-color": (ele) => {
              const sentiment = ele.data("sentiment");
              if (sentiment === "positive") return "green";
              if (sentiment === "negative") return "red";
              return "blue";
            },
            label: "data(id)",
          },
        },

        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],
    });
    const layoutOptions: cytoscapeD3Force.D3ForceLayoutOptions = {
      name: "d3-force",
      animate: true,
      linkId: function id(d) {
        return d.id;
      },
      linkDistance: 80,
      manyBodyStrength: -300,
      xX: (el) => {
        if (!el?.sentiment) return 0;

        if (el.sentiment === "positive") return 500;
        if (el.sentiment === "negative") return -500;
        return 0;
      },
    };
    cy.layout(layoutOptions).run();
  }, []);
  return <div className="app" ref={ref}></div>;
}
