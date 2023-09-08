const http = require("http");
const { default: todosLosProductos } = require("./BaseDeDatos/productos");

const PORT = 3001;

http
  .createServer((req, res) => {
    const {url} = req;
    res.setHeader("Access-Control-Allow-Origin", "*");

    // localhost:3001/rickandmorty/character/${id}
    // axios(www.rickandmorty)
    if (url.includes("thundercrotchet/producto/")) {
      let urlId = url.split("/").pop();
      let found = todosLosProductos.find(
        (producto) => producto.id === Number(urlId)
      );
      res
        .writeHead(200, {
          "Content-Type": "application/json",
        })
        .end(JSON.stringify(found));
    }
  })
  .listen(PORT);
