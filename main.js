/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => PlantCalendarPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var parseMonths = (input) => {
  let result = [];
  const ranges = input.split(",");
  const filterHalfMonth = (start, end, result2) => {
    if (start.startsWith(".")) {
      result2[0] = "x";
    }
    if (start.endsWith(".")) {
      result2[1] = "x";
    }
    if (end.startsWith(".")) {
      result2[result2.length - 2] = "x";
    }
    if (end.endsWith(".")) {
      result2[result2.length - 1] = "x";
    }
    return result2.filter((v) => typeof v != "string");
  };
  for (const range of ranges) {
    if (range.includes("-")) {
      const [start, end] = range.replace(/\./g, "").split("-").map(Number);
      const [startOrig, endOrig] = range.split("-");
      const resultTemp = [];
      for (let i = start; i <= end; i++) {
        resultTemp.push(i * 2 - 1, i * 2);
      }
      result = [...result, ...filterHalfMonth(startOrig, endOrig, resultTemp)];
    } else {
      const month = Number(range.replace(".", ""));
      if (range.startsWith(".") || !range.includes(".")) {
        result.push(month * 2);
      }
      if (range.endsWith(".") || !range.includes(".")) {
        result.push(month * 2 - 1);
      }
    }
  }
  return result.sort((a, b) => a - b);
};
var PlantCalendarPlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.addCommand({
      id: "plantcalendar-add",
      name: "Add a calendar",
      editorCallback: (editor, view) => {
        editor.replaceRange("```plantcalendar\nAubergine\nAnzucht:2-3\nGew\xE4chshaus:.4,5,6\nFreiland:.5-7\nErnte:8-10\n```", editor.getCursor());
      }
    });
    this.registerMarkdownCodeBlockProcessor("plantcalendar", (source, el, ctx) => {
      const month = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
      const plants = {};
      const rows = source.split("\n");
      const table = el.createEl("table", { cls: "plantcalendar" });
      let monthShown = false;
      rows.forEach((row) => {
        if (!row.match(":[ .,0-9-]*$")) {
          if (monthShown) {
            table.createEl("tr", { cls: "spacer" }).createEl("td", { attr: { colspan: "25" } });
          }
          let tableRow = table.createEl("tr");
          let labelCell = tableRow.createEl("th");
          import_obsidian.MarkdownRenderer.renderMarkdown(row, labelCell, "", this);
          if (!monthShown) {
            monthShown = true;
            for (let i = 0; i < 12; i++) {
              tableRow.createEl("th", { text: month[i], attr: { colspan: "2" } });
            }
          }
        } else {
          let [label, highlights] = row.split(":");
          let tableRow = table.createEl("tr", { cls: label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-") });
          highlights = parseMonths(highlights.replace(/ /g, ""));
          tableRow.createEl("td", { text: label });
          for (let i = 0; i < 24; i++) {
            tableRow.createEl("td", { text: highlights.includes(i + 1) ? "x" : "", cls: highlights.includes(i + 1) ? "highlight" : "" });
          }
        }
      });
    });
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgUGx1Z2luLCBNYXJrZG93blJlbmRlcmVyIH0gZnJvbSAnb2JzaWRpYW4nO1xuXG5jb25zdCBwYXJzZU1vbnRocyA9IChpbnB1dCkgPT4ge1xuICBsZXQgcmVzdWx0ID0gW107XG4gIGNvbnN0IHJhbmdlcyA9IGlucHV0LnNwbGl0KCcsJyk7IC8vIHNwbGl0IGJ5IGNvbW1hcyBmb3Igc2VwYXJhdGUgcmFuZ2VzXG5cbiAgY29uc3QgZmlsdGVySGFsZk1vbnRoID0gKHN0YXJ0LCBlbmQsIHJlc3VsdCkgPT4ge1xuICAgIGlmIChzdGFydC5zdGFydHNXaXRoKCcuJykpIHtcbiAgICAgIHJlc3VsdFswXSA9ICd4JztcbiAgICB9XG4gICAgaWYgKHN0YXJ0LmVuZHNXaXRoKCcuJykpIHtcbiAgICAgIHJlc3VsdFsxXSA9ICd4JztcbiAgICB9XG4gICAgaWYgKGVuZC5zdGFydHNXaXRoKCcuJykpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMl0gPSAneCc7XG4gICAgfVxuICAgIGlmIChlbmQuZW5kc1dpdGgoJy4nKSkge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSA9ICd4JztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5maWx0ZXIodiA9PiB0eXBlb2YgdiAhPSAnc3RyaW5nJyk7XG4gIH07XG5cbiAgZm9yIChjb25zdCByYW5nZSBvZiByYW5nZXMpIHtcbiAgICBpZiAocmFuZ2UuaW5jbHVkZXMoJy0nKSkge1xuICAgICAgLy8gaGFuZGxlIHJhbmdlcyBsaWtlICc1LTcnXG4gICAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSByYW5nZS5yZXBsYWNlKC9cXC4vZywgJycpLnNwbGl0KCctJykubWFwKE51bWJlcik7XG4gICAgICBjb25zdCBbc3RhcnRPcmlnLCBlbmRPcmlnXSA9IHJhbmdlLnNwbGl0KCctJyk7XG4gICAgICBjb25zdCByZXN1bHRUZW1wID0gW107XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgcmVzdWx0VGVtcC5wdXNoKGkgKiAyIC0gMSwgaSAqIDIpOyAvLyBBZGQgYm90aCBoYWxmLW1vbnRocyBmb3IgZWFjaCBtb250aFxuICAgICAgfVxuICAgICAgcmVzdWx0ID0gWyAuLi5yZXN1bHQsIC4uLmZpbHRlckhhbGZNb250aChzdGFydE9yaWcsIGVuZE9yaWcsIHJlc3VsdFRlbXApIF07XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFuZGxlIHNpbmdsZSBtb250aHMgbGlrZSAnMiw1J1xuICAgICAgY29uc3QgbW9udGggPSBOdW1iZXIocmFuZ2UucmVwbGFjZSgnLicsICcnKSk7XG4gICAgICBpZiAocmFuZ2Uuc3RhcnRzV2l0aCgnLicpIHx8ICFyYW5nZS5pbmNsdWRlcygnLicpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKG1vbnRoICogMik7XG4gICAgICB9XG4gICAgICBpZiAocmFuZ2UuZW5kc1dpdGgoJy4nKSB8fCAhcmFuZ2UuaW5jbHVkZXMoJy4nKSkge1xuICAgICAgICByZXN1bHQucHVzaChtb250aCAqIDIgLSAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0LnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhbnRDYWxlbmRhclBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIGFzeW5jIG9ubG9hZCgpIHtcbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICdwbGFudGNhbGVuZGFyLWFkZCcsXG4gICAgICBuYW1lOiAnQWRkIGEgY2FsZW5kYXInLFxuICAgICAgZWRpdG9yQ2FsbGJhY2s6IChlZGl0b3I6IEVkaXRvciwgdmlldzogTWFya2Rvd25WaWV3KSA9PiB7XG4gICAgICAgIGVkaXRvci5yZXBsYWNlUmFuZ2UoJ2BgYHBsYW50Y2FsZW5kYXJcXG5BdWJlcmdpbmVcXG5Bbnp1Y2h0OjItM1xcbkdld1x1MDBFNGNoc2hhdXM6LjQsNSw2XFxuRnJlaWxhbmQ6LjUtN1xcbkVybnRlOjgtMTBcXG5gYGAnLCBlZGl0b3IuZ2V0Q3Vyc29yKCkpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMucmVnaXN0ZXJNYXJrZG93bkNvZGVCbG9ja1Byb2Nlc3NvcigncGxhbnRjYWxlbmRhcicsIChzb3VyY2UsIGVsLCBjdHgpID0+IHtcbiAgICAgIGNvbnN0IG1vbnRoID0gWyAnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01haScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2t0JywgJ05vdicsICdEZXonIF07XG4gICAgICBjb25zdCBwbGFudHMgPSB7fTtcbiAgICAgIGNvbnN0IHJvd3MgPSBzb3VyY2Uuc3BsaXQoJ1xcbicpO1xuICAgICAgY29uc3QgdGFibGUgPSBlbC5jcmVhdGVFbCgndGFibGUnLCB7IGNsczogJ3BsYW50Y2FsZW5kYXInIH0pO1xuXG4gICAgICBsZXQgbW9udGhTaG93biA9IGZhbHNlO1xuICAgICAgcm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgIGlmICghcm93Lm1hdGNoKCc6WyAuLDAtOS1dKiQnKSkge1xuICAgICAgICAgIC8vIGFkZCBzb21lIHNwYWNlcyBiZWZvcmUgbmV4dCBwbGFudFxuICAgICAgICAgIGlmIChtb250aFNob3duKSB7XG4gICAgICAgICAgICB0YWJsZS5jcmVhdGVFbCgndHInLCB7IGNsczogJ3NwYWNlcicgfSApLmNyZWF0ZUVsKCd0ZCcsIHsgYXR0cjogeyBjb2xzcGFuOiAnMjUnIH0gfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcGxhbnQgbmFtZSBpbiB2YXJpYWJsZSByb3dcbiAgICAgICAgICBsZXQgdGFibGVSb3cgPSB0YWJsZS5jcmVhdGVFbCgndHInKTtcbiAgICAgICAgICBsZXQgbGFiZWxDZWxsID0gdGFibGVSb3cuY3JlYXRlRWwoJ3RoJyk7XG4gICAgICAgICAgTWFya2Rvd25SZW5kZXJlci5yZW5kZXJNYXJrZG93bihyb3csIGxhYmVsQ2VsbCwgJycsIHRoaXMpO1xuXG4gICAgICAgICAgLy8gc2hvdyBtb250aHMgb24gZmlyc3QgY29sdW1uIG9ubHlcbiAgICAgICAgICBpZiAoIW1vbnRoU2hvd24pIHtcbiAgICAgICAgICAgIG1vbnRoU2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPDEyOyBpKyspIHtcbiAgICAgICAgICAgICAgdGFibGVSb3cuY3JlYXRlRWwoJ3RoJywgeyB0ZXh0OiBtb250aFtpXSwgYXR0cjogeyBjb2xzcGFuOiAnMicgfSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IFsgbGFiZWwsIGhpZ2hsaWdodHMgXSA9IHJvdy5zcGxpdCgnOicpO1xuICAgICAgICAgIGxldCB0YWJsZVJvdyA9IHRhYmxlLmNyZWF0ZUVsKCd0cicsIHsgY2xzOiBsYWJlbC50b0xvd2VyQ2FzZSgpLm5vcm1hbGl6ZShcIk5GRFwiKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCBcIlwiKS5yZXBsYWNlKC8gL2csIFwiLVwiKSB9KTtcbiAgICAgICAgICBoaWdobGlnaHRzID0gcGFyc2VNb250aHMoaGlnaGxpZ2h0cy5yZXBsYWNlKC8gL2csICcnKSk7XG4gICAgICAgICAgdGFibGVSb3cuY3JlYXRlRWwoJ3RkJywgeyB0ZXh0OiBsYWJlbCB9KTtcblxuICAgICAgICAgIGZvciAobGV0IGk9MDsgaTwyNDsgaSsrKSB7XG4gICAgICAgICAgICB0YWJsZVJvdy5jcmVhdGVFbCgndGQnLCB7IHRleHQ6IGhpZ2hsaWdodHMuaW5jbHVkZXMoaSsxKSA/ICd4JyA6ICcnLCBjbHM6IGhpZ2hsaWdodHMuaW5jbHVkZXMoaSsxKSA/ICdoaWdobGlnaHQnIDogJycgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQUF5QztBQUV6QyxJQUFNLGNBQWMsQ0FBQyxVQUFVO0FBQzdCLE1BQUksU0FBUyxDQUFDO0FBQ2QsUUFBTSxTQUFTLE1BQU0sTUFBTSxHQUFHO0FBRTlCLFFBQU0sa0JBQWtCLENBQUMsT0FBTyxLQUFLQSxZQUFXO0FBQzlDLFFBQUksTUFBTSxXQUFXLEdBQUcsR0FBRztBQUN6QixNQUFBQSxRQUFPLENBQUMsSUFBSTtBQUFBLElBQ2Q7QUFDQSxRQUFJLE1BQU0sU0FBUyxHQUFHLEdBQUc7QUFDdkIsTUFBQUEsUUFBTyxDQUFDLElBQUk7QUFBQSxJQUNkO0FBQ0EsUUFBSSxJQUFJLFdBQVcsR0FBRyxHQUFHO0FBQ3ZCLE1BQUFBLFFBQU9BLFFBQU8sU0FBUyxDQUFDLElBQUk7QUFBQSxJQUM5QjtBQUNBLFFBQUksSUFBSSxTQUFTLEdBQUcsR0FBRztBQUNyQixNQUFBQSxRQUFPQSxRQUFPLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDOUI7QUFDQSxXQUFPQSxRQUFPLE9BQU8sT0FBSyxPQUFPLEtBQUssUUFBUTtBQUFBLEVBQ2hEO0FBRUEsYUFBVyxTQUFTLFFBQVE7QUFDMUIsUUFBSSxNQUFNLFNBQVMsR0FBRyxHQUFHO0FBRXZCLFlBQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLFFBQVEsT0FBTyxFQUFFLEVBQUUsTUFBTSxHQUFHLEVBQUUsSUFBSSxNQUFNO0FBQ25FLFlBQU0sQ0FBQyxXQUFXLE9BQU8sSUFBSSxNQUFNLE1BQU0sR0FBRztBQUM1QyxZQUFNLGFBQWEsQ0FBQztBQUNwQixlQUFTLElBQUksT0FBTyxLQUFLLEtBQUssS0FBSztBQUNqQyxtQkFBVyxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUFBLE1BQ2xDO0FBQ0EsZUFBUyxDQUFFLEdBQUcsUUFBUSxHQUFHLGdCQUFnQixXQUFXLFNBQVMsVUFBVSxDQUFFO0FBQUEsSUFFM0UsT0FBTztBQUVMLFlBQU0sUUFBUSxPQUFPLE1BQU0sUUFBUSxLQUFLLEVBQUUsQ0FBQztBQUMzQyxVQUFJLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLFNBQVMsR0FBRyxHQUFHO0FBQ2pELGVBQU8sS0FBSyxRQUFRLENBQUM7QUFBQSxNQUN2QjtBQUNBLFVBQUksTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sU0FBUyxHQUFHLEdBQUc7QUFDL0MsZUFBTyxLQUFLLFFBQVEsSUFBSSxDQUFDO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFNBQU8sT0FBTyxLQUFLLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQztBQUNwQztBQUVBLElBQXFCLHNCQUFyQixjQUFpRCx1QkFBTztBQUFBLEVBQ3RELE1BQU0sU0FBUztBQUNiLFNBQUssV0FBVztBQUFBLE1BQ2QsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sZ0JBQWdCLENBQUMsUUFBZ0IsU0FBdUI7QUFDdEQsZUFBTyxhQUFhLG1HQUFnRyxPQUFPLFVBQVUsQ0FBQztBQUFBLE1BQ3hJO0FBQUEsSUFDRixDQUFDO0FBRUQsU0FBSyxtQ0FBbUMsaUJBQWlCLENBQUMsUUFBUSxJQUFJLFFBQVE7QUFDNUUsWUFBTSxRQUFRLENBQUUsT0FBTyxPQUFPLE9BQU8sT0FBTyxPQUFPLE9BQU8sT0FBTyxPQUFPLE9BQU8sT0FBTyxPQUFPLEtBQU07QUFDbkcsWUFBTSxTQUFTLENBQUM7QUFDaEIsWUFBTSxPQUFPLE9BQU8sTUFBTSxJQUFJO0FBQzlCLFlBQU0sUUFBUSxHQUFHLFNBQVMsU0FBUyxFQUFFLEtBQUssZ0JBQWdCLENBQUM7QUFFM0QsVUFBSSxhQUFhO0FBQ2pCLFdBQUssUUFBUSxTQUFPO0FBQ2xCLFlBQUksQ0FBQyxJQUFJLE1BQU0sY0FBYyxHQUFHO0FBRTlCLGNBQUksWUFBWTtBQUNkLGtCQUFNLFNBQVMsTUFBTSxFQUFFLEtBQUssU0FBUyxDQUFFLEVBQUUsU0FBUyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsS0FBSyxFQUFFLENBQUM7QUFBQSxVQUNyRjtBQUdBLGNBQUksV0FBVyxNQUFNLFNBQVMsSUFBSTtBQUNsQyxjQUFJLFlBQVksU0FBUyxTQUFTLElBQUk7QUFDdEMsMkNBQWlCLGVBQWUsS0FBSyxXQUFXLElBQUksSUFBSTtBQUd4RCxjQUFJLENBQUMsWUFBWTtBQUNmLHlCQUFhO0FBQ2IscUJBQVMsSUFBRSxHQUFHLElBQUUsSUFBSSxLQUFLO0FBQ3ZCLHVCQUFTLFNBQVMsTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLFNBQVMsSUFBSSxFQUFFLENBQUM7QUFBQSxZQUNwRTtBQUFBLFVBQ0Y7QUFBQSxRQUNGLE9BQU87QUFDTCxjQUFJLENBQUUsT0FBTyxVQUFXLElBQUksSUFBSSxNQUFNLEdBQUc7QUFDekMsY0FBSSxXQUFXLE1BQU0sU0FBUyxNQUFNLEVBQUUsS0FBSyxNQUFNLFlBQVksRUFBRSxVQUFVLEtBQUssRUFBRSxRQUFRLG9CQUFvQixFQUFFLEVBQUUsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3BJLHVCQUFhLFlBQVksV0FBVyxRQUFRLE1BQU0sRUFBRSxDQUFDO0FBQ3JELG1CQUFTLFNBQVMsTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLG1CQUFTLElBQUUsR0FBRyxJQUFFLElBQUksS0FBSztBQUN2QixxQkFBUyxTQUFTLE1BQU0sRUFBRSxNQUFNLFdBQVcsU0FBUyxJQUFFLENBQUMsSUFBSSxNQUFNLElBQUksS0FBSyxXQUFXLFNBQVMsSUFBRSxDQUFDLElBQUksY0FBYyxHQUFHLENBQUM7QUFBQSxVQUN6SDtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNIO0FBQ0Y7IiwKICAibmFtZXMiOiBbInJlc3VsdCJdCn0K
