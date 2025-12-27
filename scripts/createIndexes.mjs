// Run this script once to create database indexes
// This will make queries 10-100x faster!

import mongoose from 'mongoose';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config({ path: join(__dirname, '..', '.env') });

// Verify DB_URL is loaded
if (!process.env.DB_URL) {
  console.error('❌ Error: DB_URL environment variable not found in .env file');
  console.error('Please make sure you have a .env file with DB_URL=your_mongodb_connection_string');
  process.exit(1);
}

// Import Disease model after env is loaded
const Disease = (await import('../models/diseaseModel.js')).default;

async function createIndexes() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('Using DB_URL:', process.env.DB_URL.replace(/\/\/.*:.*@/, '//<credentials>@')); // Hide password
    
    await mongoose.connect(process.env.DB_URL);
    console.log('✅ Connected to MongoDB');

    console.log('\n📊 Creating indexes...');

    // 1. Text index on disease name for fast text search
    await Disease.collection.createIndex(
      { 'disease.name': 'text' },
      { 
        name: 'disease_name_text',
        default_language: 'french'
      }
    );
    console.log('✅ Created text index on disease.name');

    // 2. Regular index on specialty for fast filtering
    await Disease.collection.createIndex(
      { 'disease.specialty': 1 },
      { name: 'disease_specialty' }
    );
    console.log('✅ Created index on disease.specialty');

    // 3. Compound index for combined queries (name + specialty)
    await Disease.collection.createIndex(
      { 'disease.specialty': 1, 'disease.name': 1 },
      { name: 'specialty_name_compound' }
    );
    console.log('✅ Created compound index on specialty + name');

    // 4. Optional: Index on Rx if you query medications frequently
    await Disease.collection.createIndex(
      { 'Rx': 1 },
      { name: 'rx_index', sparse: true }
    );
    console.log('✅ Created sparse index on Rx');

    console.log('\n✨ All indexes created successfully!');
    
    // Show all indexes
    const indexes = await Disease.collection.getIndexes();
    console.log('\n📋 Current indexes:');
    Object.keys(indexes).forEach(indexName => {
      console.log(`  - ${indexName}`);
    });

    // Get collection stats using the correct method
    try {
      const db = mongoose.connection.db;
      const stats = await db.command({ collStats: Disease.collection.collectionName });
      console.log(`\n📈 Collection stats:`);
      console.log(`  - Total documents: ${stats.count}`);
      console.log(`  - Total size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  - Index size: ${(stats.totalIndexSize / 1024 / 1024).toFixed(2)} MB`);
    } catch (statsError) {
      // If stats fail, just count documents
      const count = await Disease.countDocuments();
      console.log(`\n📈 Collection stats:`);
      console.log(`  - Total documents: ${count}`);
    }

    await mongoose.connection.close();
    console.log('\n✅ Done! Database connection closed.');
    
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
    process.exit(1);
  }
}

createIndexes();
