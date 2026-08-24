<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_en',
        'name_ar',
        'position_en',
        'position_ar',
        'bio_en',
        'bio_ar',
        'image',
        'email',
        'phone',
        'linkedin',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
