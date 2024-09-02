<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is TechnoSaas?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "TechnoSaas is a SaaS boilerplate designed to streamline your operations with pre-configured integrations and tools, helping you build your next project faster."
    }
  }, {
    "@type": "Question",
    "name": "How do I get started with TechnoSaas?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "You can get started with TechnoSaas by making a one-time payment on our website. Once your payment is processed, we'll send you a download link for the boilerplate."
    }
  }, {
    "@type": "Question",
    "name": "What integrations are included?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "TechnoSaas includes integrations with Stripe for payments, Laravel Breeze & Socialite for user authentication, and more. Check out our features section for a full list of integrations."
    }
  }, {
    "@type": "Question",
    "name": "Is TechnoSaas SEO optimized?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, TechnoSaas is built with SEO in mind. From optimized meta tags to clean HTML, our boilerplate is designed to help your application perform well online."
    }
  }, {
    "@type": "Question",
    "name": "Can I customize TechnoSaas?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Absolutely! TechnoSaas is designed to be flexible and customizable. You can tailor it to fit your specific needs and requirements."
    }
  }]
}
</script>

    <script>
        window.fbAsyncInit = function() {
            FB.init({
                appId: '496556016418900',
                xfbml: true,
                version: 'v20.0'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
    @inertia
</body>

</html>
