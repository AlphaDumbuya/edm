

import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { ShieldAlert } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Privacy Policy"
        subtitle="Your privacy is important to us. This policy outlines how we collect, use, and protect your information related to our work in Sierra Leone and partnerships in Oregon, USA."
        icon={ShieldAlert}
      />

      <section className="prose prose-lg max-w-none dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          EDM ("us", "we", or "our") operates the [Your Website URL] website (the "Service"), with primary operations based in Sierra Leone and partnerships extending to Oregon, USA.
        </p>
        <p>
          This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy for EDM is created with the help of the Privacy Policy Generator.
        </p>
        <p>
          We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from [Your Website URL]
        </p>

        <SectionTitle title="Information Collection and Use" />
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you, relevant to our activities in Sierra Leone and Oregon.
        </p>

        <h3>Types of Data Collected</h3>

        <h4>Personal Data</h4>
        <p>
          While using our Service, particularly when engaging with our Sierra Leonean operations or Oregon-based partnerships, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
        </p>
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, State, Province, ZIP/Postal code, City (relevant to Sierra Leone or Oregon as applicable)</li>
          <li>Cookies and Usage Data</li>
        </ul>

        <h4>Usage Data</h4>
        <p>
          We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
        </p>

        <h4>Tracking & Cookies Data</h4>
        <p>
          We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
        </p>
        <p>
          Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
        </p>
        <p>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </p>
        <p>Examples of Cookies we use:</p>
        <ul>
          <li><strong>Session Cookies.</strong> We use Session Cookies to operate our Service.</li>
          <li><strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and various settings.</li>
          <li><strong>Security Cookies.</strong> We use Security Cookies for security purposes.</li>
        </ul>

        <SectionTitle title="Use of Data" />
        <p>EDM uses the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain the Service, supporting our mission in Sierra Leone and Oregon</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
          <li>To provide customer care and support</li>
          <li>To provide analysis or valuable information so that we can improve the Service</li>
          <li>To monitor the usage of the Service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <SectionTitle title="Transfer of Data" />
        <p>
          Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction. Our primary data processing occurs in Sierra Leone, with some data related to US partnerships potentially processed or stored in the USA.
        </p>
        <p>
          If you are located outside Sierra Leone or the USA and choose to provide information to us, please note that we transfer the data, including Personal Data, to Sierra Leone and/or the USA and process it there.
        </p>
        <p>
          Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
        </p>
        <p>
          EDM will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
        </p>

        <SectionTitle title="Disclosure of Data" />
        <h3>Legal Requirements</h3>
        <p>
          EDM may disclose your Personal Data in the good faith belief that such action is necessary to:
        </p>
        <ul>
          <li>To comply with a legal obligation in Sierra Leone or other relevant jurisdictions like the USA</li>
          <li>To protect and defend the rights or property of EDM</li>
          <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
          <li>To protect the personal safety of users of the Service or the public</li>
          <li>To protect against legal liability</li>
        </ul>

        <SectionTitle title="Security of Data" />
        <p>
          The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>

        <SectionTitle title="Service Providers" />
        <p>
          We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These providers may operate in Sierra Leone, the USA, or other locations.
        </p>
        <p>
          These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </p>

        <SectionTitle title="Links to Other Sites" />
        <p>
          Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
        </p>
        <p>
          We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
        </p>

        <SectionTitle title="Children's Privacy" />
        <p>
          Our Service does not address anyone under the age of 18 ("Children").
        </p>
        <p>
          We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
        </p>

        <SectionTitle title="Changes to This Privacy Policy" />
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        <p>
          We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>

        <SectionTitle title="Contact Us" />
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul>
          <li>By email: <a href="mailto:contact@edmmission.org" className="text-primary hover:underline">contact@edmmission.org</a></li>
          <li>By visiting this page on our website: [Your Contact Page URL]</li>
          <li>By mail: 66 Main Grafton Road, Kossoh Town, Freetown, Sierra Leone</li>
        </ul>
      </section>
    </div>
  );
}
