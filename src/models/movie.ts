export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genre_ids: number[];
  video: boolean;
  backdrop_path: string;
  release_date: string;
  tag_line: string;
  original_title: string;
}
