const { Router } = require('express');

const router = Router();

router.post('join', (req, res) => {
  return res.status(200).json({
    data: 'This is join route!',
  });
});

module.exports = router;
