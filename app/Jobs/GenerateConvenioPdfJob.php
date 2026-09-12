<?php

namespace App\Jobs;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Throwable;

class GenerateConvenioPdfJob implements ShouldQueue
{
    use Queueable;

    public $tries = 3; // Número máximo de intentos en caso de fallo
    public $timeout = 120; // Tiempo máximo de ejecución en segundos

    protected string $plantillaHtml;
    protected array $filaCsv;
    /**
     * Create a new job instance.
     */
    public function __construct(string $plantillaHtml, array $filaCsv)
    {
        $this->plantillaHtml = $plantillaHtml;
        $this->filaCsv = $filaCsv;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // MAPEAR LAS VARIABLES DEL CSV
        $reemplazos = [];

        foreach ($this->filaCsv as $columna => $valor) {

            $reemplazos['{$' . strtoupper(trim($columna)) . '$}'] = trim($valor);
        }

        // REEMPLAZAR VARIABLES EN LA PLANTILLA
        $htmlProcesado = strtr(
            $this->plantillaHtml,
            $reemplazos
        );

        // OBTENER FOLIO
        $folio = $this->filaCsv['FOLIO']
            ?? $this->filaCsv['folio']
            ?? null;

        if (empty($folio)) {
            throw new \RuntimeException(
                'El registro no contiene FOLIO.'
            );
        }
        // GENERAR PDF
        $pdf = Pdf::loadHTML($htmlProcesado)
            ->setPaper('letter', 'portrait')
            ->setWarnings(false);
        // RUTA DEL PDF
        $nombreArchivo = "convenios/convenio_{$folio}.pdf";
        //  GUARDAR PDF EN STORAGE
        Storage::put(
            $nombreArchivo,
            $pdf->output()
        );
        // LIMPIAR MEMORIA
        unset(
            $pdf,
            $htmlProcesado,
            $reemplazos
        );

        gc_collect_cycles();
    }

    // SE EJECUTA CUANDO EL JOB FALLA
    public function failed(?Throwable $exception): void
    {
        Log::error('Falló generación de convenio', [
            'folio' => $this->filaCsv['FOLIO']
                ?? $this->filaCsv['folio']
                ?? null,

            'error' => $exception?->getMessage(),
        ]);
    }
}
