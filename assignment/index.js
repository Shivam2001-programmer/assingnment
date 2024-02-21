const express = require("express");
const { translate } = require("@vitalets/google-translate-api");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.post("/translate", async (req, res) => {
  try {

    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({
          error:
            'Invalid request. Please provide a valid "text" field in the request body.',
        });
    }


    const translation = await translate(text, { to: "fr" });


    res.status(200).json({ translation: translation.text });
  } catch (error) {
    console.error("Translation error:", error);
   
    res
      .status(500)
      .json({
        error: "Error occurred during translation. Please try again later.",
      });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
