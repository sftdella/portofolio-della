import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { Education } from '../components/sections/Education';
import { Hero } from '../components/sections/Hero';
import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLanguage } from '../i18n/LanguageContext';
import { strings } from '../i18n/strings';

export function HomePage() {
  const { t } = useLanguage();
  useDocumentMeta(t(strings.meta.title), t(strings.meta.description));

  return (
    <>
      <Hero />
      <About index="01" />
      <Projects index="02" />
      <Skills index="03" />
      <Education index="04" />
      <Contact index="05" />
    </>
  );
}
