<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Bike;
use App\Models\Revision;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;


class BikeController extends Controller
{
    public function index()
    {
        return Inertia::render('Bikes/Index', [
            'auth' => [
                'user' => Auth::user(),
                'roles' => Auth::user()->roles->pluck('name')->toArray() ?? [],
            ],
            'bikes' => Bike::with('user')->get(), // Incluye la relación con el usuario
            'users' => User::all(), // 🔹 Obtener todos los usuarios para el select
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'anio_modelo' => 'required|integer|min:1900|max:' . date('Y'),
        ]);

        Bike::create([
            'user_id' => $request->user_id, // 🔹 Asignar la bicicleta a un usuario existente
            'nombre' => $request->nombre,
            'marca' => $request->marca,
            'anio_modelo' => $request->anio_modelo,
        ]);

        return redirect()->route('bikes.index')->with('success', '🚴‍♂️ Bicicleta añadida correctamente.');
    }
}
