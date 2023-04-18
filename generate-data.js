const fs = require('fs');
const casual = require('casual');
const uniqid = require('uniqid');

const productApi = require('./api/product-api');
const { mapToProduct } = require('./utils');
const { categoryList, photoList, cityList, meetupList, userList } = require('./mock');

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

const fetchProductList = async () => {
  const productList = [];

  for (const category of categoryList) {
    const queryParams = {
      p: 1,
      q: category.searchTerm,
    };

    const { data } = await productApi.getAll(queryParams);
    const productIdList = data.slice(0, 20).map((item) => item.id);

    for (const productId of productIdList) {
      const product = await productApi.get(productId);
      const transformedProduct = mapToProduct(product);
      transformedProduct.categoryId = category.id;

      productList.push(transformedProduct);
    }
  }

  return productList;
};

// MAIN
(async () => {
  // random data
  const postList = randomPostList(50);
  const studentList = randomStudentList(50);
  const productList = await fetchProductList();

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
