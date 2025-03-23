
const fs = require('fs');
const csv = require('csv-parser');


// Import Event Controller
const eventUpdateWorker = require('./Controller/EventUpdateWorker');


fs.createReadStream('data.csv')
    .pipe(csv({ separator: '\t' }))
    .on('data', (data) => {
        console.log(data.start, data.end, data.eventId);
        if (data.start && data.end && data.eventId)
            eventUpdateWorker.updateEvent(parseInt(data.start), parseInt(data.end), data.eventId);
    })
    .on('end', () => {
        console.log("done");

    });
