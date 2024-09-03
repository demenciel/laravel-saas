<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DownloadLinkEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $downloadLink;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($downloadLink)
    {
        $this->downloadLink = $downloadLink;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Your Download is Ready!')
            ->markdown('emails.downloadlink', [
                'downloadLink' => $this->downloadLink,
            ]);
    }
}
