import { Component, OnInit } from '@angular/core';
import { AdminNavBarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: true,
  imports: [AdminNavBarComponent, CommonModule],
})
export class AdminUserComponent implements OnInit {
  userList!: User[];

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      this.userList = response;
    });
  }

  onBlockUser(id: number): void {
    this.userService.getUserById(id).subscribe((response) => {
      if (response != null) {
        response.isActive = false;
        this.userService.postUser(response).subscribe((res) => {
          if (res != null) {
            this.toastrService.success(
              'User was blocked successfully!',
              'Success'
            );
          } else {
            this.toastrService.success(
              'User was blocked successfully!',
              'Success'
            );
          }
        });
      }
    });
  }
}
