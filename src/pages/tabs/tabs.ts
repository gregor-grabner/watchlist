import { Component } from '@angular/core';


import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {MyWatchListPage} from "../my-watch-list/my-watch-list-page.component";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MyWatchListPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
