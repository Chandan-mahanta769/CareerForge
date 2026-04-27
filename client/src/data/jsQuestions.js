export const jsQuestions = {
  Beginner: [
    {
      id: "js-b-1",
      title: "Declare a Variable",
      problem: `Declare a variable named x with value 10.`,
      hint: `Use let or var.`,
      answer: `let x = 10;`
    },
    {
      id: "js-b-2",
      title: "Print to Console",
      problem: `Print "Hello World" in console.`,
      hint: `Use console.log.`,
      answer: `console.log("Hello World");`
    },
    {
      id: "js-b-3",
      title: "Add Two Numbers",
      problem: `Add two numbers and print result.`,
      hint: `Use + operator.`,
      answer: `console.log(5 + 3);`
    },
    {
      id: "js-b-4",
      title: "Create Function",
      problem: `Create a function that returns "Hi".`,
      hint: `Use function keyword.`,
      answer: `function greet(){ return "Hi"; }`
    },
    {
      id: "js-b-5",
      title: "If Condition",
      problem: `Check if number is greater than 5.`,
      hint: `Use if.`,
      answer: `if(num > 5){ console.log("Yes"); }`
    },
    {
      id: "js-b-6",
      title: "Array Creation",
      problem: `Create an array of 3 numbers.`,
      hint: `Use [].`,
      answer: `let arr = [1,2,3];`
    },
    {
      id: "js-b-7",
      title: "Access Array",
      problem: `Access first element.`,
      hint: `Use index.`,
      answer: `arr[0];`
    },
    {
      id: "js-b-8",
      title: "Loop Through Array",
      problem: `Loop through array.`,
      hint: `Use for loop.`,
      answer: `for(let i=0;i<arr.length;i++){ console.log(arr[i]); }`
    },
    {
      id: "js-b-9",
      title: "String Length",
      problem: `Find length of string.`,
      hint: `Use .length.`,
      answer: `"hello".length;`
    },
    {
      id: "js-b-10",
      title: "Uppercase String",
      problem: `Convert string to uppercase.`,
      hint: `Use toUpperCase.`,
      answer: `"hello".toUpperCase();`
    },

    // 11–30
    {
      id: "js-b-11",
      title: "Lowercase String",
      problem: `Convert string to lowercase.`,
      hint: `Use toLowerCase.`,
      answer: `"HELLO".toLowerCase();`
    },
    {
      id: "js-b-12",
      title: "Check Type",
      problem: `Check type of variable.`,
      hint: `Use typeof.`,
      answer: `typeof x;`
    },
    {
      id: "js-b-13",
      title: "Push to Array",
      problem: `Add item to array.`,
      hint: `Use push.`,
      answer: `arr.push(4);`
    },
    {
      id: "js-b-14",
      title: "Pop from Array",
      problem: `Remove last item.`,
      hint: `Use pop.`,
      answer: `arr.pop();`
    },
    {
      id: "js-b-15",
      title: "Object Creation",
      problem: `Create object with name.`,
      hint: `Use {}.`,
      answer: `let obj = { name: "John" };`
    },
    {
      id: "js-b-16",
      title: "Access Object",
      problem: `Access object property.`,
      hint: `Use dot notation.`,
      answer: `obj.name;`
    },
    {
      id: "js-b-17",
      title: "Arrow Function",
      problem: `Create arrow function.`,
      hint: `Use =>.`,
      answer: `const fn = () => "Hi";`
    },
    {
      id: "js-b-18",
      title: "Template String",
      problem: `Use template literal.`,
      hint: `Use backticks.`,
      answer:  `Hello ${name}` 
    },
    {
      id: "js-b-19",
      title: "Parse Int",
      problem: `Convert string to number.`,
      hint: `Use parseInt.`,
      answer: `parseInt("10");`
    },
    {
      id: "js-b-20",
      title: "Math Random",
      problem: `Generate random number.`,
      hint: `Use Math.random.`,
      answer: `Math.random();`
    },
    {
      id: "js-b-21",
      title: "Boolean Value",
      problem: `Create boolean.`,
      hint: `Use true/false.`,
      answer: `let flag = true;`
    },
    {
      id: "js-b-22",
      title: "Switch Case",
      problem: `Use switch.`,
      hint: `Use switch.`,
      answer: `switch(x){ case 1: break; }`
    },
    {
      id: "js-b-23",
      title: "ForEach",
      problem: `Use forEach.`,
      hint: `Use array.forEach.`,
      answer: `arr.forEach(x => console.log(x));`
    },
    {
      id: "js-b-24",
      title: "Concat Arrays",
      problem: `Merge arrays.`,
      hint: `Use concat.`,
      answer: `arr1.concat(arr2);`
    },
    {
      id: "js-b-25",
      title: "Slice Array",
      problem: `Slice array.`,
      hint: `Use slice.`,
      answer: `arr.slice(1,3);`
    },
    {
      id: "js-b-26",
      title: "Find Element",
      problem: `Find item.`,
      hint: `Use find.`,
      answer: `arr.find(x=>x>2);`
    },
    {
      id: "js-b-27",
      title: "Filter Array",
      problem: `Filter items.`,
      hint: `Use filter.`,
      answer: `arr.filter(x=>x>2);`
    },
    {
      id: "js-b-28",
      title: "Map Array",
      problem: `Transform array.`,
      hint: `Use map.`,
      answer: `arr.map(x=>x*2);`
    },
    {
      id: "js-b-29",
      title: "Reduce Array",
      problem: `Sum array.`,
      hint: `Use reduce.`,
      answer: `arr.reduce((a,b)=>a+b,0);`
    },
    {
      id: "js-b-30",
      title: "Date Object",
      problem: `Get current date.`,
      hint: `Use Date.`,
      answer: `new Date();`
    }
  ],
  
  Intermediate: [
    {
      id: "js-i-1",
      title: "Create a Promise",
      problem: `Create a basic Promise.`,
      hint: `Use new Promise.`,
      answer: `new Promise((resolve, reject) => {});`
    },
    {
      id: "js-i-2",
      title: "Resolve Promise",
      problem: `Resolve a Promise with value.`,
      hint: `Use resolve.`,
      answer: `new Promise(res => res("done"));`
    },
    {
      id: "js-i-3",
      title: "Async Function",
      problem: `Create async function.`,
      hint: `Use async keyword.`,
      answer: `async function test(){ return "ok"; }`
    },
    {
      id: "js-i-4",
      title: "Await Fetch",
      problem: `Fetch data using await.`,
      hint: `Use await fetch.`,
      answer: `let res = await fetch("url");`
    },
    {
      id: "js-i-5",
      title: "Try Catch",
      problem: `Handle error using try catch.`,
      hint: `Use try...catch.`,
      answer: `try{} catch(e){ console.log(e); }`
    },
    {
      id: "js-i-6",
      title: "Set Timeout",
      problem: `Run code after delay.`,
      hint: `Use setTimeout.`,
      answer: `setTimeout(()=>{},1000);`
    },
    {
      id: "js-i-7",
      title: "Set Interval",
      problem: `Run code repeatedly.`,
      hint: `Use setInterval.`,
      answer: `setInterval(()=>{},1000);`
    },
    {
      id: "js-i-8",
      title: "Clear Interval",
      problem: `Stop interval.`,
      hint: `Use clearInterval.`,
      answer: `clearInterval(id);`
    },
    {
      id: "js-i-9",
      title: "Event Listener",
      problem: `Add click event.`,
      hint: `Use addEventListener.`,
      answer: `btn.addEventListener("click",fn);`
    },
    {
      id: "js-i-10",
      title: "Prevent Default",
      problem: `Prevent form submit.`,
      hint: `Use preventDefault.`,
      answer: `e.preventDefault();`
    },
    {
      id: "js-i-11",
      title: "Destructuring Array",
      problem: `Extract values from array.`,
      hint: `Use [].`,
      answer: `let [a,b]=[1,2];`
    },
    {
      id: "js-i-12",
      title: "Destructuring Object",
      problem: `Extract object values.`,
      hint: `Use {}.`,
      answer: `let {name}=obj;`
    },
    {
      id: "js-i-13",
      title: "Spread Operator",
      problem: `Copy array.`,
      hint: `Use ...`,
      answer: `let newArr=[...arr];`
    },
    {
      id: "js-i-14",
      title: "Rest Parameter",
      problem: `Collect arguments.`,
      hint: `Use ...`,
      answer: `function f(...args){}` 
    },
    {
      id: "js-i-15",
      title: "Default Parameter",
      problem: `Set default value.`,
      hint: `Use =`,
      answer: `function f(x=10){}` 
    },
    {
      id: "js-i-16",
      title: "Template String",
      problem: `Use dynamic string.`,
      hint: `Use backticks.`,
      answer:  `Hello ${name}` 
    },
    {
      id: "js-i-17",
      title: "Object Keys",
      problem: `Get keys.`,
      hint: `Use Object.keys.`,
      answer: `Object.keys(obj);`
    },
    {
      id: "js-i-18",
      title: "Object Values",
      problem: `Get values.`,
      hint: `Use Object.values.`,
      answer: `Object.values(obj);`
    },
    {
      id: "js-i-19",
      title: "JSON Parse",
      problem: `Convert JSON string.`,
      hint: `Use JSON.parse.`,
      answer: `JSON.parse(str);`
    },
    {
      id: "js-i-20",
      title: "JSON Stringify",
      problem: `Convert object to string.`,
      hint: `Use JSON.stringify.`,
      answer: `JSON.stringify(obj);`
    },
    {
      id: "js-i-21",
      title: "Local Storage Set",
      problem: `Save data.`,
      hint: `Use localStorage.`,
      answer: `localStorage.setItem("key","val");`
    },
    {
      id: "js-i-22",
      title: "Local Storage Get",
      problem: `Retrieve data.`,
      hint: `Use getItem.`,
      answer: `localStorage.getItem("key");`
    },
    {
      id: "js-i-23",
      title: "Class Syntax",
      problem: `Create class.`,
      hint: `Use class.`,
      answer: `class A{}` 
    },
    {
      id: "js-i-24",
      title: "Constructor",
      problem: `Add constructor.`,
      hint: `Use constructor.`,
      answer: `constructor(){}` 
    },
    {
      id: "js-i-25",
      title: "Inheritance",
      problem: `Extend class.`,
      hint: `Use extends.`,
      answer: `class B extends A{}` 
    },
    {
      id: "js-i-26",
      title: "Fetch API",
      problem: `Call API.`,
      hint: `Use fetch.`,
      answer: `fetch("url");`
    },
    {
      id: "js-i-27",
      title: "Arrow Function Map",
      problem: `Use map.`,
      hint: `Use arrow.`,
      answer: `arr.map(x=>x*2);`
    },
    {
      id: "js-i-28",
      title: "Filter Method",
      problem: `Filter values.`,
      hint: `Use filter.`,
      answer: `arr.filter(x=>x>2);`
    },
    {
      id: "js-i-29",
      title: "Reduce Sum",
      problem: `Sum values.`,
      hint: `Use reduce.`,
      answer: `arr.reduce((a,b)=>a+b,0);`
    },
    {
      id: "js-i-30",
      title: "Debounce Function",
      problem: `Create debounce.`,
      hint: `Use setTimeout.`,
      answer: `function debounce(fn,d){let t;return()=>{clearTimeout(t);t=setTimeout(fn,d)}}`
    }
  ],

  Advanced: [
    {
      id: "js-a-1",
      title: "Closure",
      problem: `Create closure.`,
      hint: `Use nested function.`,
      answer: `function outer(){let x=1;return ()=>x}`
    },
    {
      id: "js-a-2",
      title: "Currying",
      problem: `Create curried function.`,
      hint: `Return function.`,
      answer: `const add=a=>b=>a+b;`
    },
    {
      id: "js-a-3",
      title: "Call Method",
      problem: `Use call.`,
      hint: `Use call.`,
      answer: `fn.call(obj);`
    },
    {
      id: "js-a-4",
      title: "Apply Method",
      problem: `Use apply.`,
      hint: `Use apply.`,
      answer: `fn.apply(obj);`
    },
    {
      id: "js-a-5",
      title: "Bind Method",
      problem: `Bind function.`,
      hint: `Use bind.`,
      answer: `fn.bind(obj);`
    },
    {
      id: "js-a-6",
      title: "Prototype",
      problem: `Add prototype.`,
      hint: `Use prototype.`,
      answer: `A.prototype.x=1;`
    },
    {
      id: "js-a-7",
      title: "Event Delegation",
      problem: `Use delegation.`,
      hint: `Use parent listener.`,
      answer: `parent.addEventListener("click",fn);`
    },
    {
      id: "js-a-8",
      title: "Throttle Function",
      problem: `Create throttle.`,
      hint: `Use timer.`,
      answer: `function throttle(fn,d){let t;return()=>{if(!t){fn();t=setTimeout(()=>t=null,d)}}}`
    },
    {
      id: "js-a-9",
      title: "Deep Copy",
      problem: `Clone object.`,
      hint: `Use JSON.`,
      answer: `JSON.parse(JSON.stringify(obj));`
    },
    {
      id: "js-a-10",
      title: "Shallow Copy",
      problem: `Copy object.`,
      hint: `Use spread.`,
      answer: `{...obj}`
    },
    {
      id: "js-a-11",
      title: "Set Data Structure",
      problem: `Create set.`,
      hint: `Use Set.`,
      answer: `new Set([1,2,3]);`
    },
    {
      id: "js-a-12",
      title: "Map Data Structure",
      problem: `Create map.`,
      hint: `Use Map.`,
      answer: `new Map();`
    },
    {
      id: "js-a-13",
      title: "WeakMap",
      problem: `Use WeakMap.`,
      hint: `Use WeakMap.`,
      answer: `new WeakMap();`
    },
    {
      id: "js-a-14",
      title: "WeakSet",
      problem: `Use WeakSet.`,
      hint: `Use WeakSet.`,
      answer: `new WeakSet();`
    },
    {
      id: "js-a-15",
      title: "Symbol",
      problem: `Create symbol.`,
      hint: `Use Symbol.`,
      answer: `Symbol("id");`
    },
    {
      id: "js-a-16",
      title: "Generator Function",
      problem: `Create generator.`,
      hint: `Use *.`,
      answer: `function* gen(){ yield 1; }`
    },
    {
      id: "js-a-17",
      title: "Iterator",
      problem: `Use iterator.`,
      hint: `Use next.`,
      answer: `gen().next();`
    },
    {
      id: "js-a-18",
      title: "Proxy",
      problem: `Create proxy.`,
      hint: `Use Proxy.`,
      answer: `new Proxy(obj,{});`
    },
    {
      id: "js-a-19",
      title: "Reflect API",
      problem: `Use Reflect.`,
      hint: `Use Reflect.`,
      answer: `Reflect.get(obj,"x");`
    },
    {
      id: "js-a-20",
      title: "Optional Chaining",
      problem: `Access safely.`,
      hint: `Use ?.`,
      answer: `obj?.a?.b;`
    },
    {
      id: "js-a-21",
      title: "Nullish Coalescing",
      problem: `Use ?? operator.`,
      hint: `Use ??.`,
      answer: `val ?? "default";`
    },
    {
      id: "js-a-22",
      title: "Dynamic Import",
      problem: `Import module dynamically.`,
      hint: `Use import().`,
      answer: `import("./file.js");`
    },
    {
      id: "js-a-23",
      title: "Event Loop",
      problem: `Explain async order.`,
      hint: `Call stack + queue.`,
      answer: `console.log("event loop");`
    },
    {
      id: "js-a-24",
      title: "Microtask Queue",
      problem: `Use Promise then.`,
      hint: `Microtask.`,
      answer: `Promise.resolve().then(()=>{});`
    },
    {
      id: "js-a-25",
      title: "Macro Task",
      problem: `Use setTimeout.`,
      hint: `Macro task.`,
      answer: `setTimeout(()=>{},0);`
    },
    {
      id: "js-a-26",
      title: "Memoization",
      problem: `Cache function.`,
      hint: `Use object.`,
      answer: `const memo={};`
    },
    {
      id: "js-a-27",
      title: "Currying Sum",
      problem: `Sum with curry.`,
      hint: `Return function.`,
      answer: `a=>b=>c=>a+b+c`
    },
    {
      id: "js-a-28",
      title: "Flatten Array",
      problem: `Flatten nested array.`,
      hint: `Use flat.`,
      answer: `arr.flat();`
    },
    {
      id: "js-a-29",
      title: "Promise All",
      problem: `Run multiple promises.`,
      hint: `Use Promise.all.`,
      answer: `Promise.all([p1,p2]);`
    },
    {
      id: "js-a-30",
      title: "Promise Race",
      problem: `Race promises.`,
      hint: `Use race.`,
      answer: `Promise.race([p1,p2]);`
    }
  ]
};