const uniqid = require('uniqid');

const randomDataList = (length, item) => {
  if (length <= 0) return [];

  const list = [];

  Array.from({ length }).forEach(() => {
    const newItem = {
      id: uniqid(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...item,
    };

    list.push(newItem);
  });

  return list;
};

module.exports.randomDataList = randomDataList;
