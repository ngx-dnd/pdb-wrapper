import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PdbInit {
  constructor() {}

  set_basename(data: string) {
    localStorage.setItem('pdb_basename', data);
  }

  set_console_log(data: string) {
    localStorage.setItem('pdb_console_log', data);
  }

  db_connect() {
    return new PouchDB(localStorage.getItem('pdb_basename'));
  }



}

