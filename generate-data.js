const fs = require('fs');
const casual = require('casual');
const uniqid = require('uniqid');

const { meetupList, photoList } = require('./mock-data');

const randomStudentList = (n) => {
  if (n <= 0) return [];

  const studentList = [];

  Array.from(new Array(n)).forEach(() => {
    const newStudent = {
      id: uniqid(),
      name: casual.full_name,
      age: casual.integer(18, 27),
      mark: Number.parseFloat(casual.double(3, 10).toFixed(1)),
      gender: ['male', 'female'][casual.integer(1, 100) % 2],
      city: ['hcm', 'hn', 'dn', 'ha', 'pt'][casual.integer(1, 100) % 5],

      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    studentList.push(newStudent);
  });

  return studentList;
};

const randomPostList = (n) => {
  if (n <= 0) return [];

  const postList = [];

  Array.from(new Array(n)).forEach(() => {
    const newPost = {
      id: uniqid(),
      title: casual.title,
      author: casual.full_name,
      description: casual.words(50),
      imageUrl: `https://picsum.photos/id/${casual.integer(1, 1000)}/1368/400`,

      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    postList.push(newPost);
  });

  return postList;
};

const cityList = [];
const categoryList = [];
const productList = [];
const userList = [];

// MAIN
(async () => {
  // random data
  const postList = randomPostList(50);
  const studentList = randomStudentList(50);
  //   const productList = await fetchProductList();

  // prepare db object
  const db = {
    posts: postList,
    students: studentList,
    cities: cityList,

    photos: photoList,
    meetups: meetupList,

    categories: categoryList,
    products: productList,

    users: userList,
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log(
      `
        ${db.posts.length} posts /
        ${db.students.length} students /
        ${db.cities.length} cities /
        ${db.photos.length} photos /
        ${db.products.length} products /
        ${db.categories.length} categories /
        ${db.meetups.length} meetups /
        ${db.users.length} users 🤪
        `
    );
  });
})();
