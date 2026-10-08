const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;

// Read form data
app.use(express.urlencoded({ extended: true }));

// Serve HTML files from public folder
app.use(express.static("public"));

// Handle registration
app.post("/register", (req, res) => {

    const fullName = req.body.fullName;
    const email = req.body.email;
    const workshopName = req.body.workshopName;
    const participants = req.body.participants;

    const registration = `
Full Name: ${fullName}
Email Address: ${email}
Workshop Name: ${workshopName}
Number of Participants: ${participants}
----------------------------------------
`;

    const filePath = path.join(
        __dirname,
        "workshop_registrations.txt"
    );

    // Add new registration without deleting old registrations
    fs.appendFile(filePath, registration, (err) => {

        if (err) {
            console.log(err);
            res.status(500).send("Registration failed.");
            return;
        }

        res.send("Workshop Registration Successful!");
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});