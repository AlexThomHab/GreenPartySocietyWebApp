import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {

  posts = [
    {
      id: 'local-climate-policy',
      title: 'Why Students Should Care About Local Climate Policy',
      author: 'Alex',
      date: '3 February 2025',
      preview:
        'Climate change can feel distant or abstract, but local policy decisions have real and immediate effects on our communities.'
    },
    {
      id: 'first-meeting-reflections',
      title: 'Reflections on Our First Green Society Meeting',
      author: 'Ellie',
      date: '28 January 2025',
      preview:
        'Our first meeting of the year was relaxed, welcoming, and full of thoughtful discussion.'
    },
    {
      id: 'beyond-individual-action',
      title: 'Environmentalism Beyond Individual Action',
      author: 'Sam',
      date: '20 January 2025',
      preview:
        'We’re often told that personal lifestyle choices are the key to solving environmental problems — but is that really enough?'
    },
    {
      id: 'political-curiosity',
      title: 'Being Politically Curious Without Being an Expert',
      author: 'Maya',
      date: '15 January 2025',
      preview:
        'You don’t need to know everything about politics to get involved. Curiosity and openness matter more than having all the answers.'
    }
  ];

  constructor() {}
}
