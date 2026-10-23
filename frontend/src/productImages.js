const commonsFile = (name) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name).replaceAll('%20', '_')}`;

const productImages = {
  'Farm Fresh Ridge Gourd': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Luffa_aegyptica.jpg/330px-Luffa_aegyptica.jpg',
    imageCredit: commonsFile('Luffa aegyptica.jpg'),
  },
  'Organic Lady Finger': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Okra_%28Abelmoschus_esculentus%29_Feb_2019._DSC_0060_01.jpg/960px-Okra_%28Abelmoschus_esculentus%29_Feb_2019._DSC_0060_01.jpg',
    imageCredit: commonsFile('Okra (Abelmoschus esculentus) Feb 2019. DSC 0060 01.jpg'),
  },
  'Fresh Cucumber': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/ARS_cucumber.jpg/330px-ARS_cucumber.jpg',
    imageCredit: commonsFile('ARS cucumber.jpg'),
  },
  'Organic Pumpkin': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/FrenchMarketPumpkinsB.jpg/330px-FrenchMarketPumpkinsB.jpg',
    imageCredit: commonsFile('FrenchMarketPumpkinsB.jpg'),
  },
  'Farm Fresh Sweet Potato': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Ipomoea_batatas_006.JPG/330px-Ipomoea_batatas_006.JPG',
    imageCredit: commonsFile('Ipomoea batatas 006.JPG'),
  },
  'Organic Pomegranate': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Pomegranate02_edit.jpg/960px-Pomegranate02_edit.jpg',
    imageCredit: commonsFile('Pomegranate02 edit.jpg'),
  },
  'Fresh Guava': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Guava_pink_fruit.jpg/330px-Guava_pink_fruit.jpg',
    imageCredit: commonsFile('Guava pink fruit.jpg'),
  },
  'Farm Fresh Grapes': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Grapes%2C_Rostov-on-Don%2C_Russia.jpg/330px-Grapes%2C_Rostov-on-Don%2C_Russia.jpg',
    imageCredit: commonsFile('Grapes, Rostov-on-Don, Russia.jpg'),
  },
  'Organic Pineapple': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/%E0%B4%95%E0%B5%88%E0%B4%A4%E0%B4%9A%E0%B5%8D%E0%B4%9A%E0%B4%95%E0%B5%8D%E0%B4%95.jpg/330px-%E0%B4%95%E0%B5%88%E0%B4%9A%E0%B4%9A%E0%B4%95%E0%B5%8D%E0%B4%95.jpg',
    imageCredit: 'https://en.wikipedia.org/wiki/Pineapple',
  },
  'Fresh Strawberries': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/330px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg',
    imageCredit: commonsFile('Garden strawberry (Fragaria × ananassa) single2.jpg'),
  },
  'Organic Blueberries': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Blueberries.jpg/330px-Blueberries.jpg',
    imageCredit: commonsFile('Blueberries.jpg'),
  },
  'Farm Fresh Kiwi': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Actinidia_fruits.jpg/330px-Actinidia_fruits.jpg',
    imageCredit: commonsFile('Actinidia fruits.jpg'),
  },
  'Organic Cherries': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Cherry_season_%2848216568227%29.jpg/330px-Cherry_season_%2848216568227%29.jpg',
    imageCredit: commonsFile('Cherry season (48216568227).jpg'),
  },
  'Fresh Peach': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Peach_tree_with_fruit_%283708639080%29.jpg/960px-Peach_tree_with_fruit_%283708639080%29.jpg',
    imageCredit: commonsFile('Peach tree with fruit (3708639080).jpg'),
  },
  'Organic Plum': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Plums_African_Rose_-_whole%2C_halved_and_slice.jpg/330px-Plums_African_Rose_-_whole%2C_halved_and_slice.jpg',
    imageCredit: commonsFile('Plums African Rose - whole, halved and slice.jpg'),
  },
  'Farm Fresh Pear': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Pears.jpg/330px-Pears.jpg',
    imageCredit: commonsFile('Pears.jpg'),
  },
  'Organic Lychee': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Litchi_chinensis_fruits.JPG/330px-Litchi_chinensis_fruits.JPG',
    imageCredit: commonsFile('Litchi chinensis fruits.JPG'),
  },
  'Fresh Custard Apple': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Bananas_and_Custard_Apples_on_the_Fruit_Wagon_%2810522372815%29.jpg/960px-Bananas_and_Custard_Apples_on_the_Fruit_Wagon_%2810522372815%29.jpg',
    imageCredit: commonsFile('Bananas and Custard Apples on the Fruit Wagon (10522372815).jpg'),
  },
  'Farm Fresh Chikoo': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/%E0%B4%B8%E0%B4%AA%E0%B4%AA%E0%B5%8D%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg/330px-%E0%B4%B8%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg',
    imageCredit: 'https://en.wikipedia.org/wiki/Sapodilla',
  },
  'Organic Dragon Fruit': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Pitaya_cross_section_ed2.jpg/330px-Pitaya_cross_section_ed2.jpg',
    imageCredit: commonsFile('Pitaya cross section ed2.jpg'),
  },
  'Fresh Muskmelon': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Muskmelon.jpg/330px-Muskmelon.jpg',
    imageCredit: commonsFile('Muskmelon.jpg'),
  },
  'Organic Figs (Anjeer)': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Fresh_figs.jpg/960px-Fresh_figs.jpg',
    imageCredit: commonsFile('Fresh figs.jpg'),
  },
  'Farm Fresh Avocado': {
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Persea_americana_fruit_2.JPG/330px-Persea_americana_fruit_2.JPG',
    imageCredit: commonsFile('Persea americana fruit 2.JPG'),
  },
};

const sapodillaFilename = encodeURIComponent('സപ്പോട്ട.jpg');
productImages['Farm Fresh Chikoo'].image =
  `https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/${sapodillaFilename}/330px-${sapodillaFilename}`;

globalThis.GAURANGA_PRODUCT_IMAGES = productImages;
