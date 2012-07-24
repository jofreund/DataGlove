/*
DataGlove.js
Author: Johannes Freund

Simple Script that establishes a Serial Connection (using "Serial_Connection.cs") in Unity 3D
and takes the input string to recognize gestures.

*/

//Default values for Glove Input
var GloveString = "0.3,0.3.0.8,0.9,1.0";

var Gestures = new Array();

var GestureRecognition = true;
var SerialConnectionActive = true;

var MatchThreshold = 100;

//Values: 0-4: Data Values; 5: Name; 6: ID; 7: Likelihood
//Create native Unity-Arrays
var Gesture1Name = "";
var Gesture1Data : float[];
var Gesture2Name = "";
var Gesture2Data : float[];
var Gesture3Name = "";
var Gesture3Data : float[];
var Gesture4Name = "";
var Gesture4Data : float[];

//Convert to JS Arrays
Gesture1 = new Array (Gesture1Data);
Gesture2 = new Array (Gesture2Data);
Gesture3 = new Array (Gesture3Data);
Gesture4 = new Array (Gesture4Data);

addGesture(Gesture1,Gesture1Name,1);
addGesture(Gesture2,Gesture2Name,2);
addGesture(Gesture3,Gesture3Name,3);
addGesture(Gesture4,Gesture4Name,4);

function Update () {
//	Establish Serial Connection if Toggle is set
if (SerialConnectionActive) {
	SerialConnection = GetComponent("Serial_Connection");
	
	SerialConnectionString = SerialConnection.getString();
	
//	Check if Serial Connection String is complete
	if (SerialConnectionString != null && SerialConnectionString.length == 24)
	GloveString = SerialConnectionString;
}
	//Start Gesture Recognition if Toggle is set
	if (GestureRecognition) {
		for (var value in Gestures) {
			maxLikelihood(explodeGloveData(), value);
	    }
	    
//		Sort Array by Gesture-Likelihood
	    Gestures.Sort(sortGestureArray);

//		If Likeliness is in Threshold -> Match
		if (Gestures[0][7] < MatchThreshold) {
			print("Detected Gesture: \nName: "+Gestures[0][5]+"\nLikelihood: "+Gestures[0][7]);
		}
		else
		print("No Gesture Detected.");
	}
}

function explodeGloveData() {
	GData = GloveString.Split(","[0]); //Explode the GloveString and return the parts as strings
	
//	Create a new array with the data converted to floats
	GloveDataArray = new Array (GData[0],GData[1],GData[2],GData[3],GData[4]); 
	for (i=0; i<5; i++) {
		GloveDataArray[i]=float.Parse(GloveDataArray[i]);
		if (GloveDataArray[i]>1)
			GloveDataArray[i]=1;
		if (GloveDataArray[i]<0)
			GloveDataArray[i]=0;
	}
	return GloveDataArray;
}

function maxLikelihood(GloveData, Gesture) {
//	Calculate maximum Likelihood for given Gesture
	factors = new Array();
	for (i=0; i<5; i++) {
		factors[i] = Mathf.Pow((GloveData[i]-Gesture[i]),2);
	}
	factorSum = factors[0]+factors[1]+factors[2]+factors[3]+factors[4];
	Gesture[7] = factorSum;
}

function addGesture(Gesture,GestureName,id) {
//	Add additional Data to Gesture
	Gesture[5] = GestureName;
	Gesture[6] = id;
	Gesture[7] = 0;
	//Push on Gestures Array
	Gestures.Push(Gesture);
}

function sortGestureArray(a:Array, b:Array) {
//	Custom Sort-Function to sort by Likelihood
    if (a[7] > b[7])
        return 1;
    else if (a[7] < b[7])
        return -1;
    else
        return 0;
}

function getFingerData(fingerID) {
	return (explodeGloveData()[fingerID]);
}

function getGloveData() {
	return (explodeGloveData);
}

function getRecognizedGesture() {
//	If Likeliness is in Threshold -> Match
	if (Gestures[0][7] < MatchThreshold) {
		return(Gestures[0]);
	}
	else
		return(null);
}