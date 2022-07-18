import { MongoClient } from "mongodb";

// api/new-meetup

async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://TziovanisUvenis:Splitsecond27@nextcluster.2eiqf.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetupcollection");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
