
const format_timestamp = () => {
  return new Date().toISOString().replace("T", " ").split(".")[0];
};

module.exports = format_timestamp;