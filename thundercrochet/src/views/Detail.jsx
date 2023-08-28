import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {todosLosProductos} from BaseDeDatos;

function Detail() {
  const [producto, setProducto] = useState({});

  const {id} = useParams();

  useEffect(() => {
    (todosLosProductos).then(({data}) => {
      if (data.nombre) {
        setProducto(data);
      } else {
        window.alert("No hay productos con ese ID");
      }
    });
    return setProducto({});
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <h2>{producto.nombre}</h2>
        <img src={producto.img} alt={producto.nombre} />
      </div>
      <div>
        <div>
          <h3>Cantidad:</h3>
          <p>{producto.cantidad}</p>
        </div>
        <div>
          <h3>Precio:</h3>
          <p>{producto.precio}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
