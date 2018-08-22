/////////////////////////////////////////////////////////////////////////////////////////
// CCPS Minute Runner
//
// Created by: Douglas Fordham
// Official release date: July 30th, 2018
// Current Version: (Google - 26) (Code - 20) 1.1.12
//
////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
//IN THIS FILE
//
//This file (Code.gs) contains all of the run HTML scripts.  
//
//onInstall: installs the onOpen command
//onOpen: installs the menu option for the user
//updateMe: ONLY USED WHEN AN UPDATE NEEDS GLOBAL PUSHING
//loader: runs the loading screen when needed
//firstTime: Runs the first_time.html file
//addTime: Runs the addTime.html file
//addApp: Runs the addApp.html file
//addEmail: Runs the addEmail.html file
//checkImport: Opens the import graph for the user
//colorpick: Runs the colorPicker.html file
//addTimeSheet: this breaks down the user-input information and passes it off to the
//              function AddToTheSheet, which is on the AddTimeFun.gs page
//defaultDayRun: this will run the default day script that gathers all the information 
//               behind the scenes
//openDialogue: Runs the closeMe.html file to end the script
//defaultday: This runs the default day script for the first time
//errorDate: Runs the ohNo.html file, which means there was an error
//getValuesFromSS: gathers all the user settings information. Used for the addTime information
//updateDefaultColor: after the user runs colorPicker.html, this will change the default color they selected
////////////////////////////////////////////////////////////////////////////////////////

function onInstall(e) {
  onOpen();
}

//This adds the add-on to the user's spreadsheet
function onOpen() {                                   
  
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi().createAddonMenu() // Or DocumentApp or FormApp.
      .addItem('Add Time', 'addTime')
      .addSeparator()
      .addItem('Add Specific Application', 'addApp')
      .addItem('Add Specific Email', 'addEmail')
      //.addItem('UPDATE - Live until 8/9/18', 'updateMe')
      .addSeparator()
      .addItem('Check Import Graphs', 'checkImport')
      .addSeparator()
      .addSubMenu(SpreadsheetApp.getUi().createMenu('Other Options')
           //.addItem('First Time?','firstTime')
           .addItem('Pick a color', 'colorpick')
           .addItem('Update Default Day','defaultday')
           .addItem('Update User Emails', 'groupget'))
      .addToUi();  
}
//////////////////////////////////////////////////////////////////////////////////////

//this runs any necessary updates for the programs
function updateMe() {
 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName("No Touching!").activate();
  ss.getRange("B:B").clear();
  
  var inInteract = nameTheColumns2();
  for (var i = 1; i < inInteract.length + 1 ; i++){
    ss.getRange('B'+i).setValue(inInteract[i-1]);
  }
  
  ss.getSheetByName("No Touching!").hideSheet();
  
  var template = HtmlService.createTemplateFromFile('updateComplete');
  var ui = template.evaluate();
  SpreadsheetApp.getUi().showSidebar(ui);
  
}

///////////////////////////////////////////////////////////////////////////////////////
  
//runs the loader screen on the sidebar
function loader() {
  var template = HtmlService.createTemplateFromFile('loader');
  var ui = template.evaluate().setTitle('Please wait...');
  SpreadsheetApp.getUi().showSidebar(ui);
}

//////////////////////////////////////////////////////////////////////////////////////

//runs the first time script to setup the document
function firstTime() {
  
   var template = HtmlService.createTemplateFromFile('first_time');
   var ui = template.evaluate().setTitle('First Time!');
   SpreadsheetApp.getUi().showSidebar(ui);

}

/////////////////////////////////////////////////////////////////////////////////

//runs the addTime script to add more blocks to a day
function addTime() {
 
  var template = HtmlService.createTemplateFromFile('addTime');
  var ui = template.evaluate().setTitle('Add Time!');
  SpreadsheetApp.getUi().showSidebar(ui);
}

/////////////////////////////////////////////////////////////////////////////////

//runs the addApp script to add more blocks to a day
function addApp() {
 
  var template = HtmlService.createTemplateFromFile('addApp');
  var ui = template.evaluate().setTitle('Add an Application!');
  SpreadsheetApp.getUi().showSidebar(ui);
}

/////////////////////////////////////////////////////////////////////////////////

//runs the addTEmail script to add more blocks to a day
function addEmail() {
 
  var template = HtmlService.createTemplateFromFile('addEmail');
  var ui = template.evaluate().setTitle('Add a new email!');
  SpreadsheetApp.getUi().showSidebar(ui);
}
//////////////////////////////////////////////////////////////////////////////////////

//opens the Import Graph for that school
function checkImport() {

  //Pull in the school acronym
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var school = ss.getSheetByName('No Touching!').getRange('E1').getValue();
  
  var searchFor = school + ' Import and Graphs 2018-2019';
  searchFor.toString();
  
  var files = DriveApp.getFilesByName(searchFor);
  var file = files.next().getId();
  
  var url = "https://docs.google.com/spreadsheets/d/"+file;
  var html = "<script>window.open('" + url + "');google.script.host.close();</script>";
  var userInterface = HtmlService.createHtmlOutput(html);
   SpreadsheetApp.getUi().showModalDialog(userInterface, "Open Sheet");
 
  
  /*
  var file = DriveApp.getFileById(ss.getId());
  var folders = file.getParents().next().getId();
  var destFolder = DriveApp.getFolderById(folders);
  
  
  SpreadsheetApp.openById("abc1234567");
  
  
  
  
  
  
  
  var files = DriveApp.getRootFolder().searchFiles( 
      searchFor);
  Logger.log(files);
   var file = files.next();
   var id = file.getId();
   Logger.log(id);
  
  
  
  */
}



//runs the first time script to setup the document
function colorpick() {
   var template = HtmlService.createTemplateFromFile('colorPicker');
   var ui = template.evaluate().setTitle('Pick a color, any color!');
   SpreadsheetApp.getUi().showSidebar(ui);

}

/////////////////////////////////////////////////////////////////////////////////

//This takes care of adding all of the time slots to the sheet
//This gets called from addTime.html

function addTimeSheet(formObject) {

  loader();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName("Timesheet").activate();
  
  var permuse2 = formObject.permuse;
  var hidethemrows = formObject.hidethemrows;
  
  //if there is a default day set up, then 
  if (permuse2 === "yes") {

  var st = ss.getSheetByName('No Touching!').getRange('E2').getValue();
  var et = ss.getSheetByName('No Touching!').getRange('E3').getValue();
  var dt = formObject.date;
  } else {
    var st = formObject.startTime;
    var et = formObject.endTime;
    var dt = formObject.date;
  }
  
  //splice the time from the date object above into hours and minutes
  var stH = st.slice(0,2);
  var stM = st.slice(3,5);
  var stYear = dt.slice(0,4);
  var stMonth = dt.slice (5,7);
  var stDay = dt.slice(8,10);
  var etH = et.slice(0,2);
  var etM = et.slice(3,5);

  //create a new date object that holds the start time  
  var stT = new Date();
  stT.setHours(stH)
  stT.setMinutes(stM);
  stT.setSeconds(0);

  //create a new date object that holds the end time
  var etT = new Date();
  etT.setHours(etH)
  etT.setMinutes(etM);
  etT.setSeconds(0);
   
  //calculate the duration for the creation of time slots
  var durationTime = (etT - stT) / 900000;  
  
  //we wait to set the other parts because otherwise it messes up the durationTime count
  stT.setFullYear(stYear);
  stT.setMonth(stMonth-1); //JS month starts at 0 for Jan....weird I know
  stT.setDate(stDay);
  
  ////////////////////////////
  //Check to see if the month is outside of the current school year
  var checkTime = new Date();
  checkTime.setDate(checkTime.getDate()-30);
  
  if (checkTime > stT){
    errorDates();
  } else {
  //end error check for month
  ///////////////////////////
    
  //this will run the function that actually adss time to the sheet
  addToTheSheet(stT,durationTime,hidethemrows);
  openDialog();
  }
  
}

///////////////////////////////////////////////////////////////////////////////////////////

//this runs the defaultday setup so that it can be used in the future

function defaultDayRun(formObject) {

  //pull the variables from the object that go passed via the HTML
  var startTime = formObject.startPerm;
  var endTime = formObject.endPerm;

  //place these in the spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName("No Touching!").activate();
  
  ss.getRange('A1:E');
  ss.getRange('E2').setNumberFormat("@");
  ss.getRange('E2').setValue(startTime);
  ss.getRange('E3').setNumberFormat("@");
  ss.getRange('E3').setValue(endTime);

  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.hideSheet();
  openDialog();
  
}  
///////////////////////////////////////////////////////////////////////////////////////////

//this runs the "closeMe.html" script so that the sidebar closes
function openDialog() {
  var template = HtmlService.createTemplateFromFile('closeMe');
  var ui = template.evaluate().setTitle('Closing Time');
  SpreadsheetApp.getUi().showSidebar(ui);
}

///////////////////////////////////////////////////////////////////////////////////////////

//this runs the "defaultDay" script so that the sidebar closes, then lets the user establish the default day
function defaultday() {
  var template = HtmlService.createTemplateFromFile('defaultday');
  var ui = template.evaluate().setTitle('Work less, be smarter');
  SpreadsheetApp.getUi().showSidebar(ui);
}

//////////////////////////////////////////////////////////////////////////////////////////

//This runs the error script if the time / date is not right.
function errorDates() {
 var template = HtmlService.createTemplateFromFile('ohNo');
  var ui = template.evaluate().setTitle('Work less, be smarter');
  SpreadsheetApp.getUi().showSidebar(ui);
}

//////////////////////////////////////////////////////////////////////////////////////////

function getValuesFromSS(range) {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("No Touching!");
  
  return sheet.getRange(range).getValues();
}


//////////////////////////////////////////////////////////////////////////////////////////

//this changes the default colors, as now selected by the user
function updateDefaultColor(formObject) {
  var colorFunName = formObject.colorsman;
  var colorList = allTheColors();
  var colorSet = "";
  var colorChoice = formObject.colorChoice;
  
  for(var i = 0; i < colorList.length; i++) {
    if (colorFunName == colorList[i][0]){
      colorSet = colorList[i][2];
      i = colorList.legnth;
    }
  }
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName('No Touching!').getRange(colorChoice).setValue(colorSet);
  ss.getSheetByName("No Touching!").hideSheet();
  openDialog();
}

//////////////////////////////////////////////////////////////////////////////////////////

//this will add an application to the user's spreadsheet for future use
function addAppNew(formObject) {
 
  var newApp = formObject.addAppText;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName("No Touching!").activate();
  var Avals = ss.getRange("I:I").getValues();
  var Alast = Avals.filter(String).length+1;
  
  ss.getSheetByName('No Touching!').getRange("I"+Alast).setValue(newApp); 
  
  ss.getSheetByName("No Touching!").hideSheet();
  
  openDialog();
  
}

//////////////////////////////////////////////////////////////////////////////////////////

//this will add an email to the user's spreadsheet for future use
function addEmailNew(formObject) {
 
  var newEmail = formObject.addEmailText;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName("No Touching!").activate();
  var Avals = ss.getRange("J:J").getValues();
  var Alast = Avals.filter(String).length+1;
  
  ss.getSheetByName('No Touching!').getRange("J"+Alast).setValue(newEmail);
  var sheetToHide = SpreadsheetApp.getActiveSheet();
  var sheetToKeep = ss.getSheetByName("Timesheet").activate();

  sheetToHide.hideSheet();

  openDialog();
  return Logger.log("this did stuff");
  
}






