import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {data} from "autoprefixer";

@Component({
  selector: 'app-view-prc-list',
  templateUrl: './view-prc-list.component.html',
  styleUrls: ['./view-prc-list.component.scss']
})
export class ViewPrcListComponent implements OnInit {
  PRCList: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

}
