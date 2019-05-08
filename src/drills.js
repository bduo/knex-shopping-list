require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

console.log('connection successful');

// searchByTerm('trick');

const paginateProducts = (page) => {
  const productsPerPage = 6;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select('id', 'name', 'price', 'category', 'date_added', 'checked')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}

// paginateProducts(2)


const getItemsAfterDate = (daysAgo) => {
  knexInstance
    .select()
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .from('shopping_list')
    .then(result => {
      console.log(result)
    })
}

// getItemsAfterDate(30)

const getTotalCost = () => {
  knexInstance
  .select()
  .from('shopping_list')
  .groupBy('category')
  .sum('price')
  .then(results => {
    console.log('Main: ', results[0]);
    console.log('Snack: ', results[1]);
    console.log('Lunch: ', results[2]);
    console.log('Breakfast: ', results[3]);
  });
}

//   .groupBy('Main', 'Snack', 'Lunch', 'Breakfast')


getTotalCost();

