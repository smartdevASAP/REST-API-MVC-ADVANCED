const qs = require("qs");
class Apifeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  filter() {
    const parsedQuery = qs.parse(this.queryStr);
    // const parsedQuery = qs.parse(this.queryStr);
    let queryString = JSON.stringify(parsedQuery);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    let queryObj = JSON.parse(queryString);
    console.log(queryObj);
    this.query = this.query.find(queryObj);
    return this;
  }
  sort() {
    //SORTING THE RESULT
    if (this.queryStr.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }
  limitFields() {
    //LIMITING FIELDS;
    if (this.this.query.fields) {
      const fields = req.this.query.fields.split(",").join(" ");
      // console.log(fields);
      this.query = this.query.select(fields);
    }
    return this;
  }
  paginate() {
    //PAGINATION;
    // console.log(req.query);
    const page = this.queryStr.page * 1;
    const limit = this.queryStr.limit * 1;
    //PAGE 1 : 1-10  PAGE 2 : 11-20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    if (this.queryStr.page) {
      const movieCount = movie.countDocuments();
      if (skip >= movieCount) {
        throw new Error("This page is not found");
      }
    }
    return this;
  }
}
module.exports = Apifeatures;
