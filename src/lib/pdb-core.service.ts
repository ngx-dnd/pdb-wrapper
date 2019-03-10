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
    ) {
      const db = this.init.db_connect();
      db.createIndex({
        index: {fields: ['_id', 'type', 'data']}
      });
    }

  put(type: string, data: any) {
    const db = this.init.db_connect();
    db.put({
      _id: new Date().toISOString(),
      type,
      data
    })
// tslint:disable: only-arrow-functions
      .then(function(response: any) {
        console_log('PUT: ', response);
        return response;
      })
      .catch(function(err) {
        return err;
      });
  }

  change(id: string, data: any) {
    const db = this.init.db_connect();
    db.get(id)
      .then(function(doc: any) {
        return db.put({
          _id: id,
          _rev: doc._rev,
          type: doc.type,
          data
        });
      })
      .then(function(response: any) {
        console_log('CHANGE: ', response);
        return response;      })
      .catch(function(err) {
        return err;
      });
  }

  get_by_id(id: string) {
    const db = this.init.db_connect();
    db.get(id)
      .then(function(doc: any) {
        console_log('GET BY ID: ', doc);
        return doc;
      })
      .catch(function(err) {
        return err;
      });
  }

  get_by_type(type: string) {
    const db = this.init.db_connect();
    db.find({
      selector: { type },
    })
      .then(function(result: any) {
        console_log('GET BY TYPE: ', result);
        return result;
      })
      .catch(function(err) {
        return err;
      });
  }

  remove_by_id(id: string) {
    const db = this.init.db_connect();
    db.get(id)
      .then(function(doc) {
        return db.remove(doc._id, doc._rev);
      })
      .then(function(result: any) {
        console_log('PUT: ', result);
        return result;
      })
      .catch(function(err) {
        return err;
      });
  }
}



