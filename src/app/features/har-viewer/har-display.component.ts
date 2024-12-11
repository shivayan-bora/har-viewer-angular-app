import { Component, Input, OnChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from '../../app/shared/pipes/files-size.pipe';
import { HarData, HarEntry } from '../../app/shared/models/har.model';
import { HarEntryDetailsComponent } from './har-entry-details.component';
import tippy, { Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

@Component({
  selector: 'app-har-display',
  standalone: true,
  imports: [CommonModule, FileSizePipe, HarEntryDetailsComponent],
  template: `
    <div class="viewport-container">
      <div class="scrollable-content">
        <div class="entry" *ngFor="let entry of entries; let i = index">
          <div
            class="entry-header"
            (click)="toggleEntry(i)"
            [class.expanded]="expandedEntryIndex === i"
          >
            <div class="main-info">
              <span class="method {{ entry.request.method.toLowerCase() }}">
                {{ entry.request.method }}
              </span>
              <span
                class="truncated-url"
                [attr.data-tippy-content]="entry.request.url"
              >
                {{ entry.request.url }}
              </span>
            </div>
            <div class="secondary-info">
              <span
                class="status-code status-{{
                  getStatusClass(entry.response.status)
                }}"
              >
                {{ entry.response.status }}
              </span>
              <span class="size">{{
                entry.response.content.size | fileSize
              }}</span>
              <span class="time">{{ entry.time | number: '1.0-0' }}ms</span>
            </div>
          </div>

          <div class="entry-details" *ngIf="expandedEntryIndex === i">
            <app-har-entry-details [entry]="entry"></app-har-entry-details>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .viewport-container {
        height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .scrollable-content {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
      }

      .entry {
        margin-bottom: 8px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
      }

      .entry-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        cursor: pointer;
        background-color: #f5f5f5;
        transition: background-color 0.2s;
      }

      .entry-header:hover {
        background-color: #eeeeee;
      }

      .entry-header.expanded {
        border-bottom: 1px solid #e0e0e0;
      }

      .main-info {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        min-width: 0;
      }

      .method {
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 0.9em;
      }

      .method.get {
        background-color: #e3f2fd;
        color: #1565c0;
      }
      .method.post {
        background-color: #e8f5e9;
        color: #2e7d32;
      }
      .method.put {
        background-color: #fff3e0;
        color: #ef6c00;
      }
      .method.delete {
        background-color: #ffebee;
        color: #c62828;
      }

      .truncated-url {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .secondary-info {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-left: 16px;
      }

      .status-code {
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.9em;
      }

      .status-success {
        background-color: #e8f5e9;
        color: #2e7d32;
      }
      .status-redirect {
        background-color: #fff3e0;
        color: #ef6c00;
      }
      .status-client-error {
        background-color: #ffebee;
        color: #c62828;
      }
      .status-server-error {
        background-color: #fce4ec;
        color: #c2185b;
      }

      .entry-details {
        background-color: white;
      }
    `,
  ],
})
export class HarDisplayComponent implements OnChanges, AfterViewInit {
  @Input() harData!: HarData;
  entries: HarEntry[] = [];
  expandedEntryIndex: number | null = null;

  ngOnChanges(): void {
    if (this.harData) {
      this.entries = this.harData.log.entries;
      this.expandedEntryIndex = null;
    }
  }

  ngAfterViewInit() {
    this.initializeTooltips();
  }

  toggleEntry(index: number): void {
    this.expandedEntryIndex = this.expandedEntryIndex === index ? null : index;
  }

  getStatusClass(status: number): string {
    if (status >= 200 && status < 300) return 'success';
    if (status >= 300 && status < 400) return 'redirect';
    if (status >= 400 && status < 500) return 'client-error';
    return 'server-error';
  }

  private initializeTooltips() {
    tippy('.truncated-url', {
      content: (reference) =>
        reference.getAttribute('data-tippy-content') || '',
      allowHTML: true,
    } as Partial<Props>);
  }
}
