#include "RTClib.h"

RTC_DS1307 rtc;

struct TxStruct {
  int humidity;
  int pressure;
  int altitude;
  int temperature;
};


void setup() {
  Serial.begin(9600);

  sdcard_setup();
  bmp180_setup();
  rtc_setup();
  dht_setup();
  lora_setup();
}

void loop() {
  int humidity = GetHumidity();
  int pressure = readPressure();
  int altitude = GetAltitude();
  int temperature = GetTemperature();

  TxStruct txData = { humidity, pressure, altitude, temperature };
  transmitData(txData);

  delay(1 * 2 * 1000);
}
