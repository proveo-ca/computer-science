/**
 * Trie Node Implementation
 * Time Complexity: O(1) - all basic operations
 * Space Complexity: O(1) - constant space per node
 */
export class TrieNode {
  public children: Map<string, TrieNode>;
  public isEndOfWord: boolean;
  public data?: any; // Optional data storage

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }

  /**
   * Check if this node has a child for the given character
   * @param char - character to check
   * @returns true if child exists
   */
  hasChild(char: string): boolean {
    return this.children.has(char);
  }

  /**
   * Get the child node for the given character
   * @param char - character to get child for
   * @returns child node or undefined
   */
  getChild(char: string): TrieNode | undefined {
    return this.children.get(char);
  }

  /**
   * Set a child node for the given character
   * @param char - character to set child for
   * @param node - child node to set
   */
  setChild(char: string, node: TrieNode): void {
    this.children.set(char, node);
  }

  /**
   * Remove a child node for the given character
   * @param char - character to remove child for
   * @returns true if child was removed
   */
  removeChild(char: string): boolean {
    return this.children.delete(char);
  }

  /**
   * Get all child characters
   * @returns array of child characters
   */
  getChildChars(): string[] {
    return Array.from(this.children.keys());
  }

  /**
   * Check if this node has any children
   * @returns true if node has children
   */
  hasChildren(): boolean {
    return this.children.size > 0;
  }

  /**
   * Get the number of children
   * @returns number of children
   */
  getChildCount(): number {
    return this.children.size;
  }

  /**
   * Mark this node as end of word
   * @param data - optional data to store
   */
  markAsEndOfWord(data?: any): void {
    this.isEndOfWord = true;
    if (data !== undefined) {
      this.data = data;
    }
  }

  /**
   * Unmark this node as end of word
   */
  unmarkAsEndOfWord(): void {
    this.isEndOfWord = false;
    this.data = undefined;
  }

  /**
   * Get string representation of the node
   * @returns string representation
   */
  toString(): string {
    return `TrieNode(children: ${this.getChildCount()}, isEndOfWord: ${
      this.isEndOfWord
    })`;
  }
}
