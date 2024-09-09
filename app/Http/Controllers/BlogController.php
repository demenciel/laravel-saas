<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('author')->get();
        if (Auth::user()->role->name == 'admin') {
            return Inertia::render('Blogs/AdminIndex', [
                'blogs' => $blogs,
                'appUrl' => env('APP_URL'),
            ]);
        }
        return Inertia::render('Blogs/Index', [
            'blogs' => $blogs,
            'appUrl' => env('APP_URL'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Blogs/Create', [
            'appUrl' => env('APP_URL'),
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|max:255|unique:blogs,title',
                'sub_header' => 'required|max:255',
                'body' => 'required',
                'meta_title' => 'nullable|max:255',
                'meta_description' => 'nullable',
                'meta_keywords' => 'nullable',
                'meta_image' => 'nullable|string',
                'alt_text_image' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'slug' => 'nullable|max:255',
                'author_id' => 'nullable|exists:users,id',
            ]);

            $validated['author_id'] = Auth::user()->id;
            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('blogs', 'public');
                $validated['alt_text_image'] = $request->file('image')->getClientOriginalName();
            }

            Blog::create($validated);
            return redirect()->route('blog.index')->with('success', 'Blog created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error($e);
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error($e);
            return back()->with('error', 'An error occurred while creating the blog.')->withInput();
        }
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('Blogs/Edit', ['blog' => $blog]);
    }

    public function update(Request $request, Blog $blog)
    {
        try {
            $validated = $request->validate([
                'title' => 'nullable|max:255|unique:blogs,title',
                'sub_header' => 'nullable|max:255',
                'body' => 'nullable',
                'meta_title' => 'nullable|max:255',
                'meta_description' => 'nullable',
                'meta_keywords' => 'nullable',
                'meta_image' => 'nullable|string',
                'alt_text_image' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'slug' => 'nullable|max:255',
                'author_id' => 'nullable|exists:users,id',
            ]);

            if ($request->hasFile('image')) {
                // check if the image is different from the original
                if ($request->file('image') !== $blog->image) {
                    // delete the old image
                    Storage::delete($blog->image);
                    $validated['image'] = $request->file('image')->store('blogs', 'public');
                    $validated['alt_text_image'] = $request->file('image')->getClientOriginalName();
                }
            }
            $blog->update($validated);
            return redirect()->route('blog.index')->with('success', 'Blog updated successfully');
        } catch (\Exception $e) {
            Log::error($e);
            return back()->with('error', 'An error occurred while updating the blog.');
        }
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();
        return redirect()->route('blog.index')->with('success', 'Blog deleted successfully');
    }

    public function show(int $id)
    {
        try {
            info($id);
            $blog = Blog::with('author')->find($id);
            return Inertia::render('Blogs/Show', ['blog' => $blog, 'appUrl' => env('APP_URL')]);
        } catch (\Exception $e) {
            Log::error($e);
            return back()->with('error', 'An error occurred while fetching the blog.');
        }
    }
}
