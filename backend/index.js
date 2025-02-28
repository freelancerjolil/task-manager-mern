require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v39ab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Unauthorized access' });
  }

  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    const taskCollection = client.db('task-manager').collection('tasks');
    const userCollection = client.db('task-manager').collection('users');

    // JWT token generation endpoint
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
      });
      res.send({ token });
    });

    // CRUD routes for tasks
    app.post('/tasks', verifyToken, async (req, res) => {
      const newTask = req.body;
      newTask.userId = req.decoded.uid; // Attach userId from Firebase token
      const result = await taskCollection.insertOne(newTask);
      res.send(result);
    });

    app.get('/tasks', verifyToken, async (req, res) => {
      try {
        const userId = req.decoded.uid;
        const tasks = await taskCollection.find({ userId }).toArray();
        res.send(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send({ message: 'Server error' });
      }
    });

    app.get('/tasks/category/:category', verifyToken, async (req, res) => {
      const userId = req.decoded.uid;
      const { category } = req.params;
      const tasks = await taskCollection.find({ userId, category }).toArray();
      res.send(tasks);
    });

    app.delete('/tasks/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id), userId: req.decoded.uid };
      const task = await taskCollection.findOne(query);
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });

    app.put('/tasks/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const updatedTask = req.body;
      const query = { _id: new ObjectId(id), userId: req.decoded.uid };
      const task = await taskCollection.findOne(query);
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      const updateDoc = { $set: updatedTask };
      const result = await taskCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const existingUser = await userCollection.findOne({
        email: newUser.email,
      });
      if (existingUser) {
        return res.status(400).send({ message: 'User already exists' });
      }
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console
      .log
      // 'Pinged your deployment. You successfully connected to MongoDB!'
      ();
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Tasks-Manager API is Running successfully');
});

app.listen(port, () => {
  console.log(`Tasks-Manager is running on port ${port}`);
});
