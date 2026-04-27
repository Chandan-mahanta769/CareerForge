export const nodeQuestions = {
  Beginner: [
    {
      id: "node-b-1",
      title: "Create Basic Server",
      problem: `Create a simple Node.js server.`,
      hint: `Use http module.`,
      answer: `const http=require("http"); http.createServer((req,res)=>res.end("Hello")).listen(3000);`
    },
    {
      id: "node-b-2",
      title: "Require Module",
      problem: `Import a module.`,
      hint: `Use require.`,
      answer: `const fs=require("fs");`
    },
    {
      id: "node-b-3",
      title: "Read File",
      problem: `Read a file.`,
      hint: `Use fs.readFile.`,
      answer: `fs.readFile("file.txt","utf8",(e,d)=>console.log(d));`
    },
    {
      id: "node-b-4",
      title: "Write File",
      problem: `Write into file.`,
      hint: `Use writeFile.`,
      answer: `fs.writeFile("file.txt","Hello",()=>{});`
    },
    {
      id: "node-b-5",
      title: "Console Log",
      problem: `Print in console.`,
      hint: `Use console.log.`,
      answer: `console.log("Hello");`
    },
    {
      id: "node-b-6",
      title: "Create JSON",
      problem: `Create JSON object.`,
      hint: `Use {}.`,
      answer: `let obj={name:"Node"};`
    },
    {
      id: "node-b-7",
      title: "Path Module",
      problem: `Use path module.`,
      hint: `Use require path.`,
      answer: `const path=require("path");`
    },
    {
      id: "node-b-8",
      title: "Join Path",
      problem: `Join file paths.`,
      hint: `Use path.join.`,
      answer: `path.join(__dirname,"file.txt");`
    },
    {
      id: "node-b-9",
      title: "Process Args",
      problem: `Get command args.`,
      hint: `Use process.argv.`,
      answer: `process.argv;`
    },
    {
      id: "node-b-10",
      title: "Set Timeout",
      problem: `Delay execution.`,
      hint: `Use setTimeout.`,
      answer: `setTimeout(()=>console.log("Hi"),1000);`
    },
    {
      id: "node-b-11",
      title: "Export Module",
      problem: `Export function.`,
      hint: `Use module.exports.`,
      answer: `module.exports = fn;`
    },
    {
      id: "node-b-12",
      title: "Import Custom File",
      problem: `Import custom module.`,
      hint: `Use require.`,
      answer: `require("./file");`
    },
    {
      id: "node-b-13",
      title: "Create Folder",
      problem: `Create directory.`,
      hint: `Use fs.mkdir.`,
      answer: `fs.mkdir("test",()=>{});`
    },
    {
      id: "node-b-14",
      title: "Delete File",
      problem: `Delete file.`,
      hint: `Use unlink.`,
      answer: `fs.unlink("file.txt",()=>{});`
    },
    {
      id: "node-b-15",
      title: "Environment Variable",
      problem: `Access env variable.`,
      hint: `Use process.env.`,
      answer: `process.env.PORT;`
    },
    {
    id: "node-b-16",
    title: "Append File",
    problem: `Append data to an existing file.`,
    hint: `Use fs.appendFile.`,
    answer: `fs.appendFile("file.txt","Hello",()=>{});`
  },
  {
    id: "node-b-17",
    title: "Check File Exists",
    problem: `Check if file exists.`,
    hint: `Use fs.existsSync.`,
    answer: `fs.existsSync("file.txt");`
  },
  {
    id: "node-b-18",
    title: "Get File Stats",
    problem: `Get file information.`,
    hint: `Use fs.stat.`,
    answer: `fs.stat("file.txt",(err,stats)=>console.log(stats));`
  }
  ],

  Intermediate: [
    {
      id: "node-i-1",
      title: "Create Express App",
      problem: `Create Express server.`,
      hint: `Use express.`,
      answer: `const app=require("express")();`
    },
    {
      id: "node-i-2",
      title: "Route GET",
      problem: `Create GET route.`,
      hint: `Use app.get.`,
      answer: `app.get("/",(req,res)=>res.send("Hi"));`
    },
    {
      id: "node-i-3",
      title: "Route POST",
      problem: `Create POST route.`,
      hint: `Use app.post.`,
      answer: `app.post("/data",(req,res)=>res.send("Done"));`
    },
    {
      id: "node-i-4",
      title: "Middleware",
      problem: `Create middleware.`,
      hint: `Use next.`,
      answer: `app.use((req,res,next)=>{next();});`
    },
    {
      id: "node-i-5",
      title: "JSON Response",
      problem: `Send JSON.`,
      hint: `Use res.json.`,
      answer: `res.json({msg:"ok"});`
    },
    {
      id: "node-i-6",
      title: "Params",
      problem: `Use route params.`,
      hint: `Use req.params.`,
      answer: `req.params.id;`
    },
    {
      id: "node-i-7",
      title: "Query Params",
      problem: `Use query.`,
      hint: `Use req.query.`,
      answer: `req.query.name;`
    },
    {
      id: "node-i-8",
      title: "Body Parser",
      problem: `Parse body.`,
      hint: `Use express.json.`,
      answer: `app.use(express.json());`
    },
    {
      id: "node-i-9",
      title: "Static Files",
      problem: `Serve static files.`,
      hint: `Use express.static.`,
      answer: `app.use(express.static("public"));`
    },
    {
      id: "node-i-10",
      title: "Error Handling",
      problem: `Handle error.`,
      hint: `Use middleware.`,
      answer: `app.use((err,req,res,next)=>res.send(err));`
    },
    {
      id: "node-i-11",
      title: "Async Route",
      problem: `Use async route.`,
      hint: `Use async.`,
      answer: `app.get("/",async(req,res)=>{});`
    },
    {
      id: "node-i-12",
      title: "File Upload",
      problem: `Upload file.`,
      hint: `Use multer.`,
      answer: `const upload=require("multer")();`
    },
    {
      id: "node-i-13",
      title: "CORS",
      problem: `Enable CORS.`,
      hint: `Use cors.`,
      answer: `app.use(require("cors")());`
    },
    {
      id: "node-i-14",
      title: "Connect MongoDB",
      problem: `Connect database.`,
      hint: `Use mongoose.`,
      answer: `mongoose.connect("url");`
    },
    {
      id: "node-i-15",
      title: "Schema",
      problem: `Create schema.`,
      hint: `Use mongoose.Schema.`,
      answer: `new mongoose.Schema({name:String});`
    },
     {
    id: "node-i-16",
    title: "Route Params Multiple",
    problem: `Handle multiple route params.`,
    hint: `Use req.params.`,
    answer: `app.get("/user/:id/:name",(req,res)=>res.send(req.params));`
  },
  {
    id: "node-i-17",
    title: "Router Module",
    problem: `Create express router.`,
    hint: `Use express.Router.`,
    answer: `const router = require("express").Router();`
  },
  {
    id: "node-i-18",
    title: "Use Router",
    problem: `Use router in app.`,
    hint: `Use app.use.`,
    answer: `app.use("/api", router);`
  }
  ],

  Advanced: [
    {
      id: "node-a-1",
      title: "JWT Auth",
      problem: `Create JWT token.`,
      hint: `Use jsonwebtoken.`,
      answer: `jwt.sign({id:1},"secret");`
    },
    {
      id: "node-a-2",
      title: "Verify JWT",
      problem: `Verify token.`,
      hint: `Use verify.`,
      answer: `jwt.verify(token,"secret");`
    },
    {
      id: "node-a-3",
      title: "Hash Password",
      problem: `Hash password.`,
      hint: `Use bcrypt.`,
      answer: `bcrypt.hash("pass",10);`
    },
    {
      id: "node-a-4",
      title: "Compare Password",
      problem: `Compare hash.`,
      hint: `Use bcrypt.compare.`,
      answer: `bcrypt.compare("pass",hash);`
    },
    {
      id: "node-a-5",
      title: "Cluster Mode",
      problem: `Use cluster.`,
      hint: `Use cluster module.`,
      answer: `require("cluster");`
    },
    {
      id: "node-a-6",
      title: "Streams",
      problem: `Read stream.`,
      hint: `Use createReadStream.`,
      answer: `fs.createReadStream("file");`
    },
    {
      id: "node-a-7",
      title: "Write Stream",
      problem: `Write stream.`,
      hint: `Use createWriteStream.`,
      answer: `fs.createWriteStream("file");`
    },
    {
      id: "node-a-8",
      title: "Event Emitter",
      problem: `Create event.`,
      hint: `Use EventEmitter.`,
      answer: `const e=new (require("events"))();`
    },
    {
      id: "node-a-9",
      title: "Emit Event",
      problem: `Emit event.`,
      hint: `Use emit.`,
      answer: `e.emit("event");`
    },
    {
      id: "node-a-10",
      title: "Listen Event",
      problem: `Listen event.`,
      hint: `Use on.`,
      answer: `e.on("event",fn);`
    },
    {
      id: "node-a-11",
      title: "Rate Limiting",
      problem: `Limit requests.`,
      hint: `Use middleware.`,
      answer: `app.use(rateLimit());`
    },
    {
      id: "node-a-12",
      title: "Helmet Security",
      problem: `Secure headers.`,
      hint: `Use helmet.`,
      answer: `app.use(require("helmet")());`
    },
    {
      id: "node-a-13",
      title: "Logging",
      problem: `Log requests.`,
      hint: `Use morgan.`,
      answer: `app.use(require("morgan")("dev"));`
    },
    {
      id: "node-a-14",
      title: "Cache Data",
      problem: `Cache response.`,
      hint: `Use memory.`,
      answer: `const cache={};`
    },
    {
      id: "node-a-15",
      title: "Process Cluster",
      problem: `Use multiple CPU.`,
      hint: `Use cluster.`,
      answer: `cluster.fork();`
    },
    {
    id: "node-a-16",
    title: "Async File Read",
    problem: `Read file using promises.`,
    hint: `Use fs.promises.`,
    answer: `const data = await fs.promises.readFile("file.txt","utf8");`
  },
  {
    id: "node-a-17",
    title: "Custom Middleware",
    problem: `Create reusable middleware.`,
    hint: `Return function.`,
    answer: `const mw = (req,res,next)=>{ console.log("hit"); next(); };`
  },
  {
    id: "node-a-18",
    title: "Environment Config",
    problem: `Use dotenv config.`,
    hint: `Use dotenv.`,
    answer: `require("dotenv").config();`
  }
  ],
};