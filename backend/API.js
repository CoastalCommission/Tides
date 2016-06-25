(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        parser      = require('body-parser'),
        port        = '3040',
        hostIP      = 'localhost',
        winston     = require('winston'),
        sqlite      = require('sqlite3').verbose(),
        trans       = require('sqlite3-transactions').TransactionDatabase,
        tidesDB     = new trans(new sqlite.Database('tides.db')),
        tidesAPI    = express();

    // http://enable-cors.org/server_expressjs.html
    tidesAPI.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', 'content-Type,X-Requested-With');
        next();
    });

    // middleware
    tidesAPI.use(parser.json());
    tidesAPI.use(parser.urlencoded({
    	extended: true
    }));

    tidesAPI.use(express.static(__dirname + '/public'));

    // logging
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),

            new (winston.transports.File)({
                name: 'info-file',
                filename: './public/logs/info.log',
                level: 'info'
            }),

            new (winston.transports.File)({
                name: 'error-file',
                filename: './public/logs/error.log',
                level: 'error'
            })
        ]
    });

    // Database initialization
    tidesDB.get("SELECT name " +
                "FROM sqlite_master " +
                "WHERE type = 'table' " +
                "AND name   = 'users' " +
                "AND name   = 'agendas_tbl' " +
                "OR name    = 'status_tbl' " +
                "OR name    = 'month_names_tbl' " +
                "OR name    = 'hearing_dates_tbl' " +
                "OR name    = 'day_names_tbl' " +
                "OR name    = 'districts_tbl' " +
                "OR name    = 'categories_tbl' " +
                "OR name    = 'items_tbl' " +
                "OR name    = 'results_tbl'",
        function(err, rows) {
            if(err !== null) {
                logger.info(err);
            } else if(rows === undefined) {
                tidesDB.run('CREATE TABLE "users_tbl" ' +
                            '("id"       INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                            '"username"  VARCHAR(255), ' +
                            '"password"  VARCHAR(255), ' +
                            '"canAccess" VARCHAR(255), ' +
                            '"color"     VARCHAR(255))',
                            function(err) {
                                if(err !== null) {
                                    logger.error(err);
                                } else {
                                    logger.info("tides.users_tbl initialized.");
                                }
                            });

                tidesDB.run('CREATE TABLE "agendas_tbl" ' +
                            '("id"              INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                            '"year"             INTEGER, ' +
                            '"venue_name"       VARCHAR(255), ' +
                            '"venue_address_1"  VARCHAR(255), ' +
                            '"venue_address_2"  VARCHAR(255), ' +
                            '"venue_city"       VARCHAR(255), ' +
                            '"venue_state"      VARCHAR(255), ' +
                            '"venue_zip"        INTEGER, ' +
                            '"venue_latitude"   INTEGER, ' +
                            '"venue_longitude"  INTEGER, ' +
                            '"phone_number"     INTEGER, ' +
                            '"district_id"      INTEGER, ' +
                            '"month_id"         INTEGER, ' +
                            '"status_id"        INTEGER)',
                            function(err) {
                                if(err !== null) {
                                    logger.error(err);
                                } else {
                                    logger.info("tides.agendas_tbl initialized.");
                                }
                            });

                tidesDB.run('CREATE TABLE "status_tbl" ' +
                            '("id"  INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                            '"name" VARCHAR(255))',
                            function(err) {
                                if(err !== null) {
                                    logger.error(err);
                                } else {
                                    logger.info("tides.status_tbl initialized.");
                                }
                            });

                tidesDB.run('CREATE TABLE "month_names_tbl" ' +
                            '("id"          INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                            '"name_english" VARCHAR(255), ' +
                            '"name_spanish" VARCHAR(255))',
                            function(err) {
                                if(err !== null) {
                                    logger.error(err);
                                } else {
                                    logger.info("tides.month_names_tbl initialized.");
                                }
                            });

                tidesDB.run('CREATE TABLE "hearing_dates_tbl" ' +
                            '("id"        INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                            '"date"       VARCHAR(255), ' +
                            '"start_time" VARCHAR(255), ' +
                            '"agenda_id"  INTEGER, ' +
                            '"day_id"     INTEGER)',
                            function(err) {
                                if(err !== null) {
                                    logger.error(err);
                                } else {
                                    logger.info("tides.hearing_dates_tbl initialized.");
                                }
                            });

                tidesDB.run('CREATE TABLE "day_names_tbl" ' +
                            '("id"          INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                            '"name_english" VARCHAR(255), ' +
                            '"name_spanish" VARCHAR(255))',
                            function(err) {
                                if(err !== null) {
                                    logger.error(err);
                                } else {
                                    logger.info("tides.day_names_tbl initialized.");
                                }
                            });

                tidesDB.run('CREATE TABLE "districts_tbl" ' +
                            '("id"          INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                            '"name_english" VARCHAR(255), ' +
                            '"name_spanish" VARCHAR(255))',
                            function(err) {
                                if(err !== null) {
                                    logger.error(err);
                                } else {
                                    logger.info("tides.districts_tbl initialized.");
                                }
                            });

                tidesDB.run('CREATE TABLE "categories_tbl" ' +
                            '("id"                 INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                            '"name_english"        VARCHAR(255), ' +
                            '"name_spanish"        VARCHAR(255), ' +
                            '"description_english" VARCHAR(255), ' +
                            '"description_spanish" VARCHAR(255))',
                            function(err) {
                                if(err !== null) {
                                    logger.error(err);
                                } else {
                                    logger.info("tides.categories_tbl initialized.");
                                }
                            });

                tidesDB.run('CREATE TABLE "items_tbl" ' +
                            '("id"                 INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                            '"cdms_record_id"      INTEGER, ' +
                            '"item_number"         INTEGER, ' +
                            '"title_english"       VARCHAR(255), ' +
                            '"title_spanish"       VARCHAR(255), ' +
                            '"description_english" VARCHAR(255), ' +
                            '"description_spanish" VARCHAR(255), ' +
                            '"author"              VARCHAR(255), ' +
                            '"duration"            INTEGER, ' +
                            '"staff_report_url"    VARCHAR(255), ' +
                            '"correspondence_url"  VARCHAR(255), ' +
                            '"ex_parte_url"        VARCHAR(255), ' +
                            '"addenda_url"         VARCHAR(255), ' +
                            '"last_edited_date"    VARCHAR(255), ' +
                            '"last_edited_user_id" INTEGER, ' +
                            '"hearing_date_id"     INTEGER, ' +
                            '"district_id"         INTEGER, ' +
                            '"category_id"         INTEGER, ' +
                            '"result_id"           INTEGER)',
                            function(err) {
                                if(err !== null) {
                                    logger.error(err);
                                } else {
                                    logger.info("tides.items_tbl initialized.");
                                }
                            });

                tidesDB.run('CREATE TABLE "results_tbl" ' +
                            '("id"          INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                            '"name_english" VARCHAR(255), ' +
                            '"name_spanish" VARCHAR(255))',
                            function(err) {
                                if(err !== null) {
                                    logger.error(err);
                                } else {
                                    logger.info("tides.results_tbl initialized.");
                                }
                            });
            } else {
                logger.info("Tides DB is Online");
            }
        });


    router
        .get('/', function (req, res) {
            res.sendFile(__dirname + '/public/' + 'index.html');
        })


        .get('/bootstrap', function(req, res, next) {
            tidesDB.beginTransaction(function(err, trans) {
                trans.run("INSERT INTO 'users_tbl' (username," +
                                                   "password) " +
                          "VALUES('zach', " +
                                 "'IMustNotTellLies')");

                trans.run("INSERT INTO 'users_tbl' (username," +
                                                   "password) " +
                           "VALUES('afrankel', " +
                                  "'publiceducation')");

                trans.commit(function(err) {
                    if(err) {
                        logger.error('/bootstrap', err);
                    } else {
                        logger.info('/bootstrap');
                        res.send({
                            'added': true,
                            'feedback': 'DB has been bootstrapped'
                        });
                    }
                });
            });
        })


        .post('/login', function(req, res, next) {
            var sql = 'SELECT * ' +
                      'FROM users_tbl ' +
                      'WHERE username = "' + req.body.username + '" ' +
                      'AND password = "' + req.body.password + '"';

            tidesDB.all(sql, function(err, resultSetData) {
                if(err !== null) {
                    logger.error('/login', err);
                } else {
                    logger.info('/login');

                    if(resultSetData[0] &&
                       resultSetData[0].username === req.body.username &&
                       resultSetData[0].password === req.body.password) {
                        res.send({
                            'id': resultSetData[0].id,
                            'username': resultSetData[0].username,
                            'authenticated': true,
                            'feedback': 'You\'re In',
                            'microservices': []
                        });
                    } else {
                        res.send({
                            'authenticated': false,
                            'feedback' : 'Username and or Password are incorrect'
                        });
                    }
                }
            });
        })


        .post('/add/users', function(req, res, next) {
            var username   = req.body.username,
                password   = req.body.password;

            tidesDB.beginTransaction(function(err, trans) {
                trans.run("INSERT INTO 'users_tbl' (username," +
                                                "password) " +
                          "VALUES('" + username + "', '" +
                                       password + "')");

                trans.commit(function(err) {
                    if(err) {
                        logger.error('/add/users/', err);
                    } else {
                        logger.info('/add/users/');
                        res.send({
                            'added': true,
                            'feedback': 'New User Created'
                        });
                    }
                });
            });
        })


        .get('/get/users', function (req, res, next) {
            var sql = 'SELECT * ' +
                      'FROM users_tbl';

            tidesDB.all(sql, function(err, resultSetData) {
                if(err !== null) {
                    logger.error('/get/users', err);
                } else {
                    logger.info('/get/users');
                    res.send(resultSetData);
                }
            });
        })


        .get('/get/status', function (req, res, next) {
            var sql = 'SELECT * ' +
                      'FROM status_tbl';

            tidesDB.all(sql, function(err, resultSetData) {
                if(err !== null) {
                    logger.error('/get/status', err);
                } else {
                    logger.info('/get/status');
                    res.send(resultSetData);
                }
            });
        })


        .get('/get/months', function (req, res, next) {
            var sql = 'SELECT * ' +
                      'FROM month_names_tbl';

            tidesDB.all(sql, function(err, resultSetData) {
                if(err !== null) {
                    logger.error('/get/months', err);
                } else {
                    logger.info('/get/months');
                    res.send(resultSetData);
                }
            });
        })


        .get('/get/days', function (req, res, next) {
            var sql = 'SELECT * ' +
                      'FROM day_names_tbl';

            tidesDB.all(sql, function(err, resultSetData) {
                if(err !== null) {
                    logger.error('/get/days', err);
                } else {
                    logger.info('/get/days');
                    res.send(resultSetData);
                }
            });
        })


        .get('/get/districts', function (req, res, next) {
            var sql = 'SELECT * ' +
                      'FROM districts_tbl';

            tidesDB.all(sql, function(err, resultSetData) {
                if(err !== null) {
                    logger.error('/get/districts', err);
                } else {
                    logger.info('/get/districts');
                    res.send(resultSetData);
                }
            });
        })


        .get('/get/categories', function (req, res, next) {
            var sql = 'SELECT * ' +
                      'FROM categories_tbl';

            tidesDB.all(sql, function(err, resultSetData) {
                if(err !== null) {
                    logger.error('/get/categories', err);
                } else {
                    logger.info('/get/categories');
                    res.send(resultSetData);
                }
            });
        })


        .get('/get/items', function (req, res, next) {
            var sql = 'SELECT * ' +
                      'FROM items_tbl';

            tidesDB.all(sql, function(err, resultSetData) {
                if(err !== null) {
                    logger.error('/get/items', err);
                } else {
                    logger.info('/get/items');
                    res.send(resultSetData);
                }
            });
        })


        .get('/get/results', function (req, res, next) {
            var sql = 'SELECT * ' +
                      'FROM results_tbl';

            tidesDB.all(sql, function(err, resultSetData) {
                if(err !== null) {
                    logger.error('/get/results', err);
                } else {
                    logger.info('/get/results');
                    res.send(resultSetData);
                }
            });
        })


        .get('/get/agendas', function (req, res, next) {
            var sql = 'SELECT * ' +
                      'FROM agendas_tbl ' +
                      'INNER JOIN month_names_tbl ' +
                      'ON month_names_tbl.id = agendas_tbl.month_id';

            tidesDB.all(sql, function(err, resultSetData) {
                if(err !== null) {
                    logger.error('/get/agendas', err);
                } else {
                    logger.info('/get/agendas');
                    res.send(resultSetData);
                }
            });
        })


        .post('/add/agendas', function(req, res, next) {
            var year            = req.body.year,
                venue_name      = req.body.venue_name,
                venue_address_1 = req.body.venue_address_1,
                venue_address_2 = req.body.venueAddress2,
                venue_city      = req.body.venue_city,
                venue_state     = req.body.venue_state,
                venue_zip       = req.body.venue_zip,
                venue_latitude  = req.body.venue_latitude,
                venue_longitude = req.body.venue_longitude,
                phone_number    = req.body.phone_number,
                district_id     = req.body.district_id,
                month_id        = req.body.month_id,
                status_id       = req.body.status_id;

            tidesDB.beginTransaction(function(err, trans) {
                var sql = "INSERT INTO 'agendas_tbl' (year, " +
                                                     "venue_name, " +
                                                     "venue_address_1, " +
                                                     "venue_address_2, " +
                                                     "venue_city, " +
                                                     "venue_state, " +
                                                     "venue_zip, " +
                                                     "venue_latitude, " +
                                                     "venue_longitude, " +
                                                     "phone_number, " +
                                                     "district_id, " +
                                                     "month_id, " +
                                                     "status_id) " +
                          "VALUES(" + year            + ", '" +
                                      venue_name      + "', '" +
                                      venue_address_1 + "', '" +
                                      venue_address_2 + "', '" +
                                      venue_city      + "', '" +
                                      venue_state     + "', '" +
                                      venue_zip       + "', '" +
                                      venue_latitude  + "', '" +
                                      venue_longitude + "', '" +
                                      phone_number    + "', '" +
                                      district_id     + "', '" +
                                      month_id        + "', '" +
                                      status_id       + "')";

                console.log(sql);

                trans.run(sql);

                trans.commit(function(err) {
                    if(err) {
                        logger.error('/add/agendas/', err);
                    } else {
                        logger.info('/add/agendas/');
                    }
                });
            });
        })


        .get('/delete/agendas/where/id/:id', function(req, res, next) {
            tidesDB.beginTransaction(function(err, trans) {
                trans.run('DELETE FROM agendas ' +
                          'WHERE id = ' + req.params.id);

                trans.commit(function(err) {
                    if(err) {
                        logger.error('/delete/agendas/where/id/' + req.params.id, err);
                    } else {
                        logger.info('/delete/agendas/where/id/' + req.params.id);
                    }
                });
            });
        })


        .post('/update/microservices/where/id/:id', function(req, res, next) {
            var year           = req.body.year,
                venueName      = req.body.venueName,
                venueAddress1  = req.body.venueAddress1,
                venueAddress2  = req.body.venueAddress2,
                venueCity      = req.body.venueCity,
                venueState     = req.body.venueState,
                venueZip       = req.body.venueZip,
                venueLatitude  = req.body.venueLatitude,
                venueLongitude = req.body.venueLongitude,
                phoneNumber    = req.body.phoneNumber,
                districtID     = req.body.districtID,
                monthID        = req.body.monthID,
                statusID       = req.body.statusID;

            tidesDB.beginTransaction(function(err, trans) {
                trans.run('UPDATE agendas_tbl ' +
                          'SET year           = "' + year     + '", ' +
                              'venueName      = "' + venueName   + '", ' +
                              'venueAddress1  = "' + venueAddress1 + '", ' +
                              'venueAddress2  = "' + venueAddress2 + '", ' +
                              'venueCity      = "' + venueCity     + '", ' +
                              'venueState     = "' + venueState     + '" ' +
                              'venueZip       = "' + venueZip     + '" ' +
                              'venueLatitude  = "' + venueLatitude     + '" ' +
                              'venueLongitude = "' + venueLongitude     + '" ' +
                              'phoneNumber    = "' + phoneNumber     + '" ' +
                              'districtID     = "' + districtID     + '" ' +
                              'monthID        = "' + monthID     + '" ' +
                              'statusID       = "' + statusID     + '" ' +
                          'WHERE id = ' + id);

                trans.commit(function(err) {
                    if(err) {
                        logger.error('/update/agendas/where/id/' + id, err);
                    } else {
                        logger.info('/update/agendas/where/id/' + id);
                    }
                });
            })
        });


    tidesAPI.use(router);
    tidesAPI.listen(port, hostIP, function() {
        logger.info('tides API is awake @ http://' + hostIP + ':' + port);
    });
})();
