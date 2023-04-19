const uploadController = {
  uploadImage: (req, res) => {
    const response = req.file;

    if (req.file?.filename) {
      response.imageUrl = `${process.env.STATIC_URL}/images/${req.file?.filename}`;
    }

    res.json(response);
  },
};

module.exports = uploadController;
