import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  imports: [RouterModule],
})
export class BlogDetailComponent {
  postId: string | null;

  constructor(private route: ActivatedRoute) {
    this.postId = this.route.snapshot.paramMap.get('id');
  }
}
