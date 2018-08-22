# ccps-minute-runner

The purpose of this code release is to allow others to take this script and use it to create time slots within a google sheet.  
This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
This code CANNOT be used for monetary or financial gain of the coder/developer/intended user.  This code is strictly for free purposes only.
Any replications of use of partial or full amounts of code from this repository must cite the original author (Douglas Fordham, Chesterfield County Public Schools) as the original creator.

## HOW TO INSTALL

1) Go to Google Drive and open a new Google Script
2) Copy&Paste each file from this repository into the appropriate file within your Google Script (if it ends in .gs, it's a google script file, .html is HTML)
3) <a href="https://docs.google.com/spreadsheets/d/17zNJd3XuVXLXSaFrpieROMfTwkfebkbys8Pyt2GFLYg/copy">Make a copy of this file</a>
4) Store it somewhere so it is in a safe location in your google drive.  Get the URL from the template, and insert it into runFirstTime.gs, line 100 right after the openURL method.
5) In one_call_function.gs on line 238 change how your google school calls emails.  If you use Google Groups, use the appropriate ending such as "@k12.va.us" or such. If you do not use Google Groups, then consider manually adding in an array with the emails


## How does this script work?

Our school system uses acronyms for each of our schools.  They are guaranteed unique.  When the user selects "First Time?" from the drop down menu it asks them to put that acronym in.  After that it sets up the entire rest of the sheet.  The variable "school" is used often, and is stored on the "No Touching!" sheet in cell E1.

Since we are a Google Apps For Education system, each school email is stored in a google group for that school. Instead of manually creating lists of emails, we are able to pull from the specific google group that has all the emails for that particular school.  The script after selecting "First Time?" will add all of these emails to the "No Touching!" sheet.  Since you do not have access to CCPS Google Information, some possible errors may occur.  

## Possible Errors

1) In Code.gs, function checkImport, you need to make sure your file has the same name. If you are simply using the template provided above, then all should be good.
2) UpdateEmails.html will not work as intended.  It is tied to the CCPS Google Group Directory, for which you must be a CCPS employee to have acecss to. You can either fix this so that it works for your school systedm or remove the option from the dropdown menu in Code.gs by deleting that line.
