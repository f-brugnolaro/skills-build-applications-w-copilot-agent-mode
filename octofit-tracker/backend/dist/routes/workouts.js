"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await Workout_1.Workout.find().sort({ focus: 1, title: 1 });
    res.json({
        resource: 'workouts',
        data: workouts,
    });
});
exports.default = router;
