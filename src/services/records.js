const Model = require('../models/Record');

const fetch = async ({
  startDate, endDate, minCount, maxCount,
}) => {
  const dateQuery = {
    $match: {
      $and: [
        {
          createdAt: {
            $gte: new Date(startDate),
          },
        },
        {
          createdAt: {
            $lte: new Date(endDate),
          },
        },
      ],
    },
  };

  const countQuery = {
    $match: {
      $and: [
        {
          totalCount: {
            $lte: maxCount,
          },
        },
        {
          totalCount: {
            $gte: minCount,
          },
        },
      ],
    },
  };

  const sumQuery = {
      $addFields: {
        totalCount: {
          $sum: '$counts',
        },
      },
    }

    const resultQuery = {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: 1,
      },
    }

  const mainQuery = [
    dateQuery,sumQuery,countQuery,resultQuery
  ]
  
  return Model.aggregate(mainQuery);
};

module.exports = {
  fetch
};
