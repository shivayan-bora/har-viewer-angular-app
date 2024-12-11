import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HarData } from '../../app/shared/models/har.model';

@Injectable({
  providedIn: 'root',
})
export class HarParserService {
  parseHarFile(file: File): Observable<HarData> {
    return from(file.text()).pipe(
      map((text) => JSON.parse(text) as HarData),
      map((harData) => this.processHarData(harData)),
    );
  }

  private processHarData(harData: HarData): HarData {
    return harData;
  }
}
