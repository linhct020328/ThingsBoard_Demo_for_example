#include <ArduinoJson.h>
#include <PubSubClient.h>
#include <ESP8266WiFi.h>


#define relayPin D2 

#define WIFI_AP "nokia110i"
#define WIFI_PASSWORD "12345678"

 
char Thingsboard_Server[100] = "192.168.43.40";//"demo.thingsboard.io";
#define port_Server 1883
#define User_name "CdkJ6c3VIcllaKX6ZElb" //"yD1EeBV5HpD4IAZChR8g"

WiFiClient wifiClient;
 
int status = WL_IDLE_STATUS;
 
PubSubClient client(wifiClient);

boolean gpioStatus[] = {false};

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(10);
  pinMode(relayPin,OUTPUT);
  
  digitalWrite(relayPin,LOW);
  
  InitWiFi();
  client.setServer(Thingsboard_Server,port_Server);
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
    if(methodName.equals("Light")){
      if(data["params"]==true){
          digitalWrite(relayPin,LOW);
          gpioStatus[0]=true;
          }
      else{
          digitalWrite(relayPin,HIGH);
          gpioStatus[0]=false;
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
  
  data["Light"]=gpioStatus[0] ? true : false;
  
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
