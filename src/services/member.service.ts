import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { API_COFING as API_CONFING } from '../static/urls';

export interface member {
  id: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  // status: string;
  isActive: boolean;
  role: string;
  gitRepo: string;
  rowVersion: string
}

export interface finterModel {
  firstName: string;
  lastName: string;
  email: string;
  page: number;
}

export interface memberResponse<T> {
  data: T[];
  totalCount: number
}
export interface singleMemberResponse<T> {
  data: T;
  totalCount: number
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {


  constructor(private http: HttpClient) { }


  // private memberSubject = new BehaviorSubject<member[]>([]);
  // members$ = this.memberSubject.asObservable();

  // setMembers(members: member[]) {
  //   this.memberSubject.next(members);
  // }

  // getMember() {
  //   return this.members$
  // }

  getMembers(pageNumber: number): Observable<memberResponse<member>> {
    const apiurl = `${API_CONFING.baseUrl}Member/getallmembers?pageNumber=${pageNumber}`;

    return this.http.get<any>(apiurl).pipe(
      map(response => {
        return {
          data: response.data,
          totalCount: response.totalCount
        } as memberResponse<member>
      })
    );
  }


  getMemberByid(getmemberbyid: string): Observable<singleMemberResponse<member>> {
    const apiUrl = `${API_CONFING.baseUrl}member/getmemberbyid?id=${getmemberbyid}`

    return this.http.get<singleMemberResponse<member>>(apiUrl).pipe(map(response => {
      //console.log("Member Data", response.data)
      return response;
    })
    );

  }


  filterMember(firstName: string, lastName: string, email: string, page: number): Observable<memberResponse<member>> {
    const apiUrl = `${API_CONFING.baseUrl}member/filterMember?firstName=${firstName}&lastName=${lastName}&email=${email}&page=${page}`

    return this.http.get<any>(apiUrl).pipe(map(response => {
      return {
        data: response.data,
        totalCount: response.totalCount
      } as memberResponse<member>
    })
    );
  }

  updateMember(member: member) {
    const apiUrl = `${API_CONFING.baseUrl}member/updatemember`;
    return this.http.put<member>(apiUrl, member)
  }

}
