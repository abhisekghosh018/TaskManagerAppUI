import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, viewChild, } from '@angular/core';
import { member, MemberService } from '../../services/member.service';
import { CommonModule, NgIf } from '@angular/common';

// Import Bootstrap JS (make sure bootstrap is installed via npm)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Declare bootstrap for TypeScript
declare var bootstrap: any;

@Component({
  selector: 'taskly-memberlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memberlist.component.html',
  styleUrl: './memberlist.component.css'
})
export class MemberlistComponent implements OnInit {

  members: member[] = [];
  selectMember: any;
  showModal = false;

  @ViewChild('memberModal') modelRef!: ElementRef
  modalInstance: any;
  totalCount: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getMembers(this.currentPage)
  }

  ngAfterViewInit() {
    this.modalInstance = new bootstrap.Modal(this.modelRef.nativeElement);
  }

  getMembers(page: number): void {

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
        this.modalInstance.show();
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

  // onFilter(irstName: string, lastName: string, email: string, page: number) {

  // }

}
