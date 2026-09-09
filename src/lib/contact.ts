export interface ContactSubmissionPayload {
  name: string;
  email: string;
  projectType: string;
  message: string;
  company?: string;
  budget?: string;
  timeline?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<'name' | 'email' | 'projectType' | 'message', string>>;
}

export const TARGET_EMAIL = 'geet41999@gmail.com';

export function validateContactForm(data: {
  name: string;
  email: string;
  projectType: string;
  message: string;
}): ValidationResult {
  const errors: Partial<Record<'name' | 'email' | 'projectType' | 'message', string>> = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.projectType || !data.projectType.trim()) {
    errors.projectType = 'Please select a project type.';
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'Please provide a message about your project.';
  } else if (data.message.trim().length < 5) {
    errors.message = 'Message must be at least 5 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createMailtoLink(payload: Partial<ContactSubmissionPayload>): string {
  const subject = encodeURIComponent(
    payload.projectType
      ? `Project Inquiry: ${payload.projectType} — ${payload.name || 'Client'}`
      : `UI/UX Design Inquiry from ${payload.name || 'Portfolio Visitor'}`
  );

  const bodyParts = [
    payload.name ? `Name: ${payload.name}` : '',
    payload.email ? `Email: ${payload.email}` : '',
    payload.company ? `Company: ${payload.company}` : '',
    payload.projectType ? `Project Type: ${payload.projectType}` : '',
    payload.budget ? `Estimated Budget: ${payload.budget}` : '',
    payload.timeline ? `Timeline: ${payload.timeline}` : '',
    '',
    payload.message ? `Message / Overview:\n${payload.message}` : '',
  ].filter(Boolean);

  const body = encodeURIComponent(bodyParts.join('\n'));
  return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
}

export async function submitContactInquiry(payload: ContactSubmissionPayload): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim(),
        projectType: payload.projectType.trim(),
        company: payload.company?.trim() || 'N/A',
        budget: payload.budget?.trim() || 'N/A',
        timeline: payload.timeline?.trim() || 'N/A',
        message: payload.message.trim(),
        _subject: `New Portfolio Inquiry from ${payload.name.trim()} (${payload.projectType.trim()})`,
        _template: 'table',
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || `Failed to submit (status ${res.status})`);
    }

    const data = await res.json().catch(() => ({ success: 'true' }));
    return {
      success: true,
      message: data.message || `Thank you! Your message has been sent to ${TARGET_EMAIL}.`,
    };
  } catch (err: any) {
    console.error('Contact submission error:', err);
    return {
      success: false,
      message: err?.message || 'Submission encountered a network issue.',
    };
  }
}
