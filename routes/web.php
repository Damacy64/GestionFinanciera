<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/cuentas', [AccountController::class, 'index'])->name('cuentas.index');
Route::get('/cuentas/create', [AccountController::class, 'create'])->name('cuentas.create');
Route::post('/cuentas', [AccountController::class, 'store'])->name('cuentas.store');
Route::get('/cuentas/{account}/edit', [AccountController::class, 'edit'])->name('cuentas.edit');
Route::put('/cuentas/{account}', [AccountController::class, 'update'])->name('cuentas.update');
Route::get('/cuentas/{account}', [AccountController::class, 'show'])->name('cuentas.show');

// Categorias
Route::get('/categorias', [CategoryController::class, 'index'])->name('categorias.index');
Route::get('/categorias/create', [CategoryController::class, 'create'])->name('categorias.create');
Route::post('/categorias', [CategoryController::class, 'store'])->name('categorias.store');
require __DIR__.'/settings.php';
