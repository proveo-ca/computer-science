import { describe, test, expect } from 'bun:test';
import { Graph } from './graph';
import { DirectedGraph } from '../directed-graph/directed-graph';

describe('Graph', () => {
  describe('Undirected Graph', () => {
    test('should create an empty graph', () => {
      const startTime = performance.now();
      const graph = new Graph<string>();
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(graph.verticesCount).toBe(0);
      expect(graph.edgesCount).toBe(0);

      console.log(`Graph creation: ${executionTime.toFixed(3)} ms`);
    });

    test('should add vertices and edges correctly', () => {
      const graph = new Graph<string>();

      const startTime = performance.now();
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(graph.verticesCount).toBe(3);
      expect(graph.edgesCount).toBe(2);
      expect(graph.hasVertex('A')).toBe(true);
      expect(graph.hasEdge('A', 'B')).toBe(true);
      expect(graph.hasEdge('B', 'A')).toBe(true); // Undirected
      expect(graph.getDegree('B')).toBe(2);

      console.log(
        `Vertex/Edge addition operations: ${executionTime.toFixed(3)} ms`
      );
    });

    test('should perform BFS traversal correctly', () => {
      const graph = new Graph<string>();
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('B', 'D');
      graph.addEdge('C', 'E');

      const startTime = performance.now();
      const visited: string[] = [];
      graph.bfs('A', (vertex) => visited.push(vertex));
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(visited[0]).toBe('A');
      expect(visited.length).toBe(5);
      expect(visited).toContain('B');
      expect(visited).toContain('C');
      expect(visited).toContain('D');
      expect(visited).toContain('E');

      console.log(`BFS traversal: ${executionTime.toFixed(3)} ms`);
    });

    test('should perform DFS traversal correctly', () => {
      const graph = new Graph<string>();
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('B', 'D');

      const startTime = performance.now();
      const visited: string[] = [];
      graph.dfs('A', (vertex) => visited.push(vertex));
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(visited[0]).toBe('A');
      expect(visited.length).toBe(4);

      console.log(`DFS traversal: ${executionTime.toFixed(3)} ms`);
    });

    test('should detect connectivity correctly', () => {
      const graph = new Graph<number>();

      // Connected graph
      graph.addEdge(1, 2);
      graph.addEdge(2, 3);
      graph.addEdge(3, 4);

      expect(graph.isConnected()).toBe(true);

      // Add disconnected vertex
      graph.addVertex(5);
      expect(graph.isConnected()).toBe(false);
    });

    test('should create from edge list', () => {
      const edges: [string, string][] = [
        ['A', 'B'],
        ['B', 'C'],
        ['C', 'D'],
      ];

      const startTime = performance.now();
      const graph = Graph.fromEdges(edges);
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(graph.verticesCount).toBe(4);
      expect(graph.edgesCount).toBe(3);

      console.log(`Graph from edges creation: ${executionTime.toFixed(3)} ms`);
    });
  });

  describe('Directed Graph', () => {
    test('should create an empty directed graph', () => {
      const graph = new DirectedGraph<string>();

      expect(graph.verticesCount).toBe(0);
      expect(graph.edgesCount).toBe(0);
    });

    test('should add directed edges correctly', () => {
      const graph = new DirectedGraph<string>();

      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');

      expect(graph.hasEdge('A', 'B')).toBe(true);
      expect(graph.hasEdge('B', 'A')).toBe(false); // Directed
      expect(graph.getInDegree('B')).toBe(1);
      expect(graph.getOutDegree('B')).toBe(1);
    });

    test('should perform topological sort correctly', () => {
      const graph = new DirectedGraph<string>();

      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('B', 'D');
      graph.addEdge('C', 'D');

      const startTime = performance.now();
      const sorted = graph.topologicalSort();
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(sorted).not.toBeNull();
      expect(sorted!.length).toBe(4);
      expect(sorted!.indexOf('A')).toBeLessThan(sorted!.indexOf('B'));
      expect(sorted!.indexOf('A')).toBeLessThan(sorted!.indexOf('C'));
      expect(sorted!.indexOf('B')).toBeLessThan(sorted!.indexOf('D'));
      expect(sorted!.indexOf('C')).toBeLessThan(sorted!.indexOf('D'));

      console.log(`Topological sort: ${executionTime.toFixed(3)} ms`);
    });

    test('should detect cycles correctly', () => {
      const graph = new DirectedGraph<string>();

      // Acyclic graph
      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      expect(graph.hasCycle()).toBe(false);

      // Add cycle
      graph.addEdge('C', 'A');
      expect(graph.hasCycle()).toBe(true);
    });

    test('should check path existence', () => {
      const graph = new DirectedGraph<string>();

      graph.addEdge('A', 'B');
      graph.addEdge('B', 'C');
      graph.addEdge('D', 'E');

      expect(graph.hasPath('A', 'C')).toBe(true);
      expect(graph.hasPath('C', 'A')).toBe(false);
      expect(graph.hasPath('A', 'E')).toBe(false);
    });
  });

  test('should remove vertices and edges correctly', () => {
    const graph = new Graph<string>();

    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('A', 'C');

    expect(graph.removeEdge('A', 'B')).toBe(true);
    expect(graph.hasEdge('A', 'B')).toBe(false);
    expect(graph.edgesCount).toBe(2);

    expect(graph.removeVertex('C')).toBe(true);
    expect(graph.hasVertex('C')).toBe(false);
    expect(graph.verticesCount).toBe(2);
    expect(graph.edgesCount).toBe(0); // All edges to C removed
  });

  test('performance with large graph', () => {
    const graph = new Graph<number>();
    const vertexCount = 1000;

    const startTime = performance.now();
    // Create a chain graph
    for (let i = 0; i < vertexCount - 1; i++) {
      graph.addEdge(i, i + 1);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(graph.verticesCount).toBe(vertexCount);
    expect(graph.edgesCount).toBe(vertexCount - 1);

    console.log(
      `Large graph creation (${vertexCount} vertices): ${executionTime.toFixed(
        3
      )} ms`
    );

    const traversalStartTime = performance.now();
    const visited: number[] = [];
    graph.bfs(0, (vertex) => visited.push(vertex));
    const traversalEndTime = performance.now();
    const traversalExecutionTime = traversalEndTime - traversalStartTime;

    expect(visited.length).toBe(vertexCount);

    console.log(
      `Large graph BFS traversal: ${traversalExecutionTime.toFixed(3)} ms`
    );
  });
});
