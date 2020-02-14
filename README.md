# Sticky_Note_Application
This sticky note application allows a user to create multilevel sticky notes with some features like search, create top-level notes, create multi level sub notes under top-level note, delete notes and persist/store  notes on local storage of browser. Run the StickyNote_V1.html file to run the application. This has some browser's dependencies in running the application. 

The detailed features has been given as below in requirements format.
(A) Basic Features [Target-1]
	1. A user should be able to create notes, where each note is made up of some text.
	2. One should be able to create s sub-note to a parent note by clicking on "New note" button.
	3. There can be multiple top level notes which are created by entering text in the top input box and clicking "Create Note" button.
	4. Ability to search. On search , it should show only the notes matching the search string.

(B) Additional features [Target-2]
	1. Ability to edit the text of the notes
	2. Searching :
		2.1 It should highlight the matching text in each Note
		2.2 It should show the lineage of the matching note, for e.g. if a leaf note is matched it should show all its parent notes as well.
	3. Persist the notes in local storage so that refreshing the page also comes up with existing notes
	4. Ability to delete notes.	
  
  
//******************** If your code handles SEO, accessibility, resposive design, performance.******
1. I have handle the cases for responsive design using media query of CSS and it is working fine in desktop when you resize the window.


//******************** Appication behaviour and browser compatibility **************
1. This application is tested successfully on Chrome Version 78, Version 80 and Mozilla Firefox Version 66 and Version 72. So, it is better to test this application on these versions only.
2. I have observed that if an application is not deployed some server and we try to run the html page without deploying on the server then we can face browser compatibility issues. Because I have run this application on different machine with same browser version  and faced the same problem. Specially I faced with Firefox.
