import app from "./app";

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Swagger docs en http://localhost:${PORT}/api-docs`);
});
