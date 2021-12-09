#include <ArduinoJson.h>
#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <Servo.h>

Servo myservo;

#define relayPin1 D2 //Relay 1
#define relayPin2 D3 //Relay 2
#define relayPin3 D4 //Relay 3
#define relayPin4 D5 //Servo
#define relayPin5 D6 //Relay 5

#define WIFI_AP "Meo Meo"
#define WIFI_PASSWORD "mangcut9987"

int pos = 0;
 
char Thingsboard_Server[] = "demo.thingsboard.io";
#define User_name "yD1EeBV5HpD4IAZChR8g"
WiFiClient wifiClient;
 
int status = WL_IDLE_STATUS;
 
PubSubClient client(wifiClient);

 //boolean gpioStatus[] = {true,true,true,true,true};
boolean gpioStatus[] = {false,false,false,false,false};
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(10);
  pinMode(relayPin1,OUTPUT);
  pinMode(relayPin2,OUTPUT);
  pinMode(relayPin3,OUTPUT);
  myservo.attach(relayPin4);
  pinMode(relayPin5,OUTPUT);
  
  digitalWrite(relayPin1,LOW);
  digitalWrite(relayPin2,LOW);
  digitalWrite(relayPin3,LOW);
  digitalWrite(relayPin5,LOW);
  
  InitWiFi();
  client.setServer(Thingsboard_Server,1883);
  client.setCallback(callback);
}
 
void loop() {
  // put your main code here, to run repeatedly:
  if(!client.connected()){
        reconnect();
    }
    client.loop();
}
void callback(const char* topic, byte* payload, unsigned int length){
    //Serial.println("On message");
    char json[length + 1];
    strncpy (json, (char*)payload, length);
    json[length] = '\0';
  
    Serial.println("Topic: ");
    Serial.println(topic);
    
    Serial.println("Message: ");
    
    Serial.println(json);
    
    StaticJsonBuffer<200> jsonBuffer;
    
    JsonObject  &data = jsonBuffer.parseObject((char*)json);
    
    if (!data.success()){
    Serial.println("parseObject() failed");
    return;
    }
    String methodName = String((const char*)data["method"]);
    if(methodName.equals("R1")){
      if(data["params"]==true){
          digitalWrite(relayPin1,LOW);
          gpioStatus[0]=true;
          }
      else{
          digitalWrite(relayPin1,HIGH);
          gpioStatus[0]=false;
          }
    }
/**************************************************/
    if(methodName.equals("R2")){
      if(data["params"]==true){
          digitalWrite(relayPin2,LOW);
          gpioStatus[1]=true;
          }
      else{
          digitalWrite(relayPin2,HIGH);
          gpioStatus[1]=false;
          }
    }
/**************************************************/
    if(methodName.equals("R3")){
      if(data["params"]==true){
          digitalWrite(relayPin3,LOW);
          gpioStatus[2]=true;
          }
      else{
          digitalWrite(relayPin3,HIGH);
          gpioStatus[2]=false;
          }
    }
/**************************************************/
    if(methodName.equals("R4")){
      if(data["params"]==true){
          for(pos = 0; pos < 60; pos += 1){
              myservo.write(pos);              
              delay(20);                   
            }
          gpioStatus[3]=true;
          }
      else{
          for(pos = 60; pos>=1; pos-=1) {
              myservo.write(pos);             
              delay(20);                       
            }
          gpioStatus[3]=false;
          }
    }
/**************************************************/  

  if(methodName.equals("R5")){
      if(data["params"]==true){
          digitalWrite(relayPin5,LOW);
          gpioStatus[4]=true;
          }
      else{
          digitalWrite(relayPin5,HIGH);
          gpioStatus[4]=false;
          }
    }
/**************************************************/
    client.publish("v1/devices/me/attributes", get_gpio_status().c_str()); 
  }
void reconnect(){
// Loop until we're reconnected
  while (!client.connected()){
    status = WiFi.status();
    if( status != WL_CONNECTED){
        WiFi.begin(WIFI_AP, WIFI_PASSWORD);
        while (WiFi.status() != WL_CONNECTED){
        delay(500);
        Serial.print(".");
      }
    Serial.println("Connected to AP");
    }
  Serial.print("Connecting to Thingsboard node ...");
// Attempt to connect (clientId, username, password)
  if(client.connect("TESTRELAY",User_name,NULL)){
    Serial.println( "[DONE]" );
    client.subscribe("v1/devices/me/rpc/request/+");//dang ky nhan cas lenh rpc tu cloud
    client.publish("v1/devices/me/attributes", get_gpio_status().c_str());
    } 
  else{
    Serial.print( "[FAILED] [ rc = " );
    Serial.print( client.state());
    Serial.println(" : retrying in 5 seconds]");
    // Wait 5 seconds before retrying
    delay( 5000 );
    }
  }
}
String get_gpio_status(){
  // Prepare gpios JSON payload string
  StaticJsonBuffer<200> jsonBuffer;
  
  JsonObject& data = jsonBuffer.createObject();
  
  data["R1"]=gpioStatus[0] ? true : false;
  data["R2"]=gpioStatus[1] ? true : false;
  data["R3"]=gpioStatus[2] ? true : false;
  data["R4"]=gpioStatus[3] ? true : false;
  data["R5"]=gpioStatus[4] ? true : false;
  char payload[256];
  data.printTo(payload, sizeof(payload));
  String strPayload = String(payload);
  Serial.println("Get gpio status: ");
  Serial.println(strPayload);
  return strPayload;
}
void InitWiFi(){
  Serial.println("Connecting to AP ...");
// attempt to connect to WiFi network
  WiFi.begin(WIFI_AP, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
    }
  Serial.println("Connected to AP");
}
