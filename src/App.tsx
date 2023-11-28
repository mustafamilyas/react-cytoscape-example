import { useEffect, useMemo, useRef } from "react";
import "./App.css";
import cytoscape from "cytoscape";
import { generateData } from "./utils/generate-data";

export default function App() {
  const data = useMemo(() => generateData(200), []);

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
        name: "cose",
        animate: false,
      },
    });
    return () => {
      cy.destroy();
    };
  }, []);
  return <div className="app" ref={ref}></div>;
}
