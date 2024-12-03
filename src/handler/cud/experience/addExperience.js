module.exports = async function (request, reply) {
  const { email } = request.headers;
  const { companyName, position, duration, description } = request.body;
  try {
    console.log(email, companyName, position, duration, description);
    console.log("from add experience handler");
  } catch (error) {
    console.log(error);
  }
};
