// {
//   id: "tech-1",
//   category: "JavaScript",
//   type: "theory",
//   difficulty: "Intermediate",

//   question: "Main interview question",

//   hint: "Optional hint",

//   answer: `
// Main explanation + code if needed
//   `,

//   followUp: [
//     {
//       question: "Follow-up question 1",
//       answer: "Clear answer"
//     },
//     {
//       question: "Follow-up question 2",
//       answer: "Clear answer"
//     }
//   ]
// }
export const technicalQuestions = [

{
  id: "tech-1",
  category: "JavaScript",
  type: "theory",
  difficulty: "Intermediate",
  question: "Explain closures in JavaScript with a real-world example.",
  hint: "Function remembers outer scope",
  answer: `
A closure is a function that retains access to variables from its lexical scope even after the outer function has finished execution.

Example:
function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

Closures are used for:
- Data encapsulation
- Event handlers
- React hooks
  `,
  followUp: [
    {
      question: "Can closures cause memory leaks?",
      answer: "Yes, if a closure holds reference to variables that are no longer needed, it can prevent garbage collection."
    },
    {
      question: "Where are closures used in React?",
      answer: "Closures are used in hooks like useState and useEffect to preserve state between renders."
    }
  ]
},

{
  id: "tech-2",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Implement debounce function.",
  hint: "Use setTimeout and clearTimeout",
  answer: `
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
  `,
  followUp: [
    {
      question: "Difference between debounce and throttle?",
      answer: "Debounce delays execution until user stops triggering events, while throttle ensures execution at fixed intervals."
    },
    {
      question: "Where is debounce used?",
      answer: "Used in search inputs, resize events, and API call optimization."
    }
  ]
},

{
  id: "tech-3",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Flatten a nested array.",
  hint: "Use recursion",
  answer: `
function flatten(arr) {
  let result = [];

  for (let el of arr) {
    if (Array.isArray(el)) {
      result = result.concat(flatten(el));
    } else {
      result.push(el);
    }
  }

  return result;
}
  `,
  followUp: [
    {
      question: "Can this be solved without recursion?",
      answer: "Yes, using stack or iterative approach."
    },
    {
      question: "Time complexity?",
      answer: "O(n) where n is total elements."
    }
  ]
},

{
  id: "tech-4",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "Explain React reconciliation process.",
  hint: "Virtual DOM diffing",
  answer: `
Reconciliation is the process React uses to update the DOM efficiently.

Steps:
1. Create new Virtual DOM
2. Compare with old DOM (diffing)
3. Update only changed nodes

This reduces expensive DOM operations.
  `,
  followUp: [
    {
      question: "Why are keys important?",
      answer: "Keys help React identify which elements changed, improving performance."
    },
    {
      question: "What happens if keys are not unique?",
      answer: "It can cause incorrect updates and performance issues."
    }
  ]
},

{
  id: "tech-5",
  category: "React",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create a custom hook to fetch API data.",
  hint: "useEffect + useState",
  answer: `
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData);
  }, [url]);

  return data;
}
  `,
  followUp: [
    {
      question: "How to handle errors?",
      answer: "Use try-catch or .catch() to manage errors and set error state."
    },
    {
      question: "How to cancel request?",
      answer: "Use AbortController inside useEffect cleanup."
    }
  ]
},

{
  id: "tech-6",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "Explain event loop in Node.js.",
  hint: "Non-blocking execution",
  answer: `
Node.js uses an event loop to handle asynchronous operations.

Phases:
- Timers
- I/O callbacks
- Poll
- Check

It enables non-blocking I/O using callbacks and promises.
  `,
  followUp: [
    {
      question: "What is microtask queue?",
      answer: "It handles promises and runs before macrotasks."
    },
    {
      question: "Why is Node fast?",
      answer: "Because of non-blocking I/O and single-threaded event loop."
    }
  ]
},

{
  id: "tech-7",
  category: "Node",
  type: "coding",
  difficulty: "Beginner",
  question: "Create a simple Express server.",
  hint: "app.get",
  answer: `
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);
  `,
  followUp: [
    {
      question: "How to add middleware?",
      answer: "Use app.use() to register middleware."
    },
    {
      question: "How to handle JSON?",
      answer: "Use express.json() middleware."
    }
  ]
},

{
  id: "tech-8",
  category: "DSA",
  type: "coding",
  difficulty: "Beginner",
  question: "Reverse a string.",
  hint: "Use two pointers or built-in",
  answer: `
function reverse(str) {
  return str.split("").reverse().join("");
}
  `,
  followUp: [
    {
      question: "Without built-in methods?",
      answer: "Use loop or two pointers to swap characters."
    },
    {
      question: "Time complexity?",
      answer: "O(n)"
    }
  ]
},

{
  id: "tech-9",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Solve Two Sum problem.",
  hint: "Use hashmap",
  answer: `
function twoSum(nums, target) {
  let map = {};

  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];

    if (map[diff] !== undefined) {
      return [map[diff], i];
    }

    map[nums[i]] = i;
  }
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Space complexity?",
      answer: "O(n)"
    }
  ]
},

{
  id: "tech-10",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Check if a string is palindrome.",
  hint: "Two pointers",
  answer: `
function isPalindrome(str) {
  let l = 0, r = str.length - 1;

  while (l < r) {
    if (str[l] !== str[r]) return false;
    l++;
    r--;
  }

  return true;
}
  `,
  followUp: [
    {
      question: "Ignore spaces and symbols?",
      answer: "Use regex to clean string before checking."
    },
    {
      question: "Time complexity?",
      answer: "O(n)"
    }
  ]
},

{
  id: "tech-11",
  category: "CSS",
  type: "theory",
  difficulty: "Beginner",
  question: "Explain CSS Box Model.",
  hint: "Content, padding, border, margin",
  answer: `
CSS Box Model includes:
- Content
- Padding
- Border
- Margin

It defines layout and spacing.
  `,
  followUp: [
    {
      question: "What is border-box?",
      answer: "Includes padding and border in total width."
    },
    {
      question: "Why important?",
      answer: "Controls layout precisely."
    }
  ]
},

{
  id: "tech-12",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "Design a URL shortener.",
  hint: "Hash + DB",
  answer: `
Components:
- API server
- Database
- Hash generator
- Cache (Redis)

Flow:
User → API → Generate short → Store → Return
  `,
  followUp: [
    {
      question: "How to avoid collisions?",
      answer: "Use unique hash or retry mechanism."
    },
    {
      question: "How to scale?",
      answer: "Use load balancer and distributed DB."
    }
  ]
},

{
  id: "tech-13",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Implement throttle function.",
  hint: "Limit execution",
  answer: `
function throttle(fn, delay) {
  let last = 0;

  return function (...args) {
    let now = Date.now();

    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}
  `,
  followUp: [
    {
      question: "Use case?",
      answer: "Scroll events, resize events."
    },
    {
      question: "Throttle vs debounce?",
      answer: "Throttle limits rate, debounce delays execution."
    }
  ]
},

{
  id: "tech-14",
  category: "DSA",
  type: "coding",
  difficulty: "Beginner",
  question: "Find maximum element in array.",
  hint: "Loop",
  answer: `
function max(arr) {
  let m = arr[0];

  for (let n of arr) {
    if (n > m) m = n;
  }

  return m;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Alternative method?",
      answer: "Math.max(...arr)"
    }
  ]
},

{
  id: "tech-15",
  category: "React",
  type: "theory",
  difficulty: "Beginner",
  question: "What are React Hooks?",
  hint: "Functions for state",
  answer: `
Hooks allow functional components to use state and lifecycle features.

Examples:
- useState
- useEffect
  `,
  followUp: [
    {
      question: "Rules of hooks?",
      answer: "Only call at top level and inside React functions."
    },
    {
      question: "Why introduced?",
      answer: "To replace class components."
    }
  ]
},

{
  id: "tech-16",
  category: "JavaScript",
  type: "theory",
  difficulty: "Intermediate",
  question: "Explain the event loop in JavaScript.",
  hint: "Call stack + queue",
  answer: `
The event loop allows JavaScript to handle asynchronous operations.

Flow:
1. Code goes to call stack
2. Async tasks go to Web APIs
3. Callback queue stores results
4. Event loop pushes them back to stack

This enables non-blocking execution.
  `,
  followUp: [
    {
      question: "What is microtask queue?",
      answer: "It handles promises and runs before callback queue."
    },
    {
      question: "Why JS is single-threaded?",
      answer: "Because it uses event loop for async tasks."
    }
  ]
},

{
  id: "tech-17",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Implement deep clone of an object.",
  hint: "Recursion",
  answer: `
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  let copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    copy[key] = deepClone(obj[key]);
  }

  return copy;
}
  `,
  followUp: [
    {
      question: "Problem with JSON stringify?",
      answer: "It fails for functions, undefined, and circular references."
    },
    {
      question: "Better solution?",
      answer: "Use structuredClone."
    }
  ]
},

{
  id: "tech-18",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is useEffect cleanup function?",
  hint: "Return function",
  answer: `
useEffect cleanup runs when component unmounts or before re-running effect.

Example:
useEffect(() => {
  const id = setInterval(() => {}, 1000);

  return () => clearInterval(id);
}, []);
  `,
  followUp: [
    {
      question: "Why needed?",
      answer: "To prevent memory leaks."
    },
    {
      question: "When executed?",
      answer: "Before unmount or re-run."
    }
  ]
},

{
  id: "tech-19",
  category: "React",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create a counter component.",
  hint: "useState",
  answer: `
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <p>{count}</p>
    </div>
  );
}
  `,
  followUp: [
    {
      question: "Why state?",
      answer: "To trigger re-render."
    },
    {
      question: "Batch updates?",
      answer: "React batches updates for performance."
    }
  ]
},

{
  id: "tech-20",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is non-blocking I/O in Node.js?",
  hint: "Async execution",
  answer: `
Non-blocking I/O allows Node.js to handle multiple operations without waiting.

Example:
File read does not block other requests.
  `,
  followUp: [
    {
      question: "Benefit?",
      answer: "High scalability."
    },
    {
      question: "How implemented?",
      answer: "Using event loop."
    }
  ]
},

{
  id: "tech-21",
  category: "Node",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create a REST API route in Express.",
  hint: "app.get",
  answer: `
app.get("/api", (req, res) => {
  res.json({ message: "API working" });
});
  `,
  followUp: [
    {
      question: "How to handle POST?",
      answer: "Use app.post()."
    },
    {
      question: "Status codes?",
      answer: "Use res.status(200).json()."
    }
  ]
},

{
  id: "tech-22",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find missing number in array.",
  hint: "Sum formula",
  answer: `
function missing(arr, n) {
  let total = (n * (n + 1)) / 2;
  let sum = arr.reduce((a, b) => a + b, 0);
  return total - sum;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Alternative?",
      answer: "Use XOR method."
    }
  ]
},

{
  id: "tech-23",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find first non-repeating character.",
  hint: "Map",
  answer: `
function firstUnique(str) {
  let map = {};

  for (let c of str) map[c] = (map[c] || 0) + 1;

  for (let c of str) {
    if (map[c] === 1) return c;
  }
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Use case?",
      answer: "String processing problems."
    }
  ]
},

{
  id: "tech-24",
  category: "CSS",
  type: "theory",
  difficulty: "Intermediate",
  question: "Explain difference between flex and grid.",
  hint: "1D vs 2D",
  answer: `
Flexbox:
- One-dimensional layout

Grid:
- Two-dimensional layout

Flex = components
Grid = layouts
  `,
  followUp: [
    {
      question: "When use flex?",
      answer: "Alignment of items."
    },
    {
      question: "When use grid?",
      answer: "Page layouts."
    }
  ]
},

{
  id: "tech-25",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "What is horizontal scaling?",
  hint: "Add servers",
  answer: `
Horizontal scaling means adding more servers to handle load.

Example:
Load balancer distributes traffic.
  `,
  followUp: [
    {
      question: "Vertical scaling?",
      answer: "Increase server power."
    },
    {
      question: "Which better?",
      answer: "Horizontal for scalability."
    }
  ]
},

{
  id: "tech-26",
  category: "JavaScript",
  type: "theory",
  difficulty: "Intermediate",
  question: "Explain the difference between var, let, and const.",
  hint: "Scope and reassignment",
  answer: `
var:
- Function scoped
- Can be redeclared and updated

let:
- Block scoped
- Can be updated but not redeclared

const:
- Block scoped
- Cannot be updated or redeclared

Best practice: Use const by default, let when needed.
  `,
  followUp: [
    {
      question: "What is Temporal Dead Zone?",
      answer: "It is the time between variable declaration and initialization where accessing it throws an error."
    },
    {
      question: "Why avoid var?",
      answer: "Because it leads to scope issues and unexpected behavior."
    }
  ]
},

{
  id: "tech-27",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Remove duplicates from an array.",
  hint: "Use Set",
  answer: `
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
  `,
  followUp: [
    {
      question: "Alternative approach?",
      answer: "Use filter with indexOf."
    },
    {
      question: "Time complexity?",
      answer: "O(n)"
    }
  ]
},

{
  id: "tech-28",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Check if two strings are anagrams.",
  hint: "Sort and compare",
  answer: `
function isAnagram(a, b) {
  return a.split("").sort().join("") === b.split("").sort().join("");
}
  `,
  followUp: [
    {
      question: "Better approach?",
      answer: "Use frequency map."
    },
    {
      question: "Time complexity?",
      answer: "O(n log n)"
    }
  ]
},

{
  id: "tech-29",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is lifting state up in React?",
  hint: "Shared state",
  answer: `
Lifting state up means moving state to a common parent so multiple components can share it.

This ensures data consistency between components.
  `,
  followUp: [
    {
      question: "When needed?",
      answer: "When sibling components need shared data."
    },
    {
      question: "Alternative?",
      answer: "Context API or Redux."
    }
  ]
},

{
  id: "tech-30",
  category: "React",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create a controlled input component.",
  hint: "useState",
  answer: `
import { useState } from "react";

function Input() {
  const [value, setValue] = useState("");

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
  `,
  followUp: [
    {
      question: "Controlled vs uncontrolled?",
      answer: "Controlled uses state, uncontrolled uses refs."
    },
    {
      question: "Why controlled?",
      answer: "Better control over form data."
    }
  ]
},

{
  id: "tech-31",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is middleware in Express?",
  hint: "Request lifecycle",
  answer: `
Middleware functions execute during request-response cycle.

They can:
- Modify request/response
- End response
- Call next middleware
  `,
  followUp: [
    {
      question: "Types of middleware?",
      answer: "Application, router, error-handling, built-in."
    },
    {
      question: "What if next() is not called?",
      answer: "Request will hang."
    }
  ]
},

{
  id: "tech-32",
  category: "Node",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create a middleware to log requests.",
  hint: "app.use",
  answer: `
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
  `,
  followUp: [
    {
      question: "Where to place middleware?",
      answer: "Before routes."
    },
    {
      question: "Can middleware modify response?",
      answer: "Yes."
    }
  ]
},

{
  id: "tech-33",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find factorial using recursion.",
  hint: "Base condition",
  answer: `
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Iterative version?",
      answer: "Use loop instead of recursion."
    }
  ]
},

{
  id: "tech-34",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Check if array is sorted.",
  hint: "Loop",
  answer: `
function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Edge case?",
      answer: "Empty or single element array."
    }
  ]
},

{
  id: "tech-35",
  category: "CSS",
  type: "theory",
  difficulty: "Intermediate",
  question: "Explain CSS specificity.",
  hint: "Priority",
  answer: `
Specificity determines which CSS rule applies.

Priority:
Inline > ID > Class > Tag
  `,
  followUp: [
    {
      question: "How to override?",
      answer: "Use higher specificity or !important."
    },
    {
      question: "Avoid !important?",
      answer: "Yes, it breaks maintainability."
    }
  ]
},

{
  id: "tech-36",
  category: "CSS",
  type: "coding",
  difficulty: "Beginner",
  question: "Center a div horizontally and vertically.",
  hint: "Flexbox",
  answer: `
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
  `,
  followUp: [
    {
      question: "Alternative method?",
      answer: "Using grid or absolute positioning."
    },
    {
      question: "Why flexbox?",
      answer: "Simple and responsive."
    }
  ]
},

{
  id: "tech-37",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "What is load balancing?",
  hint: "Distribute traffic",
  answer: `
Load balancing distributes traffic across servers.

Types:
- Round robin
- Least connections
  `,
  followUp: [
    {
      question: "Why needed?",
      answer: "Improves performance and reliability."
    },
    {
      question: "Tools?",
      answer: "Nginx, AWS ELB."
    }
  ]
},

{
  id: "tech-38",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find frequency of elements in array.",
  hint: "Object map",
  answer: `
function freq(arr) {
  let map = {};

  for (let n of arr) {
    map[n] = (map[n] || 0) + 1;
  }

  return map;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Use case?",
      answer: "Counting duplicates."
    }
  ]
},

{
  id: "tech-39",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is useMemo?",
  hint: "Optimization",
  answer: `
useMemo memoizes computed values to avoid unnecessary recalculations.
  `,
  followUp: [
    {
      question: "Difference from useCallback?",
      answer: "useMemo returns value, useCallback returns function."
    },
    {
      question: "When to use?",
      answer: "Expensive calculations."
    }
  ]
},

{
  id: "tech-40",
  category: "MongoDB",
  type: "theory",
  difficulty: "Intermediate",
  question: "Explain aggregation pipeline.",
  hint: "Stages",
  answer: `
Aggregation pipeline processes data through stages like:
- $match
- $group
- $sort
  `,
  followUp: [
    {
      question: "$match vs $group?",
      answer: "$match filters, $group aggregates."
    },
    {
      question: "Use case?",
      answer: "Analytics queries."
    }
  ]
},

{
  id: "tech-41",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find second largest element.",
  hint: "Two variables",
  answer: `
function secondLargest(arr) {
  let max = -Infinity, second = -Infinity;

  for (let n of arr) {
    if (n > max) {
      second = max;
      max = n;
    } else if (n > second && n !== max) {
      second = n;
    }
  }

  return second;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Edge case?",
      answer: "All elements same."
    }
  ]
},

{
  id: "tech-42",
  category: "JavaScript",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is type coercion?",
  hint: "Implicit conversion",
  answer: `
Type coercion is automatic conversion of values from one type to another.
  `,
  followUp: [
    {
      question: "Example?",
      answer: "'5' + 2 = '52'"
    },
    {
      question: "Avoid it?",
      answer: "Use === instead of =="
    }
  ]
},

{
  id: "tech-43",
  category: "Node",
  type: "coding",
  difficulty: "Intermediate",
  question: "Handle JSON request body.",
  hint: "express.json",
  answer: `
app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Received");
});
  `,
  followUp: [
    {
      question: "Why needed?",
      answer: "To parse JSON request."
    },
    {
      question: "Alternative?",
      answer: "body-parser (older)."
    }
  ]
},

{
  id: "tech-44",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find duplicates in array.",
  hint: "Set",
  answer: `
function duplicates(arr) {
  let seen = new Set();
  let dup = [];

  for (let n of arr) {
    if (seen.has(n)) dup.push(n);
    else seen.add(n);
  }

  return dup;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Space complexity?",
      answer: "O(n)"
    }
  ]
},

{
  id: "tech-45",
  category: "CSS",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is flexbox?",
  hint: "Layout system",
  answer: `
Flexbox is a one-dimensional layout system used to align items.
  `,
  followUp: [
    {
      question: "Main axis vs cross axis?",
      answer: "Main is row direction, cross is perpendicular."
    },
    {
      question: "Why use flex?",
      answer: "Easy alignment."
    }
  ]
},

{
  id: "tech-46",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "What is caching strategy?",
  hint: "Cache patterns",
  answer: `
Strategies:
- Cache aside
- Write through
- Write back
  `,
  followUp: [
    {
      question: "Cache invalidation?",
      answer: "Removing stale data."
    },
    {
      question: "Tool?",
      answer: "Redis"
    }
  ]
},

{
  id: "tech-47",
  category: "React",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create toggle component.",
  hint: "useState",
  answer: `
import { useState } from "react";

function Toggle() {
  const [on, setOn] = useState(false);

  return (
    <button onClick={() => setOn(!on)}>
      {on ? "ON" : "OFF"}
    </button>
  );
}
  `,
  followUp: [
    {
      question: "State update async?",
      answer: "Yes."
    },
    {
      question: "Functional update?",
      answer: "setOn(prev => !prev)"
    }
  ]
},

{
  id: "tech-48",
  category: "MongoDB",
  type: "theory",
  difficulty: "Intermediate",
  question: "SQL vs NoSQL?",
  hint: "Structure",
  answer: `
SQL: structured tables
NoSQL: flexible documents
  `,
  followUp: [
    {
      question: "When use NoSQL?",
      answer: "Unstructured data."
    },
    {
      question: "Scaling?",
      answer: "NoSQL scales horizontally."
    }
  ]
},

{
  id: "tech-49",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find largest number in nested array.",
  hint: "Flatten + max",
  answer: `
function maxNested(arr) {
  return Math.max(...arr.flat(Infinity));
}
  `,
  followUp: [
    {
      question: "Without flat?",
      answer: "Use recursion."
    },
    {
      question: "Time complexity?",
      answer: "O(n)"
    }
  ]
},

{
  id: "tech-50",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Sum of array elements.",
  hint: "Loop or reduce",
  answer: `
function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Without reduce?",
      answer: "Use loop."
    }
  ]
},

{
  id: "tech-51",
  category: "JavaScript",
  type: "theory",
  difficulty: "Intermediate",
  question: "Explain prototypal inheritance in JavaScript.",
  hint: "Prototype chain",
  answer: `
JavaScript uses prototypal inheritance where objects inherit properties from other objects.

Every object has a prototype. If a property is not found, JS looks up the prototype chain.

Example:
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return "Hello " + this.name;
};
  `,
  followUp: [
    {
      question: "Difference from classical inheritance?",
      answer: "JS uses objects instead of classes for inheritance."
    },
    {
      question: "Modern alternative?",
      answer: "ES6 classes."
    }
  ]
},

{
  id: "tech-52",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Implement a function to check if a number is prime.",
  hint: "Check till sqrt(n)",
  answer: `
function isPrime(n) {
  if (n <= 1) return false;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }

  return true;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(√n)"
    },
    {
      question: "Why sqrt?",
      answer: "Factors repeat after sqrt."
    }
  ]
},

{
  id: "tech-53",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is React Context API?",
  hint: "Global state",
  answer: `
Context API allows sharing data globally without prop drilling.

Example:
const ThemeContext = createContext();

Used with Provider and useContext hook.
  `,
  followUp: [
    {
      question: "When not to use?",
      answer: "For frequently changing large state."
    },
    {
      question: "Alternative?",
      answer: "Redux or Zustand."
    }
  ]
},

{
  id: "tech-54",
  category: "React",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create a simple context provider.",
  hint: "createContext",
  answer: `
import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [value, setValue] = useState("Hello");

  return (
    <AppContext.Provider value={{ value, setValue }}>
      {children}
    </AppContext.Provider>
  );
}
  `,
  followUp: [
    {
      question: "How to consume?",
      answer: "useContext(AppContext)"
    },
    {
      question: "Why avoid prop drilling?",
      answer: "Cleaner state sharing."
    }
  ]
},

{
  id: "tech-55",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is clustering in Node.js?",
  hint: "Multi-core",
  answer: `
Clustering allows Node.js to use multiple CPU cores.

It creates worker processes sharing same server port.
  `,
  followUp: [
    {
      question: "Why needed?",
      answer: "Node is single-threaded."
    },
    {
      question: "Module?",
      answer: "cluster module."
    }
  ]
},

{
  id: "tech-56",
  category: "Node",
  type: "coding",
  difficulty: "Intermediate",
  question: "Read a file asynchronously in Node.js.",
  hint: "fs.readFile",
  answer: `
const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
  `,
  followUp: [
    {
      question: "Promise version?",
      answer: "Use fs.promises.readFile"
    },
    {
      question: "Sync version?",
      answer: "fs.readFileSync"
    }
  ]
},

{
  id: "tech-57",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find the longest word in a sentence.",
  hint: "Split string",
  answer: `
function longestWord(str) {
  return str.split(" ").reduce((a, b) =>
    b.length > a.length ? b : a
  );
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Edge case?",
      answer: "Empty string."
    }
  ]
},

{
  id: "tech-58",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find intersection of two arrays.",
  hint: "Set",
  answer: `
function intersection(a, b) {
  let setB = new Set(b);
  return a.filter(x => setB.has(x));
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Unique values?",
      answer: "Use Set on result."
    }
  ]
},

{
  id: "tech-59",
  category: "CSS",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is stacking context?",
  hint: "z-index",
  answer: `
Stacking context determines how elements overlap.

Created by:
- position + z-index
- opacity < 1
- transform
  `,
  followUp: [
    {
      question: "Why z-index not working?",
      answer: "Different stacking context."
    },
    {
      question: "Fix?",
      answer: "Adjust parent positioning."
    }
  ]
},

{
  id: "tech-60",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "Explain CAP theorem.",
  hint: "Consistency Availability Partition",
  answer: `
CAP theorem states:
- Consistency
- Availability
- Partition tolerance

You can only guarantee 2 out of 3.
  `,
  followUp: [
    {
      question: "Example?",
      answer: "MongoDB = AP system."
    },
    {
      question: "Use case?",
      answer: "Distributed systems."
    }
  ]
},

{
  id: "tech-61",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find sum of digits of a number.",
  hint: "Modulo",
  answer: `
function sumDigits(n) {
  let sum = 0;

  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }

  return sum;
}
  `,
  followUp: [
    {
      question: "Recursive solution?",
      answer: "Yes, using recursion."
    },
    {
      question: "Time complexity?",
      answer: "O(log n)"
    }
  ]
},

{
  id: "tech-62",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is hydration in React?",
  hint: "SSR",
  answer: `
Hydration attaches event listeners to server-rendered HTML.

Used in SSR frameworks like Next.js.
  `,
  followUp: [
    {
      question: "Why needed?",
      answer: "To make static HTML interactive."
    },
    {
      question: "Benefit?",
      answer: "Faster initial load."
    }
  ]
},

{
  id: "tech-63",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is event emitter in Node.js?",
  hint: "Events",
  answer: `
EventEmitter allows creating and handling custom events.

Example:
emitter.on("event", handler);
emitter.emit("event");
  `,
  followUp: [
    {
      question: "Module?",
      answer: "events module."
    },
    {
      question: "Use case?",
      answer: "Custom event handling."
    }
  ]
},

{
  id: "tech-64",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find GCD of two numbers.",
  hint: "Euclidean algorithm",
  answer: `
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(log n)"
    },
    {
      question: "Use case?",
      answer: "Math problems."
    }
  ]
},

{
  id: "tech-65",
  category: "CSS",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create responsive grid layout.",
  hint: "grid-template",
  answer: `
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
  `,
  followUp: [
    {
      question: "auto-fit vs auto-fill?",
      answer: "auto-fit collapses empty tracks."
    },
    {
      question: "Why responsive?",
      answer: "Adapts to screen size."
    }
  ]
},

{
  id: "tech-66",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "What is rate limiting?",
  hint: "Limit requests",
  answer: `
Rate limiting restricts number of requests per user.

Used to:
- Prevent abuse
- Protect servers
  `,
  followUp: [
    {
      question: "Tools?",
      answer: "Redis, API gateways."
    },
    {
      question: "Algorithms?",
      answer: "Token bucket."
    }
  ]
},

{
  id: "tech-67",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Capitalize first letter of each word.",
  hint: "split map join",
  answer: `
function capitalize(str) {
  return str
    .split(" ")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}
  `,
  followUp: [
    {
      question: "Edge case?",
      answer: "Empty string."
    },
    {
      question: "Regex solution?",
      answer: "Use replace with regex."
    }
  ]
},

{
  id: "tech-68",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What are controlled components?",
  hint: "State-driven input",
  answer: `
Controlled components are form elements controlled by React state.
  `,
  followUp: [
    {
      question: "Why useful?",
      answer: "Validation and control."
    },
    {
      question: "Alternative?",
      answer: "Uncontrolled components."
    }
  ]
},

{
  id: "tech-69",
  category: "Node",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create simple file upload endpoint.",
  hint: "multer",
  answer: `
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded");
});
  `,
  followUp: [
    {
      question: "Where file stored?",
      answer: "uploads folder."
    },
    {
      question: "Alternative?",
      answer: "Cloud storage."
    }
  ]
},

{
  id: "tech-70",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Check if string has all unique characters.",
  hint: "Set",
  answer: `
function isUnique(str) {
  return new Set(str).size === str.length;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Without extra space?",
      answer: "Sort then compare."
    }
  ]
},

{
  id: "tech-71",
  category: "MongoDB",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is sharding?",
  hint: "Data distribution",
  answer: `
Sharding splits data across multiple servers.

Improves scalability.
  `,
  followUp: [
    {
      question: "Shard key?",
      answer: "Field used to distribute data."
    },
    {
      question: "Benefit?",
      answer: "Horizontal scaling."
    }
  ]
},

{
  id: "tech-72",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "What is CDN?",
  hint: "Content delivery",
  answer: `
CDN distributes content across global servers.

Benefits:
- Faster load
- Reduced latency
  `,
  followUp: [
    {
      question: "Examples?",
      answer: "Cloudflare, AWS CloudFront."
    },
    {
      question: "Static content?",
      answer: "Yes."
    }
  ]
},

{
  id: "tech-73",
  category: "JavaScript",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is IIFE?",
  hint: "Immediately invoked",
  answer: `
IIFE is a function executed immediately after creation.

(function() {
  console.log("Hello");
})();
  `,
  followUp: [
    {
      question: "Why use?",
      answer: "Avoid global scope pollution."
    },
    {
      question: "Modern alternative?",
      answer: "Modules."
    }
  ]
},

{
  id: "tech-74",
  category: "React",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create a simple list rendering component.",
  hint: "map",
  answer: `
function List({ items }) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
  `,
  followUp: [
    {
      question: "Why key needed?",
      answer: "To identify elements."
    },
    {
      question: "Index as key issue?",
      answer: "Causes rendering bugs."
    }
  ]
},

{
  id: "tech-75",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find pair with maximum sum.",
  hint: "Sort",
  answer: `
function maxPairSum(arr) {
  arr.sort((a, b) => b - a);
  return arr[0] + arr[1];
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n log n)"
    },
    {
      question: "Optimized?",
      answer: "Find top 2 in one pass O(n)."
    }
  ]
},
{
  id: "tech-76",
  category: "JavaScript",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is memoization?",
  hint: "Caching results",
  answer: `
Memoization is an optimization technique where function results are cached.

function memo(fn) {
  const cache = {};
  return function(n) {
    if (cache[n]) return cache[n];
    return cache[n] = fn(n);
  };
}
  `,
  followUp: [
    {
      question: "Where used?",
      answer: "Dynamic programming and expensive computations."
    },
    {
      question: "React usage?",
      answer: "useMemo hook."
    }
  ]
},

{
  id: "tech-77",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find missing characters in string sequence.",
  hint: "Char codes",
  answer: `
function missingChar(str) {
  for (let i = 0; i < str.length - 1; i++) {
    if (str.charCodeAt(i + 1) !== str.charCodeAt(i) + 1) {
      return String.fromCharCode(str.charCodeAt(i) + 1);
    }
  }
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Use case?",
      answer: "Sequence validation problems."
    }
  ]
},

{
  id: "tech-78",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is React Strict Mode?",
  hint: "Development checks",
  answer: `
StrictMode is a tool for highlighting potential problems in React apps.

It runs additional checks in development.
  `,
  followUp: [
    {
      question: "Does it affect production?",
      answer: "No."
    },
    {
      question: "Why double rendering?",
      answer: "To detect side effects."
    }
  ]
},

{
  id: "tech-79",
  category: "React",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create a loading spinner component.",
  hint: "Conditional rendering",
  answer: `
function Loader({ loading }) {
  return loading ? <p>Loading...</p> : null;
}
  `,
  followUp: [
    {
      question: "Better UI?",
      answer: "Use CSS spinner animation."
    },
    {
      question: "Where used?",
      answer: "API calls."
    }
  ]
},

{
  id: "tech-80",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is stream in Node.js?",
  hint: "Chunk data",
  answer: `
Streams process data in chunks instead of loading entire data.

Types:
- Readable
- Writable
- Duplex
  `,
  followUp: [
    {
      question: "Why useful?",
      answer: "Handles large files efficiently."
    },
    {
      question: "Example?",
      answer: "File streaming."
    }
  ]
},

{
  id: "tech-81",
  category: "Node",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create a readable stream.",
  hint: "fs.createReadStream",
  answer: `
const fs = require("fs");

const stream = fs.createReadStream("file.txt");
stream.on("data", chunk => console.log(chunk));
  `,
  followUp: [
    {
      question: "Event?",
      answer: "data, end."
    },
    {
      question: "Why stream?",
      answer: "Efficient memory usage."
    }
  ]
},

{
  id: "tech-82",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Check if number is power of 2.",
  hint: "Bitwise",
  answer: `
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}
  `,
  followUp: [
    {
      question: "Why works?",
      answer: "Power of 2 has only one bit set."
    },
    {
      question: "Time complexity?",
      answer: "O(1)"
    }
  ]
},

{
  id: "tech-83",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Rotate array by k steps.",
  hint: "Slice",
  answer: `
function rotate(arr, k) {
  k %= arr.length;
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}
  `,
  followUp: [
    {
      question: "In-place?",
      answer: "Use reverse method."
    },
    {
      question: "Time complexity?",
      answer: "O(n)"
    }
  ]
},

{
  id: "tech-84",
  category: "CSS",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is CSS preprocessor?",
  hint: "SASS",
  answer: `
CSS preprocessors like SASS allow variables, nesting, functions.

Improves maintainability.
  `,
  followUp: [
    {
      question: "Examples?",
      answer: "SASS, LESS."
    },
    {
      question: "Why needed?",
      answer: "Cleaner code."
    }
  ]
},

{
  id: "tech-85",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "Explain microservices architecture.",
  hint: "Small services",
  answer: `
Microservices break application into independent services.

Each service handles a specific functionality.
  `,
  followUp: [
    {
      question: "Advantages?",
      answer: "Scalability, flexibility."
    },
    {
      question: "Disadvantages?",
      answer: "Complexity."
    }
  ]
},

{
  id: "tech-86",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find duplicate characters in string.",
  hint: "Map",
  answer: `
function duplicates(str) {
  let map = {};
  let res = [];

  for (let c of str) {
    map[c] = (map[c] || 0) + 1;
  }

  for (let k in map) {
    if (map[k] > 1) res.push(k);
  }

  return res;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Case sensitive?",
      answer: "Depends on input."
    }
  ]
},

{
  id: "tech-87",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is reconciliation vs rendering?",
  hint: "Diffing",
  answer: `
Reconciliation = comparing Virtual DOM
Rendering = updating real DOM
  `,
  followUp: [
    {
      question: "Which expensive?",
      answer: "Rendering."
    },
    {
      question: "Optimization?",
      answer: "Memoization."
    }
  ]
},

{
  id: "tech-88",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is process object?",
  hint: "Global",
  answer: `
process is global object in Node.

Provides info about current process.
  `,
  followUp: [
    {
      question: "Examples?",
      answer: "process.env"
    },
    {
      question: "Use?",
      answer: "Environment variables."
    }
  ]
},

{
  id: "tech-89",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find max subarray sum (Kadane).",
  hint: "Dynamic",
  answer: `
function maxSub(arr) {
  let max = arr[0], curr = arr[0];

  for (let i = 1; i < arr.length; i++) {
    curr = Math.max(arr[i], curr + arr[i]);
    max = Math.max(max, curr);
  }

  return max;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Why works?",
      answer: "Keeps best sum so far."
    }
  ]
},

{
  id: "tech-90",
  category: "DSA",
  type: "coding",
  difficulty: "Advanced",
  question: "Merge two sorted arrays.",
  hint: "Two pointers",
  answer: `
function merge(a, b) {
  let i = 0, j = 0, res = [];

  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) res.push(a[i++]);
    else res.push(b[j++]);
  }

  return res.concat(a.slice(i), b.slice(j));
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Use case?",
      answer: "Merge sort."
    }
  ]
},

{
  id: "tech-91",
  category: "MongoDB",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is replication?",
  hint: "Copies",
  answer: `
Replication creates multiple copies of data.

Ensures availability.
  `,
  followUp: [
    {
      question: "Primary vs secondary?",
      answer: "Primary writes, secondary reads."
    },
    {
      question: "Benefit?",
      answer: "Fault tolerance."
    }
  ]
},

{
  id: "tech-92",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "What is eventual consistency?",
  hint: "Distributed systems",
  answer: `
System becomes consistent over time.

Used in distributed systems.
  `,
  followUp: [
    {
      question: "Example?",
      answer: "NoSQL DBs."
    },
    {
      question: "Trade-off?",
      answer: "Temporary inconsistency."
    }
  ]
},

{
  id: "tech-93",
  category: "JavaScript",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is call, apply, bind?",
  hint: "this control",
  answer: `
call/apply invoke function immediately.
bind returns new function.
  `,
  followUp: [
    {
      question: "Difference?",
      answer: "apply takes array."
    },
    {
      question: "Use case?",
      answer: "Control this."
    }
  ]
},

{
  id: "tech-94",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is server-side rendering?",
  hint: "SSR",
  answer: `
SSR renders HTML on server.

Improves SEO and load speed.
  `,
  followUp: [
    {
      question: "Framework?",
      answer: "Next.js"
    },
    {
      question: "CSR vs SSR?",
      answer: "CSR client renders."
    }
  ]
},

{
  id: "tech-95",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is buffer in Node?",
  hint: "Binary",
  answer: `
Buffer handles binary data.

Used for file and network operations.
  `,
  followUp: [
    {
      question: "Why needed?",
      answer: "JS lacks binary support."
    },
    {
      question: "Example?",
      answer: "File streams."
    }
  ]
},

{
  id: "tech-96",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Check balanced parentheses.",
  hint: "Stack",
  answer: `
function isValid(s) {
  let stack = [];
  let map = {")":"(", "}":"{", "]":"["};

  for (let c of s) {
    if (["(", "{", "["].includes(c)) stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }

  return stack.length === 0;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Data structure?",
      answer: "Stack."
    }
  ]
},

{
  id: "tech-97",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find longest substring without repeating characters.",
  hint: "Sliding window",
  answer: `
function longest(s) {
  let set = new Set();
  let l = 0, max = 0;

  for (let r = 0; r < s.length; r++) {
    while (set.has(s[r])) {
      set.delete(s[l++]);
    }
    set.add(s[r]);
    max = Math.max(max, r - l + 1);
  }

  return max;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Technique?",
      answer: "Sliding window."
    }
  ]
},

{
  id: "tech-98",
  category: "CSS",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is responsive design?",
  hint: "Media queries",
  answer: `
Responsive design adapts layout to screen size.

Uses media queries and flexible layouts.
  `,
  followUp: [
    {
      question: "Mobile-first?",
      answer: "Design for small screens first."
    },
    {
      question: "Tools?",
      answer: "Flexbox, Grid."
    }
  ]
},

{
  id: "tech-99",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "What is load shedding?",
  hint: "Drop traffic",
  answer: `
Load shedding drops excess traffic to protect system.
  `,
  followUp: [
    {
      question: "Why needed?",
      answer: "Prevent crashes."
    },
    {
      question: "Example?",
      answer: "API limits."
    }
  ]
},

{
  id: "tech-100",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Chunk array into groups.",
  hint: "Loop",
  answer: `
function chunk(arr, size) {
  let res = [];

  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }

  return res;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Use case?",
      answer: "Pagination."
    }
  ]
},

{
  id: "tech-101",
  category: "JavaScript",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is garbage collection in JavaScript?",
  hint: "Memory management",
  answer: `
Garbage collection automatically removes unused memory.

JS uses mark-and-sweep algorithm:
- Marks reachable objects
- Removes unreachable ones
  `,
  followUp: [
    {
      question: "Can we control GC?",
      answer: "No, it is automatic."
    },
    {
      question: "Common issue?",
      answer: "Memory leaks due to references."
    }
  ]
},

{
  id: "tech-102",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Implement a simple polyfill for Array.map().",
  hint: "Loop",
  answer: `
Array.prototype.myMap = function(cb) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(cb(this[i], i, this));
  }
  return res;
};
  `,
  followUp: [
    {
      question: "Difference from original?",
      answer: "Edge cases not handled fully."
    },
    {
      question: "Why polyfill?",
      answer: "Support older browsers."
    }
  ]
},

{
  id: "tech-103",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is React Fragment?",
  hint: "No extra DOM",
  answer: `
Fragments allow grouping elements without adding extra DOM nodes.

<>
  <h1>Hello</h1>
</>
  `,
  followUp: [
    {
      question: "Why needed?",
      answer: "Avoid unnecessary wrappers."
    },
    {
      question: "Key support?",
      answer: "Yes, with <React.Fragment>."
    }
  ]
},

{
  id: "tech-104",
  category: "React",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create a simple search filter component.",
  hint: "useState + filter",
  answer: `
import { useState } from "react";

function Search({ items }) {
  const [query, setQuery] = useState("");

  const filtered = items.filter(i =>
    i.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input onChange={(e) => setQuery(e.target.value)} />
      {filtered.map((i, idx) => <p key={idx}>{i}</p>)}
    </>
  );
}
  `,
  followUp: [
    {
      question: "Optimize?",
      answer: "Use debounce."
    },
    {
      question: "Large data?",
      answer: "Use virtualization."
    }
  ]
},

{
  id: "tech-105",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is REPL in Node.js?",
  hint: "Interactive shell",
  answer: `
REPL stands for Read-Eval-Print Loop.

Used to execute JS code interactively.
  `,
  followUp: [
    {
      question: "Use case?",
      answer: "Testing code quickly."
    },
    {
      question: "Command?",
      answer: "node in terminal."
    }
  ]
},

{
  id: "tech-106",
  category: "Node",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create a basic HTTP server without Express.",
  hint: "http module",
  answer: `
const http = require("http");

http.createServer((req, res) => {
  res.write("Hello");
  res.end();
}).listen(3000);
  `,
  followUp: [
    {
      question: "Why Express preferred?",
      answer: "Simplifies routing and middleware."
    },
    {
      question: "Status code?",
      answer: "res.writeHead(200)"
    }
  ]
},

{
  id: "tech-107",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Move all zeros to end.",
  hint: "Two pointer",
  answer: `
function moveZeros(arr) {
  let j = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      j++;
    }
  }

  return arr;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "In-place?",
      answer: "Yes."
    }
  ]
},

{
  id: "tech-108",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find majority element.",
  hint: "Boyer-Moore",
  answer: `
function majority(arr) {
  let count = 0, candidate;

  for (let n of arr) {
    if (count === 0) candidate = n;
    count += (n === candidate) ? 1 : -1;
  }

  return candidate;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Space?",
      answer: "O(1)"
    }
  ]
},

{
  id: "tech-109",
  category: "MongoDB",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is indexing?",
  hint: "Speed queries",
  answer: `
Indexing improves query speed by creating data structure for fast lookup.
  `,
  followUp: [
    {
      question: "Downside?",
      answer: "Extra storage."
    },
    {
      question: "When use?",
      answer: "Frequent queries."
    }
  ]
},

{
  id: "tech-110",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "What is horizontal vs vertical scaling?",
  hint: "Add machines vs upgrade",
  answer: `
Horizontal: add servers  
Vertical: increase server power
  `,
  followUp: [
    {
      question: "Which better?",
      answer: "Horizontal."
    },
    {
      question: "Limitation?",
      answer: "Vertical has limit."
    }
  ]
},

{
  id: "tech-111",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Reverse words in sentence.",
  hint: "split reverse",
  answer: `
function reverseWords(str) {
  return str.split(" ").reverse().join(" ");
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Edge case?",
      answer: "Multiple spaces."
    }
  ]
},

{
  id: "tech-112",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is prop drilling?",
  hint: "Passing props deeply",
  answer: `
Prop drilling is passing props through multiple components unnecessarily.
  `,
  followUp: [
    {
      question: "Solution?",
      answer: "Context API."
    },
    {
      question: "Problem?",
      answer: "Hard to maintain."
    }
  ]
},

{
  id: "tech-113",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is CORS?",
  hint: "Cross-origin",
  answer: `
CORS allows servers to accept requests from different origins.
  `,
  followUp: [
    {
      question: "Why needed?",
      answer: "Browser security."
    },
    {
      question: "Fix?",
      answer: "Use cors middleware."
    }
  ]
},

{
  id: "tech-114",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find intersection of arrays (unique).",
  hint: "Set",
  answer: `
function intersect(a, b) {
  return [...new Set(a.filter(x => b.includes(x)))];
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n^2)"
    },
    {
      question: "Optimize?",
      answer: "Use Set."
    }
  ]
},

{
  id: "tech-115",
  category: "CSS",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is rem vs em?",
  hint: "Root vs parent",
  answer: `
rem = root font size  
em = parent font size
  `,
  followUp: [
    {
      question: "Which better?",
      answer: "rem for consistency."
    },
    {
      question: "Use case?",
      answer: "Responsive design."
    }
  ]
},

{
  id: "tech-116",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "What is API gateway?",
  hint: "Single entry",
  answer: `
API gateway acts as entry point for all services.
  `,
  followUp: [
    {
      question: "Benefits?",
      answer: "Security, routing."
    },
    {
      question: "Example?",
      answer: "AWS API Gateway."
    }
  ]
},

{
  id: "tech-117",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Count occurrences of word.",
  hint: "split filter",
  answer: `
function countWord(str, word) {
  return str.split(" ").filter(w => w === word).length;
}
  `,
  followUp: [
    {
      question: "Case insensitive?",
      answer: "Convert to lower case."
    },
    {
      question: "Regex?",
      answer: "Yes."
    }
  ]
},

{
  id: "tech-118",
  category: "React",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create simple modal component.",
  hint: "conditional render",
  answer: `
function Modal({ open, children }) {
  if (!open) return null;
  return <div className="modal">{children}</div>;
}
  `,
  followUp: [
    {
      question: "Accessibility?",
      answer: "Focus trap."
    },
    {
      question: "Better?",
      answer: "Portal."
    }
  ]
},

{
  id: "tech-119",
  category: "Node",
  type: "coding",
  difficulty: "Intermediate",
  question: "Create simple logger utility.",
  hint: "console wrapper",
  answer: `
function logger(msg) {
  console.log(new Date(), msg);
}
  `,
  followUp: [
    {
      question: "Advanced?",
      answer: "Use Winston."
    },
    {
      question: "Why logging?",
      answer: "Debugging."
    }
  ]
},

{
  id: "tech-120",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find minimum element in array.",
  hint: "loop",
  answer: `
function min(arr) {
  return Math.min(...arr);
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Without spread?",
      answer: "Loop."
    }
  ]
},

{
  id: "tech-121",
  category: "JavaScript",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is debounce vs throttle?",
  hint: "control execution",
  answer: `
Debounce delays execution  
Throttle limits execution rate
  `,
  followUp: [
    {
      question: "Use debounce?",
      answer: "Search input."
    },
    {
      question: "Use throttle?",
      answer: "Scroll events."
    }
  ]
},

{
  id: "tech-122",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is useCallback?",
  hint: "memo function",
  answer: `
useCallback memoizes functions to prevent re-creation.
  `,
  followUp: [
    {
      question: "Difference useMemo?",
      answer: "Value vs function."
    },
    {
      question: "When use?",
      answer: "Optimization."
    }
  ]
},

{
  id: "tech-123",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is JWT?",
  hint: "Auth token",
  answer: `
JWT is token-based authentication.

Contains header, payload, signature.
  `,
  followUp: [
    {
      question: "Secure?",
      answer: "Yes with HTTPS."
    },
    {
      question: "Where stored?",
      answer: "Cookies or localStorage."
    }
  ]
},

{
  id: "tech-124",
  category: "DSA",
  type: "coding",
  difficulty: "Intermediate",
  question: "Check if array contains duplicates.",
  hint: "Set",
  answer: `
function hasDup(arr) {
  return new Set(arr).size !== arr.length;
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Space?",
      answer: "O(n)"
    }
  ]
},

{
  id: "tech-125",
  category: "MongoDB",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is aggregation?",
  hint: "pipeline",
  answer: `
Aggregation processes data through pipeline stages.
  `,
  followUp: [
    {
      question: "Stages?",
      answer: "$match, $group."
    },
    {
      question: "Use?",
      answer: "Analytics."
    }
  ]
},

{
  id: "tech-126",
  category: "System Design",
  type: "theory",
  difficulty: "Advanced",
  question: "What is circuit breaker pattern?",
  hint: "failure handling",
  answer: `
Prevents system failure by stopping repeated failed requests.
  `,
  followUp: [
    {
      question: "Example?",
      answer: "Netflix Hystrix."
    },
    {
      question: "States?",
      answer: "Open, Closed, Half-open."
    }
  ]
},

{
  id: "tech-127",
  category: "JavaScript",
  type: "coding",
  difficulty: "Intermediate",
  question: "Find longest word in sentence.",
  hint: "split reduce",
  answer: `
function longest(str) {
  return str.split(" ").reduce((a, b) =>
    b.length > a.length ? b : a
  );
}
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n)"
    },
    {
      question: "Edge case?",
      answer: "Empty string."
    }
  ]
},

{
  id: "tech-128",
  category: "React",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is lazy loading in React?",
  hint: "code splitting",
  answer: `
Lazy loading loads components only when needed using React.lazy().
  `,
  followUp: [
    {
      question: "Benefit?",
      answer: "Improves performance."
    },
    {
      question: "Wrapper?",
      answer: "Suspense."
    }
  ]
},

{
  id: "tech-129",
  category: "Node",
  type: "theory",
  difficulty: "Intermediate",
  question: "What is middleware chaining?",
  hint: "next()",
  answer: `
Multiple middleware executed sequentially using next().
  `,
  followUp: [
    {
      question: "Order matters?",
      answer: "Yes."
    },
    {
      question: "Stop chain?",
      answer: "Do not call next()."
    }
  ]
},

{
  id: "tech-130",
  category: "DSA",
  type: "coding",
  difficulty: "Advanced",
  question: "Find k-th largest element.",
  hint: "Heap or sort",
  answer: `
function kthLargest(arr, k) {
  return arr.sort((a, b) => b - a)[k - 1];
}
  `,
  followUp: [
    {
      question: "Optimized?",
      answer: "Use min heap."
    },
    {
      question: "Time complexity?",
      answer: "O(n log n)"
    }
  ]
}

];