const fastify = require("fastify");
const fastifyCors = require("@fastify/cors");
const fastifyCookie = require("@fastify/cookie");

const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");

const router = require("./Router/Router");

const app = fastify();

app.register(fastifyCors, {
  origin: true, // Specific allowed origin
  credentials: true, // Permite cookies e cabeçalhos de autenticação
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"] // Métodos permitidos
});

app.register(fastifyCookie);

app.register(fastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  exposeRoute: true,
});

app.register(router);

const port = 8000;

const start = () => {
  try {
    app.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Aplicação rodando na porta ${port}`);
  } catch (error) {
    console.log(error);
  }
};

start();
