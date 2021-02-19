const express = require('express');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
// const dbUrl = 'mongodb://localhost:27017';
const dbUrl =
	'mongodb+srv://admin-vishnu:vishnu123@vishnu.1nuon.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const app = express();

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello NodeJS');
});

app.get('/students', async (req, res) => {
	try {
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('mentor-student');
		let students = await db.collection('students').find().toArray();
		res.json(students);
		client.close();
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.post('/students', async (req, res) => {
	try {
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('mentor-student');
		await db.collection('students').insertOne({ name: req.body.name });
		res.json({ message: 'Record Inserted' });
		client.close();
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.get('/student/:id', async (req, res) => {
	try {
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('mentor-student');
		let student = await db.collection('students').findOne({ _id: mongodb.ObjectID(req.params.id) });
		res.json(student);
		client.close();
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.put('/student/:id', async (req, res) => {
	try {
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('mentor-student');
		let student = await db
			.collection('students')
			.updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: { name: req.body.name } });
		res.json({ message: 'Record Updated' });
		client.close();
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.delete('/student/:id', async (req, res) => {
	try {
		let client = await mongoClient.connect(dbUrl);
		let db = client.db('mentor-student');
		await db.collection('students').deleteOne({ _id: mongodb.ObjectID(req.params.id) });
		res.json({ message: 'Record Deleted' });
		client.close();
	} catch (error) {
		console.log(error);
		res.json({ message: 'Something went wrong' });
	}
});

app.listen(port, () => {
	console.log(`server started on port : ${port}`);
});
