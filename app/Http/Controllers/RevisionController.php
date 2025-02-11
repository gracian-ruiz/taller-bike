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
    public function store(Request $request, Bike $bike)
    {
        $request->validate([
            'fecha_revision' => 'required|date',
            'descripcion' => 'required|string',
            'proxima_revision' => 'nullable|date',
        ]);

        $bike->revisions()->create($request->all());

        return redirect()->route('bikes.index')->with('success', 'Revisión registrada.');
    }
}

