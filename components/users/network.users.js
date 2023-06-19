const express       = require('express');
const router        = express.Router();


router.get('/',(req,res)=>{
    res.send('users get desde network')
})
router.post('/',(req,res)=>{
    res.send('users post desde network')
})

module.exports = router;