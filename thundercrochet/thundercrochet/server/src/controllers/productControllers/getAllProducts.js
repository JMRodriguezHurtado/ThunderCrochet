const { Products } = require("../../db");

const getAllProducts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  try {
    const totalCount = await Products.count(); 

    if (endIndex < totalCount) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }

    results.results = await Products.findAll({
      offset: startIndex,
      limit: limit
    });

    res.paginatedResults = results;
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getAllProducts,
};