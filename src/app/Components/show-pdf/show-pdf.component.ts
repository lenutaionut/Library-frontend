import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/Services/report.service';

@Component({
  selector: 'app-show-pdf',
  templateUrl: './show-pdf.component.html',
  styleUrls: ['./show-pdf.component.css']
})
export class ShowPdfComponent implements OnInit {

  reportId!: any;
  pdfSource: any;

  constructor(private route: ActivatedRoute, private reportService: ReportService, private sanitizer: DomSanitizer) {
    this.route.paramMap.subscribe(params => {
      this.reportId = params.get('id')
    });
  }

  ngOnInit(): void {

    this.getFile(this.reportId);
  }

  getFile(id: number) {
    this.reportService.getPdfFile(id).subscribe((reportFile: Blob) => {
      let blob: any = new Blob([reportFile], { type: 'application/pdf' });
      let objectURL = URL.createObjectURL(blob);
      this.pdfSource = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
      console.log(this.pdfSource)
    });
  }
}
