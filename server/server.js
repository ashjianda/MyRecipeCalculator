const express = require('express');
const { container } = require('./connection');
const bcrypt = require('bcryptjs');
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
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
