"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await Activity_1.Activity.find().sort({ activityDate: -1 });
    res.json({
        resource: 'activities',
        data: activities,
    });
});
exports.default = router;
