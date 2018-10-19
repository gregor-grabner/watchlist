import { Component } from '@angular/core';
import {Loading, LoadingController, NavController} from 'ionic-angular';
import {MovieService} from "../../services/movie-service";
import {Movie} from "../../models/movie";
import {MovieDetailPage} from "../movie-detail/movie-detail";
import {Genre} from "../../models/genre";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  moviesList: Movie[];
  fullMovieList: Movie[];
  genreList: Genre[];
  loadingIndicator: Loading;
  lastPageloaded: number = 0;
  movieServiceConfig: any;
  assetsBaseUrl: string;
  genreMovieList: any = [];
  fullGenreMovieList: any = [];

  // movieDetailPage: MovieDetailPage;

  constructor(public navCtrl: NavController,
              private movieService: MovieService,
              private loadingController: LoadingController) {

    this.loadingIndicator = this.loadingController.create({
      content: "Please wait ..."
    })
    this.loadingIndicator.present();

    this.movieService.fetchMovies(1).subscribe(movieServiceResult => {
      this.lastPageloaded = 1
      this.fullMovieList = movieServiceResult
      this.moviesList = this.fullMovieList

      this.loadingIndicator.dismiss();
    })
    this.movieService.fetchConfig().subscribe(config => {
      this.movieServiceConfig = config;
      this.assetsBaseUrl = `${this.movieServiceConfig.images.secure_base_url}/w780/`;
      //this.movieBackdorp = `${this.assetsBaseUrl}/${this.movie.backdrop_path}`
    })


    this.movieService.fetchGenres().subscribe(genres => {
      this.genreList = genres;
      this.getMoviesByGenre();
    });
  }

  getMoviesByGenre() {
    console.log('start', this.genreList.length);
    for (let i = 0; i < this.genreList.length; i++) {
      this.movieService.fetchMoviesByGenre(this.genreList[i].id).subscribe(res => {
        this.genreMovieList.push({genre: this.genreList[i].name, movies: res.results});
      });
    }
    console.log('Rows', this.genreMovieList);
    this.fullGenreMovieList = this.genreMovieList;
  }

  goToMovieDetail(movie: Movie) {
    this.navCtrl.push(MovieDetailPage, movie);
  }

  getFilteredMovieList(event: any) {
    const searchQuery = event.target.value;
    if (searchQuery && searchQuery.trim() != '') {
      this.moviesList = this.fullMovieList.filter((movie) => {
        return (movie.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1);
      })
    } else {
      this.moviesList = this.fullMovieList
    }
  }

  getFilteredGenreMovieList(event: any) {
    const searchQuery = event.target.value;

    if (searchQuery && searchQuery.trim() != '') {
      this.genreMovieList = [];
      for (let i = 0; i < this.genreList.length; i++) {
        let filteredMoviesList: Movie[] = [];

        filteredMoviesList = this.fullGenreMovieList[i].movies.filter((movie) => {
          return (movie.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1);
        });
        if (filteredMoviesList.length != 0) {
          this.genreMovieList.push({genre: this.genreList[i].name, movies: filteredMoviesList});
        }
      }
    } else {
      this.genreMovieList = this.fullGenreMovieList
    }
  }
}
