# Coding Conventions and Process

This document outlines the process for converting LeetCode-style problem descriptions into well-structured code files with test cases.

## Process for Converting Problem Markdown to JavaScript Implementation

1. **Reformat the Markdown file**:
   - Convert the problem description to a more readable format with proper Markdown syntax.
   - Use headers, code blocks, and lists for better organization.
   - All code is expected to be in JavaScript. Encapsulate snippets, or values and variable references in backticks "`".
   - Maintain all the original information including examples, constraints, and follow-up questions.

2. **Create a JavaScript file with the same base name**:
   - Define the function signature with JSDoc comments.
   - Include parameter types and return type.
   - Leave the function body empty. DO NOT SOLVE IT.
   - Add a hint for the solution; identify the needed algorithm and move the .md and the .js into the algorithm's folder (if multiple algorithms solve the problem, choose the algorithm with the optimal solution), and include a verified link to geeksforgeeks.org, e.g:
      > `// https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/`

3. **Write unit tests**:
   - Create at least 5 test cases:
     - 1 simple example from the problem description.
     - 4 boundary test cases (nulls, empty arrays, edge cases, etc.).
   - Include assertions to verify the function works correctly.
   - Add a test runner function to execute all tests.

## Test Case Guidelines

When writing test cases, follow these guidelines:

1. **Simple Example Test**: Use all the examples from the problem description.

2. **Boundary Tests**: Include tests for:
   - Empty inputs.
   - Maximum/minimum allowed values.
   - Edge cases specific to the problem.
   - Null or undefined inputs (if applicable).
   - Special cases that might cause errors.

3. **Test Structure**:
   - Each test should be in its own function.
   - Include clear assertions with descriptive error messages.
   - Use native node: `console.assert`, `utils.consoleDiff(actual, expected)` or a similar mechanism for verification.
   - Add comments explaining the purpose of each test.

## Code Style

- Use ES6+ JavaScript features.
- Include proper JSDoc comments for all functions.
- Follow consistent indentation of 2 spaces.
- Use meaningful variable names.
- Import utility functions as needed (e.g., consoleDiff for test output).

## Example

See the implementation of problems like "88-merge-sorted-array.js" and "27-remove-element.js" for examples of this convention in practice.
