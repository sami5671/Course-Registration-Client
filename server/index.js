const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());

const uri =
  "mongodb+srv://course_registration:OYoXLZvUeVryrlSQ@cluster1.dwhia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const courseCollection = client
      .db("courseregistration")
      .collection("courses");

    const usersCollection = client.db("courseregistration").collection("users");

    //======================================================
    app.get("/courses", async (req, res) => {
      const result = await courseCollection.find().toArray();
      res.send(result);
      // console.log(result);
    });
    app.post("/add", async (req, res) => {
      // add is server endpoint
      const Item = req.body;
      const result = await courseCollection.insertOne(Item);
      res.send(result);
    });
    app.post("/registration", async (req, res) => {
      const { name, email, password } = req.body;

      // Input validation
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      try {
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "Email already in use." });
        }
        // Save the user to the database
        const newUser = { name, email, password, status: "user", courses: [] };
        await usersCollection.insertOne(newUser);

        res
          .status(200)
          .json({ message: "User registered successfully.", newUser });
      } catch (error) {
        console.error("Error registering user:", error);
        res
          .status(500)
          .json({ message: "Server error. Please try again later." });
      }
    });
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await usersCollection.findOne({ email });
        if (!user) {
          return res
            .status(401)
            .json({ message: "Invalid email or password." });
        }

        if (password === user.password) {
          res.status(200).json({
            message: "Login successful.",
            user,
          });
        } else {
          return res
            .status(401)
            .json({ message: "Invalid email or password." });
        }
      } catch (error) {
        console.error("Error during login:", error);
        res
          .status(500)
          .json({ message: "Server error. Please try again later." });
      }
    });
    app.get("/update/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await courseCollection.findOne(query);
      res.send(result);
    });
    app.get("/courseAccess/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await courseCollection.findOne(query);
      res.send(result);
    });
    app.put("/courseUpdate/:id", async (req, res) => {
      try {
        const { id } = req.params;

        const updatedData = req.body;
        console.log(updatedData, id);

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            course_title: updatedData.course_title,
            course_details: updatedData.course_details,
            course_img: updatedData.course_img,
            credit_hrs: updatedData.credit_hrs,
            price: updatedData.price,
          },
        };
        const result = await courseCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        res.status(500).json({ message: "Error updating course", error });
      }
    });
    app.delete("/deleteCourse/:id", async (req, res) => {
      const id = req.params.id;

      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await courseCollection.deleteOne(query);
      res.send(result);
    });
    // app.put("/userUpdate/:userId", async (req, res) => {
    //   const { userId } = req.params;
    //   const courseDetails = req.body;
    //   console.log(userId, courseDetails);

    //   try {
    //     const result = await usersCollection.updateOne(
    //       { _id: new ObjectId(userId) },
    //       { $set: { courses: courseDetails } }
    //     );

    //     if (result.matchedCount === 0) {
    //       return res.status(404).json({ message: "User not found" });
    //     }

    //     res.status(200).json({
    //       message: "User courses updated successfully",
    //       updatedCourses: courseDetails,
    //     });
    //   } catch (error) {
    //     console.error("Error updating user courses:", error);
    //     res.status(500).json({ message: "Server error" });
    //   }
    // });
    app.put("/userUpdate/:userId", async (req, res) => {
      const { userId } = req.params;
      const courseDetails = req.body;
      console.log(userId, courseDetails);

      try {
        const result = await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          {
            $push: { courses: { $each: courseDetails } },
          }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
          message: "User courses updated successfully",
          updatedCourses: courseDetails,
        });
      } catch (error) {
        console.error("Error updating user courses:", error);
        res.status(500).json({ message: "Server error" });
      }
    });
    //  =================================================================

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// server running confirmation in default route
app.get("/", (req, res) => {
  res.send(" Server is Alive.............");
});

app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});
