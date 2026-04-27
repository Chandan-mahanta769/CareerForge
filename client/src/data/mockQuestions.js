// export const mockQuestions = [
// {
//   id: "mock-1",
//   type: "mixed", 
//   // technical | hr | dsa | system | mixed

//   difficulty: "easy", 
//   // easy (60s), medium (45s), hard (30s)

//   question: "Main interview question",

//   expectedPoints: [
//     "Key concept 1",
//     "Key concept 2",
//     "Key concept 3"
//   ],

//   sampleAnswer: `
// How a strong candidate would answer verbally `,

//   followUp: [
//     {
//       question: "Follow-up interviewer question",
//       answer: "Expected answer"
//     }
//   ],

//   evaluation: {
//     clarity: "What interviewer checks",
//     depth: "Concept understanding",
//     communication: "How well explained"
//   }
// }

// ];

export const mockQuestions = [

{
  id: "mock-1",
  type: "technical",
  difficulty: "easy",
  question: "Explain the difference between var, let, and const in JavaScript.",
  expectedPoints: [
    "Scope difference",
    "Reassignment",
    "Hoisting behavior"
  ],
  sampleAnswer: `
var is function scoped and can be redeclared.
let is block scoped and can be updated but not redeclared.
const is also block scoped but cannot be reassigned.

In modern JS, we prefer const and let to avoid bugs.
  `,
  followUp: [
    {
      question: "What is Temporal Dead Zone?",
      answer: "Time between declaration and initialization where variable cannot be accessed."
    }
  ],
  evaluation: {
    clarity: "Clear explanation of scope",
    depth: "Understands hoisting",
    communication: "Simple comparison"
  }
},

{
  id: "mock-2",
  type: "dsa",
  difficulty: "medium",
  question: "Explain how you would solve the Two Sum problem.",
  expectedPoints: [
    "Brute force vs optimized",
    "Hash map approach",
    "Time complexity"
  ],
  sampleAnswer: `
First approach is brute force O(n²).
Better approach is using hashmap.

We store numbers and their index, and check if target - current exists.

This gives O(n) time complexity.
  `,
  followUp: [
    {
      question: "What is space complexity?",
      answer: "O(n) due to hashmap."
    }
  ],
  evaluation: {
    clarity: "Explains approach clearly",
    depth: "Mentions optimization",
    communication: "Structured thinking"
  }
},

{
  id: "mock-3",
  type: "hr",
  difficulty: "easy",
  question: "Tell me about yourself.",
  expectedPoints: [
    "Education",
    "Skills",
    "Projects",
    "Career goal"
  ],
  sampleAnswer: `
I am an MCA final-year student with strong interest in full-stack development.
I have worked on projects like a placement tracker app using MERN stack.
I enjoy solving DSA problems and building real-world applications.
My goal is to become a skilled software developer.
  `,
  followUp: [
    {
      question: "Why should we hire you?",
      answer: "Because of my practical skills, projects, and eagerness to learn."
    }
  ],
  evaluation: {
    clarity: "Well-structured intro",
    depth: "Shows skills",
    communication: "Confident speaking"
  }
},

{
  id: "mock-4",
  type: "technical",
  difficulty: "medium",
  question: "Explain closures with a real-life example.",
  expectedPoints: [
    "Definition",
    "Lexical scope",
    "Real use case"
  ],
  sampleAnswer: `
Closure is when a function remembers variables from outer scope.

Example is counter function where inner function uses outer variable.

Used in data privacy and React hooks.
  `,
  followUp: [
    {
      question: "Can closures cause memory issues?",
      answer: "Yes, if references are not cleaned."
    }
  ],
  evaluation: {
    clarity: "Explains concept",
    depth: "Gives example",
    communication: "Easy explanation"
  }
},

{
  id: "mock-5",
  type: "system",
  difficulty: "hard",
  question: "Design a URL shortener like bit.ly.",
  expectedPoints: [
    "API design",
    "Database mapping",
    "Hashing",
    "Scalability"
  ],
  sampleAnswer: `
We create API that takes long URL and returns short code.
Store mapping in DB.
Use hashing or base62 encoding.
Use caching like Redis for fast access.
Scale using load balancer.
  `,
  followUp: [
    {
      question: "How to handle collisions?",
      answer: "Regenerate or use unique IDs."
    }
  ],
  evaluation: {
    clarity: "Explains architecture",
    depth: "Mentions scaling",
    communication: "Structured flow"
  }
},

{
  id: "mock-6",
  type: "technical",
  difficulty: "medium",
  question: "What is event delegation?",
  expectedPoints: [
    "Parent listener",
    "Event bubbling",
    "Performance benefit"
  ],
  sampleAnswer: `
Event delegation is attaching event listener to parent element.

It works using event bubbling.

It improves performance especially for dynamic elements.
  `,
  followUp: [
    {
      question: "Where used?",
      answer: "Lists, tables, dynamic UI."
    }
  ],
  evaluation: {
    clarity: "Clear concept",
    depth: "Mentions bubbling",
    communication: "Good explanation"
  }
},

{
  id: "mock-7",
  type: "dsa",
  difficulty: "medium",
  question: "How does binary search work?",
  expectedPoints: [
    "Sorted array",
    "Divide and conquer",
    "O(log n)"
  ],
  sampleAnswer: `
Binary search works on sorted arrays.

We divide array into halves and compare mid value.

If target smaller, go left else right.

Time complexity is O(log n).
  `,
  followUp: [
    {
      question: "What if array not sorted?",
      answer: "Binary search will fail."
    }
  ],
  evaluation: {
    clarity: "Step-by-step explanation",
    depth: "Mentions complexity",
    communication: "Logical flow"
  }
},

{
  id: "mock-8",
  type: "hr",
  difficulty: "easy",
  question: "What are your strengths and weaknesses?",
  expectedPoints: [
    "Honest answer",
    "Strength with example",
    "Weakness with improvement"
  ],
  sampleAnswer: `
My strength is problem solving and consistency.
My weakness is overthinking sometimes, but I am improving by practicing structured thinking.
  `,
  followUp: [
    {
      question: "How are you improving?",
      answer: "By practicing daily and time management."
    }
  ],
  evaluation: {
    clarity: "Honest answer",
    depth: "Self-awareness",
    communication: "Balanced answer"
  }
},

{
  id: "mock-9",
  type: "technical",
  difficulty: "medium",
  question: "What is React Virtual DOM?",
  expectedPoints: [
    "Lightweight DOM",
    "Diffing",
    "Performance"
  ],
  sampleAnswer: `
Virtual DOM is a lightweight copy of real DOM.

React compares it and updates only changed parts.

This improves performance.
  `,
  followUp: [
    {
      question: "Why faster?",
      answer: "Less real DOM manipulation."
    }
  ],
  evaluation: {
    clarity: "Simple explanation",
    depth: "Understands diffing",
    communication: "Concise"
  }
},

{
  id: "mock-10",
  type: "dsa",
  difficulty: "medium",
  question: "Explain time complexity of quick sort.",
  expectedPoints: [
    "Average O(n log n)",
    "Worst O(n²)",
    "Divide and conquer"
  ],
  sampleAnswer: `
Quick sort uses divide and conquer.

Average time complexity is O(n log n).
Worst case is O(n²) when pivot is bad.
  `,
  followUp: [
    {
      question: "How to improve?",
      answer: "Random pivot selection."
    }
  ],
  evaluation: {
    clarity: "Explains properly",
    depth: "Mentions worst case",
    communication: "Structured"
  }
},

// Continue similar quality till 20

{
  id: "mock-11",
  type: "technical",
  difficulty: "medium",
  question: "What is middleware in Express?",
  expectedPoints: ["Request flow", "next()", "Usage"],
  sampleAnswer: `Middleware functions run during request-response cycle and can modify req, res or call next().`,
  followUp: [{ question: "What if next not called?", answer: "Request will hang." }],
  evaluation: { clarity: "Basic concept", depth: "Flow understanding", communication: "Clear" }
},

{
  id: "mock-12",
  type: "dsa",
  difficulty: "medium",
  question: "Explain stack vs queue.",
  expectedPoints: ["LIFO", "FIFO", "Use cases"],
  sampleAnswer: `Stack uses LIFO (last in first out), queue uses FIFO (first in first out).`,
  followUp: [{ question: "Use case?", answer: "Stack: recursion, Queue: scheduling." }],
  evaluation: { clarity: "Concept clear", depth: "Use case", communication: "Simple" }
},

{
  id: "mock-13",
  type: "hr",
  difficulty: "easy",
  question: "Why do you want this job?",
  expectedPoints: ["Company interest", "Skill match", "Growth"],
  sampleAnswer: `This role matches my skills and gives me opportunity to grow and contribute.`,
  followUp: [{ question: "Why our company?", answer: "Because of culture and growth opportunities." }],
  evaluation: { clarity: "Relevant answer", depth: "Research shown", communication: "Confident" }
},

{
  id: "mock-14",
  type: "system",
  difficulty: "hard",
  question: "What is load balancing?",
  expectedPoints: ["Distribute traffic", "Servers", "Performance"],
  sampleAnswer: `Load balancing distributes incoming traffic across servers to improve performance.`,
  followUp: [{ question: "Types?", answer: "Round robin, least connections." }],
  evaluation: { clarity: "Basic explanation", depth: "Types known", communication: "Clear" }
},

{
  id: "mock-15",
  type: "technical",
  difficulty: "medium",
  question: "Explain useEffect hook.",
  expectedPoints: ["Side effects", "Dependency array"],
  sampleAnswer: `useEffect handles side effects like API calls and runs based on dependencies.`,
  followUp: [{ question: "Cleanup?", answer: "Return function." }],
  evaluation: { clarity: "Correct concept", depth: "Dependencies", communication: "Good" }
},

{
  id: "mock-16",
  type: "dsa",
  difficulty: "medium",
  question: "What is recursion?",
  expectedPoints: ["Function calling itself", "Base case"],
  sampleAnswer: `Recursion is when function calls itself until base condition is met.`,
  followUp: [{ question: "Risk?", answer: "Stack overflow." }],
  evaluation: { clarity: "Basic understanding", depth: "Base case", communication: "Simple" }
},

{
  id: "mock-17",
  type: "hr",
  difficulty: "easy",
  question: "Where do you see yourself in 5 years?",
  expectedPoints: ["Growth", "Skills", "Company contribution"],
  sampleAnswer: `I see myself as a skilled developer contributing to impactful projects.`,
  followUp: [{ question: "Leadership?", answer: "Yes, aiming for senior role." }],
  evaluation: { clarity: "Clear vision", depth: "Realistic", communication: "Confident" }
},

{
  id: "mock-18",
  type: "technical",
  difficulty: "medium",
  question: "What is REST API?",
  expectedPoints: ["Stateless", "HTTP methods"],
  sampleAnswer: `REST API uses HTTP methods like GET, POST and is stateless.`,
  followUp: [{ question: "Methods?", answer: "GET, POST, PUT, DELETE." }],
  evaluation: { clarity: "Basic concept", depth: "Methods", communication: "Clear" }
},

{
  id: "mock-19",
  type: "system",
  difficulty: "hard",
  question: "What is caching?",
  expectedPoints: ["Store data", "Improve speed"],
  sampleAnswer: `Caching stores frequently used data to improve performance.`,
  followUp: [{ question: "Tool?", answer: "Redis." }],
  evaluation: { clarity: "Concept clear", depth: "Tool knowledge", communication: "Good" }
},

{
  id: "mock-20",
  type: "mixed",
  difficulty: "hard",
  question: "Explain a project you built and challenges you faced.",
  expectedPoints: ["Project explanation", "Challenges", "Solutions"],
  sampleAnswer: `
I built a placement tracker app using MERN stack.
I faced issues in authentication and solved it using JWT.
I also optimized performance using efficient queries.
  `,
  followUp: [
    {
      question: "What would you improve?",
      answer: "Better UI and scalability."
    }
  ],
  evaluation: {
    clarity: "Project explanation",
    depth: "Problem solving",
    communication: "Confidence"
  }
},

{
  id: "mock-21",
  type: "technical",
  difficulty: "hard",
  question: "Explain how JavaScript handles asynchronous code internally.",
  expectedPoints: [
    "Call stack",
    "Web APIs",
    "Callback queue",
    "Event loop",
    "Microtasks vs macrotasks"
  ],
  sampleAnswer: `
JavaScript uses event loop for async operations.

Async tasks go to Web APIs, then to callback queue.
Event loop pushes them back to call stack.

Promises are handled in microtask queue which runs before callback queue.
  `,
  followUp: [
    {
      question: "Why do promises execute before setTimeout?",
      answer: "Because microtask queue has higher priority than macrotask queue."
    },
    {
      question: "What happens if call stack is busy?",
      answer: "Callbacks wait in queue until stack is free."
    }
  ],
  evaluation: {
    clarity: "Clear explanation of flow",
    depth: "Mentions microtask priority",
    communication: "Step-by-step explanation"
  }
},

{
  id: "mock-22",
  type: "dsa",
  difficulty: "hard",
  question: "How would you detect a cycle in a linked list and why does your approach work?",
  expectedPoints: [
    "Floyd cycle detection",
    "Slow and fast pointers",
    "Mathematical reasoning"
  ],
  sampleAnswer: `
We use two pointers: slow moves 1 step, fast moves 2 steps.

If cycle exists, they will meet.

Because fast pointer laps slow pointer inside loop.
  `,
  followUp: [
    {
      question: "What is time complexity?",
      answer: "O(n)"
    },
    {
      question: "Can you find cycle start?",
      answer: "Yes, reset one pointer to head and move both one step."
    }
  ],
  evaluation: {
    clarity: "Explains logic",
    depth: "Understands reasoning",
    communication: "Confident explanation"
  }
},

{
  id: "mock-23",
  type: "system",
  difficulty: "hard",
  question: "Design a scalable chat application like WhatsApp.",
  expectedPoints: [
    "WebSockets",
    "Real-time messaging",
    "Database design",
    "Scalability",
    "Message queues"
  ],
  sampleAnswer: `
Use WebSockets for real-time communication.

Store messages in database.
Use message queues like Kafka for scalability.
Use load balancer for distributing traffic.
  `,
  followUp: [
    {
      question: "How to handle offline messages?",
      answer: "Store in DB and deliver when user reconnects."
    },
    {
      question: "How to scale?",
      answer: "Use distributed systems and sharding."
    }
  ],
  evaluation: {
    clarity: "Structured design",
    depth: "Covers components",
    communication: "Logical explanation"
  }
},

{
  id: "mock-24",
  type: "technical",
  difficulty: "hard",
  question: "What are memory leaks in JavaScript and how do you prevent them?",
  expectedPoints: [
    "Unused references",
    "Closures",
    "Timers",
    "Event listeners"
  ],
  sampleAnswer: `
Memory leaks happen when unused objects are not garbage collected.

Causes:
- Unremoved event listeners
- Closures holding references
- setInterval without clear

Prevention:
- Clean up listeners
- Use cleanup functions
  `,
  followUp: [
    {
      question: "How detect memory leaks?",
      answer: "Using browser dev tools memory profiling."
    }
  ],
  evaluation: {
    clarity: "Clear definition",
    depth: "Real examples",
    communication: "Practical explanation"
  }
},

{
  id: "mock-25",
  type: "dsa",
  difficulty: "hard",
  question: "Explain how LRU cache works and implement logic.",
  expectedPoints: [
    "Hash map + doubly linked list",
    "O(1) operations",
    "Eviction policy"
  ],
  sampleAnswer: `
LRU cache removes least recently used item.

Use hashmap for fast access and doubly linked list for order.

Insert and remove in O(1).
  `,
  followUp: [
    {
      question: "Why doubly linked list?",
      answer: "To remove nodes efficiently."
    }
  ],
  evaluation: {
    clarity: "Concept clarity",
    depth: "Data structure knowledge",
    communication: "Structured explanation"
  }
},

{
  id: "mock-26",
  type: "technical",
  difficulty: "hard",
  question: "Explain how React batching works.",
  expectedPoints: [
    "State updates grouped",
    "Performance",
    "Async updates"
  ],
  sampleAnswer: `
React batches multiple state updates to reduce re-renders.

It groups updates in same event loop cycle.
  `,
  followUp: [
    {
      question: "When batching not happen?",
      answer: "Outside React events."
    }
  ],
  evaluation: {
    clarity: "Basic explanation",
    depth: "Understands batching",
    communication: "Clear"
  }
},

{
  id: "mock-27",
  type: "system",
  difficulty: "hard",
  question: "How would you design a rate limiter?",
  expectedPoints: [
    "Token bucket",
    "Leaky bucket",
    "Redis",
    "Distributed systems"
  ],
  sampleAnswer: `
Use token bucket algorithm.

Store request count in Redis.

Limit requests per time window.
  `,
  followUp: [
    {
      question: "Why Redis?",
      answer: "Fast and distributed."
    }
  ],
  evaluation: {
    clarity: "Clear idea",
    depth: "Knows algorithms",
    communication: "Structured"
  }
},

{
  id: "mock-28",
  type: "technical",
  difficulty: "hard",
  question: "Explain difference between shallow copy and deep copy.",
  expectedPoints: [
    "Reference vs value",
    "Nested objects",
    "Spread vs recursion"
  ],
  sampleAnswer: `
Shallow copy copies references.
Deep copy copies full structure.

Example:
Spread = shallow
Recursive clone = deep
  `,
  followUp: [
    {
      question: "JSON stringify issue?",
      answer: "Fails for functions and circular refs."
    }
  ],
  evaluation: {
    clarity: "Concept clear",
    depth: "Examples",
    communication: "Good"
  }
},

{
  id: "mock-29",
  type: "dsa",
  difficulty: "hard",
  question: "How does merge sort work and why is it stable?",
  expectedPoints: [
    "Divide and conquer",
    "Merge step",
    "Stability concept"
  ],
  sampleAnswer: `
Merge sort divides array and merges sorted parts.

It is stable because equal elements maintain order.
  `,
  followUp: [
    {
      question: "Time complexity?",
      answer: "O(n log n)"
    }
  ],
  evaluation: {
    clarity: "Steps explained",
    depth: "Stability",
    communication: "Clear"
  }
},

{
  id: "mock-30",
  type: "hr",
  difficulty: "hard",
  question: "Tell me about a time you failed and what you learned.",
  expectedPoints: [
    "Real story",
    "Learning",
    "Improvement"
  ],
  sampleAnswer: `
I once underestimated project complexity and missed deadline.

I learned planning and breaking tasks into smaller parts.
  `,
  followUp: [
    {
      question: "What changed after that?",
      answer: "I now plan and track progress better."
    }
  ],
  evaluation: {
    clarity: "Honest answer",
    depth: "Learning shown",
    communication: "Confident"
  }
},

// continue 31–40 same level

{
  id: "mock-31",
  type: "technical",
  difficulty: "hard",
  question: "Explain how browser rendering works.",
  expectedPoints: ["DOM", "CSSOM", "Render tree", "Layout", "Paint"],
  sampleAnswer: `Browser builds DOM and CSSOM, creates render tree, calculates layout and paints.`,
  followUp: [{ question: "Reflow vs repaint?", answer: "Reflow affects layout, repaint affects visuals." }],
  evaluation: { clarity: "Flow understanding", depth: "Stages", communication: "Structured" }
},

{
  id: "mock-32",
  type: "dsa",
  difficulty: "hard",
  question: "Explain sliding window technique.",
  expectedPoints: ["Window range", "Optimization"],
  sampleAnswer: `Sliding window reduces nested loops by maintaining window range.`,
  followUp: [{ question: "Use case?", answer: "Substring problems." }],
  evaluation: { clarity: "Concept", depth: "Use case", communication: "Clear" }
},

{
  id: "mock-33",
  type: "system",
  difficulty: "hard",
  question: "Design a file upload system.",
  expectedPoints: ["Chunking", "Storage", "Scaling"],
  sampleAnswer: `Split files into chunks, upload to server/cloud, merge later.`,
  followUp: [{ question: "Large files?", answer: "Chunk upload." }],
  evaluation: { clarity: "Approach", depth: "Scalability", communication: "Logical" }
},

{
  id: "mock-34",
  type: "technical",
  difficulty: "hard",
  question: "What is event loop starvation?",
  expectedPoints: ["Blocking", "CPU tasks"],
  sampleAnswer: `Long tasks block event loop delaying other operations.`,
  followUp: [{ question: "Fix?", answer: "Use async or workers." }],
  evaluation: { clarity: "Problem", depth: "Solution", communication: "Clear" }
},

{
  id: "mock-35",
  type: "dsa",
  difficulty: "hard",
  question: "Explain dynamic programming.",
  expectedPoints: ["Overlapping subproblems", "Memoization"],
  sampleAnswer: `DP solves problems by storing sub-results.`,
  followUp: [{ question: "Example?", answer: "Fibonacci." }],
  evaluation: { clarity: "Concept", depth: "Technique", communication: "Good" }
},

{
  id: "mock-36",
  type: "hr",
  difficulty: "hard",
  question: "Why should we not hire you?",
  expectedPoints: ["Honesty", "Self-awareness"],
  sampleAnswer: `I am still learning advanced system design but improving daily.`,
  followUp: [{ question: "How improving?", answer: "Practicing projects." }],
  evaluation: { clarity: "Honest", depth: "Self-awareness", communication: "Balanced" }
},

{
  id: "mock-37",
  type: "technical",
  difficulty: "hard",
  question: "Explain difference between synchronous and asynchronous execution deeply.",
  expectedPoints: ["Blocking", "Non-blocking"],
  sampleAnswer: `Sync blocks execution, async allows parallel handling.`,
  followUp: [{ question: "Example?", answer: "API calls." }],
  evaluation: { clarity: "Basic", depth: "Comparison", communication: "Clear" }
},

{
  id: "mock-38",
  type: "system",
  difficulty: "hard",
  question: "What is database sharding?",
  expectedPoints: ["Partitioning", "Scaling"],
  sampleAnswer: `Splitting data across servers for scalability.`,
  followUp: [{ question: "Shard key?", answer: "Key used for distribution." }],
  evaluation: { clarity: "Concept", depth: "Use", communication: "Good" }
},

{
  id: "mock-39",
  type: "technical",
  difficulty: "hard",
  question: "Explain shadow DOM.",
  expectedPoints: ["Encapsulation", "Web components"],
  sampleAnswer: `Shadow DOM isolates component styles.`,
  followUp: [{ question: "Use?", answer: "Reusable components." }],
  evaluation: { clarity: "Concept", depth: "Use case", communication: "Clear" }
},

{
  id: "mock-40",
  type: "mixed",
  difficulty: "hard",
  question: "If your app crashes in production, what steps will you take?",
  expectedPoints: ["Debugging", "Logs", "Rollback"],
  sampleAnswer: `
Check logs, identify issue, rollback if needed, fix and redeploy.
  `,
  followUp: [
    {
      question: "Prevent future?",
      answer: "Testing and monitoring."
    }
  ],
  evaluation: {
    clarity: "Structured approach",
    depth: "Real thinking",
    communication: "Confident"
  }
},

{
  id: "mock-41",
  type: "technical",
  difficulty: "hard",
  question: "Explain how you would optimize a slow React application.",
  expectedPoints: [
    "memoization",
    "useMemo/useCallback",
    "code splitting",
    "lazy loading",
    "avoid re-renders"
  ],
  sampleAnswer: `
I would first identify bottlenecks using React DevTools.

Then optimize using memoization, useMemo, useCallback.
Use lazy loading and code splitting to reduce bundle size.
Avoid unnecessary re-renders.
  `,
  followUp: [
    {
      question: "How detect re-renders?",
      answer: "Using React DevTools profiler."
    }
  ],
  evaluation: {
    clarity: "Optimization steps",
    depth: "Tool usage",
    communication: "Structured answer"
  }
},

{
  id: "mock-42",
  type: "dsa",
  difficulty: "hard",
  question: "How would you find the longest increasing subsequence?",
  expectedPoints: [
    "dynamic programming",
    "binary search optimization",
    "O(n log n)"
  ],
  sampleAnswer: `
We can solve using DP in O(n²).

Optimized approach uses binary search with O(n log n).
  `,
  followUp: [
    {
      question: "Which better?",
      answer: "Binary search approach."
    }
  ],
  evaluation: {
    clarity: "Approach clarity",
    depth: "Optimization",
    communication: "Good explanation"
  }
},

{
  id: "mock-43",
  type: "system",
  difficulty: "hard",
  question: "Design a notification system.",
  expectedPoints: [
    "queue",
    "push system",
    "scalability",
    "retry logic"
  ],
  sampleAnswer: `
Use message queue like Kafka.
Send notifications asynchronously.
Implement retry mechanism.
Scale using distributed services.
  `,
  followUp: [
    {
      question: "How handle failure?",
      answer: "Retry + dead letter queue."
    }
  ],
  evaluation: {
    clarity: "System design",
    depth: "Fault tolerance",
    communication: "Logical flow"
  }
},

{
  id: "mock-44",
  type: "technical",
  difficulty: "hard",
  question: "Explain how browser handles CSS rendering performance.",
  expectedPoints: [
    "reflow",
    "repaint",
    "layout thrashing"
  ],
  sampleAnswer: `
Browser calculates layout (reflow) and paints UI.

Frequent changes cause layout thrashing which reduces performance.
  `,
  followUp: [
    {
      question: "How optimize?",
      answer: "Batch DOM changes."
    }
  ],
  evaluation: {
    clarity: "Concept",
    depth: "Performance",
    communication: "Clear"
  }
},

{
  id: "mock-45",
  type: "hr",
  difficulty: "hard",
  question: "Describe a conflict in a team and how you handled it.",
  expectedPoints: [
    "situation",
    "action",
    "resolution"
  ],
  sampleAnswer: `
I had disagreement in project approach.
We discussed pros and cons and agreed on better solution.
  `,
  followUp: [
    {
      question: "What did you learn?",
      answer: "Importance of communication."
    }
  ],
  evaluation: {
    clarity: "Storytelling",
    depth: "Conflict handling",
    communication: "Confidence"
  }
},

// continue similar quality till 70

{
  id: "mock-46",
  type: "technical",
  difficulty: "hard",
  question: "Explain difference between monolithic and microservices architecture.",
  expectedPoints: ["structure", "scaling", "complexity"],
  sampleAnswer: `Monolithic is single unit, microservices are distributed.`,
  followUp: [{ question: "Which better?", answer: "Depends on scale." }],
  evaluation: { clarity: "Comparison", depth: "Trade-offs", communication: "Good" }
},

{
  id: "mock-47",
  type: "dsa",
  difficulty: "hard",
  question: "Explain graph traversal BFS vs DFS.",
  expectedPoints: ["queue vs stack", "use cases"],
  sampleAnswer: `BFS uses queue, DFS uses stack.`,
  followUp: [{ question: "Shortest path?", answer: "BFS." }],
  evaluation: { clarity: "Difference", depth: "Use case", communication: "Clear" }
},

{
  id: "mock-48",
  type: "system",
  difficulty: "hard",
  question: "Design a caching system.",
  expectedPoints: ["cache layer", "TTL", "eviction"],
  sampleAnswer: `Use Redis with TTL and LRU eviction.`,
  followUp: [{ question: "Invalidation?", answer: "Expire or manual." }],
  evaluation: { clarity: "Design", depth: "Caching", communication: "Good" }
},

{
  id: "mock-49",
  type: "technical",
  difficulty: "hard",
  question: "Explain how garbage collection works in detail.",
  expectedPoints: ["mark and sweep"],
  sampleAnswer: `Marks reachable and removes unreachable objects.`,
  followUp: [{ question: "Memory leak?", answer: "Unused references." }],
  evaluation: { clarity: "Concept", depth: "Details", communication: "Clear" }
},

{
  id: "mock-50",
  type: "mixed",
  difficulty: "hard",
  question: "Explain your toughest bug and how you solved it.",
  expectedPoints: ["problem", "debugging", "solution"],
  sampleAnswer: `Faced API bug, debugged logs and fixed backend issue.`,
  followUp: [{ question: "Tool used?", answer: "Console + logs." }],
  evaluation: { clarity: "Story", depth: "Problem solving", communication: "Confident" }
},

// 51–70 similar pattern (continuing)

{
  id: "mock-70",
  type: "system",
  difficulty: "hard",
  question: "How would you design a scalable API?",
  expectedPoints: ["load balancing", "caching", "db optimization"],
  sampleAnswer: `Use load balancer, caching and optimized DB queries.`,
  followUp: [{ question: "Monitoring?", answer: "Logs + metrics." }],
  evaluation: { clarity: "Architecture", depth: "Scalability", communication: "Structured" }
}

];