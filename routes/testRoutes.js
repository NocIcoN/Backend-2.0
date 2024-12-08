const express = require('express');
const router = express.Router();
const { getAllTests, getTestById, createTest, updateTest, deleteTest } = require('../controllers/testController');
const { protect, admin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/tests:
 *   get:
 *     summary: Mendapatkan daftar semua tes
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: Daftar tes berhasil didapatkan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 */

// Get all tests
router.get('/', protect, getAllTests);

/**
 * @swagger
 * /api/tests/{id}:
 *   get:
 *     summary: Mendapatkan detail tes berdasarkan ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID tes
 *     responses:
 *       200:
 *         description: Detail tes berhasil didapatkan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       404:
 *         description: Tes tidak ditemukan
 */

// Get specific test by ID
router.get('/:id', protect, getTestById);

/**
 * @swagger
 * /api/tests:
 *   post:
 *     summary: Membuat tes baru
 *     tags: [Tests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Test'
 *     responses:
 *       201:
 *         description: Tes berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       400:
 *         description: Bad request
 */

// Create new test
router.post('/', protect, admin, createTest);

/**
 * @swagger
 * /api/tests/{id}:
 *   put:
 *     summary: Memperbarui tes berdasarkan ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID tes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Test'
 *     responses:
 *       200:
 *         description: Tes berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       404:
 *         description: Tes tidak ditemukan
 *       400:
 *         description: Bad request
 */

// Update test
router.put('/:id', protect, admin, updateTest);

/**
 * @swagger
 * /api/tests/{id}:
 *   delete:
 *     summary: Menghapus tes berdasarkan ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID tes
 *     responses:
 *       200:
 *         description: Tes berhasil dihapus
 *       404:
 *         description: Tes tidak ditemukan
 */

// Delete test
router.delete('/:id', protect, admin, deleteTest);

// Route to take test (user only)
router.post('/take', protect, async (req, res) => {
    try {
        const { userId, testId, answers } = req.body;

        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }

        // Perform grading and response handling here...

        res.status(200).json({ success: true, message: 'Test submitted successfully' });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to take test',
            error: error.message
        });
    }
});


/**
 * @swagger
 * components:
 *   schemas:
 *     Test:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - date
 *         - totalQuestions
 *         - passingScore
 *       properties:
 *         id:
 *           type: string
 *           description: ID otomatis yang dihasilkan untuk tes
 *         title:
 *           type: string
 *           description: Judul dari tes
 *         description:
 *           type: string
 *           description: Deskripsi tes
 *         date:
 *           type: string
 *           format: date
 *           description: Tanggal pelaksanaan tes
 *         totalQuestions:
 *           type: number
 *           description: Jumlah soal dalam tes
 *         passingScore:
 *           type: number
 *           description: Nilai minimum untuk lulus tes
 *         questions:
 *           type: array
 *           description: Daftar soal-soal pilihan ganda
 *           items:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *                 description: Teks dari pertanyaan
 *               choices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     option:
 *                       type: string
 *                       description: Pilihan jawaban
 *                     isCorrect:
 *                       type: boolean
 *                       description: Menandakan apakah pilihan jawaban ini benar atau salah
 *               points:
 *                 type: number
 *                 description: Poin yang diberikan untuk jawaban benar
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Tanggal pembuatan tes
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Tanggal terakhir pembaruan tes
 *       example:
 *         id: 63456789abcd1234567890ab
 *         title: TOEFL Test
 *         description: A comprehensive TOEFL exam
 *         date: 2024-10-15
 *         totalQuestions: 50
 *         passingScore: 70
 *         questions:
 *           - questionText: "Apa ibukota Jepang?"
 *             choices:
 *               - option: "Tokyo"
 *                 isCorrect: true
 *               - option: "Osaka"
 *                 isCorrect: false
 *               - option: "Kyoto"
 *                 isCorrect: false
 *               - option: "Nagoya"
 *                 isCorrect: false
 *             points: 10
 *         createdAt: 2024-10-01T08:00:00.000Z
 *         updatedAt: 2024-10-05T10:00:00.000Z
 */

module.exports = router;
