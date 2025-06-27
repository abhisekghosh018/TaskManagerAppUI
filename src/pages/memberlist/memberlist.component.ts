import { Component, OnInit } from '@angular/core';
import { member, MemberService } from '../../services/member.service';

@Component({
  selector: 'taskly-memberlist',
  standalone: true,
  imports: [],
  templateUrl: './memberlist.component.html',
  styleUrl: './memberlist.component.css'
})
export class MemberlistComponent implements OnInit {

  members: member[] = []

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.getMembers(1).subscribe({
      next: (res) => {
        console.log("Received in component :", res)
        this.members = res;
        console.log("Received in component :", this.members)
      },
      error(err) {
        console.error("API error", err)
      },
    });
  }

}
