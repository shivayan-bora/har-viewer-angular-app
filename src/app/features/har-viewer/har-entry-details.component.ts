import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarEntry } from '../../app/shared/models/har.model';

@Component({
  selector: 'app-har-entry-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs-container">
      <div class="tabs">
        <button
          [class.active]="activeTab === 'headers'"
          (click)="activeTab = 'headers'"
        >
          Headers
        </button>
        <button
          [class.active]="activeTab === 'payload'"
          (click)="activeTab = 'payload'"
        >
          Payload
        </button>
      </div>

      <div class="tab-content" *ngIf="activeTab === 'headers'">
        <div class="headers-section">
          <h4>Request Headers</h4>
          <table>
            <tr *ngFor="let header of entry.request.headers">
              <td class="header-name">{{ header.name }}</td>
              <td class="header-value">{{ header.value }}</td>
            </tr>
          </table>

          <h4>Response Headers</h4>
          <table>
            <tr *ngFor="let header of entry.response.headers">
              <td class="header-name">{{ header.name }}</td>
              <td class="header-value">{{ header.value }}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="tab-content" *ngIf="activeTab === 'payload'">
        <div class="payload-section">
          <h4>Request Payload</h4>
          <pre *ngIf="entry.request.postData?.text">{{
            formatPayload(entry.request.postData?.text ?? '')
          }}</pre>
          <p *ngIf="!entry.request.postData?.text">No request payload</p>

          <h4>Response Payload</h4>
          <pre *ngIf="entry.response.content.text">{{
            formatPayload(entry.response.content.text)
          }}</pre>
          <p *ngIf="!entry.response.content.text">No response payload</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .tabs-container {
        padding: 16px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        margin-top: 8px;
      }

      .tabs {
        display: flex;
        gap: 8px;
        border-bottom: 1px solid #e0e0e0;
        margin-bottom: 16px;
      }

      .tabs button {
        padding: 8px 16px;
        border: none;
        background: none;
        cursor: pointer;
        border-bottom: 2px solid transparent;
      }

      .tabs button.active {
        border-bottom: 2px solid #1976d2;
        color: #1976d2;
      }

      .headers-section table {
        width: 100%;
        border-collapse: collapse;
        margin: 8px 0;
      }

      .headers-section td {
        padding: 8px;
        border: 1px solid #e0e0e0;
      }

      .header-name {
        font-weight: bold;
        width: 200px;
        background-color: #f5f5f5;
      }

      .payload-section pre {
        background-color: #f5f5f5;
        padding: 16px;
        border-radius: 4px;
        overflow-x: auto;
        white-space: pre-wrap;
      }

      h4 {
        margin: 16px 0 8px 0;
        color: #333;
      }
    `,
  ],
})
export class HarEntryDetailsComponent {
  @Input() entry!: HarEntry;
  activeTab: 'headers' | 'payload' = 'headers';

  formatPayload(text: string): string {
    try {
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      return text;
    }
  }
}
