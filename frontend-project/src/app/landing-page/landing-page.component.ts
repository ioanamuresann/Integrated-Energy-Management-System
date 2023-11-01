import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { CreateUserDto } from '../shared/dtos/create-user.dto';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  userForm: FormGroup = new FormGroup({});
  protected showPassword = false;
  registerUserMode: boolean = false;
  registerUserForm: FormGroup = new FormGroup({});


  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

  }


  onSubmitUserForm() {
    const email = this.userForm.get('email')?.value;
    const password = this.userForm.get('password')?.value;

    this.userService.login(email, password).subscribe(
      (user: User) => {
        this.userService.setCurrentlyLoggedUser(user);
        if(user.isAdmin)
          this.router.navigate(['/admin']);
        else {
          this.router.navigate(['/client']);
      }
      }
    );
  }

  onClickRegisterUser() {
    this.registerUserMode = true;
    this.registerUserForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

  }

  onRegisterUser() {
    if (this.registerUserForm.valid) {
      const createUserDto: CreateUserDto = {
        name: this.registerUserForm.get('name')?.value,
        email: this.registerUserForm.get('email')?.value,
        password: this.registerUserForm.get('password')?.value
      };

      this.userService.createUser(createUserDto).subscribe(
        (user) => {
        this.userService.setCurrentlyLoggedUser(user);
        this.router.navigate(['/client']);
        },
        (error) => {
          console.error('Error registering user', error);
        }
      );
    }
  }

  onBackToLogin() {
    this.registerUserMode = false;
  }

}
