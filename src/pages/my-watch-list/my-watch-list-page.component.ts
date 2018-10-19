import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Movie} from "../../models/movie";
import {MyWatchListService} from "../../services/my-watch-list-service";
import {MovieDetailPage} from "../movie-detail/movie-detail";

@Component({
  selector: 'page-about',
  templateUrl: 'my-watch-list-page.component.html'
})
export class MyWatchListPage {
  myWatchlist: Movie[];

  constructor(public navCtrl: NavController,
              private myWatchListService: MyWatchListService) {
    this.myWatchlist = myWatchListService.getMyWatchList();
  }

  goToMovieDetail(movie: Movie) {
    this.navCtrl.push(MovieDetailPage, movie);
  }
}
