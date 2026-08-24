<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageView extends Model
{
    protected $fillable = [
        'path',
        'locale',
        'ip_address',
        'user_agent',
        'referrer',
    ];

    public static function todayCount(): int
    {
        return static::whereDate('created_at', today())->count();
    }

    public static function thisMonthCount(): int
    {
        return static::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
    }

    public static function dailyCountsForLastDays(int $days = 30): array
    {
        $results = static::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays($days))
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('count', 'date')
            ->toArray();

        $filled = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $filled[$date] = $results[$date] ?? 0;
        }

        return $filled;
    }
}
