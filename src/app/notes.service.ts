import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(
    private http: HttpClient
  ) {
   }

  async getAllNotes() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/allnotes', { headers: headers }).toPromise()
  }

  async createNote(text : string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    var data = {
      "noteText": text
    }
    return await this.http.post<any>('http://localhost:3000/createnotes', data, { headers: headers }).toPromise()
  }

  async findNote(id : number) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return await this.http.get<any>('http://localhost:3000/findnotes?id='+id, { headers: headers }).toPromise()
  }

  async deleteNote(id : number) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    var data = {
      "id": id
    }
    return await this.http.post<any>('http://localhost:3000/deletenotes', data, { headers: headers }).toPromise()
  }
}
