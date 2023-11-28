import { useEffect, useRef } from "react";
import "./App.css";
import cytoscape from "cytoscape";

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    let cy = cytoscape({
      container: ref.current, // container to render in
      elements: [
        // list of graph elements to start with
        {
          // node a
          data: { id: "a" },
        },
        {
          // node b
          data: { id: "b" },
        },
        {
          // edge ab
          data: { id: "ab", source: "a", target: "b" },
        },
      ],

      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            "background-color": "#666",
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

      layout: {
        name: "grid",
        rows: 1,
      },
    });
    return () => {
      cy.destroy();
    };
  }, []);
  return <div className="app" ref={ref}></div>;
}
