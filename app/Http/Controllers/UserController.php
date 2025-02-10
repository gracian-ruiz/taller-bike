<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    /**
     * Muestra la lista de usuarios (Clientes).
     */
    public function index()
    {
        return Inertia::render('Users/Index', [
            'auth' => [
                'user' => Auth::user(),
                'roles' => Auth::user()->roles->pluck('name')->toArray() ?? [],
            ],
            'users' => User::all(),
        ]);
    }

    /**
     * Almacena un nuevo usuario (Cliente).
     */
    public function store(StoreUserRequest $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('clients.index')->with('success', 'Cliente añadido correctamente.');
    }


    public function update(Request $request, User $user): RedirectResponse
    {
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return redirect()->route('clients.index')->with('success', '✅ Cliente actualizado correctamente.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('clients.index')->with('success', 'Cliente eliminado.');
    }
}
