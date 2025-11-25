const express = require("express");
const serverless = require("serverless-http");
const https = require("https");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/characters", (req, res) => {
  const { id } = req.query;
  if (!id) {
    https.get("https://b2816a0c6b23347d.mokky.dev/characters", corsRes => {
      if (corsRes.statusCode !== 200) {
        throw new Error("Request error");
      }

      corsRes.setEncoding("utf-8");
      let rawData = "";
      corsRes.on("data", chunk => {
        rawData += chunk;
      });
      corsRes.on("end", () => {
        const charactersData = JSON.parse(rawData);
        const filteredCharactersData = charactersData.map(character => {
          const { urls, nameor, ...filteredCharacterData } = character;
          return filteredCharacterData;
        });

        res.json(filteredCharactersData);
      });
    }).on("error", e => {
      console.log(e);
    });
  } else {
    https.get(`https://b2816a0c6b23347d.mokky.dev/characters?id=${id}`, corsRes => {
      if (corsRes.statusCode !== 200) {
        throw new Error("Request error");
      }

      corsRes.setEncoding("utf-8");
      let rawData = "";
      corsRes.on("data", chunk => {
        rawData += chunk;
      });
      corsRes.on("end", () => {
        const characterData = JSON.parse(rawData);
        if (characterData.length === 0) {
          return res
            .status(404)
            .json({ status: "failed", message: "Character not found" });
        }

        const { urls, nameor, ...filteredCharacterData } = characterData[0];
        res.json(filteredCharacterData);
      });
    }).on("error", e => {
      console.log(e);
    });
  }
});

// app.listen(3000)

module.exports.handler = serverless(app);