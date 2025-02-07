const express = require('express');
const router = express.Router();
const {
    createBadge,
    getBadges,
    getBadgeById,
    getUserBadges,
    updateBadge,
    deleteBadge,
    checkAndAwardBadges,
} = require('../controllers/badgeController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/')
    .post(protect, admin, createBadge)
    .get(protect, getBadges);

router.route('/user')
    .get(protect, getUserBadges);

router.route('/check')
    .post(protect, checkAndAwardBadges);

router.route('/:id')
    .get(protect, getBadgeById)
    .put(protect, admin, updateBadge)
    .delete(protect, admin, deleteBadge);

module.exports = router;
