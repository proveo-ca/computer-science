/**
 * Graph Implementation using Adjacency List
 * Time Complexity: O(V + E) - BFS, DFS traversal
 * Time Complexity: O(1) - addVertex, O(1) - addEdge (average case)
 * Space Complexity: O(V + E) - where V is vertices and E is edges
 */
export class Graph<T> {
  protected adjacencyList: Map<T, Set<T>>;
  protected _verticesCount: number;
  protected _edgesCount: number;

  constructor() {
    this.adjacencyList = new Map<T, Set<T>>();
    this._verticesCount = 0;
    this._edgesCount = 0;
  }

  /**
   * Get the number of vertices
   * @returns number of vertices
   */
  get verticesCount(): number {
    return this._verticesCount;
  }

  /**
   * Get the number of edges
   * @returns number of edges
   */
  get edgesCount(): number {
    return this._edgesCount;
  }

  /**
   * Add a vertex to the graph
   * @param vertex - vertex to add
   * @returns true if vertex was added, false if it already exists
   */
  addVertex(vertex: T): boolean {
    if (this.adjacencyList.has(vertex)) {
      return false;
    }

    this.adjacencyList.set(vertex, new Set<T>());
    this._verticesCount++;
    return true;
  }

  /**
   * Remove a vertex from the graph
   * @param vertex - vertex to remove
   * @returns true if vertex was removed
   */
  removeVertex(vertex: T): boolean {
    if (!this.adjacencyList.has(vertex)) {
      return false;
    }

    // Remove all edges to this vertex
    for (const [v, neighbors] of this.adjacencyList) {
      if (neighbors.has(v)) {
        neighbors.delete(v);
        this._edgesCount--;
      }
    }

    // Remove the vertex and its edges
    const neighbors = this.adjacencyList.get(vertex)!;
    this._edgesCount -= neighbors.size;
    this.adjacencyList.delete(vertex);
    this._verticesCount--;
    return true;
  }

  /**
   * Add an edge between two vertices (undirected)
   * @param vertex1 - first vertex
   * @param vertex2 - second vertex
   * @returns true if edge was added
   */
  addEdge(vertex1: T, vertex2: T): boolean {
    // Add vertices if they don't exist
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    const neighbors1 = this.adjacencyList.get(vertex1)!;
    const neighbors2 = this.adjacencyList.get(vertex2)!;

    // Check if edge already exists
    if (neighbors1.has(vertex2)) {
      return false;
    }

    neighbors1.add(vertex2);
    neighbors2.add(vertex1);
    this._edgesCount++;
    return true;
  }

  /**
   * Remove an edge between two vertices
   * @param vertex1 - first vertex
   * @param vertex2 - second vertex
   * @returns true if edge was removed
   */
  removeEdge(vertex1: T, vertex2: T): boolean {
    const neighbors1 = this.adjacencyList.get(vertex1);
    const neighbors2 = this.adjacencyList.get(vertex2);

    if (!neighbors1 || !neighbors2 || !neighbors1.has(vertex2)) {
      return false;
    }

    neighbors1.delete(vertex2);
    neighbors2.delete(vertex1);
    this._edgesCount--;
    return true;
  }

  /**
   * Check if a vertex exists in the graph
   * @param vertex - vertex to check
   * @returns true if vertex exists
   */
  hasVertex(vertex: T): boolean {
    return this.adjacencyList.has(vertex);
  }

  /**
   * Check if an edge exists between two vertices
   * @param vertex1 - first vertex
   * @param vertex2 - second vertex
   * @returns true if edge exists
   */
  hasEdge(vertex1: T, vertex2: T): boolean {
    const neighbors = this.adjacencyList.get(vertex1);
    return neighbors ? neighbors.has(vertex2) : false;
  }

  /**
   * Get all neighbors of a vertex
   * @param vertex - vertex to get neighbors for
   * @returns set of neighbors or empty set if vertex doesn't exist
   */
  getNeighbors(vertex: T): Set<T> {
    return this.adjacencyList.get(vertex) || new Set<T>();
  }

  /**
   * Get all vertices in the graph
   * @returns array of all vertices
   */
  getVertices(): T[] {
    return Array.from(this.adjacencyList.keys());
  }

  /**
   * Get the degree of a vertex (number of edges)
   * @param vertex - vertex to get degree for
   * @returns degree of the vertex or -1 if vertex doesn't exist
   */
  getDegree(vertex: T): number {
    const neighbors = this.adjacencyList.get(vertex);
    return neighbors ? neighbors.size : -1;
  }

  /**
   * Breadth-First Search traversal
   * @param startVertex - vertex to start from
   * @param callback - function to call for each visited vertex
   */
  bfs(startVertex: T, callback: (vertex: T) => void): void {
    if (!this.hasVertex(startVertex)) {
      return;
    }

    const visited = new Set<T>();
    const queue: T[] = [startVertex];
    visited.add(startVertex);

    while (queue.length > 0) {
      const current = queue.shift()!;
      callback(current);

      for (const neighbor of this.getNeighbors(current)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  /**
   * Depth-First Search traversal
   * @param startVertex - vertex to start from
   * @param callback - function to call for each visited vertex
   */
  dfs(startVertex: T, callback: (vertex: T) => void): void {
    if (!this.hasVertex(startVertex)) {
      return;
    }

    const visited = new Set<T>();
    this.dfsHelper(startVertex, visited, callback);
  }

  /**
   * Helper method for DFS
   * @param vertex - current vertex
   * @param visited - set of visited vertices
   * @param callback - function to call for each visited vertex
   */
  private dfsHelper(
    vertex: T,
    visited: Set<T>,
    callback: (vertex: T) => void
  ): void {
    visited.add(vertex);
    callback(vertex);

    for (const neighbor of this.getNeighbors(vertex)) {
      if (!visited.has(neighbor)) {
        this.dfsHelper(neighbor, visited, callback);
      }
    }
  }

  /**
   * Check if the graph has a cycle
   * @returns true if graph has a cycle
   */
  hasCycle(): boolean {
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
   * Helper method for cycle detection
   * @param vertex - current vertex
   * @param visited - set of visited vertices
   * @param recursionStack - set of vertices in current recursion stack
   * @returns true if cycle is found
   */
  protected hasCycleHelper(
    vertex: T,
    visited: Set<T>,
    recursionStack: Set<T>
  ): boolean {
    visited.add(vertex);
    recursionStack.add(vertex);

    for (const neighbor of this.getNeighbors(vertex)) {
      if (!visited.has(neighbor)) {
        if (this.hasCycleHelper(neighbor, visited, recursionStack)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(vertex);
    return false;
  }

  /**
   * Check if the graph is connected
   * @returns true if graph is connected
   */
  isConnected(): boolean {
    if (this._verticesCount === 0) {
      return true;
    }

    const vertices = this.getVertices();
    const visited = new Set<T>();

    // Start BFS from first vertex
    this.bfs(vertices[0], (vertex) => visited.add(vertex));

    // Check if all vertices were visited
    return visited.size === this._verticesCount;
  }

  /**
   * Clear all vertices and edges from the graph
   */
  clear(): void {
    this.adjacencyList.clear();
    this._verticesCount = 0;
    this._edgesCount = 0;
  }

  /**
   * Create a graph from an edge list
   * @param edges - array of [vertex1, vertex2] tuples
   * @returns new Graph instance
   */
  static fromEdges<T>(edges: [T, T][]): Graph<T> {
    const graph = new Graph<T>();
    for (const [v1, v2] of edges) {
      graph.addEdge(v1, v2);
    }
    return graph;
  }

  /**
   * Get string representation of the graph
   * @returns string representation
   */
  toString(): string {
    const edges: string[] = [];
    for (const [vertex, neighbors] of this.adjacencyList) {
      for (const neighbor of neighbors) {
        // Only add each edge once (avoid duplicates in undirected graph)
        if (
          vertex < neighbor ||
          (typeof vertex === 'string' &&
            typeof neighbor === 'string' &&
            vertex.localeCompare(neighbor) < 0)
        ) {
          edges.push(`${vertex}-${neighbor}`);
        }
      }
    }
    return `Graph(V: ${this._verticesCount}, E: ${
      this._edgesCount
    }): [${edges.join(', ')}]`;
  }
}
