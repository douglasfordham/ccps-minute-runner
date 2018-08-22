
///////////////////////////////////////////////////////////////////////////////////////
//IN THIS FILE
//
//This file (Code.gs) contains all of the run HTML scripts.  
//
//monthConvert: called by addTimeFun.gs to convert num into correct month
//evenOdd: used by addTimeFun.gs to color the rows
//nameTheColumns: produceds the array for which we name all the sheet items
//allTheColors: this is the list of colors for the ColorPicker option
//groupget: searches the appropriate google group and adds them to the list
////////////////////////////////////////////////////////////////////////////////////////

function monthConvert(M) {
  var monthName = "";
 
  if (M == 0){
    monthName = "January";
  }
  
  if (M == 1){
    monthName = "February";
  }
  
  if (M == 2){
    monthName = "March";
  }
  
  if (M == 3){
    monthName = "April";
  }
  
  if (M == 4){
    monthName = "May";
  }
  
  if (M == 5){
    monthName = "June";
  }
  
  if (M == 6){
    monthName = "July";
  }
  
  if (M == 7){
    monthName = "August";
  }
  
  if (M == 8){
    monthName = "September";
  }
  
  if (M == 9){
    monthName = "October";
  }
  
  if (M == 10){
    monthName = "November"
  }
  
  if (M == 11){
    monthName = "December";
  }
  return monthName
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function evenOdd(numberCheck){
  var numEO = "";
  var n1 = Math.floor((numberCheck)/2);
  var n2 = numberCheck / 2;
  var test = n2 - n1;
  
  if (test == 0){
    numEO = "even";
    return numEO
  }
  
  if (test == 0.5){
    numEO = "odd";
    return numEO
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

//this is the main array that contains all of the necessary items for the data sheets. It will
//basically be the "codes" that we use.  Each time a code is referenced, its source comes from here


function nameTheColumns1(){

  var integratorApp = [
    ["ALEKS"],
    ["Canvas"],
    ["Chromebook (Onboard/Troubleshooting)"],
    ["Chrome Browser"],
    ["CK-12"],
    ["Common Sense Education"],
    ["Computer Based"],
    ["Discovery Ed"],
    ["Edmodo"],
    ["eMediaVA"],
    ["Explain Everything"],
    ["Google+"],
    ["Google Calendar"],
    ["Google Classroom"],
    ["Google Docs"],
    ["Google Drawings"],
    ["Google Drive"],
    ["Google Forms"],
    ["Google Gmail"],
    ["Google My Maps"],
    ["Google Other"],
    ["Google Sheets"],
    ["Google Sites"],
    ["Google Slides"],
    ["Hapara"],
    ["iCivics"],
    ["Khan Academy"],
    ["Library Databases"],
    ["Microsoft Suite"],
    ["Mobile Device"],
    ["Nearpod"],
    ["Non-Application Specific"],
    ["PowerMyLearning"],
    ["PowerSchool Assessment"],
    ["Promethean"],
    ["SAS Curriculum Pathways"],
    ["School Administration"],
    ["Soundtrap"],
    ["Synergy"],
    ["Web Based Tools"],
    ["WeVideo"],
    ["YouTube"]
  ];
  return integratorApp
}

function nameTheColumns2(){
  var integratorInteractionThing = [
    ["Advising"],
    ["Brainstorming"],
    ["Classroom Support"],
    ["General Training"],
    ["iTech"],
    ["Observing"],
    ["Planning"],
    ["PLC"],
    ["Reflecting"],
    ["School Based Training"],
    ["Troubleshooting"]
  ];
  
  return integratorInteractionThing
}

function nameTheColumns3(){
  var integratorUse = [
    "Assessment",
    "Communication",
    "Differentiated Learning",
    "Efficiency/Workflow",
    "Group Work",
    "Interactive Lecture",
    "PBL",
    "STEM/STEAM"
  ];
  
  return integratorUse;

}

///////////////////////////////////

function allTheColors(){  
  
  var colors = [ 
    ['Black','black','#000000'],
    ['Really Dark Grey','dark_dark_grey','#2a2a2a'],
    ['Dark Grey', 'dark_grey', '#4d4d4d'],
    ['Medium Grey', 'medium_grey', '#717171'],
    ['Default Grey','light_grey','#c1c1c1'],
    ['47th Shade of Grey', 'lighter_grey', '#e0e0e0'],
    ['Nearly White', 'nearly_white', '#f3f3f3'],
    ["White", 'white', '#ffffff'],
    ['Dark Red', 'dark_red', '#520000'],
    ['Kid-Free Weekend', 'kid_free_weekend', '#722f37'],
    ['The Benz Red', 'benz_red', '#990000'],
    ['Semper Fi', 'Semper_Fi_for_life_Tobin', '#cc0000'], 
    ["Jason's other tan", 'light_red', '#e68080'], 
    ['Is That Pink?', 'pink_is_the_pimp_color', '#f5cccc'],
    ['Ditka Orange','ditka_orange','#c83803'],
    ['Redneck Orange', 'redneck_orange', '#ff6600'],
    ['Monacan','monacan','#FF9900'],
    ['Hawaiian Sunset', 'light_orange', '#ffad5c'],
    ['Lighter Orange', 'lighter_orange', '#ffc285'],
    ['Super Light Orange', 'super_light_orange', '#ffebd6'],
    ['Puke Yellow', 'puke_dark_yellow', '#808000'],
    ['Ugly Duckling', 'ugly_duckling', '#b2b200'],
    ['Yellow #5', 'yellow_5', '#cccc00'],
    ['Eye Searing', 'osha_yellow', '#ffff00'],
    ['Chartreuse','chartreuse','#7fff00'],
    ['Forest Green', 'forest_green', '#003d00'],
    ['Ireland', 'ireland', '#005200'],
    ['Leprechaun', 'leprechaun', '#006600'],
    ['Yoshi!','yoshi','#09b271'],
    ['Fields of Sneezes', 'sneezes','#66c266'],
    ["Mint", 'mint', '#ccebcc'],
    ['Midnight Blue', 'midnight_blue', '#000066'],
    ['Angry Ocean', 'angry_ocean', '#142966'],
    ['Shark Butt','shark_butt','#285797'],
    ['Blue Devil', 'blue_note', '#0000cc'],
    ['Cobalt', 'blue', '#3366ff'],
    ['Cosby','cosby','#88BFDD'],
    ["Robin's Egg", 'robins_egg', '#66ffff'],
    ['Baby Blues', 'baby_blues', '#b2ffff'],
    ['Egg Plant', 'egg_plant', '#2e004c'],
    ['J-M-U-DUUUUUKES', 'jmudukes', '#450084'],
    ['Purple', 'purple', '#9900ff'],
    ['Barney', 'purple_dino', '#ad33ff'],
    ['Professor Plum', 'professor_plum', '#FFBBFF'],
    ['Light Purple', 'light_purple', '#ebccff']
    ];
  return colors
}

//////////////////////////////////////////////////////////////////////////////////////////

function groupget() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName("No Touching!").activate();
  var sheet = SpreadsheetApp.getActiveSheet();

  //get the user groups for their schools email
  var school = ss.getSheetByName('No Touching!').getRange('E1').getValue();
  var group = GroupsApp.getGroupByEmail(school+"_FAC@ccpsnet.net");
  

  var users = group.getUsers();
  
  ss.getRange('F1:F').clear();
  
  for (var i = 1; i < users.length + 1 ; i++){
    var theirName = users[i-1].toString().toLowerCase();
    ss.getRange('F'+i).setValue(theirName);
    Logger.log(ss.getRange('F'+i).getValue());
  }
  
  ss.getRange('F1:F').sort({column: 6, ascending: true});
  sheet.hideSheet();
}

//////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  
  
  
  
