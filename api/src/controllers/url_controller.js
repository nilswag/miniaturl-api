const url_service = require("../services/url_service");

const add_url = async (req, res) => {
  const long_url = req.body.long_url;
  if (!long_url) res.status(404).send({ message: "long_url is required" });
  let confirm = await url_service.add_url(long_url);
  res.status(200).send(confirm);
};

module.exports = { add_url };