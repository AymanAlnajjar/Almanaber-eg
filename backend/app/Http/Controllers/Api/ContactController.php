<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactSubmissionReceived;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Store a new contact submission from the public website.
     *
     * POST /api/contact
     *
     * Body: name, email, phone?, subject?, message, source?, locale?
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:50',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
            'source'  => 'nullable|string|max:255',
            'locale'  => 'nullable|string|max:8',
            // Honeypot — real humans will leave this blank. Bots tend to fill everything.
            'website' => 'nullable|size:0',
        ]);

        // Silently drop obvious bot submissions (honeypot filled)
        if (!empty($request->input('website'))) {
            return response()->json(['success' => true], 200);
        }

        $submission = ContactSubmission::create([
            'name'       => $validated['name'],
            'email'      => $validated['email'],
            'phone'      => $validated['phone']   ?? null,
            'subject'    => $validated['subject'] ?? null,
            'message'    => $validated['message'],
            'source'     => $validated['source']  ?? 'contact-page',
            'locale'     => $validated['locale']  ?? null,
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 512),
        ]);

        // Send a notification email. We don't want a mail failure to break the
        // user-facing form submission, so we wrap it in a try/catch.
        try {
            $recipient = config('mail.contact_recipient', 'aaalnajjar@almnabr.com');
            Mail::to($recipient)->send(new ContactSubmissionReceived($submission));
        } catch (\Throwable $e) {
            Log::error('Failed to send contact notification email', [
                'error'         => $e->getMessage(),
                'submission_id' => $submission->id,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Submission received',
            'id'      => $submission->id,
        ], 201);
    }
}
