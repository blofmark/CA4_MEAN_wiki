var model = require('./db').WikiModel;

//returns the complete wiki object with that title or undefined
function getWiki(title, callback) {
    model.find({title: title})
        .exec(function (err, data) {
            if (err)
                callback(err);
             else
                callback(null, data);
        });
};

/*returns a list of titles and abstracts of wiki objects that match the searchString.
 * The search must be case insensitive. */
function findWiki(searchString, callback) {
    var r = new regExp(searchString, 'i');
    model.find({title: {$regex: r}}, {abstract: {$regex: r}})
        .exec(function (err, wiki) {
            if(err)
                callback(err);
            else
                callback(null, wiki);
        });

};

// returns a list of all distinct categories.
function getCategories(callback) {
    model.find().distinct('categories')
        .exec(function (err, category) {
            if (err)
                callback(err);
             else
                callback(null, category);
        });
};

//returns a list of title and abstract for wiki objects that has the given category.
function getWikisWithCategory(category, callback) {
    model.find({categories: category}).select('title abstract')
        .exec(function (err, wikis) {
            if (err)
                callback(err);
            else
                callback(null, wikis);
        });
};

module.exports = {
    getWiki: getWiki,
    findWiki: findWiki,
    getCategories: getCategories,
    getWikisWithCategory: getWikisWithCategory
};

