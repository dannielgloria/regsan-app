import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers';

@Component({
  selector: 'app-pwd-recovery',
  templateUrl: './pwd-recovery.component.html',
  styleUrls: ['./pwd-recovery.component.css']
})
export class PwdRecoveryComponent implements OnInit {
  pwdForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.pwdForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required]
    }, {
        validators: MustMatch('email', 'confirmEmail')
    });
}

// convenience getter for easy access to form fields
get f() { return this.pwdForm.controls; }

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.pwdForm.invalid) {
      return;
  }

  // display form values on success
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.pwdForm.value, null, 4));
}
onReset() {
this.submitted = false;
this.pwdForm.reset();
}
title = 'regsan-app';
}

