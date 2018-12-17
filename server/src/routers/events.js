const { Router } = require('express');

const controllers = require('../controllers/events');
const errorWrapper = require('../utils/controllerErrorWrapper');

const router = Router();
const path = '/events';

// GET /events/ (opcional ?search)
router.get('/', errorWrapper(controllers.getEvents));
// GET /events/keys (opcional ?search)
router.get('/keys', errorWrapper(controllers.getEventKeys));
// GET /events/timeline
router.get('/timeline', errorWrapper(controllers.getEventsTimeline));
// GET /events/fetch
router.get('/fetch', errorWrapper(controllers.fetchStaticEvents));
// POST /events/new
router.post('/new', errorWrapper(controllers.insertNewEvent));

module.exports = { router, path };