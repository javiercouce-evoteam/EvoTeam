#!/usr/bin/env node

/**
 * 🌐 Test CORS Protection
 * 
 * Este script prueba la configuración CORS
 * Debería permitir orígenes autorizados y bloquear otros
 */

const BASE_URL = 'http://localhost:3001/api';

async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      method: 'GET',
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

async function testCORSHeaders() {
  console.log('\n🌐 Testing CORS Headers...');
  
  const corsTests = [
    {
      name: 'Allowed Origin (localhost:3000)',
      origin: 'http://localhost:3000',
      expected: 'ALLOWED'
    },
    {
      name: 'Allowed Origin (localhost:3001)',
      origin: 'http://localhost:3001',
      expected: 'ALLOWED'
    },
    {
      name: 'Malicious Origin',
      origin: 'http://malicious-site.com',
      expected: 'BLOCKED'
    },
    {
      name: 'No Origin Header',
      origin: null,
      expected: 'ALLOWED'
    },
    {
      name: 'Invalid Origin Format',
      origin: 'not-a-valid-url',
      expected: 'BLOCKED'
    }
  ];
  
  for (const test of corsTests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`Origin: ${test.origin || 'None'}`);
    
    const headers = {};
    if (test.origin) {
      headers['Origin'] = test.origin;
    }
    
    const result = await makeRequest(`${BASE_URL}/health`, { headers });
    
    console.log(`Status: ${result.status}`);
    console.log(`CORS Headers:`);
    console.log(`  Access-Control-Allow-Origin: ${result.headers['access-control-allow-origin'] || 'Not set'}`);
    console.log(`  Access-Control-Allow-Credentials: ${result.headers['access-control-allow-credentials'] || 'Not set'}`);
    console.log(`Expected: ${test.expected}`);
    
    if (result.headers['access-control-allow-origin']) {
      console.log('✅ CORS headers present');
    } else {
      console.log('❌ CORS headers missing (might be blocked)');
    }
  }
}

async function testPreflightRequest() {
  console.log('\n✈️ Testing CORS Preflight (OPTIONS)...');
  
  const preflightTests = [
    {
      name: 'Valid Preflight Request',
      origin: 'http://localhost:3000',
      method: 'POST',
      headers: 'Content-Type,Authorization',
      expected: 'ALLOWED'
    },
    {
      name: 'Invalid Origin Preflight',
      origin: 'http://evil-site.com',
      method: 'POST',
      headers: 'Content-Type',
      expected: 'BLOCKED'
    },
    {
      name: 'Disallowed Method',
      origin: 'http://localhost:3000',
      method: 'PATCH',
      headers: 'Content-Type',
      expected: 'BLOCKED'
    }
  ];
  
  for (const test of preflightTests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'OPTIONS',
        headers: {
          'Origin': test.origin,
          'Access-Control-Request-Method': test.method,
          'Access-Control-Request-Headers': test.headers
        }
      });
      
      const headers = Object.fromEntries(response.headers.entries());
      
      console.log(`Status: ${response.status}`);
      console.log(`Preflight Headers:`);
      console.log(`  Access-Control-Allow-Origin: ${headers['access-control-allow-origin'] || 'Not set'}`);
      console.log(`  Access-Control-Allow-Methods: ${headers['access-control-allow-methods'] || 'Not set'}`);
      console.log(`  Access-Control-Allow-Headers: ${headers['access-control-allow-headers'] || 'Not set'}`);
      console.log(`Expected: ${test.expected}`);
      
      if (response.status === 200 && headers['access-control-allow-origin']) {
        console.log('✅ PREFLIGHT ALLOWED');
      } else {
        console.log('❌ PREFLIGHT BLOCKED');
      }
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
}

async function testCORSWithCredentials() {
  console.log('\n🔐 Testing CORS with Credentials...');
  
  const result = await makeRequest(`${BASE_URL}/health`, {
    headers: {
      'Origin': 'http://localhost:3000',
      'Cookie': 'session=test123'
    },
    credentials: 'include'
  });
  
  console.log(`Status: ${result.status}`);
  console.log(`Access-Control-Allow-Credentials: ${result.headers['access-control-allow-credentials'] || 'Not set'}`);
  
  if (result.headers['access-control-allow-credentials'] === 'true') {
    console.log('✅ CREDENTIALS ALLOWED');
  } else {
    console.log('❌ CREDENTIALS NOT ALLOWED');
  }
}

async function runCORSTests() {
  console.log('🧪 Starting CORS Protection Tests...');
  console.log('Server should be running on http://localhost:3001');
  
  await testCORSHeaders();
  await testPreflightRequest();
  await testCORSWithCredentials();
  
  console.log('\n✅ CORS protection tests completed!');
  console.log('💡 Only allowed origins should receive CORS headers');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runCORSTests().catch(console.error);
}

module.exports = { testCORSHeaders, testPreflightRequest, testCORSWithCredentials };