import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://aeguoweijiang:6Ta7mfYYCixIWnXj@cluster0.nnkmws9.mongodb.net/chat";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("chat"); // 替换为你的数据库名称
    const collection = database.collection("chats"); // 替换为你的集合名称

    // 删除集合
    await collection.drop();
    console.log("Collection 'foods' has been dropped");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
