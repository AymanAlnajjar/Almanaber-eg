<?php

namespace App\Http\Controllers;

abstract class Controller
{
    /**
     * Build a public storage URL from both current disk-relative paths and
     * legacy values that already include the storage/ prefix.
     */
    protected function storageUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (preg_match('#^https?://#i', $path)) {
            return $path;
        }

        $relativePath = preg_replace('#^(?:/?storage/)+#i', '', $path);

        return asset('storage/' . ltrim($relativePath, '/'));
    }
}
