@component('mail::message')
# Your Download is Ready!

Thank you for your purchase! We're thrilled that you've chosen our product. Your download is now ready and waiting for you. Click the button below to get started:

@component('mail::button', ['url' => $downloadLink, 'color' => 'success'])
Download Your File
@endcomponent

If you encounter any issues or have questions, our support team is here to help. Don't hesitate to reach out!

---

**Disclaimer:** This download link is valid for a single use. If you have already downloaded the file, this link will no longer work.

Best regards,  
The {{ config('app.name') }} Team

© {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
@endcomponent

