<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            width: 100%;
            max-width: 500px;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h2 {
            font-size: 24px;
            margin-bottom: 20px;
        }

        .input-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            font-size: 16px;
            margin-bottom: 5px;
        }

        input[type="password"],
        input[type="text"],
        input[type="number"],
        input[type="file"] {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            background-color: #fafafa;
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background-color: #45a049;
        }

        .hidden {
            display: none;
        }

        .producto-lista {
            margin-top: 30px;
            text-align: left;
        }

        .producto-card {
            background-color: #f9f9f9;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border: 1px solid #ddd;
        }

        #error-message {
            color: red;
            display: none;
        }
    </style>
</head>
<body>

    <!-- Pantalla de inicio de sesión -->
    <div id="login-screen" class="container">
        <h2>Panel de Administrador</h2>
        <div class="input-group">
            <label for="password">Contraseña de Administrador</label>
            <input type="password" id="password" placeholder="Ingresa la contraseña" />
        </div>
        <button onclick="validarContraseña()">Acceder</button>
        <p id="error-message">Contraseña incorrecta. Intenta nuevamente.</p>
    </div>

    <!-- Panel de administración (oculto inicialmente) -->
    <div id="admin-panel" class="container hidden">
        <h2>Gestión de Productos</h2>

        <!-- Formulario para agregar productos manualmente -->
        <div class="input-group">
            <label for="nombreProducto">Nombre del Producto</label>
            <input type="text" id="nombreProducto" placeholder="Ingresa el nombre del producto" />
        </div>

        <div class="input-group">
            <label for="precioProducto">Precio del Producto</label>
            <input type="number" id="precioProducto" placeholder="Ingresa el precio" />
        </div>

        <button onclick="agregarProductoManual()">Agregar Producto Manual</button>

        <hr>

        <!-- Formulario para cargar productos desde un archivo Excel -->
        <div class="input-group">
            <label for="archivoExcel">Subir Productos desde Excel (.xlsx)</label>
            <input type="file" id="archivoExcel" accept=".xlsx" onchange="cargarProductosExcel(event)" />
        </div>

        <button onclick="subirProductosExcel()">Subir Productos desde Excel</button>

        <!-- Lista de productos -->
        <div class="producto-lista" id="productos-container">
            <!-- Los productos se mostrarán aquí -->
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.4/xlsx.full.min.js"></script>
    <script>
        const contrasenaCorrecta = "1193271486"; // Contraseña del administrador
        let productos = []; // Array para almacenar productos

        // Validar contraseña
        function validarContraseña() {
            const password = document.getElementById("password").value;
            if (password === contrasenaCorrecta) {
                document.getElementById("login-screen").classList.add("hidden");
                document.getElementById("admin-panel").classList.remove("hidden");
                document.getElementById("error-message").style.display = "none"; // Ocultar error
            } else {
                document.getElementById("error-message").style.display = "block"; // Mostrar error
            }
        }

        // Agregar producto manualmente
        function agregarProductoManual() {
            const nombre = document.getElementById("nombreProducto").value;
            const precio = document.getElementById("precioProducto").value;

            if (nombre && precio) {
                productos.push({ nombre, precio });
                mostrarProductos(); // Actualizar la lista de productos
                // Limpiar los campos
                document.getElementById("nombreProducto").value = "";
                document.getElementById("precioProducto").value = "";
            } else {
                alert("Por favor, ingresa el nombre y el precio del producto.");
            }
        }

        // Cargar productos desde archivo Excel
        function cargarProductosExcel(event) {
            const archivo = event.target.files[0];
            if (archivo) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const productosExcel = XLSX.utils.sheet_to_json(worksheet);

                    // Agregar productos del archivo Excel al array
                    productosExcel.forEach(producto => {
                        productos.push({ nombre: producto.Nombre, precio: producto.Precio });
                    });

                    mostrarProductos(); // Mostrar los productos cargados
                };
                reader.readAsBinaryString(archivo);
            }
        }

        // Mostrar productos en la página
        function mostrarProductos() {
            const productosContainer = document.getElementById("productos-container");
            productosContainer.innerHTML = ""; // Limpiar lista actual de productos

            productos.forEach(producto => {
                const productoCard = document.createElement("div");
                productoCard.classList.add("producto-card");
                productoCard.innerHTML = `
                    <p><strong>Nombre:</strong> ${producto.nombre}</p>
                    <p><strong>Precio:</strong> $${producto.precio}</p>
                `;
                productosContainer.appendChild(productoCard);
            });
        }

        // Subir productos desde archivo Excel
        function subirProductosExcel() {
            const archivoInput = document.getElementById("archivoExcel");
            if (archivoInput.files.length === 0) {
                alert("Por favor, selecciona un archivo Excel.");
            }
        }
    </script>
</body>
</html>
