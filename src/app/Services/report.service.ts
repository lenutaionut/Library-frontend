
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Report } from '../Models/Report/report.model';

const REPORT_URL = "http://localhost:8070/reports"

@Injectable({
    providedIn: 'root'
})

export class ReportService {

    report!: Report;
    selectedReportSubject = new BehaviorSubject<Report>(this.report);
    constructor(private httpClient: HttpClient) { }

    getReports(): Observable<Report[]> {
        return this.httpClient.get<Report[]>(REPORT_URL);
    }

    getPdfFile(reportId: number): Observable<Blob> {
        return this.httpClient.get(REPORT_URL + '/' + reportId, { responseType: 'blob' });
    }

    selectReport(report: Report) {
        this.selectedReportSubject.next(report);
    }
}