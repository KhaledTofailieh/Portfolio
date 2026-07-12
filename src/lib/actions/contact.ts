import personalInfo from '@/data/personal-info.json';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResult {
  success: boolean;
  message: string;
  error?: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<ContactFormResult> {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return {
        success: false,
        message: 'All fields are required.',
        error: 'MISSING_FIELDS'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.',
        error: 'INVALID_EMAIL'
      };
    }

    // Check if Web3Forms key is set
    const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (web3FormsKey) {
      // Send email using Web3Forms client-side
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Contact: ${formData.subject}`,
          message: formData.message,
          from_name: 'Portfolio Contact'
        })
      });

      const result = await response.json();
      if (result.success) {
        return {
          success: true,
          message: 'Thank you for your message! I\'ll get back to you soon.'
        };
      } else {
        console.error('Web3Forms error:', result);
        return {
          success: false,
          message: result.message || 'Failed to send email. Please try again later.',
          error: 'SEND_ERROR'
        };
      }
    } else {
      // Fallback: mailto link
      const email = personalInfo.personal.email || 'khaled.tofailieh@gmail.com';
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      // Open email client
      if (typeof window !== 'undefined') {
        window.location.href = mailtoUrl;
      }

      return {
        success: true,
        message: 'Opening your email client to send the message!'
      };
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      error: 'UNKNOWN_ERROR'
    };
  }
}
