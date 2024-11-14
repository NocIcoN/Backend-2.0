const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// const { notFound, errorHandler }  = require('./middleware/errorMiddleware'); 

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const testRoutes = require('./routes/testRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const resultRoutes = require('./routes/resultRoutes');
const reportRoutes = require('./routes/reportRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();
const app = express();

// Middleware for Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Middleware
app.use(express.json());
app.use(cors());
// Error handling middleware
// app.use(notFound);
// app.use(errorHandler);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/api-docs`);
});
