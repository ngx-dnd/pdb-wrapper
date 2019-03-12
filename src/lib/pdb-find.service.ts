import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import { PdbInit } from './pdb-init.service';
import { console_log } from './pdb-functions';
import { PdbCore } from './pdb-core.service';
import { NgxIndexedDB } from 'ngx-indexed-db';


PouchDB.plugin(PouchFind);
// tslint:disable:object-literal-shorthand
@Injectable({
  providedIn: 'root'
})
export class PdbFind {
  constructor(
    private init: PdbInit,
    private pdbcore: PdbCore
  ) { }


  create_index() {
    const db = this.init.db_connect();
    db.createIndex({
      index: { fields: ['type', 'key'] }
    });
  }

  put_by_type_and_key(type: string, key: string, data: any): void {
    this.create_index();
    const db = this.init.db_connect();
    db.find({
      selector: { type: type, key: key },
      fields: ['_id', 'type', 'key']
    })
      .then((result: any) => {
        console_log('GET BY TYPE AND key: ', result);
        this.change_by_id_and_key(result.docs[0]._id, key, data);
        console.log(result);
      }).catch(() => {
        console.log();
        db.put({
          _id: new Date().toISOString(),
          type: type,
          key: key,
          data: data
        })
          .then((response: any) => {
            console_log('PUT: ', response);
            return response;
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      });
  }

  get_by_type_and_key(type: string, key: string): any {
    this.create_index();
    const db = this.init.db_connect();
    db.find({
      selector: { type: type, key: key },
      fields: ['type', 'key']
    })
      .then((result: any) => {
        console_log('GET BY TYPE AND key: ', result);
        result = result.docs[0].data[0];
        console.log(result);
      }).catch((err) => {
        return err;
      });
  }


  change_by_id_and_key(id: string, key: string, data: any) {
    const db = this.init.db_connect();
    db.get(id)
      .then((doc: any) => {
        return db.put({
          _id: id,
          _rev: doc._rev,
          type: doc.type,
          key: doc.key,
          data: data
        });
      })
      .then((response: any) => {
        console_log('CHANGE: ', response);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }






} // end: CLASS



