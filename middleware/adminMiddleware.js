const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Akses ditolak. Anda bukan admin.' });
    }
  };
  
  module.exports = admin;
  