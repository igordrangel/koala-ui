export type DocSectionCopy = {
  title: string;
  description?: string;
  // Extra nested copy (cards, api, otherProse, previewProse, …)
  [key: string]: any;
};

export type DocPageCopy = {
  title: string;
  description: string;
  sections: Record<string, DocSectionCopy>;
};
