const apiAdaptor = require("../../apiAdaptor");

const api = apiAdaptor(process.env.DB_SERVICE_MEDIA);

exports.create = async (req, res) => {
  try {
    const media = await api.post("/media", req.body);

    return res.json(media.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({ error: "service is unavailable" });
    }

    return res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const media = await api.get("/media");

    return res.json(media.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({ error: "service is unavailable" });
    }

    return res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    const media = await api.delete(`/media/${id}`);

    return res.json(media.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({ error: "service is unavailable" });
    }

    return res.status(400).json({ error: error.message });
  }
};
