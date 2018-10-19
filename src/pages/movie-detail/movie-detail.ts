import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Movie} from "../../models/movie";
import {MovieService} from "../../services/movie-service";
import {MyWatchListService} from "../../services/my-watch-list-service";

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {
  movie: Movie;
  movieServiceConfig: any;
  movieVideos: any;
  movieBackdorp: string;
  assetsBaseUrl: string;
  isMovieInMyWatchList: boolean = false;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private movieService: MovieService,
              private myWatchlistService: MyWatchListService) {
    this.movie = navParams.data
  }

  ionViewDidEnter() {
    this.isMovieInMyWatchList = this.myWatchlistService.isMovieInMyWatchList(this.movie);

    this.movieService.fetchConfig().subscribe(config => {
      this.movieServiceConfig = config;
      this.assetsBaseUrl = `${this.movieServiceConfig.images.secure_base_url}/w780/`;
      this.movieBackdorp = `${this.assetsBaseUrl}/${this.movie.backdrop_path}`
    })

    this.movieService.fetchTrailer(this.navParams.get('id')).subscribe(trailer => {
      this.movieVideos = trailer;
      console.log(this.movieVideos);
    })
  }

  addToWatchList(movie: Movie){
    this.myWatchlistService.addMovie(movie)
    this.isMovieInMyWatchList = true;
  }

  removeFromWatchList(movie: Movie){
    this.myWatchlistService.removeMovie(movie)
    this.isMovieInMyWatchList = false;
  }

}
