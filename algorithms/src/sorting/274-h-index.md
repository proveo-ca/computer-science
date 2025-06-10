# 274. H-Index

## Difficulty: Medium

## Description

Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their ith paper, return the researcher's h-index.

According to the definition of h-index on Geek for Geeks: 
> Given an array `citations[]` of size `n` such that `citations[i]` is the number of citations a researcher received for ith paper, the task is to find the H-index. `H-index(H)` is the largest value such that the researcher has published at least H papers that have been cited at least H times.

> 'H' stands for Hirsch index as it was proposed by the J.E. Hirsch in 2005. The H-index is defined as the author-level metric that attempts to measure both the productivity and the citation impact of the publication of the scientist or the scholar.

## Examples

### Example 1:

**Input:** `citations = [3,0,6,1,5]`
**Output:** `3`
**Explanation:** `[3,0,6,1,5]` means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively. Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.

### Example 2:

**Input:** `citations = [1,3,1]`
**Output:** `1`

## Constraints:

- `n == citations.length`
- `1 <= n <= 5000`
- `0 <= citations[i] <= 1000`

