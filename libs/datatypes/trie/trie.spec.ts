import { describe, test, expect } from 'bun:test';
import { Trie } from './trie';

describe('Trie', () => {
  test('should create an empty trie', () => {
    const startTime = performance.now();
    const trie = new Trie();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(trie.isEmpty()).toBe(true);
    expect(trie.size()).toBe(0);

    console.log(`Trie creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should insert and search words correctly', () => {
    const trie = new Trie();

    const startTime = performance.now();
    trie.insert('cat');
    trie.insert('car');
    trie.insert('card');
    trie.insert('care');
    trie.insert('careful');
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(trie.size()).toBe(5);
    expect(trie.search('cat')).toBe(true);
    expect(trie.search('car')).toBe(true);
    expect(trie.search('card')).toBe(true);
    expect(trie.search('care')).toBe(true);
    expect(trie.search('careful')).toBe(true);
    expect(trie.search('ca')).toBe(false);
    expect(trie.search('cards')).toBe(false);

    console.log(
      `Trie insertion and search operations: ${executionTime.toFixed(3)} ms`
    );
  });

  test('should check prefixes correctly', () => {
    const trie = new Trie();
    trie.insert('cat');
    trie.insert('car');
    trie.insert('card');

    const startTime = performance.now();
    const hasPrefix1 = trie.startsWith('ca');
    const hasPrefix2 = trie.startsWith('car');
    const hasPrefix3 = trie.startsWith('dog');
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(hasPrefix1).toBe(true);
    expect(hasPrefix2).toBe(true);
    expect(hasPrefix3).toBe(false);

    console.log(`Prefix checking operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should delete words correctly', () => {
    const trie = new Trie();
    trie.insert('cat');
    trie.insert('car');
    trie.insert('card');

    const startTime = performance.now();
    const deleted1 = trie.delete('car');
    const deleted2 = trie.delete('dog');
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(deleted1).toBe(true);
    expect(deleted2).toBe(false);
    expect(trie.size()).toBe(2);
    expect(trie.search('car')).toBe(false);
    expect(trie.search('cat')).toBe(true);
    expect(trie.search('card')).toBe(true);

    console.log(`Word deletion operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should get all words correctly', () => {
    const trie = new Trie();
    const words = ['cat', 'car', 'card', 'care', 'careful'];

    for (const word of words) {
      trie.insert(word);
    }

    const startTime = performance.now();
    const allWords = trie.getAllWords();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(allWords.sort()).toEqual(words.sort());

    console.log(`Get all words operation: ${executionTime.toFixed(3)} ms`);
  });

  test('should get words with prefix correctly', () => {
    const trie = new Trie();
    trie.insert('cat');
    trie.insert('car');
    trie.insert('card');
    trie.insert('care');
    trie.insert('careful');
    trie.insert('dog');

    const startTime = performance.now();
    const carWords = trie.getWordsWithPrefix('car');
    const caWords = trie.getWordsWithPrefix('ca');
    const dogWords = trie.getWordsWithPrefix('dog');
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(carWords.sort()).toEqual(['car', 'card', 'care', 'careful']);
    expect(caWords.sort()).toEqual(['car', 'card', 'care', 'careful', 'cat']);
    expect(dogWords).toEqual(['dog']);

    console.log(
      `Get words with prefix operations: ${executionTime.toFixed(3)} ms`
    );
  });

  test('should handle data storage', () => {
    const trie = new Trie();

    trie.insert('cat', { meaning: 'feline animal' });
    trie.insert('car', { meaning: 'vehicle' });

    expect(trie.getData('cat')).toEqual({ meaning: 'feline animal' });
    expect(trie.getData('car')).toEqual({ meaning: 'vehicle' });
    expect(trie.getData('dog')).toBeUndefined();
  });

  test('should create from array correctly', () => {
    const words = ['apple', 'app', 'application', 'apply'];

    const startTime = performance.now();
    const trie = Trie.fromArray(words);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(trie.size()).toBe(4);
    for (const word of words) {
      expect(trie.search(word)).toBe(true);
    }

    console.log(`Trie from array creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should handle edge cases', () => {
    const trie = new Trie();

    expect(trie.search('')).toBe(false);
    expect(trie.startsWith('')).toBe(true);
    expect(trie.delete('')).toBe(false);

    trie.insert('');
    expect(trie.search('')).toBe(false); // Empty string should not be inserted
  });

  test('performance with large dataset', () => {
    const trie = new Trie();
    const words: string[] = [];

    // Generate test words
    for (let i = 0; i < 1000; i++) {
      words.push(`word${i}`);
    }

    const startTime = performance.now();
    for (const word of words) {
      trie.insert(word);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(trie.size()).toBe(1000);

    console.log(
      `Large dataset insertion (1000 words): ${executionTime.toFixed(3)} ms`
    );

    const searchStartTime = performance.now();
    let found = 0;
    for (let i = 0; i < 100; i++) {
      if (trie.search(`word${i}`)) {
        found++;
      }
    }
    const searchEndTime = performance.now();
    const searchExecutionTime = searchEndTime - searchStartTime;

    expect(found).toBe(100);

    console.log(
      `Large dataset search (100 words): ${searchExecutionTime.toFixed(3)} ms`
    );
  });
});
