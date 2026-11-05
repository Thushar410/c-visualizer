/**
 * C-Viz Engine — Shree Devi College of Information Science
 * Turbo C / Turbo C7 Lab Exam Syllabus (All 16 Programs)
 * Complete Breakdown of:
 * 1. Role of Every Function
 * 2. Role of Every Single Loop & Condition
 * 3. Step-by-step Memory & Output Animation
 * 4. Specific Viva Questions for each program
 */

const LAB_PROGRAMS = {
  // ==========================================
  // PART A : PROGRAM 1 - QUADRATIC EQUATION
  // ==========================================
  partA_prog1: {
    part: "Part A - Program 1",
    title: "Roots of Quadratic Equation (else-if ladder)",
    code: `#include<stdio.h> 
#include<conio.h> 
#include<math.h> 

main() 
{ 
    float a,b,c,d,r1,r2; 
    clrscr();
    printf("Enter the coefficients of the quadratic equation\\n"); 
    scanf("%f%f%f", &a,&b,&c); 
    
    d = b*b - 4*a*c; 
    
    if (d == 0) 
    { 
        printf("The roots are real and equal\\n"); 
        r1 = -b / (2*a); 
        r2 = r1; 
        printf("root1 = %f\\n", r1); 
        printf("root2 = %f\\n", r2); 
    } 
    else if (d > 0) 
    { 
        printf("The roots are real and different\\n"); 
        r1 = (-b + sqrt(d)) / (2*a); 
        r2 = (-b - sqrt(d)) / (2*a); 
        printf("root1 = %f\\n", r1); 
        printf("root2 = %f\\n", r2); 
    } 
    else 
    { 
        printf("The roots are imaginary\\n"); 
    } 
    getch(); 
    return 0; 
}`,
    functionRoles: [
      { name: "main()", role: "Entry Point", desc: "The execution starts here. Required in every C program." },
      { name: "clrscr()", role: "Turbo C Utility (conio.h)", desc: "Clears previous output from the MS-DOS screen so you see only the fresh output." },
      { name: "printf()", role: "Standard Output (stdio.h)", desc: "Displays formatted text and root values to the user." },
      { name: "scanf()", role: "Standard Input (stdio.h)", desc: "Reads coefficients a, b, c from user. Notice '&' is passed so scanf knows the memory address to store values." },
      { name: "sqrt(d)", role: "Math Function (math.h)", desc: "Computes the square root of the discriminant 'd'. Can only accept non-negative numbers (d >= 0)." },
      { name: "getch()", role: "Turbo C Screen Freeze (conio.h)", desc: "Waits for a single key press so the MS-DOS output window stays open. Without this in Turbo C, the screen closes instantly!" }
    ],
    loopBreakdown: [
      {
        type: "Branching: else-if ladder",
        header: "if (d == 0) ... else if (d > 0) ... else",
        purpose: "Determines the nature of the roots based on Discriminant (d = b² - 4ac).",
        details: [
          "Case 1: d == 0: Real & Equal roots. Square root is 0, so formula simplifies to: r1 = r2 = -b / (2a).",
          "Case 2: d > 0: Real & Distinct roots. sqrt(d) produces a positive real number. Uses quadratic formula (-b ± √d) / 2a.",
          "Case 3: else (d < 0): Imaginary roots. Square root of negative number is not a real number."
        ]
      }
    ],
    vivaQuestions: [
      { q: "What is 'd' called and what is the formula?", a: "Discriminant, formula is d = b*b - 4*a*c." },
      { q: "Why do we include <math.h>?", a: "Because we use the mathematical function sqrt() to find the square root of d." },
      { q: "What happens if a = 0 in a quadratic equation?", a: "Division by zero error (2*a = 0) occurs! In math, if a=0 it is no longer quadratic; it becomes linear." }
    ],
    steps: [
      { line: 8, explanation: "Allocates memory for floating-point coefficients (a, b, c), discriminant (d), and roots (r1, r2).", stack: [{ name: "a", value: "?", type: "float", address: "0x1000" }, { name: "b", value: "?", type: "float", address: "0x1004" }, { name: "c", value: "?", type: "float", address: "0x1008" }, { name: "d", value: "?", type: "float", address: "0x100C" }], terminal: [] },
      { line: 11, explanation: "User enters coefficients: a = 1, b = -3, c = 2.", stack: [{ name: "a", value: "1.0", type: "float", address: "0x1000", isUpdated: true }, { name: "b", value: "-3.0", type: "float", address: "0x1004", isUpdated: true }, { name: "c", value: "2.0", type: "float", address: "0x1008", isUpdated: true }, { name: "d", value: "?", type: "float", address: "0x100C" }], terminal: ["Enter coefficients: 1 -3 2"] },
      { line: 13, explanation: "Calculates discriminant d = (-3)^2 - 4(1)(2) = 9 - 8 = 1.0.", stack: [{ name: "a", value: "1.0", type: "float", address: "0x1000" }, { name: "b", value: "-3.0", type: "float", address: "0x1004" }, { name: "c", value: "2.0", type: "float", address: "0x1008" }, { name: "d", value: "1.0", type: "float", address: "0x100C", isUpdated: true }], terminal: ["Enter coefficients: 1 -3 2"] },
      { line: 24, explanation: "Checks (d > 0): 1.0 > 0 is TRUE! Executes 'else if' block for real and distinct roots.", stack: [{ name: "d", value: "1.0", type: "float", address: "0x100C" }], terminal: ["Enter coefficients: 1 -3 2", "The roots are real and different"] },
      { line: 27, explanation: "r1 = (-(-3) + sqrt(1)) / 2(1) = (3 + 1)/2 = 2.0. r2 = (3 - 1)/2 = 1.0.", stack: [{ name: "r1", value: "2.000000", type: "float", address: "0x1010", isUpdated: true }, { name: "r2", value: "1.000000", type: "float", address: "0x1014", isUpdated: true }], terminal: ["The roots are real and different", "root1 = 2.000000", "root2 = 1.000000"] }
    ]
  },

  // ==========================================
  // PART A : PROGRAM 2 - SWITCH CASE CALCULATOR
  // ==========================================
  partA_prog2: {
    part: "Part A - Program 2",
    title: "Arithmetic Operations using switch-case (+, -, *, /, %)",
    code: `#include<stdio.h> 
#include<conio.h> 

void main() 
{ 
    int a, b, sum, diff, prod, div, mod; 
    char oper; 
    clrscr(); 
    printf("Enter any one of the arithmetic operator(+, -, *, /, %)\\n"); 
    scanf("%c", &oper); 
    printf("Enter two integer values\\n"); 
    scanf("%d%d", &a, &b); 
    
    switch(oper) 
    { 
        case '+': sum = a + b; 
                  printf("Sum of two integers is =%d\\n", sum); 
                  break; 
        case '-': diff = a - b; 
                  printf("Difference of two integers is =%d\\n", diff); 
                  break; 
        case '*': prod = a * b; 
                  printf("Product of two integers is =%d\\n", prod); 
                  break; 
        case '/': div = a / b; 
                  printf("Division of two integers is =%d\\n", div); 
                  break; 
        case '%': mod = a % b; 
                  printf("Modulus(Remainder) of two integers is =%d\\n", mod); 
                  break; 
        default : printf("Invalid operator"); 
    } 
    getch(); 
}`,
    functionRoles: [
      { name: "main()", role: "Program Controller", desc: "Coordinates reading the operator and operands, and routing to the right case." },
      { name: "clrscr()", role: "Screen Clear", desc: "Clears previous output in Turbo C." },
      { name: "scanf('%c')", role: "Character Input", desc: "Reads a single arithmetic character (+, -, *, /, %) into the char variable 'oper'." },
      { name: "getch()", role: "Screen Pause", desc: "Keeps output visible on Turbo C until a key is pressed." }
    ],
    loopBreakdown: [
      {
        type: "Selection Control: switch(oper)",
        header: "switch(oper) { case '+': ... break; ... default: ... }",
        purpose: "Jumps directly to the code matching the operator character.",
        details: [
          "Role of 'break': CRITICAL! Terminates the switch statement after executing the matched case. If you omit 'break', execution 'falls through' to all subsequent cases!",
          "Role of 'default': Executes when 'oper' doesn't match any case (e.g. user entered '$' or '&'). Handles invalid user input gracefully."
        ]
      }
    ],
    vivaQuestions: [
      { q: "What happens if you forget to write 'break' inside a case?", a: "FALL-THROUGH occurs! All statements in the following cases execute until a break or end of switch is hit." },
      { q: "Can float variables be used in switch condition?", a: "NO! In C, switch expressions MUST evaluate to an integer or character type (int, char, enum)." },
      { q: "What does the '%' operator do?", a: "Modulus operator: returns the remainder of integer division (e.g. 20 % 3 = 2). Both operands must be integers!" }
    ],
    steps: [
      { line: 9, explanation: "User enters operator '+' and two numbers: a = 20, b = 5.", stack: [{ name: "oper", value: "'+'", type: "char", address: "0x1000", isUpdated: true }, { name: "a", value: "20", type: "int", address: "0x1004", isUpdated: true }, { name: "b", value: "5", type: "int", address: "0x1008", isUpdated: true }], terminal: ["Operator: +", "Inputs: 20 and 5"] },
      { line: 16, explanation: "switch(oper) compares oper with cases. It matches case '+':", stack: [{ name: "oper", value: "'+'", type: "char", address: "0x1000" }], terminal: ["Matched case '+'"] },
      { line: 17, explanation: "Calculates sum = 20 + 5 = 25 and stores in variable 'sum'.", stack: [{ name: "sum", value: "25", type: "int", address: "0x100C", isUpdated: true }], terminal: ["Sum of two integers is = 25"] },
      { line: 19, explanation: "'break' statement encountered. Immediately exits switch block to getch().", stack: [], terminal: ["Sum of two integers is = 25", "Switched out safely."] }
    ]
  },

  // ==========================================
  // PART A : PROGRAM 3 - REVERSE & PALINDROME
  // ==========================================
  partA_prog3: {
    part: "Part A - Program 3",
    title: "Reverse a Number, Sum of Digits & Palindrome Check",
    code: `#include<stdio.h> 
#include<conio.h> 

void main() 
{ 
    int n, temp, r, rev, sum; 
    sum = 0; 
    rev = 0; 
    clrscr();
    printf("Enter a number\\n"); 
    scanf("%d", &n); 
    
    temp = n; // Save original number
    
    while(n > 0) 
    { 
        r = n % 10;        // 1. Extract last digit
        sum = sum + r;     // 2. Add to sum
        rev = rev * 10 + r; // 3. Build reversed number
        n = n / 10;        // 4. Chop off last digit
    } 
    
    printf("Sum of individual digits is=%d\\n", sum); 
    printf("The reverse of the given number %d is %d\\n", temp, rev); 
    
    if(temp == rev) 
        printf("Given number %d is palindrome\\n", temp); 
    else 
        printf("Given number %d is not palindrome\\n", temp); 
        
    getch(); 
}`,
    functionRoles: [
      { name: "main()", role: "Driver", desc: "Controls reading n, executing while loop, and comparing temp with rev." },
      { name: "clrscr() & getch()", role: "Turbo C Display", desc: "Clears previous runs and holds output." }
    ],
    loopBreakdown: [
      {
        type: "while(n > 0)",
        header: "while(n > 0) { ... }",
        purpose: "Extracts digits from right to left one by one until n becomes 0.",
        details: [
          "r = n % 10: Extracts the rightmost digit (e.g. 123 % 10 = 3).",
          "sum = sum + r: Accumulates the sum of extracted digits.",
          "rev = rev * 10 + r: Shifts existing reversed digits left by 1 decimal place (* 10) and appends the new digit r.",
          "n = n / 10: Integer division removes the last digit (e.g. 123 / 10 = 12). This is why the loop eventually stops when n becomes 0!"
        ]
      }
    ],
    vivaQuestions: [
      { q: "Why do we store 'temp = n' before the while loop?", a: "Because the while loop continuously divides 'n' by 10 until n becomes 0! If we didn't save n into temp, we would lose the original number and couldn't check palindrome!" },
      { q: "Why is rev multiplied by 10: 'rev = rev * 10 + r'?", a: "Because in our base-10 decimal system, to shift digits to higher place values (units -> tens -> hundreds), we must multiply by 10 before adding the next digit." },
      { q: "What is a Palindrome number?", a: "A number that remains identical when its digits are reversed (e.g., 121, 1331)." }
    ],
    steps: [
      { line: 12, explanation: "User enters n = 123. Copy saved: temp = 123. sum = 0, rev = 0.", stack: [{ name: "n", value: "123", type: "int", address: "0x1000", isUpdated: true }, { name: "temp", value: "123", type: "int", address: "0x1004", isUpdated: true }, { name: "sum", value: "0", type: "int", address: "0x1008" }, { name: "rev", value: "0", type: "int", address: "0x100C" }], terminal: ["Enter number: 123"] },
      { line: 16, explanation: "Iteration 1: r = 123 % 10 = 3. sum = 0 + 3 = 3. rev = 0*10 + 3 = 3. n = 123 / 10 = 12.", stack: [{ name: "r", value: "3", type: "int", address: "0x1010", isUpdated: true }, { name: "sum", value: "3", type: "int", address: "0x1008", isUpdated: true }, { name: "rev", value: "3", type: "int", address: "0x100C", isUpdated: true }, { name: "n", value: "12", type: "int", address: "0x1000", isUpdated: true }], terminal: ["Iteration 1: extracted 3, n becomes 12"] },
      { line: 16, explanation: "Iteration 2: r = 12 % 10 = 2. sum = 3 + 2 = 5. rev = 3*10 + 2 = 32. n = 12 / 10 = 1.", stack: [{ name: "r", value: "2", type: "int", address: "0x1010", isUpdated: true }, { name: "sum", value: "5", type: "int", address: "0x1008", isUpdated: true }, { name: "rev", value: "32", type: "int", address: "0x100C", isUpdated: true }, { name: "n", value: "1", type: "int", address: "0x1000", isUpdated: true }], terminal: ["Iteration 2: extracted 2, n becomes 1"] },
      { line: 16, explanation: "Iteration 3: r = 1 % 10 = 1. sum = 5 + 1 = 6. rev = 32*10 + 1 = 321. n = 1 / 10 = 0.", stack: [{ name: "r", value: "1", type: "int", address: "0x1010", isUpdated: true }, { name: "sum", value: "6", type: "int", address: "0x1008", isUpdated: true }, { name: "rev", value: "321", type: "int", address: "0x100C", isUpdated: true }, { name: "n", value: "0", type: "int", address: "0x1000", isUpdated: true }], terminal: ["Iteration 3: extracted 1, n becomes 0"] },
      { line: 22, explanation: "Loop ends because (n > 0) is now FALSE. Prints sum=6, rev=321.", stack: [], terminal: ["Sum of digits is = 6", "The reverse of 123 is 321"] },
      { line: 26, explanation: "Checks (temp == rev) -> 123 == 321 is FALSE. Prints 'Not palindrome'.", stack: [], terminal: ["Given number 123 is not palindrome"] }
    ]
  },

  // ==========================================
  // PART A : PROGRAM 4 - FIBONACCI NUMBERS
  // ==========================================
  partA_prog4: {
    part: "Part A - Program 4",
    title: "Calculate & Display First 'n' Fibonacci Numbers",
    code: `#include<stdio.h> 
#include<conio.h> 

void main() 
{ 
    int n, first, second, third, count; 
    clrscr(); 
    first = 0; 
    second = 1; 
    count = 2; // Already printed first 2 terms
    
    printf("Enter a number\\n"); 
    scanf("%d", &n); 
    
    printf("Fibonacci numbers are: \\n"); 
    printf("%d\\t%d\\t", first, second); 
    
    while(count < n) 
    { 
        third = first + second; 
        printf("%d\\t", third); 
        first = second;   // Slide window forward
        second = third;   // Slide window forward
        count = count + 1; 
    } 
    getch(); 
}`,
    functionRoles: [
      { name: "main()", role: "Driver", desc: "Generates the Fibonacci series sequentially." },
      { name: "printf('%d\\t')", role: "Tab-separated Output", desc: "\\t inserts a horizontal tab space between Fibonacci numbers for clean display." }
    ],
    loopBreakdown: [
      {
        type: "while(count < n)",
        header: "while(count < n) { third = first + second; ... count++; }",
        purpose: "Generates the remaining (n - 2) terms using the Fibonacci recurrence: F(n) = F(n-1) + F(n-2).",
        details: [
          "Why is count initialized to 2? Because the first two numbers (0 and 1) are printed BEFORE entering the while loop!",
          "first = second; second = third: This is the 'Sliding Window' technique. It discards the oldest number and prepares variables for the next addition.",
          "count = count + 1: Counter variable ensures the loop executes exactly until n numbers are printed."
        ]
      }
    ],
    vivaQuestions: [
      { q: "What is a Fibonacci series?", a: "A sequence where every number is the sum of the preceding two numbers, starting with 0 and 1 (0, 1, 1, 2, 3, 5, 8...)." },
      { q: "Why initialize count = 2 instead of 0?", a: "Because first=0 and second=1 are already printed outside the loop (2 numbers done)." }
    ],
    steps: [
      { line: 9, explanation: "first = 0, second = 1, count = 2. User enters n = 5.", stack: [{ name: "first", value: "0", type: "int", address: "0x1000" }, { name: "second", value: "1", type: "int", address: "0x1004" }, { name: "count", value: "2", type: "int", address: "0x1008" }, { name: "n", value: "5", type: "int", address: "0x100C" }], terminal: ["0    1"] },
      { line: 19, explanation: "Iteration 1 (count=2 < 5): third = 0 + 1 = 1. Print 1. Slide: first=1, second=1. count becomes 3.", stack: [{ name: "third", value: "1", type: "int", address: "0x1010", isUpdated: true }, { name: "first", value: "1", type: "int", address: "0x1000", isUpdated: true }, { name: "second", value: "1", type: "int", address: "0x1004" }, { name: "count", value: "3", type: "int", address: "0x1008", isUpdated: true }], terminal: ["0    1    1"] },
      { line: 19, explanation: "Iteration 2 (count=3 < 5): third = 1 + 1 = 2. Print 2. Slide: first=1, second=2. count becomes 4.", stack: [{ name: "third", value: "2", type: "int", address: "0x1010", isUpdated: true }, { name: "first", value: "1", type: "int", address: "0x1000" }, { name: "second", value: "2", type: "int", address: "0x1004", isUpdated: true }, { name: "count", value: "4", type: "int", address: "0x1008", isUpdated: true }], terminal: ["0    1    1    2"] },
      { line: 19, explanation: "Iteration 3 (count=4 < 5): third = 1 + 2 = 3. Print 3. Slide: first=2, second=3. count becomes 5.", stack: [{ name: "third", value: "3", type: "int", address: "0x1010", isUpdated: true }, { name: "first", value: "2", type: "int", address: "0x1000", isUpdated: true }, { name: "second", value: "3", type: "int", address: "0x1004", isUpdated: true }, { name: "count", value: "5", type: "int", address: "0x1008", isUpdated: true }], terminal: ["0    1    1    2    3"] },
      { line: 26, explanation: "count=5 is no longer < 5. Loop terminates. Exactly 5 Fibonacci numbers generated!", stack: [], terminal: ["0    1    1    2    3", "Finished."] }
    ]
  },

  // ==========================================
  // PART A : PROGRAM 5 - PRIME NUMBER CHECK
  // ==========================================
  partA_prog5: {
    part: "Part A - Program 5",
    title: "Check Whether a Given Number is Prime or Not",
    code: `#include<stdio.h> 
#include<conio.h> 

void main() 
{ 
    int n, i, flag = 0; 
    clrscr(); 
    printf("Enter a number\\n"); 
    scanf("%d", &n); 
    
    for(i = 2; i <= n/2; i++) 
    { 
        if(n % i == 0) 
        { 
            flag = 1; // Divisor found! Not prime!
            break;    // Stop testing immediately
        } 
    } 
    
    if(flag == 0) 
        printf("%d is a prime number", n); 
    else 
        printf("%d is not a prime number", n); 
        
    getch(); 
}`,
    functionRoles: [
      { name: "main()", role: "Driver", desc: "Checks primality using trial division." }
    ],
    loopBreakdown: [
      {
        type: "for(i = 2; i <= n/2; i++)",
        header: "for(i = 2; i <= n/2; i++)",
        purpose: "Tests if any integer from 2 up to n/2 evenly divides n.",
        details: [
          "Why start at i = 2? Because 1 divides every number, which doesn't prove or disprove primality.",
          "Why stop at n/2? No number can be evenly divided by any number greater than its half (except itself). Stopping at n/2 cuts execution time in half!",
          "Role of 'flag': A signal variable (boolean flag). Initialized to 0 (assume prime). If any divisor is found (n % i == 0), flag turns to 1.",
          "Role of 'break': Once a divisor is found, there is NO NEED to check further. 'break' exits the loop immediately for maximum efficiency!"
        ]
      }
    ],
    vivaQuestions: [
      { q: "What is a Prime number?", a: "A positive integer greater than 1 that has no positive divisors other than 1 and itself (e.g. 2, 3, 5, 7, 11)." },
      { q: "Why do we use 'break' in prime check?", a: "Optimization! For example, for n=1000, i=2 divides it immediately (1000%2==0). 'break' saves 498 useless iterations!" },
      { q: "Could we test up to sqrt(n) instead of n/2?", a: "YES! Testing up to sqrt(n) is even faster (O(√n)), but n/2 is simple and standard in introductory lab courses." }
    ],
    steps: [
      { line: 6, explanation: "n = 9, flag = 0 (assumes prime). n/2 = 9/2 = 4 (integer division).", stack: [{ name: "n", value: "9", type: "int", address: "0x1000" }, { name: "flag", value: "0", type: "int", address: "0x1004" }], terminal: ["Enter number: 9"] },
      { line: 11, explanation: "i = 2: Test 9 % 2 == 0 -> Remainder 1 (FALSE). Loop continues.", stack: [{ name: "i", value: "2", type: "int", address: "0x1008", isUpdated: true }], terminal: ["i=2: 9%2 != 0"] },
      { line: 11, explanation: "i = 3: Test 9 % 3 == 0 -> Remainder 0 (TRUE!). Divisor found!", stack: [{ name: "i", value: "3", type: "int", address: "0x1008", isUpdated: true }], terminal: ["i=3: 9%3 == 0! Divisor found!"] },
      { line: 15, explanation: "flag set to 1. 'break' triggers and immediately exits loop.", stack: [{ name: "flag", value: "1", type: "int", address: "0x1004", isUpdated: true }], terminal: ["flag set to 1. break!"] },
      { line: 22, explanation: "Check (flag == 0) -> 1 == 0 is FALSE. Prints '9 is not a prime number'.", stack: [], terminal: ["9 is not a prime number"] }
    ]
  },

  // ==========================================
  // PART A : PROGRAM 6 - CHARACTER FREQUENCY
  // ==========================================
  partA_prog6: {
    part: "Part A - Program 6",
    title: "Count Occurrences of Each Character in a String",
    code: `#include<stdio.h> 
#include<string.h> 
#include<conio.h> 
#define MAX_SIZE 100 

void main() 
{ 
    char str[MAX_SIZE]; 
    int i, len; 
    int freq[26]; 
    clrscr(); 
    
    printf("Enter any string: "); 
    gets(str); 
    len = strlen(str); 
    
    for(i=0; i<26; i++) 
    { 
        freq[i] = 0; 
    } 
    
    for(i=0; i<len; i++) 
    { 
        if(str[i]>='a' && str[i]<='z') 
            freq[str[i] - 97]++; 
        else if(str[i]>='A' && str[i]<='Z') 
            freq[str[i] - 65]++; 
    } 
    
    printf("\\nFrequency of all characters in the given string: \\n"); 
    for(i=0; i<26; i++) 
    { 
        if(freq[i] != 0) 
            printf(" '%c' = %d\\n", (i + 97), freq[i]); 
    } 
    getch(); 
}`,
    functionRoles: [
      { name: "gets(str)", role: "String Input (stdio.h)", desc: "Reads a full line of text including spaces until Enter key is pressed (unlike scanf('%s') which stops at space)." },
      { name: "strlen(str)", role: "String Length (string.h)", desc: "Counts characters in str up to (but not including) the '\\0' null terminator." }
    ],
    loopBreakdown: [
      {
        type: "Loop 1: Initialization",
        header: "for(i=0; i<26; i++) freq[i] = 0;",
        purpose: "Clears garbage memory by setting all 26 alphabet counters to 0.",
        details: ["Array index 0 corresponds to 'a', 1 to 'b' ... 25 to 'z'."]
      },
      {
        type: "Loop 2: Frequency Counting",
        header: "for(i=0; i<len; i++) { ... }",
        purpose: "Iterates through each character of user's input string.",
        details: [
          "str[i] - 97: ASCII code for 'a' is 97. If str[i] is 'a', 97 - 97 = index 0. If 'b', 98 - 97 = index 1.",
          "str[i] - 65: ASCII code for 'A' is 65. Maps uppercase 'A' to index 0, so counting is case-insensitive!",
          "freq[...]++: Increments the frequency counter at that alphabet's index."
        ]
      },
      {
        type: "Loop 3: Output Display",
        header: "for(i=0; i<26; i++) if(freq[i] != 0) ...",
        purpose: "Prints only letters that appeared at least once (freq[i] != 0).",
        details: ["(i + 97) converts index back into char: index 0 + 97 = 97 = 'a'."]
      }
    ],
    vivaQuestions: [
      { q: "Why subtract 97 in freq[str[i] - 97]?", a: "Because ASCII code of 'a' is 97. Subtracting 97 maps characters 'a' through 'z' (97-122) directly to array indices 0 through 25." },
      { q: "Why use gets() instead of scanf()?", a: "scanf(\"%s\") stops reading as soon as it hits a space. gets() reads full strings with spaces (e.g. \"Shree Devi\")." }
    ],
    steps: [
      { line: 15, explanation: "Input: 'apple'. len = 5.", stack: [{ name: "str", value: "\"apple\"", type: "char[100]", address: "0x1000" }, { name: "len", value: "5", type: "int", address: "0x1064" }], terminal: ["String: apple"] },
      { line: 18, explanation: "Loop 1: Initializes all 26 slots of freq array to 0.", stack: [{ name: "freq[0..25]", value: "all 0", type: "int[26]", address: "0x1068", isUpdated: true }], terminal: ["Frequency array initialized."] },
      { line: 22, explanation: "Loop 2: Counts letters. 'a' -> freq[0]=1. 'p' -> freq[15]=2. 'l' -> freq[11]=1. 'e' -> freq[4]=1.", stack: [{ name: "freq[0] ('a')", value: "1", type: "int", address: "0x1068", isUpdated: true }, { name: "freq[4] ('e')", value: "1", type: "int", address: "0x1078", isUpdated: true }, { name: "freq[11] ('l')", value: "1", type: "int", address: "0x1094", isUpdated: true }, { name: "freq[15] ('p')", value: "2", type: "int", address: "0x10A4", isUpdated: true }], terminal: ["Counted all letters."] },
      { line: 31, explanation: "Loop 3: Prints characters with freq != 0.", stack: [], terminal: ["'a' = 1", "'e' = 1", "'l' = 1", "'p' = 2"] }
    ]
  },

  // ==========================================
  // PART A : PROGRAM 7 - CASE TOGGLE
  // ==========================================
  partA_prog7: {
    part: "Part A - Program 7",
    title: "Toggle Case (Upper to Lower & Vice-Versa, Retain Digits)",
    code: `#include<stdio.h> 
#include<conio.h> 
#include<ctype.h> 

void main() { 
    int i; 
    char str[20]; 
    clrscr();
    printf("Enter a string with alphabets, digits and special characters\\n"); 
    gets(str); 
    
    for(i=0; str[i]!='\\0'; i++) 
    { 
        if(str[i]>='A' && str[i]<='Z') 
            str[i] = tolower(str[i]); 
        else if(str[i]>='a' && str[i]<='z') 
            str[i] = toupper(str[i]); 
    } 
    
    printf("The given string from uppercase to lowercase and vice versa is "); 
    puts(str); 
    getch(); 
}`,
    functionRoles: [
      { name: "tolower(ch)", role: "Character Function (ctype.h)", desc: "Converts uppercase alphabet to lowercase. Leaves non-alphabets unchanged." },
      { name: "toupper(ch)", role: "Character Function (ctype.h)", desc: "Converts lowercase alphabet to uppercase. Leaves digits/symbols unchanged." },
      { name: "puts(str)", role: "String Output (stdio.h)", desc: "Prints string followed automatically by a newline '\\n'." }
    ],
    loopBreakdown: [
      {
        type: "for(i=0; str[i]!='\\0'; i++)",
        header: "for(i=0; str[i]!='\\0'; i++)",
        purpose: "Scans string character by character until the null terminator '\\0'.",
        details: [
          "Condition str[i] != '\\0': In C, all strings terminate with '\\0'. Scanning continues until end of string.",
          "if(str[i]>='A' && str[i]<='Z'): Matches uppercase; flips to lower using tolower().",
          "else if(str[i]>='a' && str[i]<='z'): Matches lowercase; flips to upper using toupper().",
          "Why do digits/symbols stay unchanged? Because if str[i] is '@' or '1', both 'if' and 'else-if' conditions are false, so it is skipped!"
        ]
      }
    ],
    vivaQuestions: [
      { q: "Why include <ctype.h>?", a: "Because it contains character handling functions like tolower(), toupper(), isalpha(), isdigit()." },
      { q: "What is the difference between puts() and printf(\"%s\")?", a: "puts() automatically adds a newline '\\n' at the end; printf() does not." }
    ],
    steps: [
      { line: 9, explanation: "Input: 'Devi@123'.", stack: [{ name: "str", value: "\"Devi@123\"", type: "char[20]", address: "0x1000" }], terminal: ["Input: Devi@123"] },
      { line: 12, explanation: "i=0: 'D' is uppercase -> becomes 'd'.", stack: [{ name: "str[0]", value: "'d'", type: "char", address: "0x1000", isUpdated: true }], terminal: ["'D' -> 'd'"] },
      { line: 12, explanation: "i=1: 'e' is lowercase -> becomes 'E'. i=2: 'v' -> 'V'. i=3: 'i' -> 'I'.", stack: [{ name: "str[1..3]", value: "\"EVI\"", type: "char[3]", address: "0x1001", isUpdated: true }], terminal: ["'e'->'E', 'v'->'V', 'i'->'I'"] },
      { line: 12, explanation: "i=4,5,6,7: '@', '1', '2', '3' are neither uppercase nor lowercase. Left unchanged!", stack: [], terminal: ["Special chars and digits retained."] },
      { line: 19, explanation: "Final string: 'dEVI@123'.", stack: [], terminal: ["The given string from uppercase to lowercase and vice versa is dEVI@123"] }
    ]
  },

  // ==========================================
  // PART A : PROGRAM 8 - LINEAR SEARCH (COUNT & POSITIONS)
  // ==========================================
  partA_prog8: {
    part: "Part A - Program 8",
    title: "Search Number Occurrences & Display Positions in Array",
    code: `#include<stdio.h> 
#include<conio.h> 

void main() 
{ 
    int a[100], n, i, ele, pos = -1, count = 0; 
    clrscr(); 
    printf("Enter number of elements in an array\\n"); 
    scanf("%d", &n); 
    
    printf("Enter the elements of the array\\n"); 
    for(i=0; i<n; i++) 
        scanf("%d", &a[i]); 
        
    printf("Enter the element to be searched\\n"); 
    scanf("%d", &ele); 
    
    for(i=0; i<n; i++) 
    { 
        if(ele == a[i]) 
        { 
            pos = i; 
            printf("The element %d is found at position %d\\n", ele, pos); 
            count++; 
        } 
    } 
    
    if(pos == -1) 
        printf("The element %d is not found\\n", ele); 
    else 
        printf("The element %d is found %d times\\n", ele, count); 
        
    getch(); 
}`,
    functionRoles: [
      { name: "main()", role: "Driver", desc: "Performs Linear Search across array elements." }
    ],
    loopBreakdown: [
      {
        type: "Input Loop",
        header: "for(i=0; i<n; i++) scanf('%d', &a[i]);",
        purpose: "Reads n elements into array contiguous memory slots a[0], a[1] ... a[n-1]."
      },
      {
        type: "Search Loop (Linear Search)",
        header: "for(i=0; i<n; i++) if(ele == a[i]) { ... count++; }",
        purpose: "Compares search key 'ele' against every element in array sequentially.",
        details: [
          "Why no 'break'? Because we need to find ALL occurrences and count them! A 'break' would stop after finding the first one.",
          "count++: Increments each time a match is found.",
          "pos = i: Tracks the matching index.",
          "pos = -1 initialization: Sentinel value. If pos remains -1 after loop, ele was never found!"
        ]
      }
    ],
    vivaQuestions: [
      { q: "What is Linear Search?", a: "A sequential search algorithm that checks every element from beginning to end until found or end is reached. Time complexity = O(n)." },
      { q: "Why is 'pos' initialized to -1?", a: "Because 0 is a valid array index (a[0]). -1 is an invalid index representing 'not found'." }
    ],
    steps: [
      { line: 12, explanation: "Array: [15, 2, 1, 5, 2]. Search element ele = 2. pos = -1, count = 0.", stack: [{ name: "a[0..4]", value: "[15, 2, 1, 5, 2]", type: "int[5]", address: "0x1000" }, { name: "ele", value: "2", type: "int", address: "0x1014" }, { name: "pos", value: "-1", type: "int", address: "0x1018" }, { name: "count", value: "0", type: "int", address: "0x101C" }], terminal: ["Array: 15 2 1 5 2", "Search: 2"] },
      { line: 18, explanation: "i=1: a[1] is 2 == ele(2). MATCH! pos = 1, count = 1.", stack: [{ name: "pos", value: "1", type: "int", address: "0x1018", isUpdated: true }, { name: "count", value: "1", type: "int", address: "0x101C", isUpdated: true }], terminal: ["The element 2 is found at position 1"] },
      { line: 18, explanation: "i=4: a[4] is 2 == ele(2). MATCH! pos = 4, count = 2.", stack: [{ name: "pos", value: "4", type: "int", address: "0x1018", isUpdated: true }, { name: "count", value: "2", type: "int", address: "0x101C", isUpdated: true }], terminal: ["The element 2 is found at position 1", "The element 2 is found at position 4"] },
      { line: 28, explanation: "Loop finishes. pos != -1. Prints total count = 2 times.", stack: [], terminal: ["The element 2 is found 2 times"] }
    ]
  },

  // ==========================================
  // PART B : PROGRAM 1 - LARGEST & SMALLEST
  // ==========================================
  partB_prog1: {
    part: "Part B - Program 1",
    title: "Largest & Smallest Elements with Positions in 1D Array",
    code: `#include<stdio.h> 
#include<conio.h> 

void main() 
{ 
    int a[100], n, i, lar, small, lar_pos = 0, small_pos = 0; 
    clrscr(); 
    printf("Enter number of elements in an array\\n"); 
    scanf("%d", &n); 
    
    printf("Enter the elements of the array\\n"); 
    for(i=0; i<n; i++) 
        scanf("%d", &a[i]); 
        
    lar = a[0]; 
    small = a[0]; 
    
    for(i=0; i<n; i++) 
    { 
        if(a[i] > lar) 
        { 
            lar = a[i]; 
            lar_pos = i; 
        } 
        else if(a[i] < small) 
        { 
            small = a[i]; 
            small_pos = i; 
        } 
    } 
    
    printf("The largest element %d is found at position %d\\n", lar, lar_pos); 
    printf("The smallest element %d is found at position %d", small, small_pos); 
    getch(); 
}`,
    functionRoles: [
      { name: "main()", role: "Driver", desc: "Finds minimum and maximum in a single loop traversal." }
    ],
    loopBreakdown: [
      {
        type: "Comparison Loop",
        header: "for(i=0; i<n; i++) { if(a[i]>lar)... else if(a[i]<small)... }",
        purpose: "Scans array once and updates running largest and smallest values.",
        details: [
          "Why initialize lar = a[0] and small = a[0]? NEVER initialize lar=0 or small=0! If array contains negative numbers (e.g. [-10, -5]), lar=0 would give wrong answer. Initializing with the first element guarantees validity.",
          "if(a[i] > lar): If current element is larger than our current max, adopt it as the new 'lar' and record its index in 'lar_pos'.",
          "else if(a[i] < small): If smaller, adopt it as new 'small' and record index in 'small_pos'."
        ]
      }
    ],
    vivaQuestions: [
      { q: "Why initialize largest and smallest to a[0]?", a: "Because a[0] is guaranteed to be a real member of the dataset. Using 0 fails for negative numbers." },
      { q: "What is the time complexity?", a: "O(n) — single pass through the array." }
    ],
    steps: [
      { line: 15, explanation: "Input: [4, 5, 89, 2, 23]. Init: lar = a[0] = 4, small = a[0] = 4. Positions = 0.", stack: [{ name: "a[0..4]", value: "[4, 5, 89, 2, 23]", type: "int[5]", address: "0x1000" }, { name: "lar", value: "4", type: "int", address: "0x1014" }, { name: "small", value: "4", type: "int", address: "0x1018" }], terminal: ["Array: 4, 5, 89, 2, 23"] },
      { line: 20, explanation: "i=2: a[2]=89 > lar(5). New largest! lar = 89, lar_pos = 2.", stack: [{ name: "lar", value: "89", type: "int", address: "0x1014", isUpdated: true }, { name: "lar_pos", value: "2", type: "int", address: "0x101C", isUpdated: true }], terminal: ["i=2: Found new largest = 89 at pos 2"] },
      { line: 25, explanation: "i=3: a[3]=2 < small(4). New smallest! small = 2, small_pos = 3.", stack: [{ name: "small", value: "2", type: "int", address: "0x1018", isUpdated: true }, { name: "small_pos", value: "3", type: "int", address: "0x1020", isUpdated: true }], terminal: ["i=3: Found new smallest = 2 at pos 3"] },
      { line: 32, explanation: "Finished scanning. Largest = 89 at position 2, Smallest = 2 at position 3.", stack: [], terminal: ["The largest element 89 is found at position 2", "The smallest element 2 is found at position 3"] }
    ]
  },

  // ==========================================
  // PART B : PROGRAM 2 - BUBBLE SORT
  // ==========================================
  partB_prog2: {
    part: "Part B - Program 2",
    title: "Bubble Sort Algorithm in Ascending Order",
    code: `#include<stdio.h> 
#include<conio.h> 

void main() 
{ 
    int a[100], n, i, j, temp; 
    clrscr(); 
    printf("Enter number of elements in an array\\n"); 
    scanf("%d", &n); 
    
    printf("Enter the elements of the array\\n"); 
    for(i=0; i<n; i++) 
        scanf("%d", &a[i]); 
        
    printf("The elements of the array before sorting are: \\n"); 
    for(i=0; i<n; i++) 
        printf("%d\\t", a[i]); 
        
    // Bubble Sort nested loops
    for(i=0; i<n-1; i++) 
    { 
        for(j=0; j<n-i-1; j++) 
        { 
            if(a[j] > a[j+1]) 
            { 
                temp = a[j]; 
                a[j] = a[j+1]; 
                a[j+1] = temp; 
            } 
        } 
    } 
    
    printf("\\nThe elements of the array after sorting are:\\n"); 
    for(i=0; i<n; i++) 
        printf("%d\\t", a[i]); 
        
    getch(); 
}`,
    functionRoles: [
      { name: "main()", role: "Driver", desc: "Sorts integers in ascending order." }
    ],
    loopBreakdown: [
      {
        type: "Outer Loop: Passes",
        header: "for(i=0; i<n-1; i++)",
        purpose: "Controls the number of passes. For n elements, exactly (n - 1) passes are required to sort completely.",
        details: ["In Pass 0: The 1st largest element bubbles to the end.", "In Pass 1: The 2nd largest element bubbles to 2nd last slot."]
      },
      {
        type: "Inner Loop: Adjacent Comparisons",
        header: "for(j=0; j<n-i-1; j++)",
        purpose: "Compares adjacent elements a[j] and a[j+1].",
        details: [
          "Why is the condition 'j < n - i - 1'? Because after each pass 'i', the largest 'i' elements are ALREADY in their sorted final positions at the end! Subtracting 'i' avoids re-checking already sorted elements.",
          "Swapping logic: temp = a[j]; a[j] = a[j+1]; a[j+1] = temp; Uses 3 steps with temp variable to exchange adjacent values."
        ]
      }
    ],
    vivaQuestions: [
      { q: "Why is it called 'Bubble Sort'?", a: "Because smaller elements gradually 'bubble' up to the top (beginning) while larger elements sink to the bottom (end)." },
      { q: "What is the time complexity of Bubble Sort?", a: "Worst & Average Case: O(n²). Best Case (with sorted check): O(n)." },
      { q: "Explain why the inner loop condition has '-i-1'?", a: "'-1' prevents a[j+1] from going out of array bounds. '-i' skips the 'i' elements already sorted at the end." }
    ],
    steps: [
      { line: 15, explanation: "Before sorting: [4, 5, 89, 2, 23]. n = 5.", stack: [{ name: "a[0..4]", value: "[4, 5, 89, 2, 23]", type: "int[5]", address: "0x1000" }], terminal: ["Before sorting: 4  5  89  2  23"] },
      { line: 20, explanation: "Pass 0 (i=0): Comparing 89 and 2. 89 > 2 is TRUE! Swap 89 and 2.", stack: [{ name: "a[0..4]", value: "[4, 5, 2, 89, 23]", type: "int[5]", address: "0x1000", isUpdated: true }], terminal: ["Swapped 89 and 2: [4, 5, 2, 89, 23]"] },
      { line: 20, explanation: "Pass 0 (i=0): Comparing 89 and 23. 89 > 23 is TRUE! Swap 89 and 23.", stack: [{ name: "a[0..4]", value: "[4, 5, 2, 23, 89]", type: "int[5]", address: "0x1000", isUpdated: true }], terminal: ["Swapped 89 and 23: [4, 5, 2, 23, 89]"] },
      { line: 19, explanation: "Pass 0 Complete! Largest element 89 is locked at the end.", stack: [], terminal: ["Pass 0 Done. 89 is locked at index 4."] },
      { line: 20, explanation: "Pass 1 (i=1): Comparing 5 and 2. 5 > 2 is TRUE! Swap 5 and 2. Array becomes [4, 2, 5, 23, 89].", stack: [{ name: "a[0..4]", value: "[4, 2, 5, 23, 89]", type: "int[5]", address: "0x1000", isUpdated: true }], terminal: ["Pass 1: Swapped 5 and 2"] },
      { line: 20, explanation: "Pass 2 (i=2): Comparing 4 and 2. 4 > 2 is TRUE! Swap 4 and 2. Array becomes [2, 4, 5, 23, 89].", stack: [{ name: "a[0..4]", value: "[2, 4, 5, 23, 89]", type: "int[5]", address: "0x1000", isUpdated: true }], terminal: ["Pass 2: Swapped 4 and 2"] },
      { line: 32, explanation: "All passes complete! Array is sorted: 2  4  5  23  89.", stack: [], terminal: ["After sorting: 2  4  5  23  89"] }
    ]
  },

  // ==========================================
  // PART B : PROGRAM 3 - MATRIX ADD & MULTIPLY
  // ==========================================
  partB_prog3: {
    part: "Part B - Program 3",
    title: "Menu Driven Matrix Addition & Multiplication",
    code: `#include<stdio.h> 
#include<conio.h> 

void main() 
{ 
    int a[10][10], b[10][10], sum[10][10], prod[10][10], n, i, j, k, choice; 
    clrscr(); 
    printf("Enter the order of the matrix\\n"); 
    scanf("%d", &n); 
    
    printf("Enter elements of matrix A\\n"); 
    for(i=0; i<n; i++) 
        for(j=0; j<n; j++) 
            scanf("%d", &a[i][j]); 
            
    printf("Enter elements of matrix B\\n"); 
    for(i=0; i<n; i++) 
        for(j=0; j<n; j++) 
            scanf("%d", &b[i][j]); 
            
    printf("Enter choice:\\n1.Addition\\n2.Multiplication\\n"); 
    scanf("%d", &choice); 
    
    switch(choice) 
    { 
        case 1: // Matrix Addition (2 loops)
            for(i=0; i<n; i++) 
                for(j=0; j<n; j++) 
                    sum[i][j] = a[i][j] + b[i][j]; 
            printf("The sum matrix is:\\n"); 
            for(i=0; i<n; i++) { 
                for(j=0; j<n; j++) 
                    printf("%d\\t", sum[i][j]); 
                printf("\\n"); 
            } 
            break; 
            
        case 2: // Matrix Multiplication (3 loops)
            for(i=0; i<n; i++) { 
                for(j=0; j<n; j++) { 
                    prod[i][j] = 0; // Initialize cell
                    for(k=0; k<n; k++) 
                        prod[i][j] = prod[i][j] + a[i][k] * b[k][j]; 
                } 
            } 
            printf("The product matrix is:\\n"); 
            for(i=0; i<n; i++) { 
                for(j=0; j<n; j++) 
                    printf("%d\\t", prod[i][j]); 
                printf("\\n"); 
            } 
            break; 
        default: printf("Invalid choice"); 
    } 
    getch(); 
}`,
    functionRoles: [
      { name: "main()", role: "Driver", desc: "Performs 2D matrix operations via switch-case menu." }
    ],
    loopBreakdown: [
      {
        type: "Matrix Addition: 2 Nested Loops",
        header: "for(i=0; i<n; i++) for(j=0; j<n; j++) sum[i][j] = a[i][j] + b[i][j];",
        purpose: "Adds corresponding elements from Matrix A and B.",
        details: ["Loop i iterates through rows; Loop j iterates through columns."]
      },
      {
        type: "Matrix Multiplication: 3 Nested Loops (CRUCIAL VIVA POINT)",
        header: "for(i=0; i<n; i++) for(j=0; j<n; j++) { prod[i][j]=0; for(k=0; k<n; k++) prod[i][j] += a[i][k]*b[k][j]; }",
        purpose: "Computes the dot product of Row i of Matrix A with Column j of Matrix B.",
        details: [
          "Loop i: Selects current Row of Matrix A.",
          "Loop j: Selects current Column of Matrix B.",
          "prod[i][j] = 0: Clears accumulator before summing products.",
          "Loop k: The 'walker' variable! Walks across Row i in Matrix A (a[i][k]) while simultaneously walking down Column j in Matrix B (b[k][j])."
        ]
      }
    ],
    vivaQuestions: [
      { q: "Why are 3 nested loops required for matrix multiplication?", a: "Loop i chooses row in A, Loop j chooses column in B, and Loop k computes the dot product sum: a[i][k] * b[k][j]." },
      { q: "What condition is required to multiply two matrices?", a: "Number of columns in Matrix A MUST EQUAL number of rows in Matrix B." },
      { q: "Why must we set prod[i][j] = 0 before the k loop?", a: "Because prod[i][j] accumulates a sum! If uninitialized, it starts with garbage memory values." }
    ],
    steps: [
      { line: 9, explanation: "Order n = 2. A = [[1, 2], [3, 4]], B = [[2, 3], [4, 5]]. User selects Choice 1 (Addition).", stack: [{ name: "A", value: "[[1,2],[3,4]]", type: "int[2][2]", address: "0x1000" }, { name: "B", value: "[[2,3],[4,5]]", type: "int[2][2]", address: "0x1010" }], terminal: ["Order: 2", "Choice: 1 (Addition)"] },
      { line: 26, explanation: "Addition: sum[0][0] = 1 + 2 = 3. sum[0][1] = 2 + 3 = 5.", stack: [{ name: "sum[0][0]", value: "3", type: "int", address: "0x1020", isUpdated: true }, { name: "sum[0][1]", value: "5", type: "int", address: "0x1024", isUpdated: true }], terminal: ["3    5"] },
      { line: 26, explanation: "Addition: sum[1][0] = 3 + 4 = 7. sum[1][1] = 4 + 5 = 9.", stack: [{ name: "sum[1][0]", value: "7", type: "int", address: "0x1028", isUpdated: true }, { name: "sum[1][1]", value: "9", type: "int", address: "0x102C", isUpdated: true }], terminal: ["3    5", "7    9"] }
    ]
  },

  // ==========================================
  // PART B : PROGRAM 4 - nCr AND nPr RECURSION
  // ==========================================
  partB_prog4: {
    part: "Part B - Program 4",
    title: "Calculate nCr and nPr using Factorial Function",
    code: `#include <stdio.h> 
#include <conio.h> 

long factorial(int); 
long find_ncr(int, int); 
long find_npr(int, int); 

void main() 
{ 
    int n, r; 
    long ncr, npr; 
    clrscr(); 
    printf("Enter the value of n and r\\n"); 
    scanf("%d%d", &n, &r); 
    
    ncr = find_ncr(n, r); 
    npr = find_npr(n, r); 
    
    printf("%dC%d = %ld\\n", n, r, ncr); 
    printf("%dP%d = %ld\\n", n, r, npr); 
    getch(); 
} 

long find_ncr(int n, int r) 
{ 
    long result; 
    result = factorial(n) / (factorial(r) * factorial(n-r)); 
    return result; 
} 

long find_npr(int n, int r) 
{ 
    long result; 
    result = factorial(n) / factorial(n-r); 
    return result; 
} 

long factorial(int n) 
{ 
    int i; 
    long fact = 1; 
    for (i = 1; i <= n; i++) 
        fact = fact * i; 
    return fact; 
}`,
    functionRoles: [
      { name: "factorial(n)", role: "Helper Calculation", desc: "Computes n! = 1 * 2 * ... * n. Returns a 'long' integer to prevent overflow for larger values." },
      { name: "find_ncr(n, r)", role: "Combinations Formula", desc: "Calculates nCr = n! / (r! * (n - r)!). How many ways to choose r items from n without order." },
      { name: "find_npr(n, r)", role: "Permutations Formula", desc: "Calculates nPr = n! / (n - r)!. How many ways to arrange r items from n where order matters." }
    ],
    loopBreakdown: [
      {
        type: "for (i = 1; i <= n; i++)",
        header: "for (i = 1; i <= n; i++) fact = fact * i;",
        purpose: "Iterative factorial multiplication loop inside factorial(int n).",
        details: [
          "fact = 1: Multiplicative identity. Initialized to 1, NEVER 0!",
          "Loop multiplies fact by every integer up to n."
        ]
      }
    ],
    vivaQuestions: [
      { q: "What is the difference between Permutation (nPr) and Combination (nCr)?", a: "Permutations (nPr) consider ORDER (arrangements). Combinations (nCr) do NOT consider order (selections)." },
      { q: "Why use 'long' instead of 'int'?", a: "Because factorials grow exponentially (e.g. 8! = 40,320, which exceeds standard 16-bit Turbo C integer limit of 32,767). 'long' provides 32 bits." }
    ],
    steps: [
      { line: 14, explanation: "Inputs: n = 5, r = 2.", stack: [{ name: "n", value: "5", type: "int", address: "0x1000" }, { name: "r", value: "2", type: "int", address: "0x1004" }], terminal: ["Enter n and r: 5 2"] },
      { line: 16, explanation: "Calling find_ncr(5, 2): Computes factorial(5)=120, factorial(2)=2, factorial(3)=6.", stack: [{ name: "fact(5)", value: "120", type: "long", address: "0x0FD0" }], terminal: ["5! = 120, 2! = 2, 3! = 6"] },
      { line: 26, explanation: "nCr = 120 / (2 * 6) = 120 / 12 = 10.", stack: [{ name: "ncr", value: "10", type: "long", address: "0x1008", isUpdated: true }], terminal: ["5C2 = 10"] },
      { line: 33, explanation: "nPr = 120 / 6 = 20.", stack: [{ name: "npr", value: "20", type: "long", address: "0x1010", isUpdated: true }], terminal: ["5C2 = 10", "5P2 = 20"] }
    ]
  },

  // ==========================================
  // PART B : PROGRAM 5 - STRING CHARACTER STATS
  // ==========================================
  partB_prog5: {
    part: "Part B - Program 5",
    title: "Count Letters, Digits, Vowels, Spaces & Symbols using Function",
    code: `#include<stdio.h> 
#include<conio.h> 
#include<string.h> 
#include<ctype.h> 

void strcount(char[]); 

void main() 
{ 
    char str[20]; 
    clrscr(); 
    printf("Enter a string\\n"); 
    gets(str); 
    strcount(str); 
    getch(); 
} 

void strcount(char s[]) 
{ 
    int len, i, let, vowel, consonant, digit, space, specialch; 
    let = vowel = consonant = digit = space = specialch = 0; 
    len = strlen(s); 
    
    for(i=0; i<len; i++) 
    { 
        char ch = s[i]; 
        if (isalpha(ch)) 
        { 
            let++; 
            ch = tolower(ch); 
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') 
                vowel++; 
            else 
                consonant++; 
        } 
        else if(isdigit(ch)) 
            digit++; 
        else if(isspace(ch)) 
            space++; 
        else 
            specialch++; 
    } 
    printf("Number of letters=%d\\n", let); 
    printf("Vowels=%d\\n", vowel); 
    printf("Consonant=%d\\n", consonant); 
    printf("Digit=%d\\n", digit); 
    printf("Space=%d\\n", space); 
    printf("Special Character=%d\\n", specialch); 
}`,
    functionRoles: [
      { name: "strcount(char s[])", role: "User Defined Function", desc: "Encapsulates string analysis logic. Receives string as parameter and computes classification statistics." },
      { name: "isalpha(ch)", role: "ctype.h check", desc: "Returns non-zero (true) if ch is an alphabet ('a'-'z' or 'A'-'Z')." },
      { name: "isdigit(ch)", role: "ctype.h check", desc: "Returns true if ch is a numeric digit ('0'-'9')." },
      { name: "isspace(ch)", role: "ctype.h check", desc: "Returns true if ch is a whitespace character (' ' or tab)." }
    ],
    loopBreakdown: [
      {
        type: "for(i=0; i<len; i++)",
        header: "for(i=0; i<len; i++) { char ch = s[i]; ... }",
        purpose: "Inspects each character and branches into letter, digit, space, or symbol.",
        details: [
          "Nested letter logic: If isalpha() is true, it further checks vowels (a, e, i, o, u). If not vowel, it increments consonant.",
          "Chaining: else if (isdigit) -> else if (isspace) -> else (special character)."
        ]
      }
    ],
    vivaQuestions: [
      { q: "Why pass 'char s[]' without array size in function parameter?", a: "In C function parameters, arrays decay into pointers to the first element (char* s). Size is determined at runtime with strlen()." },
      { q: "What does isspace() recognize?", a: "Spaces ' ', tabs '\\t', newlines '\\n', and carriage returns '\\r'." }
    ],
    steps: [
      { line: 12, explanation: "Input: 'Shree Devi@123'. Passing to strcount().", stack: [{ name: "str", value: "\"Shree Devi@123\"", type: "char[20]", address: "0x1000" }], terminal: ["Input: Shree Devi@123"] },
      { line: 19, explanation: "strcount() stack frame initialized. All counters = 0.", stack: [{ name: "let", value: "0", type: "int", address: "0x0FD0" }, { name: "vowel", value: "0", type: "int", address: "0x0FD4" }], terminal: ["Counting characters..."] },
      { line: 21, explanation: "Classifies: Letters=9 ('ShreeDevi'), Vowels=5 ('eeei'), Consonants=4 ('ShrDv'), Digit=3 ('123'), Space=1 (' '), Special=1 ('@').", stack: [{ name: "let", value: "9", type: "int", address: "0x0FD0" }, { name: "vowel", value: "5", type: "int", address: "0x0FD4" }, { name: "digit", value: "3", type: "int", address: "0x0FD8" }, { name: "space", value: "1", type: "int", address: "0x0FDC" }, { name: "specialch", value: "1", type: "int", address: "0x0FE0" }], terminal: ["Letters=9", "Vowels=5", "Consonants=4", "Digit=3", "Space=1", "Special=1"] }
    ]
  },

  // ==========================================
  // PART B : PROGRAM 6 - SORT STRINGS USING POINTERS
  // ==========================================
  partB_prog6: {
    part: "Part B - Program 6",
    title: "Sort a List of Strings in Ascending Order using Pointers",
    code: `#include <stdio.h> 
#include <conio.h> 
#include <string.h> 

int main() 
{ 
    int i, j; 
    char *arr[] = {"banana", "apple", "orange", "grape", "cherry"}; 
    int n = sizeof(arr) / sizeof(arr[0]); 
    char *temp; 
    clrscr(); 
    
    // Bubble sort comparing strings with strcmp
    for (i = 0; i < n-1; i++) 
    { 
        for (j = i+1; j < n; j++) 
        { 
            if (strcmp(arr[i], arr[j]) > 0) 
            { 
                temp = arr[i];   // Swap only POINTERS,
                arr[i] = arr[j]; // not the whole character
                arr[j] = temp;   // arrays!
            } 
        } 
    } 
    
    printf("Sorted list of strings:\\n"); 
    for (i = 0; i < n; i++) 
    { 
        printf("%s\\n", arr[i]); 
    } 
    getch(); 
    return 0; 
}`,
    functionRoles: [
      { name: "strcmp(s1, s2)", role: "Lexicographical String Compare (string.h)", desc: "Compares ASCII codes of two strings character by character. Returns > 0 if s1 > s2 (needs swap for alphabetical order), < 0 if s1 < s2, and 0 if equal." },
      { name: "sizeof(arr)/sizeof(arr[0])", role: "Array Size Calculation", desc: "Calculates number of strings automatically: total bytes of pointer array divided by size of one pointer." }
    ],
    loopBreakdown: [
      {
        type: "Nested Selection/Bubble Loops",
        header: "for (i = 0; i < n-1; i++) for (j = i+1; j < n; j++)",
        purpose: "Compares every string arr[i] with every string arr[j].",
        details: [
          "SUPER CRUCIAL POINTER CONCEPT: Notice temp is 'char *temp'!",
          "We do NOT copy string characters with strcpy! We simply SWAP THE MEMORY ADDRESSES (pointers) stored in arr[i] and arr[j].",
          "This is lightning fast: exchanging 4/8-byte pointers instead of moving long text strings in RAM!"
        ]
      }
    ],
    vivaQuestions: [
      { q: "What does 'char *arr[]' mean?", a: "An array of pointers to characters. Each element in the array holds the memory address of the first character of a string literal." },
      { q: "Why is sorting pointers faster than sorting string arrays?", a: "Because swapping two pointers only moves 4 or 8 bytes in memory. Swapping actual string arrays requires copying every character byte-by-byte." },
      { q: "What does strcmp() return?", a: "Positive integer (> 0) if first string is alphabetically greater; negative (< 0) if smaller; 0 if both strings are identical." }
    ],
    steps: [
      { line: 8, explanation: "Array of string pointers: ['banana', 'apple', 'orange', 'grape', 'cherry'].", stack: [{ name: "arr[0]", value: "-> \"banana\"", type: "char*", address: "0x1000" }, { name: "arr[1]", value: "-> \"apple\"", type: "char*", address: "0x1008" }, { name: "arr[2]", value: "-> \"orange\"", type: "char*", address: "0x1010" }], terminal: ["Strings: banana, apple, orange, grape, cherry"] },
      { line: 17, explanation: "strcmp('banana', 'apple') > 0 (b > a). TRUE! Swap pointer arr[0] with arr[1].", stack: [{ name: "arr[0]", value: "-> \"apple\"", type: "char*", address: "0x1000", isUpdated: true }, { name: "arr[1]", value: "-> \"banana\"", type: "char*", address: "0x1008", isUpdated: true }], terminal: ["Swapped pointers: arr[0] is now apple, arr[1] is banana"] },
      { line: 26, explanation: "After all pointer swaps, printed strings: apple, banana, cherry, grape, orange.", stack: [], terminal: ["apple", "banana", "cherry", "grape", "orange"] }
    ]
  },

  // ==========================================
  // PART B : PROGRAM 7 - STUDENT STRUCTURE
  // ==========================================
  partB_prog7: {
    part: "Part B - Program 7",
    title: "Student Structure (RegNo, Name, 3 Marks, Total, Avg, Grade)",
    code: `#include<stdio.h> 
#include<conio.h> 
#include<string.h> 

struct student 
{ 
    int regno; 
    char name[20]; 
    int m1, m2, m3; 
}; 

void main() 
{ 
    struct student s; 
    int tot; 
    float avg; 
    char grade[10]; 
    clrscr(); 
    
    printf("Enter the reg no. , name, marks of 3 subjects of a student\\n"); 
    scanf("%d%s%d%d%d", &s.regno, s.name, &s.m1, &s.m2, &s.m3); 
    
    tot = s.m1 + s.m2 + s.m3; 
    avg = (float)tot / 3; 
    
    if (s.m1 < 35 || s.m2 < 35 || s.m3 < 35) 
        strcpy(grade, "Fail"); 
    else if (avg >= 85) 
        strcpy(grade, "Distinction"); 
    else if (avg >= 60) 
        strcpy(grade, "First class"); 
    else if (avg >= 50) 
        strcpy(grade, "Second class"); 
    else 
        strcpy(grade, "Third class"); 
        
    printf("Student details are as follows\\n"); 
    printf("Regno\\tname\\tmarks1\\tmarks2\\tmarks3\\ttotal\\taverage\\tGrade\\n"); 
    printf("%d\\t%s\\t%d\\t%d\\t%d\\t%d\\t%.2f\\t%s\\n", 
           s.regno, s.name, s.m1, s.m2, s.m3, tot, avg, grade); 
    getch(); 
}`,
    functionRoles: [
      { name: "struct student", role: "User Defined Data Type", desc: "Groups heterogeneous attributes of a student (integer regno, string name, integer marks) into a single entity in memory." },
      { name: "strcpy(grade, ...)", role: "String Copy (string.h)", desc: "In C, you cannot do grade = \"Fail\" directly because arrays cannot be assigned. strcpy() copies character by character into grade." }
    ],
    loopBreakdown: [
      {
        type: "Grade Classification Ladder",
        header: "if (s.m1 < 35 || s.m2 < 35 || s.m3 < 35) ... else if (avg >= 85) ...",
        purpose: "Evaluates student academic performance.",
        details: [
          "Crucial Fail Check: Uses logical OR '||'. If the student scores less than 35 in ANY of the 3 subjects, they FAIL immediately, regardless of how high their average is!",
          "(float)tot / 3: Typecasting. Forces float division so decimals are not truncated (e.g. 170 / 3 = 56.67 instead of 56)."
        ]
      }
    ],
    vivaQuestions: [
      { q: "What is a Structure in C?", a: "A user-defined composite data type that allows grouping variables of different types (int, char, float) under a single name." },
      { q: "Why do we write '(float)tot / 3'?", a: "Explicit Type Conversion (Typecasting). Without '(float)', integer division drops the fractional part (e.g. 170/3 becomes 56 instead of 56.67)." },
      { q: "Why use 'strcpy(grade, \"Pass\")' instead of 'grade = \"Pass\"'?", a: "In C, an array identifier is a non-modifiable constant pointer; you cannot assign string literals directly with '='." }
    ],
    steps: [
      { line: 20, explanation: "Input: Regno=1234, Name='usha', Marks=90, 85, 80.", stack: [{ name: "s.regno", value: "1234", type: "int", address: "0x1000" }, { name: "s.name", value: "\"usha\"", type: "char[20]", address: "0x1004" }, { name: "s.m1", value: "90", type: "int", address: "0x1018" }, { name: "s.m2", value: "85", type: "int", address: "0x101C" }, { name: "s.m3", value: "80", type: "int", address: "0x1020" }], terminal: ["Input: 1234 usha 90 85 80"] },
      { line: 22, explanation: "tot = 90 + 85 + 80 = 255. avg = 255.0 / 3 = 85.00.", stack: [{ name: "tot", value: "255", type: "int", address: "0x1024", isUpdated: true }, { name: "avg", value: "85.00", type: "float", address: "0x1028", isUpdated: true }], terminal: ["Total = 255, Average = 85.00"] },
      { line: 27, explanation: "All marks >= 35 and avg >= 85. Grade set to 'Distinction'.", stack: [{ name: "grade", value: "\"Distinction\"", type: "char[10]", address: "0x102C", isUpdated: true }], terminal: ["Grade: Distinction"] },
      { line: 38, explanation: "Formatted table printed.", stack: [], terminal: ["Regno   name    marks1  marks2  marks3  total   average Grade", "1234    usha    90      85      80      255     85.00   Distinction"] }
    ]
  },

  // ==========================================
  // PART B : PROGRAM 8 - FILE OPERATIONS
  // ==========================================
  partB_prog8: {
    part: "Part B - Program 8",
    title: "Menu Driven File Operations: Create, Append & Display",
    code: `#include <stdio.h> 
#include <stdlib.h> 
#include <string.h> 

void createFile(); 
void appendFile(); 
void displayFile(); 

int main() { 
    int choice = 0; 
    do { 
        printf("\\n===== MENU =====\\n"); 
        printf("1. Create a text file\\n"); 
        printf("2. Append contents of one file to another\\n"); 
        printf("3. Display the content of a file\\n"); 
        printf("4. Exit\\n"); 
        printf("Enter your choice: "); 
        if (scanf("%d", &choice) != 1) { 
            while (getchar() != '\\n'); 
            continue; 
        } 
        while (getchar() != '\\n'); // Clear buffer
        
        switch (choice) { 
            case 1: createFile(); break; 
            case 2: appendFile(); break; 
            case 3: displayFile(); break; 
            case 4: printf("Exiting program.\\n"); break; 
            default: printf("Invalid choice!\\n"); 
        } 
    } while (choice != 4); 
    return 0; 
} 

void createFile() { 
    char filename[100], content[1000]; 
    FILE *file; 
    printf("Enter name of file to create: "); 
    scanf("%s", filename); 
    while (getchar() != '\\n'); 
    file = fopen(filename, "w"); // Mode 'w' = write
    if (file == NULL) { 
        printf("Error creating file!\\n"); 
        return; 
    } 
    printf("Enter content (type 'END' on new line to finish):\\n"); 
    while (1) { 
        fgets(content, sizeof(content), stdin); 
        if (strncmp(content, "END", 3) == 0) break; 
        fputs(content, file); 
    } 
    fclose(file); 
    printf("File '%s' created successfully.\\n", filename); 
} 

void appendFile() { 
    char sourceFile[100], targetFile[100]; 
    FILE *source, *target; 
    int ch; 
    printf("Enter source file: "); scanf("%s", sourceFile); 
    while (getchar() != '\\n'); 
    printf("Enter target file: "); scanf("%s", targetFile); 
    while (getchar() != '\\n'); 
    
    source = fopen(sourceFile, "r"); // Mode 'r' = read
    if (source == NULL) { printf("Source file not found!\\n"); return; } 
    
    target = fopen(targetFile, "a"); // Mode 'a' = append
    if (target == NULL) { fclose(source); return; } 
    
    while ((ch = fgetc(source)) != EOF) { 
        fputc(ch, target); 
    } 
    fclose(source); 
    fclose(target); 
    printf("Appended successfully.\\n"); 
} 

void displayFile() { 
    char filename[100]; 
    FILE *file; 
    int ch; 
    printf("Enter file to display: "); scanf("%s", filename); 
    while (getchar() != '\\n'); 
    file = fopen(filename, "r"); 
    if (file == NULL) { printf("File not found!\\n"); return; } 
    printf("\\n--- Content of '%s' ---\\n", filename); 
    while ((ch = fgetc(file)) != EOF) { 
        putchar(ch); 
    } 
    fclose(file); 
}`,
    functionRoles: [
      { name: "FILE *file", role: "File Pointer", desc: "A pointer to a FILE structure maintained by the OS containing buffer info, current position, and file status." },
      { name: "fopen(name, mode)", role: "Open File Stream", desc: "Opens file with given mode ('w' for write, 'r' for read, 'a' for append). Returns NULL if file cannot be opened." },
      { name: "fgetc(fp) & fputc(ch, fp)", role: "Character File I/O", desc: "fgetc reads one character from file; fputc writes one character to file." },
      { name: "fclose(fp)", role: "Close Stream", desc: "Flushes buffer to disk and releases file handle to prevent memory leaks and data corruption." }
    ],
    loopBreakdown: [
      {
        type: "do-while(choice != 4)",
        header: "do { ... } while (choice != 4);",
        purpose: "Keeps menu running until user chooses Option 4 (Exit)."
      },
      {
        type: "Copy Loop: while ((ch = fgetc(source)) != EOF)",
        header: "while ((ch = fgetc(source)) != EOF) fputc(ch, target);",
        purpose: "Reads bytes from source file and appends them to target file until End Of File (EOF).",
        details: [
          "EOF: End-Of-File constant (integer value -1) returned when file end is reached.",
          "Mode 'a' (append): Writes at the very end of target file without overwriting existing content."
        ]
      }
    ],
    vivaQuestions: [
      { q: "What are the file open modes in C?", a: "'r' (read only), 'w' (write, overwrites existing file), 'a' (append, adds to end of file)." },
      { q: "What does fopen() return on failure?", a: "It returns NULL (e.g. if file does not exist when opening in 'r' mode)." },
      { q: "What is EOF?", a: "End of File macro, defined as -1 in <stdio.h>." }
    ],
    steps: [
      { line: 12, explanation: "Menu displayed. User selects 1: Create a text file 'one.txt'.", stack: [{ name: "choice", value: "1", type: "int", address: "0x1000" }], terminal: ["Menu displayed.", "Choice: 1 (Create file)"] },
      { line: 36, explanation: "createFile(): opens 'one.txt' in mode 'w'. User writes content, types 'END'. File closed.", stack: [{ name: "file", value: "FILE* (0x3000)", type: "FILE*", address: "0x1020" }], terminal: ["Enter content: 'This is the first file content'", "File 'one.txt' created successfully."] },
      { line: 12, explanation: "User selects 3: Display 'one.txt'. file opened in 'r' mode.", stack: [], terminal: ["--- Contents of 'one.txt' ---", "This is the first file content"] }
    ]
  }
};
