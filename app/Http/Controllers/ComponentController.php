<?php

namespace App\Http\Controllers;

use App\Models\Component;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComponentController extends Controller
{
    public function index()
    {
        return Inertia::render('Components/Index', [
            'auth' => [
                'user' => auth()->user(),
                'roles' => auth()->user()->roles->pluck('name')->toArray(),
            ],
            'components' => Component::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'fecha_preaviso' => 'nullable|string',
        ]);

        Component::create($request->all());

        return redirect()->route('components.index')->with('success', '✅ Componente creado correctamente.');
    }

    public function edit(Component $component)
    {
        return Inertia::render('Components/Edit', [
            'component' => $component,
        ]);
    }

    public function update(Request $request, Component $component)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'fecha_preaviso' => 'nullable|string',
        ]);

        $component->update($request->all());

        return redirect()->route('components.index')->with('success', '✅ Componente actualizado correctamente.');
    }

    public function destroy(Component $component)
    {
        $component->delete();

        return redirect()->route('components.index')->with('success', '🗑️ Componente eliminado.');
    }
}

