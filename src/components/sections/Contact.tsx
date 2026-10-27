import { useState } from 'react';
import { profile } from '../../data/profile';
import { useLanguage } from '../../i18n/LanguageContext';
import { strings } from '../../i18n/strings';
import { DownloadPdfButton } from '../DownloadPdfButton';
import { Icon } from '../Icon';

export function Contact({ index }: { index: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const { email, github, linkedin } = profile.contact;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API tidak tersedia; tautan mailto tetap bisa dipakai.
    }
  }

  return (
    <section id="contact" className="section contact on-dark" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="reveal">
          <p className="section-heading__label">
            <span className="section-heading__index serif">{index}</span>
            <span>{t(strings.sections.contact)}</span>
          </p>
          <h2 id="contact-title" className="contact__title serif">
            {t(strings.contact.title)}
          </h2>
          <p className="contact__body">{t(strings.contact.body)}</p>
        </div>

        <div className="contact__card reveal">
          <p className="contact__label">{t(strings.contact.email)}</p>
          <a className="contact__email" href={`mailto:${email}`}>
            {email}
          </a>
          <div className="contact__actions">
            <a className="btn btn--wood" href={`mailto:${email}`}>
              <Icon name="mail" /> {t(strings.contact.email)}
            </a>
            <button type="button" className="btn" onClick={copyEmail}>
              <Icon name={copied ? 'check' : 'copy'} /> {t(copied ? strings.contact.copied : strings.contact.copy)}
            </button>
          </div>
          <ul role="list" className="contact__links">
            <li>
              <a href={github.url} target="_blank" rel="noopener noreferrer">
                <Icon name="github" /> {github.label}
              </a>
            </li>
            <li>
              <a href={linkedin.url} target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" /> {linkedin.label}
              </a>
            </li>
          </ul>
          <DownloadPdfButton variant="default" />
        </div>
      </div>
    </section>
  );
}
