import {Movie} from "../models/movie";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {Injectable} from "@angular/core";
import {Genre} from "../models/genre";

const API_KEY = "a12bbd7f790df1979070dab035ec8ce8";

@Injectable()
export class MovieService {

  constructor(private http: HttpClient){
  }

  movies: Movie[];
  config: any;
  videos: any;
  genres: Genre[] = []
  moviesByGenre: Movie[]
  //API_KEY: string = 'a12bbd7f790df1979070dab035ec8ce8'

  loadMovies(){
    return this.movies;
  }

  fetchMovies(pageNumber: number): Observable<Movie[]> {
    let pageApiRequestString: string = ''
    if (!pageNumber) {
      pageNumber = 1
    }
    pageApiRequestString = `&page=${pageNumber}`
    const url =  `https://api.themoviedb.org/3/discover/movie?api_key=a12bbd7f790df1979070dab035ec8ce8&sort_by=popularity.desc&language=de${pageApiRequestString}`;
    return this.http.get<Movie[]>(url).pipe(
      tap(moviesTap => console.log(moviesTap)),
      map(moviesMap => this.movies = moviesMap['results']),
      catchError(
        this.handleError('fetchMovie', [])
      )
    );
  }


  fetchGenres(): Observable<Genre[]>{
    return this.http.get<any>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=de`).pipe(
      tap(genres => console.log(genres)),
      map(genres => this.genres = genres.genres),
      catchError(
        this.handleError('fetchMovies', [])
      )
    )
  }


  fetchMoviesByGenre(id: number) {
    return this.http.get<any>(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=${API_KEY}&language=de`).pipe(
      map(data => this.moviesByGenre = data),
      catchError(
        this.handleError('fetchMovies', [])
      )
    )
  }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      // this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  fetchConfig(): Observable<any> {
    const url = 'https://api.themoviedb.org/3/configuration?api_key=a12bbd7f790df1979070dab035ec8ce8';
    return this.http.get<any>(url).pipe(
      tap(config => console.log(config)),
      map(config => this.config = config),
      catchError(
        this.handleError('fetchMovie', [])
      )
    );
  }

  fetchTrailer(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=a12bbd7f790df1979070dab035ec8ce8&language=de`).pipe(
      map(videos => this.videos = videos),
      catchError(
        this.handleError('fetchMovies', [])
      )
    )
  }
}
