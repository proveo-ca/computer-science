# Steps to solve a Dynamic Programming Problem | GeeksforGeeks
### Steps to solve a Dynamic programming problem:

1.  Identify if it is a Dynamic programming problem.
2.  Decide a state expression with the Least parameters.
3.  Formulate state and transition relationship.
4.  Apply tabulation or memorization.

### Step 1: How to classify a problem as a Dynamic Programming Problem? 

*   Typically, all the problems that require ****maximizing or minimizing**** certain quantities or counting problems that say to count the arrangements under certain conditions or certain probability problems can be solved by using Dynamic Programming.
*   All dynamic programming problems satisfy the ****overlapping subproblems**** property and most of the classic Dynamic programming problems also satisfy the ****optimal substructure**** property. Once we observe these properties in a given problem be sure that it can be solved using Dynamic Programming.

### Step 2: Deciding the state

Dynamic Programming problems are all about the ****state**** and its ****transition****. This is the most basic step which must be done very carefully because the state transition depends on the choice of state definition you make.

****State:****

> A state can be defined as the set of ****parameters**** that can uniquely identify a certain position or standing in the given problem. This set of parameters should be as small as possible to reduce state space. 

****Example:****  
Let's take the classic [****Knapsack problem****](https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/), where we need to maximize profit by selecting items within a weight limit. Here, we define our state using two parameters: ****index**** and ****weight**** ****(dp\[index\]\[weight\])****. Think of it like this: ****dp\[3\]\[10\]**** would tell us "what's the maximum profit we can make by choosing from the first 4 items (index 0 to 3) when our bag can hold 10 units of weight?" These two parameters (****index**** and ****weight****) work together to uniquely identify each subproblem we need to solve.

Just like GPS coordinates need both latitude and longitude to pinpoint a location, our knapsack solution needs both the item range and remaining capacity to determine the optimal profit at each step.

So, our next step will be to find a ****relation between**** ****previous states to reach the current state****. 

### Step 3: Formulating a relation among the states 

This part is the hardest part of solving a Dynamic Programming problem and requires a lot of intuition, observation, and practice.

****Example:**** 

Given 3 numbers {1, 3, 5}, The task is to tell the total number of ways we can form a number ****n**** using the ****sum**** of the given three numbers. (allowing repetitions and different arrangements).

> The total number of ways to form 6 is: 8  
> 1 + 1 + 1 + 1 + 1 + 1  
> 1 + 1 + 1 + 3  
> 1 + 1 + 3 + 1  
> 1 + 3 + 1 + 1  
> 3 + 1 + 1 + 1  
> 3 + 3  
> 1 + 5  
> 5 + 1

The steps to solve the given problem will be:

*   We decide a state for the given problem. 
*   We will take a parameter ****n**** to decide the state as it uniquely identifies any subproblem. 
*   DP state will look like ****state(n),**** state(n) means the total number of arrangements to form ****n**** by using {1, 3, 5} as elements. Derive a transition relation between any two states.
*   Now, we need to compute state(n). 

### ****How to Compute the state?**** 

As we can only use 1, 3, or 5 to form a given number ****n****. Let us assume that we know the result for n = 1, 2, 3, 4, 5, 6   
Let us say we know the result for:  
state (n = 1), state (n = 2), state (n = 3) ......... state (n = 6)   
Now, we wish to know the result of the state (n = 7). See, we can only add 1, 3, and 5. Now we can get a sum total of 7 in the following 3 ways:

> ****1) Adding 1 to all possible combinations of state (n = 6)****   
> Eg : \[(1 + 1 + 1 + 1 + 1 + 1) + 1\]   
> \[(1 + 1 + 1 + 3) + 1\]   
> \[(1 + 1 + 3 + 1) + 1\]   
> \[(1 + 3 + 1 + 1) + 1\]   
> \[(3 + 1 + 1 + 1) + 1\]   
> \[(3 + 3) + 1\]   
> \[(1 + 5) + 1\]   
> \[(5 + 1) + 1\] 
>
> ****2) Adding 3 to all possible combinations of state (n = 4);****  
> \[(1 + 1 + 1 + 1) + 3\]   
> \[(1 + 3) + 3\]   
> \[(3 + 1) + 3\] 
>
> ****3) Adding 5 to all possible combinations of state(n = 2)****   
> \[(1 + 1) + 5\]
>
> __(Note how it sufficient to add only on the right-side - all the add-from-left-side cases are covered, either in the same state, or another, e.g. \[1 + (1 + 1 + 1 + 3)\]  is not needed in state (n=6) because it's covered by state (n = 4) \[(1 + 1 + 1 + 1) + 3\])__
>
> Now, think carefully and satisfy yourself that the above three cases are covering all possible ways to form a sum total of 7;  
> Therefore, we can say that result for   
> state(7) = state (6) + state (4) + state (2)   
> OR  
> state(7) = state (7-1) + state (7-3) + state (7-5)  
> In general,   
> ****state(n) = state(n-1) + state(n-3) + state(n-5)****

Below is the implementation of the above approach:

C++`   ```
// C++ program to express
// n as sum of 1, 3, 5.
#include <bits/stdc++.h>
using namespace std;

// Returns the number of
// arrangements to form 'n'
int countWays(int n) {

// base case
if (n < 0)
return 0;
if (n == 0)  
return 1;

return countWays(n-1) + countWays(n-3) + countWays(n-5);
}

int main() {
int n = 7;
cout << countWays(n);
}

```
     `Java`   ```
// Java program to express
// n as sum of 1, 3, 5.

class GfG {

    // Returns the number of 
    // arrangements to form 'n' 
    static int countWays(int n) { 
        
        // base case
        if (n < 0) 
            return 0;
        if (n == 0)  
            return 1;  

        return countWays(n - 1) + countWays(n - 3) + countWays(n - 5);
    }    

    public static void main(String[] args) {
        int n = 7;
        System.out.println(countWays(n));
    }
}

```
     `Python`   ```
# Python program to express
# n as sum of 1, 3, 5.

# Returns the number of
# arrangements to form 'n'
def countWays(n):

    # base case
    if n < 0:
        return 0
    if n == 0:
        return 1

    return countWays(n - 1) + countWays(n - 3) + countWays(n - 5)

if __name__ == "__main__":
n = 7
print(countWays(n))

```
     `C#`   ```
// C# program to express
// n as sum of 1, 3, 5.

using System;

class GfG {

    // Returns the number of 
    // arrangements to form 'n' 
    static int countWays(int n) {
        
        // base case
        if (n < 0) 
            return 0;
        if (n == 0)  
            return 1;  

        return countWays(n - 1) + countWays(n - 3) + countWays(n - 5);
    }    

    static void Main(string[] args) {
        int n = 7;
        Console.WriteLine(countWays(n));
    }
}

```
     `JavaScript`   ```
// JavaScript program to express
// n as sum of 1, 3, 5.

// Returns the number of
// arrangements to form 'n'
function countWays(n) {

    // base case
    if (n < 0)
        return 0;
    if (n === 0)
        return 1;

    return countWays(n - 1) + countWays(n - 3) + countWays(n - 5);
}

let n = 7;
console.log(countWays(n));

```
     `

****Time Complexity:**** O(3^n), As at every stage we need to take three decisions and the height of the tree will be of the order of n.  
****Auxiliary Space:**** O(n), The extra space is used due to the recursion call stack.

The above code seems exponential as it is calculating the same state again and again. So, we just need to add ****memoization****. 

### Step 4: Adding memoization or tabulation for the state

This is the easiest part of a dynamic programming solution. We just need to store the state answer so that the next time that state is required, we can directly use it from our memory.

### ****Using Top-Down DP (Memoization)**** 

We break down the problem into smaller subproblems, where each subproblem corresponds to finding the number of ways to form a sum for a smaller value of 'n'. By utilizing previously computed results, we can avoid redundant calculations and build up the solution for larger values of 'n'.

C++`   ```
// C++ program to express
// n as sum of 1, 3, 5.
#include <bits/stdc++.h>
using namespace std;

int countRecur(int n, vector<int> &memo) {
    
    // base case
    if (n < 0) 
      return 0;
    if (n == 0)  
      return 1;  
      
    // If value is memoized
    if (memo[n] != -1) {
        return memo[n];
    }
    
    // Memoize the state 
    memo[n] = countRecur(n-1, memo) + 
    countRecur(n-3, memo) + countRecur(n-5, memo);    
   
   return memo[n];
}

// Returns the number of 
// arrangements to form 'n' 
int countWays(int n) { 
    
    vector<int> memo(n+1, -1);
    return countRecur(n, memo);
}    

int main() {
    int n = 7;
    cout << countWays(n);
}

```
     `Java`   ```
// Java program to express
// n as sum of 1, 3, 5.

import java.util.Arrays;

class GfG {

    static int countRecur(int n, int[] memo) {
        
        // base case
        if (n < 0) 
            return 0;
        if (n == 0)  
            return 1;  
        
        // If value is memoized
        if (memo[n] != -1) {
            return memo[n];
        }
        
        // Memoize the state 
        memo[n] = countRecur(n - 1, memo) + 
                  countRecur(n - 3, memo) + 
                  countRecur(n - 5, memo);    

        return memo[n];
    }

    // Returns the number of 
    // arrangements to form 'n' 
    static int countWays(int n) {
        int[] memo = new int[n + 1];
        Arrays.fill(memo, -1);
        return countRecur(n, memo);
    }

    public static void main(String[] args) {
        int n = 7;
        System.out.println(countWays(n));
    }
}

```
     `Python`   ```
# Python program to express
# n as sum of 1, 3, 5.

def countRecur(n, memo):
    
    # base case
    if n < 0:
        return 0
    if n == 0:
        return 1

    # If value is memoized
    if memo[n] != -1:
        return memo[n]

    # Memoize the state 
    memo[n] = countRecur(n - 1, memo) + \
              countRecur(n - 3, memo) + \
              countRecur(n - 5, memo)
    
    return memo[n]

# Returns the number of 
# arrangements to form 'n' 
def countWays(n):
    memo = [-1] * (n + 1)
    return countRecur(n, memo)

if __name__ == "__main__":
    n = 7
    print(countWays(n))

```
     `C#`   ```
// C# program to express
// n as sum of 1, 3, 5.

using System;

class GfG {

    static int countRecur(int n, int[] memo) {
        
        // base case
        if (n < 0) 
            return 0;
        if (n == 0)  
            return 1;  
        
        // If value is memoized
        if (memo[n] != -1) {
            return memo[n];
        }
        
        // Memoize the state 
        memo[n] = countRecur(n - 1, memo) + 
                  countRecur(n - 3, memo) + 
                  countRecur(n - 5, memo);    

        return memo[n];
    }

    // Returns the number of 
    // arrangements to form 'n' 
    static int countWays(int n) {
        int[] memo = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            memo[i] = -1;
        }
        return countRecur(n, memo);
    }

    static void Main(string[] args) {
        int n = 7;
        Console.WriteLine(countWays(n));
    }
}

```
     `JavaScript`   ```
// JavaScript program to express
// n as sum of 1, 3, 5.

function countRecur(n, memo) {

    // base case
    if (n < 0)
        return 0;
    if (n === 0)
        return 1;

    // If value is memoized
    if (memo[n] !== -1) {
        return memo[n];
    }

    // Memoize the state 
    memo[n] = countRecur(n - 1, memo) + 
              countRecur(n - 3, memo) + 
              countRecur(n - 5, memo);

    return memo[n];
}

// Returns the number of 
// arrangements to form 'n' 
function countWays(n) {
    let memo = Array(n + 1).fill(-1);
    return countRecur(n, memo);
}

let n = 7;
console.log(countWays(n));

```
     `

****Time Complexity:**** O(n), As at every stage we need to take three decisions and the height of the tree will be of the order of n.  
****Auxiliary Space:**** O(n + n), The extra space is used due to the recursion call stack and memo array of size n+1 is used to store the results of subproblems.

### Using Bottom-Up DP (Tabulation****)****

We define a DP array where each element dp\[i\] represents the number of ways to form the sum 'i'. Starting with the base case dp\[0\] = 1 (since there is exactly one way to form a sum of 0 - using no numbers), we iteratively calculate the number of ways to form each value from 1 to n.

C++`   ```
// C++ program to express
// n as sum of 1, 3, 5.
#include <bits/stdc++.h>
using namespace std;

// Returns the number of
// arrangements to form 'n'
int countWays(int n) {

    vector<int> dp(n + 1);

    dp[0] = 1;

    for (int i = 1; i <= n; i++) {
        dp[i] = 0;

        if (i - 1 >= 0)
            dp[i] += dp[i - 1];
        if (i - 3 >= 0)
            dp[i] += dp[i - 3];
        if (i - 5 >= 0)
            dp[i] += dp[i - 5];
    }

    return dp[n];
}

int main() {
int n = 7;
cout << countWays(n);
}

```
     `Java`   ```
// Java program to express
// n as sum of 1, 3, 5.

class GfG {

    // Returns the number of 
    // arrangements to form 'n' 
    static int countWays(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;

        for (int i = 1; i <= n; i++) {
            dp[i] = 0;

            if (i - 1 >= 0) dp[i] += dp[i - 1];
            if (i - 3 >= 0) dp[i] += dp[i - 3];
            if (i - 5 >= 0) dp[i] += dp[i - 5];
        }

        return dp[n];
    }

    public static void main(String[] args) {
        int n = 7;
        System.out.println(countWays(n));
    }
}

```
     `Python`   ```
# Python program to express
# n as sum of 1, 3, 5.

# Returns the number of
# arrangements to form 'n'
def countWays(n):
dp = [0] * (n + 1)
dp[0] = 1

    for i in range(1, n + 1):
        dp[i] = 0

        if i - 1 >= 0:
            dp[i] += dp[i - 1]
        if i - 3 >= 0:
            dp[i] += dp[i - 3]
        if i - 5 >= 0:
            dp[i] += dp[i - 5]

    return dp[n]

if __name__ == "__main__":
n = 7
print(countWays(n))

```
     `C#`   ```
// C# program to express
// n as sum of 1, 3, 5.

using System;

class GfG {

    // Returns the number of 
    // arrangements to form 'n' 
    static int countWays(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;

        for (int i = 1; i <= n; i++) {
            dp[i] = 0;

            if (i - 1 >= 0) dp[i] += dp[i - 1];
            if (i - 3 >= 0) dp[i] += dp[i - 3];
            if (i - 5 >= 0) dp[i] += dp[i - 5];
        }

        return dp[n];
    }

    static void Main(string[] args) {
        int n = 7;
        Console.WriteLine(countWays(n));
    }
}

```
     `JavaScript`   ```
// JavaScript program to express
// n as sum of 1, 3, 5.

// Returns the number of
// arrangements to form 'n'
function countWays(n) {
let dp = new Array(n + 1).fill(0);
dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        dp[i] = 0;

        if (i - 1 >= 0) dp[i] += dp[i - 1];
        if (i - 3 >= 0) dp[i] += dp[i - 3];
        if (i - 5 >= 0) dp[i] += dp[i - 5];
    }

    return dp[n];
}

let n = 7;
console.log(countWays(n));

```
     `

****Time Complexity:**** O(n), As we just need to make 3n function calls and there will be no repetitive calculations as we are returning previously calculated results.  
****Auxiliary Space:**** O(n), dp array of size n+1 is used to store the results of subproblems.

Please Refer to [Tabulation vs Memoization](https://www.geeksforgeeks.org/tabulation-vs-memoization/) to understand the difference between memoization and tabulation.

Dynamic Programming comes with lots of practice. One must try solving various classic DP problems that can be found [here](https://www.geeksforgeeks.org/dynamic-programming/). You may check the below problems first and try solving them using the above-described steps:-  


|S. No.|Problem           |Practice link|
|------|------------------|-------------|
|1     |Min Cost Path     |solve        |
|2     |Subset Sum Problem|solve        |
|3     |Coin Change       |solve        |
|4     |Edit Distance     |solve        |
|5     |Cutting a Rod     |solve        |


# Overlapping Subproblems Property in Dynamic Programming | DP-1 | GeeksforGeeks
Last Updated : 02 Sep, 2024

Dynamic Programming is an algorithmic paradigm that solves a given complex problem by breaking it into subproblems using recursion and storing the results of subproblems to avoid computing the same results again. Following are the two main properties of a problem that suggests that the given problem can be solved using Dynamic programming.

*   ****Overlapping Subproblems**** 
*   ****Optimal Substructure****

In this post, we will discuss the first property ****Overlapping Subproblems**** in detail. The second property of Dynamic programming is discussed in the next post.

****Overlapping Subproblems:****
--------------------------------

> Like Divide and Conquer, Dynamic Programming combines solutions to sub-problems. Dynamic Programming is mainly used when solutions to the same subproblems are needed again and again. In dynamic programming, computed solutions to subproblems are stored in a table so that these don’t have to be recomputed. So Dynamic Programming is not useful when there are no common (overlapping) subproblems because there is no point in storing the solutions if they are not needed again. For example, [Binary Search](https://www.geeksforgeeks.org/binary-search/) doesn’t have common subproblems. If we take the example of following a recursive program for Fibonacci Numbers, there are many subproblems that are solved again and again.

C++`   ```
#include <iostream>
using namespace std;

/* a simple recursive program for Fibonacci numbers */
int fib(int n)
{
if (n <= 1)
return n;

    return fib(n - 1) + fib(n - 2);
}

int main() {

    cout << fib(7);
    
    return 0;
}

// This code is contributed by sanjoy_62.

```
     `C`   ```
/* a simple recursive program for Fibonacci numbers */
int fib(int n)
{
    if (n <= 1)
        return n;

    return fib(n - 1) + fib(n - 2);
}

```
     `Java`   ```
/*package whatever //do not write package name here */
/* a simple recursive program for Fibonacci numbers */
static int fib(int n)
{
if (n <= 1)
return n;

    return fib(n - 1) + fib(n - 2);
}

// This code is contributed by umadevi9616

```
     `Python`   ```
#  a simple recursive program for Fibonacci numbers
def fib(n):
    if n <= 1:
        return n

    return fib(n - 1) + fib(n - 2)

```
     `C#`   ```
/* a simple recursive program for Fibonacci numbers */
static int fib(int n)
{
if (n <= 1)
return n;

    return fib(n - 1) + fib(n - 2);
}


// This code contributed by umadevi9616

```
     `JavaScript`   ```
<script>
/*package whatever //do not write package name here */
/* a simple recursive program for Fibonacci numbers */
function fib(n)
{
    if (n <= 1)
        return n;

    return fib(n - 1) + fib(n - 2);
}

// This code is contributed by gauravrajput1 
</script>

```
     `

****Time Complexity:**** O(2N)    
****Auxiliary Space:**** O(1)

### ****Illustration of Recursion tree for the execution of fib(5) :****                              

![](https://media.geeksforgeeks.org/wp-content/uploads/20220815013010/fibonaci.jpg)

Recursion tree for the execution of fib(5) 

We can see that the function fib(3) is being called 2 times. If we would have stored the value of fib(3), then instead of computing it again, we could have reused the old stored value. There are following two different ways to store the values so that these values can be reused: 

*   Memoization (Top Down) 
*   Tabulation (Bottom Up)

### ****Memoization (Top Down):**** 

> The memoized program for a problem is similar to the recursive version with a small modification that looks into a lookup table before computing solutions. We initialize a lookup array with all initial values as NIL. Whenever we need the solution to a subproblem, we first look into the lookup table. If the precomputed value is there then we return that value, otherwise, we calculate the value and put the result in the lookup table so that it can be reused later.

Following is the memoized version for the nth Fibonacci Number. 

C++`   ```
/* C++ program for Memoized version
for nth Fibonacci number */
#include <bits/stdc++.h>
using namespace std;
#define NIL -1
#define MAX 100

int lookup[MAX];

/* Function to initialize NIL
values in lookup table */
void _initialize()
{
int i;
for (i = 0; i < MAX; i++)
lookup[i] = NIL;
}

/* function for nth Fibonacci number */
int fib(int n)
{
if (lookup[n] == NIL) {
if (n <= 1)
lookup[n] = n;
else
lookup[n] = fib(n - 1) + fib(n - 2);
}

    return lookup[n];
}

// Driver code
int main()
{
int n = 40;
_initialize();
cout << "Fibonacci number is " << fib(n);
return 0;
}

// This is code is contributed by rathbhupendra

```
     `C`   ```
/* C program for Memoized version for nth Fibonacci number
 */
#include <stdio.h>
#define NIL -1
#define MAX 100

int lookup[MAX];

/* Function to initialize NIL values in lookup table */
void _initialize()
{
    int i;
    for (i = 0; i < MAX; i++)
        lookup[i] = NIL;
}

/* function for nth Fibonacci number */
int fib(int n)
{
    if (lookup[n] == NIL) {
        if (n <= 1)
            lookup[n] = n;
        else
            lookup[n] = fib(n - 1) + fib(n - 2);
    }

    return lookup[n];
}

int main()
{
    int n = 40;
    _initialize();
    printf("Fibonacci number is %d ", fib(n));
    return 0;
}

```
     `Java`   ```
/* Java program for Memoized version */
public class Fibonacci {
final int MAX = 100;
final int NIL = -1;

    int lookup[] = new int[MAX];

    /* Function to initialize NIL values in lookup table */
    void _initialize()
    {
        for (int i = 0; i < MAX; i++)
            lookup[i] = NIL;
    }

    /* function for nth Fibonacci number */
    int fib(int n)
    {
        if (lookup[n] == NIL) {
            if (n <= 1)
                lookup[n] = n;
            else
                lookup[n] = fib(n - 1) + fib(n - 2);
        }
        return lookup[n];
    }

    public static void main(String[] args)
    {
        Fibonacci f = new Fibonacci();
        int n = 40;
        f._initialize();
        System.out.println("Fibonacci number is"
                           + " " + f.fib(n));
    }
}
// This Code is Contributed by Saket Kumar

```
     `Python`   ```
# a program for Memoized version of nth Fibonacci number

# function to calculate nth Fibonacci number


def fib(n, lookup):

    # base case
    if n <= 1:
        lookup[n] = n

    # if the value is not calculated previously then calculate it
    if lookup[n] is None:
        lookup[n] = fib(n-1, lookup) + fib(n-2, lookup)

    # return the value corresponding to that value of n
    return lookup[n]
# end of function

# Driver program to test the above function


def main():
    n = 34
    # Declaration of lookup table
    # Handles till n = 100
    lookup = [None] * 101
    print "Fibonacci Number is ", fib(n, lookup)


if __name__ == "__main__":
    main()

# This code is contributed by Nikhil Kumar Singh(nickzuck_007)

```
     `C#`   ```
// C# program for Memoized versionof nth Fibonacci number
using System;

class GFG {

    static int MAX = 100;
    static int NIL = -1;
    static int[] lookup = new int[MAX];

    /* Function to initialize NIL
    values in lookup table */
    static void initialize()
    {
        for (int i = 0; i < MAX; i++)
            lookup[i] = NIL;
    }

    /* function for nth Fibonacci number */
    static int fib(int n)
    {
        if (lookup[n] == NIL) {
            if (n <= 1)
                lookup[n] = n;
            else
                lookup[n] = fib(n - 1) + fib(n - 2);
        }
        return lookup[n];
    }

    // Driver code
    public static void Main()
    {

        int n = 40;
        initialize();
        Console.Write("Fibonacci number is"
                      + " " + fib(n));
    }
}

// This Code is Contributed by Sam007

```
     `JavaScript`   ```
<script>

let  MAX = 100;
let NIL = -1;

let lookup = new Array(MAX);

function  _initialize()
{
    for (let i = 0; i < MAX; i++)
        lookup[i] = NIL;
}

function fib(n)
{
    if (lookup[n] == NIL)
    {
      if (n <= 1)
          lookup[n] = n;
      else
          lookup[n] = fib(n-1) + fib(n-2);
    }
    return lookup[n];
}


let n = 40;
_initialize();
document.write("Fibonacci number is" + " " + fib(n)+"<br>");

// This code is contributed by avanitrachhadiya2155
</script>

```
     `

**Output**

```
Fibonacci number is 102334155
```


****Time Complexity:**** O(N). This is because the algorithm computes each Fibonacci number only once and stores the result in an array for future use. Subsequent calls to the function with the same input value of n will retrieve the stored value from the lookup table, avoiding the need to recompute it. Therefore, the time complexity is linear, and the algorithm is very efficient for large values of n.

****Space Complexity:**** O(N) as lookup table has been created.

### ****Tabulation (Bottom Up):**** 

> The tabulated program for a given problem builds a table in a bottom-up fashion and returns the last entry from the table. For example, for the same Fibonacci number, we first calculate fib(0) then fib(1) then fib(2) then fib(3), and so on. So literally, we are building the solutions to subproblems bottom-up. 

Following is the tabulated version for the nth Fibonacci Number.

C++`   ```
/* C++ program for Tabulated version */

#include <iostream>
using namespace std;

int fib(int n)
{
int f[n + 1];
int i;
f[0] = 0;
f[1] = 1;
for (i = 2; i <= n; i++)
f[i] = f[i - 1] + f[i - 2];

    return f[n];
}

int main()
{
int n = 9;
printf("Fibonacci number is %d ", fib(n));
return 0;
}

```
     `C`   ```
/* C program for Tabulated version */
#include <stdio.h>
int fib(int n)
{
    int f[n + 1];
    int i;
    f[0] = 0;
    f[1] = 1;
    for (i = 2; i <= n; i++)
        f[i] = f[i - 1] + f[i - 2];

    return f[n];
}

int main()
{
    int n = 9;
    printf("Fibonacci number is %d ", fib(n));
    return 0;
}

```
     `Java`   ```
/* Java program for Tabulated version */
public class Fibonacci {
int fib(int n)
{
int f[] = new int[n + 1];
f[0] = 0;
f[1] = 1;
for (int i = 2; i <= n; i++)
f[i] = f[i - 1] + f[i - 2];
return f[n];
}

    public static void main(String[] args)
    {
        Fibonacci f = new Fibonacci();
        int n = 9;
        System.out.println("Fibonacci number is"
                           + " " + f.fib(n));
    }
}
// This Code is Contributed by Saket Kumar

```
     `Python`   ```
# Python program Tabulated (bottom up) version
def fib(n):

    # array declaration
    f = [0] * (n + 1)

    # base case assignment
    f[1] = 1

    # calculating the fibonacci and storing the values
    for i in xrange(2, n + 1):
        f[i] = f[i - 1] + f[i - 2]
    return f[n]

# Driver program to test the above function


def main():
    n = 9
    print "Fibonacci number is ", fib(n)


if __name__ == "__main__":
    main()

# This code is contributed by Nikhil Kumar Singh (nickzuck_007)

```
     `C#`   ```
// C# program for Tabulated version
using System;

class GFG {
static int fib(int n)
{
int[] f = new int[n + 1];
f[0] = 0;
f[1] = 1;
for (int i = 2; i <= n; i++)
f[i] = f[i - 1] + f[i - 2];
return f[n];
}

    public static void Main()
    {

        int n = 9;
        Console.Write("Fibonacci number is"
                      + " " + fib(n));
    }
}

// This Code is Contributed by Sam007

```
     `JavaScript`   ```
<script>

// Javascript program for Tabulated version
function fib(n)
{
    var f = new Array(n + 1);
    var i;
    
    f[0] = 0; 
    f[1] = 1;
    for(i = 2; i <= n; i++)
        f[i] = f[i - 1] + f[i - 2];
    
    return f[n];
}

// Driver code
var n = 9;
document.write("Fibonacci number is  " + fib(n));

// This code is contributed by akshitsaxenaa09

</script>

```
     `PHP`   ```
<?php
// PHP program for Tabulated version

function fib($n)
{
    $f[$n + 1]=0;
    $i;
    $f[0] = 0;
    $f[1] = 1; 
    for ($i = 2; $i <= $n; $i++)
        $f[$i] = $f[$i - 1] + 
                 $f[$i - 2];
    
    return $f[$n];
}

// Driver Code
$n = 9;
echo("Fibonacci number is "); 
echo(fib($n));

// This code is contributed by nitin mittal.
?>

```
     `

**Output**

```
Fibonacci number is 34
```


****Time Complexity:**** O(N)  
****Auxiliary Space:**** O(N)

# Optimal Substructure Property in Dynamic Programming | DP-2 | GeeksforGeeks
Last Updated : 01 Dec, 2024

The following are the two main properties of a problem that suggest that the given problem can be solved using ****Dynamic programming****: 

1) Overlapping Subproblems   
2) Optimal Substructure 

We have already discussed the [Overlapping Subproblem property](https://www.geeksforgeeks.org/overlapping-subproblems-property-in-dynamic-programming-dp-1/). Let us discuss the Optimal Substructure property here. 

In Dynamic  programming, the ideal base property alludes to the way that an ideal answer for an issue can be built from ideal answers for subproblems. This property is utilized to plan dynamic programming calculations that tackle streamlining issues by separating them into more modest subproblems and afterward consolidating the answers for those subproblems to get an answer for the first issue.  
For instance, think about the issue of tracking down the most brief way between two focuses in a diagram. 

On the off chance that we apply dynamic programming to this issue, we can characterize the subproblems as the briefest ways between halfway focuses on the chart, and afterward utilize the answers for those subproblems to build an answer for the first issue.  
To show this thought all the more officially, we should assume we disapprove of an ideal arrangement S\* and a bunch of subproblems S1, S2, ..., Sn. On the off chance that the ideal answer for the issue can be developed from the ideal answers for the subproblems, then the issue displays the ideal base property.

****Optimal Substructure:****

A given problem is said to have ****Optimal Substructure Property**** if the optimal solution of the given problem can be obtained by using the optimal solution to its subproblems instead of trying every possible way to solve the subproblems. 

****Example:**** The Shortest Path problem has the following optimal substructure property: 

If node x lies in the shortest path from a source node ****U**** to destination node ****V**** then the shortest path from ****U**** to ****V**** is a combination of the shortest path from ****U**** to ****X**** and the shortest path from ****X**** to ****V****. The standard All Pair Shortest Path algorithm like [Floyd–Warshall](https://www.geeksforgeeks.org/dynamic-programming-set-16-floyd-warshall-algorithm/) and ****Single Source Shortest path**** algorithm for negative weight edges like [Bellman–Ford](https://www.geeksforgeeks.org/dynamic-programming-set-23-bellman-ford-algorithm/) are typical examples of ****Dynamic Programming****.   
On the other hand, the Longest Path problem doesn't have the Optimal Substructure property. Here by Longest Path, we mean the longest simple path (path without cycle) between two nodes. Consider the following unweighted graph given in the ****CLRS**** book. There are two longest paths from q to t: q?r?t and q?s?t. Unlike shortest paths, these longest paths do not have the optimal substructure property. ****For example,**** The longest path q?r?t is not a combination of the longest path from q to r and the longest path from r to t, because the longest path from q to r is q?s?t?r and the longest path from r to t is r?q?s?t.   
 

![](https://media.geeksforgeeks.org/wp-content/cdn-uploads/LongestPath.gif)

#### Some Standard problems having optimal substructure are:


|S. No.|Article                                      |Practice Problem|
|------|---------------------------------------------|----------------|
|1     |Longest Common Subsequence                   |solve           |
|2     |Count ways to reach the n'th stair           |solve           |
|3     |Coin Change                                  |solve           |
|4     |Edit Distance | DP-5 - GeeksforGeeks         |solve           |
|5     |Cutting a Rod                                |solve           |
|6     |Program for Fibonacci numbers - GeeksforGeeks|solve           |


The above problems can be solved optimally using ****Dynamic programming**** as each of these problems have an optimal substructure****,**** On the other hand, there are some problems that need to be solved by trying all possible solutions one such problem is [Rat in a Maze](https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/) problem. In these types of problems, the optimal solution for subproblems may not surely give the solution to the entire problem. In [Rat in a Maze](https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/) problem, all paths need to be explored to find out the final path from the source that leads to the destination. Thus in these problems, Recursion and Backtracking are the way to go.
