require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
Scripts to create interactive textboxes in SVG using ECMA script
Copyright (C) <2006>  <Andreas Neumann>
Version 1.1.2, 2006-10-04
neumann@karto.baug.ethz.ch
http://www.carto.net/
http://www.carto.net/neumann/

Credits:
* Initial code was taken from Olaf Schnabel --> schnabel@karto.baug.ethz.ch (thanks!)
* Thanks also to many people of svgdevelopers@yahoogroups.com
* bug report and fix from Volker Gersabeck (make textbox namespace aware and corrected .setValue method when text was transformed)
* bug report and fix from David Boyd (pressing delete key in ASV would fail if cursor is at end of textbox)
* enhancement suggestion and bug report by Michael Mehldorn (callback function was called twice in case of enter key, accept also integer values in method .setValue())

----

Documentation: http://www.carto.net/papers/svg/gui/textbox/

-------

This ECMA script library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library (lesser_gpl.txt); if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

----

original document site: http://www.carto.net/papers/svg/gui/textbox/
Please contact the author in case you want to use code or ideas commercially.
If you use this code, please include this copyright header, the included full
LGPL 2.1 text and read the terms provided in the LGPL 2.1 license
(http://www.gnu.org/copyleft/lesser.txt)

-------------------------------

Please report bugs and send improvements to neumann@karto.baug.ethz.ch
If you use this control, please link to the original (http://www.carto.net/papers/svg/gui/textbox/)
somewhere in the source-code-comment or the "about" of your project and give credits, thanks!

*/
module.exports = function(window, svgsvg) {

var svgNS = "http://www.w3.org/2000/svg"
var document = window.document
var Timer = require("./timer")(window)


function textbox(d) {
	// d = {id: parentNode: defaultVal: maxChars: x: y: boxWidth: boxHeight: textYOffset: textStyles: boxStyles: cursorStyles: selBoxStyles: allowedChars: functionToCall:}
	this.id = d.id; //the id of the textbox
	this.parentNode = d.parentNode;  //can be of type string (id) or node reference (svg or g node)
	this.maxChars = d.maxChars; //maximum characters allowed
	this.defaultVal = d.defaultVal.toString(); //default value to be filled in when textbox is created
	this.x = d.x; //left of background rectangle
	this.y = d.y; //top of background rectangle
	this.boxWidth = d.boxWidth; //background rectangle width
	this.boxHeight = d.boxHeight; //background rectangle height
	this.textYOffset = d.textYOffset; //the offset of the text element in relation to the upper side of the textbox rectangle
	this.textStyles = d.textStyles; //array containing text attributes
	if (!this.textStyles["font-size"]) {
		this.textStyles["font-size"] = 15;
	}
	this.boxStyles = d.boxStyles; //array containing box styles attributes
	this.cursorStyles = d.cursorStyles; //array containing text attributes
	this.selBoxStyles = d.selBoxStyles; //array containing box styles attributes
	//allowedChars contains regular expressions of allowed character ranges
	if (d.allowedChars) {
		if (typeof(d.allowedChars) == "string") {
			if (d.allowedChars.length > 0) {
				this.RegExp = new RegExp(d.allowedChars);
			}
		}
	}
	else {
		this.RegExp = undefined;
	}
	this.functionToCall = d.functionToCall; //function to be called if textbox looses focus or enter key is pressed
	this.textboxRect = null; //later holds reference to rect element
	this.textboxText = null; //later holds reference to text element
	this.textboxTextContent = null; //later holds reference to content of text element (first child)
	this.textboxCursor = null; //later holds reference to cursor
	this.textboxStatus = 0; //status 0 means unitialized, 1 means partially initalized, 2 means fully initialized and ready to remove event listeners again, 5 means new value was set by method .setValue()
	this.cursorPosition = 0; //position in whole string
	this.transX = 0; //offset on the left if text string is larger than box
	this.textVal = this.defaultVal; //this is the current text string of the content
	this.shiftDown = false; //boolean value that says if shift was pressed
	this.mouseDown = false; //boolean value that says if mousedown is active
	this.startSelection = 0; //position of the start of the selection
	this.startOrigSelection = 0; //original start position of selection
	this.endSelection = 0; //position of the end of the selection
	this.selectionRectVisible = false; //indicates if selection rect is visible or not
	this.svg = null; //later a nested svg that does clipping
	this.supportsCharGeom = true; //defines if viewer supports geometry calculations on individual characters, such as .getCharAtPosition(SVGPoint)

	this.timer = new Timer(this); //a Timer instance for calling the functionToCall
	this.timerMs = 200; //a constant of this object that is used in conjunction with the timer - functionToCall is called after 200 ms
	this.createTextbox(); //method to initialize textbox
}

//create textbox
textbox.prototype.createTextbox = function() {
	var result = this.testParent();
	if (result) {
		//create a textbox parent group
		this.textboxParent = document.createElementNS(svgNS,"g");
		this.parentGroup.appendChild(this.textboxParent);
		
		//create background rect
		this.textboxRect = document.createElementNS(svgNS,"rect");
		this.textboxRect.setAttributeNS(null,"x",this.x);
		this.textboxRect.setAttributeNS(null,"y",this.y);
		this.textboxRect.setAttributeNS(null,"width",this.boxWidth);
		this.textboxRect.setAttributeNS(null,"height",this.boxHeight);
		this.textboxRect.setAttributeNS(null,"pointer-events","fill");
		for (var attrib in this.boxStyles) {
			this.textboxRect.setAttributeNS(null,attrib,this.boxStyles[attrib]);
		}
		this.textboxParent.appendChild(this.textboxRect);
		
		this.svg = document.createElementNS(svgNS,"svg");
		this.svg.setAttributeNS(null,"x",this.x + this.textStyles["font-size"] / 4);
		this.svg.setAttributeNS(null,"y",this.y + this.boxHeight * 0.02);
		this.svg.setAttributeNS(null,"width",this.boxWidth - (this.textStyles["font-size"]) / 2);
		this.svg.setAttributeNS(null,"height",this.boxHeight * 0.96);
		this.svg.setAttributeNS(null,"viewBox",(this.x + this.textStyles["font-size"] / 4)+" "+(this.y + this.boxHeight * 0.02)+" "+(this.boxWidth - (this.textStyles["font-size"]) / 2)+" "+(this.boxHeight * 0.96));
		this.textboxParent.appendChild(this.svg);
		
		//create group to hold text, selectionRect and cursor
		this.textboxTextGroup = document.createElementNS(svgNS,"g");
		this.svg.appendChild(this.textboxTextGroup);
		
		//create text element
		this.textboxText = document.createElementNS(svgNS,"text");
		this.textboxText.setAttributeNS(null,"x",(this.x + this.textStyles["font-size"] / 3));
		this.textboxText.setAttributeNS(null,"y",(this.y + this.textYOffset));
		for (var attrib in this.textStyles) {
			value = this.textStyles[attrib];
			if (attrib == "font-size") {
				value += "px";
			}
			this.textboxText.setAttributeNS(null,attrib,value);
		}
		this.textboxText.setAttributeNS(null,"id",this.id+"Text");
		this.textboxText.setAttributeNS(null,"pointer-events","none");
		this.textboxText.setAttributeNS("http://www.w3.org/XML/1998/namespace","space","preserve");
		//check if defaultVal is longer than maxChars and truncate if necessary
		if (this.defaultVal.length <= this.maxChars) {
			this.textboxTextContent = document.createTextNode(this.defaultVal);
			this.cursorPosition = this.defaultVal.length - 1;
		}
		else {
			alert("the default textbox value is longer than the maximum of allowed characters\nDefault val will be truncated.");
			this.textVal = this.defaultVal.substr(0,(this.maxChars - 1));
			this.textboxTextContent = document.createTextNode(this.textVal);
			this.cursorPosition = this.maxChars - 1;
		}
		this.textboxText.appendChild(this.textboxTextContent);
		this.textboxTextGroup.appendChild(this.textboxText);
    	
		//create selection rectangle
		this.selectionRect = document.createElementNS(svgNS,"rect");
		this.selectionRect.setAttributeNS(null,"x",(this.x + this.textStyles["font-size"] / 3));
		this.selectionRect.setAttributeNS(null,"y",(this.y + this.textYOffset - this.textStyles["font-size"] * 0.9));
		this.selectionRect.setAttributeNS(null,"width",(this.textStyles["font-size"] * 2));
		this.selectionRect.setAttributeNS(null,"height",this.textStyles["font-size"] * 1.1);
		for (var attrib in this.selBoxStyles) {
			this.selectionRect.setAttributeNS(null,attrib,this.selBoxStyles[attrib]);
		}
		this.selectionRect.setAttributeNS(null,"display","none");
		this.textboxTextGroup.appendChild(this.selectionRect);
			
		//create cursor element
		this.textboxCursor = document.createElementNS(svgNS,"line");
		this.textboxCursor.setAttributeNS(null,"x1",this.x);
		this.textboxCursor.setAttributeNS(null,"y1",(this.y + this.textYOffset + this.textStyles["font-size"] * 0.2));
		this.textboxCursor.setAttributeNS(null,"x2",this.x);
		this.textboxCursor.setAttributeNS(null,"y2",(this.y + this.textYOffset - this.textStyles["font-size"] * 0.9));
		for (var attrib in this.cursorStyles) {
			this.textboxCursor.setAttributeNS(null,attrib,this.cursorStyles[attrib]);
		}
		this.textboxCursor.setAttributeNS(null,"id",this.id+"Cursor");
		this.textboxCursor.setAttributeNS(null,"visibility","hidden");
		this.textboxTextGroup.appendChild(this.textboxCursor);
    	
		// add event listeners to the textbox group
		this.textboxParent.addEventListener("mousedown",this,false);
		this.textboxParent.addEventListener("mousemove",this,false);
		this.textboxParent.addEventListener("mouseup",this,false);
		//this.textboxParent.addEventListener("keypress",this,false);
		//this.textboxParent.addEventListener("keydown",this,false);
		this.textboxParent.setAttributeNS(null,"cursor","text");
		
		//test if the svgviewer supports getting geometries of individual characters
		this.timer.setTimeout("testSupportsChar",this.timerMs);
	}
	else {
		alert("could not create or reference 'parentNode' of textbox with id '"+this.id+"'");
	}
}

textbox.prototype.testSupportsChar = function() {
	//determine whether viewer is capable of charGeom functions
	var isEmpty = false;
	//temporarily create a space to test if getStartPosition is available
	if (this.textVal.length == 0) {
		isEmpty = true;
		this.textboxTextContent.nodeValue = " ";
	}		
	try {
		var dummy = this.textboxText.getStartPositionOfChar(0).x;
	}
	catch(er) {
		this.supportsCharGeom = false;
	}
	if (isEmpty) {
		this.textboxTextContent.nodeValue = "";
	}
}

//test if window group exists or create a new group at the end of the file
textbox.prototype.testParent = function() {
    //test if of type object
    var nodeValid = false;
    if (typeof(this.parentNode) == "object") {
    	if (this.parentNode.nodeName == "svg" || this.parentNode.nodeName == "g" || this.parentNode.nodeName == "svg:svg" || this.parentNode.nodeName == "svg:g") {
    		this.parentGroup = this.parentNode;
    		nodeValid = true;
    	}
    }
    else if (typeof(this.parentNode) == "string") { 
    	//first test if textbox group exists
    	if (!document.getElementById(this.parentNode)) {
        	this.parentGroup = document.createElementNS(svgNS,"g");
        	this.parentGroup.setAttributeNS(null,"id",this.parentNode);
        	svgsvg.appendChild(this.parentGroup);
        	nodeValid = true;
   		}
   		else {
       		this.parentGroup = document.getElementById(this.parentNode);
       		nodeValid = true;
   		}
   	}
   	return nodeValid;
}

//remove all textbox elements
textbox.prototype.removeTextbox = function() {
	this.parentGroup.removeChild(this.textboxParent);
}

//event handler functions
textbox.prototype.handleEvent = function(evt) {
	this.enterPressed = false 
	if (evt.type == "mousedown") {
		//this case is when the user mousedowns outside the textbox; in this case the textbox should behave like the user
		//pressed the enter key
		if ((evt.currentTarget.nodeName == "svg" || evt.currentTarget.nodeName == "svg:svg") && this.textboxStatus == 2) {
			this.release();
		}
		else {
			//this is for preparing the textbox with first mousedown and to reposition cursor with each subsequent mousedowns
			if (evt.currentTarget.nodeName == "g" || evt.currentTarget.nodeName == "svg:g") {
				this.calcCursorPosFromMouseEvt(evt);
				// set event listeners, this is only done on first mousedown in the textbox
				if (this.textboxStatus == 0) {
					window.addEventListener("keydown",this,false);
					window.addEventListener("keypress",this,false);
					svgsvg.addEventListener("mousedown",this,false);
					svgsvg.addEventListener("mouseup",this,false);
					svgsvg.addEventListener("mousemove",this,false);
					// set textbox status
					this.textboxStatus = 1;
					// set cursor visibility
					this.textboxCursor.setAttributeNS(null,"visibility","visible");
				}
				else {
					evt.stopPropagation();
				}
				this.setCursorPos();
				//start text selection
				this.startOrigSelection = this.cursorPosition + 1;
				this.startSelection = this.cursorPosition + 1;
				this.endSelection = this.cursorPosition + 2;
				//remove previous selections
				this.selectionRect.setAttributeNS(null,"display","none");
				this.selectionRectVisible = false;
				//set status of shiftDown and mouseDown
				this.shiftDown = true;
				this.mouseDown = true;
			}
			//this mouseup should be received from background rectangle (received via document element)
			else {
				this.textboxStatus = 2;
			}
		}
	}
	if (evt.type == "mousemove") {
		if (this.textboxStatus == 2 && this.shiftDown && this.mouseDown && this.supportsCharGeom) {
				this.calcCursorPosFromMouseEvt(evt);
				this.setCursorPos();
				if (this.cursorPosition + 1 != this.startOrigSelection) {
					if (this.cursorPosition + 1 < this.startOrigSelection) {
						this.endSelection = this.startOrigSelection;
						this.startSelection = this.cursorPosition + 1;				
					}
					else {
						this.startSelection = this.startOrigSelection;
						this.endSelection = this.cursorPosition + 1;				
					}
					this.selectionRect.setAttributeNS(null,"display","inherit");
					this.selectionRectVisible = true;
					var rectX = this.textboxText.getStartPositionOfChar(this.startSelection).x
					this.selectionRect.setAttributeNS(null,"x",rectX);
					this.selectionRect.setAttributeNS(null,"width",(this.textboxText.getEndPositionOfChar(this.endSelection - 1).x - rectX));
					var cursorX = parseInt(this.textboxCursor.getAttributeNS(null,"x1"));
					//if cursor runs out on the right, scroll to the right
					if ((cursorX + this.transX) > (this.x + this.boxWidth - this.textStyles["font-size"] / 3)) {
						this.transX = (this.x + this.boxWidth - this.textStyles["font-size"] / 3) - cursorX;
						this.textboxTextGroup.setAttributeNS(null,"transform","translate("+this.transX+",0)");
					}
					//if cursor runs out on the left, scroll to the left
					if ((cursorX + this.transX) < (this.x + this.textStyles["font-size"] / 3)) {
						this.transX += (this.x + this.textStyles["font-size"] / 3) - (cursorX + this.transX);
						if (this.transX * -1 < (this.boxWidth - this.textStyles["font-size"])) {
							this.transX = 0;
						}
						this.textboxTextGroup.setAttributeNS(null,"transform","translate("+this.transX+",0)");
					}
				}
		}
	}
	if (evt.type == "mouseup") {
		if (this.textboxStatus == 2 && this.shiftDown && this.mouseDown) {
				this.mouseDown = false;
		}
	}
	if (evt.type == "keydown") {
		//console.log(evt.keyCode)
		this.specialCharacters(evt);
	}	
	if (evt.type == "keypress") {			
        if (evt.keyCode) {
        	var charCode = evt.keyCode;
		}
		else {
			var charCode = evt.charCode;
		}
		var keyCode = parseInt(charCode);
		var charCode = undefined;
		this.changed = false; //this tracks if the text was actually changed (if the content was changed)
		//alert("keyCode="+evt.keyCode+", charCode="+evt.charCode+", shiftKey"+evt.shiftKey);
				
		this.specialCharacters(evt);
				
		//all real characters
		if (keyCode > 31 && keyCode != 127 && keyCode < 65535 && evt.charCode && evt.charCode < 65535) {			
			var textChanged = false;
			var keychar = String.fromCharCode(keyCode);
			var result = 0;
			if (this.RegExp) {
				result = keychar.search(this.RegExp);
			}			
			if (result == 0) {
				if (this.shiftDown && this.selectionRectVisible) {
					var tempText = this.textVal.substring(0,this.startSelection) + keychar + this.textVal.substring(this.endSelection,this.textVal.length);
					this.textVal = tempText;
					this.cursorPosition = this.startSelection - 1;
					textChanged = true;
					this.releaseShift();
				}
				else if (this.textVal.length < this.maxChars) {
					if (this.cursorPosition == this.textVal.length -1) {
						this.textVal += keychar; // append new input character
					}
					else {
						var tempText = this.textVal.substring(0,(this.cursorPosition + 1)) + keychar + this.textVal.substring((this.cursorPosition + 1),(this.textVal.length));
						this.textVal = tempText;
					}
					textChanged = true;
				}
				if (this.textVal.length < this.maxChars) {
					this.cursorPosition++;
				}
				else {
					if (textChanged) {
						if (this.cursorPosition < this.textVal.length) {
							this.cursorPosition++;	
						}
						else {
							this.cursorPosition = this.textVal.length - 1;
						}
					}	
				}
				//make sure that the selections and shift key are resetted
				this.startSelection = this.cursorPosition;
				this.endSelection = this.cursorPosition;
				this.shiftDown = false;
				if (textChanged) {
					this.textboxTextContent.nodeValue=this.textVal;
					this.changed = true;
					//update cursor position
					this.setCursorPos();
					var cursorX = parseInt(this.textboxCursor.getAttributeNS(null,"x1"));
					if ((cursorX + this.transX) > (this.x + this.boxWidth - this.textStyles["font-size"] / 3)) {
						this.transX = (this.x + this.boxWidth - this.textStyles["font-size"] / 3) - (cursorX + this.transX) + this.transX;
						this.textboxTextGroup.setAttributeNS(null,"transform","translate("+this.transX+",0)");
					}
				}
			}
		}
		//fire function if text changed
		if (this.changed) {
			this.timer.setTimeout("fireFunction",this.timerMs);
		}
		//suppress unwanted browser shortcuts. e.g. in Opera or Mozilla
    	evt.preventDefault();
	}
}

textbox.prototype.specialCharacters = function(evt) {
        if (evt.keyCode) {
        	var charCode = evt.keyCode;
		}
		else {
			var charCode = evt.charCode;
		}
		var keyCode = parseInt(charCode);
		var charCode = undefined;
		
		//backspace key
		if (keyCode == 8) {
			//only do it if there is still text and cursor is not at start position
			if (this.textVal.length > 0 && this.cursorPosition > -2) {
				//first deal with text content, delete chars according to cursor position
				if (this.shiftDown && this.selectionRectVisible) {
					var tempText = this.textVal.substring(0,this.startSelection) + this.textVal.substring(this.endSelection,this.textVal.length);
					this.textVal = tempText;
					this.cursorPosition = this.startSelection - 1;
					this.releaseShift();
				}
				else { 
					if (this.cursorPosition == this.textVal.length - 1) {
						//cursor is at the end of textVal
						this.textVal=this.textVal.substring(0,this.textVal.length-1);
					}
					else {
						//cursor is in between
						var tempText = this.textVal.substring(0,(this.cursorPosition)) + this.textVal.substring((this.cursorPosition + 1),(this.textVal.length));
						this.textVal = tempText;
					}
					//decrease cursor position
					if (this.cursorPosition > -1) {
						this.cursorPosition--;
					}
				}
				this.textboxTextContent.nodeValue=this.textVal;
				this.setCursorPos();
				if (this.cursorPosition > 0) {
					//retransform text element when cursor is at the left side of the box
					if (this.supportsCharGeom) {
						var cursorX = this.textboxText.getStartPositionOfChar(this.cursorPosition).x;
					}
					else {
						var bbox = this.textboxText.getBBox();
						var cursorX = bbox.x + bbox.width;
					}
					if ((cursorX + this.transX) < (this.x + this.textStyles["font-size"] / 3)) {
						this.transX += (this.x + this.textStyles["font-size"] / 3) - (cursorX + this.transX);
						if (this.transX * -1 < (this.boxWidth - this.textStyles["font-size"])) {
							this.transX = 0;
						}
						this.textboxTextGroup.setAttributeNS(null,"transform","translate("+this.transX+",0)");
					}
				}
				this.changed = true;
				//fire function if text changed
				if (this.changed) {
					this.timer.setTimeout("fireFunction",this.timerMs);
				}
				
			}
		}
		//the two enter keys
 		else if (keyCode == 10 || keyCode == 13) { // press return (enter)
 			this.enterPressed = true
			this.release();
		}
		//end key
		else if (keyCode == 35 && !(charCode)) {
			if (evt.shiftKey) {
				if (this.shiftDown == false) {
					this.startOrigSelection = this.cursorPosition + 1;
					this.startSelection = this.cursorPosition + 1;
					this.shiftDown = true;
				}
			}
			this.cursorPosition = this.textVal.length - 1;
			this.setCursorPos();
			//if text string is too long
			var cursorX = parseInt(this.textboxCursor.getAttributeNS(null,"x1"));
			if ((cursorX + this.transX) > (this.x + this.boxWidth - this.textStyles["font-size"] / 3)) {
				this.transX = (this.x + this.boxWidth - this.textStyles["font-size"] / 3) - cursorX;
				this.textboxTextGroup.setAttributeNS(null,"transform","translate("+this.transX+",0)");
			}
			this.setCursorPos();
			if (evt.shiftKey) {
				if (this.shiftDown == false) {
					this.startOrigSelection = this.cursorPosition;
					this.startSelection = this.cursorPosition;
					this.shiftDown = true;
				}
				this.endSelection = this.cursorPosition + 1;
				this.selectionRect.setAttributeNS(null,"display","inherit");
				this.selectionRectVisible = true;
				if (this.supportsCharGeom) {
					var rectX = this.textboxText.getStartPositionOfChar(this.startSelection).x;
					var width = (this.textboxText.getEndPositionOfChar(this.endSelection - 1).x - rectX);
				}
				else {
					var bbox = this.textboxText.getBBox();
					var rectX = this.x + this.textStyles["font-size"] / 3;
					var width = this.x + bbox.width + this.textStyles["font-size"] / 3;
				}
				this.selectionRect.setAttributeNS(null,"x",rectX);		
				this.selectionRect.setAttributeNS(null,"width",width);
			}
			if (this.shiftDown && evt.shiftKey == false) {
				this.releaseShift();
			}
		}
		//home key
		else if (keyCode == 36 && !(charCode)) {
			if (evt.shiftKey) {
				if (this.shiftDown == false) {
					this.startOrigSelection = this.cursorPosition + 1;
					this.startSelection = this.cursorPosition + 1;
					this.shiftDown = true;
				}
			}
			this.cursorPosition = -1;
			this.textboxText.setAttributeNS(null,"x",(this.x + this.textStyles["font-size"] / 3));
			this.textboxTextGroup.setAttributeNS(null,"transform","translate(0,0)");
			this.transX = 0;
			this.setCursorPos();
			if (evt.shiftKey) {
				if (this.shiftDown == false) {
					this.startOrigSelection = this.cursorPosition;
					this.startSelection = this.cursorPosition;
					this.shiftDown = true;
				}
				this.endSelection = this.startSelection;
				this.startSelection = 0;
				this.selectionRect.setAttributeNS(null,"display","inherit");
				this.selectionRectVisible = true;
				if (this.supportsCharGeom) {
					var rectX = this.textboxText.getStartPositionOfChar(this.startSelection).x;
					var width = (this.textboxText.getEndPositionOfChar(this.endSelection - 1).x - rectX);
				}
				else {
					var bbox = this.textboxText.getBBox();
					var rectX = this.x + this.textStyles["font-size"] / 3;
					var width = this.x + bbox.width + this.textStyles["font-size"] / 3;
				}
				this.selectionRect.setAttributeNS(null,"x",rectX);	
				this.selectionRect.setAttributeNS(null,"width",width);			
			}
			if (this.shiftDown && evt.shiftKey == false) {
					this.releaseShift();
			}
		}
		//left key
		else if (keyCode == 37 && !(charCode)) {
			if (this.cursorPosition > -1) {
				this.cursorPosition--;
				this.setCursorPos();
				var cursorX = parseInt(this.textboxCursor.getAttributeNS(null,"x1"));
				if ((cursorX + this.transX) < (this.x + this.textStyles["font-size"] / 3)) {
					this.transX += (this.x + this.textStyles["font-size"] / 3) - (cursorX + this.transX);
					if (this.transX * -1 < (this.boxWidth - this.textStyles["font-size"])) {
						this.transX = 0;
					}
					this.textboxTextGroup.setAttributeNS(null,"transform","translate("+this.transX+",0)");
				}
				//do selection if shift key is pressed
				if (evt.shiftKey && this.supportsCharGeom) {
					if (this.shiftDown == false) {
						this.startOrigSelection = this.cursorPosition + 2;
						this.startSelection = this.cursorPosition + 2;
						this.shiftDown = true;
					}
					this.endSelection = this.startOrigSelection;
					this.startSelection = this.cursorPosition + 1;
					this.selectionRect.setAttributeNS(null,"display","inherit");
					this.selectionRectVisible = true;
					var rectX = this.textboxText.getStartPositionOfChar(this.startSelection).x
					this.selectionRect.setAttributeNS(null,"x",rectX);
					this.selectionRect.setAttributeNS(null,"width",(this.textboxText.getEndPositionOfChar(this.endSelection - 1).x - rectX));
				}
				else {
					if (this.shiftDown) {
						this.releaseShift();
					}
				}
			}
		}
		//right key
		else if (keyCode == 39 && !(charCode)) {
			if (this.cursorPosition < this.textVal.length - 1) {
				this.cursorPosition++;
				this.setCursorPos();
				var cursorX = parseInt(this.textboxCursor.getAttributeNS(null,"x1"));
				if ((cursorX + this.transX) > (this.x + this.boxWidth - this.textStyles["font-size"] / 3)) {
					this.transX = (this.x + this.boxWidth - this.textStyles["font-size"] / 3) - cursorX;
					this.textboxTextGroup.setAttributeNS(null,"transform","translate("+this.transX+",0)");
				}
				//do selection if shift key is pressed
				if (evt.shiftKey && this.supportsCharGeom) {
					if (this.shiftDown == false) {
						this.startOrigSelection = this.cursorPosition;
						this.startSelection = this.cursorPosition;
						this.shiftDown = true;
					}
					this.endSelection = this.cursorPosition + 1;
					this.selectionRect.setAttributeNS(null,"display","inherit");
					this.selectionRectVisible = true;
					var rectX = this.textboxText.getStartPositionOfChar(this.startSelection).x
					this.selectionRect.setAttributeNS(null,"x",rectX);
					this.selectionRect.setAttributeNS(null,"width",(this.textboxText.getEndPositionOfChar(this.endSelection - 1).x - rectX));
				}
				else {
					if (this.shiftDown) {
						this.releaseShift();
					}
				}
			}
		}
		//delete key
		else if ((keyCode == 127 || keyCode == 12 || keyCode == 46) && !(charCode)) {
			if ((this.textVal.length > 0) && (this.cursorPosition < (this.textVal.length))) {
					var tempText = null;
					if (this.shiftDown && evt.shiftKey == false && this.startSelection < this.textVal.length) {
						//we need to delete selected text
						var tempText = this.textVal.substring(0,this.startSelection) + this.textVal.substring(this.endSelection,this.textVal.length);
						this.cursorPosition = this.startSelection - 1;
						this.releaseShift();
						this.changed = true;
					}
					else {
						if (this.cursorPosition < (this.textVal.length - 1)) {
							//we need to delete the next character, if cursor is not at the end of the textstring
							var tempText = this.textVal.substring(0,(this.cursorPosition + 1)) + this.textVal.substring((this.cursorPosition + 2),(this.textVal.length));
							this.changed = true;
						}
					}
					if (this.changed) {
						if(tempText != null) {
							this.textVal = tempText;
							this.textboxTextContent.nodeValue=this.textVal;
							this.setCursorPos();
						}
					}
			}
		}
}

textbox.prototype.setCursorPos = function() {
		//cursor is not at first position
		if (this.cursorPosition > -1) {
			if (this.supportsCharGeom) {
				if (this.textVal.length > 0) {
					var cursorPos = this.textboxText.getEndPositionOfChar(this.cursorPosition).x;
				}
				else {
					var cursorPos = (this.x + this.textStyles["font-size"] / 3);
				}	
				this.textboxCursor.setAttributeNS(null,"x1",cursorPos);
				this.textboxCursor.setAttributeNS(null,"x2",cursorPos);
			}
			else {
				//case MozillaSVG 1.5 or other SVG viewers not implementing .getEndPositionOfChar
				var bbox = this.textboxText.getBBox();
				this.textboxCursor.setAttributeNS(null,"x1",(bbox.x + bbox.width + this.textStyles["font-size"] / 3));
				this.textboxCursor.setAttributeNS(null,"x2",(bbox.x + bbox.width + this.textStyles["font-size"] / 3));
			}
		}
		else {
			//cursor is at first position
			//reset transformations
			this.textboxText.setAttributeNS(null,"x",(this.x + this.textStyles["font-size"] / 3));
			this.textboxTextGroup.setAttributeNS(null,"transform","translate(0,0)");
			this.transX = 0;
			if (this.supportsCharGeom) {
				if (this.textboxTextContent.length > 0) {
					var cursorPos = this.textboxText.getStartPositionOfChar(0).x;
				}
				else {
					var cursorPos = this.x + this.textStyles["font-size"] / 3;
				}
			}
			else {
				var cursorPos = this.x + this.textStyles["font-size"] / 3;
			}
			this.textboxCursor.setAttributeNS(null,"x1",cursorPos);
			this.textboxCursor.setAttributeNS(null,"x2",cursorPos);
		}
}

textbox.prototype.fireFunction = function() {
	var ep = this.enterPressed
	this.enterPressed = false
	var changeType = "change";
	if (this.textboxStatus == 0) {
		changeType = "release";
	}
	if (this.textboxStatus == 5) {
		this.textboxStatus = 0;
		changeType = "set";
	}
	if (typeof(this.functionToCall) == "function") {
		this.functionToCall(this.id,this.textVal,changeType, ep);
	}
	if (typeof(this.functionToCall) == "object") {
		this.functionToCall.textboxChanged(this.id,this.textVal,changeType, ep);	
	}
	if (typeof(this.functionToCall) == undefined) {
		return;
	}
}

textbox.prototype.getValue = function() {
	return this.textVal;
}	

textbox.prototype.setValue = function(value,fireFunction) {
	this.textVal = value.toString();
	this.textboxTextContent.nodeValue=this.textVal;
	//set the cursor to beginning and remove previous transforms
	this.cursorPosition = -1;
	this.setCursorPos();
	if (fireFunction == true) {
		this.textboxStatus = 5; //5 means is set by setValue
		this.fireFunction();
	}
}

textbox.prototype.release = function() {
	// set textbox status
	this.textboxStatus = 0;
	// remove event listeners
	window.removeEventListener("keydown",this,false);
	window.removeEventListener("keypress",this,false);
	svgsvg.removeEventListener("mousedown",this,false);
	svgsvg.removeEventListener("mousemove",this,false);
	svgsvg.removeEventListener("mouseup",this,false);
	//set cursor and text selection to invisible
	this.textboxCursor.setAttributeNS(null,"visibility","hidden");
	this.releaseShift();
	this.timer.setTimeout("fireFunction",this.timerMs);	
}

textbox.prototype.releaseShift = function() {
	this.selectionRect.setAttributeNS(null,"display","none");
	this.selectionRectVisible = false;
	this.shiftDown = false;	
}


textbox.prototype.calcCoord = function(evt,ctmNode) {
	var svgPoint = svgsvg.createSVGPoint();
	svgPoint.x = evt.clientX;
	svgPoint.y = evt.clientY;
	if (!svgsvg.getScreenCTM) {
		//undo the effect of transformations
		if (ctmNode) {
			var matrix = getTransformToRootElement(ctmNode);
		}
		else {
			var matrix = getTransformToRootElement(evt.target);			
		}
  		svgPoint = svgPoint.matrixTransform(matrix.inverse().multiply(this.m));
	}
	else {
		//case getScreenCTM is available
		if (ctmNode) {
			var matrix = ctmNode.getScreenCTM();
		}
		else {
			var matrix = evt.target.getScreenCTM();		
		}
  	svgPoint = svgPoint.matrixTransform(matrix.inverse());
	}
  //undo the effect of viewBox and zoomin/scroll
	return svgPoint;
}

textbox.prototype.calcCursorPosFromMouseEvt = function(evt) {
	//determine cursor position of mouse event
	var myCoords = this.calcCoord(evt,this.textboxText);
	//create an SVG Point object
	var mySVGPoint = svgsvg.createSVGPoint();
	mySVGPoint.x = myCoords.x;
	mySVGPoint.y = myCoords.y;
	//set new cursor position
	if (this.textboxTextContent.length > 0) {
		if (this.supportsCharGeom) {
			//for regular SVG viewers that support .getCharNumAtPosition
			this.cursorPosition = this.textboxText.getCharNumAtPosition(mySVGPoint);
			if (this.cursorPosition > this.textVal.length - 1) {
				this.cursorPosition = this.textVal.length - 1;
			}
			//in this case the user did not correctly touch the text element
			if (this.cursorPosition == -1) {
				//first check if we can fix the position by moving the y-coordinate
				mySVGPoint.y = (this.textboxText.getBBox().y + this.textStyles["font-size"] * 0.5);
				this.cursorPosition = this.textboxText.getCharNumAtPosition(mySVGPoint);
				//check if cursor is to the right of the end of the text
				if (this.cursorPosition == -1) {
					if (mySVGPoint.x > (this.textboxText.getBBox().x + this.textboxText.getBBox().width)) {
						this.cursorPosition = this.textVal.length - 1;
					}
				}
			}
		}
		else {
			//workaround for firefox 1.5/2.0 and other viewers not supporting .getCharNumAtPosition
			var bbox = this.textboxText.getBBox();
			var diffLeft = Math.abs(mySVGPoint.x - bbox.x);
			var diffRight = Math.abs(mySVGPoint.x - (bbox.x + bbox.width));
			if (diffLeft < diffRight) {
				this.cursorPosition = -1;
			}
			else {
				this.cursorPosition = this.textVal.length - 1;
			}
		}
	}
	else {
		//in case the text is empty
		this.cursorPosition = -1;				
	}	
}

textbox.prototype.moveTo = function(moveX,moveY) {
	this.x = moveX;
	this.y = moveY;
	//reposition textbox
	this.textboxRect.setAttributeNS(null,"x",this.x);
	this.textboxRect.setAttributeNS(null,"y",this.y);
	//reposition svg element
	this.svg.setAttributeNS(null,"x",this.x + this.textStyles["font-size"] / 4);
	this.svg.setAttributeNS(null,"y",this.y + this.boxHeight * 0.02);
	this.svg.setAttributeNS(null,"viewBox",(this.x + this.textStyles["font-size"] / 4)+" "+(this.y + this.boxHeight * 0.02)+" "+(this.boxWidth - (this.textStyles["font-size"]) / 2)+" "+(this.boxHeight * 0.96));
	//reposition text element
	this.textboxText.setAttributeNS(null,"x",(this.x + this.textStyles["font-size"] / 3));
	this.textboxText.setAttributeNS(null,"y",(this.y + this.textYOffset));
	//reposition selection element
	this.selectionRect.setAttributeNS(null,"x",(this.x + this.textStyles["font-size"] / 3));
	this.selectionRect.setAttributeNS(null,"y",(this.y + this.textYOffset - this.textStyles["font-size"] * 0.9));
	//reposition cursor
	this.textboxCursor.setAttributeNS(null,"x1",this.x);
	this.textboxCursor.setAttributeNS(null,"y1",(this.y + this.textYOffset + this.textStyles["font-size"] * 0.2));
	this.textboxCursor.setAttributeNS(null,"x2",this.x);
	this.textboxCursor.setAttributeNS(null,"y2",(this.y + this.textYOffset - this.textStyles["font-size"] * 0.9));
	//set the cursor to beginning and remove previous transforms
	this.cursorPosition = -1;
	this.setCursorPos();	
}

textbox.prototype.resize = function(newWidth) {
	this.boxWidth = newWidth;
	//resize textbox rectangle
	this.textboxRect.setAttributeNS(null,"width",this.boxWidth);
	//resize svg element
	this.svg.setAttributeNS(null,"width",this.boxWidth - (this.textStyles["font-size"]) / 2);
	this.svg.setAttributeNS(null,"viewBox",(this.x + this.textStyles["font-size"] / 4)+" "+(this.y + this.boxHeight * 0.02)+" "+(this.boxWidth - (this.textStyles["font-size"]) / 2)+" "+(this.boxHeight * 0.96));
	//set the cursor to beginning and remove previous transforms
	this.cursorPosition = -1;
	this.setCursorPos();	
}

return textbox

}
},{"./timer":2}],2:[function(require,module,exports){
// source/credits: "Algorithm": http://www.codingforums.com/showthread.php?s=&threadid=10531
// The constructor should be called with
// the parent object (optional, defaults to window).

module.exports = function(window) {

function Timer(){
    this.obj = (arguments.length)?arguments[0]:window;
    return this;
}

// The set functions should be called with:
// - The name of the object method (as a string) (required)
// - The millisecond delay (required)
// - Any number of extra arguments, which will all be
//   passed to the method when it is evaluated.

Timer.prototype.setInterval = function(func, msec){
    var i = Timer.getNew();
    var t = Timer.buildCall(this.obj, i, arguments);
    Timer.set[i].timer = window.setInterval(t,msec);
    return i;
}
Timer.prototype.setTimeout = function(func, msec){
    var i = Timer.getNew();
    Timer.buildCall(this.obj, i, arguments);
    Timer.set[i].timer = window.setTimeout("Timer.callOnce("+i+");",msec);
    return i;
}

// The clear functions should be called with
// the return value from the equivalent set function.

Timer.prototype.clearInterval = function(i){
    if(!Timer.set[i]) return;
    window.clearInterval(Timer.set[i].timer);
    Timer.set[i] = null;
}
Timer.prototype.clearTimeout = function(i){
    if(!Timer.set[i]) return;
    window.clearTimeout(Timer.set[i].timer);
    Timer.set[i] = null;
}

// Private data

Timer.set = new Array();
Timer.buildCall = function(obj, i, args){
    var t = "";
    Timer.set[i] = new Array();
    if(obj != window){
        Timer.set[i].obj = obj;
        t = "Timer.set["+i+"].obj.";
    }
    t += args[0]+"(";
    if(args.length > 2){
        Timer.set[i][0] = args[2];
        t += "Timer.set["+i+"][0]";
        for(var j=1; (j+2)<args.length; j++){
            Timer.set[i][j] = args[j+2];
            t += ", Timer.set["+i+"]["+j+"]";
    }}
    t += ");";
    Timer.set[i].call = t;
    return t;
}
Timer.callOnce = function(i){
    if(!Timer.set[i]) return;
    eval(Timer.set[i].call);
    Timer.set[i] = null;
}
Timer.getNew = function(){
    var i = 0;
    while(Timer.set[i]) i++;
    return i;
}

// must be in the global scope...
window.Timer = Timer

return Timer
}
},{}],3:[function(require,module,exports){
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    }
  });
}


var Commons = {
	/* find topmost nodes satisfying a condition */
	findTopmostNodes: function(node, inNodes, childrenOnly, condition) {
		if(!inNodes) inNodes = []
		if(!childrenOnly && node.nodeType == 1) {
			if(condition(node)) {
				inNodes.push(node)	
				// do not search deeper in this subtree...
				return inNodes
			}
		}		
		var children = node.children
		for(var i=0; i<children.length; i++) {
			if(children[i].nodeType == 1) {
				// element --> recurse
				inNodes = this.findTopmostNodes(children[i], inNodes, false, condition)
			}
		}
		return inNodes
	}
	  

}

module.exports = Commons
},{}],"i18n":[function(require,module,exports){
module.exports=require('rq9WIT');
},{}],"rq9WIT":[function(require,module,exports){
// to be used as constructor
var i18n = function(data) {	
	this.locales = data.locales
	this.defaultLocale = data.defaultLocale
	this.__ = function(str) {
		return str		
	}
	this.setLocale = function(loc) {
		// TODO
	}
}
module.exports = i18n
},{}],6:[function(require,module,exports){

module.exports = function($) {
	var Widget = require("./widget")($)

	var InputWidget = Widget.extend({
		constructor: function(data) {
			this.base(data)
			this.val(data.value)
		},
		val: function(value) {
			if(arguments.length==0) {
				// getter
				return this.value
			} else {
				// setter
				this._setValue(value)
				// update widget
				this.setValue(value)
			}
		},
		// call this if the view is changed 
		// so the event wil not propagate back
		_setValue: function(value) {
			this.value = value
			$(this.element).attr("value", value)
		},
		// to be overridden in subclasses... 
		setValue: function(value) {
			console.log("Updating value: "+value)
		}
	})

	return InputWidget
}

},{"./widget":11}],"pageinfo":[function(require,module,exports){
module.exports=require('OzAdbj');
},{}],"OzAdbj":[function(require,module,exports){
var url = require('url')
var path = require('path')

module.exports = function(window) {
    var loc = window.location.href
    var parsedUrl = url.parse(loc, true)
    var query = parsedUrl.query
    var hash = parsedUrl.hash

    return {
      query: query,
      hash: hash,
      baseUrl: url.format({
        protocol:parsedUrl.protocol, 
        pathname:parsedUrl.pathname
      })
    }

}
},{"path":25,"url":27}],9:[function(require,module,exports){
module.exports = function(window) {
	var document = window.document

    /**
     * Create a <g> element and draw a pie chart into it.
     * Arguments:
     *   cx, cy, r: the center and radius of the pie
     *   lx, ly: the upper-left corner of the chart legend
     * Returns: 
     *    A <g> element that holds the pie chart.
     *    The caller must insert the returned element into the document.
     */
    var pieChart = function(slices, cx, cy, r, lx, ly) {
        var svgns = "http://www.w3.org/2000/svg";
        var chart = document.createElementNS(svgns, "g");

        // Add up the data values so we know how big the pie is
        var total = 0;
        for(var i = 0; i < slices.length; i++) total += slices[i].value;
        
        // Now figure out how big each slice of pie is. Angles in radians.
        var angles = []
        for(var i = 0; i < slices.length; i++) angles[i] = slices[i].value/total*Math.PI*2;

        // Loop through each slice of pie.
        startangle = 0;
        for(var i = 0; i < slices.length; i++) {
            // This is where the wedge ends
            var endangle = startangle + angles[i];

            // Compute the two points where our wedge intersects the circle
            // These formulas are chosen so that an angle of 0 is at 12 o'clock
            // and positive angles increase clockwise.
            var x1 = cx + r * Math.sin(startangle);
            var y1 = cy - r * Math.cos(startangle);
            var x2 = cx + r * Math.sin(endangle);
            var y2 = cy - r * Math.cos(endangle);
            
            // This is a flag for angles larger than than a half circle
            // It is required by the SVG arc drawing component
            var big = 0;
            if (endangle - startangle > Math.PI) big = 1;
            
            // We describe a wedge with an <svg:path> element
            // Notice that we create this with createElementNS()
            var path = document.createElementNS(svgns, "path");
            
            // This string holds the path details
            var d = "M " + cx + "," + cy +  // Start at circle center
                " L " + x1 + "," + y1 +     // Draw line to (x1,y1)
                " A " + r + "," + r +       // Draw an arc of radius r
                " 0 " + big + " 1 " +       // Arc details...
                x2 + "," + y2 +             // Arc goes to to (x2,y2)
                " Z";                       // Close path back to (cx,cy)

            // Now set attributes on the <svg:path> element
            path.setAttribute("d", d);              // Set this path 
            path.setAttribute("fill", slices[i].color);   // Set wedge color
            path.setAttribute("stroke", "black");   // Outline wedge in black
            path.setAttribute("stroke-width", "2"); // 2 units thick
            chart.appendChild(path);                // Add wedge to chart

            // The next wedge begins where this one ends
            startangle = endangle;

            // Now draw a little matching square for the key
            var icon = document.createElementNS(svgns, "rect");
            icon.setAttribute("x", lx);             // Position the square
            icon.setAttribute("y", ly + 30*i);
            icon.setAttribute("width", 20);         // Size the square
            icon.setAttribute("height", 20);
            icon.setAttribute("fill", slices[i].color);   // Same fill color as wedge
            icon.setAttribute("stroke", "black");   // Same outline, too.
            icon.setAttribute("stroke-width", "2");
            chart.appendChild(icon);                // Add to the chart

            // And add a label to the right of the rectangle
            var label = document.createElementNS(svgns, "text");
            label.setAttribute("x", lx + 30);       // Position the text
            label.setAttribute("y", ly + 30*i + 14);
            // Text style attributes could also be set via CSS
            label.setAttribute("font-family", "sans-serif");
            label.setAttribute("font-size", "12");
            // Add a DOM text node to the <svg:text> element
            label.appendChild(document.createTextNode(slices[i].label));
            chart.appendChild(label);               // Add text to the chart
        }

        return chart;
    }

    return pieChart

}
},{}],10:[function(require,module,exports){
var SvgHelper = function(window) {
	var document = window.document
	var svgNS = "http://www.w3.org/2000/svg"
	var htmlNS = "http://www.w3.org/1999/xhtml"
	var xlinkNS = "http://www.w3.org/1999/xlink"
	return {
		svg: function(dim, vbox, par) {
			if(!dim) dim = {}				
		    var bbe = document.createElementNS(svgNS, "svg");
			bbe.setAttribute("width", dim.width || 10);         
			bbe.setAttribute("height", dim.height || 10);			
			if(vbox) {
				bbe.setAttribute("viewBox", vbox.x+" "+vbox.y+" "+vbox.width+" "+vbox.height);			
			}
			if(par) {
				bbe.setAttribute("preserveAspectRatio", par)
			}
			return bbe;
		},
		box: function(bbox) {
			if(!bbox) bbox = {}				
		    var bbe = document.createElementNS(svgNS, "rect");
			bbe.setAttribute("x", bbox.x || 0);             
			bbe.setAttribute("y", bbox.y || 0);
			bbe.setAttribute("width", bbox.width || 10);         
			bbe.setAttribute("height", bbox.height || 10);
			bbe.setAttribute("fill", bbox.fill || "none");  
			bbe.setAttribute("stroke", bbox.stroke || "black");  
			return bbe;
		},
		image: function(bbox) {
			if(!bbox) bbox = {}				
		    var bbe = document.createElementNS(svgNS, "image");
			bbe.setAttribute("width", bbox.width || 100);         
			bbe.setAttribute("height", bbox.height || 100);
			bbe.setAttributeNS(xlinkNS, "href", bbox.src);  
			// set additional attributes such as id, name, class...
			for(var key in bbox) {
				if(bbox[key] && key!="width" && key != "height" && key != "src") bbe.setAttribute(key, bbox[key])
			}
			return bbe;
		},
		rect: function(bbox) {
			if(!bbox) bbox = {}				
		    var bbe = document.createElementNS(svgNS, "rect");
			this.attrs(bbe, bbox)
			return bbe;
		},
		mtext: function(text, options) {				
		    var bbe = this.foreignObject(options)
			if(options) this.attrs(bbe, options)
			var p = document.createElementNS(htmlNS, "p")
			p.textContent = text
			bbe.appendChild(p)
			return bbe;
		},
		group: function(options, children) {
			var grp = document.createElementNS(svgNS, "g");
			if(options) this.attrs(grp, options)
			if(children) {
				for(var i=0; i<children.length; i++) {
					grp.appendChild(children[i])
				}
			}
			return grp
		},		
		text: function(text, options) {
			var txt = document.createElementNS(svgNS, "text")
			txt.textContent = text
			if(options) this.attrs(txt, options)
			return txt
		},
		foreignObject: function(bbox) {
			if(!bbox) bbox = {}				
		    var bbe = document.createElementNS(svgNS, "foreignObject");
			bbe.setAttribute("x", bbox.x || 0);             
			bbe.setAttribute("y", bbox.y || 0);
			bbe.setAttribute("width", bbox.width || 10);         
			bbe.setAttribute("height", bbox.height || 10);
			return bbe;
		},
		attrs: function(node, attrs) {
			for(var key in attrs) {
				node.setAttribute(key, attrs[key])
			}
			return node
		},
		attr: function(node, attr, value) {
			node.setAttribute(attr, value)
			return node
		},
		transform: function(node, tr) {
			node.setAttribute("transform", tr)
			return node
		},
		measure: function(node, tempGroupId) {
			if(node.nodeName == "svg" || node.nodename=="foreignObject") {
				/* svg and foreign object must be handled as special case */
				return { 
					x: parseFloat(node.getAttribute("x") || 0),
					y: parseFloat(node.getAttribute("y") || 0),
					width: parseFloat(node.getAttribute("width")),
					height: parseFloat(node.getAttribute("height"))
				}
			} 
  			var tempGroup = document.getElementById(tempGroupId || "tempgroup")
		    tempGroup.appendChild(node)
		    var bbox = node.getBBox()
		    tempGroup.removeChild(node)
		    return bbox
		}

	}
}

module.exports = SvgHelper
},{}],11:[function(require,module,exports){
var Base = require("basejs")

module.exports = function($) {

	var Widget = Base.extend({
		constructor: function(data) {
			this.element = data.element
			this.type = data.type
			this.id = data.id
			this.bounds = data.bounds
			this.dim = data.dim
		},
		click: function(cb) {	
			var self = this
			$(this.element).click(function() {
				if(self.isEnabled()) cb()
			})			
		},
		disable: function() {
			$(this.element).addClass("disabled")
		},
		enable: function() {
			$(this.element).removeClass("disabled")
		},
		setEnabled: function(flag) {
			if(flag) {
				this.enable() 
			} else {
				this.disable()
			}
		},
		isEnabled: function() {
			return !$(this.element).hasClass("disabled")
		}
	})

	return Widget
}

},{"basejs":23}],"widgetizer":[function(require,module,exports){
module.exports=require('BnNKMX');
},{}],"BnNKMX":[function(require,module,exports){
// create a browserified version of widgetizer:
//  browserify -r./js/widgetizer:widgetizer -o public/js/widgetizer-bundle.js
module.exports = function(window, $) {
  console.log("Widgetizer script loading...")
  var document = window.document
  var Commons = require("./commons")
  var SvgHelper = require("./svghelper")(window)
  var Widget = require("./widget")($)
  var InputWidget = require("./inputwidget")($)
  var _ = require("underscore")

	/* Finds all nodes with nodeName == name */
	$.fn.filterNode = function(name) {
	  return this.find('*').filter(function() {
		return this.nodeName === name;
	  });
	};

	/* Finds all nodes with name NAME:sometag */
	$.fn.filterByPrefix = function(name) {
	  return this.find('*').filter(function() {
		return this.nodeName.split(':')[0] === name;
	  });
	};


	/* copy contents from old element to new one */
	/* uses jQuery */
	$.fn.moveChildren = function(to) {
		this.children().each(function() {
				$(to).append($(this))
		})
	}

  
  var Widgetizer = {
	wowNS: "http://example.org/wow",
	svgNS: "http://www.w3.org/2000/svg",
	window: window,
	SvgHelper: SvgHelper,
    $: $,
	_: _,
	widgets: {},
	widgetizers: {},
	widgetId: 1,
	debug: false,
	newWidgetId: function(prefix) {
		return (prefix || "wow-widget-")+(this.widgetId++)
	},
	prepareWidgetData: function(type, element, dim) {
		var id = this.newWidgetId()
		var group = SvgHelper.attrs(SvgHelper.group(), {
		  "data-wow": type,
		  "id": id,
		  "class": "wow-widget "+type
		})
		if(element.length) {
		  // it is an array of elements!
		  _.each(element, function(e) {
			group.appendChild(e)
		  })
		} else {
		  // it is only one element
		  group.appendChild(element)
		}

		// in order to get bounding box, the node must be inserted in the DOM
		var bbox = SvgHelper.measure(group)
		if(!dim) dim = { 
			width: bbox.x+bbox.width,
			height: bbox.y+bbox.height
		}

		if(this.debug) {
			// add text with size info and ID
			var txt = SvgHelper.text(id+" ("+(dim.width).toFixed(1)+", "+(dim.height).toFixed(1)+")", {"x":dim.width, "y":10, "fill":"#333", "font-size":10, "font-family":"Verdana", "text-anchor":"end"})
			group.appendChild(txt)
			
			// add widget bounding box...
			var bbe = SvgHelper.box(bbox)
			SvgHelper.attr(bbe, "stroke", "blue");
			group.appendChild(bbe);   

			// add size box...
			var bbe = SvgHelper.box(dim)
			SvgHelper.attr(bbe, "stroke", "gray");
			group.appendChild(bbe);   
		}

		return {
		  element: group,
		  type: type,
		  id: id,
		  bounds: {x:bbox.x, y:bbox.y, width:bbox.width,height:bbox.height},
		  dim: dim
		}
	  },
	  widget: function(type, element, dim) {
	  	var data = this.prepareWidgetData(type, element, dim)
	  	var w = new Widget(data)
	  	this.widgets[data.id] = w
	  	return w
	  },
	  inputWidget: function(type, element, value, dim) {
	  	var data = this.prepareWidgetData(type, element, dim)
	  	data.value = value
	  	var w = new InputWidget(data)
	  	this.widgets[data.id] = w
	  	return w
	  },
	  /* make widgets from node's descendants... */
	  widgetize: function(node, done) {
		var self = this
		var node = node || document
		var nodes = this.findWowNodes(node, [], true)
		var fun = function(ndx, next)  {
			if(ndx>=nodes.length) {
				if(done) done()
			} else {
				self.makeWidget(nodes[ndx], function() {				
					fun(ndx+1, next)
				})
			}
		}
		fun(0, done)
	  },
	  findWidgetizedNodes: function(node, inNodes, childrenOnly) {
		return Commons.findTopmostNodes(node, inNodes, childrenOnly, function(node) {
			return !!$(node).attr("data-wow")
		})
	  },
	  findWowNodes: function(node, inNodes, childrenOnly) {
		return Commons.findTopmostNodes(node, inNodes, childrenOnly, function(node) {
			return node.nodeName.startsWith("wow:")
		})
	  },
	  findWidgetByName: function(node, name) {
	  	var id = $(node).find("g[name="+name+"]").attr("id")
	  	return this.widgets[id]
	  },
	  findWidgetById: function(node, name) {
	  	return this.widgets[id]
	  },
	  get: function(node, name) {
	  	if(!name) {
	  		name=node
	  		node=document
	  	}
	  	if(name.startsWith("#")) {
	  		return this.findWidgetById(node, name.substr(1))
	  	} else {
	  		return this.findWidgetByName(node, name)
	  	}
	  },
	  makeWidget: function(element, done) {
		/* if the widget has subwidgets, create them... */
		this.widgetize(element)
		/* create the widget */
		var type = element.nodeName.split(":")[1]
		var widgetizer = this.widgetizers[type]
		if(widgetizer) {
		  /* we can run widgetizer on an element... */
		  return widgetizer(element, function(w) {
			// replace element with output
			$(element).replaceWith(w.element)
			// console.log(output) -> this causes error under node=webkit on Windows
			if(done) done(w);
		  })
		} else {
		  console.warn("Unknown widget type: "+type)
		  if(done) done(null)
		  return null
		}
	  },
	  uses: function(widgets) {
		var self = this
		_.each(widgets, function(w){
			/* load widgets... */
			var widgetPath = "../js/widgets/"+w+"/"+w
			require(widgetPath)(self)
		})
	  },
	  useCommonWidgets: function() {
	  	/*
	  	this.uses([
	  		"piechart", 
	  		"box", 
	  		"grid", 
	  		"flow", 
	  		"textbox", 
	  		"viewport", 
	  		"image", 
	  		"text", 
	  		"iconbutton"
	  	])
	  	*/	  	
	  	// browserify does not like dynamic requires...
		var self = this
		require("./widgets/piechart/piechart")(self)
		require("./widgets/box/box")(self)
		require("./widgets/grid/grid")(self)
		require("./widgets/flow/flow")(self)
		require("./widgets/textbox/textbox")(self)
		require("./widgets/viewport/viewport")(self)
		require("./widgets/image/image")(self)
		require("./widgets/text/text")(self)
		require("./widgets/iconbutton/iconbutton")(self)
	  },
	  /* some utility methods */
	  	/* copy non null attributes to an object... */
		getAttrs: function(e, obj, attrmap) {
			for(var key in attrmap) {
				var type = attrmap[key] || "string"
				var val = e.attr(key)
				if(val) {
					/* type check... */
					if(type == "number") {
						val = parseFloat(val)
					}
					obj[key] = val
				}
			}
			return obj
		},
		isTrueAttr: function(e, attrName) {
			var attr = e.attr(attrName)
			if(attr=="true" || attr=="yes") return true;
			return false;		
		},
		// attrs = {width: height: src: }
		loadSvg: function(attrs, done) {
			$.get(attrs.src, function(data) {
				// TODO this does not work here!
				console.log("Loading image for embedding...")
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');
				// Remove any invalid XML tags as per http://validator.w3.org
				$svg.removeAttr('xmlns:a');
				$svg.removeAttr('xml:space');
				$svg.removeAttr('enable-background');
				// remove fill attribute from svg subelements...
				//////$svg.find('*').removeAttr("fill");

				$svg.attr("width", attrs.width);         
				$svg.attr("height", attrs.height);
				done($svg)

			}, 'xml');
		},
		rpc: function(method, params, cb) {
	        $.ajax({
	            type:"POST",
	            url: "http://localhost:9999/rpc",
	            data:{"jsonrpc":"2.0", "method":method, "params":params},
	            success: function (response){
	                cb(null, response)

	            },
	            fail: function(err) {
	                cb(err)
	            }
	        });
	    }

	}

	return Widgetizer 
}
},{"./commons":3,"./inputwidget":6,"./svghelper":10,"./widget":11,"./widgets/box/box":14,"./widgets/flow/flow":15,"./widgets/grid/grid":16,"./widgets/iconbutton/iconbutton":17,"./widgets/image/image":18,"./widgets/piechart/piechart":19,"./widgets/text/text":20,"./widgets/textbox/textbox":21,"./widgets/viewport/viewport":22,"underscore":31}],14:[function(require,module,exports){
module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "box"
		
	var factory = function(element, done) {
        var $e = $(element)
		var width = $e.attr("width") || 100
		var height = $e.attr("height") || 100
		var fill = $e.attr("fill") || "gray"
		var newElement = SvgHelper.box({width:width,height:height,fill:fill})
        var ww = Widgetizer.widget(widgetname, newElement)
		$e.moveChildren(ww.element)
		if(done) done(ww)
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }
},{}],15:[function(require,module,exports){
module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "flow"
		
	var factory = function(element, done) {
      // children are already widgetized...
      var direction = $(element).attr("direction") || "right"
      var anchor = $(element).attr("anchor") || "middle"
	  // we must find topmost widgets...
	  var nodes = Widgetizer.findWidgetizedNodes(element, [], true)
      subwidgets = _.map(nodes, function(e) {
        return Widgetizer.widgets[e.getAttribute("id")]
      })
      var boxes = _.map(subwidgets, function(sw) {
        return { x:0, y:0, w:sw.dim.width, h:sw.dim.height }
      })
      var gg = SvgHelper.group()
      var x = 0
      var y = 0
      var xmin=0,ymin=0,xmax=0,ymax=0
      var maxwidth=0, maxheight=0
      _.each(boxes, function(box) {
        maxwidth = Math.max(maxwidth, box.w)
        maxheight = Math.max(maxheight, box.h)
      })
      var horiz = !(direction=="up" || direction=="down")
      // apply anchor...
      _.each(boxes, function(box) {
        if(horiz) {
          // set y coordinates
          var y=0
          if(anchor=="bottom") {
            y=maxheight-box.h
          } else if(anchor=="middle") {
            y=(maxheight-box.h)/2
          }
          box.y = y
        } else {
          // set x coordinates
          var x=0
          if(anchor=="right") {
            x=maxwidth-box.w
          } else if(anchor=="middle") {
            x=(maxwidth-box.w)/2
          }
          box.x = x
        }
      })
      // apply direction...
      _.each(boxes, function(box) {
        if(direction=="right") {
          box.x = x
          x += box.w
          xmax = x
          ymax = Math.max(ymax, box.h)
        } else if(direction=="left") {
          x -= box.w
          box.x = x
          xmin = x
          ymax = Math.max(ymax, box.h)
        } else if(direction=="up") {
          y -= box.h
          box.y = y
          ymin = y
          xmax = Math.max(xmax, box.w)
        } else if(direction=="down") {
          box.y = y
          y += box.h
          ymax = y
          xmax = Math.max(xmax, box.w)
        } 
      })
      // lay out widgets...
      _.each(subwidgets, function(widget, i) {
        var grp = SvgHelper.group()
        grp.appendChild(widget.element)
        // do layout...
        var box = boxes[i]
        SvgHelper.transform(grp, "translate("+box.x+", "+box.y+")")
        gg.appendChild(grp)
      })
      SvgHelper.transform(gg, "translate("+(-xmin)+","+(-ymin)+")")
      var ww = Widgetizer.widget(widgetname, gg, {width: xmax-xmin, height: ymax-ymin})
	  if(done) done(ww)
	  return ww
    }

	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }

},{}],16:[function(require,module,exports){
module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "grid"
		
	var factory = function(element, done) {
      // children are already widgetized...
      var uniformRows = ($(element).attr("uniformRows") == "true")
      var uniformColumns = ($(element).attr("uniformColumns") == "true")
      var rows = $(element).attr("rows") || 3
      var cols = $(element).attr("cols") || 3
      var halign = $(element).attr("halign") || "center"
      var valign = $(element).attr("valign") || "center"
	  // we must find topmost widgets...
	  var nodes = Widgetizer.findWidgetizedNodes(element, [], true)
      subwidgets = _.map(nodes, function(e) {
        return Widgetizer.widgets[e.getAttribute("id")]
      })
      var boxes = _.map(subwidgets, function(sw) {
        return { x:0, y:0, w:sw.dim.width, h:sw.dim.height }
      })
      var gg = SvgHelper.group()
      var x = 0
      var y = 0
      var xmin=0,ymin=0,xmax=0,ymax=0
      var maxwidth=0, maxheight=0
	  var maxwidths = []
	  var maxheights = []
	  for(var row=0; row<rows; row++) maxheights[row] = 0
	  for(var col=0; col<cols; col++) maxwidths[col] = 0	  
	  var col = 0
	  var row = 0
      _.each(boxes, function(box) {
        maxwidth = Math.max(maxwidth, box.w)
        maxheight = Math.max(maxheight, box.h)
		if(maxwidths[col] < box.w) maxwidths[col] = box.w
		if(maxheights[row] < box.h) maxheights[row] = box.h
		col++;
		if(col == cols) {
		  col = 0;
		  row++;
		}
		if(row == rows) {
			return
		}
      })
	  col = 0
	  row = 0
	  var x0 = 0
	  var y0 = 0
	  var cellWidth
	  var cellHeight
      _.each(subwidgets, function(widget) {
	    x = x0
		y = y0
		cellWidth = uniformColumns ?  maxwidth : maxwidths[col]
		cellHeight = uniformRows ? maxheight : maxheights[row]
		gg.appendChild(SvgHelper.box({x:x, y:y, width:cellWidth, height:cellHeight, fill:((col+row)%2)?"#ffd":"#dff", stroke:"none"}))
		if(valign == "center") {
			y += (cellHeight-widget.dim.height)/2
		} else if(valign == "bottom") {
			y += (cellHeight-widget.dim.height)
		}
		if(halign == "center") {
			x += (cellWidth-widget.dim.width)/2
		} else if(halign == "right") {
			x += (cellWidth-widget.dim.width)
		}
		col++;
		x0 += cellWidth
		if(col == cols) {
		  col = 0;
		  x0 = 0
		  row++;
		  y0 += cellHeight
		}
        var grp = SvgHelper.group()
        grp.appendChild(widget.element)		
        SvgHelper.transform(grp, "translate("+x+", "+y+")")
        gg.appendChild(grp)
		if(row == rows) {
			return
		}
      })
      var ww = Widgetizer.widget(widgetname, gg, {width: cols*maxwidth, height: rows*maxheight})
	  if(done) done(ww)
	  return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }
},{}],17:[function(require,module,exports){
module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "iconbutton"
		
	var factory = function(element, done) {
        var $e = $(element)
		var attrs = { width: 100, height: 100 }
		Widgetizer.getAttrs($e, attrs, { "width":"number", "height":"number", "src":"string"})
		if(!attrs.src.startsWith(".")) {
			attrs.src = "/assets/buttons/"+attrs.src+".svg"
		}
		var newElement = SvgHelper.image(attrs) 
        var ww = Widgetizer.widget(widgetname, newElement, {width:attrs.width,height:attrs.height})
        if($e.attr("name")) SvgHelper.attr(ww.element, "name", $e.attr("name"))
        // TODO addClass 
        if($e.attr("class")) SvgHelper.attr(ww.element, "class", $e.attr("class"))
		Widgetizer.loadSvg(attrs, function($svg) {
			console.log("SVG embedded!")
			$(ww.element).find("image").replaceWith($svg)
			if(done) done(ww)
		})
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }
},{}],18:[function(require,module,exports){
module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "image"
				

	var factory = function(element, done) {
        var $e = $(element)
		var attrs = { width: 100, height: 100 }
		Widgetizer.getAttrs($e, attrs, { "width":"number", "height":"number", "src":"string", "class":"string", "name":"string"})
		var embed = Widgetizer.isTrueAttr($e, "embed")
		var newElement = SvgHelper.image(attrs) 
        var ww = Widgetizer.widget(widgetname, newElement, {width:attrs.width,height:attrs.height})
		if(embed) {
			Widgetizer.loadSvg(attrs, function($svg) {
				console.log("SVG embedded!")
				$(ww.element).find("image").replaceWith($svg)
				if(done) done(ww)
			})
		} else {
			if(done) done(ww)
		}
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }
},{}],19:[function(require,module,exports){
module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	/* widget name */
	var widgetname = "piechart"
	var PieChart = require("../../piechart")(window)
		
	/* the factory method */
	/* the actual implementation goes here... */
	var factory = function(element, done) {
      /* pie chart has several slices */
      var slices = $(element).filterNode("wow:pieslice")
      slices = _.map(slices, function(s) {
        var $s = $(s)
        return {label:$s.attr("label"), value:parseFloat($s.attr("value")), color:$s.attr("color")}
      })

      /* create pie chart */
      var newElement = PieChart(slices, 50, 50, 40, 110, 10)

	  var ww = Widgetizer.widget(widgetname, newElement)
	  if(done) done(ww)
	  return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory
	
	/* return instance */
	return factory
	
 }
},{"../../piechart":9}],20:[function(require,module,exports){
module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "text"
		
	var factory = function(element, done) {
        var $e = $(element)
		var width = parseFloat($e.attr("width") || 100)
		var height = parseFloat($e.attr("height") || 100)
		var klass = $e.attr("class")
		var text = $e.text()
		// TODO add class attribute to more widgets...
		// TODO correct calculation of bounding box
		var newElement = SvgHelper.mtext(text, {width:width,height:height,"class":klass})
        var ww = Widgetizer.widget(widgetname, newElement, {width:width, height:height})
		if(done) done(ww)
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }
},{}],21:[function(require,module,exports){
module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._
	var svgsvg = window.document.getElementById("svg")
	var textbox = require("../../carto.net/textbox")(window, svgsvg)

	/***********************************************************************************************************/
	var widgetname = "textbox"
		
	var factory = function(element, done) {
		var $e = $(element)
		var maxChars = $e.attr("maxchars") || 20
		var newElement = SvgHelper.group()
		var newId = Widgetizer.newWidgetId("wow-textfield-")
		var text = $e.text() || $e.attr("value") || ""
		var tb = new textbox({
			id: newId,
			parentNode: newElement,
			defaultVal: text, 
			maxChars: maxChars,
			x: 0,
			y: 0,
			boxWidth: parseInt($e.attr("width") || 200),
			boxHeight: parseInt($e.attr("height") || 30),
			textYOffset: 22,
			textStyles: {"font-family":"Arial,Helvetica","font-size":15,"fill":"dimgray"},
			boxStyles: {"fill":"white","stroke":"dimgray","stroke-width":1.5},
			cursorStyles: {"stroke":"red","stroke-width":1.5},
			selBoxStyles: {"fill":"blue","opacity":0.5},
			allowedChars: "[a-zA-Z ]",
			functionToCall: function(textboxId, value, changeType, enterPressed) { 
				ww._setValue(value)
				// HACK -> we need to catch ENTER press event to trigger searching
				if(enterPressed && ww.onEnterPressed) ww.onEnterPressed()
			}
		});
		var ww = Widgetizer.inputWidget(widgetname, newElement, tb.getValue())
		ww.setValue = function(value) {
			tb.setValue(value)
		}
        if($e.attr("name")) SvgHelper.attr(ww.element, "name", $e.attr("name"))
		if(done) done(ww)
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }
},{"../../carto.net/textbox":1}],22:[function(require,module,exports){
module.exports = function(Widgetizer) {
	/* common fields... */
	var window = Widgetizer.window
	var SvgHelper = Widgetizer.SvgHelper
	var $ = Widgetizer.$
	var _ = Widgetizer._

	/***********************************************************************************************************/
	var widgetname = "viewport"
		
	var factory = function(element, ww) {
        var $e = $(element)
		var width = parseFloat($e.attr("width") || 100)
		var height = parseFloat($e.attr("height") || 100)
		var nodes = Widgetizer.findWidgetizedNodes(element, [], true)
		var dim = {width:width,height:height}
		var vbox = null // viewbox
		var vboxAttr = element.getAttribute("viewBox")
		var par = element.getAttribute("preserveAspectRatio") || "xMidYMid meet"
		// console.log($e.attr("preserveAspectRatio")) --> this does not work!
		if(!vboxAttr) {
			if(nodes.length == 1) {
				var widget = Widgetizer.widgets[nodes[0].getAttribute("id")]			
				// one single subwidget... get its size
				vbox = { x:0, y:0, width: widget.dim.width, height: widget.dim.height }
			} else {
				// get bounding box of the contents and set viewbox accordingly...
				var g = SvgHelper.group()
				$e.moveChildren(g)
				var bbox = SvgHelper.measure(g)
				vbox = { x:bbox.x, y:bbox.y, width: bbox.width, height: bbox.height }
				$(g).moveChildren($e)
			}
		} 
		var newElement = SvgHelper.svg(dim, vbox, par)
		if(vboxAttr) newElement.setAttribute("viewBox", vboxAttr)
        var ww = Widgetizer.widget(widgetname, newElement, dim)
		$e.moveChildren(newElement)
		if(done) done(ww)		
		return ww
	}
	/***********************************************************************************************************/

	/* register it... */
	Widgetizer.widgetizers[widgetname] = factory	
	/* return instance */
	return factory
	
 }
},{}],23:[function(require,module,exports){
/*
  Based on Base.js 1.1a (c) 2006-2010, Dean Edwards
  Updated to pass JSHint and converted into a module by Kenneth Powers
  License: http://www.opensource.org/licenses/mit-license.php
*/
/*global define:true module:true*/
/*jshint eqeqeq:true*/
(function (name, global, definition) {
  if (typeof module !== 'undefined') {
    module.exports = definition();
  } else if (typeof define !== 'undefined' && typeof define.amd === 'object') {
    define(definition);
  } else {
    global[name] = definition();
  }
})('Base', this, function () {
  // Base Object
  var Base = function () {};

  // Implementation
  Base.extend = function (_instance, _static) { // subclass
    var extend = Base.prototype.extend;
    // build the prototype
    Base._prototyping = true;
    var proto = new this();
    extend.call(proto, _instance);
    proto.base = function () {
      // call this method from any other method to invoke that method's ancestor
    };
    delete Base._prototyping;
    // create the wrapper for the constructor function
    //var constructor = proto.constructor.valueOf(); //-dean
    var constructor = proto.constructor;
    var klass = proto.constructor = function () {
        if (!Base._prototyping) {
          if (this._constructing || this.constructor === klass) { // instantiation
            this._constructing = true;
            constructor.apply(this, arguments);
            delete this._constructing;
          } else if (arguments[0] !== null) { // casting
            return (arguments[0].extend || extend).call(arguments[0], proto);
          }
        }
      };
    // build the class interface
    klass.ancestor = this;
    klass.extend = this.extend;
    klass.forEach = this.forEach;
    klass.implement = this.implement;
    klass.prototype = proto;
    klass.toString = this.toString;
    klass.valueOf = function (type) {
      return (type === 'object') ? klass : constructor.valueOf();
    };
    extend.call(klass, _static);
    // class initialization
    if (typeof klass.init === 'function') klass.init();
    return klass;
  };

  Base.prototype = {
    extend: function (source, value) {
      if (arguments.length > 1) { // extending with a name/value pair
        var ancestor = this[source];
        if (ancestor && (typeof value === 'function') && // overriding a method?
        // the valueOf() comparison is to avoid circular references
        (!ancestor.valueOf || ancestor.valueOf() !== value.valueOf()) && /\bbase\b/.test(value)) {
          // get the underlying method
          var method = value.valueOf();
          // override
          value = function () {
            var previous = this.base || Base.prototype.base;
            this.base = ancestor;
            var returnValue = method.apply(this, arguments);
            this.base = previous;
            return returnValue;
          };
          // point to the underlying method
          value.valueOf = function (type) {
            return (type === 'object') ? value : method;
          };
          value.toString = Base.toString;
        }
        this[source] = value;
      } else if (source) { // extending with an object literal
        var extend = Base.prototype.extend;
        // if this object has a customized extend method then use it
        if (!Base._prototyping && typeof this !== 'function') {
          extend = this.extend || extend;
        }
        var proto = {
          toSource: null
        };
        // do the "toString" and other methods manually
        var hidden = ['constructor', 'toString', 'valueOf'];
        // if we are prototyping then include the constructor
        for (var i = Base._prototyping ? 0 : 1; i < hidden.length; i++) {
          var h = hidden[i];
          if (source[h] !== proto[h])
            extend.call(this, h, source[h]);
        }
        // copy each of the source object's properties to this object
        for (var key in source) {
          if (!proto[key]) extend.call(this, key, source[key]);
        }
      }
      return this;
    }
  };

  // initialize
  Base = Base.extend({
    constructor: function () {
      this.extend(arguments[0]);
    }
  }, {
    ancestor: Object,
    version: '1.1',
    forEach: function (object, block, context) {
      for (var key in object) {
        if (this.prototype[key] === undefined) {
          block.call(context, object[key], key, object);
        }
      }
    },
    implement: function () {
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'function') {
          // if it's a function, call it
          arguments[i](this.prototype);
        } else {
          // add the interface using the extend method
          this.prototype.extend(arguments[i]);
        }
      }
      return this;
    },
    toString: function () {
      return String(this.valueOf());
    }
  });

  // Return Base implementation
  return Base;
});

},{}],24:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],25:[function(require,module,exports){
var process=require("__browserify_process");// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

},{"__browserify_process":24}],26:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};/*! http://mths.be/punycode v1.2.3 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    length,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.3',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return punycode;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

},{}],27:[function(require,module,exports){
/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '~', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(delims),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#']
      .concat(unwise).concat(autoEscape),
    nonAuthChars = ['/', '@', '?', '#'].concat(delims),
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-zA-Z0-9][a-z0-9A-Z_-]{0,62}$/,
    hostnamePartStart = /^([a-zA-Z0-9][a-z0-9A-Z_-]{0,62})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always have a path component.
    pathedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && typeof(url) === 'object' && url.href) return url;

  if (typeof url !== 'string') {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var out = {},
      rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    out.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      out.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {
    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    // don't enforce full RFC correctness, just be unstupid about it.

    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the first @ sign, unless some non-auth character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    var atSign = rest.indexOf('@');
    if (atSign !== -1) {
      var auth = rest.slice(0, atSign);

      // there *may be* an auth
      var hasAuth = true;
      for (var i = 0, l = nonAuthChars.length; i < l; i++) {
        if (auth.indexOf(nonAuthChars[i]) !== -1) {
          // not a valid auth.  Something like http://foo.com/bar@baz/
          hasAuth = false;
          break;
        }
      }

      if (hasAuth) {
        // pluck off the auth portion.
        out.auth = decodeURIComponent(auth);
        rest = rest.substr(atSign + 1);
      }
    }

    var firstNonHost = -1;
    for (var i = 0, l = nonHostChars.length; i < l; i++) {
      var index = rest.indexOf(nonHostChars[i]);
      if (index !== -1 &&
          (firstNonHost < 0 || index < firstNonHost)) firstNonHost = index;
    }

    if (firstNonHost !== -1) {
      out.host = rest.substr(0, firstNonHost);
      rest = rest.substr(firstNonHost);
    } else {
      out.host = rest;
      rest = '';
    }

    // pull out port.
    var p = parseHost(out.host);
    var keys = Object.keys(p);
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      out[key] = p[key];
    }

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    out.hostname = out.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = out.hostname[0] === '[' &&
        out.hostname[out.hostname.length - 1] === ']';

    // validate a little.
    if (out.hostname.length > hostnameMaxLen) {
      out.hostname = '';
    } else if (!ipv6Hostname) {
      var hostparts = out.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            out.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    // hostnames are always lower case.
    out.hostname = out.hostname.toLowerCase();

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = out.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      out.hostname = newOut.join('.');
    }

    out.host = (out.hostname || '') +
        ((out.port) ? ':' + out.port : '');
    out.href += out.host;

    // strip [ and ] from the hostname
    if (ipv6Hostname) {
      out.hostname = out.hostname.substr(1, out.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    out.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    out.search = rest.substr(qm);
    out.query = rest.substr(qm + 1);
    if (parseQueryString) {
      out.query = querystring.parse(out.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    out.search = '';
    out.query = {};
  }
  if (rest) out.pathname = rest;
  if (slashedProtocol[proto] &&
      out.hostname && !out.pathname) {
    out.pathname = '/';
  }

  //to support http.request
  if (out.pathname || out.search) {
    out.path = (out.pathname ? out.pathname : '') +
               (out.search ? out.search : '');
  }

  // finally, reconstruct the href based on what has been validated.
  out.href = urlFormat(out);
  return out;
}

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (typeof(obj) === 'string') obj = urlParse(obj);

  var auth = obj.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = obj.protocol || '',
      pathname = obj.pathname || '',
      hash = obj.hash || '',
      host = false,
      query = '';

  if (obj.host !== undefined) {
    host = auth + obj.host;
  } else if (obj.hostname !== undefined) {
    host = auth + (obj.hostname.indexOf(':') === -1 ?
        obj.hostname :
        '[' + obj.hostname + ']');
    if (obj.port) {
      host += ':' + obj.port;
    }
  }

  if (obj.query && typeof obj.query === 'object' &&
      Object.keys(obj.query).length) {
    query = querystring.stringify(obj.query);
  }

  var search = obj.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (obj.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  return protocol + host + pathname + search + hash;
}

function urlResolve(source, relative) {
  return urlFormat(urlResolveObject(source, relative));
}

function urlResolveObject(source, relative) {
  if (!source) return relative;

  source = urlParse(urlFormat(source), false, true);
  relative = urlParse(urlFormat(relative), false, true);

  // hash is always overridden, no matter what.
  source.hash = relative.hash;

  if (relative.href === '') {
    source.href = urlFormat(source);
    return source;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    relative.protocol = source.protocol;
    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[relative.protocol] &&
        relative.hostname && !relative.pathname) {
      relative.path = relative.pathname = '/';
    }
    relative.href = urlFormat(relative);
    return relative;
  }

  if (relative.protocol && relative.protocol !== source.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      relative.href = urlFormat(relative);
      return relative;
    }
    source.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      relative.pathname = relPath.join('/');
    }
    source.pathname = relative.pathname;
    source.search = relative.search;
    source.query = relative.query;
    source.host = relative.host || '';
    source.auth = relative.auth;
    source.hostname = relative.hostname || relative.host;
    source.port = relative.port;
    //to support http.request
    if (source.pathname !== undefined || source.search !== undefined) {
      source.path = (source.pathname ? source.pathname : '') +
                    (source.search ? source.search : '');
    }
    source.slashes = source.slashes || relative.slashes;
    source.href = urlFormat(source);
    return source;
  }

  var isSourceAbs = (source.pathname && source.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host !== undefined ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (source.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = source.pathname && source.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = source.protocol &&
          !slashedProtocol[source.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // source.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {

    delete source.hostname;
    delete source.port;
    if (source.host) {
      if (srcPath[0] === '') srcPath[0] = source.host;
      else srcPath.unshift(source.host);
    }
    delete source.host;
    if (relative.protocol) {
      delete relative.hostname;
      delete relative.port;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      delete relative.host;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    source.host = (relative.host || relative.host === '') ?
                      relative.host : source.host;
    source.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : source.hostname;
    source.search = relative.search;
    source.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    source.search = relative.search;
    source.query = relative.query;
  } else if ('search' in relative) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      source.hostname = source.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = source.host && source.host.indexOf('@') > 0 ?
                       source.host.split('@') : false;
      if (authInHost) {
        source.auth = authInHost.shift();
        source.host = source.hostname = authInHost.shift();
      }
    }
    source.search = relative.search;
    source.query = relative.query;
    //to support http.request
    if (source.pathname !== undefined || source.search !== undefined) {
      source.path = (source.pathname ? source.pathname : '') +
                    (source.search ? source.search : '');
    }
    source.href = urlFormat(source);
    return source;
  }
  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    delete source.pathname;
    //to support http.request
    if (!source.search) {
      source.path = '/' + source.search;
    } else {
      delete source.path;
    }
    source.href = urlFormat(source);
    return source;
  }
  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (source.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    source.hostname = source.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = source.host && source.host.indexOf('@') > 0 ?
                     source.host.split('@') : false;
    if (authInHost) {
      source.auth = authInHost.shift();
      source.host = source.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (source.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  source.pathname = srcPath.join('/');
  //to support request.http
  if (source.pathname !== undefined || source.search !== undefined) {
    source.path = (source.pathname ? source.pathname : '') +
                  (source.search ? source.search : '');
  }
  source.auth = relative.auth || source.auth;
  source.slashes = source.slashes || relative.slashes;
  source.href = urlFormat(source);
  return source;
}

function parseHost(host) {
  var out = {};
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      out.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) out.hostname = host;
  return out;
}

}());

},{"punycode":26,"querystring":30}],28:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

},{}],29:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

},{}],30:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":28,"./encode":29}],31:[function(require,module,exports){
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.5.2';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array, using the modern version of the 
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from an array.
  // If **n** is not specified, returns a single random element from the array.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (arguments.length < 2 || guard) {
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, value, context) {
      var result = {};
      var iterator = value == null ? _.identity : lookupIterator(value);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n == null) || guard ? array[0] : slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) {
      return array[array.length - 1];
    } else {
      return slice.call(array, Math.max(array.length - n, 0));
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

},{}]},{},["BnNKMX","rq9WIT","OzAdbj"])