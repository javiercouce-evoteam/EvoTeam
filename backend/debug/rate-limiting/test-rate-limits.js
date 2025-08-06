#!/usr/bin/env node

/**
 * 🚦 Test Rate Limiting
 * 
 * Este script prueba los diferentes rate limits implementados:
 * - Global: 100 requests/15min
 * - Auth: 5 requests/15min  
 * - Strict: 3 requests/15min
 */

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'http://localhost:3001/api';

async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    return {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: await response.text()
    };
  } catch (error) {
    return { error: error.message };
  }
}

async function testGlobalRateLimit() {
  console.log('\n🌍 Testing Global Rate Limit (100 requests/15min)...');
  
  for (let i = 1; i <= 10; i++) {
    const result = await makeRequest(`${BASE_URL}/health`);
    console.log(`Request ${i}: Status ${result.status} - ${result.headers['x-ratelimit-remaining'] || 'N/A'} remaining`);
    
    if (result.status === 429) {
      console.log('❌ RATE LIMITED (Expected after many requests)');
      break;
    }
  }
}

async function testAuthRateLimit() {
  console.log('\n🔐 Testing Auth Rate Limit (5 requests/15min)...');
  
  const authData = {
    email: 'test@example.com',
    password: 'password123'
  };
  
  for (let i = 1; i <= 7; i++) {
    const result = await makeRequest(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(authData)
    });
    
    console.log(`Auth Request ${i}: Status ${result.status} - ${result.headers['x-ratelimit-remaining'] || 'N/A'} remaining`);
    
    if (result.status === 429) {
      console.log('❌ RATE LIMITED (Expected after 5 requests)');
      break;
    }
  }
}

async function testStrictRateLimit() {
  console.log('\n⚡ Testing Strict Rate Limit (3 requests/15min)...');
  console.log('Note: This would need a strict endpoint to test properly');
  console.log('For now, testing with auth endpoint which has stricter limits');
}

async function runAllTests() {
  console.log('🧪 Starting Rate Limiting Tests...');
  console.log('Server should be running on http://localhost:3001');
  
  await testGlobalRateLimit();
  await testAuthRateLimit();
  await testStrictRateLimit();
  
  console.log('\n✅ Rate limiting tests completed!');
  console.log('💡 Tip: Wait 15 minutes and run again to reset limits');
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests().catch(console.error);
}

export { testGlobalRateLimit, testAuthRateLimit, testStrictRateLimit };