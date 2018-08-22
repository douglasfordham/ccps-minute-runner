//////////////////////////////////////////////////////////////////////////////////////////////////
//
// This is the function that will ACTUALLY add time to the spreadsheet
//
// addToTheSheet - This is called upon by the code.gs page.  It converts the start time into a useable
//                 format for GS and adds the rows to the sheet
//
/////////////////////////////////////////////////////////////////////////////////////////////////




//this function creates the spreadsheet and adds the new timeslots
function addToTheSheet(dST,dT,hideRows){

  //dST is dateStartTime
  //dT is durationTime, or how long this should run
  
  //gather sheet information
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  var hourChange = dST.getHours();
  var minuteChange = dST.getMinutes();
  var HC = 0;
  var ampm = "AM";
  var hours = 0;
  var MNameT = dST.getMonth()
  var MName = monthConvert(MNameT);
  
  Logger.log(hourChange);
  if (hourChange > 12) {
    hourChange = hourChange - 12;
    ampm = "PM";
  }
  
  //initial variables for while loop
  var numEO = "";
  var LR = sheet.getMaxRows()-1;
  var LC = sheet.getMaxColumns()-1;
  var chr = String.fromCharCode(97 + LC);
  var i = 1;
  var lastRow = sheet.getMaxRows(); 
  
  //this will hide the previous rows in the sheet...if the user wants that
  if (hideRows == "on"){
    sheet.hideRows(3, lastRow-2);
  }
  
  var cellA //School
  var cellB //Month
  var cellC //Student Services
  var cellD //Program Management
  var cellE //Date/Time
  
  //Create the drop-down menus to be added to each row, also the schools acronym
  var A1 = ss.getSheetByName('No Touching!').getRange('A1:A').getValues();   // set to your sheet and range
  var A2 = ss.getSheetByName('No Touching!').getRange('I1:I').getValues();   // set to your sheet and range   
  var dynamicListB = ss.getSheetByName('No Touching!').getRange('B1:B');   // set to your sheet and range
  var A3 = ss.getSheetByName('No Touching!').getRange('F1:F').getValues();  // set to your sheet and range
  var A4 = ss.getSheetByName('No Touching!').getRange('J1:J').getValues();
  var school = ss.getSheetByName('No Touching!').getRange('E1').getValue();   // gets the acronym
  
  //the following is used to organize alphabetically the Application and Email rows, adding in
  //the user created values as well
  var Alast = A1.filter(String).length;
  var Blast = A2.filter(String).length;
  var Clast = A3.filter(String).length;
  var Dlast = A4.filter(String).length;
  
  //these loops will combine the two lists into the "original"
  for (j = 0 ; j < Blast ; j++) {
    A1[Alast+j+1] = A2[j];
  }
  for (j = 0 ; j < Dlast ; j++) {
    A3[Clast+j+1] = A4[j];
  }
  
  //search the array now for the final length
  Alast = A1.filter(String).length;
  Clast = A3.filter(String).length;
  
  //create the final storage array for the requirement.
  var dynamicListA = [];
  var dynamicListD = [];
  
  //run the loop to add the elemtns to the final variable, and convert them to a string
  for (j = 0 ; j <= Alast ; j++) {
    dynamicListA[j] = A1[j].toString();
  }
  for (j = 0 ; j <= Clast ; j++) {
    dynamicListD[j] = A3[j].toString();
  }
  
  //sort the lists alphabetically, ignoring capitalization
  dynamicListA.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  dynamicListD.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  
  //get the default color set by the user
  var color1 = ss.getSheetByName('No Touching!').getRange('E4').getValue();
  var color2 = ss.getSheetByName('No Touching!').getRange('E5').getValue();
  

  var rangeRuleA = SpreadsheetApp.newDataValidation().requireValueInList(dynamicListA).setAllowInvalid(false).build();
  var rangeRuleB = SpreadsheetApp.newDataValidation().requireValueInRange(dynamicListB).setAllowInvalid(false).build();
  //var rangeRuleC = SpreadsheetApp.newDataValidation().requireValueInRange(dynamicListC).setAllowInvalid(false).build(); //THIS WAS REMOVED FROM FUTURE INTEGRATOR SHEETS
  var rangeRuleD = SpreadsheetApp.newDataValidation().requireValueInList(dynamicListD).setAllowInvalid(true).build();
  
  
  //this adds a new row to the sheet and formats it.
 
  while (i <= dT){
    
    //this inserts a new row, then also updates the lastRow variable
    ss.insertRowAfter(lastRow);
    lastRow++;
    
    //this resets the timer to zero, otherwise it screws up the count timer
    //HC would then change the hours as well
    if (minuteChange == 60){
      minuteChange = 00;
      hourChange++;
    }
    
    if (hourChange == 12){
      ampm = "PM";
    }
    
    if (hourChange > 12){
      hourChange = 1;
    }
    
    //this gathers the current info from the row
    cellA = ss.getRange('A'+lastRow).getValue();
    cellB = ss.getRange('B'+lastRow).getValue();
    cellC = ss.getRange('C'+lastRow).getValue();
    cellD = ss.getRange('D'+lastRow).getValue();
    cellE = ss.getRange('E'+lastRow).getValue();
 
    //this appends the row to have the correct values
    ss.getRange('A'+lastRow).setValue(school);
    ss.getRange('B'+lastRow).setValue(MName);
    ss.getRange('C'+lastRow).setDataValidation(rangeRuleA);
    ss.getRange('D'+lastRow).setDataValidation(rangeRuleB);
    ss.getRange('E'+lastRow).setValue(dST.getMonth()+1+"/"+dST.getDate()+"/"+dST.getFullYear()+" "+hourChange+":"+minuteChange+" "+ampm);
    ss.getRange('F'+lastRow).setDataValidation(rangeRuleD);
    
    minuteChange = minuteChange + 15;
    
    dST.setHours(hourChange+HC);
    dST.setMinutes(minuteChange);
    
    //run the function to find out if i is even/odd (found on one_call_function.gs)
    numEO = evenOdd(i);
    LR = ss.getLastRow();

    //changes the background to gray if i is odd
    if (numEO == "odd"){
      var cell = ss.getRange('A:'+chr+LR).setBackground(color1);
    } else if(numEO == "even"){
      var cell = ss.getRange('A:'+chr+LR).setBackground(color2);
    }
    i = i+1; //moves the iteration to the next step
    
  }  
    
}
