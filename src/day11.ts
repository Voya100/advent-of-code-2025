// https://adventofcode.com/2025/day/11

import { countAllPathsWithDfs, DfsNode, findAllPathsWithDfs, findTargetsWithDfs } from './algorithms/dfs.ts';

export function part1(input: string) {
  const nodeMap = parseInput(input);
  const start = nodeMap['you'];
  const end = nodeMap['out'];

  const paths = findAllPathsWithDfs(start, (node) => node === end, undefined);
  return paths.length;
}

export function part2(input: string) {
  const nodeMap = parseInput(input);

  const start = nodeMap['svr'];
  const fft = nodeMap['fft'];
  const dac = nodeMap['dac'];
  const end = nodeMap['out'];

  // Assuming no cycles, determine node order
  const fftBeforeDac = findTargetsWithDfs(fft, (node) => node === dac, undefined, true).size > 0;
  const node2 = fftBeforeDac ? fft : dac;
  const node3 = fftBeforeDac ? dac : fft;

  const startToNode2 = countAllPathsWithDfs(start, (node) => node === node2, undefined);
  const node2ToNode3 = countAllPathsWithDfs(node2, (node) => node === node3, undefined);
  const node3ToEnd = countAllPathsWithDfs(node3, (node) => node === end, undefined);

  return startToNode2 * node2ToNode3 * node3ToEnd;
}

function parseInput(input: string) {
  const nodeMap: Record<string, GraphNode> = {};
  const rows = input
    .split('\n');
  for (const row of rows) {
    const [id, outputInput] = row.split(': ');
    const outputIds = outputInput.split(' ');
    nodeMap[id] = new GraphNode(id, outputIds);
  }
  for (const node of Object.values(nodeMap)) {
    for (const outputId of node.outputIds) {
      if (!nodeMap[outputId]) {
        nodeMap[outputId] = new GraphNode(outputId, []);
      }
      node.populateAdjacentNodes(nodeMap);
    }
  }
  return nodeMap;
}

class GraphNode extends DfsNode<GraphNode, undefined> {
  adjacentNodes: GraphNode[] = [];

  constructor(public id: string, public outputIds: string[]) {
    super();
  }

  override getAdjacentNodes(): GraphNode[] {
    return this.adjacentNodes;
  }

  populateAdjacentNodes(map: Record<string, GraphNode>) {
    this.adjacentNodes = this.outputIds.map((id) => map[id]);
  }

  override toString() {
    return this.id;
  }
}
