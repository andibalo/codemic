const express = require("express");
const router = express.Router();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const { Media } = require("../models");

router.post("/", async (req, res) => {
  const { image } = req.body;

  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ error: "image is not base64" });
  }

  await base64Img.img(
    image,
    "./public/images",
    Date.now(),
    async (err, filePath) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const filename = filePath.split("\\").pop().split("/").pop();

      const media = await Media.create({ image: `image/${filename}` });

      return res.json({
        data: {
          id: media.id,
          image: `${req.get("host")}/images/${filename}`,
        },
      });
    }
  );
});

module.exports = router;
