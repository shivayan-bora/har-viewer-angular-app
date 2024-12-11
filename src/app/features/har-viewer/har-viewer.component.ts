import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarUploaderComponent } from './har-uploader.component';
import { HarDisplayComponent } from './har-display.component';
import { HarData } from '../../app/shared/models/har.model';

@Component({
  selector: 'app-har-viewer',
  standalone: true,
  imports: [CommonModule, HarUploaderComponent, HarDisplayComponent],
  template: `
    <app-har-uploader (harUploaded)="onHarUploaded($event)"></app-har-uploader>
    <app-har-display *ngIf="harData" [harData]="harData"></app-har-display>
  `,
})
export class HarViewerComponent {
  harData: HarData | null = null;

  onHarUploaded(data: HarData): void {
    this.harData = data;
  }
}
