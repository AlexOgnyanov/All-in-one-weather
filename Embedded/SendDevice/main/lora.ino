#include <SoftwareSerial.h>

#define rxPin 6
#define txPin 7

SoftwareSerial sendSerial(rxPin, txPin);

const byte startMarker = 255;

void lora_setup(){
  sendSerial.begin(9600);
}

void transmitData(struct TxStruct data) {
  const byte txDataLen = sizeof(data);

  sendSerial.write(startMarker);
  sendSerial.write((byte*)&data, txDataLen);
  Serial.print("Sent ");
  Serial.print(data.humidity);
  Serial.print(' ');
  Serial.print(data.pressure);
  Serial.print(' ');
  Serial.print(data.altitude);
  Serial.print(' ');
  Serial.println(data.temperature);
}