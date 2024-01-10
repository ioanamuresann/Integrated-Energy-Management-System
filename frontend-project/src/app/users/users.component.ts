import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  allUsersAccounts!: User[];
  selectedUserForEdit: User = new User('','','','',false); 
  editUserForm: FormGroup = new FormGroup({});
  editMode: boolean =  false;


  constructor(private userService: UserService,
              private cdr: ChangeDetectorRef
              ){}

  ngOnInit(): void {

    this.loadAllUsers();
  }

  onEditUser(userId: string) {
    const user = this.allUsersAccounts.find((u) => u.id === userId);
    if (user) {
      this.selectedUserForEdit = user;
      this.editMode = true;
      this.editUserForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)])
      });
    }
  }
  
  loadAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        console.log(users);
        this.allUsersAccounts = users;
        this.cdr.detectChanges();
      }
    );
  }

  onBackToUsers(){
    this.selectedUserForEdit = new User('','','','',false);
    this.editMode = false;
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      const userId = this.selectedUserForEdit.id;
      const updateUserDto = {
        name: this.editUserForm.get('name')?.value,
        email: this.editUserForm.get('email')?.value,
        password: this.editUserForm.get('password')?.value,
      };
      
      this.userService.updateUser(userId, updateUserDto).subscribe(
        () => {
          alert(
            'User updated successfully!'
          );
          this.editUserForm.reset();
          this.selectedUserForEdit = new User('','','','',false);
          this.editMode = false;
          this.loadAllUsers(); 
        },
        (error) => {
         alert(
            `Failed to update the user: ${error.message}`
          );
        }
      );
    }
  }
  
  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.loadAllUsers();
       alert(
          'User deleted successfully!'
        );
    }
    );
  }

}
