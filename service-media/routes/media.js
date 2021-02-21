const express = require("express");
const router = express.Router();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const { Media } = require("../models");
const fs = require("fs");

router.get("/", async (req, res) => {
  const media = await Media.findAll();

  const mappedMedia = media.map((m) => {
    m.image = `${req.get("host")}/${m.image}`;

    return m;
  });

  res.json({
    data: {
      images: mappedMedia,
    },
  });
});

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

      const media = await Media.create({ image: `images/${filename}` });

      return res.json({
        data: {
          id: media.id,
          image: `${req.get("host")}/images/${filename}`,
        },
      });
    }
  );
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const media = await Media.findByPk(id);

  //FS UNLINK takes a path file and cb function, it deletes a file
  fs.unlink(`./public/${media.image}`, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    //delete image data in database
    await media.destroy();

    return res.json({
      message: "Image has been deleted",
    });
  });
});

module.exports = router;
