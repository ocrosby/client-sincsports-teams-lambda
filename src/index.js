const SincSportsService = require('sincsports-service');
const Helpers = require('lambda-helpers');

exports.handler = (event, context, callback) => {
    const responder = Helpers.GatewayResponder.Create(callback);

    let season;
    let year;
    let division;

    try {
        console.log(`Received event:\n${JSON.stringify(event, null, 2)}`);
        console.log(`context: ${JSON.stringify(context, null, 2)}`);
        console.log(`pathParameters: ${JSON.stringify(event.pathParameters, null, 2)}`);

        season = event.pathParameters.season;
        year = event.pathParameters.year;
        division = event.pathParameters.division;

        console.log(`season = ${season}`);
        console.log(`year = ${year}`);
        console.log(`division = ${division}`);

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

