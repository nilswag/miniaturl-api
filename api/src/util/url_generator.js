
const generate_url = () => {
  const characters = "ABCDEFGHIJLKMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz0123456789";
  let short_url = "";
  for (let i = 0; i < 8; i++) 
    short_url += characters.charAt(Math.floor(Math.random() * characters.length));
  return short_url;
};

module.exports = { generate_url };