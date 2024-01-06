class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // search operation
    search() {
        const keyword = this.queryStr.keyword ? {
            title: {
                $regex: this.queryStr.keyword,
                $options: "i"
            },
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }


    // filter operation for category and author
    filter() {
        const queryCopy = {...this.queryStr};

        // Removing some fields for category and author
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach(key => delete queryCopy[key]);

        this.query = this.query.find(queryCopy);
        return this;
    }


    // Pagination operation
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default ApiFeatures;