<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    protected $table = 'contact_submissions';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'source',
        'is_read',
        'is_archived',
        'ip_address',
        'user_agent',
        'locale',
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'is_archived' => 'boolean',
    ];
}
