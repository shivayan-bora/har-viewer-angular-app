import { Component, Output, EventEmitter } from '@angular/core';
import { HarParserService } from '../../core/services/har-parser.service';
import { HarData } from '../../app/shared/models/har.model';

@Component({
  selector: 'app-har-uploader',
  standalone: true,
  template: `
    <input type="file" (change)="onFileSelected($event)" accept=".har" />
  `,
})
export class HarUploaderComponent {
  @Output() harUploaded = new EventEmitter<HarData>();

  constructor(private harParserService: HarParserService) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.harParserService.parseHarFile(file).subscribe({
        next: (harData) => this.harUploaded.emit(harData),
        error: (error) => console.error('Error parsing HAR file:', error),
      });
    }
  }
}
