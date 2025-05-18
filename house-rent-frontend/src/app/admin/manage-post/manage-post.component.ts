import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RentPost } from '../../model/class';
import { ManagePostService } from './service/manage-post.service';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-manage-post',
  imports: [NgIf, CommonModule, NgFor, FormsModule],
  templateUrl: './manage-post.component.html',
  styleUrl: './manage-post.component.css',
})
export class ManagePostComponent implements OnInit {
  rentPosts: RentPost[] = [];
  selectedPost!: RentPost;

  constructor(
    private postService: ManagePostService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadPostInfo();
  }

  loadPostInfo(): void {
    const userId = localStorage.getItem('id');
    if (!userId) return;

    this.postService.getAllPost().subscribe({
      next: (res: RentPost[]) => {
       this.ngZone.run(() => {
        this.rentPosts = res;
      });
     // ✅ force Angular to refresh view
      },
      error: (err) => {
        console.error('Failed to load post info:', err);
      },
    });
  }

  deletePost(postId: number): void {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      this.rentPosts = this.rentPosts.filter((post) => post.postId !== postId);
    }
  }

  openStatusDialog(post: RentPost): void {
    this.selectedPost = { ...post };
    const modalEl = document.getElementById('statusModal');
    if (modalEl) {
      const modal = new Modal(modalEl);
      modal.show();
    }
  }

  updateStatus(): void {
    const index = this.rentPosts.findIndex(p => p.postId === this.selectedPost.postId);
    if (index !== -1) {
      this.rentPosts[index].isAvailable = this.selectedPost.isAvailable;

      const data = {
        postId: this.selectedPost.postId,
        isAvailable: this.selectedPost.isAvailable,
      };

      this.postService.editPost(data).subscribe({
        next: () => alert('Successfully updated.'),
        error: () => alert('Update process failed!!'),
      });
    }

    const modalEl = document.getElementById('statusModal');
    if (modalEl) {
      Modal.getInstance(modalEl)?.hide();
    }
  }
}
