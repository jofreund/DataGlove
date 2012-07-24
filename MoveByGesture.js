function Update () {	
	script=GameObject.Find("Base").GetComponent("DataGlove");
	gesture=script.getRecognizedGesture();
	print(gesture);
	if (gesture[5] == "Fist")
		 movement = Vector3(0,0, -0.2);
	else if (gesture[5] == "Point")
		 movement = Vector3(0,0, 0.2);
	else
		movement = Vector3(0,0,0);

	transform.Translate(movement);
}