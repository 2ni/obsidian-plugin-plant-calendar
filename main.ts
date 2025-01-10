import { Plugin } from 'obsidian';

const parseMonths = (input) => {
  let result = [];
  const ranges = input.split(','); // split by commas for separate ranges

  const filterHalfMonth = (start, end, result) => {
    if (start.startsWith('.')) {
      result[0] = 'x';
    }
    if (start.endsWith('.')) {
      result[1] = 'x';
    }
    if (end.startsWith('.')) {
      result[result.length - 2] = 'x';
    }
    if (end.endsWith('.')) {
      result[result.length - 1] = 'x';
    }
    return result.filter(v => typeof v != 'string');
  };

  for (const range of ranges) {
    if (range.includes('-')) {
      // handle ranges like '5-7'
      const [start, end] = range.replace(/\./g, '').split('-').map(Number);
      const [startOrig, endOrig] = range.split('-');
      const resultTemp = [];
      for (let i = start; i <= end; i++) {
        resultTemp.push(i * 2 - 1, i * 2); // Add both half-months for each month
      }
      result = [ ...result, ...filterHalfMonth(startOrig, endOrig, resultTemp) ];

    } else {
      // handle single months like '2,5'
      const month = Number(range.replace('.', ''));
      if (range.startsWith('.') || !range.includes('.')) {
        result.push(month * 2);
      }
      if (range.endsWith('.') || !range.includes('.')) {
        result.push(month * 2 - 1);
      }
    }
  }

  return result.sort((a, b) => a - b);
}

export default class PlantCalendarPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: 'plantcalendar-add',
      name: 'Add a calendar',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        editor.replaceRange('```plantcalendar\nAubergine\nAnzucht:2-3\nGewächshaus:.4,5,6\nFreiland:.5-7\nErnte:8-10\n```', editor.getCursor());
      },
    });

    this.registerMarkdownCodeBlockProcessor('plantcalendar', (source, el, ctx) => {
      const month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez' ];
      const plants = {};
      const rows = source.split('\n');
      const table = el.createEl('table', { cls: 'plantcalendar' });

      let monthShown = false;
      rows.forEach(row => {
        if (!row.includes(':')) {
          // add some spaces before next plant
          if (monthShown) {
            table.createEl('tr', { cls: 'spacer' } ).createEl('td', { attr: { colspan: '25' } });
          }

          let tableRow = table.createEl('tr');
          tableRow.createEl('th', { text: row });

          // show months on first column only
          if (!monthShown) {
            monthShown = true;
            for (let i=0; i<12; i++) {
              tableRow.createEl('th', { text: month[i], attr: { colspan: '2' } });
            }
          }
        } else {
          let [ label, highlights ] = row.split(':');
          let tableRow = table.createEl('tr', { cls: label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-") });
          highlights = parseMonths(highlights.replace(/ /g, ''));
          console.log('highlights', highlights);
          tableRow.createEl('td', { text: label });

          for (let i=0; i<24; i++) {
            tableRow.createEl('td', { text: highlights.includes(i+1) ? 'x' : '', cls: highlights.includes(i+1) ? 'highlight' : '' });
          }
        }
      });
    });
  }
}
