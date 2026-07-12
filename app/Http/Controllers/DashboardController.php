<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // 1. Traer las cuentas incluyendo su saldo calculado
        $accounts = $user->accounts->map(function ($account) {
            return [
                'id' => $account->id,
                'name' => $account->name,
                'type' => $account->type,
                'balance' => $account->balance, // Llama al método que creamos arriba
            ];
        });

        // 2. Calcular los KPI globales del mes actual
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        $totalIncome = $user->transactions()
            ->where('type', 'ingreso')
            ->whereBetween('transaction_date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        $totalExpense = $user->transactions()
            ->where('type', 'gasto')
            ->whereBetween('transaction_date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        return Inertia::render('dashboard', [
            'accounts' => $accounts,
            'total_balance' => $accounts->sum('balance'),
            'month_income' => $totalIncome,
            'month_expense' => $totalExpense,
            'recent_transactions' => $user->transactions()->with(['category', 'account'])->latest()->take(5)->get()
        ]);
    }
}
