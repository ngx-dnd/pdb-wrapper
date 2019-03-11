import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import { PdbInit } from './pdb-init.service';
import { console_log } from './pdb-functions';


PouchDB.plugin(PouchFind);

@Injectable({
  providedIn: 'root'
})

export class PdbCore {
  constructor(
      private init: PdbInit,
  ) { }

  put(type: string, data: any) {
    const db = this.init.db_connect();
    db.put({
      _id: new Date().toISOString(),
      type: type,
      data: data
    })
      .then( (response: any) => {
        console_log('PUT: ', response);
        return response;
      })
      .catch( (err) => {
        return err;
      });
  }

  change(id: string, data: any) {
    const db = this.init.db_connect();
    db.get(id)
      .then( (doc: any) => {
        return db.put({
          _id: id,
          _rev: doc._rev,
          type: doc.type,
          data: data
        });
      })
      .then( (response: any) => {
        console_log('CHANGE: ', response);
        return response;
      })
      .catch( (err) => {
        return err;
      });
  }

  get_by_id(id: string) {
    const db = this.init.db_connect();
    db.get(id)
      .then((doc: any) => {
        console_log('GET BY ID: ', doc);
        return doc;
      })
      .catch((err) => {
        return err;
      });
  }

  get_by_type(type: string) {
    const db = this.init.db_connect();
    db.find({
      selector: { type: type },
      fields: ['_id', 'data'],
      sort: ['_id']
    })
      .then( (result: any) => {
        console_log('GET BY TYPE: ', result);
        return result;
      })
      .catch( (err) => {
        return err;
      });
  }

  remove_by_id(id: string) {
    const db = this.init.db_connect();
    db.get(id)
      .then( (doc) => {
        return db.remove(doc._id, doc._rev);
      })
      .then( (result: any) => {
        console_log('PUT: ', result);
        return result;
      })
      .catch( (err) => {
        return err;
      });
  }
}



