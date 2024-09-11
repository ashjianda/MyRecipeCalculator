require('dotenv').config();
const express = require('express');
const { container } = require('./connection');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

app.post('/api/addUser', async (request, result) => {
    try {
        const { email, password } = request.body;
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            email,
            password: hashedPassword,
        };

        await container.items.create(newUser);
        console.log('User created successfully');
    } catch (error) {
        console.log(error);
        result.status(500).send(error);
    }
});

app.post('/api/avoidDuplicateEmail', async (request, result) => {
    try {
        const { email } = request.body;
        const queryStruct = {
            query: "SELECT * FROM c WHERE c.email = @email",
            parameters: [{ name: "@email", value: email }]
        }

        const { resources: user } = await container.items.query(queryStruct).fetchAll();

        if (user.length > 0) result.status(200).json({ exists: true });
        else result.status(200).json({ exists: false });

    } catch (error) {
        console.log(error);
        result.status(500).send(error);
    }
});

app.post('/api/login', async (request, result) => {
    try {
        const { email, password } = request.body;
        const queryStruct = {
            query: "SELECT * FROM c WHERE c.email = @email",
            parameters: [{ name: "@email", value: email }]
        }

        const { resources: user } = await container.items.query(queryStruct).fetchAll();
        if (user.length > 0) {
            const match = await bcrypt.compare(password, user[0].password);
            if (match) {
                result.status(200).send({ message: 'Login successful!' });
            } else {
                result.status(404).send({ message: 'Incorrect password!' });
            }
        } else {
            result.status(404).send({ message: 'Email not found!' });
        }
    } catch (error) {
        result.status(500).send(error);
        console.log(error);
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
