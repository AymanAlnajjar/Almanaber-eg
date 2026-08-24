<?php

namespace App\Filament\Widgets;

use App\Models\PageView;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\Cache;

class PageViewsChartWidget extends ChartWidget
{
    protected static ?string $heading = 'Page Views — Last 30 Days';

    protected static ?int $sort = 2;

    protected int | string | array $columnSpan = 'full';

    protected static ?string $maxHeight = '300px';

    protected static ?string $pollingInterval = '300s';

    protected function getData(): array
    {
        $counts = Cache::remember('pageviews_chart_30d', 300, fn() => PageView::dailyCountsForLastDays(30));

        return [
            'datasets' => [
                [
                    'label'           => 'Page Views',
                    'data'            => array_values($counts),
                    'borderColor'     => '#3b82f6',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                    'fill'            => true,
                    'tension'         => 0.4,
                ],
            ],
            'labels' => array_map(
                fn($date) => date('M j', strtotime($date)),
                array_keys($counts)
            ),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
