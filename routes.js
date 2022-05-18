import express from 'express'
const router= express.Router();
import { accessories_view, 
bags_view,
beauty_view,
house_view,
jewelry_view,
kids_view,
men_view,
shoes_view,
women_view} from './controller.js'

var arr_of_keywords = ['accessories', 'bags',
'beauty',
'house',
'jewelry',
'kids',
'men',
'shoes',
'women']


router.get('/accessories', accessories_view)
router.get('/bags', bags_view)
router.get('/beauty', beauty_view)
router.get('/house',house_view)
router.get('jewelry', jewelry_view)
router.get('/kids', kids_view)
router.get('/men', men_view)
router.get('/shoes', shoes_view)
router.get('/women', women_view)

export default router;



