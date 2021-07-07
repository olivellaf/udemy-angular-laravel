export interface Movie {
  // All the attrs with "?" means that are not mandatory.
  id?: number,
  title: string,
  synopsis: string
  year: number,
  cover?: string,
  created_at?: string,
  updated_at?: string
}
