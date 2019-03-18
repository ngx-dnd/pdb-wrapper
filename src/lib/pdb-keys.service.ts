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

// tslint:disable:object-literal-shorthand
export class PdbKeys {

  constructor(
    private init: PdbInit,
    private core: PdbCore
  ) { }

  index(type: string) {
    const db = this.init.db_connect();
    db.find({
      selector: { type: type },
      fields: ['_id', 'key'],
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


  async get_doc(type: string, key: string) {
    this.index(type);
    const db = this.init.db_connect();
    let docId: string;
    try {
      const sessionKey = 'pdb_index/' + type + '/' + key;
      docId = sessionStorage.getItem(sessionKey);
      const doc: any = await db.get(await docId);
      await delay(0);
      return doc;
    } catch (err) {
      console.log('pdb-keys.service>>get_doc(): ', err);
    }
  } // end: get_doc();


async get_doc_data(type: string, key: string) {
  try {
    const doc: any = await this.get_doc(type, key);
    await delay(0);
    const docData: any[] = doc.data;
    // console.log('DocDaTA: ', docData);
    return docData;
  } catch (err) {
    console.log('pdb-keys.service>>get_doc_data(): ', err);
  }
} // end: get_doc_data();


async get_docs_by_type(type: string) {
  const db = this.init.db_connect();
  try {
    const docs: any = await db.find({selector: { type: type }, fields: ['_id', 'data'], sort: ['_id']});
    await delay(0);
    return docs;
  } catch (err) {
    console.log('pdb-keys.service>>get_docs_by_type(): ', err);
  }
} // end: get_docs_by_type();



} // end: class PdbKeys;


