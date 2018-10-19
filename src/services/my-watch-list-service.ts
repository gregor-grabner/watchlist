import {Injectable} from "@angular/core";
import {Movie} from "../models/movie";
import {AlertController} from "ionic-angular";

@Injectable()
export class MyWatchListService {
  myWatchList: Movie[] = []

  constructor(private alertController: AlertController) {

  }

  private getMyWatchListIndex(movie: Movie) {
    return this.myWatchList.findIndex(watchlistMovie => watchlistMovie.id === movie.id)
  }

  isMovieInMyWatchList(movie: Movie) {
    return (this.getMyWatchListIndex(movie) !== -1)
  }

  addMovie(movie: Movie) {
    if (this.getMyWatchListIndex(movie) === -1) {
      this.myWatchList.push(movie)
      console.log(this.myWatchList)
    } else {
      this.showAlert('Error','Already in List')
    }
  }

  removeMovie(movie: Movie) {
    let myWatchListIndex = this.getMyWatchListIndex(movie)
    if (myWatchListIndex !== -1) {
      this.myWatchList.splice(myWatchListIndex,1)
      console.log(this.myWatchList)
    } else {
      this.showAlert('Error','Not in List')
    }
  }

  getMyWatchList() {
    return this.myWatchList;
  }

  private showAlert(title: string, body: string) {
    let alert = this.alertController.create({
      title: title,
      subTitle: body,
      buttons: ['OK']
    })
    alert.present();
  }
}
