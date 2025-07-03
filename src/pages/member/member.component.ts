import { Component } from '@angular/core';
import { ActivatedRoute, Route, RouterLinkWithHref } from '@angular/router';
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


  constructor(private route: ActivatedRoute, private memberService: MemberService) { }

  memberId: string = "";

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    email: new FormControl(''),
    lastName: new FormControl(''),
    isActive: new FormControl(false),
    gitRepo: new FormControl(''),
    rowVersion: new FormControl(''),
    role: new FormControl(''),
    id: new FormControl('')

  });

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id')!;
    this.memberId = id
    this.memberService.getMemberByid(id).subscribe({
      next: (res) => {
        console.log("member details", res)
        // this.toggleStatus();
        // const rowVersionBytes = this.base64ToByteArray(res.rowVersion)

        this.form = new FormGroup({

          firstName: new FormControl(res.data.firstName, Validators.required),
          lastName: new FormControl(res.data.lastName, Validators.required),
          email: new FormControl(res.data.workEmail, [Validators.required, Validators.email]),
          isActive: new FormControl(res.data.isActive),
          gitRepo: new FormControl(res.data.gitRepo),
          role: new FormControl(res.data.role),
          rowVersion: new FormControl(res.data.rowVersion),
          id: new FormControl(id)
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

  // base64ToByteArray(base64: string): number[] {
  //   const binaryStr = atob(base64);
  //   return Array.from(binaryStr).map(ch => ch.charCodeAt(0));
  // }
  onSubmit() {
    debugger
    if (this.form.valid) {
      console.log(this.form.value)
      const member = this.form.value;
      this.memberService.updateMember(member).subscribe({
        next: (res) => {
          alert("Member updated successfully");
          console.log(res);
        },
        error(err) {
          console.log('Update Error', err)
        }
      });
    }
    else {
      console.log('Form is invalid.');
    }
  }
}
