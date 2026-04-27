export const reactQuestions = {
  Beginner: [
    {
      id: "react-b-1",
      title: "Create React Component",
      problem: `Create a functional React component.`,
      hint: `Use function or arrow function.`,
      answer: `function App(){ return <h1>Hello</h1>; }`
    },
    {
      id: "react-b-2",
      title: "JSX Syntax",
      problem: `Return JSX from component.`,
      hint: `Use return.`,
      answer: `return <div>Hello</div>;`
    },
    {
      id: "react-b-3",
      title: "Props Usage",
      problem: `Pass props to component.`,
      hint: `Use props.`,
      answer: `function A({name}){ return <p>{name}</p>; }`
    },
    {
      id: "react-b-4",
      title: "Use State",
      problem: `Create state.`,
      hint: `Use useState.`,
      answer: `const [x,setX]=useState(0);`
    },
    {
      id: "react-b-5",
      title: "Button Click",
      problem: `Handle click event.`,
      hint: `Use onClick.`,
      answer: `<button onClick={()=>setX(x+1)}>Click</button>`
    },
    {
      id: "react-b-6",
      title: "Conditional Rendering",
      problem: `Render conditionally.`,
      hint: `Use &&.`,
      answer: `{x>0 && <p>Yes</p>}`
    },
    {
      id: "react-b-7",
      title: "List Rendering",
      problem: `Render list.`,
      hint: `Use map.`,
      answer: `{arr.map(i=><li key={i}>{i}</li>)}`
    },
    {
      id: "react-b-8",
      title: "Key Prop",
      problem: `Add key in list.`,
      hint: `Use key.`,
      answer: `<li key={id}>Item</li>`
    },
    {
      id: "react-b-9",
      title: "Input State",
      problem: `Handle input.`,
      hint: `Use onChange.`,
      answer: `<input onChange={e=>setX(e.target.value)} />`
    },
    {
      id: "react-b-10",
      title: "Inline Style",
      problem: `Apply inline style.`,
      hint: `Use object.`,
      answer: `<div style={{color:"red"}}></div>`
    },

    // 11–30
    {
      id: "react-b-11",
      title: "Fragment",
      problem: `Use fragment.`,
      hint: `Use <>`,
      answer: `<>Hello</>`
    },
    {
      id: "react-b-12",
      title: "Default Props",
      problem: `Set default props.`,
      hint: `Use default.`,
      answer: `Component.defaultProps={name:"A"}`
    },
    {
      id: "react-b-13",
      title: "Event Handling",
      problem: `Handle events.`,
      hint: `Use functions.`,
      answer: `<button onClick={fn}></button>`
    },
    {
      id: "react-b-14",
      title: "Use Effect",
      problem: `Run side effect.`,
      hint: `Use useEffect.`,
      answer: `useEffect(()=>{},[]);`
    },
    {
      id: "react-b-15",
      title: "Component Import",
      problem: `Import component.`,
      hint: `Use import.`,
      answer: `import A from "./A";`
    },
    {
      id: "react-b-16",
      title: "Export Component",
      problem: `Export component.`,
      hint: `Use export default.`,
      answer: `export default App;`
    },
    {
      id: "react-b-17",
      title: "CSS Class",
      problem: `Apply class.`,
      hint: `Use className.`,
      answer: `<div className="box"></div>`
    },
    {
      id: "react-b-18",
      title: "Boolean Render",
      problem: `Render boolean.`,
      hint: `Use ternary.`,
      answer: `{x? "Yes":"No"}`
    },
    {
      id: "react-b-19",
      title: "Form Submit",
      problem: `Handle submit.`,
      hint: `Use preventDefault.`,
      answer: `<form onSubmit={e=>e.preventDefault()}></form>`
    },
    {
      id: "react-b-20",
      title: "Image Render",
      problem: `Render image.`,
      hint: `Use img.`,
      answer: `<img src="img.jpg" />`
    },
    {
      id: "react-b-21",
      title: "Multiple State",
      problem: `Use multiple states.`,
      hint: `Use multiple useState.`,
      answer: `const [a,setA]=useState(0);`
    },
    {
      id: "react-b-22",
      title: "Dynamic Class",
      problem: `Change class.`,
      hint: `Use ternary.`,
      answer: `<div className={x?"a":"b"}></div>`
    },
    {
      id: "react-b-23",
      title: "Map Index",
      problem: `Use index.`,
      hint: `Use map.`,
      answer: `{arr.map((v,i)=><p key={i}>{v}</p>)}`
    },
    {
      id: "react-b-24",
      title: "State Update",
      problem: `Update state.`,
      hint: `Use setState.`,
      answer: `setX(prev=>prev+1);`
    },
    {
      id: "react-b-25",
      title: "Conditional Class",
      problem: `Apply class conditionally.`,
      hint: `Use ternary.`,
      answer: `<div className={x?"red":""}></div>`
    },
    {
      id: "react-b-26",
      title: "Component Nesting",
      problem: `Nest component.`,
      hint: `Use inside.`,
      answer: `<Parent><Child/></Parent>`
    },
    {
      id: "react-b-27",
      title: "Console Log",
      problem: `Log inside component.`,
      hint: `Use console.log.`,
      answer: `console.log("render");`
    },
    {
      id: "react-b-28",
      title: "State Boolean",
      problem: `Toggle state.`,
      hint: `Use !.`,
      answer: `setX(!x);`
    },
    {
      id: "react-b-29",
      title: "Multiple Elements",
      problem: `Return multiple.`,
      hint: `Use fragment.`,
      answer: `<><h1/><p/></>`
    },
    {
      id: "react-b-30",
      title: "Component Props",
      problem: `Use props.`,
      hint: `Pass props.`,
      answer: `<Comp name="A"/>`
    }
  ],
  
  Intermediate: [
    {
      id: "react-i-1",
      title: "Create Custom Hook",
      problem: `Create a custom hook that returns a value.`,
      hint: `Use function starting with use.`,
      answer: `function useValue(){ return 10; }`
    },
    {
      id: "react-i-2",
      title: "UseRef Hook",
      problem: `Create a reference using useRef.`,
      hint: `Use useRef.`,
      answer: `const ref = useRef(null);`
    },
    {
      id: "react-i-3",
      title: "Access DOM with Ref",
      problem: `Access input DOM element.`,
      hint: `Use ref.current.`,
      answer: `ref.current.focus();`
    },
    {
      id: "react-i-4",
      title: "Forward Ref",
      problem: `Forward ref to child component.`,
      hint: `Use React.forwardRef.`,
      answer: `const Comp = React.forwardRef((props, ref) => <input ref={ref} />);`
    },
    {
      id: "react-i-5",
      title: "Memo Component",
      problem: `Prevent unnecessary re-renders.`,
      hint: `Use React.memo.`,
      answer: `export default React.memo(Component);`
    },
    {
      id: "react-i-6",
      title: "UseCallback Hook",
      problem: `Memoize a function.`,
      hint: `Use useCallback.`,
      answer: `const fn = useCallback(() => {}, []);`
    },
    {
      id: "react-i-7",
      title: "UseMemo Hook",
      problem: `Memoize a value.`,
      hint: `Use useMemo.`,
      answer: `const val = useMemo(() => 10, []);`
    },
    {
      id: "react-i-8",
      title: "Context API Create",
      problem: `Create a context.`,
      hint: `Use createContext.`,
      answer: `const MyContext = React.createContext();`
    },
    {
      id: "react-i-9",
      title: "Context Provider",
      problem: `Provide context value.`,
      hint: `Use Provider.`,
      answer: `<MyContext.Provider value={data}></MyContext.Provider>`
    },
    {
      id: "react-i-10",
      title: "Use Context",
      problem: `Consume context.`,
      hint: `Use useContext.`,
      answer: `const data = useContext(MyContext);`
    },
    {
      id: "react-i-11",
      title: "Controlled Input",
      problem: `Create controlled input.`,
      hint: `Use state.`,
      answer: `<input value={val} onChange={e=>setVal(e.target.value)} />`
    },
    {
      id: "react-i-12",
      title: "Uncontrolled Input",
      problem: `Use ref for input.`,
      hint: `Use ref.`,
      answer: `<input ref={ref} />`
    },
    {
      id: "react-i-13",
      title: "Form Validation",
      problem: `Validate form input.`,
      hint: `Use state.`,
      answer: `if(val===""){ alert("Required"); }`
    },
    {
      id: "react-i-14",
      title: "Dynamic List",
      problem: `Render dynamic list.`,
      hint: `Use map.`,
      answer: `{list.map(i=><li key={i}>{i}</li>)}`
    },
    {
      id: "react-i-15",
      title: "Filter List",
      problem: `Filter list items.`,
      hint: `Use filter.`,
      answer: `{list.filter(x=>x>2).map(i=><p>{i}</p>)}`
    },
    {
      id: "react-i-16",
      title: "Conditional Component",
      problem: `Render component conditionally.`,
      hint: `Use ternary.`,
      answer: `{show ? <A/> : <B/>}`
    },
    {
      id: "react-i-17",
      title: "Event Propagation",
      problem: `Stop event propagation.`,
      hint: `Use stopPropagation.`,
      answer: `e.stopPropagation();`
    },
    {
      id: "react-i-18",
      title: "Fetch Data",
      problem: `Fetch API data.`,
      hint: `Use fetch.`,
      answer: `useEffect(()=>{ fetch("url"); },[]);`
    },
    {
      id: "react-i-19",
      title: "Loading State",
      problem: `Handle loading.`,
      hint: `Use state.`,
      answer: `const [loading,setLoading]=useState(true);`
    },
    {
      id: "react-i-20",
      title: "Error Handling",
      problem: `Handle API error.`,
      hint: `Use try catch.`,
      answer: `try{}catch(e){}` 
    },
    {
      id: "react-i-21",
      title: "Component Composition",
      problem: `Use children.`,
      hint: `Use props.children.`,
      answer: `<div>{props.children}</div>`
    },
    {
      id: "react-i-22",
      title: "Dynamic Class",
      problem: `Apply class conditionally.`,
      hint: `Use ternary.`,
      answer: `<div className={active?"on":"off"}></div>`
    },
    {
      id: "react-i-23",
      title: "Multiple Effects",
      problem: `Use multiple useEffect.`,
      hint: `Use multiple calls.`,
      answer: `useEffect(()=>{},[]); useEffect(()=>{},[x]);`
    },
    {
      id: "react-i-24",
      title: "Timer with Effect",
      problem: `Create timer.`,
      hint: `Use setInterval.`,
      answer: `useEffect(()=>{setInterval(()=>{},1000)},[]);`
    },
    {
      id: "react-i-25",
      title: "Cleanup Effect",
      problem: `Clean up effect.`,
      hint: `Return function.`,
      answer: `useEffect(()=>{return ()=>{}},[]);`
    },
    {
      id: "react-i-26",
      title: "Debounce Input",
      problem: `Debounce input.`,
      hint: `Use timeout.`,
      answer: `setTimeout(()=>{},300);`
    },
    {
      id: "react-i-27",
      title: "Props Drilling",
      problem: `Pass props deeply.`,
      hint: `Pass props.`,
      answer: `<A data={data}/>`
    },
    {
      id: "react-i-28",
      title: "Prevent Re-render",
      problem: `Avoid re-render.`,
      hint: `Use memo.`,
      answer: `React.memo(Component)`
    },
    {
      id: "react-i-29",
      title: "State Lifting",
      problem: `Lift state up.`,
      hint: `Move to parent.`,
      answer: `const [x,setX]=useState();`
    },
    {
      id: "react-i-30",
      title: "Context Optimization",
      problem: `Optimize context.`,
      hint: `Use memo.`,
      answer: `useMemo(()=>value,[deps]);`
    }
  ],

  Advanced: [
    {
      id: "react-a-1",
      title: "Higher Order Component",
      problem: `Create HOC.`,
      hint: `Return function.`,
      answer: `const HOC=(C)=>()=> <C/>;`
    },
    {
      id: "react-a-2",
      title: "Lazy Loading",
      problem: `Load component lazily.`,
      hint: `Use React.lazy.`,
      answer: `const A=React.lazy(()=>import("./A"));`
    },
    {
      id: "react-a-3",
      title: "Suspense Usage",
      problem: `Wrap lazy component.`,
      hint: `Use Suspense.`,
      answer: `<Suspense fallback="Loading"><A/></Suspense>`
    },
    {
      id: "react-a-4",
      title: "Error Boundary",
      problem: `Catch errors.`,
      hint: `Use componentDidCatch.`,
      answer: `class E extends React.Component{componentDidCatch(){}}`
    },
    {
      id: "react-a-5",
      title: "Portal",
      problem: `Render outside DOM.`,
      hint: `Use createPortal.`,
      answer: `ReactDOM.createPortal(el,root);`
    },
    {
      id: "react-a-6",
      title: "Profiler",
      problem: `Measure performance.`,
      hint: `Use Profiler.`,
      answer: `<Profiler id="App" onRender={()=>{}}></Profiler>`
    },
    {
      id: "react-a-7",
      title: "Batch Updates",
      problem: `Batch state updates.`,
      hint: `React batches.`,
      answer: `setX(1); setY(2);`
    },
    {
      id: "react-a-8",
      title: "Custom Render Hook",
      problem: `Create render hook.`,
      hint: `Return JSX.`,
      answer: `function useRender(){ return <div/> }`
    },
    {
      id: "react-a-9",
      title: "Controlled Form",
      problem: `Full form control.`,
      hint: `Use state.`,
      answer: `<form onSubmit={fn}></form>`
    },
    {
      id: "react-a-10",
      title: "Server Side Rendering",
      problem: `Render on server.`,
      hint: `Use SSR.`,
      answer: `renderToString(<App/>);`
    },
    {
      id: "react-a-11",
      title: "Hydration",
      problem: `Hydrate app.`,
      hint: `Use hydrate.`,
      answer: `ReactDOM.hydrate(<App/>,root);`
    },
    {
      id: "react-a-12",
      title: "Strict Mode",
      problem: `Enable strict mode.`,
      hint: `Use StrictMode.`,
      answer: `<React.StrictMode></React.StrictMode>`
    },
    {
      id: "react-a-13",
      title: "Concurrent Features",
      problem: `Enable concurrent.`,
      hint: `Use createRoot.`,
      answer: `createRoot(root).render(<App/>);`
    },
    {
      id: "react-a-14",
      title: "Transition",
      problem: `Use transition.`,
      hint: `Use startTransition.`,
      answer: `startTransition(()=>{});`
    },
    {
      id: "react-a-15",
      title: "Deferred Value",
      problem: `Delay value.`,
      hint: `Use useDeferredValue.`,
      answer: `useDeferredValue(val);`
    },
    {
      id: "react-a-16",
      title: "Imperative Handle",
      problem: `Expose methods.`,
      hint: `Use useImperativeHandle.`,
      answer: `useImperativeHandle(ref,()=>({}))`
    },
    {
      id: "react-a-17",
      title: "Custom Hook Logic",
      problem: `Share logic.`,
      hint: `Use hooks.`,
      answer: `function useLogic(){}` 
    },
    {
      id: "react-a-18",
      title: "Render Props",
      problem: `Use render props.`,
      hint: `Pass function.`,
      answer: `<Comp render={()=>{}}/>`
    },
    {
      id: "react-a-19",
      title: "Compound Components",
      problem: `Build compound.`,
      hint: `Use children.`,
      answer: `<Parent><Child/></Parent>`
    },
    {
      id: "react-a-20",
      title: "State Machine",
      problem: `Manage states.`,
      hint: `Use reducer.`,
      answer: `useReducer(reducer,init);`
    },
    {
      id: "react-a-21",
      title: "Performance Optimization",
      problem: `Optimize render.`,
      hint: `Use memo.`,
      answer: `useMemo(()=>{},[]);`
    },
    {
      id: "react-a-22",
      title: "Code Splitting",
      problem: `Split bundles.`,
      hint: `Use lazy.`,
      answer: `React.lazy(()=>import("./A"));`
    },
    {
      id: "react-a-23",
      title: "React DevTools",
      problem: `Debug app.`,
      hint: `Use DevTools.`,
      answer: `console.log("debug");`
    },
    {
      id: "react-a-24",
      title: "Testing Component",
      problem: `Test component.`,
      hint: `Use testing lib.`,
      answer: `render(<App/>);`
    },
    {
      id: "react-a-25",
      title: "Hook Rules",
      problem: `Follow rules.`,
      hint: `Top level only.`,
      answer: `useState();`
    },
    {
      id: "react-a-26",
      title: "Immutable State",
      problem: `Update immutably.`,
      hint: `Use spread.`,
      answer: `setX({...x});`
    },
    {
      id: "react-a-27",
      title: "Context Performance",
      problem: `Avoid re-renders.`,
      hint: `Use memo.`,
      answer: `useMemo(()=>value,[deps]);`
    },
    {
      id: "react-a-28",
      title: "Suspense Data",
      problem: `Use suspense data.`,
      hint: `Throw promise.`,
      answer: `throw promise;`
    },
    {
      id: "react-a-29",
      title: "Custom Renderer",
      problem: `Build renderer.`,
      hint: `Advanced.`,
      answer: `console.log("renderer");`
    },
    {
      id: "react-a-30",
      title: "Fiber Concept",
      problem: `Explain fiber.`,
      hint: `Reconciliation.`,
      answer: `console.log("fiber");`
    }
  ]
};