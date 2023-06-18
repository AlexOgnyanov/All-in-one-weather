import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const devicesCount = 10;
  const entriesPerDevice = 10;

  for (let deviceId = 1; deviceId <= devicesCount; deviceId++) {
    for (let entryIndex = 1; entryIndex <= entriesPerDevice; entryIndex++) {
      const humidity = Math.floor(Math.random() * 100);
      const pressure = Math.floor(Math.random() * 1000);
      const temperature = Math.floor(Math.random() * 50);
      const altitude = Math.floor(Math.random() * 5000);

      const post = await prisma.dataEntry.upsert({
        where: { id: (deviceId - 1) * devicesCount + entryIndex },
        update: {
          deviceId: deviceId,
          humidity: humidity,
          pressure: pressure,
          temperature: temperature,
          altitude: altitude,
        },
        create: {
          deviceId: deviceId,
          humidity: humidity,
          pressure: pressure,
          temperature: temperature,
          altitude: altitude,
        },
      });

      console.log(post);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
