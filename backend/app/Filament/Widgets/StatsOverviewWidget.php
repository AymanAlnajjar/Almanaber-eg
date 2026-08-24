<?php

namespace App\Filament\Widgets;

use App\Models\ContactSubmission;
use App\Models\PageView;
use App\Models\Project;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Cache;

class StatsOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected static ?string $pollingInterval = '60s';

    protected function getStats(): array
    {
        $data = Cache::remember('dashboard_stats', 60, function () {
            return [
                'todayViews'       => PageView::todayCount(),
                'monthViews'       => PageView::thisMonthCount(),
                'totalSubmissions' => ContactSubmission::count(),
                'unreadLeads'      => ContactSubmission::where('is_read', false)->count(),
                'thisMonthLeads'   => ContactSubmission::whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->count(),
                'totalProjects'    => Project::where('is_published', true)->count(),
                'last7Days'        => array_values(PageView::dailyCountsForLastDays(7)),
            ];
        });

        return [
            Stat::make('Visitors Today', number_format($data['todayViews']))
                ->description('Page views today')
                ->descriptionIcon('heroicon-m-eye')
                ->color('info')
                ->chart($data['last7Days']),

            Stat::make('Visitors This Month', number_format($data['monthViews']))
                ->description('Total page views this month')
                ->descriptionIcon('heroicon-m-chart-bar')
                ->color('success'),

            Stat::make('Unread Leads', number_format($data['unreadLeads']))
                ->description("{$data['thisMonthLeads']} new this month")
                ->descriptionIcon('heroicon-m-envelope')
                ->color($data['unreadLeads'] > 0 ? 'warning' : 'success'),

            Stat::make('Total Form Submissions', number_format($data['totalSubmissions']))
                ->description('All contact form submissions')
                ->descriptionIcon('heroicon-m-chat-bubble-left-right')
                ->color('primary'),

            Stat::make('Published Projects', number_format($data['totalProjects']))
                ->description('Live on the website')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('gray'),
        ];
    }
}
