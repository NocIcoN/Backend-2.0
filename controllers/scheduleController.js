const Schedule = require('../models/scheduleModel');

// Get All Schedules
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create New Schedule (Admin)
exports.createSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.create(req.body);
        res.status(201).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update Schedule (Admin)
exports.updateSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Schedule (Admin)
exports.deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        await schedule.remove();
        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
