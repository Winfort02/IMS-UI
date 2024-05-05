import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  OnInit,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopBarComponent implements OnInit {
  @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('topbarMenu') topbarMenu!: ElementRef;
  @Input() title: string = '';

  hide: boolean = true;
  // dateToday: any = localStorage.getItem('dateToday');
  dateToday: any = new Date();
  constructor(private router: Router) {
    setInterval(() => {
      this.dateToday = new Date();
    }, 1000);
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

  onMenuButtonClick(event: Event) {
    this.hide = !this.hide;
    this.menuButtonClick.emit();
    event.preventDefault();
  }

  ngOnInit() {}
}
