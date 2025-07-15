# Data Structures Performance Tracking

This file tracks performance measurements for all data structure implementations and their unit tests.

## Performance Format

`unit-file-test: x ms`

## Measurements

### Example Template

```
datastructure.spec.ts: 0.000 ms
- Insert operations: 0.000 ms
- Large dataset insertion (10000 items): 0.000 ms
```

### Actual Measurements

(Performance data will be recorded here as tests are run)

## Benchmarking Guidelines

- All measurements in milliseconds using performance.now()
- Include operation type and data size
- Test with small (100), medium (1000), and large (10000+) datasets
- Record both individual operations and bulk operations
- Compare against native JavaScript implementations where applicable

## Performance Targets

- Basic operations (insert/delete/search): < 1ms for datasets under 1000 items
- Bulk operations: < 100ms for 10000 items
- Memory-efficient implementations preferred
- Logarithmic or better time complexity for search operations
