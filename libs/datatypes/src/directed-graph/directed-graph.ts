import { Graph } from '../graph/graph.js';

/**
 * Directed Graph Implementation
 * Extends Graph to support directed edges
 * Time Complexity: O(V + E) - BFS, DFS traversal
 * Space Complexity: O(V + E) - where V is vertices and E is edges
 */
export class DirectedGraph<T> extends Graph<T> {
  constructor() {
    super();
  }

  /**
   * Add a directed edge from source to destination
   * @param source - source vertex
   * @param destination - destination vertex
   * @returns true if edge was added
   */
  addDirectedEdge(source: T, destination: T): boolean {
    // Add vertices if they don't exist
    this.addVertex(source);
    this.addVertex(destination);

    const neighbors = this.adjacencyList.get(source)!;

    // Check if edge already exists
    if (neighbors.has(destination)) {
      return false;
    }

    neighbors.add(destination);
    this._edgesCount++;
    return true;
  }

  /**
   * Override addEdge to use directed edges
   * @param source - source vertex
   * @param destination - destination vertex
   * @returns true if edge was added
   */
  override addEdge(source: T, destination: T): boolean {
    return this.addDirectedEdge(source, destination);
  }

  /**
   * Remove a directed edge from source to destination
   * @param source - source vertex
   * @param destination - destination vertex
   * @returns true if edge was removed
   */
  removeDirectedEdge(source: T, destination: T): boolean {
    const neighbors = this.adjacencyList.get(source);

    if (!neighbors || !neighbors.has(destination)) {
      return false;
    }

    neighbors.delete(destination);
    this._edgesCount--;
    return true;
  }

  /**
   * Override removeEdge to use directed edges
   * @param source - source vertex
   * @param destination - destination vertex
   * @returns true if edge was removed
   */
  override removeEdge(source: T, destination: T): boolean {
    return this.removeDirectedEdge(source, destination);
  }

  /**
   * Get the in-degree of a vertex (number of incoming edges)
   * @param vertex - vertex to get in-degree for
   * @returns in-degree of the vertex
   */
  getInDegree(vertex: T): number {
    if (!this.hasVertex(vertex)) {
      return -1;
    }

    let inDegree = 0;
    for (const [, neighbors] of this.adjacencyList) {
      if (neighbors.has(vertex)) {
        inDegree++;
      }
    }
    return inDegree;
  }

  /**
   * Get the out-degree of a vertex (number of outgoing edges)
   * @param vertex - vertex to get out-degree for
   * @returns out-degree of the vertex
   */
  getOutDegree(vertex: T): number {
    return this.getDegree(vertex);
  }

  /**
   * Topological sort using Kahn's algorithm
   * @returns array of vertices in topological order, or null if graph has cycle
   */
  topologicalSort(): T[] | null {
    const inDegree = new Map<T, number>();
    const queue: T[] = [];
    const result: T[] = [];

    // Initialize in-degrees
    for (const vertex of this.getVertices()) {
      inDegree.set(vertex, this.getInDegree(vertex));
      if (inDegree.get(vertex) === 0) {
        queue.push(vertex);
      }
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);

      for (const neighbor of this.getNeighbors(current)) {
        const newInDegree = inDegree.get(neighbor)! - 1;
        inDegree.set(neighbor, newInDegree);

        if (newInDegree === 0) {
          queue.push(neighbor);
        }
      }
    }

    // If result doesn't contain all vertices, there's a cycle
    return result.length === this._verticesCount ? result : null;
  }

  /**
   * Check if the directed graph has a cycle using DFS
   * @returns true if graph has a cycle
   */
  override hasCycle(): boolean {
    const visited = new Set<T>();
    const recursionStack = new Set<T>();

    for (const vertex of this.getVertices()) {
      if (!visited.has(vertex)) {
        if (this.hasCycleHelper(vertex, visited, recursionStack)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Check if there's a path from source to destination
   * @param source - source vertex
   * @param destination - destination vertex
   * @returns true if path exists
   */
  hasPath(source: T, destination: T): boolean {
    if (!this.hasVertex(source) || !this.hasVertex(destination)) {
      return false;
    }

    if (source === destination) {
      return true;
    }

    const visited = new Set<T>();
    let found = false;

    this.dfs(source, (vertex) => {
      if (vertex === destination) {
        found = true;
      }
      visited.add(vertex)
    });

    return found;
  }

  /**
   * Get string representation of the directed graph
   * @returns string representation
   */
  override toString(): string {
    const edges: string[] = [];
    for (const [vertex, neighbors] of this.adjacencyList) {
      for (const neighbor of neighbors) {
        edges.push(`${vertex}->${neighbor}`);
      }
    }
    return `DirectedGraph(V: ${this._verticesCount}, E: ${
      this._edgesCount
    }): [${edges.join(', ')}]`;
  }
}
