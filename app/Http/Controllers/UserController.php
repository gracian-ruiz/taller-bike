<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Muestra la lista de usuarios (Clientes).
     */
    public function index()
    {
        return Inertia::render('Users/Index', [
            'auth' => [
                'user' => auth()->user(),
                'roles' => auth()->user()->roles->pluck('name')->toArray(), // ✅ Ahora pasamos roles
            ],
            'users' => User::select('id', 'name', 'email', 'created_at')->get(),
        ]);
    }
    

    /**
     * Almacena un nuevo usuario (Cliente).
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6', // Agregar contraseña si es un usuario nuevo
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Se almacena encriptado
        ]);

        return redirect()->route('users.index')->with('success', 'Cliente agregado correctamente');
    }
}
