import heroLower_Electrician from './heroLower_Electrician.jpg'
import heroLower_Cook from './heroLower_Cook.jpg'
import heroLower_Priest from './heroLower_Priest.jpg'
import heroLower_Talior from './heroLower_Talior.jpg'
import heroLower_Contractor from './heroLower_Contractor.jpg'
import Category_Labourer from './Category_Labourer.jpg'
import Category_Mechanic from './Category_Mechanic.jpg'
import Category_Tutor from './Category_Tutor.jpg'

export const categoryList = [
    {
        Category: 'Electrician',
        image: heroLower_Electrician,
        URL: 'http://localhost:5000/services/electrician',
        Price: "Rs. 199",
        PriceAdd: 199,
        Travel: 35
    },
    {
        Category: 'Priest',
        image: heroLower_Priest,
        URL: 'http://localhost:5000/services/priest',
        Price: "Rs. 199 per hour",
        PriceAdd: 199,
        Travel: 35
    },
    {
        Category: 'Cook',
        image: heroLower_Cook,
        URL: 'http://localhost:5000/services/cook',
        Price: "Rs.800 per week",
        PriceAdd: 800,
        Travel: 70
    },
    {
        Category: 'Talior',
        image: heroLower_Talior,
        URL: 'http://localhost:5000/services/talior'
    },
    {
        Category: 'Contractor',
        image: heroLower_Contractor,
        URL: 'http://localhost:5000/services/contractor'
    },
    {
        Category: 'Labourer',
        image: Category_Labourer,
        URL: 'http://localhost:5000/services/labourer',
        Price: "Rs.500 per day",
        PriceAdd: 500,
        Travel: 0
    },
    {
        Category: 'Tutor',
        image: Category_Tutor,
        URL: 'http://localhost:5000/services/tutor',
        Price: "Rs.1500 per month",
        PriceAdd: 1500,
        Travel: 0
    },
    {
        Category: 'Mechanic',
        image: Category_Mechanic,
        URL: 'http://localhost:5000/services/mechanic'
    }
]