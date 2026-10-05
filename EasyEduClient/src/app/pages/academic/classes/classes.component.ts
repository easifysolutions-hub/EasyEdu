import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { ClassItem } from '../../../core/models';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  private api = inject(ApiService);
  classes: ClassItem[] = [];
  newClassName = '';

  ngOnInit(): void {
    this.api.getClasses().subscribe(res => {
      this.classes = res;
    });
  }

  addClass(): void {
    if (!this.newClassName.trim()) return;
    this.classes.push({
      id: this.classes.length + 1,
      name: this.newClassName.trim(),
      sections: [{ id: 1, name: 'Section A', classId: this.classes.length + 1 }]
    });
    this.newClassName = '';
  }
}
