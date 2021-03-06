$(document).ready(function () {
  function exportTableToCSV($table, filename) {

    $table = $table.clone();
    $table.find("td:nth-child(19)").remove();
    $table.find("th:nth-child(19)").remove();

    var $rows = $table.find('tr:has(td,th)'),
    // Temporary delimiter characters unlikely to be typed by keyboard
    // This is to avoid accidentally splitting the actual contents
    tmpColDelim = String.fromCharCode(11), // vertical tab character
    tmpRowDelim = String.fromCharCode(0), // null character

    // actual delimiter characters for CSV format
    colDelim = '","',
    rowDelim = '"\r\n"',

    // Grab text from table into CSV formatted string
    csv = '"' + $rows.map(function (i, row) { var $row = $(row), $cols = $row.find('td, th');

      return $cols.map(function (j, col) { var $col = $(col), text = $col.text();
      return text.replace('"', '""'); // escape double quotes
    }).get().join(tmpColDelim);

  }).get().join(tmpRowDelim).split(tmpRowDelim).join(rowDelim).split(tmpColDelim).join(colDelim) + '"',

    // Data URI
    csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
    $(this).attr({'download': filename, 'href': csvData, 'target': '_blank'});
  }


  // This must be a hyperlink
  $("#export").on('click', function (event) {
    // CSV
    exportTableToCSV.apply(this, [$('#tblList'), 'table-export.csv']);
    // IF CSV, don't do event.preventDefault() or return false
    // We actually need this to be a typical hyperlink


    //history maintain to store download date.
    var d = new Date();
    var currentDate = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
    var previousDate = $('#currentDate').val();
    var lastIndex = previousDate.lastIndexOf(",");
    var lastDate = previousDate.substring(lastIndex + 1);
    if (previousDate == '') {
      $('#currentDate').val(currentDate);
      localStorage.setItem("downloadHistory", currentDate);
    }
    else if (previousDate != '' && previousDate == currentDate) {
      $('#currentDate').val(previousDate);
      localStorage.setItem("downloadHistory", previousDate);
    }
    else if(currentDate==lastDate){
      $('#currentDate').val(previousDate);
      localStorage.setItem("downloadHistory", previousDate);
    }
    else if(previousDate != currentDate){
      $('#currentDate').val(previousDate + ',' + currentDate);
      localStorage.setItem("downloadHistory", previousDate + ',' + currentDate);
    }
    else{
      $('#currentDate').val('');
    }
  });
});




