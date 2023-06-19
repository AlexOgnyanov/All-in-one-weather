#include <SoftwareSerial.h>

#define rxPin 6
#define txPin 7

SoftwareSerial sendSerial(rxPin, txPin);

struct RxStruct {
  int humidity;
  int pressure;
  int altitude;
  int temperature;
};

RxStruct rxData;

bool newData = false;

const byte startMarker = 255;
const byte rxDataLen = sizeof(rxData);

void setup() {
  Serial.begin(9600);
  Serial.println("\nStarting LoRa Reciever\n");
  sendSerial.begin(9600);
}

void loop() {
  recvStructWithKnownLength();
  if (newData == true) {
    sendNewData();
    newData = false;
  }
}

void sendNewData() {
  Serial.print("Recieved ");
  Serial.print(rxData.humidity);
  Serial.print(' ');
  Serial.print(rxData.pressure);
  Serial.print(' ');
  Serial.print(rxData.altitude);
  Serial.print(' ');
  Serial.println(rxData.temperature);
}

void recvStructWithKnownLength() {
  static byte recvData[rxDataLen];
  byte rb;
  byte *structStart;
  structStart = reinterpret_cast<byte *>(&rxData);

  if (sendSerial.available() >= rxDataLen + 1 and newData == false) {
    rb = sendSerial.read();

    if (rb == startMarker) {
      // copy the bytes to the struct
      for (byte n = 0; n < rxDataLen; n++) {
        *(structStart + n) = sendSerial.read();
      }

      // make sure there is no garbage left in the buffer
      while (sendSerial.available() > 0) {
        byte dumpTheData = sendSerial.read();
      }

      newData = true;
    }
  }
}