const { Router } = require('express');

const router = Router();

router.get('users', (req, res) => {
  return res.status(200).json({
    data: 'This is users route!',
  });
});

module.exports = router;
