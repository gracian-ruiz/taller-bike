<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;

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
            'password' => 'required|min:6|confirmed',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('clients.index')->with('success', 'Cliente añadido correctamente.');
    }
}
