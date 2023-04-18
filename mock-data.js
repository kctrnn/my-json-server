const uniqid = require('uniqid');

const meetupList = [
  {
    id: uniqid(),
    title: 'This is a first meetup',
    image:
      'https://images.unsplash.com/photo-1635121517160-ac25ebd42e64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80',
    address: 'Meetup street 5, 12345 Meetup City',
    description:
      'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
  {
    id: uniqid(),
    title: 'This is a second meetup',
    image:
      'https://images.unsplash.com/photo-1635014002223-dd531eb973da?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1164&q=80',
    address: 'Meetup street 21, 21320 Meetup City',
    description:
      'This is a second, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
  {
    id: uniqid(),
    title: 'This is a third meetup',
    image:
      'https://images.unsplash.com/photo-1634788906402-3796dabc53e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1129&q=80',
    address: 'Meetup street 3, 12321 Meetup City',
    description:
      'This is a third, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
];

const photoList = [
  {
    id: uniqid(),
    label: 'Vibe photo 400',
    url: 'https://images.unsplash.com/photo-1633524417716-9326600b43a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1175&q=80',
    createdAt: Date.now(),
  },
  {
    id: uniqid(),
    label: 'Alone',
    url: 'https://images.unsplash.com/photo-1633524418799-a314f8ee40de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1175&q=80',
    createdAt: Date.now(),
  },
  {
    id: uniqid(),
    label: 'Bar',
    url: 'https://images.unsplash.com/photo-1633524418328-ad79c090329d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1175&q=80',
    createdAt: Date.now(),
  },
  {
    id: uniqid(),
    label: 'Sidestep',
    url: 'https://images.unsplash.com/photo-1633660483633-d4aec0aba670?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=378&q=80',
    createdAt: Date.now(),
  },
  {
    id: uniqid(),
    label: 'An in-camera double film exposure of a child in silhouette with daisies and sunshine',
    url: 'https://images.unsplash.com/photo-1626861084819-20cdedc9c8d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    createdAt: Date.now(),
  },
  {
    id: uniqid(),
    label: "Central Coast California images on film back in the early 2000's",
    url: 'https://images.unsplash.com/photo-1633639376674-9bc601e00bba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1164&q=80',
    createdAt: Date.now(),
  },
  {
    id: uniqid(),
    label: 'Motorcycle, Leica R7 (1994)',
    url: 'https://images.unsplash.com/photo-1633502401802-de56208cf890?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=385&q=80',
    createdAt: Date.now(),
  },
  {
    id: uniqid(),
    label: 'A hairdresser and his competition model in the 1970s',
    url: 'https://images.unsplash.com/photo-1633967305479-457f946f42ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    createdAt: Date.now(),
  },
  {
    id: uniqid(),
    label: 'Walking around Dalat, Vietnam',
    url: 'https://images.unsplash.com/photo-1633711443449-0088dd784a8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=385&q=80',
    createdAt: Date.now(),
  },
];

module.exports.meetupList = meetupList;
module.exports.photoList = photoList;
