import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const SKELETON_PAGE = {
  pt: {
    title: 'Skeleton',
    description: 'Um componente de skeleton simples.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente skeleton.',
      },
      skeleton: {
        title: 'Skeleton',
        description: 'O skeleton é um placeholder de conteúdo carregando. Melhora a UX ao mostrar visualmente que dados estão sendo buscados ou processados.',
      },
      skeletonCircle: {
        title: 'Skeleton circular',
        description: 'Também há a variante circular, útil para avatares ou fotos de perfil em loading.',
      },
      skeletonText: {
        title: 'Skeleton de texto',
        description: 'Também há a variante de texto, útil para parágrafos ou títulos em loading.',
      },
      skeletonComposition: {
        title: 'Composição de skeleton',
        description: 'O skeleton permite composição: combine vários elementos para placeholders de loading mais complexos.',
      },
    },
  },
  en: {
    title: 'Skeleton',
    description: 'A simple skeleton component.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new skeleton component.',
      },
      skeleton: {
        title: 'Skeleton',
        description: 'The skeleton component is a placeholder that can be used to indicate that content is loading. It is commonly used to improve the user experience by providing a visual indication that data is being fetched or processed.',
      },
      skeletonCircle: {
        title: 'Skeleton circle',
        description: 'The skeleton component also supports a circular variant, which can be used to indicate loading states for circular elements such as avatars or profile pictures.',
      },
      skeletonText: {
        title: 'Skeleton text',
        description: 'The skeleton component also supports a text variant, which can be used to indicate loading states for textual content such as paragraphs or headings.',
      },
      skeletonComposition: {
        title: 'Skeleton Composition',
        description: 'The skeleton component allows for composition, enabling the creation of complex loading placeholders by combining multiple skeleton elements.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type SkeletonPageCopy = (typeof SKELETON_PAGE)[Locale];
