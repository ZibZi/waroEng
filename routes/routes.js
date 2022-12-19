var express = require('express');
var router = express.Router();

// database module
var database = require('../config/database');
var RunQuery = database.RunQuery;

/* Route Home page. */
router.all('/', function (req, res, next) {
    var sqlStr = '\
        SELECT *\
        FROM waroeng.categories';

    RunQuery(sqlStr, function (categories) {
        sqlStr = '\
            SELECT waroeng.products.*, waroeng.categories.CategoryName, waroeng.categories.CategorySlug\
            FROM waroeng.products\
            INNER JOIN waroeng.categories\
            ON waroeng.products.CategoryID = waroeng.categories.CategoryID\
            WHERE Feature = 1';

        RunQuery(sqlStr, function (products) {
            var contextDict = {
                currentUrl: '/',
                title: 'Home',
                categories: categories,
                featProducts: products,
                customer: req.user
            };

            //isLoggedIn(req, contextDict);
            res.render('index', contextDict);
        });
    });
});

/* Route Category page. */
router.route('/cat/')
    .all(function (req, res, next) {
        var sqlStr = '\
        SELECT *\
        FROM waroeng.categories';

        RunQuery(sqlStr, function (categories) {
            var contextDict = {
                currentUrl: '/cat',
                title: 'Categories',
                categories: categories,
                customer: req.user
            };

            res.render('categories', contextDict);
        });
    });

/* Route Category Products page. */
router.route('/cat/:catSlug')
    .all(function (req, res, next) {
        if (req.params.catSlug == "all") {
            var selectQuery = '\
                SELECT waroeng.products.*, waroeng.categories.CategoryName, waroeng.categories.CategorySlug\
                FROM waroeng.products\
                INNER JOIN waroeng.categories\
                ON waroeng.products.CategoryID = waroeng.categories.CategoryID';

            RunQuery(selectQuery, function (products) {

                selectQuery = '\
                SELECT *\
                FROM waroeng.categories';

                RunQuery(selectQuery, function (categories) {

                    var contextDict = {
                        title: 'All products',
                        products: products,
                        categories: categories,
                        customer: req.user
                    };

                    res.render('categoryProducts', contextDict);
                });
            });
        }
        else {
            var sqlStr = '\
                SELECT waroeng.products.*, waroeng.categories.CategoryName, waroeng.categories.CategorySlug\
                FROM waroeng.products\
                INNER JOIN waroeng.categories\
                ON waroeng.products.CategoryID = waroeng.categories.CategoryID\
                WHERE waroeng.categories.CategorySlug = \'' + req.params.catSlug + '\'';

            RunQuery(sqlStr, function (products) {

                sqlStr = '\
                SELECT *\
                FROM waroeng.categories';

                RunQuery(sqlStr, function (categories) {

                    var contextDict = {
                        title: products[0].CategoryName,
                        products: products,
                        categories: categories,
                        customer: req.user
                    };

                    res.render('categoryProducts', contextDict);
                });
            });
        }
    });

/* Route Product page. */
router.route('/cat/:catSlug/:prodSlug')
    .all(function (req, res, next) {
        var sqlStr = '\
        SELECT *\
        FROM waroeng.products\
        WHERE ProductSlug = \'' + req.params.prodSlug + '\'';

        RunQuery(sqlStr, function (product) {

            var contextDict = {
                title: product[0].ProductName,
                product: product[0],
                customer: req.user
            };

            res.render('productDetail', contextDict);
        });
    });

router.route('/subscribe')
    .post(function (req, res, next) {
        var sqlStr = '\
        INSERT INTO waroeng.subscribers\
        VALUES (\'' + req.body.email + '\')';

        RunQuery(sqlStr, function (result) {
            res.redirect('/');
        });
    });

/* Route Login page.
 router.route('/login/')
 .get (function (req, res, next) {
 var contextDict = {
 title: 'Login'
 };
 res.render('login', contextDict);
 });

 .post(function (req, res, next) {
 //read inputs
 //validate inputs
 //redirect to account info page
 var contextDict = {
 title: '',
 signInError: req.flash('loginError')
 };
 res.render('template', contextDict);
 });
 */

module.exports = router;
