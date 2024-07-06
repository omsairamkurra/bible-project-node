const express = require("express");
const fs = require("fs");
const path = require("path");

// Create an Express application
const app = express();
const port = 3000;

// Path to your bible.json file
const filePath = path.join(__dirname, "bible.json");

// Serve static files (like stylesheets or images) from the 'public' directory
app.use(express.static("public"));

// Define a route to serve the JSON data
app.get("/bible-data", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send("Error reading the file.");
    }

    try {
      // Parse JSON data
      const bibleData = JSON.parse(data);

      // Send JSON data as the response
      res.json(bibleData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Error parsing JSON.");
    }
  });
});

// Define a route for the home page
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Bible Data</title>
      </head>
      <body>
        <h1>Welcome to the Bible Data</h1>
        <p>Click <a href="/bible-data" target="_blank">here</a> to view the Bible JSON data.</p>
      </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
