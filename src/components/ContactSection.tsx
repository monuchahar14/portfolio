import React, { useState } from 'react';
import { PROFILE } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(PROFILE.email);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const validate = (formValues: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    if (formValues.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!EMAIL_REGEX.test(formValues.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (formValues.subject.trim().length < 3) {
      nextErrors.subject = 'Please provide a brief subject (at least 3 characters).';
    }
    if (formValues.message.trim().length < 10) {
      nextErrors.message = 'Please write a message of at least 10 characters.';
    }
    return nextErrors;
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setValues({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 750);
  };

  return (
    <section
      className="max-w-7xl mx-auto px-margin-sm sm:px-margin lg:px-margin-lg py-space-xl relative scroll-mt-20"
      id="contact"
    >
      <div className="flex flex-col gap-space-lg">
        {/* Section Header */}
        <div className="flex flex-col gap-1 reveal-on-scroll">
          <span className="font-label-code text-label-code text-primary uppercase tracking-wider">
            // 05. GET IN TOUCH
          </span>
          <h2 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface">
            Let&apos;s Connect
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Have an opportunity, internship vacancy, project idea, or just want to chat about
            Python and software architecture? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-space-md reveal-on-scroll">
            {/* Email Box with Copy Feature & Feedback Toast */}
            <SpotlightCard className="p-space-lg rounded-xl bg-surface-container-low/90 border border-outline-variant/30 shadow-sm flex flex-col gap-space-sm relative">
              <div className="flex items-center justify-between">
                <span className="font-label-code text-label-code text-primary font-medium">
                  DIRECT EMAIL
                </span>
                <span className="font-label-badge text-label-badge text-primary uppercase opacity-80">
                  Instant Copy
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 p-space-sm rounded-lg bg-surface-container-high border border-outline-variant/30 group">
                <span
                  className="font-label-code text-label-code text-on-surface truncate"
                  id="contact-email"
                >
                  {PROFILE.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy Email to Clipboard"
                  className="p-1.5 rounded-lg bg-surface hover:bg-surface-bright text-primary active:scale-95 transition-all flex items-center justify-center border border-outline-variant/20 cursor-pointer shrink-0"
                  title="Copy to Clipboard"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedEmail ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
              {copiedEmail && (
                <div className="flex items-center gap-1.5 text-primary font-label-badge text-label-badge animate-card-enter">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  <span>Email copied to clipboard!</span>
                </div>
              )}
            </SpotlightCard>

            {/* Profiles Grid with Interactive Hover Cards */}
            <div className="grid grid-cols-2 gap-space-sm">
              <a
                className="interactive-card p-space-md rounded-xl bg-surface-container-low/90 border border-outline-variant/30 shadow-sm flex flex-col gap-2 hover:border-primary/50 transition-all group"
                href={PROFILE.githubUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-primary text-[24px] group-hover:scale-110 transition-transform">
                    deployed_code
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    open_in_new
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">
                    GitHub
                  </h4>
                  <span className="font-label-code text-label-code text-on-surface-variant block truncate">
                    {PROFILE.githubHandle}
                  </span>
                </div>
              </a>

              <a
                className="interactive-card p-space-md rounded-xl bg-surface-container-low/90 border border-outline-variant/30 shadow-sm flex flex-col gap-2 hover:border-primary/50 transition-all group"
                href={PROFILE.linkedinUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-primary text-[24px] group-hover:scale-110 transition-transform">
                    badge
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    open_in_new
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-medium">
                    LinkedIn
                  </h4>
                  <span className="font-label-code text-label-code text-on-surface-variant block truncate">
                    {PROFILE.linkedinHandle}
                  </span>
                </div>
              </a>
            </div>

            {/* Opportunities Notice */}
            <SpotlightCard className="p-space-lg rounded-xl bg-surface-container-high/90 border border-outline-variant/30 shadow-md flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[24px] select-none">
                verified
              </span>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Opportunities Welcomed
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Currently seeking Software Development Internships, open-source collaborative
                  projects, and junior software engineer roles.
                </p>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Glassmorphic Contact Form with Reactive Focus Rings & Validation */}
          <div className="lg:col-span-7 p-space-lg sm:p-space-xl rounded-xl bg-surface-container-low/90 border border-outline-variant/30 shadow-xl reveal-on-scroll">
            <form className="space-y-space-md" id="portfolio-contact-form" noValidate onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-code text-label-code text-on-surface" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    className={`w-full px-space-md py-3 rounded-lg bg-surface-container-lowest border text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:outline-none focus:ring-2 transition-all shadow-inner ${
                      errors.name
                        ? 'border-error focus:border-error focus:ring-error/40'
                        : 'border-outline-variant/40 focus:border-primary focus:ring-primary/40'
                    }`}
                    id="name"
                    placeholder="e.g. Linus Torvalds"
                    type="text"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && (
                    <span className="font-body-sm text-[12px] text-error">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-code text-label-code text-on-surface" htmlFor="email">
                    Your Email
                  </label>
                  <input
                    className={`w-full px-space-md py-3 rounded-lg bg-surface-container-lowest border text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:outline-none focus:ring-2 transition-all shadow-inner ${
                      errors.email
                        ? 'border-error focus:border-error focus:ring-error/40'
                        : 'border-outline-variant/40 focus:border-primary focus:ring-primary/40'
                    }`}
                    id="email"
                    placeholder="e.g. linus@kernel.org"
                    type="email"
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <span className="font-body-sm text-[12px] text-error">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-code text-label-code text-on-surface" htmlFor="subject">
                  Subject
                </label>
                <input
                  className={`w-full px-space-md py-3 rounded-lg bg-surface-container-lowest border text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:outline-none focus:ring-2 transition-all shadow-inner ${
                    errors.subject
                      ? 'border-error focus:border-error focus:ring-error/40'
                      : 'border-outline-variant/40 focus:border-primary focus:ring-primary/40'
                  }`}
                  id="subject"
                  placeholder="e.g. Software Developer Internship Opportunity"
                  type="text"
                  value={values.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  aria-invalid={Boolean(errors.subject)}
                />
                {errors.subject && (
                  <span className="font-body-sm text-[12px] text-error">{errors.subject}</span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-code text-label-code text-on-surface" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  className={`w-full px-space-md py-3 rounded-lg bg-surface-container-lowest border text-on-surface font-body-md text-body-md placeholder:text-outline/70 focus:outline-none focus:ring-2 transition-all shadow-inner resize-none ${
                    errors.message
                      ? 'border-error focus:border-error focus:ring-error/40'
                      : 'border-outline-variant/40 focus:border-primary focus:ring-primary/40'
                  }`}
                  id="message"
                  placeholder="Write your message here..."
                  rows={5}
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && (
                  <span className="font-body-sm text-[12px] text-error">{errors.message}</span>
                )}
              </div>

              {/* Submit Button with Dynamic Feedback */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-2">
                <button
                  className={`inline-flex items-center justify-center gap-space-sm px-space-xl py-3 rounded-lg bg-primary text-on-primary font-label-nav text-label-nav font-semibold hover:bg-primary-fixed-dim hover:shadow-[0_0_24px_rgba(192,193,255,0.45)] hover:scale-105 active:scale-95 transition-all shadow-md group cursor-pointer ${
                    isSubmitting ? 'opacity-75 pointer-events-none' : ''
                  }`}
                  disabled={isSubmitting}
                  id="submit-btn"
                  type="submit"
                >
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                  <span
                    className={`material-symbols-outlined text-[18px] transition-transform ${
                      isSubmitting ? 'animate-spin' : 'group-hover:translate-x-1'
                    }`}
                  >
                    {isSubmitting ? 'sync' : 'send'}
                  </span>
                </button>

                {isSubmitted && (
                  <div
                    className="flex items-center gap-1.5 font-label-badge text-label-badge text-primary animate-card-enter"
                    id="form-feedback"
                  >
                    <span className="material-symbols-outlined text-[18px]">task_alt</span>
                    <span>Thank you! Message dispatched to Monu.</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
