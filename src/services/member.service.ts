import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface member {
  id: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  status: string;
  repo: string
}


@Injectable({
  providedIn: 'root'
})
export class MemberService {


  constructor(private http: HttpClient) { }


  getMembers(pageNumber: number): Observable<member[]> {
    const apiurl = `https://localhost:7215/api/Member/getallmembers?pageNumber=${pageNumber}`;

    return this.http.get<any>(apiurl).pipe(
      map(response => {
        console.log("📦 Full API response:", response);
        console.log("✅ Extracted members array:", response.data);
        return response.data;
      })
    );
  }

}
