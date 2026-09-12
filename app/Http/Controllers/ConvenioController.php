<?php

namespace App\Http\Controllers;

use App\Jobs\GenerateConvenioPdfJob;

use Illuminate\Http\Request;

class ConvenioController extends Controller
{
    public function index()
    {
        return view('convenios.index');
    }

    public function procesar(Request $request)
    {
        $request->validate([
            'plantilla' => 'required|file|mimes:html,txt',
            'csv'       => 'required|file|mimes:csv,txt',
        ]);

        /*
         * LEER LA PLANTILLA
         */
        $plantillaHtml = file_get_contents(
            $request->file('plantilla')->getRealPath()
        );

        /*
         * ABRIR CSV
         */
        $csvPath = $request->file('csv')->getRealPath();

        $fileHandle = fopen($csvPath, 'r');

        if ($fileHandle === false) {
            return back()->withErrors([
                'csv' => 'No fue posible abrir el archivo CSV.'
            ]);
        }

        /*
         * LEER ENCABEZADOS
         */
        $encabezados = fgetcsv($fileHandle, 0, ',');

        if ($encabezados === false) {
            fclose($fileHandle);

            return back()->withErrors([
                'csv' => 'El archivo CSV está vacío.'
            ]);
        }

        /*
         * LIMPIAR ENCABEZADOS
         */
        $encabezados = array_map(
            fn ($encabezado) => trim($encabezado),
            $encabezados
        );

        /*
         * PROCESAR REGISTROS
         */
        $despachados = 0;
        $errores = 0;

        while (($fila = fgetcsv($fileHandle, 0, ',')) !== false) {

            /*
             * Ignorar líneas completamente vacías
             */
            if (count(array_filter($fila, fn ($valor) => trim($valor) !== '')) === 0) {
                continue;
            }

            /*
             * Validar que columnas y valores coincidan
             */
            if (count($encabezados) !== count($fila)) {
                $errores++;
                continue;
            }

            $filaCsv = array_combine($encabezados, $fila);

            /*
             * Validar FOLIO
             */
            $folio = $filaCsv['FOLIO']
                ?? $filaCsv['folio']
                ?? null;

            if (empty(trim($folio))) {
                $errores++;
                continue;
            }

            /*
             * Mandar el registro a la cola
             */
            GenerateConvenioPdfJob::dispatch(
                $plantillaHtml,
                $filaCsv
            );

            $despachados++;
        }

        fclose($fileHandle);

        return back()->with(
            'success',
            "Se han puesto en cola {$despachados} convenios."
            . ($errores > 0 ? " Registros omitidos: {$errores}." : '')
        );
    }
}
