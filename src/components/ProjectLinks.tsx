import type { Project } from '../data/types';
import { useLanguage } from '../i18n/LanguageContext';
import { strings } from '../i18n/strings';
import { Icon } from './Icon';

/** Tautan demo (bila ada) & GitHub (tab baru) untuk sebuah proyek. */
export function ProjectLinks({ project, size }: { project: Project; size?: 'sm' }) {
  const { t } = useLanguage();
  const sz = size ? ` btn--${size}` : '';
  return (
    <>
      {project.demoUrl && (
        <a className={`btn${sz}`} href={project.demoUrl} target="_blank" rel="noopener noreferrer">
          {t(strings.projects.demo)} <Icon name="arrowUpRight" />
          <span className="visually-hidden"> — {project.name} {t(strings.projects.opensNewTab)}</span>
        </a>
      )}
      <a className={`btn${sz}`} href={project.repoUrl} target="_blank" rel="noopener noreferrer">
        <Icon name="github" /> {t(strings.projects.code)}
        <span className="visually-hidden"> — {project.name} {t(strings.projects.opensNewTab)}</span>
      </a>
    </>
  );
}
