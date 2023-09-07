const GUITAR_DATA = [
  {
    id: 1,
    title: 'Electric_guitars',
    items: [
      {
        id: 1,
        name: 'Fender',
        description: 'Tom DeLonge Stratocaster Electric Guitar With Invader SH8 Pickup Black',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/M01684000002000-00-600x600.jpg',
        price: 1299,
      },
      {
        id: 2,
        name: 'Gibson',
        description: 'Les Paul Traditional Pro V Satin Electric Guitar Desert Burst',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L69588000003000-00-600x600.jpg',
        price: 1799,
      },
      {
        id: 3,
        name: 'Epiphone SG',
        description: 'Traditional Pro Electric Guitar Metallic Gold',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L79164000003000-00-600x600.jpg',
        price: 329,
      },
      {
        id: 4,
        name: 'EVH',
        description: 'Striped Series Frankie Electric Guitar Red with Black and White Stripes Relic',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L73032000001000-00-600x600.jpg',
        price: 1999,
      },
      {
        id: 5,
        name: 'Squier',
        description: '40th Anniversary Telecaster Vintage Edition Electric Guitar Satin Dakota Red',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L92320000003000-00-600x600.jpg',
        price: 389,
      },
      {
        id: 6,
        name: 'Fender ',
        description: 'American Professional II Stratocaster Maple Fingerboard Electric Guitar Olympic White',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L78115000002000-00-600x600.jpg',
        price: 669,
      },
      {
        id: 7,
        name: 'Fender Juanes',
        description: 'Luna Stratocaster Electric Guitar Luna White',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/M01746000001000-00-600x600.jpg',
        price: 2299,
      },
      {
        id: 8,
        name: 'Fender Custom Shop',
        description: 'SuperNova Stratocaster HSS Heavy Relic Floyd Rose Electric Guitar Black over Purple Sparkle',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L95059000002000-00-600x600.jpg',
        price: 5800,
      },
      {
        id: 13,
        name: 'Epiphone Les Paul',
        description: 'Special-I Limited-Edition Electric Guitar Worn Pelham Blue',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/H71861000005000-00-600x600.jpg',
        price: 199,
      },
    ],
  },
  {
    id: 2,
    title: 'Acoustic_guitars',
    items: [
      {
        id: 10,
        name: 'Martin GPC',
        description: 'Special Koa X Series Grand Performance Acoustic-Electric Guitar',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/GPC-Special-Koa-X-Series-Grand-Performance-Acoustic-Electric-Guitar-Natural/L59020000001000-00-264x264.jpg',
        price: 539,
      },
      {
        id: 11,
        name: 'Fender',
        description: 'FA-135CE Concert Acoustic-Electric Guitar',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L44601000003000-00-600x600.jpg',
        price: 169,
      },
      {
        id: 12,
        name: 'Martin',
        description: 'SC-10E Road Series Sapele Top Acoustic-Electric Guitar Natural',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/M04183000001000-00-600x600.jpg',
        price: 999,
      },
      {
        id: 14,
        name: 'Martin OMJM',
        description: '20th Anniversary John Mayer Signature Acoustic-Electric Guitar Gray Sunburst',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/M00130000001000-00-600x600.jpg',
        price: 3999,
      },
      {
        id: 15,
        name: 'Mitchell',
        description: 'MX430 Spalted Maple Acoustic-Electric Guitar Whiskey Burst',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L44006000001000-00-600x600.jpg',
        price: 479,
      },
      {
        id: 16,
        name: 'Breedlove',
        description: 'Discovery S CE African Mahogany-African Mahogany HB Concert Acoustic-Electric Guitar Natural',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L86000000001000-00-600x600.jpg',
        price: 549,
      },
      {
        id: 17,
        name: 'Rogue',
        description: 'Starter Acoustic Guitar Blue Burst',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/519266000030000-00-600x600.jpg',
        price: 79,
      },
      {
        id: 18,
        name: 'Epiphone',
        description: 'PRO-1 Acoustic Guitar Natural',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/J09893000004000-00-600x600.jpg',
        price: 189,
      },
      {
        id: 19,
        name: 'Taylor',
        description: '214e DLX Grand Auditorium Acoustic-Electric Guitar Tobacco Sunburst',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L18959000001000-00-600x600.jpg',
        price: 1449,
      },
    ]
  },
  {
    id: 3,
    title: 'Bass_guitars',
    items: [
      {
        id: 21,
        name: 'Fender',
        description: 'American Professional II Jazz Bass Rosewood Fingerboard Limited-Edition Dark Night',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L84324000001000-00-600x600.jpg',
        price: 1799,
      },
      {
        id: 22,
        name: 'Squier',
        description: 'Limited-Edition Classic Vibe \'70s Precision Bass Surf Green',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L70897000001000-04-600x600.jpg',
        price: 459,
      },
      {
        id: 23,
        name: 'Schecter',
        description: 'Guitar Research Omen Elite-5 5-String Electric Bass See-Thru Blue Burst',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L83537000002000-02-600x600.jpg',
        price: 649,
      },
      {
        id: 24,
        name: 'Sterling',
        description: 'by Music Man StingRay Classic Ray24CA Electric Bass Mint Green',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L85133000001000-00-600x600.jpg',
        price: 549,
      },
      {
        id: 25,
        name: 'Mitchell',
        description: 'MB200 Modern Rock Bass With Active EQ Gun Metal Gray',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/J37187000003000-04-600x600.jpg',
        price: 229,
      },
      {
        id: 26,
        name: 'Jackson',
        description: 'X Series Concert CBXNT DX IV Electric Bass Guitar Fireburst',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L84972000001000-04-600x600.jpg',
        price: 699,
      },
      {
        id: 27,
        name: 'Sterling',
        description: 'by Music Man StingRay Ray34HH Spalted Maple Top Maple Fingerboard Electric Bass Natural Burst Satin',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L79630000001000-04-600x600.jpg',
        price: 1079,
      },
      {
        id: 28,
        name: 'Hagstrom',
        description: 'Viking Electric Bass Guitar Transparent Cherry',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/L83513000002000-00-600x600.jpg',
        price: 1249,
      },
      {
        id: 29,
        name: 'Ibanez',
        description: 'AEB5E Acoustic-Electric Bass Black',
        imageUrl: 'https://media.guitarcenter.com/is/image/MMGS7/620445000001000-00-600x600.jpg',
        price: 269,
      },
    ]
  }
]

export default GUITAR_DATA;
