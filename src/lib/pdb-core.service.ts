import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import { PdbInitService } from './pdb-init.service';
PouchDB.plugin(PouchFind);

@Injectable({
  providedIn: 'root'
})

export class PdbCoreService {
  constructor(
    private initdb: PdbInitService
  ) {}
  baseName: any = this.initdb.get_basename;

  db_connect() {
    return new PouchDB(this.baseName);
  }

  put(type: string, data: any) {
    const db = this.db_connect();
    db.put({
      _id: new Date().toISOString(),
      type: type,
      data: data
    })
      .then(function(response: any) {
        console.log('PUT:', response);
        return response;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  change(id: string, data: any) {
    const db = this.db_connect();
    db.get(id)
      .then(function(doc: any) {
        return db.put({
          _id: id,
          _rev: doc._rev,
          type: doc.type,
          data: data
        });
      })
      .then(function(response) {
        console.log('CHANGE:', response);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  get_by_id(id: string) {
    const db = this.db_connect();
    db.get(id)
      .then(function(doc) {
        console.log('GET:', doc);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  get_by_type(type: string) {
    const db = this.db_connect();
    db.find({
      selector: { type: type },
      fields: ['_id', 'data'],
      sort: ['_id']
    })
      .then(function(result) {
        console.log('GET TYPE: FINISH');
        return result.docs;
      })
      .catch(function(err) {
        return err;
      });
  }

  remove_by_id(id: string) {
    const db = this.db_connect();
    db.get(id)
      .then(function(doc) {
        return db.remove(doc._id, doc._rev);
      })
      .then(function(result) {
        console.log(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}
