const SincSportsService = require('sincsports-service');

exports.handler = (event, context, callback) => {
    const season = event.season || 'fall';
    const year = event.year || '2017';
    const division = event.division || 'U13F02';

    try {
        SincSportsService.getTeams(season, year, division)
            .then((teams) => {
                callback(null, teams);
            })
            .catch((err) => {
                callback(err);
            });

    } catch(err) {
        callback(err);
    }
};

