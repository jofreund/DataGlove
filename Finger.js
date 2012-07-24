/*
Finger.js
Author: Johannes Freund

Simple Script that uses DataGlove.js to get Transformation Data from a DataGlove and
translates it onto a 3D Object of a hand.

*/

var fingerID=1;
var deltaR = 90;
var amount=0.5;

function Update () {
script=GameObject.Find("Base").GetComponent("DataGlove");
amount=1-script.getFingerData(fingerID);


	transform.localRotation=Quaternion.Euler(0,0,amount*deltaR);
	for (var child : Transform in transform) {
		if(child.tag=="Controller") {	 
			child.transform.localRotation=Quaternion.Euler(0,0,amount*deltaR);
			for (var childchild : Transform in child) {
				if(childchild.tag=="Controller") {	 
					childchild.transform.localRotation=Quaternion.Euler(0,0,amount*deltaR);
				}
			}
		}
	}
}