import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { member, MemberService } from '../../services/member.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'taskly-memberlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memberlist.component.html',
  styleUrl: './memberlist.component.css'
})
export class MemberlistComponent implements OnInit {
  @ViewChild('memberModal') memberModalElement!: ElementRef;
  members: member[] = [];
  selectMember: any;
  showModal = false;

  totalCount: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getMembers(this.currentPage)
  }

  getMembers(page: number): void {
    debugger
    this.currentPage = page;

    this.memberService.getMembers(this.currentPage).subscribe({
      next: (res) => {
        console.log("API Response:", res);
        this.members = res.data;
        this.totalCount = res.totalCount;
      },
      error: (err) => {
        console.error("API error", err);
      },
    });
  }

  get pageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalCount / this.pageSize);

    const maxButtonsToShow = 5;
    const halfRange = Math.floor(maxButtonsToShow / 2);

    let start = Math.max(this.currentPage - halfRange, 1);
    let end = start + maxButtonsToShow - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxButtonsToShow + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);

  }

  get remainPage(): number {
    const viewedCount = this.currentPage * this.pageSize;
    const remaining = this.totalCount - viewedCount;
    return remaining > 0 ? remaining : 0;
  }

  onView(id: string) {

    this.memberService.getMemberByid(id).subscribe({
      next: (res) => {

        this.selectMember = res;
        console.log("Data in component", this.selectMember)
        this.showModal = true;
      },
      error(err) {
        console.error("Member API error", err)
      },
    });
  }

  closeModal() {
    this.selectMember = null; // or undefined
    this.showModal = false;
  }

}
