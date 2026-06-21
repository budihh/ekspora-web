import { db } from '../src/db/index';
import { getAdminProducts } from '../src/app/actions/admin';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function test() {
  try {
    const products = await getAdminProducts();
    console.log('Success! Found', products.length, 'products');
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
