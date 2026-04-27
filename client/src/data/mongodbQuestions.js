export const mongodbQuestions = {
  Beginner: [
    {
      id: "mongo-b-1",
      title: "Connect MongoDB",
      problem: `Connect to MongoDB using mongoose.`,
      hint: `Use mongoose.connect.`,
      answer: `mongoose.connect("mongodb://localhost:27017/test");`
    },
    {
      id: "mongo-b-2",
      title: "Create Schema",
      problem: `Create a schema with name field.`,
      hint: `Use mongoose.Schema.`,
      answer: `new mongoose.Schema({ name: String });`
    },
    {
      id: "mongo-b-3",
      title: "Create Model",
      problem: `Create a model.`,
      hint: `Use mongoose.model.`,
      answer: `mongoose.model("User", schema);`
    },
    {
      id: "mongo-b-4",
      title: "Insert Document",
      problem: `Insert a document.`,
      hint: `Use save.`,
      answer: `new User({name:"A"}).save();`
    },
    {
      id: "mongo-b-5",
      title: "Find Documents",
      problem: `Fetch all documents.`,
      hint: `Use find.`,
      answer: `User.find();`
    },
    {
      id: "mongo-b-6",
      title: "Find One",
      problem: `Find one document.`,
      hint: `Use findOne.`,
      answer: `User.findOne({name:"A"});`
    },
    {
      id: "mongo-b-7",
      title: "Update Document",
      problem: `Update a document.`,
      hint: `Use updateOne.`,
      answer: `User.updateOne({_id:id},{name:"B"});`
    },
    {
      id: "mongo-b-8",
      title: "Delete Document",
      problem: `Delete a document.`,
      hint: `Use deleteOne.`,
      answer: `User.deleteOne({_id:id});`
    },
    {
      id: "mongo-b-9",
      title: "Count Documents",
      problem: `Count documents.`,
      hint: `Use countDocuments.`,
      answer: `User.countDocuments();`
    },
    {
      id: "mongo-b-10",
      title: "Limit Results",
      problem: `Limit query results.`,
      hint: `Use limit.`,
      answer: `User.find().limit(5);`
    },
    {
      id: "mongo-b-11",
      title: "Sort Results",
      problem: `Sort documents.`,
      hint: `Use sort.`,
      answer: `User.find().sort({name:1});`
    },
    {
      id: "mongo-b-12",
      title: "Skip Results",
      problem: `Skip documents.`,
      hint: `Use skip.`,
      answer: `User.find().skip(5);`
    },
    {
      id: "mongo-b-13",
      title: "Select Fields",
      problem: `Select specific fields.`,
      hint: `Use select.`,
      answer: `User.find().select("name");`
    },
    {
      id: "mongo-b-14",
      title: "Create Index",
      problem: `Create index on field.`,
      hint: `Use index.`,
      answer: `schema.index({name:1});`
    },
    {
      id: "mongo-b-15",
      title: "Unique Field",
      problem: `Make field unique.`,
      hint: `Use unique.`,
      answer: `{ email: { type:String, unique:true } }`
    },
    {
      id: "mongo-b-16",
      title: "Default Value",
      problem: `Set default value.`,
      hint: `Use default.`,
      answer: `{ active: { type:Boolean, default:true } }`
    },
    {
      id: "mongo-b-17",
      title: "Required Field",
      problem: `Make field required.`,
      hint: `Use required.`,
      answer: `{ name: { type:String, required:true } }`
    },
    {
      id: "mongo-b-18",
      title: "Timestamp",
      problem: `Add timestamps.`,
      hint: `Use timestamps.`,
      answer: `new Schema({}, { timestamps:true });`
    }
  ],

  Intermediate: [
    {
      id: "mongo-i-1",
      title: "Populate Reference",
      problem: `Populate referenced data.`,
      hint: `Use populate.`,
      answer: `User.find().populate("posts");`
    },
    {
      id: "mongo-i-2",
      title: "Aggregation Match",
      problem: `Filter using aggregation.`,
      hint: `Use $match.`,
      answer: `Model.aggregate([{ $match: { age: 20 } }]);`
    },
    {
      id: "mongo-i-3",
      title: "Aggregation Group",
      problem: `Group documents.`,
      hint: `Use $group.`,
      answer: `Model.aggregate([{ $group: { _id:"$age" } }]);`
    },
    {
      id: "mongo-i-4",
      title: "Aggregation Sort",
      problem: `Sort in pipeline.`,
      hint: `Use $sort.`,
      answer: `[{ $sort: { age:1 } }]`
    },
    {
      id: "mongo-i-5",
      title: "Aggregation Limit",
      problem: `Limit pipeline.`,
      hint: `Use $limit.`,
      answer: `[{ $limit:5 }]`
    },
    {
      id: "mongo-i-6",
      title: "Lookup Join",
      problem: `Join collections.`,
      hint: `Use $lookup.`,
      answer: `[{ $lookup:{from:"users",localField:"id",foreignField:"_id",as:"data"} }]`
    },
    {
      id: "mongo-i-7",
      title: "Text Search",
      problem: `Search text.`,
      hint: `Use $text.`,
      answer: `Model.find({ $text: { $search:"abc" } });`
    },
    {
      id: "mongo-i-8",
      title: "Regex Search",
      problem: `Search pattern.`,
      hint: `Use regex.`,
      answer: `Model.find({ name:/abc/i });`
    },
    {
      id: "mongo-i-9",
      title: "Bulk Insert",
      problem: `Insert many docs.`,
      hint: `Use insertMany.`,
      answer: `Model.insertMany([{},{ }]);`
    },
    {
      id: "mongo-i-10",
      title: "Bulk Update",
      problem: `Update many docs.`,
      hint: `Use updateMany.`,
      answer: `Model.updateMany({}, {active:true});`
    },
    {
      id: "mongo-i-11",
      title: "Bulk Delete",
      problem: `Delete many docs.`,
      hint: `Use deleteMany.`,
      answer: `Model.deleteMany({});`
    },
    {
      id: "mongo-i-12",
      title: "Projection",
      problem: `Project fields.`,
      hint: `Use projection.`,
      answer: `Model.find({}, {name:1});`
    },
    {
      id: "mongo-i-13",
      title: "Indexes Compound",
      problem: `Create compound index.`,
      hint: `Use multiple fields.`,
      answer: `schema.index({name:1,age:-1});`
    },
    {
      id: "mongo-i-14",
      title: "Virtual Field",
      problem: `Create virtual.`,
      hint: `Use virtual.`,
      answer: `schema.virtual("full").get(()=>{});`
    },
    {
      id: "mongo-i-15",
      title: "Pre Hook",
      problem: `Run before save.`,
      hint: `Use pre.`,
      answer: `schema.pre("save", function(){});`
    },
    {
      id: "mongo-i-16",
      title: "Post Hook",
      problem: `Run after save.`,
      hint: `Use post.`,
      answer: `schema.post("save", function(){});`
    },
    {
      id: "mongo-i-17",
      title: "Lean Query",
      problem: `Return plain object.`,
      hint: `Use lean.`,
      answer: `Model.find().lean();`
    },
    {
      id: "mongo-i-18",
      title: "Pagination",
      problem: `Implement pagination.`,
      hint: `Use skip & limit.`,
      answer: `Model.find().skip(10).limit(10);`
    }
  ],

  Advanced: [
    {
      id: "mongo-a-1",
      title: "Transaction",
      problem: `Use transaction.`,
      hint: `Use session.`,
      answer: `const session=await mongoose.startSession();`
    },
    {
      id: "mongo-a-2",
      title: "Start Transaction",
      problem: `Start transaction.`,
      hint: `Use startTransaction.`,
      answer: `session.startTransaction();`
    },
    {
      id: "mongo-a-3",
      title: "Commit Transaction",
      problem: `Commit transaction.`,
      hint: `Use commit.`,
      answer: `await session.commitTransaction();`
    },
    {
      id: "mongo-a-4",
      title: "Abort Transaction",
      problem: `Abort transaction.`,
      hint: `Use abort.`,
      answer: `await session.abortTransaction();`
    },
    {
      id: "mongo-a-5",
      title: "Aggregation Pipeline",
      problem: `Use full pipeline.`,
      hint: `Use aggregate.`,
      answer: `Model.aggregate([]);`
    },
    {
      id: "mongo-a-6",
      title: "Geo Query",
      problem: `Use geo location.`,
      hint: `Use $geoNear.`,
      answer: `[{ $geoNear:{} }]`
    },
    {
      id: "mongo-a-7",
      title: "TTL Index",
      problem: `Auto delete docs.`,
      hint: `Use expires.`,
      answer: `{ createdAt:{ type:Date, expires:3600 } }`
    },
    {
      id: "mongo-a-8",
      title: "Shard Collection",
      problem: `Shard data.`,
      hint: `Use shard key.`,
      answer: `sh.shardCollection("db.coll",{_id:1});`
    },
    {
      id: "mongo-a-9",
      title: "Replica Set",
      problem: `Setup replica.`,
      hint: `Use rs.initiate.`,
      answer: `rs.initiate();`
    },
    {
      id: "mongo-a-10",
      title: "Index Hint",
      problem: `Force index.`,
      hint: `Use hint.`,
      answer: `Model.find().hint({name:1});`
    },
    {
      id: "mongo-a-11",
      title: "Explain Query",
      problem: `Analyze query.`,
      hint: `Use explain.`,
      answer: `Model.find().explain();`
    },
    {
      id: "mongo-a-12",
      title: "Map Reduce",
      problem: `Use mapReduce.`,
      hint: `Use mapReduce.`,
      answer: `Model.mapReduce({});`
    },
    {
      id: "mongo-a-13",
      title: "Aggregation Facet",
      problem: `Use $facet.`,
      hint: `Multiple pipelines.`,
      answer: `[{ $facet:{} }]`
    },
    {
      id: "mongo-a-14",
      title: "Bucket",
      problem: `Group ranges.`,
      hint: `Use $bucket.`,
      answer: `[{ $bucket:{} }]`
    },
    {
      id: "mongo-a-15",
      title: "Graph Lookup",
      problem: `Recursive lookup.`,
      hint: `Use $graphLookup.`,
      answer: `[{ $graphLookup:{} }]`
    },
    {
      id: "mongo-a-16",
      title: "Collation",
      problem: `Case insensitive.`,
      hint: `Use collation.`,
      answer: `Model.find().collation({locale:"en"});`
    },
    {
      id: "mongo-a-17",
      title: "Read Preference",
      problem: `Set read preference.`,
      hint: `Use readPreference.`,
      answer: `Model.find().read("secondary");`
    },
    {
      id: "mongo-a-18",
      title: "Write Concern",
      problem: `Set write concern.`,
      hint: `Use writeConcern.`,
      answer: `Model.create(doc,{ writeConcern:{w:1} });`
    }
  ]
};