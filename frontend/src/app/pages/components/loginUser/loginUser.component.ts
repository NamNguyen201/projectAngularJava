import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUserService } from '../../services/loginUser.service';
import { LoginUser } from '../../models/loginUser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loginUser',
  templateUrl: './loginUser.component.html',
  styleUrls: ['./loginUser.component.scss']
})
export class LoginUserComponent implements OnInit {
  public formLogin: FormGroup = new FormGroup({});
  constructor(
      private fb: FormBuilder,
      private loginUserService: LoginUserService,
      private router: Router,
      private toast: ToastrService
  ) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      userName: new FormControl(null,{validators:Validators.required}),
      passWord: new FormControl(null,{validators:Validators.required})
    })
  }

  public submit(){
    if(this.formLogin.valid){
      const userName = this.formLogin.value.userName;
      const passWord = this.formLogin.value.passWord;
      
      this.loginUserService.checkLogin(userName, passWord).subscribe(
        (response: LoginUser) => {
          // console.log('Đăng nhập thành công', response);
          this.toast.success('Login Success');
          this.router.navigate(['pages'])
        },
        (error) => {
          this.toast.warning('nhập nnhu qua');
          console.error('Đăng nhập thất bại', error);
        }
      )
    }
  }
}
