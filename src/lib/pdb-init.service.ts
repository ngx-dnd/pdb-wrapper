import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PdbInitService {
  constructor() {}

  set_basename(basename: string) {
    localStorage.setItem('basename', basename);
  }

  get_basename() {
    localStorage.getItem('basename');
  }
}
