import dotenv from "dotenv";
import Fastify, { FastifyInstance } from "fastify";

dotenv.config();

const app: FastifyInstance = Fastify({
  logger: true,
});

app.setErrorHandler((error, req, res) => {
  if (error.validation) {
    res.status(400).send({
      success: false,
      message: `Bad Request - ${error.validation[0].dataPath} ${error.validation[0].message}`,
    });
    return;
  }

  if (!error.statusCode) {
    res.status(500).send({
      success: false,
      message: `Internal Server Error - ${error.message}`,
    });
    return;
  }

  res.status(error.statusCode).send({
    success: false,
    message: `${error.statusCode} - ${error.message}`,
  });
});

const run = async () => {
  await app.listen(process.env.PORT);
  console.log(`Server listening on ${process.env.PORT}`);
};

run().catch((e) => {
  console.log(e);
});
