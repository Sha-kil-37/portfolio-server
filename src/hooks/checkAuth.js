module.exports = async function (request, reply) {
  try {
    const tokenVerify = await request.jwtVerify();
    console.log(tokenVerify);
  } catch (error) {
    console.log(error);
  }
};
