import { LayoutOptions as SLayoutOptions } from "cytoscape";

declare namespace cytoscape {
  type LayoutOptions = SLayoutOptions & {
    name: "d3-force";
    // The following are d3-force specific options
    [key: string]: any;
  };

  interface CytoscapeOptions {
    layout?: LayoutOptions | undefined;
  }
}
