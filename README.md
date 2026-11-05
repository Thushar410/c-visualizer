# 🖥️ C-Viz — Interactive C Memory & Pointer Visualizer (Lab Exam Edition)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-C--Viz%20Web-blue?style=for-the-badge&logo=googlechrome)](https://thushar410.github.io/c-visualizer/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![C Standard](https://img.shields.io/badge/C%20Standard-C99%20%2F%20C11-0284c7?style=for-the-badge&logo=c)](https://en.wikipedia.org/wiki/C_(programming_language))

> 🚀 **Live Website Access Link:**  
> ### 🔗 **[https://thushar410.github.io/c-visualizer/](https://thushar410.github.io/c-visualizer/)**
> *(To activate this link on GitHub: Go to **Settings** ➔ **Pages** ➔ Under 'Build and deployment', set Branch to **`main`** / **`/ (root)`** and click **Save**).*

---

## 📖 About The Project

**C-Viz** is a zero-cost, interactive web application built to help computer science students master the **C Programming Laboratory Exam and Viva**. 

Instead of passive video lectures or dry textbook text, **C-Viz** illustrates how C code executes **under the hood in background RAM memory**:
- Exact hexadecimal memory addresses (`0x1000`, `0x1004`, `0x1008`).
- Animated SVG pointer arrows connecting pointer variables directly to target memory slots.
- Side-by-side **Stack Frame** vs **Heap Memory** visualization.
- Interactive token hover: Hover over `*p`, `&a`, `->`, `malloc`, or `sizeof` to see instant definitions.
- Step-by-step time-travel controls (Play, Pause, Step Forward, Step Backward, Timeline Slider).
- Interactive Line Jumping: Click any line of code to jump straight to that moment in memory.

---

## 🎯 Lab Exam Programs Covered

| Program # | Category | Lab Experiment Name | Key Viva Concept Taught |
| :---: | :--- | :--- | :--- |
| **1** | **Pointers** | **Pointers & Memory Addresses** | `*` (dereference) vs `&` (address-of), pointer size (8 bytes on 64-bit systems). |
| **2** | **Arrays** | **Pointer Arithmetic & 1D Arrays** | `ptr + 1` scales by `sizeof(type)` (adds 4 bytes for int, not 1 byte!). |
| **3** | **2D Arrays** | **2D Matrix Memory Layout** | **Row-Major Order**: How flat 1D RAM stores 2D grids `Base + (i * cols + j) * size`. |
| **4** | **Functions** | **Swap (Pass by Value vs Reference)** | Why `swap(a, b)` fails while `swap(&a, &b)` mutates caller's stack frame. |
| **5** | **Algorithms** | **Bubble Sort Algorithm** | Element-by-element comparison, swapping, and in-place sorting ($O(n^2)$). |
| **6** | **Searching** | **Binary Search Algorithm** | `low`, `mid`, `high` pointer movements in sorted arrays ($O(\log n)$). |
| **7** | **Strings** | **String Palindrome & Two Pointers** | Character memory layout, Two-Pointer technique, and the `'\0'` null terminator. |
| **8** | **Structures** | **Structures & Arrow Operator (`->`)** | Struct member offsets in memory and `ptr->member` $\equiv$ `(*ptr).member`. |
| **9** | **Data Structures** | **Singly Linked List Node** | Self-referential structures, `malloc()` on Heap, and `head->next` pointer links. |
| **10** | **Dynamic Memory**| **`malloc`, `free` & Dangling Pointer**| Stack vs Heap, why `free(p)` causes Dangling Pointer, and resetting to `NULL`. |
| **11** | **Recursion** | **Recursion Call Stack (Fibonacci)** | Push/pop of stack activation records, unwinding, and avoiding Stack Overflow. |
| **12** | **Bitwise** | **Bitwise Operators (AND, OR, Shift)** | 8-bit binary registers, bit-masking, and fast multiplication/division via `<<` and `>>`. |
| **13** | **Sandbox** | **⚡ Custom C Sandbox** | Type your own C code and test assignments, pointers, and `printf` live! |

---

## 🎓 University Lab Exam Viva Cheat-Sheet Included

Click the **"Lab Viva Guide"** button in the web app to view instant answers to standard viva questions:
1. *What is the difference between Call by Value and Call by Reference?*
2. *Why does `ptr + 1` advance by 4 bytes for integers?*
3. *How are 2D arrays stored in C memory (Row-Major Order)?*
4. *What is a Dangling Pointer vs NULL Pointer vs Wild Pointer?*
5. *Difference between `malloc()` and `calloc()`?*
6. *Why is the null character `'\0'` required in strings?*
7. *What causes Stack Overflow in recursive functions?*

---

## 💻 Tech Stack & Zero-Cost Architecture

- **Frontend:** Pure HTML5, Modern CSS3 (Cyberpunk/Developer dark palette), Vanilla JavaScript ES6+.
- **Icons:** Lucide Icons CDN.
- **Visuals:** SVG vector engine for animated pointer links.
- **Portability:** 100% Client-Side. Runs completely offline in any web browser without needing node modules, compilation, or backend servers!

---

## 🛠️ How to Run Locally

1. Clone this repository:
   \`\`\`bash
   git clone https://github.com/Thushar410/c-visualizer.git
   \`\`\`
2. Open the directory:
   \`\`\`bash
   cd c-visualizer
   \`\`\`
3. Double-click **`index.html`** or launch in PowerShell:
   \`\`\`powershell
   Start-Process index.html
   \`\`\`

---

## 🌐 How to Enable GitHub Pages (Free Hosting)

1. Open your repository on GitHub: `https://github.com/Thushar410/c-visualizer`
2. Click on **Settings** (tab at the top).
3. Scroll down the left sidebar and click **Pages**.
4. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: Select **`main`** and **`/ (root)`**
5. Click **Save**.
6. Within 1-2 minutes, your website will be live at:  
   **`https://thushar410.github.io/c-visualizer/`**

---

Made with ❤️ to help ace your C Programming Lab Exam! Good luck on the 7th! 🚀
