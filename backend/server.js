const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static("public"));

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

if (require.main === module) {
   app.listen(PORT,"0.0.0.0", () => { console.log(`Server running on port ${PORT}`)}); 
}

module.exports = app;