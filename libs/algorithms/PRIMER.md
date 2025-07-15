# Algorithms

## Hashing
Hashing is a technique used to map data of arbitrary size to fixed-size values, called `hash` values or `hash codes`, using a `hash` function. It is widely used in computer science for quick data retrieval and efficient storage.

#### Terminology
* **Key:** The input value to the hash function.
* **Hash Value:** The output of the hash function.
* **Bucket:** The location in the hash table where the key-value pair is stored.
* **Load Factor:** The ratio of the number of elements to the table size.

#### Collision resolution techniques
1. **Chaining:** Uses `linked lists` to store multiple elements in the same bucket. Each bucket points to a `linked list` of elements with the same `hash` value.

2. **Open Addressing:** All elements are stored directly in the `hash` table. On collision, the algorithm probes the table to find an empty slot. 

Probing Techniques:
* **Linear Probing:** Search sequentially for the next available slot. `index = (hash + i) % table_size`
* **Quadratic Probing:** Use quadratic intervals to find the next slot. `index = (hash + i^2) % table_size`
* **Double Hashing:** Use a second hash function to find the next slot. `index = (hash1 + i * hash2) % table_size`
