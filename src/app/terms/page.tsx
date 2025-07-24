import PageHeader from '@/components/shared/page-header';
import { ScrollText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-6">
      <PageHeader
        title="Terms and Conditions"
        subtitle="Please read these terms carefully before using our services"
        icon={ScrollText}
      />

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the EDM (Evangelism, Discipleship, Missions) website and services,
            you acknowledge that you have read, understood, and agree to be bound by these Terms and
            Conditions. These terms apply to all visitors, users, and others who access or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2>2. Use of Services</h2>
          <p>
            Our services are provided for charitable and religious purposes. You agree to use our
            services only for lawful purposes and in accordance with these Terms. You agree not to use
            our services:
          </p>
          <ul>
            <li>In any way that violates any applicable laws or regulations</li>
            <li>To harass, abuse, or harm another person or group</li>
            <li>To impersonate or attempt to impersonate EDM, an EDM employee, or another user</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use of our services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>3. Donations and Financial Transactions</h2>
          <p>
            When making donations through our platform:
          </p>
          <ul>
            <li>All donations are final and non-refundable</li>
            <li>You agree to provide accurate and complete payment information</li>
            <li>You acknowledge that we operate as a registered 501(c)(3) non-profit organization</li>
            <li>Tax receipts will be provided for eligible donations as per applicable laws</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>4. Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. Our use of your personal information is governed by our
            Privacy Policy. By using our services, you consent to our collection and use of your
            information as described in our Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2>5. Intellectual Property</h2>
          <p>
            The content, features, and functionality of our website are owned by EDM and are protected
            by copyright, trademark, and other intellectual property laws. You may not reproduce,
            distribute, modify, or create derivative works of our content without express permission.
          </p>
        </section>

        <section className="mb-8">
          <h2>6. Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" and "as available" without any warranties of any kind,
            either express or implied. We do not guarantee that our services will be uninterrupted,
            secure, or error-free.
          </p>
        </section>

        <section className="mb-8">
          <h2>7. Limitation of Liability</h2>
          <p>
            EDM shall not be liable for any indirect, incidental, special, consequential, or punitive
            damages arising from your use of our services or any content provided therein.
          </p>
        </section>

        <section className="mb-8">
          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any
            material changes by posting the new terms on this site. Your continued use of our services
            after such modifications constitutes your acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2>9. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <ul>
            <li>Email: <a href="mailto:contact@edmmission.org" className="text-primary hover:underline">contact@edmmission.org</a></li>
            <li>Address: 12301 South East Stephens Street, Portland, Oregon 97233, USA</li>
          </ul>
        </section>

        <footer className="text-sm text-muted-foreground mt-12 pt-4 border-t">
          <p>Last updated: July 23, 2025</p>
          <p>
            These terms and conditions constitute a legally binding agreement between you and EDM
            (Evangelism, Discipleship, Missions).
          </p>
        </footer>
      </div>
    </div>
  );
}
