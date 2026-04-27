// export const vivaQuestions = [

// {
//   id: "viva-1",

//   category: "CategoryName",   // e.g., HTML, CSS, JavaScript, React, DSA, etc.

//   question: "Your question here",

//   answer: "Clear explanation of the concept",

//   followUp: [
//     "Follow-up question 1",
//     "Follow-up question 2"
//   ]
// }

// ];





export const vivaQuestions = [
  {
    id: "viva-1",
    category: "JavaScript",
    question: "What is hoisting?",
    answer:
      "Hoisting is JavaScript behavior where variable and function declarations are moved to the top of their scope during compilation.",
    followUp: ["Does let and const hoist?"],
  },

  {
    id: "viva-2",
    category: "HTML",
    question: "What is the full form of HTML?",
    answer:
      "HTML stands for HyperText Markup Language. It is used to structure web pages.",
    followUp: ["Is HTML a programming language?"],
  },

  {
    id: "viva-3",
    category: "CSS",
    question: "Difference between Flexbox and Grid?",
    answer:
      "Flexbox is one-dimensional (row or column), while Grid is two-dimensional (rows and columns).",
    followUp: ["When to use Grid?"],
  },

  {
    id: "viva-4",
    category: "React",
    question: "What is useState?",
    answer:
      "useState is a React hook used to manage state in functional components.",
    followUp: ["Can we have multiple useState?"],
  },

  {
    id: "viva-5",
    category: "DSA",
    question: "What is Big-O notation?",
    answer:
      "Big-O notation describes the time complexity of an algorithm in terms of input size.",
    followUp: ["Example of O(n)?"],
  },

  {
    id: "viva-6",
    category: "CSS",
    question: "Difference between inline, internal, and external CSS?",
    answer:
      "Inline is applied directly to elements, internal is within style tag, external is in separate CSS file.",
    followUp: ["Which is best practice?"],
  },

  {
    id: "viva-7",
    category: "JavaScript",
    question: "Difference between == and ===?",
    answer: "== compares values, === compares both value and type.",
    followUp: ["Why avoid ==?"],
  },

  {
    id: "viva-8",
    category: "HTML",
    question: "Difference between <div> and <span>?",
    answer: "div is block-level element, span is inline element.",
    followUp: ["Can span become block?"],
  },

  {
    id: "viva-9",
    category: "Node",
    question: "What is Node.js?",
    answer:
      "Node.js is a runtime environment that allows JavaScript to run on the server.",
    followUp: ["Why Node is fast?"],
  },

  {
    id: "viva-10",
    category: "React",
    question: "What is Virtual DOM?",
    answer:
      "Virtual DOM is a lightweight copy of real DOM used by React to optimize updates.",
    followUp: ["How diffing works?"],
  },

  {
    id: "viva-11",
    category: "DSA",
    question: "What is recursion?",
    answer:
      "Recursion is a function calling itself to solve smaller subproblems.",
    followUp: ["Base condition importance?"],
  },

  {
    id: "viva-12",
    category: "CSS",
    question: "What is z-index?",
    answer: "z-index controls stacking order of elements on the z-axis.",
    followUp: ["When it doesn't work?"],
  },

  {
    id: "viva-13",
    category: "HTML",
    question: "What are semantic tags?",
    answer:
      "Semantic tags describe meaning of content like header, section, article.",
    followUp: ["Benefits?"],
  },

  {
    id: "viva-14",
    category: "JavaScript",
    question: "What is a Promise?",
    answer: "A Promise represents the result of an asynchronous operation.",
    followUp: ["Promise states?"],
  },

  {
    id: "viva-15",
    category: "MongoDB",
    question: "What is MongoDB?",
    answer:
      "MongoDB is a NoSQL database that stores data in JSON-like documents.",
    followUp: ["SQL vs NoSQL?"],
  },

  {
    id: "viva-16",
    category: "React",
    question: "What is JSX?",
    answer:
      "JSX is syntax extension that allows writing HTML inside JavaScript.",
    followUp: ["Is JSX mandatory?"],
  },

  {
    id: "viva-17",
    category: "CSS",
    question: "What are media queries?",
    answer:
      "Media queries are used to make websites responsive based on screen size.",
    followUp: ["Mobile-first?"],
  },

  {
    id: "viva-18",
    category: "JavaScript",
    question: "What is callback function?",
    answer: "A callback is a function passed as argument and executed later.",
    followUp: ["Callback hell?"],
  },

  {
    id: "viva-19",
    category: "HTML",
    question: "What is <canvas>?",
    answer: "Canvas is used to draw graphics using JavaScript.",
    followUp: ["Where used?"],
  },

  {
    id: "viva-20",
    category: "Express",
    question: "What is middleware in Express?",
    answer: "Middleware functions execute during request-response cycle.",
    followUp: ["Examples?"],
  },

  {
    id: "viva-21",
    category: "JavaScript",
    question: "What is DOM?",
    answer:
      "DOM is a tree representation of HTML that JavaScript can manipulate.",
    followUp: ["How to access DOM?"],
  },

  {
    id: "viva-22",
    category: "CSS",
    question: "Difference between visibility hidden and display none?",
    answer:
      "visibility hidden hides element but keeps space, display none removes it completely.",
    followUp: ["Use cases?"],
  },

  {
    id: "viva-23",
    category: "React",
    question: "Difference between props and state?",
    answer: "Props are passed data, state is managed internally.",
    followUp: ["Immutable props?"],
  },

  {
    id: "viva-24",
    category: "DSA",
    question: "Difference between stack and queue?",
    answer: "Stack is LIFO, queue is FIFO.",
    followUp: ["Real example?"],
  },

  {
    id: "viva-25",
    category: "Tailwind",
    question: "What is Tailwind CSS?",
    answer: "Tailwind is a utility-first CSS framework.",
    followUp: ["Advantages?"],
  },

  {
    id: "viva-26",
    category: "JavaScript",
    question: "Difference between synchronous and asynchronous JS?",
    answer:
      "Synchronous runs line by line, async allows non-blocking operations.",
    followUp: ["Example?"],
  },

  {
    id: "viva-27",
    category: "HTML",
    question: "Purpose of meta tag?",
    answer: "Provides metadata like charset, viewport, SEO info.",
    followUp: ["SEO tags?"],
  },

  {
    id: "viva-28",
    category: "MongoDB",
    question: "What is a document?",
    answer: "A document is a record stored in MongoDB.",
    followUp: ["JSON format?"],
  },

  {
    id: "viva-29",
    category: "React",
    question: "What is useEffect?",
    answer: "Hook used for side effects like API calls.",
    followUp: ["Dependency array?"],
  },

  {
    id: "viva-30",
    category: "CSS",
    question: "Difference between em, rem, and %?",
    answer: "em relative to parent, rem to root, % to parent size.",
    followUp: ["Which is best?"],
  },

{ id: "viva-31", category: "JavaScript", question: "Difference between null and undefined?", answer: "undefined means a variable is declared but not assigned, null is an intentional absence of value.", followUp: ["typeof null?"] },

{ id: "viva-32", category: "CSS", question: "What are pseudo-classes?", answer: "Pseudo-classes define special states like :hover, :active, :focus.", followUp: ["Difference between pseudo-class and pseudo-element?"] },

{ id: "viva-33", category: "HTML", question: "Difference between <section> and <article>?", answer: "Section groups related content, article is independent reusable content.", followUp: ["Example?"] },

{ id: "viva-34", category: "React", question: "What is React Router?", answer: "React Router is used for navigation between pages in a React app.", followUp: ["BrowserRouter vs HashRouter?"] },

{ id: "viva-35", category: "DSA", question: "What is a binary tree?", answer: "A tree data structure where each node has at most two children.", followUp: ["Types of binary trees?"] },

{ id: "viva-36", category: "Node", question: "What is npm?", answer: "npm is Node Package Manager used to install and manage packages.", followUp: ["Difference between dependencies and devDependencies?"] },

{ id: "viva-37", category: "CSS", question: "Difference between relative, absolute, and fixed?", answer: "Relative is based on itself, absolute on nearest positioned parent, fixed on viewport.", followUp: ["Which ignores scroll?"] },

{ id: "viva-38", category: "JavaScript", question: "What are arrow functions?", answer: "Arrow functions are shorter syntax functions without their own this binding.", followUp: ["this behavior?"] },

{ id: "viva-39", category: "MongoDB", question: "Difference between find() and findOne()?", answer: "find() returns multiple documents, findOne() returns first match.", followUp: ["Return type?"] },

{ id: "viva-40", category: "React", question: "What is key in React?", answer: "Key helps React identify elements in lists for efficient updates.", followUp: ["Why index not recommended?"] },

{ id: "viva-41", category: "DSA", question: "Difference between BFS and DFS?", answer: "BFS uses queue (level order), DFS uses stack/recursion (depth first).", followUp: ["Which uses more memory?"] },

{ id: "viva-42", category: "Tailwind", question: "What are utility classes?", answer: "Small reusable classes like p-4, text-center used for styling.", followUp: ["Benefits?"] },

{ id: "viva-43", category: "Express", question: "Difference between app.use() and app.get()?", answer: "app.use handles all methods, app.get handles GET requests only.", followUp: ["Middleware chain?"] },

{ id: "viva-44", category: "JavaScript", question: "Difference between map, filter, reduce?", answer: "map transforms, filter selects, reduce accumulates values.", followUp: ["Example of reduce?"] },

{ id: "viva-45", category: "HTML", question: "Difference between <ol> and <ul>?", answer: "<ol> is ordered list, <ul> is unordered list.", followUp: ["Nested lists?"] },

{ id: "viva-46", category: "CSS", question: "How to declare CSS variables?", answer: "Using --variable-name inside :root and accessed with var().", followUp: ["Benefits?"] },

{ id: "viva-47", category: "Node", question: "CommonJS vs ES Modules?", answer: "CommonJS uses require, ES Modules use import/export.", followUp: ["Default export?"] },

{ id: "viva-48", category: "React", question: "Controlled vs uncontrolled components?", answer: "Controlled uses React state, uncontrolled uses DOM directly.", followUp: ["Which is preferred?"] },

{ id: "viva-49", category: "DSA", question: "What is linked list?", answer: "A linear data structure where elements point to next node.", followUp: ["Types?"] },

{ id: "viva-50", category: "MongoDB", question: "What is collection?", answer: "A collection is a group of documents in MongoDB.", followUp: ["Similar to table?"] },

{ id: "viva-51", category: "JavaScript", question: "What is JSON?", answer: "JSON is a format to store and exchange data.", followUp: ["JSON.parse?"] },

{ id: "viva-52", category: "CSS", question: "What is display property?", answer: "Defines layout behavior like block, inline, flex.", followUp: ["display flex?"] },

{ id: "viva-53", category: "React", question: "What is Redux?", answer: "Redux is a state management library for global state.", followUp: ["Why Redux?"] },

{ id: "viva-54", category: "DSA", question: "What is time complexity?", answer: "Time complexity measures algorithm efficiency.", followUp: ["O(n log n)?"] },

{ id: "viva-55", category: "Express", question: "What is routing?", answer: "Routing defines endpoints and responses.", followUp: ["Dynamic routes?"] },

{ id: "viva-56", category: "HTML", question: "Why alt attribute important?", answer: "Provides text for accessibility and SEO.", followUp: ["Screen readers?"] },

{ id: "viva-57", category: "JavaScript", question: "Event bubbling vs capturing?", answer: "Bubbling goes bottom to top, capturing top to bottom.", followUp: ["stopPropagation?"] },

{ id: "viva-58", category: "CSS", question: "What is inline-block?", answer: "Behaves like inline but allows width/height.", followUp: ["Difference with inline?"] },

{ id: "viva-59", category: "React", question: "What is Fragment?", answer: "Used to group elements without extra DOM node.", followUp: ["<> syntax?"] },

{ id: "viva-60", category: "MongoDB", question: "What is aggregation?", answer: "Aggregation processes data like grouping and filtering.", followUp: ["$match vs $group?"] },

{ id: "viva-61", category: "Node", question: "Event-driven architecture?", answer: "Uses events and callbacks for async operations.", followUp: ["Example?"] },

{ id: "viva-62", category: "DSA", question: "What is graph?", answer: "A collection of nodes and edges.", followUp: ["Real use?"] },

{ id: "viva-63", category: "CSS", question: "Difference between visibility and opacity?", answer: "visibility hides element, opacity makes it transparent.", followUp: ["Which takes space?"] },

{ id: "viva-64", category: "JavaScript", question: "Function declaration vs expression?", answer: "Declaration is hoisted, expression is not.", followUp: ["Example?"] },

{ id: "viva-65", category: "React", question: "useContext vs prop drilling?", answer: "useContext avoids passing props deeply.", followUp: ["When to use?"] },

{ id: "viva-66", category: "Tailwind", question: "What is JIT mode?", answer: "Generates styles on-demand for faster builds.", followUp: ["Advantages?"] },

{ id: "viva-67", category: "Express", question: "req.params vs req.query?", answer: "params from URL path, query from URL query string.", followUp: ["Example?"] },

{ id: "viva-68", category: "MongoDB", question: "What is index?", answer: "Improves query performance.", followUp: ["Trade-offs?"] },

{ id: "viva-69", category: "DSA", question: "Binary search vs linear search?", answer: "Binary search is faster but needs sorted data.", followUp: ["Time complexity?"] },

{ id: "viva-70", category: "HTML", question: "Attributes of form tag?", answer: "action, method, enctype.", followUp: ["POST vs GET?"] },

{ id: "viva-71", category: "CSS", question: "Difference between % and px?", answer: "% is relative, px is fixed.", followUp: ["Responsive design?"] },

{ id: "viva-72", category: "JavaScript", question: "What is async/await?", answer: "Simplifies handling promises.", followUp: ["Error handling?"] },

{ id: "viva-73", category: "React", question: "useMemo vs useCallback?", answer: "useMemo memoizes value, useCallback memoizes function.", followUp: ["Performance?"] },

{ id: "viva-74", category: "Node", question: "Node vs browser JS?", answer: "Node runs server-side, browser JS runs client-side.", followUp: ["DOM access?"] },

{ id: "viva-75", category: "MongoDB", question: "Replication?", answer: "Maintains multiple copies of data for availability.", followUp: ["Why needed?"] },

{ id: "viva-76", category: "DSA", question: "Directed vs undirected graph?", answer: "Directed has direction, undirected does not.", followUp: ["Example?"] },

{ id: "viva-77", category: "Tailwind", question: "Responsive classes?", answer: "sm:, md:, lg: define breakpoints.", followUp: ["Mobile-first?"] },

{ id: "viva-78", category: "Express", question: "CORS?", answer: "Controls cross-origin requests.", followUp: ["Fix CORS?"] },

{ id: "viva-79", category: "JavaScript", question: "localStorage vs sessionStorage?", answer: "local persists, session ends on tab close.", followUp: ["Storage limit?"] },

{ id: "viva-80", category: "HTML", question: "Inline vs block vs inline-block?", answer: "Inline no width, block full width, inline-block mix.", followUp: ["Use case?"] },

{ id: "viva-81", category: "CSS", question: "Flex utilities vs Grid utilities?", answer: "Flex for alignment, grid for layout.", followUp: ["Combine?"] },

{ id: "viva-82", category: "React", question: "What are hooks?", answer: "Functions to use state/lifecycle in functional components.", followUp: ["Rules of hooks?"] },

{ id: "viva-83", category: "MongoDB", question: "ObjectId vs UUID?", answer: "ObjectId is Mongo default, UUID is standard identifier.", followUp: ["Which preferred?"] },

{ id: "viva-84", category: "DSA", question: "Dynamic programming?", answer: "Optimizing recursion using memoization/tabulation.", followUp: ["Example?"] },

{ id: "viva-85", category: "Node", question: "Express vs HTTP module?", answer: "Express is simplified abstraction over HTTP.", followUp: ["Why Express?"] },

{ id: "viva-86", category: "Tailwind", question: "Hover styles in Tailwind?", answer: "Using hover: prefix.", followUp: ["Example?"] },

{ id: "viva-87", category: "JavaScript", question: "Synchronous vs asynchronous middleware?", answer: "Sync runs instantly, async waits for next.", followUp: ["next()?"] },

{ id: "viva-88", category: "React", question: "What is React Fragment?", answer: "Wrap multiple elements without extra DOM node.", followUp: ["<> shorthand?"] },

{ id: "viva-89", category: "MongoDB", question: "$match vs $group?", answer: "$match filters, $group aggregates.", followUp: ["Pipeline?"] },

{ id: "viva-90", category: "DSA", question: "Merge sort vs quick sort?", answer: "Merge is stable O(n log n), quick is faster avg but worst O(n²).", followUp: ["Which used in practice?"] },

{ id: "viva-91", category: "HTML", question: "Use of canvas?", answer: "Used for drawing graphics dynamically.", followUp: ["Alternative?"] },

{ id: "viva-92", category: "CSS", question: "Purpose of CSS?", answer: "Used to style and layout web pages.", followUp: ["Separation of concerns?"] },

{ id: "viva-93", category: "JavaScript", question: "What is event loop?", answer: "Handles async tasks using call stack and queue.", followUp: ["Microtask queue?"] },

{ id: "viva-94", category: "React", question: "Functional vs class components?", answer: "Functional use hooks, class use lifecycle methods.", followUp: ["Which preferred?"] },

{ id: "viva-95", category: "MongoDB", question: "NoSQL vs SQL?", answer: "NoSQL flexible schema, SQL structured tables.", followUp: ["Use cases?"] },

{ id: "viva-96", category: "Express", question: "Serve static files?", answer: "Using express.static middleware.", followUp: ["Example?"] },

{ id: "viva-97", category: "DSA", question: "Hash table?", answer: "Stores key-value pairs for fast lookup.", followUp: ["Collision handling?"] },

{ id: "viva-98", category: "Tailwind", question: "Custom colors in Tailwind?", answer: "Defined in tailwind.config.js.", followUp: ["Extend theme?"] },

{ id: "viva-99", category: "Node", question: "What is Node.js runtime?", answer: "It executes JS outside browser using V8 engine.", followUp: ["Event loop role?"] },

{ id: "viva-100", category: "JavaScript", question: "Difference between async and defer?", answer: "async loads independently, defer executes after HTML parsing.", followUp: ["Which better?"] }

];
