<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">

    <title>Generación de Convenios</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            margin: 0;
            padding: 40px;
        }

        .contenedor {
            max-width: 700px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
        }

        h1 {
            margin-top: 0;
        }

        .campo {
            margin-bottom: 20px;
        }

        label {
            display: block;
            font-weight: bold;
            margin-bottom: 8px;
        }

        input[type="file"] {
            width: 100%;
        }

        button {
            padding: 12px 20px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }

        .success {
            padding: 12px;
            margin-bottom: 20px;
            background: #dff0d8;
            border-radius: 5px;
        }

        .error {
            padding: 12px;
            margin-bottom: 20px;
            background: #f2dede;
            border-radius: 5px;
        }

        ul {
            margin-bottom: 0;
        }
    </style>
</head>

<body>

<div class="contenedor">

    <h1>Generación de Convenios</h1>

    @if(session('success'))
        <div class="success">
            {{ session('success') }}
        </div>
    @endif

    @if($errors->any())
        <div class="error">

            <strong>Se encontraron errores:</strong>

            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>

        </div>
    @endif

    <form
        action="{{ route('convenios.procesar') }}"
        method="POST"
        enctype="multipart/form-data"
    >

        @csrf

        <div class="campo">

            <label for="plantilla">
                Plantilla HTML
            </label>

            <input
                type="file"
                id="plantilla"
                name="plantilla"
                accept=".html,.txt"
                required
            >

        </div>

        <div class="campo">

            <label for="csv">
                Archivo CSV
            </label>

            <input
                type="file"
                id="csv"
                name="csv"
                accept=".csv,.txt"
                required
            >

        </div>

        <button type="submit">
            Generar convenios
        </button>

    </form>

</div>

</body>
</html>