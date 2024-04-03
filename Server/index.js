const express = require('express');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection URI
const mongoURI = 'mongodb://localhost:27017/SiteMaster';

// Connect to MongoDB
MongoClient.connect(mongoURI).then(client => {
        console.log('Connected to MongoDB');

        // Get reference to the 'newarrival' collection
        const db = client.db('SiteMaster');

        const usersCollection = db.collection('Profile');
        const projectsCollection = db.collection('Projects');
        const tasksCollection = db.collection('Tasks');
        const financeCollection = db.collection('Finance');

        app.post('/users', async (req, res) => {
            try
            {
                const data = await usersCollection.find({email: req.body.email}).toArray();
                res.json(data);
            }
            
            catch (error)
            {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Failed to fetch data' });
            }
        });

        app.post('/register', async (req, res) => {
            try
            {
                await usersCollection.insertOne(req.body);
                res.send("success");
            }
            
            catch (error)
            {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Failed to fetch data'});
            }
        });

        app.post('/createTask', async (req, res) => {
            try
            {
                await tasksCollection.insertOne(req.body);
                res.send("success");
            }
            
            catch (error)
            {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Failed to fetch data'});
            }
        });

        app.post('/createProject', async (req, res) => {
            try
            {
                await projectsCollection.insertOne(req.body);
                res.send("success");
            }
            
            catch (error)
            {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Failed to fetch data'});
            }
        });

        app.get('/projects/:username', async (req, res) => {
            try
            {
                const name = req.params.username;
                const query = { members: { $in: [name] } };

                const records = await projectsCollection.find(query).toArray();
                res.json(records);

            }
            catch (err)
            {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            }
        });

        app.get('/tasks/:prjName/:company/:member', async (req, res) => {
            try
            {
                const prjName = req.params.prjName;
                const company = req.params.company;
                const member = req.params.member;

                const data = await tasksCollection.find({prjName: prjName, company: company, assignedTo: member}).toArray();
                res.json(data);

            }
            catch (err)
            {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            }
        });

        app.get('/alltasks/:prjName/:company', async (req, res) => {
            try
            {
                const prjName = req.params.prjName;
                const company = req.params.company;

                const data = await tasksCollection.find({prjName: prjName, company: company}).toArray();
                res.json(data);

            }
            catch (err)
            {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            }
        });

        app.get('/taskDetails/:id', async (req, res) => {
            try
            {
                const ID = req.params.id;

                const objectId = new ObjectId(ID);

                const data = await tasksCollection.find({_id: objectId}).toArray();
                res.json(data);

            }
            catch (err)
            {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            }
        });

        app.get('/filters/:filter', async (req, res) => {
            try
            {
                const filter = req.params.filter;

                const records = await projectsCollection.find({ status: filter }).toArray();
                res.json(records);

            }
            catch (err)
            {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            }
        });

        app.get('/finance/:prjName/:company', async (req, res) => {
            try
            {
                const prjName = req.params.prjName;
                const company = req.params.company;

                const data = await financeCollection.find({prjName: prjName, company: company}).toArray();
                res.json(data);

            }
            catch (err)
            {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            }
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB');
        throw err;
});

