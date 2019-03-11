import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import { PdbInit } from './pdb-init.service';
import { console_log } from './pdb-functions';
import { PdbCore } from './pdb-core.service';

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
      index: { fields: ['type', 'name'] }
    });
  }

  put_by_type_and_name(type: string, name: string, data: any): void {
    this.create_index();
    const db = this.init.db_connect();
    db.find({
      selector: { type: type, name: name},
      fields: ['_id', 'type', 'name']
      })
      .then( (result: any) => {
        console_log('GET BY TYPE AND NAME: ', result);
        this.change_by_id_and_name(result.docs[0]._id, name, data);
        console.log(result);
      }).catch( () => {
        console.log();
        db.put({
          _id: new Date().toISOString(),
          type: type,
          name: name,
          data: data
        })
          .then( (response: any) => {
            console_log('PUT: ', response);
            return response;
          })
          .catch( (err) => {
            console.log(err);
            return;
          });
      });
  }

  get_by_type_and_name(type: string, name: string): any {
    this.create_index();
    const db = this.init.db_connect();
    db.find({
      selector: { type: type, name: name},
      fields: ['type', 'name']
      })
      .then( (result: any) => {
        console_log('GET BY TYPE AND NAME: ', result);
        result = result.docs[0].data[0];
        console.log(result);
      }).catch( (err) => {
        return err;
      });
  }


  change_by_id_and_name(id: string, name: string, data: any) {
    const db = this.init.db_connect();
    db.get(id)
      .then( (doc: any) => {
        return db.put({
          _id: id,
          _rev: doc._rev,
          type: doc.type,
          name: doc.name,
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


} // end: CLASS



