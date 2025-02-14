<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BikeController;
use App\Http\Controllers\ComponentController;
use App\Http\Controllers\RevisionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [AuthenticatedSessionController::class, 'welcome']);

// Dashboard (requiere autenticación y verificación)
Route::get('/dashboard', [AuthenticatedSessionController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/clients', [UserController::class, 'index'])->name('clients.index');
    Route::post('/clients', [UserController::class, 'store'])->name('clients.store');
    Route::put('/clients/{user}', [UserController::class, 'update'])->name('clients.update');
    Route::delete('/clients/{user}', [UserController::class, 'destroy'])->name('clients.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/bikes', [BikeController::class, 'index'])->name('bikes.index');
    Route::post('/bikes', [BikeController::class, 'store'])->name('bikes.store');
});

Route::middleware(['auth'])->group(function () {
    // Página que muestra las revisiones de una bicicleta
    Route::get('/bikes/{bike}/revisions', [RevisionController::class, 'index'])->name('bikes.revisions.index');

    // Formulario para añadir una revisión
    Route::get('/bikes/{bike}/revisions/create', [RevisionController::class, 'create'])->name('revisions.create');

    // Guardar una nueva revisión
    Route::post('/bikes/{bike}/revisions', [RevisionController::class, 'store'])->name('revisions.store');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/components', [ComponentController::class, 'index'])->name('components.index');
Route::get('/components/create', [ComponentController::class, 'create'])->name('components.create');
Route::post('/components', [ComponentController::class, 'store'])->name('components.store');
Route::get('/components/{component}/edit', [ComponentController::class, 'edit'])->name('components.edit');
Route::put('/components/{component}', [ComponentController::class, 'update'])->name('components.update');
Route::delete('/components/{component}', [ComponentController::class, 'destroy'])->name('components.destroy');
});




require __DIR__.'/auth.php';
