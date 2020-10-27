import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserInterface } from '../interface/user.interface';
import { UserService } from '../service/user.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title: string = 'Главная страница';

  users: UserInterface[] = [];

  displayedColumns: string[] = ['id', 'name', 'edit'];
  dataSource: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.userService.userChange.subscribe((user) => {
      this.updateData(user)
    
    });
  }

  ngOnInit(): void {
    this.getUsers();

  }

  updateData(user) {
    console.log(user)
    const newData = [];
    for (let item of this.dataSource.data) {
      
      if (item.id === user.id) {
        newData.push(user)
        console.log(user)
      } else {
        newData.push(item)
      }
    }
    console.log(newData[0])
    this.dataSource.data = newData;
  }

  createFilterPredicat() {
    this.dataSource.filterPredicate = (data, filter: string) => {
      const result = data.id.toString().toLowerCase().includes(filter) || data.username.toLowerCase().includes(filter);
      return result;
    };
  }

  async getUsers() {
    const users: any = await this.userService.getUser();
    _.each(users, (user) => {
      this.users.push(user);
    });
    this.dataSource = new MatTableDataSource(this.users);
    this.createFilterPredicat();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(user) {
    const userLoc = localStorage.setItem('user', JSON.stringify(user));
    const dialogRef = this.dialog.open(EditProfileComponent, {

      width: '250px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      user = result;
    });
  }

}
