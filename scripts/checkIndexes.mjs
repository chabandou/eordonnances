// Check if database indexes exist
// Run this to verify indexes are properly set up in production

import mongoose from 'mongoose';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '..', '.env') });

if (!process.env.DB_URL) {
  console.error('❌ Error: DB_URL not found in .env file');
  process.exit(1);
}

const Disease = (await import('../models/diseaseModel.js')).default;

async function checkIndexes() {
  try {
    console.log('🔍 Checking database indexes...\n');
    
    await mongoose.connect(process.env.DB_URL);
    console.log('✅ Connected to MongoDB\n');

    const indexes = await Disease.collection.getIndexes();
    
    const requiredIndexes = [
      'disease_name_text',
      'disease_specialty',
      'specialty_name_compound',
      'rx_index'
    ];

    console.log('📋 Current Indexes:');
    Object.keys(indexes).forEach(indexName => {
      const isRequired = requiredIndexes.includes(indexName);
      const icon = isRequired ? '✅' : '📌';
      console.log(`  ${icon} ${indexName}`);
    });

    console.log('\n🎯 Required Indexes Status:');
    const missingIndexes = [];
    
    requiredIndexes.forEach(indexName => {
      if (indexes[indexName]) {
        console.log(`  ✅ ${indexName} - Found`);
      } else {
        console.log(`  ❌ ${indexName} - Missing`);
        missingIndexes.push(indexName);
      }
    });

    if (missingIndexes.length > 0) {
      console.log('\n⚠️  Some indexes are missing!');
      console.log('   Run: npm run create-indexes');
    } else {
      console.log('\n🎉 All required indexes are in place!');
      console.log('   Your database is fully optimized.');
    }

    // Count documents
    const count = await Disease.countDocuments();
    console.log(`\n📊 Total diseases: ${count}`);

    await mongoose.connection.close();
    console.log('\n✅ Check complete. Connection closed.');
    
  } catch (error) {
    console.error('❌ Error checking indexes:', error);
    process.exit(1);
  }
}

checkIndexes();
