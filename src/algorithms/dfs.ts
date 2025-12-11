import { sum } from '../utils.ts';
import { GraphNode } from './graph-node.ts';

export function findCycleLength<NodeType extends DfsNode<NodeType, Options>, Options>(
  start: NodeType,
  options: Options,
) {
  const lastNodeInCycle = findLastNodeInCycle(start, options);
  return lastNodeInCycle.getDistanceToStart() + 1;
}

export function findLastNodeInCycle<NodeType extends DfsNode<NodeType, Options>, Options>(
  start: NodeType,
  options: Options,
) {
  return findTargetWithDfs(
    start,
    (node) => node.getAdjacentNodes(options).includes(start) && node.nodeState.previousNode !== start,
    options,
  )!;
}

/**
 * Generic depth-first seach implementation
 * @param start        Start node
 * @param isTargetNode Callback for determining whether node is the target or nt
 * @param options      Options which may be passed to node's getAdjacentNodes method
 * @returns
 */
export function findTargetWithDfs<NodeType extends DfsNode<NodeType, Options>, Options>(
  start: NodeType,
  isTargetNode: (node: NodeType) => boolean,
  options: Options,
): NodeType | null {
  const results = findTargetsWithDfs(start, isTargetNode, options, true);
  if (results.size) {
    return results.values().next().value ?? null;
  }
  return null;
}

/**
 * Generic depth-first seach implementation for finding all matching nodes.
 * Iterates through whole graph.
 * @param start        Start node
 * @param isTargetNode Callback for determining whether node is the target or nt
 * @param options      Options which may be passed to node's getAdjacentNodes method
 * @returns
 */
export function findTargetsWithDfs<NodeType extends DfsNode<NodeType, Options>, Options>(
  start: NodeType,
  isTargetNode: (node: NodeType) => boolean,
  options: Options,
  firstOnly = false,
) {
  const nodesToCheck: NodeType[] = [start];
  let currentNode = start;
  const results = new Set<NodeType>();
  while (nodesToCheck.length) {
    const previousNode = currentNode;
    currentNode = nodesToCheck.pop()!;
    if (currentNode.nodeState.checked) {
      continue;
    }
    currentNode.nodeState.checked = true;
    if (previousNode !== currentNode) {
      currentNode.nodeState.previousNode = previousNode;
    }

    if (isTargetNode(currentNode)) {
      results.add(currentNode);
      if (firstOnly) {
        return results;
      }
    }

    for (const node of currentNode.getAdjacentNodes(options) as NodeType[]) {
      if (!node.nodeState.checked) {
        nodesToCheck.push(node);
      }
    }
  }
  return results;
}

/**
 * Finds longest path to target with DFS and returns its length
 */
export function findLongestPathLengthWithDfs<NodeType extends DfsNode<NodeType, Options>, Options>(
  start: NodeType,
  isTargetNode: (node: NodeType) => boolean,
  getWeight: (node: NodeType) => number,
  options: Options,
) {
  const path = [start];
  const pathSet = new Set([start]);
  let longestPath = 0;
  const nextNodes: [NodeType, NodeType][] = start.getAdjacentNodes(options).map((node) => [start, node]);

  while (nextNodes.length) {
    const [previousNode, currentNode] = nextNodes.pop()!;
    if (path[path.length - 1] !== previousNode) {
      while (path[path.length - 1] !== previousNode) {
        pathSet.delete(path.pop()!);
      }
    }
    path.push(currentNode);
    pathSet.add(currentNode);
    if (isTargetNode(currentNode)) {
      const pathLength = sum(path, getWeight) - 1;
      longestPath = Math.max(longestPath, pathLength);
    }

    for (const node of currentNode.getAdjacentNodes(options)) {
      if (!pathSet.has(node)) {
        nextNodes.push([currentNode, node]);
      }
    }
  }
  return longestPath;
}

/**
 * Finds all paths to target starting from start
 */
export function findAllPathsWithDfs<NodeType extends DfsNode<NodeType, Options>, Options>(
  start: NodeType,
  isTargetNode: (node: NodeType) => boolean,
  options: Options,
  //cache: Map<NodeType, Map<NodeType, NodeType[]>>,
) {
  const path = [start];
  const pathSet = new Set([start]);
  const paths: NodeType[][] = [];
  const nextNodes: [NodeType, NodeType][] = start.getAdjacentNodes(options).map((node) => [start, node]);

  while (nextNodes.length) {
    const [previousNode, currentNode] = nextNodes.pop()!;
    if (path[path.length - 1] !== previousNode) {
      while (path[path.length - 1] !== previousNode) {
        pathSet.delete(path.pop()!);
      }
    }
    path.push(currentNode);
    pathSet.add(currentNode);
    if (isTargetNode(currentNode)) {
      paths.push([...path]);
    }
    // cache?

    for (const node of currentNode.getAdjacentNodes(options)) {
      if (!pathSet.has(node)) {
        nextNodes.push([currentNode, node]);
      }
    }
  }
  return paths;
}

/**
 * Conts all paths to target starting from start.
 * Note: Not tested with graphs that contain cycles.
 * Stops each path at target (cannot be multiple times on "same" path)
 */
export function countAllPathsWithDfs<NodeType extends DfsNode<NodeType, Options>, Options>(
  start: NodeType,
  isTargetNode: (node: NodeType) => boolean,
  options: Options,
) {
  const path = [start];
  const pathSet = new Set([start]);
  const nextNodes: [NodeType, NodeType][] = start.getAdjacentNodes(options).map((node) => [start, node]);
  const cache = new Map<NodeType, number>();

  while (nextNodes.length) {
    const [previousNode, currentNode] = nextNodes.pop()!;
    // Move path "back" until last element is previousNode
    while (path[path.length - 1] !== previousNode) {
      const removedNode = path.pop()!;
      const beforeRemoved = path.at(-1)!;
      // As we move back, update cache value to include count from fully explored child paths
      // Note: beforeRemoved could still get more values from other child paths
      // removedNode's paths however are fully explored (= should already be cached with final value)
      cache.set(beforeRemoved, (cache.get(beforeRemoved) ?? 0) + (cache.get(removedNode) ?? 0));
      pathSet.delete(removedNode);
    }
    path.push(currentNode);
    pathSet.add(currentNode);
    if (isTargetNode(currentNode)) {
      cache.set(currentNode, 1);
      continue;
    }

    for (const node of currentNode.getAdjacentNodes(options)) {
      if (!pathSet.has(node)) {
        if (cache.has(node)) {
          cache.set(currentNode, (cache.get(currentNode) ?? 0) + (cache.get(node) ?? 0));
        } else {
          nextNodes.push([currentNode, node]);
        }
      }
    }
  }
  while (path.length > 1) {
    const removedNode = path.pop()!;
    const beforeRemoved = path.at(-1)!;
    cache.set(beforeRemoved, (cache.get(beforeRemoved) ?? 0) + (cache.get(removedNode) ?? 0));
    pathSet.delete(removedNode);
  }
  return cache.get(start) ?? 0;
}

/**
 * Generic node type for depth-first search (DFS)
 */
export abstract class DfsNode<NodeType extends DfsNode<NodeType, Options>, Options> extends GraphNode<NodeType> {
  override nodeState = {
    checked: false,
    previousNode: undefined as NodeType | undefined,
  };

  abstract getAdjacentNodes(options: Options): NodeType[];

  resetNodeState() {
    this.nodeState = {
      checked: false,
      previousNode: undefined,
    };
  }
}
