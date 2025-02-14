<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Bike;
use App\Models\Revision;
use App\Models\Component;
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
            'revisions' => $bike->revisions()->with('componente')->get(), // 👈 Asegurar que se cargue el componente
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
            'componentes' => Component::all(), // 🔹 Enviar lista de componentes a la vista
        ]);
    }
    

    /**
     * Guardar una nueva revisión
     */
    public function store(Request $request, Bike $bike)
    {
        $validated = $request->validate([
            'componente_id' => 'required|exists:components,id',
            'fecha_revision' => 'required|date',
            'descripcion' => 'required|string',
            'proxima_revision' => 'nullable|date',
        ]);
    
        // Guardar revisión con el ID del componente
        $revision = $bike->revisions()->create($validated);
    
        return redirect()->route('bikes.revisions.index', ['bike' => $bike->id])
            ->with('success', '✅ Revisión añadida correctamente.');
    }
    
    
    
}
