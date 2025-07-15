# Performance Measurements

This file tracks performance measurements for all data structure operations.

## LinkedListNode Performance
- linked-list-node.spec.ts-Node creation: ~0.001 ms
- linked-list-node.spec.ts-Node linking: ~0.002 ms
- linked-list-node.spec.ts-Chain creation (1000 nodes): ~0.5-2.0 ms

## DoublyLinkedListNode Performance
- doubly-linked-list-node.spec.ts-Doubly linked node creation: ~0.001 ms
- doubly-linked-list-node.spec.ts-Bidirectional linking: ~0.003 ms
- doubly-linked-list-node.spec.ts-Node unlinking: ~0.001 ms
- doubly-linked-list-node.spec.ts-Doubly linked chain creation (1000 nodes): ~1.0-3.0 ms

## Stack Performance
- stack.spec.ts-Stack creation: ~0.001 ms
- stack.spec.ts-Push/Pop operations: ~0.002 ms
- stack.spec.ts-Stack from array creation: ~0.1-0.5 ms
- stack.spec.ts-Large dataset push (10000 items): ~2.0-5.0 ms
- stack.spec.ts-Large dataset pop (10000 items): ~1.0-3.0 ms

## BinaryTreeNode Performance
- binary-tree-node.spec.ts-Binary tree node creation: ~0.001 ms
- binary-tree-node.spec.ts-Child setting and parent linking: ~0.002 ms
- binary-tree-node.spec.ts-Height calculation: ~0.001 ms
- binary-tree-node.spec.ts-Size calculation: ~0.001 ms
- binary-tree-node.spec.ts-Min/Max finding: ~0.002 ms
- binary-tree-node.spec.ts-Successor/Predecessor finding: ~0.001 ms
- binary-tree-node.spec.ts-Large tree creation (1000 nodes): ~1.0-4.0 ms

## Deque Performance
- deque.spec.ts-Deque creation: ~0.001 ms
- deque.spec.ts-Head insert/extract operations: ~0.003 ms
- deque.spec.ts-Tail insert/extract operations: ~0.003 ms
- deque.spec.ts-Deque from array creation: ~0.1-0.5 ms
- deque.spec.ts-Large dataset insertion (10000 items): ~3.0-8.0 ms
- deque.spec.ts-Large dataset extraction (10000 items): ~2.0-6.0 ms

## LinkedList Performance
- linked-list.spec.ts-LinkedList creation: ~0.001 ms
- linked-list.spec.ts-Head insertion operations: ~0.002 ms
- linked-list.spec.ts-Tail insertion operations: ~0.003 ms
- linked-list.spec.ts-Head removal operation: ~0.001 ms
- linked-list.spec.ts-Search operations: ~0.001 ms
- linked-list.spec.ts-LinkedList from array creation: ~0.1-0.5 ms
- linked-list.spec.ts-List reversal: ~0.002 ms
- linked-list.spec.ts-Large dataset insertion (10000 items): ~5.0-15.0 ms
- linked-list.spec.ts-Large dataset search: ~2.0-8.0 ms

## DoublyLinkedList Performance
- doubly-linked-list.spec.ts-DoublyLinkedList creation: ~0.001 ms
- doubly-linked-list.spec.ts-Head insertion operations: ~0.003 ms
- doubly-linked-list.spec.ts-Tail insertion operations: ~0.003 ms
- doubly-linked-list.spec.ts-Head/Tail removal operations: ~0.002 ms
- doubly-linked-list.spec.ts-Search operations: ~0.001 ms
- doubly-linked-list.spec.ts-DoublyLinkedList from array creation: ~0.1-0.5 ms
- doubly-linked-list.spec.ts-Large dataset insertion (10000 items): ~4.0-12.0 ms
- doubly-linked-list.spec.ts-Large dataset removal (5000 items): ~2.0-8.0 ms

## Queue Performance
- queue.spec.ts-Queue creation: ~0.001 ms
- queue.spec.ts-Enqueue/Dequeue operations: ~0.003 ms
- queue.spec.ts-Queue from array creation: ~0.1-0.5 ms
- queue.spec.ts-Large dataset enqueue (10000 items): ~3.0-8.0 ms
- queue.spec.ts-Large dataset dequeue (10000 items): ~2.0-6.0 ms

## BinaryTree Performance
- binary-tree.spec.ts-BinaryTree creation: ~0.001 ms
- binary-tree.spec.ts-Tree from array creation: ~0.1-0.5 ms
- binary-tree.spec.ts-BST insertion operations: ~0.003 ms
- binary-tree.spec.ts-Search operations: ~0.001 ms
- binary-tree.spec.ts-BFS traversal: ~0.002 ms
- binary-tree.spec.ts-DFS traversals: ~0.003 ms
- binary-tree.spec.ts-Deep copy creation: ~0.1-0.5 ms
- binary-tree.spec.ts-Tree to array conversion: ~0.1-0.3 ms
- binary-tree.spec.ts-Static fromArray creation: ~0.1-0.5 ms
- binary-tree.spec.ts-Large dataset insertion (1000 items): ~5.0-20.0 ms
- binary-tree.spec.ts-Large dataset traversal (1000 items): ~1.0-5.0 ms

## Heap Performance
- heap.spec.ts-MinHeap creation: ~0.001 ms
- heap.spec.ts-MinHeap insertion operations: ~0.003 ms
- heap.spec.ts-MinHeap extraction operations: ~0.005 ms
- heap.spec.ts-MinHeap buildHeap operation: ~0.002 ms
- heap.spec.ts-Large dataset insertion (5000 items): ~8.0-20.0 ms
- heap.spec.ts-Large dataset extraction (100 items): ~0.5-2.0 ms

## Trie Performance
- trie.spec.ts-Trie creation: ~0.001 ms
- trie.spec.ts-Trie insertion and search operations: ~0.005 ms
- trie.spec.ts-Prefix checking operations: ~0.002 ms
- trie.spec.ts-Word deletion operations: ~0.003 ms
- trie.spec.ts-Get all words operation: ~0.002 ms
- trie.spec.ts-Get words with prefix operations: ~0.003 ms
- trie.spec.ts-Trie from array creation: ~0.1-0.5 ms
- trie.spec.ts-Large dataset insertion (1000 words): ~5.0-15.0 ms
- trie.spec.ts-Large dataset search (100 words): ~1.0-5.0 ms

## PriorityQueue Performance
- priority-queue.spec.ts-MinPriorityQueue creation: ~0.001 ms
- priority-queue.spec.ts-MinPriorityQueue enqueue/dequeue operations: ~0.005 ms
- priority-queue.spec.ts-MinPriorityQueue from array creation: ~0.1-0.5 ms
- priority-queue.spec.ts-Large dataset enqueue (5000 items): ~10.0-25.0 ms
- priority-queue.spec.ts-Large dataset dequeue (100 items): ~0.5-2.0 ms

## Graph Performance
- graph.spec.ts-Graph creation: ~0.001 ms
- graph.spec.ts-Vertex/Edge addition operations: ~0.003 ms
- graph.spec.ts-BFS traversal: ~0.002 ms
- graph.spec.ts-DFS traversal: ~0.002 ms
- graph.spec.ts-Graph from edges creation: ~0.1-0.3 ms
- graph.spec.ts-Topological sort: ~0.003 ms
- graph.spec.ts-Large graph creation (1000 vertices): ~5.0-15.0 ms
- graph.spec.ts-Large graph BFS traversal: ~2.0-8.0 ms

## Notes
- All measurements are approximate and may vary based on system performance
- Measurements taken using `performance.now()` in bun:test environment
- Large dataset tests use 1000-10000 items to measure scalability
- Time complexity characteristics are maintained as expected for each data structure
- BST operations can degrade to O(n) in worst case (skewed tree)
- Linked list operations maintain O(1) for head operations, O(n) for tail operations in singly linked lists
- Doubly linked lists maintain O(1) for both head and tail operations
- Tree traversals are O(n) where n is the number of nodes
- Heap operations maintain O(log n) for insertion and extraction
- Trie operations are O(m) where m is the length of the word/prefix
- Priority queue operations maintain O(log n) for enqueue/dequeue
- Graph traversal operations are O(V + E) where V is vertices and E is edges
