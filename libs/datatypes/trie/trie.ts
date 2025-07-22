import { TrieNode } from '../trie-node/trie-node';

/**
 * Trie (Prefix Tree) Implementation
 * Time Complexity: O(m) - insert, search, delete, startsWith (where m is word length)
 * Space Complexity: O(n*m) - where n is number of words and m is average word length
 */
export class Trie {
  private root: TrieNode;
  private _size: number;

  constructor() {
    this.root = new TrieNode();
    this._size = 0;
  }

  /**
   * Get the current size of the trie (number of words)
   * @returns number of words in the trie
   */
  size(): number {
    return this._size;
  }

  /**
   * Check if the trie is empty
   * @returns true if trie is empty
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Insert a word into the trie
   * @param word - word to insert
   * @param data - optional data to associate with the word
   */
  insert(word: string, data?: any): void {
    if (!word) return;

    let current = this.root;

    for (const char of word) {
      if (!current.hasChild(char)) {
        current.setChild(char, new TrieNode());
      }
      current = current.getChild(char)!;
    }

    if (!current.isEndOfWord) {
      this._size++;
    }
    current.markAsEndOfWord(data);
  }

  /**
   * Search for a word in the trie
   * @param word - word to search for
   * @returns true if word exists
   */
  search(word: string): boolean {
    if (!word) return false;

    const node = this.findNode(word);
    return node !== null && node.isEndOfWord;
  }

  /**
   * Check if any word in the trie starts with the given prefix
   * @param prefix - prefix to check
   * @returns true if prefix exists
   */
  startsWith(prefix: string): boolean {
    if (!prefix) return true;

    return this.findNode(prefix) !== null;
  }

  /**
   * Delete a word from the trie
   * @param word - word to delete
   * @returns true if word was deleted
   */
  delete(word: string): boolean {
    if (!word || !this.search(word)) {
      return false;
    }

    this.deleteHelper(this.root, word, 0);
    this._size--;
    return true;
  }

  /**
   * Helper method for deletion
   * @param node - current node
   * @param word - word to delete
   * @param index - current character index
   * @returns true if current node should be deleted
   */
  private deleteHelper(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      // We've reached the end of the word
      if (!node.isEndOfWord) {
        return false; // Word doesn't exist
      }

      node.unmarkAsEndOfWord();

      // If node has no children, it can be deleted
      return !node.hasChildren();
    }

    const char = word[index];
    const childNode = node.getChild(char);

    if (!childNode) {
      return false; // Word doesn't exist
    }

    const shouldDeleteChild = this.deleteHelper(childNode, word, index + 1);

    if (shouldDeleteChild) {
      node.removeChild(char);

      // Return true if current node should be deleted
      // (no children and not end of another word)
      return !node.isEndOfWord && !node.hasChildren();
    }

    return false;
  }

  /**
   * Find the node corresponding to a given prefix/word
   * @param prefix - prefix to find
   * @returns the node or null if not found
   */
  private findNode(prefix: string): TrieNode | null {
    let current = this.root;

    for (const char of prefix) {
      if (!current.hasChild(char)) {
        return null;
      }
      current = current.getChild(char)!;
    }

    return current;
  }

  /**
   * Get all words in the trie
   * @returns array of all words
   */
  getAllWords(): string[] {
    const words: string[] = [];
    this.getAllWordsHelper(this.root, '', words);
    return words;
  }

  /**
   * Helper method to get all words
   * @param node - current node
   * @param prefix - current prefix
   * @param words - array to store words
   */
  private getAllWordsHelper(
    node: TrieNode,
    prefix: string,
    words: string[]
  ): void {
    if (node.isEndOfWord) {
      words.push(prefix);
    }

    for (const char of node.getChildChars()) {
      this.getAllWordsHelper(node.getChild(char)!, prefix + char, words);
    }
  }

  /**
   * Get all words that start with the given prefix
   * @param prefix - prefix to search for
   * @returns array of words with the prefix
   */
  getWordsWithPrefix(prefix: string): string[] {
    const node = this.findNode(prefix);
    if (!node) {
      return [];
    }

    const words: string[] = [];
    this.getAllWordsHelper(node, prefix, words);
    return words;
  }

  /**
   * Get data associated with a word
   * @param word - word to get data for
   * @returns data associated with the word or undefined
   */
  getData(word: string): any {
    const node = this.findNode(word);
    return node && node.isEndOfWord ? node.data : undefined;
  }

  /**
   * Clear all words from the trie
   */
  clear(): void {
    this.root = new TrieNode();
    this._size = 0;
  }

  /**
   * Create a trie from an array of words
   * @param words - array of words to insert
   * @returns new Trie instance
   */
  static fromArray(words: string[]): Trie {
    const trie = new Trie();
    for (const word of words) {
      trie.insert(word);
    }
    return trie;
  }

  /**
   * Get string representation of the trie
   * @returns string representation
   */
  toString(): string {
    return `Trie(${this._size} words): [${this.getAllWords().join(', ')}]`;
  }
}
