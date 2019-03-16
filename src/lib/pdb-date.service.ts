import { Injectable } from '@angular/core';
import { PdbInit } from './pdb-init.service';
import { PdbCore } from './pdb-core.service';
import { console_log, delay } from './pdb-functions';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';


PouchDB.plugin(PouchFind);
@Injectable({
  providedIn: 'root'
})
export class PdbDate {

  constructor(
    private init: PdbInit,
    private core: PdbCore
  ) { }

  create_index(type: string) {
    const db = this.init.db_connect();
    db.find({
      selector: { type: type },
      fields: ['_id', 'key', 'date'],
      sort: ['_id']
    })
      .then((result: any) => {
        for (const entry of result.docs) {
          // console.log('ENTRY: ', entry);
          sessionStorage.setItem('pdb_index/' + type + '/' + entry.key, entry._id);
        }
        // console_log('GET BY TYPE: ', result);
        // return result;
      })
      .catch((err) => {
        return err;
      });
  } // end: index();

  async get_doc(type: string, key: string, date: string) {
    this.create_index(type);
    const db = this.init.db_connect();
    let docId: string;
    try {
      const sessionKey = 'pdb_index/' + type + '/' + key + '/' + date;
      docId = sessionStorage.getItem(sessionKey);
      const doc: any = await db.get(await docId);
      await delay(0);
      return doc;
    } catch (err) {
      console.log('pdb-keys.service>>get_doc(): ', err);
    }
  } // end: get_doc();


  async get_doc_data(type: string, key: string, date: string) {
    try {
      const doc: any = await this.get_doc(type, key, date);
      await delay(0);
      const docData: any[] = doc.data;
      // console.log('DocDaTA: ', docData);
      return docData;
    } catch (err) {
      console.log('pdb-keys.service>>get_doc_data(): ', err);
    }
  } // end: get_doc_data();

  async get_docs_data_by_date(type: string, date: string) {
    const result = new Array();
    const db = this.init.db_connect();
    try {
      const docs: any = await db.find({selector: { type, date }, fields: ['_id', 'data'], sort: ['_id']});
      await delay(0);
      for (let entry of docs.docs) {
        const id: string = entry._id;
        entry = entry.data;
        entry.id = id;
        // console.log('ENTRY: ', entry);
        result.push(entry);
      }
      await delay(0);
      return result;
    } catch (err) {
      console.log('pdb-keys.service>>get_docs_by_type(): ', err);
    }
  }

  async change(id: string, key: string, dete: string, data: any) {
    const db = this.init.db_connect();
    db.get(id)
      .then((doc: any) => {
        return db.put({
          _id: id,
          _rev: doc._rev,
          type: doc.type,
          key: doc.key,
          date: doc.date,
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
  } // end: change();

  async put(type: string, key: string, date: string, data: any) {
    const db = this.init.db_connect();
    db.put({
      _id: new Date().toISOString(),
      type: type,
      key: key,
      date: date,
      data: data
    })
      .then( (response: any) => {
        console_log('PUT: ', response);
        return response;
      })
      .catch( (err) => {
        return err;
      });
  } // end: put();




} // end: class PdbKeys;
