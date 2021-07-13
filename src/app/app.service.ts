import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError as observableThrowError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class AppService {

  headers = new HttpHeaders({
    'X-Requested-With': 'XMLHttpRequest'
  });

  public constructor(private http: HttpClient) { }
  public fetchNodes(): any {
    return this.http.get(`http://127.0.0.1:8000/api/get-all-data`, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError((error: any) =>
        observableThrowError(error.error || "Server error")
      )
    );
  }

  public saveData(name, addType, id) {
    return this.http.post(`http://127.0.0.1:8000/api/save-data`, { name: name, type: addType, id: id }, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError((error: any) =>
        observableThrowError(error.error || "Server error")
      )
    );
  }

  public deleteData(addType: string, id: string) {
    return this.http.get(`http://127.0.0.1:8000/api/delete-data/${addType}/${id}`, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError((error: any) =>
        observableThrowError(error.error || "Server error")
      )
    );
  }

  public processNodes(nodes: Array<any>): Array<any> {
    let a = 1;
    nodes.map(node => {
      if (node.child) {
        node['expand'] = false;
      }
    });
    return nodes;
  }
}
