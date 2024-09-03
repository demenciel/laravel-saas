<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate the sitemap.xml file';

    public function handle()
    {
        // Create a new sitemap
        $sitemap = Sitemap::create()
            ->add(Url::create('/')->setPriority(1.0))
            ->add(Url::create('/welcome')->setPriority(1))
            /* ->add(Url::create('/pricing')->setPriority(0.8))
            ->add(Url::create('/contact')->setPriority(0.7))
            ->add(Url::create('/features')->setPriority(0.6))
            ->add(Url::create('/faq')->setPriority(0.5)) */
            ->add(Url::create('/dashboard')->setPriority(0.6));

        // You can add more URLs as needed

        // Write the sitemap to the public directory
        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully.');
    }
}
