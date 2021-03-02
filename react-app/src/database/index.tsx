const mapIdToInfo = [
  {
    id: '1',
    nameOfProduct: 'One Plus 8 Pro',
    price: '60,000',
    imgSrc: 'src/images/prod1.jpeg',
    status: 'In Stock!',
  },
  {
    id: '2',
    nameOfProduct: 'Sony Headphones',
    price: '4,000',
    imgSrc: 'src/images/prod2.jpeg',
    status: 'In Stock!',
  },
  {
    id: '3',
    nameOfProduct: 'Logitech Mechanical Keyboard',
    price: '2,500',
    imgSrc: 'src/images/prod3.jpeg',
    status: 'In Stock!',
  },
  {
    id: '4',
    nameOfProduct: 'Seagate External Hard disk',
    price: '3,400',
    imgSrc: 'src/images/prod4.jpeg',
    status: 'Only 10 left!',
  },
  {
    id: '5',
    nameOfProduct: 'Samsung 10000mAh Powerbank',
    price: '5,000',
    imgSrc: 'src/images/prod5.jpeg',
    status: 'In Stock!',
  },
  {
    id: '6',
    nameOfProduct: 'Dell Inspiron 15 7501 Laptop',
    price: '75,000',
    imgSrc: 'src/images/prod6.jpeg',
    status: 'Only 10 left!',
  },
  {
    id: '7',
    nameOfProduct: 'MuscleBlaze 4lb Rich Protein',
    price: '5,500',
    imgSrc: 'src/images/prod7.jpeg',
    status: 'In Stock!',
  },
  {
    id: '8',
    nameOfProduct: 'Boat Speakers',
    price: '7,000',
    imgSrc: 'src/images/prod8.jpeg',
    status: 'In Stock!',
  },
];

const database = new Map();

mapIdToInfo.forEach((item) => database.set(item.id, item));
export { database };

const similarProductsList:string[] = [];
similarProductsList.push('1');
similarProductsList.push('2');
similarProductsList.push('3');
similarProductsList.push('4');
export { similarProductsList };
