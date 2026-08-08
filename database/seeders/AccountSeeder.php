<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
$user = User::updateOrCreate(
            ['email' => 'pzx6464@gmail.com'],
            [
                'name' => 'Ricardo Reyes',
                'password' => Hash::make('Prueba123$'),
            ]
        );

        $accounts = [
            ['name' => 'BBVA', 'type' => 'Debito', 'initial_balance' => 3767.00],
            ['name' => 'Nu', 'type' => 'Debito', 'initial_balance' => 457.24],
            ['name' => 'Mercado Pago', 'type' => 'Debito', 'initial_balance' => 3955.14],
            ['name' => 'Liverpool', 'type' => 'Credito', 'initial_balance' => -2397.00, 'cut_day' => 9, 'payment_day' => 9],
            // ['name' => 'Sears', 'type' => 'Credito', 'initial_balance' => 0.00, 'cut_day' => 17, 'payment_day' => 5],
            ['name' => 'CCP', 'type' => 'Credito', 'initial_balance' => 0.00, 'cut_day' => 25, 'payment_day' => 20],
            ['name' => 'C&A', 'type' => 'Credito', 'initial_balance' => -538.66, 'cut_day' => 25, 'payment_day' => 20],
            ['name' => 'BBVA', 'type' => 'Credito', 'initial_balance' => -239.00, 'cut_day' => 11, 'payment_day' => 31],
            ['name' => 'Mercado Pago', 'type' => 'Credito', 'initial_balance' => -1701.39, 'cut_day' => 7, 'payment_day' => 17],
            ['name' => 'Nu', 'type' => 'Credito', 'initial_balance' => -888.00, 'cut_day' => 6, 'payment_day' => 16],
            ['name' => 'Efectivo', 'type' => 'Efectivo', 'initial_balance' => 373.00],
        ];

        foreach ($accounts as $account) {
            Account::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'name' => $account['name'],
                    'type' => $account['type'],
                ],
                [
                    'initial_balance' => $account['initial_balance'],
                    'cut_day' => $account['cut_day'] ?? null,
                    'payment_day' => $account['payment_day'] ?? null,
                ]
            );
        }
    }
}
