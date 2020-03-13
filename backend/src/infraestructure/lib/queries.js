'use strict';

async function deleteItemModel (id, model) {
  const cond = {
    where: {
      id
    }
  };

  const item = await model.findOne(cond);

  if (item) {
    const deleted = await model.destroy(cond);
    return +!!deleted; // Returns 1 if it was successfully removed and 0 if it couldn't be removed
  }

  return -1; // Returns 1 if the record wasn't found
}

module.exports = {
  deleteItemModel
};
