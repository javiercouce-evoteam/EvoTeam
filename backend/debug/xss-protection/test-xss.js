#!/usr/bin/env node

/**
 * 🛡️ Test XSS Protection
 * 
 * Este script prueba la protección contra ataques XSS
 * Debería sanitizar o rechazar contenido malicioso
 */

const BASE_URL = 'http://localhost:3001/api';

async function makeRequest(url, data, method = 'POST') {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    return {
      status: response.status,
      body: await response.text(),
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    return { error: error.message };
  }
}

async function testXSSPayloads() {
  console.log('\n🛡️ Testing XSS Protection...');
  
  const xssPayloads = [
    {
      name: 'Basic Script Tag',
      payload: '<script>alert("XSS")</script>',
      expected: 'SANITIZED'
    },
    {
      name: 'Event Handler',
      payload: '<img src="x" onerror="alert(1)">',
      expected: 'SANITIZED'
    },
    {
      name: 'JavaScript URL',
      payload: 'javascript:alert("XSS")',
      expected: 'SANITIZED'
    },
    {
      name: 'SVG with Script',
      payload: '<svg onload="alert(1)">',
      expected: 'SANITIZED'
    },
    {
      name: 'Data URL with Script',
      payload: 'data:text/html,<script>alert(1)</script>',
      expected: 'SANITIZED'
    },
    {
      name: 'Normal Text',
      payload: 'This is normal text',
      expected: 'ALLOWED'
    }
  ];
  
  for (const test of xssPayloads) {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`Payload: ${test.payload}`);
    
    // Test en registro (que usa validación)
    const result = await makeRequest(`${BASE_URL}/auth/register`, {
      email: 'test@example.com',
      password: 'password123',
      name: test.payload,
      bio: test.payload
    });
    
    console.log(`Status: ${result.status}`);
    console.log(`Expected: ${test.expected}`);
    
    if (result.status === 400) {
      console.log('✅ BLOCKED - XSS payload rejected');
    } else if (result.status === 200) {
      console.log('⚠️ ALLOWED - Check if sanitized in response');
      console.log(`Response: ${result.body.substring(0, 200)}...`);
    } else {
      console.log(`❓ UNEXPECTED - Status ${result.status}`);
    }
  }
}

async function testXSSInHeaders() {
  console.log('\n📋 Testing XSS in Headers...');
  
  try {
    const response = await fetch(`${BASE_URL}/health`, {
      headers: {
        'User-Agent': '<script>alert("XSS")</script>',
        'X-Custom-Header': 'javascript:alert(1)',
        'Referer': '<img src=x onerror=alert(1)>'
      }
    });
    
    console.log(`Status: ${response.status}`);
    console.log('✅ Headers processed (XSS should be handled by helmet)');
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

async function runXSSTests() {
  console.log('🧪 Starting XSS Protection Tests...');
  console.log('Server should be running on http://localhost:3001');
  
  await testXSSPayloads();
  await testXSSInHeaders();
  
  console.log('\n✅ XSS protection tests completed!');
  console.log('💡 All malicious payloads should be sanitized or blocked');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runXSSTests().catch(console.error);
}

module.exports = { testXSSPayloads, testXSSInHeaders };