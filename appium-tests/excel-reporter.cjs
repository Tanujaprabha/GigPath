const Mocha = require('mocha');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const { EVENT_RUN_BEGIN, EVENT_RUN_END, EVENT_TEST_FAIL, EVENT_TEST_PASS } = Mocha.Runner.constants;

class AppiumExcelReporter extends Mocha.reporters.Spec {
  constructor(runner, options) {
    super(runner, options);
    this.results = [];
    this.startTime = null;

    runner
      .once(EVENT_RUN_BEGIN, () => { this.startTime = new Date(); })
      .on(EVENT_TEST_PASS, test => { this.addTestResult(test, 'PASS'); })
      .on(EVENT_TEST_FAIL, (test, err) => { this.addTestResult(test, 'FAIL', err); })
      .once(EVENT_RUN_END, async () => {
        const totalDuration = new Date() - this.startTime;
        await this.generateReport(this.runner.stats, totalDuration);
      });
  }

  addTestResult(test, status, err = null) {
    // Extract Test Case ID if it matches the pattern
    const match = test.title.match(/(TC-[A-Z0-9-]+):\s*(.*)/);
    const tcId = match ? match[1] : 'N/A';
    const testName = match ? match[2] : test.title;
    const module = test.parent ? test.parent.title : 'General';

    this.results.push({
      tcId: tcId,
      module: module,
      name: testName,
      platform: 'Android',
      deviceName: global.DEVICE_NAME || 'Device/Emulator', 
      androidVersion: global.ANDROID_VERSION || 'Unknown', 
      appPackage: 'com.tanuj.gigpath',
      status: status,
      duration: test.duration || 0,
      error: err ? err.message : '',
      date: new Date().toLocaleString(),
      screenshot: test.screenshotPath || ''
    });
  }

  async generateReport(stats, totalDuration) {
    const workbook = new ExcelJS.Workbook();
    
    // ---------------------------------------------------------
    // Sheet 1: Mobile Test Execution Summary
    // ---------------------------------------------------------
    const summarySheet = workbook.addWorksheet('Mobile Test Execution Summary');
    summarySheet.columns = [{ width: 25 }, { width: 30 }];
    
    summarySheet.mergeCells('A1:B1');
    const titleCell = summarySheet.getCell('A1');
    titleCell.value = 'Mobile Test Execution Summary';
    titleCell.font = { bold: true, size: 14 };
    titleCell.alignment = { horizontal: 'center' };

    const passPercentage = stats.tests > 0 ? ((stats.passes / stats.tests) * 100).toFixed(2) : 0;

    summarySheet.addRow(['Total Tests', stats.tests]);
    summarySheet.addRow(['Passed', stats.passes]);
    summarySheet.addRow(['Failed', stats.failures]);
    summarySheet.addRow(['Pass Percentage', `${passPercentage}%`]);
    summarySheet.addRow(['Total Duration', `${(totalDuration / 1000).toFixed(2)}s`]);
    summarySheet.addRow(['Device Name', this.results[0]?.deviceName || 'N/A']);
    summarySheet.addRow(['Android Version', this.results[0]?.androidVersion || 'N/A']);
    summarySheet.addRow(['Platform', 'Android']);
    summarySheet.addRow(['App Package', this.results[0]?.appPackage || 'N/A']);
    summarySheet.addRow(['Execution Date', new Date().toLocaleDateString()]);

    for(let i = 2; i <= 11; i++) {
        summarySheet.getCell(`A${i}`).font = { bold: true };
    }
    summarySheet.getCell('B3').font = { color: { argb: 'FF00B050' }, bold: true }; // Green
    summarySheet.getCell('B4').font = { color: { argb: 'FFFF0000' }, bold: true }; // Red
    summarySheet.getCell('B5').font = { bold: true };

    // ---------------------------------------------------------
    // Sheet 2: Mobile Test Results
    // ---------------------------------------------------------
    const detailsSheet = workbook.addWorksheet('Mobile Test Results');
    detailsSheet.columns = [
      { width: 20 }, // TC ID
      { width: 30 }, // Module
      { width: 40 }, // Test Name
      { width: 15 }, // Status
      { width: 20 }, // Execution Time
      { width: 50 }, // Error Message
      { width: 20 }, // Device Name
      { width: 20 }, // Android Version
      { width: 60 }, // Screenshot Path
      { width: 25 }  // Execution Date/Time
    ];

    const detailsHeader = detailsSheet.addRow([
      'Test Case ID', 'Module', 'Test Name', 'Status', 'Execution Time', 
      'Error Message', 'Device Name', 'Android Version', 'Screenshot Path', 'Execution Date/Time'
    ]);
    
    detailsHeader.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    detailsHeader.eachCell(cell => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
      cell.alignment = { horizontal: 'center' };
    });
    
    this.results.forEach(res => {
      const row = detailsSheet.addRow([
        res.tcId, res.module, res.name, res.status, `${res.duration}ms`,
        res.error, res.deviceName, res.androidVersion, res.screenshot, res.date
      ]);
      const statusCell = row.getCell(4);
      statusCell.font = { color: { argb: res.status === 'PASS' ? 'FF00B050' : 'FFFF0000' }, bold: true };
      statusCell.alignment = { horizontal: 'center' };
    });

    // ---------------------------------------------------------
    // Sheet 3: Failed Tests
    // ---------------------------------------------------------
    const failedSheet = workbook.addWorksheet('Failed Tests');
    failedSheet.columns = [
      { width: 20 }, // TC ID
      { width: 60 }, // Error Message
      { width: 60 }  // Screenshot Path
    ];

    const failedHeader = failedSheet.addRow(['Test Case ID', 'Error', 'Screenshot Path']);
    failedHeader.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    failedHeader.eachCell(cell => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC00000' } }; // Red header for failures
      cell.alignment = { horizontal: 'center' };
    });

    this.results.filter(r => r.status === 'FAIL').forEach(res => {
      failedSheet.addRow([res.tcId, res.error, res.screenshot]);
    });

    // ---------------------------------------------------------
    // Save Report
    // ---------------------------------------------------------
    const reportsDir = path.resolve('reports', 'appium');
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

    // Explicitly name as AppiumTestReport.xlsx, adding timestamp so it matches selenium style
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(reportsDir, `AppiumTestReport_${timestamp}.xlsx`);
    
    await workbook.xlsx.writeFile(reportPath);
    console.log(`\n======================================================`);
    console.log(`📱 Appium Excel Report generated at: ${reportPath}`);
    console.log(`======================================================\n`);
  }
}
module.exports = AppiumExcelReporter;
