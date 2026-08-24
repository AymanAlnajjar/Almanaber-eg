<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Create or update the production admin user.
     *
     * Credentials are read from environment variables so they are
     * never hard-coded in source control.
     *
     * Required in .env (server):
     *   ADMIN_EMAIL    — admin login email
     *   ADMIN_PASSWORD — admin login password
     *   ADMIN_NAME     — display name (default: "Admin")
     */
    public function run(): void
    {
        $email    = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');

        if (!$email || !$password) {
            $this->command->warn('AdminUserSeeder skipped: ADMIN_EMAIL or ADMIN_PASSWORD is not set in .env.');
            return;
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name'     => env('ADMIN_NAME', 'Admin'),
                'email'    => $email,
                'password' => Hash::make($password),
            ]
        );

        $this->command->info("Admin user [{$email}] created or updated.");
    }
}
