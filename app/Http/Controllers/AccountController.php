<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAccountRequest;
use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('accounts/index', [
            'accounts' => Account::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('accounts/create', [
            'accounts' => new Account()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountRequest $request)
    {
        $validated = $request->validated();
        $validated['type'] = ucfirst(strtolower($validated['type']));
        $validated['user_id'] = auth()->id();

        Account::create($validated);

        return redirect()->route('cuentas.index')->with('success', 'Account created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Account $account)
    {
        return inertia('accounts/show', [
            'account' => $account
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Account $account)
    {
        return inertia('accounts/edit', [
            'account' => $account
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreAccountRequest $request, Account $account)
    {
        $validated = $request->validated();
        $validated['type'] = ucfirst(strtolower($validated['type']));

        $account->update($validated);

        return redirect()->route('cuentas.index')->with('success', 'Account updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        //
    }
}
