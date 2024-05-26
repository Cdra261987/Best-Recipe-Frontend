import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { Recipe } from "../models/recipe";
import { User } from "../models/user";


@Injectable({ providedIn: 'root'})
export class UserService {
    constructor(private readonly http: HttpClient) {}

    private readonly userUrl = 'User';
    private readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl + this.userUrl);
    }

    postUser(user: User): Observable<User> {
        return this.http.post<User>(environment.apiUrl + this.userUrl, user, this.httpOptions);
    } 

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(environment.apiUrl + this.userUrl + `/${id}`);
    }
}