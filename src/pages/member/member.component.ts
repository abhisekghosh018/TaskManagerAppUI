import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'taskly-member',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {


  constructor(private route: ActivatedRoute,
    private memberService: MemberService, private router: Router) { }

  memberId: string = "";
  isUpdate = false

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    workEmail: new FormControl('', [Validators.required, Validators.email]),
    lastName: new FormControl('', [Validators.required]),
    isActive: new FormControl(false),
    gitRepo: new FormControl(''),
    rowVersion: new FormControl(''),
    role: new FormControl(''),
    id: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id')!; // gets the id from param

    this.memberId = id
    this.memberService.getMemberByid(id).subscribe({
      next: (res) => {
        console.log("member details", res)
        // this.toggleStatus();
        // const rowVersionBytes = this.base64ToByteArray(res.rowVersion)

        this.form = new FormGroup({

          firstName: new FormControl(res.data.firstName),
          lastName: new FormControl(res.data.lastName),
          email: new FormControl(res.data.workEmail),
          isActive: new FormControl(res.data.isActive),
          gitRepo: new FormControl(res.data.gitRepo),
          role: new FormControl(res.data.role),
          rowVersion: new FormControl(res.data.rowVersion),
          id: new FormControl(id),
          password: new FormControl(res.data.password)
        });
      },
      error(err) {
        console.error("Member API error", err)
      },
    });

  }
  toggleStatus() {
    debugger
    const currentStatus = this.form.get('isActive')?.value;
    this.form.get('isActive')?.setValue(currentStatus);
  }

  onToggle() {
    const isActive = this.form.get('isActive')?.value
    console.log(isActive);
  }


  onSubmit() {
    if (this.form.valid) {
      const member = this.form.value;

      console.log(this.form.value)
      debugger
      if (this.memberId === null) {

        this.memberService.createMember(member).subscribe({

          next: (res) => {
            alert("Member created successfully");
            console.log(res);
            console.log('Backend response for Insert member', res);
          },
          error(err) {
            console.log('Insert failed Error', err);
          }
        });
      }
      else {
        this.memberService.updateMember(member).subscribe({
          next: (res) => {
            alert("Member updated successfully");
            this.router.navigate(['member/memberlist'])
          },
          error(err) {
            console.log('Update failed Error', err);
          }
        });
      }
    }
    else {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control && control.invalid) {
          console.log(`❌ ${key} is invalid. Errors:`, control.errors);
        }
      });
      return;
      console.log('Form is invalid.', this.form);
    }
  }
}
