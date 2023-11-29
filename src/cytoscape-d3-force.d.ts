import cytoscape from "cytoscape";

declare module "cytoscape-d3-force" {
  function register(ext: cytoscape.Ext): void;
  export default register;
}
