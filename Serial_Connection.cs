using UnityEngine;

using System.Collections;

using System.IO.Ports;

using System.Threading;

public class Serial_Connection : MonoBehaviour

{	
	public string portName="COM5";
	public int baudRate=115200;
	
	public static SerialPort sp;
	
	public static string strIn;
	
	public static int intIn;
	
	static SerialPort _serialPort;
	
	public static int[] val = new int[2];
	
	// Use this for initialization
	void Start () {
		sp = new SerialPort(portName, baudRate, Parity.None, 8, StopBits.One);
		foreach (string s in SerialPort.GetPortNames() ) {
			print(s);
		}
		OpenConnection();	
	}
	
	void Update() {
		strIn = sp.ReadLine();
		print(Time.frameCount+": "+strIn);
	//  print(System.Convert.ToInt32(strIn));
	}
	
	public void OpenConnection() {
	    if(sp != null) {
			if (!sp.IsOpen) {
				print(sp.PortName);
	        	sp.Open();  // opens the connection
	        	sp.ReadTimeout = 1000;  // sets the timeout value before reporting error
				print("Open Port!");
			}
			if(sp.IsOpen) {
	        	print("Port Opened!");
			}
	    }
	    else {
	       if(sp.IsOpen) {
	         print("Port is already open");
	       }
	       else {
	         print("Port == null");
	       }
	    }
	}
	
	void OnApplicationQuit() {
	    sp.Close();
	}
	
	public string getString() {
		return strIn;		
	}
	
}