const Mocha = require('mocha');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
} = Mocha.Runner.constants;

class ExcelReporter extends Mocha.reporters.Base {
  constructor(runner, options) {
    super(runner, options);
    
    this.results = [];
    this.startTime = null;
    this.totalCompleted = 0;
    this.totalTests = 0;

    runner
      .once(EVENT_RUN_BEGIN, () => {
        this.startTime = new Date();
        this.totalTests = runner.total;
        console.log('\nStarting Test Suite Execution...\n');
      })
      .on(EVENT_TEST_PASS, test => {
        let id = '';
        let scenario = test.title;
        const match = test.title.match(/^\[(.*?)\] (.*)$/);
        if (match) {
          id = match[1];
          scenario = match[2];
        }
        this.totalCompleted++;
        
        if (this.totalCompleted > 1 && process.stdout.isTTY) {
          const readline = require('readline');
          readline.moveCursor(process.stdout, 0, -2);
          readline.clearScreenDown(process.stdout);
        }
        console.log(`\x1b[32m✔\x1b[0m ${id}: ${scenario} (${test.duration}ms)`);
        
        if (process.stdout.isTTY) {
            process.stdout.write(`\nProgress: ${this.totalCompleted}/${this.totalTests}\n`);
        }

        this.results.push({
          id: id,
          scenario: scenario,
          module: test.parent ? test.parent.title : 'General',
          status: 'Pass',
          duration: test.duration || 0,
          error: '',
          date: new Date().toLocaleString()
        });
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        let id = '';
        let scenario = test.title;
        const match = test.title.match(/^\[(.*?)\] (.*)$/);
        if (match) {
          id = match[1];
          scenario = match[2];
        }
        this.totalCompleted++;
        
        if (this.totalCompleted > 1 && process.stdout.isTTY) {
          const readline = require('readline');
          readline.moveCursor(process.stdout, 0, -2);
          readline.clearScreenDown(process.stdout);
        }
        console.log(`\x1b[31m✖\x1b[0m ${id}: ${scenario} (${test.duration}ms)`);
        
        if (process.stdout.isTTY) {
            process.stdout.write(`\nProgress: ${this.totalCompleted}/${this.totalTests}\n`);
        }

        this.results.push({
          id: id,
          scenario: scenario,
          module: test.parent ? test.parent.title : 'General',
          status: 'Fail',
          duration: test.duration || 0,
          error: err.message || '',
          date: new Date().toLocaleString()
        });
      })
      .once(EVENT_RUN_END, async () => {
        // Clear the final progress line to make room for the summary
        process.stdout.write('\x1b[2K\x1b[0G');
        process.stdout.write('\x1b[1A\x1b[2K\x1b[0G');
        
        const totalDuration = new Date() - this.startTime;
        await this.generateReport(this.runner.stats, totalDuration);
      });
  }

  async generateReport(stats, totalDuration) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Test Report');

    // Make columns wider
    sheet.columns = [
      { width: 25 }, // Module Name
      { width: 20 }, // Test Case ID
      { width: 50 }, // Scenario Name
      { width: 15 }, // Status
      { width: 25 }, // Execution Time
      { width: 50 }, // Error Message
      { width: 25 }  // Date/Time
    ];

    // Summary Section
    sheet.mergeCells('A1:C1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = 'Test Execution Summary';
    titleCell.font = { bold: true, size: 14 };
    titleCell.alignment = { horizontal: 'center' };

    sheet.addRow(['Total Tests', stats.tests]);
    sheet.addRow(['Passed', stats.passes]);
    sheet.addRow(['Failed', stats.failures]);
    sheet.addRow(['Total Duration', `${(totalDuration / 1000).toFixed(2)}s`]);
    sheet.addRow([]);

    // Style the summary block
    for(let i = 2; i <= 5; i++) {
        sheet.getCell(`A${i}`).font = { bold: true };
    }
    sheet.getCell('B3').font = { color: { argb: 'FF00B050' }, bold: true }; // Green for passed
    sheet.getCell('B4').font = { color: { argb: 'FFFF0000' }, bold: true }; // Red for failed

    // Details Header
    const headerRow = sheet.addRow(['Module', 'Test Case ID', 'Scenario Name', 'Status', 'Execution Time', 'Error Message', 'Execution Date/Time']);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4472C4' }
      };
      cell.alignment = { horizontal: 'center' };
    });
    
    // Details
    this.results.forEach(res => {
      const row = sheet.addRow([
        res.module,
        res.id,
        res.scenario, 
        res.status, 
        `${res.duration}ms`, 
        res.error, 
        res.date
      ]);
      
      const statusCell = row.getCell(4);
      if (res.status === 'Pass') {
        statusCell.font = { color: { argb: 'FF00B050' }, bold: true };
      } else {
        statusCell.font = { color: { argb: 'FFFF0000' }, bold: true };
      }
      statusCell.alignment = { horizontal: 'center' };
      row.getCell(5).alignment = { horizontal: 'center' };
      row.getCell(7).alignment = { horizontal: 'center' };
    });

    const reportsDir = path.resolve('reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(reportsDir, `TestReport_${timestamp}.xlsx`);
    
    await workbook.xlsx.writeFile(reportPath);
    console.log(`\n======================================================`);
    console.log(`📊 Excel Report generated at: ${reportPath}`);
    console.log(`======================================================\n`);
  }
}

module.exports = ExcelReporter;
