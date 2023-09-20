SELECT 
    todoslosproductos.id AS todoslosproductos_id,
    productos.nombre AS producto_nombre,
    precios.precio AS precio_valor,
    stock.stock AS stock_valor
FROM todoslosproductos
JOIN productos ON todoslosproductos.nombre_id = productos.id
JOIN precios ON todoslosproductos.precio_id = precios.id
JOIN stock ON todoslosproductos.stock_id = stock.id;