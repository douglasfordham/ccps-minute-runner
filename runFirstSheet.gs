///////////////////////////////////////////////////////////////////////////////////////////////

function runFirstSheet(formObject){
  
  loader(); //run the loading sidebar animation (so no one freaks out!)
  
  var school = formObject.school;
  school = school.toUpperCase();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.rename("2018 - 2019 "+school+" Sign-up Sheet");
  ss.insertSheet(0);
  var sheet = ss.getSheets()[0];
  
  sheet.deleteColumns(7, 19);  
  sheet.deleteRows(3,998);
  var first = sheet.getName();
  sheet.setName("Timesheet");
  
  //this will set the column names for each item in row 2
  ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getRange('A2:G2').setBackgroundRGB(178,255,102).setHorizontalAlignment("center");
  
  ss.getRange('A2').setValue("School").setHorizontalAlignment("center");
  ss.getRange('B2').setValue("Month").setHorizontalAlignment("center");
  ss.getRange('C2').setValue("Application (integrator only)").setHorizontalAlignment("center");
  ss.getRange('D2').setValue("Interaction Type (integrator only)").setHorizontalAlignment("center");
  ss.getRange('E2').setValue("Date/Time").setHorizontalAlignment("center");
  ss.getRange('F2').setValue("Email").setHorizontalAlignment("center");
  ss.getRange('G2').setValue("Reason For Meeting").setHorizontalAlignment("center");
  
  //resize each column so it's nice and puuuuurty
  sheet.setColumnWidth(1, 70);
  sheet.setColumnWidth(2, 75);
  sheet.setColumnWidth(3, 200);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidth(5, 130);
  sheet.setColumnWidth(6, 250);
  sheet.setColumnWidth(7, 300);

  //now to create the Dropdown menu stuff in the hidden sheet ;)
  ss.insertSheet(1);
  sheet = ss.getSheets()[1];
  sheet.setName("No Touching!");
  ss = SpreadsheetApp.getActiveSpreadsheet();
    
  //this will create the three column variables, then run the "nameTheColumns" function to generate the lists
  var inApp = nameTheColumns1();
  var inInteract = nameTheColumns2();
  //var inUse = nameTheColumns3();
  
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 250);
  sheet.setColumnWidth(3, 250);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 250);
  
  //this will drop in all of the codes for Integrator Apps
  for (var i = 1; i < inApp.length + 1 ; i++){
    ss.getRange('A'+i).setValue(inApp[i-1]);
  }
  
  //this will drop in all of the codes for Integrator Interactions
  for (var i = 1; i < inInteract.length + 1 ; i++){
    ss.getRange('B'+i).setValue(inInteract[i-1]);
  }

  /* This was removed because we no longer use this column
  //this will drop in all of the codes for Integrator Usage
  for (var i = 1; i < inUse.length + 1 ; i++){
    ss.getRange('C'+i).setValue(inUse[i-1]);
  }
  */
  
  ss.getRange('D1:D5').setBackgroundRGB(211,211,211);
  ss.getRange('D1').setValue("User School");
  ss.getRange('D2').setValue("Start Time");
  ss.getRange('D3').setValue("End Time");
  ss.getRange('D4').setValue("1st color row");
  ss.getRange('D5').setValue("2nd color row");
  ss.getRange('E1').setValue(school);
  ss.getRange('E4').setValue("#FFFFFF");
  ss.getRange('E5').setValue("#BEBEBE");
  
  sheet.hideSheet();
  
  //deletes the original sheet so that it's gone
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[2];
  ss.deleteSheet(sheet);
  
  groupget();
   
  
  //this will make a copy of the data template, put it in the same folder, then link the two together (hopefully)
  var oldURL = ss.getUrl();
  var file = DriveApp.getFileById(ss.getId());
  var folders = file.getParents().next().getId();
  
  //You will have to add your own template here.  The original has been removed to protect CCPS work
  ss = SpreadsheetApp.openByUrl(
    'REMOVED FOR PROTECTION OF CCPS WORK');
  
  var destFolder = DriveApp.getFolderById(folders);
  var newSS = DriveApp.getFileById(ss.getId()).makeCopy(school + " Import and Graphs 2018-2019", destFolder);

  var newID = newSS.getId();
  
  ss = SpreadsheetApp.openById(newID);
  SpreadsheetApp.setActiveSpreadsheet(ss);
  
  ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getRange('A1').setValue('=importrange("'+oldURL+'", "Timesheet!a2:f")');

  
  openDialog();
 
  
}



















