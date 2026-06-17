import { CodeViewer } from './code-viewer';
import { SectionContainer } from './section-container';
import { SectionContent } from './section-content';

export { SectionContainer, SectionContent, CodeViewer };

export const Section = [SectionContainer, SectionContent, CodeViewer] as const;
