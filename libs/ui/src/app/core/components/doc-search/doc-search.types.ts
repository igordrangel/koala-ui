export interface DocSearchEntry {
  id: string;
  title: string;
  category: string;
  route: string;
  fragment?: string;
  content: string;
}

export interface DocSearchResult {
  id: string;
  title: string;
  category: string;
  route: string;
  fragment?: string;
  snippet: string;
  score: number;
}
