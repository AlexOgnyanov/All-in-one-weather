-- CreateTable
CREATE TABLE "DataEntry" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "pressure" INTEGER NOT NULL,
    "temperature" INTEGER NOT NULL,
    "altitude" INTEGER NOT NULL,

    CONSTRAINT "DataEntry_pkey" PRIMARY KEY ("id")
);
