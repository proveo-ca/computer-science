import { describe, test, expect } from 'bun:test';
import { Stack } from './stack';

describe('Stack', () => {
  test('should create an empty stack', () => {
    const startTime = performance.now();
    const stack = new Stack<number>();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
    expect(stack.peek()).toBeUndefined();

    console.log(`Stack creation: ${executionTime.toFixed(3)} ms`);
  });

  test('should push and pop elements correctly', () => {
    const stack = new Stack<string>();

    const startTime = performance.now();
    stack.push('first');
    stack.push('second');
    stack.push('third');
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(stack.size()).toBe(3);
    expect(stack.peek()).toBe('third');

    expect(stack.pop()).toBe('third');
    expect(stack.pop()).toBe('second');
    expect(stack.size()).toBe(1);
    expect(stack.peek()).toBe('first');

    console.log(`Push/Pop operations: ${executionTime.toFixed(3)} ms`);
  });

  test('should throw error when popping from empty stack', () => {
    const stack = new Stack<number>();

    expect(() => stack.pop()).toThrow('Stack is empty - cannot pop');
  });

  test('should clear stack correctly', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    stack.clear();

    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
    expect(stack.peek()).toBeUndefined();
  });

  test('should convert to array correctly', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    const array = stack.toArray();

    expect(array).toEqual(expect.arrayContaining([3, 2, 1])); // Top to bottom
  });

  test('should create stack from array', () => {
    const items = [1, 2, 3, 4, 5];

    const startTime = performance.now();
    const stack = Stack.fromArray(items);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(stack.size()).toBe(5);
    expect(stack.peek()).toBe(5);
    expect(stack.pop()).toBe(5);
    expect(stack.pop()).toBe(4);

    console.log(`Stack from array creation: ${executionTime.toFixed(3)} ms`);
  });

  test('performance with large dataset', () => {
    const stack = new Stack<number>();
    const dataSize = 10000;

    const startTime = performance.now();
    for (let i = 0; i < dataSize; i++) {
      stack.push(i);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(stack.size()).toBe(dataSize);
    expect(stack.peek()).toBe(dataSize - 1);

    console.log(
      `Large dataset push (${dataSize} items): ${executionTime.toFixed(3)} ms`
    );

    const popStartTime = performance.now();
    for (let i = 0; i < dataSize; i++) {
      stack.pop();
    }
    const popEndTime = performance.now();
    const popExecutionTime = popEndTime - popStartTime;

    expect(stack.isEmpty()).toBe(true);

    console.log(
      `Large dataset pop (${dataSize} items): ${popExecutionTime.toFixed(3)} ms`
    );
  });

  test('should handle initial capacity', () => {
    const stack = new Stack<number>(100);

    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);

    stack.push(42);
    expect(stack.peek()).toBe(42);
  });
});
