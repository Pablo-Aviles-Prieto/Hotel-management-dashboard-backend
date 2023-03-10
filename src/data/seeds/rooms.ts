import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
import { mongodb } from '../../loaders';
import { RoomModel } from '../../models';

config();

void mongodb();

const insertRoomData = async () => {
  const fakePhotos = [
    'https://pablo-aviles-prieto.github.io/hotel-management-app/assets/hotel-rooms/room1.jpg',
    'https://pablo-aviles-prieto.github.io/hotel-management-app/assets/hotel-rooms/room2.jpg',
    'https://pablo-aviles-prieto.github.io/hotel-management-app/assets/hotel-rooms/room3.jpg'
  ];
  const randomNumberForPhotos = faker.datatype.number({
    min: 0,
    max: fakePhotos.length - 1
  });
  const randomRoomNumber = faker.datatype.number({
    min: 0,
    max: 9999
  });
  const randomRoomName = faker.animal.fish();
  const randomDescription = 'Random description for this room';
  const fakeBedType = ['Double superior', 'Single bed', 'Double bed'];
  const randomNumberForBedType = faker.datatype.number({
    min: 0,
    max: fakeBedType.length - 1
  });
  const fakeRoomFloor = ['A-1', 'B-3', 'B-2', 'B-1', 'A-2', 'A-3'];
  const randomNumberForRoomFloor = faker.datatype.number({
    min: 0,
    max: fakeRoomFloor.length - 1
  });
  const fakeFacilities = [
    ['Shower', 'LED TV', 'Coffee Set', 'Towel'],
    ['Shower', 'Double Bed', 'Wifi', 'Coffee Set'],
    ['LED TV', 'Bath', 'AC', 'Wifi'],
    ['AC', 'LED TV', 'Towel', 'Bath'],
    ['AC', 'Shower', 'Towel', 'Wifi'],
    ['Double Bed', 'LED TV', 'Towel', 'Coffee Set']
  ];
  const randomNumberForFacilities = faker.datatype.number({
    min: 0,
    max: fakeFacilities.length - 1
  });
  const randomRatePerNight = faker.datatype.number({
    min: 199,
    max: 599
  });
  const fakeStatus = ['Booked', 'Available'];
  const randomNumberForStatus = faker.datatype.number({
    min: 0,
    max: fakeStatus.length - 1
  });
  const fakeRoomType = [
    'Deluxe C-661',
    'Deluxe B-55',
    'Deluxe A-26',
    'Medium B-33',
    'Medium A-53',
    'Simple A-11',
    'Simple A-25'
  ];
  const randomNumberForRoomType = faker.datatype.number({
    min: 0,
    max: fakeRoomType.length - 1
  });

  const room = new RoomModel({
    photo: fakePhotos[randomNumberForPhotos],
    roomNumber: randomRoomNumber,
    roomName: randomRoomName,
    bedType: fakeBedType[randomNumberForBedType],
    roomFloor: fakeRoomFloor[randomNumberForRoomFloor],
    roomDescription: randomDescription,
    roomType: fakeRoomType[randomNumberForRoomType],
    facilities: fakeFacilities[randomNumberForFacilities],
    ratePerNight: randomRatePerNight,
    status: fakeStatus[randomNumberForStatus],
    offerPrice: null
  });

  const result = await room.save();
  console.log('result', result);
  return;
};

const insertData = (numberOfExecutes: number) => {
  [...Array(numberOfExecutes)].forEach(async () => {
    await insertRoomData();
  });
};

void insertData(30);
