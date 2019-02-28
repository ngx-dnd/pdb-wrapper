import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PdbDebug {
  constructor() {}

  console_log(name: string, data: string) {
    if (localStorage.getItem('pdb_basename') === 'true') {
      console.log(name, data);
    }
  }


}
