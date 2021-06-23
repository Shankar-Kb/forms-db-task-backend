const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const mongoClient = mongodb.MongoClient;
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const port = process.env.PORT || 3001;

app.post('/submit-form', async (req, res) => {
    try {
        const client = await mongoClient.connect(DB_URL, {useUnifiedTopology: true});
        const db = client.db('simpleFormDatabase');

        const data = {
            name: req.body.userName,
            email: req.body.userEmail,
            gender: req.body.userGender,
            dateOfBirth: req.body.userDateOfBirth,
            addressLineOne: req.body.userAddressLineOne,
            addressLineTwo: req.body.userAddressLineTwo,
            landmark: req.body.userLandmark,
            country: req.body.userCountry,
            state: req.body.userState,
            pinCode: req.body.userPinCode,
            bankName: req.body.userBankName,
            accountNumber: req.body.userAccountNumber,
            branchName: req.body.userBranchName,
            ifscCode: req.body.userIfscCode
        }

        await db.collection('simpleForm').insertOne(data);
        client.close();
        res.status(200).json({message: "Form details have been recorded to the database"});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.listen(port, () => console.log(`::: Server is UP and running on port: ${port} :::`));