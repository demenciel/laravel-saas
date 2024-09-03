@component('mail::message')
    <div style="text-align: center; margin-bottom: 30px;">
        <img src="{{ asset('/Logo.png') }}" alt="{{ config('app.name') }} Logo" style="max-width: 200px;">
    </div>

    <h1 style="color: #3d4852; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px;">Your Download is
        Ready!</h1>

    <p style="color: #3d4852; font-size: 16px; line-height: 1.5em; margin-bottom: 20px;">
        Thank you for your purchase. We're excited for you to start using our product! You can download your file using the
        button below:
    </p>

    @component('mail::button', ['url' => $downloadLink, 'color' => 'success'])
        Download Your File
    @endcomponent

    <p style="color: #3d4852; font-size: 16px; line-height: 1.5em; margin-top: 20px;">
        If you have any questions or need assistance, please don't hesitate to contact our support team.
    </p>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e8e5ef;">
        <p style="color: #3d4852; font-size: 14px; line-height: 1.5em; margin-bottom: 0;">
            Best regards,<br>
            The {{ config('app.name') }} Team
        </p>
    </div>
@endcomponent
