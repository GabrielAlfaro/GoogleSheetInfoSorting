function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Populate Sheet').addItem('Auto-Populate', 'myFunction').addToUi();
}
/*
When the Google Sheet is opened the function onOpen() will create a button that will perform the sorting automatically.
*/

function myFunction() {
  //url for the pop response form
  var s1 = SpreadsheetApp.openByUrl("URL");
  
  //The URL here is removed for privacy and replaced by "URL" of the google sheet.
  
  var signInSheet = s1.getSheetByName("Form Responses 1");
  
  /*
  The URL above needs to be the url to the sign in google sheet
  */
  var s2 = SpreadsheetApp.openByUrl("URL");
  var masterlist = s2.getSheetByName("Sheet1");
  /*
  The URL for this^ variable is connected to the information of every student as well as being removed from this code.
  */
  //and set the name of the sheet at the bottom of the google sheet page in the quotations. Ex: ("Sheet1")
  //Sheet1 will be the default name when making the google sheet
  var ss = SpreadsheetApp.openByUrl("URL");
  /*
  This URL is the link to the spreadsheet that contains the student list and the MONTH Attend
  */
  var studentlist = ss.getSheetByName("Student List");
  //This is to write to the Student List Sheet
  
  
  var sheetL = signInSheet.getRange("A2:A").getValues();
  var sheetLength = sheetL.filter(String).length;
  
  var lunchL = signInSheet.getRange("E2:E").getValues();
  var lunchLength = lunchL.filter(Number).length;
  
  var mlength = masterlist.getRange("C2:C").getValues();
  var masterLength = mlength.filter(String).length;
  
  /*
  The above code gets the information of each column, puts it into a dynamic array and gets the length of each column.
  */
  
  
  var uniqueValues = signInSheet.getRange("I2:I").getValues();//used for the unique values of all lunch numbers
  var uniqueLength = uniqueValues.filter(String).length;
  //Column E, unique ID Numbers
  
  //var inputLunch = signInSheet.getRange(2,5,lunchLength,1).getValues();//array with lunch numbers
  var inputLunch = signInSheet.getRange("E2:E").getValues();
  
  //var inputDate = signInSheet.getRange(2,1,lunchLength,1).getValues();//array with dates
  var inputDate = signInSheet.getRange("A2:A").getValues();
  
  var masterInfo = masterlist.getRange(2,1, masterLength, 7).getValues();//array with all student info
  //Logger.log(typeof masterInfo);
  //var uniqueNum = signInSheet.getRange(2,9, uniqueLength, 1).getValues();
  var uniqueNum = signInSheet.getRange("I2:I").getValues();
  
//  var uniqueNumLength = uniqueNum.filter(String).length;
//  Logger.log(uniqueNumLength+"UniqueNumLength");
 //Logger.log("Hits");

 
 var uniqueLunch = [];
for(var w = 0; w < uniqueNum.length; w++){
  var lunchNum2 = " ";
  lunchNum2 = Number(uniqueNum[w]);
  var lunchLength = lunchNum2.toString().length;
    for(var x = 0; x < masterLength; x++){
      if(lunchNum2 == masterInfo[x][2] && lunchLength == 5){//2 for col is the lunch number, 3rd col in array
        uniqueLunch.push(lunchNum2);
      }
    }
}

var uniqueLunchLength = uniqueLunch.filter(String).length;//total valide lunch numbers

//w and x already used
var totalNum = uniqueLunchLength + 10;
//bottom function uses unique lunch number, top function uses unique last name
//put the signIn Entries into the month sheet


for(var i = 0; i < uniqueLunchLength; i++){
//changed sheetLength to uniqueLunchLength to lunchLength
//After first bracket function
  var lunchNum = uniqueLunch[i];  
  var alreadyIN = false;
  var counter = 1;
  
  //find the index where the lunch num is found
  var date = signInSheet.getRange(i+2,1).getValue().toString();//time stamp in sign in sheet
  var month = date.slice(4,7).toString();
  var day = Number(date.slice(8,10));
  var year = Number(date.slice(11,15));
  
  /*
  The slicing was to help sort the student information by month to respective google sheet tabs.
  */
  
  var currentLunchArray = [];
  
  for(var m = 0; m < masterLength; m++){//find the index where the lunch number is
    var temp = masterInfo[m][2];
    if(lunchNum == temp){
      var lastName = masterInfo[m][0]; 
      var firstName = masterInfo[m][1];
      var pI = masterInfo[m][2];
      var fullName = firstName+" "+lastName;
      var temp2 = masterInfo[m][2];
      for(var h = 0; h < sheetLength; h++){
      //Logger.log(inputLunch[h]);
        if(temp2 == inputLunch[h]){
          var dateToAdd = signInSheet.getRange(h+2,1).getValue().toString();
          var day2 = Number(dateToAdd.slice(8,10));
          currentLunchArray.push(day2);
        }
      }
      
    }
  }
  
  var monthString = "";
    switch(month){
    case "Jan":
      //monthVal = 1;
      monthString = "JAN Attend";
      //totalDays = 31;
      break;      
    case "Feb":
      //monthVal = 2;
      monthString = "FEB Attend";
      //totalDays = 29;
      break;      
    case "Mar":
      //monthVal = 3;
      monthString = "MAR Attend";
      //totalDays = 31;
      break;      
    case "Apr":
      //monthVal = 4;
      monthString = "APR Attend";
      //totalDays = 30;
      break;      
    case "May":
      //monthVal = 5;
      monthString = "MAY Attend";
      //totalDays = 31;
      break;      
    case "Jun":
      //monthVal = 6;
      monthString = "JUN Attend";
      //totalDays = 30;
      break;      
    case "Jul":
      //monthVal = 7;
      monthString = "JUL Attend";
      //totalDays = 31;
      break;      
    case "Aug":
      //monthVal = 8;
      monthString = "AUG Attend";
      //totalDays = 31;
      break;      
    case "Sep":
      //monthVal = 9;
      monthString = "SEP Attend";
      //totalDays = 30;
      break;
    case "Oct":
      //monthVal = 10;
      monthString = "OCT Attend";
      //totalDays = 31;
      break;
    case "Nov":
      //monthVal = 11;
      monthString = "NOV Attend";
      //totalDays = 30;
      break
    case "Dec":
      //monthVal = 12;
      monthString = "DEC Attend";
      //totalDays = 31;
      break;
    default:
      //monthVal = 0;
      //totalDays = 0;
      break;
  }
  
  var daySheet = ss.getSheetByName(monthString);
  
  if(currentLunchArray.length > 1){//length of array is greater than one, so multiple entries
    daySheet.getRange(i+12,2).setValue(fullName);
    daySheet.getRange(i+12,3).setValue(pI);
      for(var ab = 0; ab < currentLunchArray.length; ab++){
        var temp3 = currentLunchArray[ab];
        daySheet.getRange(i+12, temp3+3).setValue(1);
      } 
  }else{//length of array is 1, only one entry
    var temp4 = Number(currentLunchArray[0]);
    var column = temp4+3;
    daySheet.getRange(i+12,2).setValue(fullName);
    daySheet.getRange(i+12,3).setValue(pI);
    daySheet.getRange(i+12, column).setValue(1);
  }
  //before last backet of function
}

var masterIndex = 0;
for(var y = 0; y < uniqueLunchLength; y++){//changed y = 0 to y = 1
//have to compare last names to add to student list, will change if can't have lunch numbers in each spreadsheet
var lunchNum1 = uniqueLunch[y];//get the values of each cell in the unique cell column
/*
in getRange(y+1,5), the 5 will be where the UNIQUE LUNCH NUMBERS COLUMN will be made,
Go to a free column in the Sign In Sheet and on the second row type (Example using column I):
=UNIQUE(I2:I);
Then you're good to go and it will print each student to the Student List and to the respective months when they signed In.
*/
  for(var z = 0; z < masterLength; z++){
    if(lunchNum1 == masterInfo[z][2] && lunchNum1.toString().length == 5){//if statement
    //^This should be able to detect if the lunch number is valid
      masterIndex = z;//row in master info or student info that has all the information
        for(var q = 0; q < uniqueLunchLength;q++){//changed from uniqueLunchLength to lunchLength
          if(lunchNum1 == uniqueLunch[q]){//changed from inputLunch to uniqueLunch
          //then find the index q and get the date at the same index in the inputDate to set the date
            var currentDate = inputDate[q];
           // Logger.log(inputLunch[q][0]+" lunch Input");
           // Logger.log(inputDate[q][0]+" date Input");
           // Logger.log(currentDate);
           // Logger.log(currentDate+"currentDate");
           var constantCol = 2;
            studentlist.getRange(q+11,constantCol).setValue(currentDate);
            //Logger.log(currentDate);
          }
        }
      for(var t = 0; t < 7; t++){
        //input to StudentList
        if(t == 4){
        //do nothing
        }else if(t == 5){
        var inputValue = masterInfo[masterIndex][t];
        studentlist.getRange(y+11,t+2).setValue(inputValue);
        //set the grade
        }else if(t == 6){
        var inputValue = masterInfo[masterIndex][t];//get the value in the found row, and start at the first column
        studentlist.getRange(y+11,t+2).setValue(inputValue);//q=2,t =1
        //^t+2 changed to t+3
        //set the D.O.B.
        }else{
        var inputValue = masterInfo[masterIndex][t];//get the value in the found row, and start at the first column
        //Logger.log(inputValue);
        studentlist.getRange(y+11,t+3).setValue(inputValue);//q=2,t =1
        //set the rest of the information
       //note: when transferring the grade over from the master list to the student list, I needed to set the cells in both to numbers in
       //the spreadsheet options, click the 123 tab in google sheets with the desired cells and click numbers
       //If NOT DONE then when the data is transferred it will give you dates i.e 11/10/1900 and the dates are random and do not correlate to 
       //the grade in any way. 
       }//----------------------else statement
      }//inner for loop
    }/*if statement*/else{}
   }//for loop with x
}

}
