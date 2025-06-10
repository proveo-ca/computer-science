#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { createInterface } from 'readline';

/**
 * Markdown Parser - Enhances plain text/markdown with intelligent inference
 * 
 * Features:
 * - Detects and formats headings
 * - Identifies and formats lists
 * - Detects code blocks
 * - Wraps variable names in inline code blocks
 * - Converts URLs to markdown links
 */

class MarkdownParser {
  constructor() {
    this.variablePattern = /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g;
    this.urlPattern = /(https?:\/\/[^\s]+)/g;
    this.codeKeywords = new Set([
      'function', 'const', 'let', 'var', 'class', 'import', 'export',
      'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'throw'
    ]);
  }

  /**
   * Parse a file and enhance it with markdown formatting
   */
  parseFile(inputPath, outputPath) {
    try {
      const content = fs.readFileSync(inputPath, 'utf8');
      const enhanced = this.parseContent(content);
      
      if (outputPath) {
        fs.writeFileSync(outputPath, enhanced);
        console.log(`Enhanced markdown written to: ${outputPath}`);
      } else {
        console.log(enhanced);
      }
    } catch (error) {
      console.error(`Error processing file: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Parse content string and return enhanced markdown
   */
  parseContent(content) {
    const lines = content.split('\n');
    const result = [];
    let inCodeBlock = false;
    let codeBlockBuffer = [];
    let codeBlockLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Handle existing code blocks
      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          // End of code block
          result.push('```' + codeBlockLanguage);
          result.push(...codeBlockBuffer);
          result.push('```');
          inCodeBlock = false;
          codeBlockBuffer = [];
          codeBlockLanguage = '';
        } else {
          // Start of code block
          inCodeBlock = true;
          codeBlockLanguage = trimmed.substring(3);
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockBuffer.push(line);
        continue;
      }

      // Detect and format headings
      if (this.isHeading(line)) {
        result.push(this.formatHeading(line));
        continue;
      }

      // Detect and format lists
      if (this.isList(line)) {
        result.push(this.formatList(line));
        continue;
      }

      // Detect code blocks (multiple lines of code-like content)
      if (this.isCodeLine(line) && i < lines.length - 1) {
        const codeBlock = this.extractCodeBlock(lines, i);
        if (codeBlock.lines.length > 1) {
          result.push('```javascript');
          result.push(...codeBlock.lines);
          result.push('```');
          i = codeBlock.endIndex;
          continue;
        }
      }

      // Process regular text lines
      result.push(this.enhanceTextLine(line));
    }

    return result.join('\n');
  }

  /**
   * Check if line looks like a heading
   */
  isHeading(line) {
    const trimmed = line.trim();
    
    // Already formatted heading
    if (trimmed.startsWith('#')) {
      return false;
    }

    // Check if next line is underline (= or -)
    // This would need context of next line, simplified for now
    
    // Heuristics for heading detection
    return (
      trimmed.length > 0 &&
      !trimmed.includes('.') &&
      !trimmed.includes(',') &&
      trimmed === trimmed.toUpperCase() ||
      (trimmed.endsWith(':') && trimmed.length < 50)
    );
  }

  /**
   * Format a line as a heading
   */
  formatHeading(line) {
    const trimmed = line.trim();
    
    if (trimmed === trimmed.toUpperCase() && trimmed.length < 30) {
      return `# ${trimmed}`;
    } else if (trimmed.endsWith(':')) {
      return `## ${trimmed.slice(0, -1)}`;
    }
    
    return `## ${trimmed}`;
  }

  /**
   * Check if line is a list item
   */
  isList(line) {
    const trimmed = line.trim();
    
    // Already formatted list
    if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
      return false;
    }

    // Only detect explicit list markers, not indented text
    return (
      trimmed.startsWith('• ') ||
      /^\d+\.\s/.test(trimmed)
    );
  }

  /**
   * Format a line as a list item
   */
  formatList(line) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('• ')) {
      return line.replace('• ', '- ');
    }
    
    if (/^\d+\.\s/.test(trimmed)) {
      return line;
    }
    
    return line;
  }

  /**
   * Check if line looks like code
   */
  isCodeLine(line) {
    const trimmed = line.trim();
    
    // Already in code block
    if (trimmed.startsWith('`')) {
      return false;
    }

    return (
      trimmed.includes('function ') ||
      trimmed.includes('const ') ||
      trimmed.includes('let ') ||
      trimmed.includes('var ') ||
      trimmed.includes('class ') ||
      trimmed.includes('import ') ||
      trimmed.includes('export ') ||
      trimmed.includes('return ') ||
      trimmed.includes('{') ||
      trimmed.includes('}') ||
      trimmed.includes(';') ||
      /^\s*\/\//.test(trimmed) ||
      /^\s*\/\*/.test(trimmed)
    );
  }

  /**
   * Extract a code block starting from given index
   */
  extractCodeBlock(lines, startIndex) {
    const codeLines = [];
    let i = startIndex;
    
    while (i < lines.length && (this.isCodeLine(lines[i]) || lines[i].trim() === '')) {
      codeLines.push(lines[i]);
      i++;
    }
    
    // Remove trailing empty lines
    while (codeLines.length > 0 && codeLines[codeLines.length - 1].trim() === '') {
      codeLines.pop();
    }
    
    return {
      lines: codeLines,
      endIndex: i - 1
    };
  }

  /**
   * Enhance a text line with inline formatting
   */
  enhanceTextLine(line) {
    let enhanced = line;
    
    // Convert URLs to links
    enhanced = enhanced.replace(this.urlPattern, '[$1]($1)');
    
    // Wrap potential variable names in backticks
    enhanced = this.wrapVariableNames(enhanced);
    
    return enhanced;
  }

  /**
   * Wrap variable names in inline code blocks
   */
  wrapVariableNames(text) {
    // Don't process if already contains backticks or is already a link
    if (text.includes('`') || text.includes('[') || text.includes('](')) {
      return text;
    }

    return text.replace(this.variablePattern, (match) => {
      // Don't wrap common English words
      const commonWords = new Set([
        'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
        'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before',
        'after', 'above', 'below', 'between', 'among', 'this', 'that', 'these',
        'those', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
        'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
        'may', 'might', 'must', 'can', 'cannot', 'a', 'an', 'as', 'if', 'when',
        'where', 'why', 'how', 'what', 'which', 'who', 'whom', 'whose', 'all',
        'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
        'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very'
      ]);

      if (commonWords.has(match.toLowerCase())) {
        return match;
      }

      // Wrap if it looks like a variable name or code keyword
      if (this.codeKeywords.has(match) || /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(match)) {
        return `\`${match}\``;
      }

      return match;
    });
  }
}

/**
 * Prompt user for input using readline
 */
function prompt(question) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * CLI interface
 */
async function main() {
  const args = process.argv.slice(2);
  
  let inputFile = args[0];
  let outputFile = args[1];

  // Prompt for input file if not provided
  if (!inputFile) {
    console.log(`
Usage: node md-parser.js <input-file> [output-file]

Examples:
  node md-parser.js input.txt output.md
  node md-parser.js input.md  # outputs to console
    `);
    
    inputFile = await prompt('Enter input file path: ');
    
    if (!inputFile) {
      console.error('Error: Input file path is required.');
      process.exit(1);
    }
  }

  // Prompt for output file if not provided
  if (!outputFile) {
    const defaultOutput = inputFile.replace(/\.(txt|md)$/, '') + '.enhanced.md';
    outputFile = await prompt(`Enter output file path (or press Enter for '${defaultOutput}'): `);
    
    if (!outputFile) {
      outputFile = defaultOutput;
    }
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`Error: Input file '${inputFile}' does not exist.`);
    process.exit(1);
  }

  const parser = new MarkdownParser();
  parser.parseFile(inputFile, outputFile);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { MarkdownParser };
