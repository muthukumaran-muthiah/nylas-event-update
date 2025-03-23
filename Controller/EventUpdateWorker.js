
const { default: Nylas } = require("nylas");

const grand = process.env.GRAND;
const apiKey = process.env.API_KEY;
const apiURL = "https://api.us.nylas.com";
const calendarId = process.env.CALENDAR_ID;


const NylasConfig = {
    apiKey: apiKey,
    apiUri: apiURL
}

const nylas = new Nylas(NylasConfig)

const eventUpdateWorker = {
    updateEvent: async (start,end,eventId) => {
        nylas.events.update({
            identifier: grand,
            eventId: eventId,
            requestBody: {
              when: {
                startTime: start,
                endTime: end,
              },
            },
            queryParams: {
              calendarId: calendarId,
            },
          })
          .then(event => {
            console.log(event);
          })
          .catch(err => {
            console.log(
                {
                    start: start,
                    end: end,
                    eventId: eventId
                }
            );
            
            console.log(err);
          })

    },
}

module.exports = eventUpdateWorker;
