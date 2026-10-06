import { Injectable, signal } from '@angular/core';
import { CurrencyService } from './currency.service';

export interface ReportSignatory {
  id: string;
  title: string;
  designation: string;
  enabled: boolean;
}

export interface ReportPrintConfig {
  institutionName: string;
  subTitle: string;
  affiliationText: string;
  campusAddress: string;
  contactLine: string;
  website: string;
  logoUrl: string;
  watermarkText: string;
  watermarkEnabled: boolean;
  paperSize: 'A4' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  fontSize: 'small' | 'medium' | 'large';
  primaryColor: string;
  accentColor: string;
  showGeneratedDate: boolean;
  showGeneratedBy: boolean;
  showKpiSummary: boolean;
  signatories: ReportSignatory[];
  footerDisclaimer: string;
}

export interface ReportExportMetadata {
  category?: string;
  filters?: string;
  kpis?: { label: string; value: string }[];
  totals?: (string | number)[];
  totalLabel?: string;
  summaryNotes?: string;
  dateRange?: string;
  generatedBy?: string;
}

export const DEFAULT_REPORT_PRINT_CONFIG: ReportPrintConfig = {
  institutionName: 'EasyEdu International Academy',
  subTitle: 'Central Academic Governance & Administrative Records',
  affiliationText: 'CBSE Affiliation # 830412 &bull; School Code: EE-BLR-001 &bull; ISO 9001:2015',
  campusAddress: '#42, Campus Green Valley, Main Tech Park Road, Bengaluru, Karnataka - 560001',
  contactLine: 'Phone: +91 80 2845 9900 | Toll Free: 1800 200 4488 | Email: admin@easyedu.org',
  website: 'https://easyedu.easifysolutions.com',
  logoUrl: '/images/easyedu_full_logo.png',
  watermarkText: 'EASYEDU OFFICIAL RECORD',
  watermarkEnabled: true,
  paperSize: 'A4',
  orientation: 'landscape',
  fontSize: 'medium',
  primaryColor: '#002B49',
  accentColor: '#059669',
  showGeneratedDate: true,
  showGeneratedBy: true,
  showKpiSummary: true,
  signatories: [
    { id: 'sig1', title: 'Prepared By', designation: 'Administrative Officer', enabled: true },
    { id: 'sig2', title: 'Verified By', designation: 'Head of Accounts / Bursar', enabled: true },
    { id: 'sig3', title: 'Authorized Signatory', designation: 'Principal & Academic Director', enabled: true }
  ],
  footerDisclaimer: 'This is an authentic system-generated document from EasyEdu Cloud ERP. Valid without manual seal if verified via official institutional digital ledger.'
};

@Injectable({
  providedIn: 'root'
})
export class ExportReportService {
  printConfig = signal<ReportPrintConfig>(this.loadConfig());

  constructor(private currencyService: CurrencyService) {}

  private loadConfig(): ReportPrintConfig {
    const saved = localStorage.getItem('easyedu_report_print_config');
    if (saved) {
      try {
        return { ...DEFAULT_REPORT_PRINT_CONFIG, ...JSON.parse(saved) };
      } catch (e) {
        console.warn('Failed to parse saved report print settings', e);
      }
    }
    return { ...DEFAULT_REPORT_PRINT_CONFIG };
  }

  saveConfig(config: ReportPrintConfig): void {
    this.printConfig.set(config);
    localStorage.setItem('easyedu_report_print_config', JSON.stringify(config));
  }

  updateConfig(partial: Partial<ReportPrintConfig>): void {
    const updated = { ...this.printConfig(), ...partial };
    this.saveConfig(updated);
  }

  exportToCsv(filename: string, headers: string[], rows: any[][], metadata?: ReportExportMetadata): void {
    const cleanRows = rows.map(row => 
      row.map(val => {
        if (val === null || val === undefined) return '""';
        let str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      }).join(',')
    );

    const lines: string[] = [];
    const cfg = this.printConfig();
    const curr = this.currencyService.activeCurrency();

    // Institutional Metadata Header
    lines.push(`"# Institution: ${cfg.institutionName}"`);
    lines.push(`"# Report: ${filename} | Currency: ${curr.code} (${curr.symbol})"`);
    if (metadata?.filters) lines.push(`"# Scope / Filters: ${metadata.filters}"`);
    if (metadata?.dateRange) lines.push(`"# Date Range: ${metadata.dateRange}"`);
    lines.push(`"# Exported At: ${new Date().toLocaleString()}"`);
    lines.push('""');

    // Column Headers
    lines.push(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','));

    // Data Rows
    lines.push(...cleanRows);

    // Optional Totals Row
    if (metadata?.totals && metadata.totals.length > 0) {
      lines.push(metadata.totals.map(t => {
        if (t === null || t === undefined) return '""';
        let str = String(t).replace(/"/g, '""');
        return `"${str}"`;
      }).join(','));
    }

    const csvContent = '\uFEFF' + lines.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  exportToExcel(filename: string, headers: string[], rows: any[][], metadata?: ReportExportMetadata): void {
    const cleanFilename = `${filename.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.xls`;
    const cfg = this.printConfig();
    const curr = this.currencyService.activeCurrency();

    const escapeXml = (str: any) => {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    let totalsRowHtml = '';
    if (metadata?.totals && metadata.totals.length > 0) {
      totalsRowHtml = `
        <tr style="background-color: #f1f5f9; font-weight: bold; border-top: 2px solid #002B49;">
          ${metadata.totals.map(t => `<td style="border: 1px solid #94a3b8; padding: 8px; font-weight: bold; background-color: #f1f5f9;">${escapeXml(t)}</td>`).join('')}
        </tr>
      `;
    }

    let kpisHtml = '';
    if (metadata?.kpis && metadata.kpis.length > 0) {
      kpisHtml = `
        <tr><td colspan="${headers.length}" style="font-weight: bold; color: #002B49; padding: 6px 0;">Key Metrics Summary:</td></tr>
        <tr>
          ${metadata.kpis.map(k => `<td style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 6px; font-weight: bold;">${escapeXml(k.label)}: ${escapeXml(k.value)}</td>`).join('')}
        </tr>
        <tr><td colspan="${headers.length}"></td></tr>
      `;
    }

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>${escapeXml(filename.substring(0, 30))}</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
        <style>
          table { border-collapse: collapse; font-family: 'Segoe UI', Arial, sans-serif; width: 100%; }
          th { background-color: ${cfg.primaryColor}; color: #ffffff; font-weight: bold; border: 1px solid #000; padding: 10px 8px; font-size: 10pt; text-align: left; }
          td { border: 1px solid #cbd5e1; padding: 7px 8px; font-size: 9.5pt; color: #1e293b; }
          .header-title { font-size: 16pt; font-weight: bold; color: ${cfg.primaryColor}; }
          .meta-info { font-size: 9.5pt; color: #475569; }
          .meta-scope { font-size: 9.5pt; color: #059669; font-weight: bold; }
        </style>
      </head>
      <body>
        <table>
          <tr><td colspan="${headers.length}" class="header-title">${escapeXml(cfg.institutionName)}</td></tr>
          <tr><td colspan="${headers.length}" class="meta-info">${escapeXml(cfg.subTitle)} - ${escapeXml(filename)}</td></tr>
          <tr><td colspan="${headers.length}" class="meta-info">${escapeXml(cfg.campusAddress)} | ${escapeXml(cfg.contactLine)}</td></tr>
          ${metadata?.filters ? `<tr><td colspan="${headers.length}" class="meta-scope">Scope & Filters: ${escapeXml(metadata.filters)}</td></tr>` : ''}
          <tr><td colspan="${headers.length}" class="meta-info">Generated: ${new Date().toLocaleString()} | Currency: ${escapeXml(curr.code)} (${escapeXml(curr.symbol)})</td></tr>
          <tr><td colspan="${headers.length}"></td></tr>
          ${kpisHtml}
          <tr>
            ${headers.map(h => `<th>${escapeXml(h)}</th>`).join('')}
          </tr>
          ${rows.map(r => `<tr>${r.map(c => `<td>${escapeXml(c ?? '')}</td>`).join('')}</tr>`).join('')}
          ${totalsRowHtml}
          <tr><td colspan="${headers.length}"></td></tr>
          <tr><td colspan="${headers.length}" style="font-size: 8pt; color: #64748b;">${escapeXml(cfg.footerDisclaimer)}</td></tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', cleanFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  printOrPdf(title: string, headers: string[], rows: any[][], metadata?: ReportExportMetadata): void {
    const html = this.buildPrintHtml(title, headers, rows, metadata);
    const printWindow = window.open('', '_blank', 'width=1150,height=850,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    if (!printWindow) {
      alert('Pop-up blocker prevented opening report window. Please allow popups for EasyEdu.');
      return;
    }
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 450);
  }

  buildPrintHtml(title: string, headers: string[], rows: any[][], metadata?: ReportExportMetadata): string {
    const cfg = this.printConfig();
    const curr = this.currencyService.activeCurrency();
    const activeSignatories = cfg.signatories.filter(s => s.enabled);

    // Auto-select landscape orientation if wide table (> 6 columns)
    const orientation = (headers.length > 6) ? 'landscape' : cfg.orientation;

    const kpiHtml = (cfg.showKpiSummary && metadata?.kpis && metadata.kpis.length > 0)
      ? `
        <div class="kpi-banner">
          ${metadata.kpis.map(k => `
            <div class="kpi-box">
              <div class="kpi-label">${k.label}</div>
              <div class="kpi-value">${k.value}</div>
            </div>
          `).join('')}
        </div>
      ` : '';

    const totalsRowHtml = (metadata?.totals && metadata.totals.length > 0)
      ? `
        <tfoot>
          <tr class="total-row">
            ${metadata.totals.map((t, idx) => `
              <td class="total-cell ${this.isNumericOrCurrency(t) ? 'text-end' : ''}">
                ${idx === 0 && !t ? '<strong>Total / Summary:</strong>' : `<strong>${t ?? ''}</strong>`}
              </td>
            `).join('')}
          </tr>
        </tfoot>
      ` : '';

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${cfg.institutionName} - ${title}</title>
        <style>
          @page {
            size: ${cfg.paperSize} ${orientation};
            margin: 10mm 12mm 12mm 12mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            margin: 0;
            padding: 16px 20px;
            font-size: ${cfg.fontSize === 'small' ? '10px' : cfg.fontSize === 'large' ? '12px' : '11px'};
            line-height: 1.4;
            background: #ffffff;
            position: relative;
          }
          ${cfg.watermarkEnabled ? `
          body::after {
            content: "${cfg.watermarkText}";
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 52px;
            font-weight: 900;
            color: rgba(15, 23, 42, 0.035);
            pointer-events: none;
            z-index: 9999;
            letter-spacing: 6px;
            text-transform: uppercase;
            white-space: nowrap;
          }
          ` : ''}
          .report-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2.5px solid ${cfg.primaryColor};
            padding-bottom: 10px;
            margin-bottom: 12px;
          }
          .institution-brand {
            flex: 1;
          }
          .inst-name {
            font-size: 18px;
            font-weight: 800;
            color: ${cfg.primaryColor};
            margin: 0 0 2px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .inst-sub {
            font-size: 10.5px;
            color: #334155;
            font-weight: 600;
            margin: 0 0 2px 0;
          }
          .inst-meta {
            font-size: 9.5px;
            color: #64748b;
            margin: 0;
          }
          .badge-box {
            text-align: right;
          }
          .report-badge {
            background: ${cfg.primaryColor};
            color: #ffffff;
            padding: 5px 12px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .report-meta-bar {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 7px 12px;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 10.5px;
          }
          .kpi-banner {
            display: flex;
            gap: 10px;
            margin-bottom: 12px;
          }
          .kpi-box {
            flex: 1;
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-left: 4px solid ${cfg.accentColor};
            border-radius: 6px;
            padding: 6px 10px;
          }
          .kpi-label {
            font-size: 9.5px;
            font-weight: 600;
            color: #166534;
            text-transform: uppercase;
          }
          .kpi-value {
            font-size: 14px;
            font-weight: 800;
            color: #0f172a;
          }
          table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
            page-break-inside: auto;
            table-layout: auto;
          }
          thead {
            display: table-header-group;
          }
          tfoot {
            display: table-footer-group;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          table.data-table th {
            background-color: ${cfg.primaryColor};
            color: #ffffff;
            font-weight: 700;
            text-align: left;
            padding: 7px 9px;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            border: 1px solid ${cfg.primaryColor};
            white-space: nowrap;
          }
          table.data-table td {
            padding: 6px 9px;
            border: 1px solid #cbd5e1;
            font-size: 10px;
            color: #1e293b;
            vertical-align: middle;
          }
          table.data-table tbody tr:nth-child(even) {
            background-color: #f8fafc;
          }
          .total-row td {
            background-color: #f1f5f9 !important;
            border-top: 2px solid #002B49 !important;
            font-weight: 700 !important;
            color: #0f172a !important;
          }
          .text-end {
            text-align: right !important;
          }
          .text-center {
            text-align: center !important;
          }
          .signatory-container {
            margin-top: 24px;
            display: flex;
            justify-content: space-between;
            gap: 20px;
            page-break-inside: avoid;
          }
          .sign-box {
            flex: 1;
            text-align: center;
            border-top: 1.5px dashed #94a3b8;
            padding-top: 6px;
          }
          .sign-title {
            font-weight: 700;
            color: #0f172a;
            font-size: 10.5px;
          }
          .sign-desig {
            font-size: 9.5px;
            color: #64748b;
          }
          .report-footer {
            margin-top: 20px;
            padding-top: 8px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 9.5px;
            color: #64748b;
          }
          .no-print-bar {
            margin-bottom: 16px;
            padding: 8px 14px;
            background: #1e293b;
            color: #ffffff;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
          }
          .btn-print {
            background: #059669;
            color: white;
            border: none;
            padding: 6px 16px;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            font-size: 12px;
          }
          .btn-close {
            background: #475569;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            margin-left: 8px;
            font-size: 12px;
          }
          @media print {
            .no-print-bar {
              display: none !important;
            }
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="no-print-bar">
          <div><strong>EasyEdu Print & PDF Generator</strong> &bull; Ready to print or Save as PDF</div>
          <div>
            <button class="btn-print" onclick="window.print()">Print Document / Save as PDF</button>
            <button class="btn-close" onclick="window.close()">Close Window</button>
          </div>
        </div>

        <div class="report-header">
          <div class="institution-brand">
            <h1 class="inst-name">${cfg.institutionName}</h1>
            <div class="inst-sub">${cfg.affiliationText}</div>
            <div class="inst-meta">${cfg.campusAddress} | ${cfg.contactLine}</div>
          </div>
          <div class="badge-box">
            <div class="report-badge">${title}</div>
            <div style="font-size: 9.5px; color: #64748b; margin-top: 4px;">Currency: <strong>${curr.flag} ${curr.code} (${curr.symbol})</strong></div>
          </div>
        </div>

        <div class="report-meta-bar">
          <div>
            <strong>Report:</strong> ${title} ${metadata?.category ? `&bull; <strong>Domain:</strong> ${metadata.category}` : ''}
            ${metadata?.filters ? `&bull; <strong>Scope:</strong> ${metadata.filters}` : ''}
          </div>
          <div>
            ${cfg.showGeneratedDate ? `<strong>Date:</strong> ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}` : ''}
            ${cfg.showGeneratedBy ? `&bull; <strong>Generated By:</strong> Super Administrator` : ''}
          </div>
        </div>

        ${kpiHtml}

        <table class="data-table">
          <thead>
            <tr>
              ${headers.map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                ${row.map(cell => `
                  <td class="${this.isNumericOrCurrency(cell) ? 'text-end' : ''}">
                    ${cell ?? '-'}
                  </td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
          ${totalsRowHtml}
        </table>

        ${metadata?.summaryNotes ? `
          <div style="background: #f8fafc; border-left: 3.5px solid #002B49; padding: 6px 10px; margin-bottom: 14px; font-size: 10px; color: #475569;">
            <strong>Executive Remarks:</strong> ${metadata.summaryNotes}
          </div>
        ` : ''}

        ${activeSignatories.length > 0 ? `
          <div class="signatory-container">
            ${activeSignatories.map(s => `
              <div class="sign-box">
                <div class="sign-title">${s.title}</div>
                <div class="sign-desig">${s.designation}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="report-footer">
          <div>${cfg.footerDisclaimer}</div>
          <div>Page 1 of 1 &bull; Powered by EasyEdu ERP</div>
        </div>
      </body>
      </html>
    `;
  }

  private isNumericOrCurrency(val: any): boolean {
    if (val === null || val === undefined) return false;
    const str = String(val).trim();
    if (!str) return false;
    // Check if starts with currency symbol or is pure number or percentage or format like 478 / 500
    return /^[\$€£₹¥A-Z]{0,3}\s*[\d,]+(\.\d+)?%?$/.test(str) || /^\d+(\.\d+)?%?$/.test(str);
  }
}
