<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with(['photo', 'role'])->where('role_id', 3)->get();
        $roles = Role::all();
        return Inertia::render('Users/Index', ['users' => $users, 'roles' => $roles]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'role_id' => 'required|exists:roles,id',
                'address' => 'required|string|max:255',
                'phone' => 'required|string|max:255',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role_id' => $validated['role_id'],
                'address' => $validated['address'],
                'phone' => $validated['phone'],
                'profile_photo_path' => $validated['photo'] ??  '/images/default-avatar.webp',
            ]);
            Photo::create([
                'user_id' => $user->id,
                'path' => $validated['photo'] ?? '/images/default-avatar.webp',
            ]);

            return redirect()->route('users.index')->with('success', 'User created successfully');
        } catch (\Exception $e) {
            Log::error('Error creating user', ['error' => $e]);
            return redirect()->route('users.index')->with('error', 'Error creating user');
        }
    }

    public function show(User $user)
    {
        return Inertia::render('Users/Show', ['user' => $user]);
    }

    public function edit(User $user)
    {
        try {
            return Inertia::render('Users/Edit', ['user' => $user]);
        } catch (\Exception $e) {
            return redirect()->route('users.index')->with('error', 'Error editing user');
        }
    }

    public function update(Request $request, User $user)
    {
        try {
            info('Raw request data:', $request->all());
            info('Files in request:', $request->allFiles());
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
                'phone' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'role_id' => 'required|exists:roles,id',
                'photo' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $user->update($validated);

            if ($request->hasFile('photo')) {
                $path = $request->file('photo')->store('profile-photos', 'public');
                $photo = $user->photo ?? new Photo();
                $photo->path = $path;
                $photo->user_id = $user->id;
                $photo->save();
            }
            return redirect()->route('users.index')->with('success', 'User updated successfully');
        } catch (\Exception $e) {
            Log::error('Error updating user', ['error' => $e]);
            return redirect()->route('users.index')->with('error', 'Error updating user');
        }
    }

    public function destroy(User $user)
    {
        try {
            $user->delete();
            return redirect()->route('users.index')->with('success', 'User deleted successfully');
        } catch (\Exception $e) {
            Log::error('Error deleting user', ['error' => $e]);
            return redirect()->route('users.index')->with('error', 'Error deleting user');
        }
    }
}
