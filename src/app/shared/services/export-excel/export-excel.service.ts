import { Injectable } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import * as Papa from 'papaparse';

const CSV_TYPE = 'text/csv;charset=utf-8;';
const CSV_EXTENSION = '.csv';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
  constructor(private _fileSaverService: FileSaverService) {}

  exportAsCsvFile(json: any[], csvFileName: string): void {
    // JSON → CSV
    const csv = Papa.unparse(json);

    // اعمل Blob من ال CSV
    const blob = new Blob([csv], { type: CSV_TYPE });

    // نزّل الملف
    this._fileSaverService.save(blob, csvFileName + CSV_EXTENSION);
  }
}
