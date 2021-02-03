import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Report } from 'src/app/Models/Report/report.model';
import { ReportService } from 'src/app/Services/report.service';


@Component({
  selector: 'app-pdf-reports',
  templateUrl: './pdf-reports.component.html',
  styleUrls: ['./pdf-reports.component.css']
})
export class PdfReportsComponent implements OnInit {

  reports: Report[] = [];
    selectedFile!: Report

  constructor(private reportService: ReportService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllReports();
  }

  getAllReports() {
    return this.reportService.getReports().subscribe((data: Report[]) => {
      this.reports = data;
    });
  }

  selectReport(report: Report){
    this.selectedFile = report;
    this.reportService.selectReport(report);
  }
}
