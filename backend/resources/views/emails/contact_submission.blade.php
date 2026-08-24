<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Contact Submission</title>
</head>
<body style="margin:0; padding:0; background:#f3f6fb; font-family: Arial, Helvetica, sans-serif; color:#1a2744;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6fb; padding:24px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                    <tr>
                        <td style="background:#092754; padding:20px 24px; color:#ffffff;">
                            <h2 style="margin:0; font-size:20px;">New Contact Submission</h2>
                            <p style="margin:4px 0 0; font-size:13px; opacity:0.8;">
                                Received {{ $submission->created_at->format('F j, Y \a\t g:i A') }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:24px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; line-height:1.6;">
                                <tr>
                                    <td style="padding:6px 0; width:120px; color:#6b7280; vertical-align:top;"><strong>Name</strong></td>
                                    <td style="padding:6px 0;">{{ $submission->name }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:6px 0; color:#6b7280; vertical-align:top;"><strong>Email</strong></td>
                                    <td style="padding:6px 0;"><a href="mailto:{{ $submission->email }}" style="color:#2563eb; text-decoration:none;">{{ $submission->email }}</a></td>
                                </tr>
                                @if($submission->phone)
                                <tr>
                                    <td style="padding:6px 0; color:#6b7280; vertical-align:top;"><strong>Phone</strong></td>
                                    <td style="padding:6px 0;">{{ $submission->phone }}</td>
                                </tr>
                                @endif
                                @if($submission->subject)
                                <tr>
                                    <td style="padding:6px 0; color:#6b7280; vertical-align:top;"><strong>Subject</strong></td>
                                    <td style="padding:6px 0;">{{ $submission->subject }}</td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="padding:6px 0; color:#6b7280; vertical-align:top;"><strong>Source</strong></td>
                                    <td style="padding:6px 0;">{{ $submission->source }}</td>
                                </tr>
                                @if($submission->locale)
                                <tr>
                                    <td style="padding:6px 0; color:#6b7280; vertical-align:top;"><strong>Locale</strong></td>
                                    <td style="padding:6px 0;">{{ $submission->locale }}</td>
                                </tr>
                                @endif
                            </table>

                            <div style="margin-top:20px; padding:16px; background:#f9fafb; border-left:4px solid #2563eb; border-radius:4px;">
                                <div style="font-weight:bold; color:#6b7280; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Message</div>
                                <div style="white-space:pre-line; font-size:14px; line-height:1.6;">{{ $submission->message }}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="background:#f3f6fb; padding:16px 24px; color:#6b7280; font-size:12px; text-align:center;">
                            You can review this submission in the admin panel at
                            <a href="{{ url('/admin/contact-submissions') }}" style="color:#2563eb; text-decoration:none;">/admin/contact-submissions</a>.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
