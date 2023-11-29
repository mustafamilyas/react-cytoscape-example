import { useEffect, useMemo, useRef } from "react";
import "./App.css";
import cytoscape from "cytoscape";
import { generateDataWithSentiment } from "./utils/generate-data";
import d3Force from "cytoscape-d3-force";

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

      layout: {
        name: "d3-force",
        animate: true,
        linkId: function id(d) {
          return d.id;
        },
        linkDistance: 80,
        manyBodyStrength: -300,
        ready: function () {},
        stop: function () {},
        xX: (el) => {
          console.log("🚀 ~ file: App.tsx:59 ~ useEffect ~ el:", el);
          if (!el?.sentiment) return 0;

          if (el.sentiment === "positive") return 500;
          if (el.sentiment === "negative") return -500;
          return 0;
        },
        randomize: true,
        infinite: true,
      } as any,
    });
    return () => {
      cy.destroy();
    };
  }, []);
  return <div className="app" ref={ref}></div>;
}
