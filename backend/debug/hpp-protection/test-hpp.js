#!/usr/bin/env node

/**
 * 🔄 Test HPP (HTTP Parameter Pollution) Protection
 * 
 * Este script prueba la protección contra HTTP Parameter Pollution
 * Debería prevenir ataques que usan parámetros duplicados
 */

const BASE_URL = 'http://localhost:3001/api';

async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    return {
      status: response.status,
      body: await response.text(),
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    return { error: error.message };
  }
}

async function testParameterPollution() {
  console.log('\n🔄 Testing HTTP Parameter Pollution...');
  
  const tests = [
    {
      name: 'Duplicate Query Parameters',
      url: `${BASE_URL}/health?id=1&id=2&id=3`,
      expected: 'PROTECTED'
    },
    {
      name: 'Array-like Parameters',
      url: `${BASE_URL}/health?user[]=admin&user[]=guest&user[]=root`,
      expected: 'PROTECTED'
    },
    {
      name: 'Mixed Parameter Pollution',
      url: `${BASE_URL}/health?action=delete&action=create&target=user&target=admin`,
      expected: 'PROTECTED'
    },
    {
      name: 'Normal Single Parameters',
      url: `${BASE_URL}/health?id=1&name=test&action=view`,
      expected: 'ALLOWED'
    }
  ];
  
  for (const test of tests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`URL: ${test.url}`);
    
    const result = await makeRequest(test.url);
    
    console.log(`Status: ${result.status}`);
    console.log(`Expected: ${test.expected}`);
    
    if (result.status === 200) {
      console.log('✅ REQUEST PROCESSED - HPP protection should have cleaned parameters');
    } else if (result.status === 400) {
      console.log('❌ REQUEST BLOCKED - HPP protection working');
    } else {
      console.log(`❓ UNEXPECTED - Status ${result.status}`);
    }
  }
}

async function testPOSTParameterPollution() {
  console.log('\n📝 Testing POST Parameter Pollution...');
  
  // Simular form data con parámetros duplicados
  const formData = new URLSearchParams();
  formData.append('email', 'user@example.com');
  formData.append('email', 'admin@example.com');
  formData.append('password', 'userpass');
  formData.append('password', 'adminpass');
  formData.append('role', 'user');
  formData.append('role', 'admin');
  
  console.log('🧪 Testing: POST with duplicate form parameters');
  console.log('Form data:', formData.toString());
  
  const result = await makeRequest(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData
  });
  
  console.log(`Status: ${result.status}`);
  console.log('Expected: PROTECTED (HPP should handle duplicate parameters)');
  
  if (result.status === 400) {
    console.log('✅ BLOCKED - HPP protection working for POST data');
  } else {
    console.log('⚠️ PROCESSED - Check if parameters were cleaned');
    console.log(`Response: ${result.body.substring(0, 200)}...`);
  }
}

async function testJSONParameterPollution() {
  console.log('\n📋 Testing JSON with Duplicate Keys...');
  
  // JSON con claves duplicadas (técnicamente inválido pero algunos parsers lo permiten)
  const maliciousJSON = '{"email":"user@example.com","email":"admin@example.com","role":"user","role":"admin"}';
  
  console.log('🧪 Testing: JSON with duplicate keys');
  console.log('JSON:', maliciousJSON);
  
  const result = await makeRequest(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: maliciousJSON
  });
  
  console.log(`Status: ${result.status}`);
  console.log('Expected: PROTECTED (JSON parser should handle this)');
  
  if (result.status === 400) {
    console.log('✅ BLOCKED - Invalid JSON rejected');
  } else {
    console.log('⚠️ PROCESSED - Check which values were used');
    console.log(`Response: ${result.body.substring(0, 200)}...`);
  }
}

async function runHPPTests() {
  console.log('🧪 Starting HPP Protection Tests...');
  console.log('Server should be running on http://localhost:3001');
  
  await testParameterPollution();
  await testPOSTParameterPollution();
  await testJSONParameterPollution();
  
  console.log('\n✅ HPP protection tests completed!');
  console.log('💡 Duplicate parameters should be cleaned or blocked');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runHPPTests().catch(console.error);
}

module.exports = { testParameterPollution, testPOSTParameterPollution, testJSONParameterPollution };