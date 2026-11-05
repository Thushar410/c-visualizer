/**
 * C-Viz Engine — Full University Lab Exam Edition
 * Covers the entire standard C Programming Laboratory curriculum:
 * 1. Pointers & Addresses (* and &)
 * 2. Pointer Arithmetic & 1D Arrays
 * 3. 2D Arrays & Matrix Memory Layout (Row-Major Order)
 * 4. Call by Value vs Reference (swap(&a, &b))
 * 5. Bubble Sort (Array state, swaps, passes)
 * 6. Binary Search (low, mid, high pointers)
 * 7. String Reverse / Palindrome (Two pointers, '\0')
 * 8. Structures & Arrow Operator (struct Student, -> operator)
 * 9. Singly Linked List Node (malloc, struct Node, head->next)
 * 10. Dynamic Memory (malloc, calloc, free, dangling pointer)
 * 11. Recursion Call Stack (Factorial & Fibonacci)
 * 12. Bitwise Operators (AND, OR, XOR, Left/Right Shift)
 */

const EXAM_PRESETS = {
  // 1. Pointers Basic
  pointers_basic: {
    category: "Pointers & Memory",
    title: "1. Pointers & Memory Addresses (* and &)",
    code: `#include <stdio.h>

int main() {
    int a = 10;
    int *p = &a;
    
    printf("Value of a = %d\\n", a);
    printf("Address of a (&a) = %p\\n", &a);
    printf("Value of p = %p\\n", p);
    
    *p = 25; // Dereference and modify
    
    printf("New value of a = %d\\n", a);
    return 0;
}`,
    steps: [
      {
        line: 4,
        explanation: "Stack allocates 4 bytes for integer 'a' at address 0x1000 with initial value 10.",
        vivaTip: "<strong>Viva Question:</strong> What is the size of an int? Typically 4 bytes (32 bits) on modern compilers (GCC/Clang).",
        stack: [
          { name: "a", type: "int", address: "0x1000", value: "10", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: []
      },
      {
        line: 5,
        explanation: "The address-of operator '&' fetches the address of 'a' (0x1000). Pointer 'p' (occupying 8 bytes) stores 0x1000 and points directly to 'a'.",
        vivaTip: "<strong>Exam Golden Rule:</strong> '&' extracts the memory location. '*' in declaration creates a pointer variable holding a memory address.",
        stack: [
          { name: "a", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "p", type: "int*", address: "0x1008", value: "0x1000", bytes: 8, pointsTo: "0x1000", isUpdated: true }
        ],
        pointers: [{ from: "p", toAddr: "0x1000" }],
        terminal: []
      },
      {
        line: 7,
        explanation: "printf() prints value of a (10).",
        vivaTip: "<strong>Format Specifiers:</strong> %d for integers, %p for hexadecimal memory addresses.",
        stack: [
          { name: "a", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "p", type: "int*", address: "0x1008", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "p", toAddr: "0x1000" }],
        terminal: ["Value of a = 10"]
      },
      {
        line: 8,
        explanation: "printf() prints address of a (&a = 0x1000).",
        vivaTip: "<strong>Viva Trap:</strong> Notice that &a is identical to the value stored inside p!",
        stack: [
          { name: "a", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "p", type: "int*", address: "0x1008", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "p", toAddr: "0x1000" }],
        terminal: ["Value of a = 10", "Address of a (&a) = 0x1000"]
      },
      {
        line: 9,
        explanation: "printf() prints value of p (0x1000).",
        vivaTip: "<strong>Viva Question:</strong> What does p hold? It holds an address, NOT 10!",
        stack: [
          { name: "a", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "p", type: "int*", address: "0x1008", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "p", toAddr: "0x1000" }],
        terminal: ["Value of a = 10", "Address of a (&a) = 0x1000", "Value of p = 0x1000"]
      },
      {
        line: 11,
        explanation: "DEREFERENCING (*p = 25): Follows pointer p to memory address 0x1000 and overwrites its contents with 25. Variable 'a' is modified indirectly!",
        vivaTip: "<strong>Critical Lab Concept:</strong> '*p' dereferences the pointer. In expressions, *p accesses the target memory box.",
        stack: [
          { name: "a", type: "int", address: "0x1000", value: "25", bytes: 4, isUpdated: true },
          { name: "p", type: "int*", address: "0x1008", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "p", toAddr: "0x1000" }],
        terminal: ["Value of a = 10", "Address of a (&a) = 0x1000", "Value of p = 0x1000"]
      },
      {
        line: 13,
        explanation: "printf() verifies variable 'a' now contains 25.",
        vivaTip: "<strong>Exam Summary:</strong> Both 'a' and '*p' refer to the exact same 4 bytes of memory.",
        stack: [
          { name: "a", type: "int", address: "0x1000", value: "25", bytes: 4 },
          { name: "p", type: "int*", address: "0x1008", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "p", toAddr: "0x1000" }],
        terminal: ["Value of a = 10", "Address of a (&a) = 0x1000", "Value of p = 0x1000", "New value of a = 25"]
      }
    ]
  },

  // 2. Pointer Arithmetic & 1D Arrays
  pointer_arithmetic: {
    category: "Pointers & Memory",
    title: "2. Pointer Arithmetic & 1D Arrays",
    code: `#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30};
    int *ptr = arr;
    
    printf("arr[0] via *ptr = %d\\n", *ptr);
    
    ptr = ptr + 1; // Advances by sizeof(int) = 4 bytes!
    printf("arr[1] via *ptr = %d\\n", *ptr);
    
    *(ptr + 1) = 99; // Modifies arr[2]
    return 0;
}`,
    steps: [
      {
        line: 4,
        explanation: "Allocates 12 contiguous bytes on stack for arr: arr[0] at 0x1000, arr[1] at 0x1004, arr[2] at 0x1008.",
        vivaTip: "<strong>Viva Question:</strong> Are array elements contiguous? YES, always sequential in memory.",
        stack: [
          { name: "arr[0]", type: "int", address: "0x1000", value: "10", bytes: 4, isUpdated: true },
          { name: "arr[1]", type: "int", address: "0x1004", value: "20", bytes: 4, isUpdated: true },
          { name: "arr[2]", type: "int", address: "0x1008", value: "30", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: []
      },
      {
        line: 5,
        explanation: "Array name 'arr' decays to base pointer &arr[0] (0x1000). Pointer 'ptr' is assigned 0x1000.",
        vivaTip: "<strong>Lab Truth:</strong> 'arr' is a constant pointer to the first element; you cannot do 'arr++' but you can do 'ptr++'!",
        stack: [
          { name: "arr[0]", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "arr[1]", type: "int", address: "0x1004", value: "20", bytes: 4 },
          { name: "arr[2]", type: "int", address: "0x1008", value: "30", bytes: 4 },
          { name: "ptr", type: "int*", address: "0x1010", value: "0x1000", bytes: 8, pointsTo: "0x1000", isUpdated: true }
        ],
        pointers: [{ from: "ptr", toAddr: "0x1000" }],
        terminal: []
      },
      {
        line: 7,
        explanation: "*ptr reads value from 0x1000 (10).",
        vivaTip: "<strong>Array Indexing Equivalence:</strong> arr[i] == *(arr + i) == *(i + arr) == i[arr].",
        stack: [
          { name: "arr[0]", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "arr[1]", type: "int", address: "0x1004", value: "20", bytes: 4 },
          { name: "arr[2]", type: "int", address: "0x1008", value: "30", bytes: 4 },
          { name: "ptr", type: "int*", address: "0x1010", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "ptr", toAddr: "0x1000" }],
        terminal: ["arr[0] via *ptr = 10"]
      },
      {
        line: 9,
        explanation: "POINTER ARITHMETIC: ptr = ptr + 1 adds 1 * sizeof(int) = 4 bytes! New address = 0x1004. ptr now points to arr[1].",
        vivaTip: "<strong>Top Exam Trap:</strong> 'ptr + 1' does NOT add 1 byte! It scales by the size of the underlying type.",
        stack: [
          { name: "arr[0]", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "arr[1]", type: "int", address: "0x1004", value: "20", bytes: 4 },
          { name: "arr[2]", type: "int", address: "0x1008", value: "30", bytes: 4 },
          { name: "ptr", type: "int*", address: "0x1010", value: "0x1004", bytes: 8, pointsTo: "0x1004", isUpdated: true }
        ],
        pointers: [{ from: "ptr", toAddr: "0x1004" }],
        terminal: ["arr[0] via *ptr = 10"]
      },
      {
        line: 10,
        explanation: "*ptr dereferences 0x1004 and prints 20.",
        vivaTip: "<strong>Pointer Speed:</strong> Iterating an array using pointers is often faster than array subscripting in low-level hardware.",
        stack: [
          { name: "arr[0]", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "arr[1]", type: "int", address: "0x1004", value: "20", bytes: 4 },
          { name: "arr[2]", type: "int", address: "0x1008", value: "30", bytes: 4 },
          { name: "ptr", type: "int*", address: "0x1010", value: "0x1004", bytes: 8, pointsTo: "0x1004" }
        ],
        pointers: [{ from: "ptr", toAddr: "0x1004" }],
        terminal: ["arr[0] via *ptr = 10", "arr[1] via *ptr = 20"]
      },
      {
        line: 12,
        explanation: "*(ptr + 1) calculates address 0x1004 + 4 = 0x1008 (arr[2]) and stores 99.",
        vivaTip: "<strong>Exam Note:</strong> Writing *(ptr + 1) modifies arr[2] without permanently moving ptr itself.",
        stack: [
          { name: "arr[0]", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "arr[1]", type: "int", address: "0x1004", value: "20", bytes: 4 },
          { name: "arr[2]", type: "int", address: "0x1008", value: "99", bytes: 4, isUpdated: true },
          { name: "ptr", type: "int*", address: "0x1010", value: "0x1004", bytes: 8, pointsTo: "0x1004" }
        ],
        pointers: [{ from: "ptr", toAddr: "0x1004" }],
        terminal: ["arr[0] via *ptr = 10", "arr[1] via *ptr = 20"]
      }
    ]
  },

  // 3. 2D Array & Matrix Memory Layout
  matrix_2d: {
    category: "Pointers & Memory",
    title: "3. 2D Arrays & Matrix (Row-Major Order)",
    code: `#include <stdio.h>

int main() {
    // 2x2 Matrix
    int mat[2][2] = {
        {1, 2},
        {3, 4}
    };
    
    // In memory, 2D arrays are stored linearly in ROW-MAJOR order!
    // Address of mat[i][j] = Base + (i * COLS + j) * sizeof(int)
    
    int *p = &mat[0][0];
    printf("mat[0][0] = %d\\n", *(p + 0));
    printf("mat[0][1] = %d\\n", *(p + 1));
    printf("mat[1][0] = %d\\n", *(p + 2));
    printf("mat[1][1] = %d\\n", *(p + 3));
    return 0;
}`,
    steps: [
      {
        line: 5,
        explanation: "Allocates 16 contiguous bytes for a 2x2 integer matrix stored in ROW-MAJOR order: Row 0 followed immediately by Row 1 in linear memory.",
        vivaTip: "<strong>Big Lab Exam Question:</strong> How are 2D arrays stored in C? C uses ROW-MAJOR order (row by row). Fortran uses Column-major.",
        stack: [
          { name: "mat[0][0]", type: "int", address: "0x1000", value: "1", bytes: 4, isUpdated: true },
          { name: "mat[0][1]", type: "int", address: "0x1004", value: "2", bytes: 4, isUpdated: true },
          { name: "mat[1][0]", type: "int", address: "0x1008", value: "3", bytes: 4, isUpdated: true },
          { name: "mat[1][1]", type: "int", address: "0x100C", value: "4", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: []
      },
      {
        line: 14,
        explanation: "p = &mat[0][0] points to base address 0x1000. Through this single 1D pointer, we can access the entire 2D matrix!",
        vivaTip: "<strong>Formula to memorize for exam:</strong> Address of mat[i][j] = Base + (i * NUM_COLS + j) * sizeof(element).",
        stack: [
          { name: "mat[0][0]", type: "int", address: "0x1000", value: "1", bytes: 4 },
          { name: "mat[0][1]", type: "int", address: "0x1004", value: "2", bytes: 4 },
          { name: "mat[1][0]", type: "int", address: "0x1008", value: "3", bytes: 4 },
          { name: "mat[1][1]", type: "int", address: "0x100C", value: "4", bytes: 4 },
          { name: "p", type: "int*", address: "0x1014", value: "0x1000", bytes: 8, pointsTo: "0x1000", isUpdated: true }
        ],
        pointers: [{ from: "p", toAddr: "0x1000" }],
        terminal: []
      },
      {
        line: 15,
        explanation: "*(p + 0) reads mat[0][0] at 0x1000 (value 1).",
        vivaTip: "<strong>Row 0, Col 0:</strong> Index offset is 0 * 2 + 0 = 0.",
        stack: [
          { name: "mat[0][0]", type: "int", address: "0x1000", value: "1", bytes: 4 },
          { name: "mat[0][1]", type: "int", address: "0x1004", value: "2", bytes: 4 },
          { name: "mat[1][0]", type: "int", address: "0x1008", value: "3", bytes: 4 },
          { name: "mat[1][1]", type: "int", address: "0x100C", value: "4", bytes: 4 },
          { name: "p", type: "int*", address: "0x1014", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "p", toAddr: "0x1000" }],
        terminal: ["mat[0][0] = 1"]
      },
      {
        line: 16,
        explanation: "*(p + 1) reads mat[0][1] at 0x1004 (value 2).",
        vivaTip: "<strong>Row 0, Col 1:</strong> Index offset is 0 * 2 + 1 = 1.",
        stack: [
          { name: "mat[0][0]", type: "int", address: "0x1000", value: "1", bytes: 4 },
          { name: "mat[0][1]", type: "int", address: "0x1004", value: "2", bytes: 4 },
          { name: "mat[1][0]", type: "int", address: "0x1008", value: "3", bytes: 4 },
          { name: "mat[1][1]", type: "int", address: "0x100C", value: "4", bytes: 4 },
          { name: "p", type: "int*", address: "0x1014", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "p", toAddr: "0x1000" }],
        terminal: ["mat[0][0] = 1", "mat[0][1] = 2"]
      },
      {
        line: 17,
        explanation: "*(p + 2) reads mat[1][0] at 0x1008 (value 3). It seamlessly crosses into the second row!",
        vivaTip: "<strong>Row 1, Col 0:</strong> Index offset is 1 * 2 + 0 = 2. C's physical memory has no 2D grid; it's a flat linear array!",
        stack: [
          { name: "mat[0][0]", type: "int", address: "0x1000", value: "1", bytes: 4 },
          { name: "mat[0][1]", type: "int", address: "0x1004", value: "2", bytes: 4 },
          { name: "mat[1][0]", type: "int", address: "0x1008", value: "3", bytes: 4 },
          { name: "mat[1][1]", type: "int", address: "0x100C", value: "4", bytes: 4 },
          { name: "p", type: "int*", address: "0x1014", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "p", toAddr: "0x1000" }],
        terminal: ["mat[0][0] = 1", "mat[0][1] = 2", "mat[1][0] = 3"]
      },
      {
        line: 18,
        explanation: "*(p + 3) reads mat[1][1] at 0x100C (value 4).",
        vivaTip: "<strong>Row 1, Col 1:</strong> Index offset is 1 * 2 + 1 = 3.",
        stack: [
          { name: "mat[0][0]", type: "int", address: "0x1000", value: "1", bytes: 4 },
          { name: "mat[0][1]", type: "int", address: "0x1004", value: "2", bytes: 4 },
          { name: "mat[1][0]", type: "int", address: "0x1008", value: "3", bytes: 4 },
          { name: "mat[1][1]", type: "int", address: "0x100C", value: "4", bytes: 4 },
          { name: "p", type: "int*", address: "0x1014", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "p", toAddr: "0x1000" }],
        terminal: ["mat[0][0] = 1", "mat[0][1] = 2", "mat[1][0] = 3", "mat[1][1] = 4"]
      }
    ]
  },

  // 4. Pass by Value vs Pass by Reference (Swap)
  pass_by_reference: {
    category: "Functions & Scope",
    title: "4. Swap: Pass by Value vs Reference",
    code: `#include <stdio.h>

void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    int a = 5, b = 9;
    swap(&a, &b);
    printf("Swapped: a = %d, b = %d\\n", a, b);
    return 0;
}`,
    steps: [
      {
        line: 10,
        explanation: "main() stack frame allocated: local variable a=5 at 0x1000 and b=9 at 0x1004.",
        vivaTip: "<strong>Stack Frame Concept:</strong> Local variables exist only within their enclosing function scope.",
        stack: [
          { name: "main::a", type: "int", address: "0x1000", value: "5", bytes: 4, isUpdated: true },
          { name: "main::b", type: "int", address: "0x1004", value: "9", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: []
      },
      {
        line: 11,
        explanation: "Calling swap(&a, &b). Addresses &a (0x1000) and &b (0x1004) are passed. swap's stack frame is pushed!",
        vivaTip: "<strong>Why does swap(a, b) fail?</strong> Because C passes by value (copies values). Changes to copies never affect original variables in main!",
        stack: [
          { name: "main::a", type: "int", address: "0x1000", value: "5", bytes: 4 },
          { name: "main::b", type: "int", address: "0x1004", value: "9", bytes: 4 },
          { name: "swap::x", type: "int*", address: "0x09F0", value: "0x1000", bytes: 8, pointsTo: "0x1000", isUpdated: true },
          { name: "swap::y", type: "int*", address: "0x09E8", value: "0x1004", bytes: 8, pointsTo: "0x1004", isUpdated: true }
        ],
        pointers: [
          { from: "swap::x", toAddr: "0x1000" },
          { from: "swap::y", toAddr: "0x1004" }
        ],
        terminal: []
      },
      {
        line: 4,
        explanation: "int temp = *x reads 5 from address 0x1000 and stores it in swap's local variable 'temp'.",
        vivaTip: "<strong>temp variable:</strong> Holds 'a' temporarily so overwriting 'a' doesn't lose its data.",
        stack: [
          { name: "main::a", type: "int", address: "0x1000", value: "5", bytes: 4 },
          { name: "main::b", type: "int", address: "0x1004", value: "9", bytes: 4 },
          { name: "swap::x", type: "int*", address: "0x09F0", value: "0x1000", bytes: 8, pointsTo: "0x1000" },
          { name: "swap::y", type: "int*", address: "0x09E8", value: "0x1004", bytes: 8, pointsTo: "0x1004" },
          { name: "swap::temp", type: "int", address: "0x09E4", value: "5", bytes: 4, isUpdated: true }
        ],
        pointers: [
          { from: "swap::x", toAddr: "0x1000" },
          { from: "swap::y", toAddr: "0x1004" }
        ],
        terminal: []
      },
      {
        line: 5,
        explanation: "*x = *y dereferences y (reads 9 at 0x1004) and writes 9 to address *x (0x1000). main::a is now 9!",
        vivaTip: "<strong>Cross-Stack Write:</strong> swap() directly modifies memory in main's stack frame via pointer dereference.",
        stack: [
          { name: "main::a", type: "int", address: "0x1000", value: "9", bytes: 4, isUpdated: true },
          { name: "main::b", type: "int", address: "0x1004", value: "9", bytes: 4 },
          { name: "swap::x", type: "int*", address: "0x09F0", value: "0x1000", bytes: 8, pointsTo: "0x1000" },
          { name: "swap::y", type: "int*", address: "0x09E8", value: "0x1004", bytes: 8, pointsTo: "0x1004" },
          { name: "swap::temp", type: "int", address: "0x09E4", value: "5", bytes: 4 }
        ],
        pointers: [
          { from: "swap::x", toAddr: "0x1000" },
          { from: "swap::y", toAddr: "0x1004" }
        ],
        terminal: []
      },
      {
        line: 6,
        explanation: "*y = temp writes temp (5) to address *y (0x1004). main::b is now 5!",
        vivaTip: "<strong>Swap Finished:</strong> Both values in main are now swapped.",
        stack: [
          { name: "main::a", type: "int", address: "0x1000", value: "9", bytes: 4 },
          { name: "main::b", type: "int", address: "0x1004", value: "5", bytes: 4, isUpdated: true },
          { name: "swap::x", type: "int*", address: "0x09F0", value: "0x1000", bytes: 8, pointsTo: "0x1000" },
          { name: "swap::y", type: "int*", address: "0x09E8", value: "0x1004", bytes: 8, pointsTo: "0x1004" },
          { name: "swap::temp", type: "int", address: "0x09E4", value: "5", bytes: 4 }
        ],
        pointers: [
          { from: "swap::x", toAddr: "0x1000" },
          { from: "swap::y", toAddr: "0x1004" }
        ],
        terminal: []
      },
      {
        line: 12,
        explanation: "swap() returns and its stack frame is destroyed. main() resumes with swapped variables a=9, b=5.",
        vivaTip: "<strong>Stack Pop:</strong> swap's variables are popped, but changes made in main's memory persist.",
        stack: [
          { name: "main::a", type: "int", address: "0x1000", value: "9", bytes: 4 },
          { name: "main::b", type: "int", address: "0x1004", value: "5", bytes: 4 }
        ],
        pointers: [],
        terminal: ["Swapped: a = 9, b = 5"]
      }
    ]
  },

  // 5. Bubble Sort (Lab Exam Classic!)
  bubble_sort: {
    category: "Algorithms & Sorting",
    title: "5. Bubble Sort Algorithm & Swapping",
    code: `#include <stdio.h>

void bubbleSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                int temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }
}

int main() {
    int arr[3] = {30, 10, 20};
    bubbleSort(arr, 3);
    return 0;
}`,
    steps: [
      {
        line: 16,
        explanation: "Unsorted array initialized: arr[0]=30, arr[1]=10, arr[2]=20.",
        vivaTip: "<strong>Bubble Sort Time Complexity:</strong> Worst & Average case = O(n²). Best case (already sorted with flag) = O(n).",
        stack: [
          { name: "arr[0]", type: "int", address: "0x1000", value: "30", bytes: 4 },
          { name: "arr[1]", type: "int", address: "0x1004", value: "10", bytes: 4 },
          { name: "arr[2]", type: "int", address: "0x1008", value: "20", bytes: 4 }
        ],
        pointers: [],
        terminal: ["Input: [30, 10, 20]"]
      },
      {
        line: 6,
        explanation: "Pass 1, Compare arr[0] (30) with arr[1] (10). 30 > 10 is TRUE! Swapping required.",
        vivaTip: "<strong>Why 'Bubble'?</strong> Heavy elements sink to bottom, light elements 'bubble' to top in each pass.",
        stack: [
          { name: "arr[0] (comparing)", type: "int", address: "0x1000", value: "30", bytes: 4, isUpdated: true },
          { name: "arr[1] (comparing)", type: "int", address: "0x1004", value: "10", bytes: 4, isUpdated: true },
          { name: "arr[2]", type: "int", address: "0x1008", value: "20", bytes: 4 }
        ],
        pointers: [],
        terminal: ["Compare: 30 > 10? Yes, swap!"]
      },
      {
        line: 9,
        explanation: "Swapping arr[0] and arr[1]. Array state becomes: [10, 30, 20].",
        vivaTip: "<strong>In-place Sorting:</strong> Space complexity is O(1) because no extra array is needed.",
        stack: [
          { name: "arr[0]", type: "int", address: "0x1000", value: "10", bytes: 4, isUpdated: true },
          { name: "arr[1]", type: "int", address: "0x1004", value: "30", bytes: 4, isUpdated: true },
          { name: "arr[2]", type: "int", address: "0x1008", value: "20", bytes: 4 }
        ],
        pointers: [],
        terminal: ["After Swap: [10, 30, 20]"]
      },
      {
        line: 6,
        explanation: "Pass 1, Next comparison: Compare arr[1] (30) with arr[2] (20). 30 > 20 is TRUE! Swapping required.",
        vivaTip: "<strong>Pass 1 Guarantee:</strong> At the end of Pass 1, the largest element (30) is guaranteed to be in its correct final spot (arr[2])!",
        stack: [
          { name: "arr[0]", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "arr[1] (comparing)", type: "int", address: "0x1004", value: "30", bytes: 4, isUpdated: true },
          { name: "arr[2] (comparing)", type: "int", address: "0x1008", value: "20", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: ["Compare: 30 > 20? Yes, swap!"]
      },
      {
        line: 9,
        explanation: "Swapping arr[1] and arr[2]. Array state becomes: [10, 20, 30].",
        vivaTip: "<strong>Pass 1 Completed:</strong> Largest element 30 is now fixed at index 2.",
        stack: [
          { name: "arr[0]", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "arr[1]", type: "int", address: "0x1004", value: "20", bytes: 4, isUpdated: true },
          { name: "arr[2] (SORTED)", type: "int", address: "0x1008", value: "30", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: ["Array is now fully sorted: [10, 20, 30]"]
      }
    ]
  },

  // 6. Binary Search
  binary_search: {
    category: "Algorithms & Sorting",
    title: "6. Binary Search (low, mid, high pointers)",
    code: `#include <stdio.h>

int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int found = binarySearch(arr, 5, 40);
    return 0;
}`,
    steps: [
      {
        line: 18,
        explanation: "Sorted array: [10, 20, 30, 40, 50]. Searching for target = 40.",
        vivaTip: "<strong>Prerequisite for Binary Search:</strong> The array MUST be sorted first! Time complexity = O(log n).",
        stack: [
          { name: "arr[0]", type: "int", address: "0x1000", value: "10", bytes: 4 },
          { name: "arr[1]", type: "int", address: "0x1004", value: "20", bytes: 4 },
          { name: "arr[2]", type: "int", address: "0x1008", value: "30", bytes: 4 },
          { name: "arr[3]", type: "int", address: "0x100C", value: "40", bytes: 4 },
          { name: "arr[4]", type: "int", address: "0x1010", value: "50", bytes: 4 }
        ],
        pointers: [],
        terminal: ["Target = 40"]
      },
      {
        line: 4,
        explanation: "Initialize pointers: low = 0 (points to arr[0]), high = 4 (points to arr[4]).",
        vivaTip: "<strong>Divide and Conquer:</strong> Eliminates half of the remaining elements in each step.",
        stack: [
          { name: "low", type: "int", address: "0x09FC", value: "0", bytes: 4, isUpdated: true },
          { name: "high", type: "int", address: "0x09F8", value: "4", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: ["low = 0, high = 4"]
      },
      {
        line: 6,
        explanation: "Calculate mid = (0 + 4) / 2 = 2. Check arr[mid] (arr[2] = 30). Target is 40. Since 30 < 40, target lies in right half! Set low = mid + 1 = 3.",
        vivaTip: "<strong>Mid Calculation Viva Trap:</strong> In large arrays, '(low + high) / 2' can cause integer overflow! Safer way: 'low + (high - low) / 2'.",
        stack: [
          { name: "low", type: "int", address: "0x09FC", value: "3", bytes: 4, isUpdated: true },
          { name: "mid", type: "int", address: "0x09F4", value: "2 (val=30)", bytes: 4 },
          { name: "high", type: "int", address: "0x09F8", value: "4", bytes: 4 }
        ],
        pointers: [],
        terminal: ["arr[2]=30 < 40. Search right half! low becomes 3."]
      },
      {
        line: 6,
        explanation: "New search range [3..4]. Calculate mid = (3 + 4) / 2 = 3. Check arr[3] = 40. MATCH FOUND! Returns index 3.",
        vivaTip: "<strong>Total Steps Taken:</strong> Only 2 comparisons to find 40 in a 5-element array!",
        stack: [
          { name: "low", type: "int", address: "0x09FC", value: "3", bytes: 4 },
          { name: "mid (MATCH)", type: "int", address: "0x09F4", value: "3 (val=40)", bytes: 4, isUpdated: true },
          { name: "high", type: "int", address: "0x09F8", value: "4", bytes: 4 }
        ],
        pointers: [],
        terminal: ["arr[3] == 40! Target found at index 3."]
      }
    ]
  },

  // 7. Strings & Palindrome / Two Pointers
  string_reverse: {
    category: "Strings",
    title: "7. Strings & Palindrome (Two-Pointer Method)",
    code: `#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "RADAR";
    int left = 0;
    int right = 4; // strlen(str) - 1
    
    // Check palindrome: compare str[left] == str[right]
    while (left < right) {
        if (str[left] != str[right]) {
            printf("Not Palindrome\\n");
            return 0;
        }
        left++;
        right--;
    }
    printf("%s is a Palindrome!\\n", str);
    return 0;
}`,
    steps: [
      {
        line: 5,
        explanation: "Allocates 6 bytes on stack for \"RADAR\": 'R', 'A', 'D', 'A', 'R' and '\\0' (ASCII 0 null terminator at 0x1005).",
        vivaTip: "<strong>String Length vs Size:</strong> strlen(\"RADAR\") = 5 characters, but sizeof(\"RADAR\") = 6 bytes because of '\\0'!",
        stack: [
          { name: "str[0]", type: "char", address: "0x1000", value: "'R'", bytes: 1 },
          { name: "str[1]", type: "char", address: "0x1001", value: "'A'", bytes: 1 },
          { name: "str[2]", type: "char", address: "0x1002", value: "'D'", bytes: 1 },
          { name: "str[3]", type: "char", address: "0x1003", value: "'A'", bytes: 1 },
          { name: "str[4]", type: "char", address: "0x1004", value: "'R'", bytes: 1 },
          { name: "str[5]", type: "char", address: "0x1005", value: "'\\0'", bytes: 1 }
        ],
        pointers: [],
        terminal: ["String: RADAR"]
      },
      {
        line: 10,
        explanation: "Step 1: Compare str[left=0] ('R') and str[right=4] ('R'). Both characters match! Increment left=1, decrement right=3.",
        vivaTip: "<strong>Two-Pointer Technique:</strong> Left moves forward (left++), Right moves backward (right--) meeting in the middle.",
        stack: [
          { name: "left", type: "int", address: "0x1008", value: "0 ('R')", bytes: 4, isUpdated: true },
          { name: "right", type: "int", address: "0x100C", value: "4 ('R')", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: ["Compare: str[0]=='R' and str[4]=='R' -> Match!"]
      },
      {
        line: 10,
        explanation: "Step 2: Compare str[left=1] ('A') and str[right=3] ('A'). Both characters match! Increment left=2, decrement right=2.",
        vivaTip: "<strong>Palindrome Definition:</strong> A string that reads identical forwards and backwards.",
        stack: [
          { name: "left", type: "int", address: "0x1008", value: "1 ('A')", bytes: 4, isUpdated: true },
          { name: "right", type: "int", address: "0x100C", value: "3 ('A')", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: ["Compare: str[1]=='A' and str[3]=='A' -> Match!"]
      },
      {
        line: 17,
        explanation: "left (2) is no longer < right (2). Loop terminates. String is confirmed Palindrome!",
        vivaTip: "<strong>Time Complexity:</strong> O(n/2) = O(n).",
        stack: [
          { name: "left", type: "int", address: "0x1008", value: "2", bytes: 4 },
          { name: "right", type: "int", address: "0x100C", value: "2", bytes: 4 }
        ],
        pointers: [],
        terminal: ["RADAR is a Palindrome!"]
      }
    ]
  },

  // 8. Structures & Arrow Operator (->)
  struct_pointers: {
    category: "Structures & Unions",
    title: "8. Structures & Arrow Operator (->)",
    code: `#include <stdio.h>

struct Student {
    int roll;
    float marks;
};

int main() {
    struct Student s = {101, 88.5};
    struct Student *ptr = &s;
    
    // Dot operator '.' for direct structure
    printf("Roll: %d\\n", s.roll);
    
    // Arrow operator '->' for pointer to structure
    // ptr->marks is strictly shorthand for (*ptr).marks
    ptr->marks = 95.0;
    
    printf("Updated Marks: %.1f\\n", ptr->marks);
    return 0;
}`,
    steps: [
      {
        line: 9,
        explanation: "Allocates 8 contiguous bytes for struct Student 's' at 0x1000: int roll (4 bytes at 0x1000) and float marks (4 bytes at 0x1004).",
        vivaTip: "<strong>Structure Memory:</strong> Members of a struct are allocated sequentially in memory. Struct size is the sum of members (+ padding).",
        stack: [
          { name: "s.roll", type: "int", address: "0x1000", value: "101", bytes: 4, isUpdated: true },
          { name: "s.marks", type: "float", address: "0x1004", value: "88.5", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: []
      },
      {
        line: 10,
        explanation: "Pointer 'ptr' holds the starting memory address of struct 's' (0x1000).",
        vivaTip: "<strong>Viva Question:</strong> What is ptr->roll? It is exact syntactic sugar for (*ptr).roll!",
        stack: [
          { name: "s.roll", type: "int", address: "0x1000", value: "101", bytes: 4 },
          { name: "s.marks", type: "float", address: "0x1004", value: "88.5", bytes: 4 },
          { name: "ptr", type: "struct Student*", address: "0x1008", value: "0x1000", bytes: 8, pointsTo: "0x1000", isUpdated: true }
        ],
        pointers: [{ from: "ptr", toAddr: "0x1000" }],
        terminal: []
      },
      {
        line: 13,
        explanation: "printf prints s.roll using the direct member dot operator '.' (101).",
        vivaTip: "<strong>Dot vs Arrow:</strong> Use '.' on a normal struct variable. Use '->' when you have a pointer to a struct.",
        stack: [
          { name: "s.roll", type: "int", address: "0x1000", value: "101", bytes: 4 },
          { name: "s.marks", type: "float", address: "0x1004", value: "88.5", bytes: 4 },
          { name: "ptr", type: "struct Student*", address: "0x1008", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "ptr", toAddr: "0x1000" }],
        terminal: ["Roll: 101"]
      },
      {
        line: 17,
        explanation: "ARROW OPERATOR (ptr->marks = 95.0): Dereferences ptr (0x1000), offsets by 4 bytes to access the 'marks' field, and updates it to 95.0.",
        vivaTip: "<strong>Why does (*ptr).marks need parentheses?</strong> Because '.' has higher operator precedence than '*'. Without parentheses, *ptr.marks fails!",
        stack: [
          { name: "s.roll", type: "int", address: "0x1000", value: "101", bytes: 4 },
          { name: "s.marks", type: "float", address: "0x1004", value: "95.0", bytes: 4, isUpdated: true },
          { name: "ptr", type: "struct Student*", address: "0x1008", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "ptr", toAddr: "0x1000" }],
        terminal: ["Roll: 101"]
      },
      {
        line: 19,
        explanation: "printf() prints updated marks (95.0).",
        vivaTip: "<strong>Exam Note:</strong> Structure pointers are fundamental for Linked Lists, Trees, and Graphs.",
        stack: [
          { name: "s.roll", type: "int", address: "0x1000", value: "101", bytes: 4 },
          { name: "s.marks", type: "float", address: "0x1004", value: "95.0", bytes: 4 },
          { name: "ptr", type: "struct Student*", address: "0x1008", value: "0x1000", bytes: 8, pointsTo: "0x1000" }
        ],
        pointers: [{ from: "ptr", toAddr: "0x1000" }],
        terminal: ["Roll: 101", "Updated Marks: 95.0"]
      }
    ]
  },

  // 9. Singly Linked List Node (Self-referential Structure)
  linked_list_node: {
    category: "Data Structures",
    title: "9. Singly Linked List Node & Pointers",
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

int main() {
    struct Node *head = (struct Node*)malloc(sizeof(struct Node));
    struct Node *second = (struct Node*)malloc(sizeof(struct Node));
    
    head->data = 10;
    head->next = second; // Linking 1st node to 2nd node!
    
    second->data = 20;
    second->next = NULL; // End of list
    
    printf("Node 1: %d -> Node 2: %d -> NULL\\n", head->data, head->next->data);
    return 0;
}`,
    steps: [
      {
        line: 10,
        explanation: "malloc allocates Node 1 on the HEAP (16 bytes: 4 for int, 4 padding, 8 for pointer next) at 0x3000. 'head' pointer on the STACK holds 0x3000.",
        vivaTip: "<strong>Self-Referential Structure:</strong> A structure that contains a pointer to another structure of the same type (struct Node *next).",
        stack: [
          { name: "head", type: "struct Node*", address: "0x1000", value: "0x3000", bytes: 8, pointsTo: "0x3000", isUpdated: true }
        ],
        heap: [
          { name: "Node1.data", address: "0x3000", value: "?", bytes: 4 },
          { name: "Node1.next", address: "0x3008", value: "NULL", bytes: 8 }
        ],
        pointers: [{ from: "head", toAddr: "0x3000" }],
        terminal: []
      },
      {
        line: 11,
        explanation: "malloc allocates Node 2 on the HEAP at 0x3020. 'second' pointer on the STACK holds 0x3020.",
        vivaTip: "<strong>Why Linked Lists over Arrays?</strong> Dynamic size! Nodes can be allocated anywhere in heap memory without being contiguous.",
        stack: [
          { name: "head", type: "struct Node*", address: "0x1000", value: "0x3000", bytes: 8, pointsTo: "0x3000" },
          { name: "second", type: "struct Node*", address: "0x1008", value: "0x3020", bytes: 8, pointsTo: "0x3020", isUpdated: true }
        ],
        heap: [
          { name: "Node1.data", address: "0x3000", value: "?", bytes: 4 },
          { name: "Node1.next", address: "0x3008", value: "NULL", bytes: 8 },
          { name: "Node2.data", address: "0x3020", value: "?", bytes: 4 },
          { name: "Node2.next", address: "0x3028", value: "NULL", bytes: 8 }
        ],
        pointers: [
          { from: "head", toAddr: "0x3000" },
          { from: "second", toAddr: "0x3020" }
        ],
        terminal: []
      },
      {
        line: 13,
        explanation: "head->data = 10 fills data in Node 1 on the heap.",
        vivaTip: "<strong>Heap Access:</strong> head->data dereferences head to access Node 1 on the heap.",
        stack: [
          { name: "head", type: "struct Node*", address: "0x1000", value: "0x3000", bytes: 8, pointsTo: "0x3000" },
          { name: "second", type: "struct Node*", address: "0x1008", value: "0x3020", bytes: 8, pointsTo: "0x3020" }
        ],
        heap: [
          { name: "Node1.data", address: "0x3000", value: "10", bytes: 4, isUpdated: true },
          { name: "Node1.next", address: "0x3008", value: "NULL", bytes: 8 },
          { name: "Node2.data", address: "0x3020", value: "?", bytes: 4 },
          { name: "Node2.next", address: "0x3028", value: "NULL", bytes: 8 }
        ],
        pointers: [
          { from: "head", toAddr: "0x3000" },
          { from: "second", toAddr: "0x3020" }
        ],
        terminal: []
      },
      {
        line: 14,
        explanation: "LINKING: head->next = second stores 0x3020 in Node 1's next pointer. Node 1 now points directly to Node 2!",
        vivaTip: "<strong>Link Creation:</strong> This single pointer assignment connects the nodes together into a chain.",
        stack: [
          { name: "head", type: "struct Node*", address: "0x1000", value: "0x3000", bytes: 8, pointsTo: "0x3000" },
          { name: "second", type: "struct Node*", address: "0x1008", value: "0x3020", bytes: 8, pointsTo: "0x3020" }
        ],
        heap: [
          { name: "Node1.data", address: "0x3000", value: "10", bytes: 4 },
          { name: "Node1.next", address: "0x3008", value: "0x3020", bytes: 8, pointsTo: "0x3020", isUpdated: true },
          { name: "Node2.data", address: "0x3020", value: "?", bytes: 4 },
          { name: "Node2.next", address: "0x3028", value: "NULL", bytes: 8 }
        ],
        pointers: [
          { from: "head", toAddr: "0x3000" },
          { from: "Node1.next", toAddr: "0x3020" }
        ],
        terminal: []
      },
      {
        line: 16,
        explanation: "second->data = 20 and second->next = NULL marks the final node of the linked list.",
        vivaTip: "<strong>NULL Pointer:</strong> Marks the end of a linked list so traversal loops know when to stop: while (curr != NULL).",
        stack: [
          { name: "head", type: "struct Node*", address: "0x1000", value: "0x3000", bytes: 8, pointsTo: "0x3000" }
        ],
        heap: [
          { name: "Node1.data", address: "0x3000", value: "10", bytes: 4 },
          { name: "Node1.next", address: "0x3008", value: "0x3020", bytes: 8, pointsTo: "0x3020" },
          { name: "Node2.data", address: "0x3020", value: "20", bytes: 4, isUpdated: true },
          { name: "Node2.next", address: "0x3028", value: "NULL (End)", bytes: 8, isUpdated: true }
        ],
        pointers: [
          { from: "head", toAddr: "0x3000" },
          { from: "Node1.next", toAddr: "0x3020" }
        ],
        terminal: []
      },
      {
        line: 19,
        explanation: "printf displays the linked list traversing from head to second node.",
        vivaTip: "<strong>Traversing:</strong> head->next->data reaches Node 2's data directly by chasing pointers.",
        stack: [
          { name: "head", type: "struct Node*", address: "0x1000", value: "0x3000", bytes: 8, pointsTo: "0x3000" }
        ],
        heap: [
          { name: "Node1.data", address: "0x3000", value: "10", bytes: 4 },
          { name: "Node1.next", address: "0x3008", value: "0x3020", bytes: 8 },
          { name: "Node2.data", address: "0x3020", value: "20", bytes: 4 },
          { name: "Node2.next", address: "0x3028", value: "NULL (End)", bytes: 8 }
        ],
        pointers: [{ from: "head", toAddr: "0x3000" }],
        terminal: ["Node 1: 10 -> Node 2: 20 -> NULL"]
      }
    ]
  },

  // 10. Dynamic Memory (malloc & free)
  dynamic_malloc: {
    category: "Dynamic Memory",
    title: "10. Dynamic Memory (malloc, free, Dangling Pointer)",
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int*)malloc(2 * sizeof(int));
    
    arr[0] = 42;
    arr[1] = 88;
    
    printf("arr[0] = %d\\n", arr[0]);
    
    free(arr);     // Releases heap memory
    arr = NULL;    // Prevents dangling pointer!
    return 0;
}`,
    steps: [
      {
        line: 5,
        explanation: "malloc(2 * sizeof(int)) allocates 8 bytes on the HEAP (address 0x3000). Stack pointer 'arr' stores 0x3000.",
        vivaTip: "<strong>Stack vs Heap:</strong> Stack is automatic, fast, limited size. Heap is manual, dynamic, persists until free() is called.",
        stack: [
          { name: "arr", type: "int*", address: "0x1000", value: "0x3000", bytes: 8, pointsTo: "0x3000", isUpdated: true }
        ],
        heap: [
          { name: "heap_block[0]", address: "0x3000", value: "? (garbage)", bytes: 4, isUpdated: true },
          { name: "heap_block[1]", address: "0x3004", value: "? (garbage)", bytes: 4, isUpdated: true }
        ],
        pointers: [{ from: "arr", toAddr: "0x3000" }],
        terminal: []
      },
      {
        line: 7,
        explanation: "arr[0] = 42 writes 42 into the first heap slot at 0x3000.",
        vivaTip: "<strong>malloc vs calloc:</strong> malloc leaves uninitialized garbage. calloc clears memory to 0.",
        stack: [
          { name: "arr", type: "int*", address: "0x1000", value: "0x3000", bytes: 8, pointsTo: "0x3000" }
        ],
        heap: [
          { name: "heap_block[0]", address: "0x3000", value: "42", bytes: 4, isUpdated: true },
          { name: "heap_block[1]", address: "0x3004", value: "? (garbage)", bytes: 4 }
        ],
        pointers: [{ from: "arr", toAddr: "0x3000" }],
        terminal: []
      },
      {
        line: 8,
        explanation: "arr[1] = 88 writes 88 into the second heap slot at 0x3004.",
        vivaTip: "<strong>Heap Indexing:</strong> arr[1] is identical to *(arr + 1).",
        stack: [
          { name: "arr", type: "int*", address: "0x1000", value: "0x3000", bytes: 8, pointsTo: "0x3000" }
        ],
        heap: [
          { name: "heap_block[0]", address: "0x3000", value: "42", bytes: 4 },
          { name: "heap_block[1]", address: "0x3004", value: "88", bytes: 4, isUpdated: true }
        ],
        pointers: [{ from: "arr", toAddr: "0x3000" }],
        terminal: []
      },
      {
        line: 12,
        explanation: "free(arr) returns heap memory to the OS. The heap block is deallocated, BUT 'arr' still points to 0x3000 (DANGLING POINTER)!",
        vivaTip: "<strong>Dangling Pointer Viva Question:</strong> What is a dangling pointer? A pointer pointing to memory that was already deallocated with free().",
        stack: [
          { name: "arr", type: "int*", address: "0x1000", value: "0x3000 (dangling!)", bytes: 8, isDangling: true, isUpdated: true }
        ],
        heap: [
          { name: "freed_block", address: "0x3000", value: "[FREED]", bytes: 8, isFreed: true }
        ],
        pointers: [],
        terminal: ["arr[0] = 42"]
      },
      {
        line: 13,
        explanation: "arr = NULL safely resets the pointer to 0x0. Now it points to nothing and cannot cause accidental memory corruption.",
        vivaTip: "<strong>Gold Standard Rule:</strong> Always set pointers to NULL right after freeing them!",
        stack: [
          { name: "arr", type: "int*", address: "0x1000", value: "NULL (0x0)", bytes: 8, isUpdated: true }
        ],
        heap: [
          { name: "freed_block", address: "0x3000", value: "[FREED]", bytes: 8, isFreed: true }
        ],
        pointers: [],
        terminal: ["arr[0] = 42", "Heap memory freed. Pointer safely set to NULL."]
      }
    ]
  },

  // 11. Recursion Call Stack (Fibonacci)
  recursion_fib: {
    category: "Functions & Scope",
    title: "11. Recursion Call Stack (Fibonacci Tree)",
    code: `#include <stdio.h>

int fib(int n) {
    if (n <= 1)
        return n;
    return fib(n - 1) + fib(n - 2);
}

int main() {
    int ans = fib(3);
    printf("fib(3) = %d\\n", ans);
    return 0;
}`,
    steps: [
      {
        line: 10,
        explanation: "main() calls fib(3). Stack frame for fib(n=3) pushed.",
        vivaTip: "<strong>Call Stack:</strong> Every recursive call pushes a new activation record (stack frame) with its own parameter copies.",
        stack: [
          { name: "main::ans", type: "int", address: "0x1000", value: "?", bytes: 4 },
          { name: "fib(3)::n", type: "int", address: "0x0FD0", value: "3", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: []
      },
      {
        line: 6,
        explanation: "fib(3) calls fib(2). New stack frame fib(n=2) pushed on top.",
        vivaTip: "<strong>LIFO (Last In First Out):</strong> The most recent function call must complete before earlier calls can resume.",
        stack: [
          { name: "main::ans", type: "int", address: "0x1000", value: "?", bytes: 4 },
          { name: "fib(3)::n", type: "int", address: "0x0FD0", value: "3", bytes: 4 },
          { name: "fib(2)::n", type: "int", address: "0x0FA0", value: "2", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: []
      },
      {
        line: 6,
        explanation: "fib(2) calls fib(1). New stack frame fib(n=1) pushed.",
        vivaTip: "<strong>Stack Depth:</strong> Maximum stack height is proportional to the recursion depth.",
        stack: [
          { name: "main::ans", type: "int", address: "0x1000", value: "?", bytes: 4 },
          { name: "fib(3)::n", type: "int", address: "0x0FD0", value: "3", bytes: 4 },
          { name: "fib(2)::n", type: "int", address: "0x0FA0", value: "2", bytes: 4 },
          { name: "fib(1)::n", type: "int", address: "0x0F70", value: "1", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: []
      },
      {
        line: 5,
        explanation: "Base case! In fib(1), n <= 1 is TRUE. Returns 1. Stack frame for fib(1) is popped!",
        vivaTip: "<strong>Base Case:</strong> The termination condition prevents infinite recursion and Stack Overflow.",
        stack: [
          { name: "main::ans", type: "int", address: "0x1000", value: "?", bytes: 4 },
          { name: "fib(3)::n", type: "int", address: "0x0FD0", value: "3", bytes: 4 },
          { name: "fib(2)::n", type: "int", address: "0x0FA0", value: "2", bytes: 4 }
        ],
        pointers: [],
        terminal: ["fib(1) returned 1"]
      },
      {
        line: 6,
        explanation: "fib(2) now evaluates fib(0). fib(0) returns 0. fib(2) computes 1 + 0 = 1 and returns 1. Frame fib(2) is popped!",
        vivaTip: "<strong>Unwinding:</strong> Returning intermediate sums to the parent caller.",
        stack: [
          { name: "main::ans", type: "int", address: "0x1000", value: "?", bytes: 4 },
          { name: "fib(3)::n", type: "int", address: "0x0FD0", value: "3", bytes: 4 }
        ],
        pointers: [],
        terminal: ["fib(2) returned 1"]
      },
      {
        line: 6,
        explanation: "fib(3) evaluates fib(1) (which returns 1). fib(3) computes: 1 + 1 = 2. Returns 2 to main(). All fib frames popped!",
        vivaTip: "<strong>Final Return:</strong> ans in main receives 2.",
        stack: [
          { name: "main::ans", type: "int", address: "0x1000", value: "2", bytes: 4, isUpdated: true }
        ],
        pointers: [],
        terminal: ["fib(3) = 2"]
      }
    ]
  },

  // 12. Bitwise Operators & Registers
  bitwise_ops: {
    category: "Bitwise Operations",
    title: "12. Bitwise Operators (AND, OR, XOR, Shift)",
    code: `#include <stdio.h>

int main() {
    unsigned char a = 5;  // Binary: 0000 0101
    unsigned char b = 3;  // Binary: 0000 0011
    
    unsigned char bit_and = a & b;  // 0000 0001 = 1
    unsigned char bit_or  = a | b;  // 0000 0111 = 7
    unsigned char bit_xor = a ^ b;  // 0000 0110 = 6
    unsigned char bit_shl = a << 1; // 0000 1010 = 10 (multiplied by 2!)
    unsigned char bit_shr = a >> 1; // 0000 0010 = 2  (divided by 2!)
    
    printf("a & b = %d\\n", bit_and);
    printf("a << 1 = %d\\n", bit_shl);
    return 0;
}`,
    steps: [
      {
        line: 4,
        explanation: "a = 5. In 8-bit binary: 0000 0101. b = 3. In 8-bit binary: 0000 0011.",
        vivaTip: "<strong>Bitwise vs Logical:</strong> '&' is bitwise AND; '&&' is logical AND. '|' is bitwise OR; '||' is logical OR.",
        stack: [
          { name: "a", type: "unsigned char", address: "0x1000", value: "5 [0000 0101]", bytes: 1, isUpdated: true },
          { name: "b", type: "unsigned char", address: "0x1001", value: "3 [0000 0011]", bytes: 1, isUpdated: true }
        ],
        pointers: [],
        terminal: ["a = 5 (00000101), b = 3 (00000011)"]
      },
      {
        line: 7,
        explanation: "Bitwise AND (a & b): 0101 & 0011 = 0001 (decimal 1). Bit is 1 ONLY if BOTH bits are 1.",
        vivaTip: "<strong>Masking:</strong> Bitwise AND is widely used to check or clear specific flags and register bits.",
        stack: [
          { name: "a", type: "unsigned char", address: "0x1000", value: "5 [0000 0101]", bytes: 1 },
          { name: "b", type: "unsigned char", address: "0x1001", value: "3 [0000 0011]", bytes: 1 },
          { name: "bit_and", type: "unsigned char", address: "0x1002", value: "1 [0000 0001]", bytes: 1, isUpdated: true }
        ],
        pointers: [],
        terminal: ["a & b = 1 [00000001]"]
      },
      {
        line: 8,
        explanation: "Bitwise OR (a | b): 0101 | 0011 = 0111 (decimal 7). Bit is 1 if EITHER bit is 1.",
        vivaTip: "<strong>Setting Bits:</strong> Bitwise OR is used to turn on (set) specific bits without altering other bits.",
        stack: [
          { name: "bit_and", type: "unsigned char", address: "0x1002", value: "1 [0000 0001]", bytes: 1 },
          { name: "bit_or", type: "unsigned char", address: "0x1003", value: "7 [0000 0111]", bytes: 1, isUpdated: true }
        ],
        pointers: [],
        terminal: ["a & b = 1", "a | b = 7 [00000111]"]
      },
      {
        line: 10,
        explanation: "LEFT SHIFT (a << 1): Shifts bits left by 1 position (0000 0101 becomes 0000 1010 = 10). Multiplying by 2!",
        vivaTip: "<strong>Super Exam Trick:</strong> Shifting left by k positions (x << k) multiplies x by 2^k! Shifting right (x >> k) divides x by 2^k!",
        stack: [
          { name: "bit_shl (a << 1)", type: "unsigned char", address: "0x1005", value: "10 [0000 1010]", bytes: 1, isUpdated: true }
        ],
        pointers: [],
        terminal: ["a & b = 1", "a | b = 7", "a << 1 = 10 (Fast multiplication by 2!)"]
      }
    ]
  }
};

// Token Explanation Dictionary for Interactive Cursor Hovering
const TOKEN_DEFINITIONS = {
  "int": "Primitive data type. 32-bit signed integer (-2,147,483,648 to 2,147,483,647). Allocates 4 bytes.",
  "char": "Single byte character/integer (-128 to 127). Allocates 1 byte.",
  "float": "Single-precision IEEE 754 floating point number. Allocates 4 bytes.",
  "double": "Double-precision floating point number. Allocates 8 bytes.",
  "void": "Empty type indicating function returns nothing or generic pointer (void*).",
  "*": "DEREFERENCE operator when reading/writing (*p). In type declarations (int *p), designates a pointer.",
  "&": "ADDRESS-OF operator. Returns the exact RAM address of any variable (&x).",
  "->": "ARROW operator. Member access for pointers to structures (ptr->field == (*ptr).field).",
  ".": "DOT operator. Direct member access on structure/union variables (s.field).",
  "malloc": "Memory Allocation from <stdlib.h>. Dynamically reserves N bytes on the HEAP at runtime.",
  "calloc": "Contiguous Allocation from <stdlib.h>. Allocates heap memory and initializes all bytes to 0.",
  "realloc": "Re-allocates and resizes existing heap memory chunk.",
  "free": "Deallocates dynamically allocated heap memory to avoid memory leaks.",
  "sizeof": "Compile-time operator returning size in bytes of a data type or object.",
  "NULL": "Macro constant for memory address 0 ((void*)0). Indicates pointer points to nothing.",
  "printf": "Standard formatted print to stdout console.",
  "scanf": "Standard formatted input from stdin. Requires '&' for variables so it can write directly to their memory address!",
  "return": "Exits current function and returns value to caller."
};
