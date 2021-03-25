$(document).ready(function(){
    $('.downlaodcsv').click(function(){
      var nomenclature = {
         "Date": 'Date',
         "Moment": 'Date',
         "Time": "What time did you get into bed? ",
         "Time2": "What time did you try to go to sleep?",
         "Dropdown": "How long did it take you to fall asleep?",
         "Dropdown2": "How many minutes did you nap yesterday? ",
         "Dropdown3": "How many times did you wake up DURING THE NIGHT?",
         "Dropdown4": "In total how long did these awakenings last?",
         "Time3": "What time was your final awakening?",
         "Time4": "What time did you get out of bed for the day?",
         "Dropdown5": "How much earlier did you wakeup than desired?",
         "RangeSlide": "How would you rate the quality of your sleep?",
         "datapointH": "TOTAL TIME IN BED",
         "datapointI": "PRE-SLEEP TIME IN BED",
         "datapointJ": "SNOOZE TIME",
         "datapointK": "TOTAL WAKE TIME",
         "datapointL": "TOTAL SLEEP TIME",
         "datapointM": "SLEEP EFFICIENCY",
         "datapointZ": "Total Sleep with Naps",
      };
        var data = sortedDates;
        data.unshift(nomenclature); 
        console.log(sortedDates)
        if(data == '')
            return;




        $.each(data, function (index, element) {
           $.each(this, function (name, value) {
              if(name == 'Dropdown' || name == 'Dropdown2' || name == 'Dropdown4' || name == 'Dropdown5' || name == 'datapointH' || name == 'datapointI' || name == 'datapointJ' || name == 'datapointK' || name == 'datapointL' || name == 'datapointZ' ) {
                if ($.isNumeric(value)) {
                  var convertedValue = csvConvertToHrsMin(value);
                  //console.log(convertedValue);
                  data[index][name] = convertedValue
                  //console.log('index - '+index + 'name - '+ name + '=' + value);
                }
              }
              if(name == 'RangeSlide' ) {
                if ($.isNumeric(value)) {
                  var rangeConverted = '';
                  if (value == 0) {
                    rangeConverted = 'Very Poor';
                  }
                  if (value == 2.5) {
                    rangeConverted = 'Poor';
                  }
                  if (value == 5) {
                    rangeConverted = 'Fair';
                  }
                  if (value == 7.5) {
                    rangeConverted = 'Good';
                  }
                  if (value == 10) {
                    rangeConverted = 'Very Good';
                  }
                  //console.log(convertedValue);
                  data[index][name] = rangeConverted;
                  //console.log('index - '+index + 'name - '+ name + '=' + value);
                }
              }
           });
        });



        JSONToCSVConvertor(data, false);
    });
    
});

function csvConvertToHrsMin(minutes) {
    var MinHours = Math.floor(minutes / 60);
    var MinMinutes = minutes % 60;
    if (MinHours == 0) {
      MinHours = '';
    } else {
      if(MinHours == 1) {
        MinHours = MinHours + '-Hour  ';
      } else {
        MinHours = MinHours + '-Hours  ';
      }
    }
    
    if(MinMinutes == 1) {
      MinMinutes = MinMinutes + '-Minute';
    } else {
      MinMinutes = MinMinutes + '-Minutes';
    }
    return MinHours + MinMinutes;
  }


function JSONToCSVConvertor(JSONData,ShowLabel) {    
  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;   
  var CSV = '';     
  if (ShowLabel) {
     var row = "";
     for (var index in arrData[0]) {
         row += index + ',';
     }
     row = row.slice(0, -1);
     CSV += row + '\r\n';
  }
  for (var i = 0; i < arrData.length; i++) {
     var row = "";
     for (var index in arrData[i]) {
        var arrValue = arrData[i][index] == null ? "" : '="' + arrData[i][index] + '"';
        row += arrValue + ',';
     }
     row.slice(0, row.length - 1);
     CSV += row + '\r\n';
  }
  if (CSV == '') {        
     growl.error("Invalid data");
     return;
  }   
  var fileName = "Result";
  // The download function takes a CSV string, the filename and mimeType as parameters
  // Scroll/look down at the bottom of this snippet to see how download is called
  var download = function(content, fileName, mimeType) {
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';

    if (navigator.msSaveBlob) { // IE10
      navigator.msSaveBlob(new Blob([content], {
        type: mimeType
      }), fileName);
    } else if (URL && 'download' in a) { //html5 A[download]
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
    }
  }
  var dload = 'download - ' + moment().format('lll') + '.csv';
  download(CSV, dload, 'text/csv;encoding:utf-8');

}
function runSleepDiary() {
  for (var i = 1; i < 7; i++) {
   var dateKey = moment().subtract(i, 'day').format('MM/DD/YYYY');
   var dateMoment = moment().subtract(i, 'day');
   if (i == 6){
      localStorage.setItem(dateKey, JSON.stringify({
         "Date": dateKey,
         "Moment": dateMoment,
         "Time": "10:10 PM",
         "Time2": "10:30 PM",
         "Dropdown": "30",
         "Dropdown2": "30",
         "Dropdown3": "3",
         "Dropdown4": "50",
         "Time3": "06:00 AM",
         "Time4": "06:30 AM",
         "Dropdown5": "30",
         "RangeSlide": "5",
         "datapointH": "480",
         "datapointI": "20",
         "datapointJ": "30",
         "datapointK": "110",
         "datapointL": "370",
         "datapointM": "77",
         "datapointZ": "400",
      }));
   }
   if (i == 5){
      localStorage.setItem(dateKey, JSON.stringify({
         "Date": dateKey,
         "Moment": dateMoment,
         "Time": "11:00 PM",
         "Time2": "11:20 PM",
         "Dropdown": "50",
         "Dropdown2": "60",
         "Dropdown3": "3",
         "Dropdown4": "90",
         "Time3": "05:50 AM",
         "Time4": "06:30 AM",
         "Dropdown5": "40",
         "RangeSlide": "5",
         "datapointH": "430",
         "datapointI": "20",
         "datapointJ": "40",
         "datapointK": "180",
         "datapointL": "250",
         "datapointM": "58",
         "datapointZ": "310",
      }));
   }
   if (i == 4){
      localStorage.setItem(dateKey, JSON.stringify({
         "Date": dateKey,
         "Moment": dateMoment,
         "Time": "11:20 PM",
         "Time2": "11:20 PM",
         "Dropdown": "90",
         "Dropdown2": "40",
         "Dropdown3": "1",
         "Dropdown4": "20",
         "Time3": "06:10 AM",
         "Time4": "06:20 AM",
         "Dropdown5": "10",
         "RangeSlide": "5",
         "datapointH": "420",
         "datapointI": "0",
         "datapointJ": '10',
         "datapointK": "120",
         "datapointL": "300",
         "datapointM": '71',
         "datapointZ": "340",
      }));
   }
   if (i == 3){
      localStorage.setItem(dateKey, JSON.stringify({
         "Date": dateKey,
         "Moment": dateMoment,
         "Time": "11:00 PM",
         "Time2": "11:20 PM",
         "Dropdown": "10",
         "Dropdown2": "30",
         "Dropdown3": "0",
         "Dropdown4": "0",
         "Time3": "06:00 AM",
         "Time4": "06:30 AM",
         "Dropdown5": "30",
         "RangeSlide": "5",
         "datapointH": "430",
         "datapointI": "20",
         "datapointJ": "30",
         "datapointK": "40",
         "datapointL": "390",
         "datapointM": "91",
         "datapointZ": "420",
       }));
   }
   if (i == 2){
      localStorage.setItem(dateKey, JSON.stringify({
         "Date": dateKey,
         "Moment": dateMoment,
         "Time": "10:00 PM",
         "Time2": "10:40 PM",
         "Dropdown": "30",
         "Dropdown2": "0",
         "Dropdown3": "2",
         "Dropdown4": "50",
         "Time3": "05:30 AM",
         "Time4": "06:20 AM",
         "Dropdown5": "50",
         "RangeSlide": "5",
         "datapointH": "460",
         "datapointI": "40",
         "datapointJ": "50",
         "datapointK": "130",
         "datapointL": "330",
         "datapointM": "72",
         "datapointZ": "330",
       }));
   }
   if (i == 1){
      localStorage.setItem(dateKey, JSON.stringify({
         "Date": dateKey,
         "Moment": dateMoment,
         "Time": "10:10 PM",
         "Time2": "10:50 PM",
         "Dropdown": "20",
         "Dropdown2": "0",
         "Dropdown3": "0",
         "Dropdown4": "0",
         "Time3": "06:40 AM",
         "Time4": "07:00 AM",
         "Dropdown5": "5",
         "RangeSlide": "5",
         "datapointH": "490",
         "datapointI": "40",
         "datapointJ": "20",
         "datapointK": "40",
         "datapointL": "450",
         "datapointM": "92",
         "datapointZ": "450",
       }));
   }
   if (i == 0){
      localStorage.setItem(dateKey, JSON.stringify({
         "Date": dateKey,
         "Moment": dateMoment,
         "Time": "10:30 PM",
         "Time2": "10:40 PM",
         "Dropdown": "20",
         "Dropdown2": "20",
         "Dropdown3": "2",
         "Dropdown4": "70",
         "Time3": "06:40 AM",
         "Time4": "07:00 AM",
         "Dropdown5": "20",
         "RangeSlide": "5",
         "datapointH": "500",
         "datapointI": "10",
         "datapointJ": "20",
         "datapointK": "110",
         "datapointL": "390",
         "datapointM": "78",
         "datapointZ": "410",
      }));
   }
};

}