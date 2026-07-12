<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'name', 'type', 'initial_balance'])]
class Account extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    // Calcula el balance actual de la cuenta
    public function getBalanceAttribute()
    {
        // Suma de los ingresos y gastos de la cuenta
        $ingresos = $this->transactions()->where('type', 'ingreso')->sum('amount');
        $gastos = $this->transactions()->where('type', 'gasto')->sum('amount');
        
        // Suma de las transferencias entrantes y salientes
        $transfersIn = Transaction::where('destination_account_id', $this->id)->sum('amount');
        $transfersOut = $this->transactions()->where('type', 'transferencia')->sum('amount');
        return $this->initial_balance + $ingresos - $gastos + $transfersIn - $transfersOut;
    }
}
