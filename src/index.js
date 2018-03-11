const SincSportsService = require('sincsports-service');
const Helpers = require('lambda-helpers');

exports.handler = (event, context, callback) => {
    const responder = Helpers.GatewayResponder.Create(callback);

    let season;
    let year;
    let division;

    try {
        console.log(`Received event:\n${JSON.stringify(event)}`);

        season = event.pathParameters.season;
        year = event.pathParameters.year;
        division = event.pathParameters.division;

        console.log(`Retrieving SincSports teams in the ${division} division for the ${season} of ${year} ...`);

        SincSportsService.getTeams(season, year, division)
            .then((teams) => {
                responder.success(teams);
            })
            .catch((err) => {
                responder.error(err);
            });

    } catch(err) {
        responder.error(err);
    }
};

