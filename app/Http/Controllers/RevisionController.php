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

class RevisionController extends Controller
{
    /**
     * Mostrar todas las revisiones de una bicicleta
     */
    public function index(Bike $bike)
    {
        return Inertia::render('Revisions/Index', [
            'auth' => [
                'user' => auth()->user(),
                'roles' => auth()->user()->roles->pluck('name')->toArray(),
            ],
            'bike' => $bike,
            'revisions' => $bike->revisions()->orderByDesc('fecha_revision')->get(),
        ]);
    }

    /**
     * Formulario para añadir una nueva revisión
     */
    public function create(Bike $bike)
    {
        return Inertia::render('Revisions/Create', [
            'auth' => [
                'user' => auth()->user(),
                'roles' => auth()->user()->roles->pluck('name')->toArray(),
            ],
            'bike' => $bike,
        ]);
    }

    /**
     * Guardar una nueva revisión
     */
    public function store(Request $request, Bike $bike)
    {
        $validated = $request->validate([
            'componente' => 'required|string|max:255',
            'fecha_revision' => 'required|date',
            'descripcion' => 'required|string',
            'proxima_revision' => 'nullable|date',
        ]);
    
        $bike->revisions()->create($validated);
    
        return redirect()->route('bikes.revisions.index', ['bike' => $bike->id])
            ->with('success', '✅ Revisión añadida correctamente.');
    }
    
}
