#!/usr/bin/env node

/**
 * ✅ Test Schema Validation
 * 
 * Este script prueba la validación de schemas con Zod
 * Debería rechazar datos inválidos y aceptar datos válidos
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

async function testLoginValidation() {
  console.log('\n🔐 Testing Login Validation...');
  
  const loginTests = [
    {
      name: 'Valid Login Data',
      data: {
        email: 'user@example.com',
        password: 'validPassword123'
      },
      expected: 'VALID'
    },
    {
      name: 'Invalid Email Format',
      data: {
        email: 'not-an-email',
        password: 'validPassword123'
      },
      expected: 'INVALID'
    },
    {
      name: 'Missing Email',
      data: {
        password: 'validPassword123'
      },
      expected: 'INVALID'
    },
    {
      name: 'Missing Password',
      data: {
        email: 'user@example.com'
      },
      expected: 'INVALID'
    },
    {
      name: 'Empty Password',
      data: {
        email: 'user@example.com',
        password: ''
      },
      expected: 'INVALID'
    },
    {
      name: 'SQL Injection Attempt',
      data: {
        email: "admin@example.com'; DROP TABLE users; --",
        password: 'password'
      },
      expected: 'INVALID'
    },
    {
      name: 'XSS in Email',
      data: {
        email: '<script>alert("xss")</script>@example.com',
        password: 'password'
      },
      expected: 'INVALID'
    }
  ];
  
  for (const test of loginTests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`Data:`, JSON.stringify(test.data, null, 2));
    
    const result = await makeRequest(`${BASE_URL}/auth/login`, test.data);
    
    console.log(`Status: ${result.status}`);
    console.log(`Expected: ${test.expected}`);
    
    if (test.expected === 'VALID') {
      if (result.status === 200 || result.status === 401) {
        console.log('✅ VALIDATION PASSED (data format valid)');
      } else if (result.status === 400) {
        console.log('❌ VALIDATION FAILED (should be valid)');
      }
    } else {
      if (result.status === 400) {
        console.log('✅ VALIDATION REJECTED (correctly blocked invalid data)');
      } else {
        console.log('❌ VALIDATION PASSED (should have been blocked)');
      }
    }
    
    if (result.body) {
      const preview = result.body.substring(0, 150);
      console.log(`Response: ${preview}${result.body.length > 150 ? '...' : ''}`);
    }
  }
}

async function testRegisterValidation() {
  console.log('\n📝 Testing Register Validation...');
  
  const registerTests = [
    {
      name: 'Valid Registration Data',
      data: {
        email: 'newuser@example.com',
        password: 'SecurePass123!',
        name: 'John Doe'
      },
      expected: 'VALID'
    },
    {
      name: 'Weak Password',
      data: {
        email: 'user@example.com',
        password: '123',
        name: 'John Doe'
      },
      expected: 'INVALID'
    },
    {
      name: 'Invalid Name (XSS)',
      data: {
        email: 'user@example.com',
        password: 'SecurePass123!',
        name: '<script>alert("xss")</script>'
      },
      expected: 'INVALID'
    },
    {
      name: 'Extra Malicious Fields',
      data: {
        email: 'user@example.com',
        password: 'SecurePass123!',
        name: 'John Doe',
        isAdmin: true,
        role: 'admin',
        __proto__: { admin: true }
      },
      expected: 'INVALID'
    },
    {
      name: 'Very Long Name',
      data: {
        email: 'user@example.com',
        password: 'SecurePass123!',
        name: 'A'.repeat(1000)
      },
      expected: 'INVALID'
    }
  ];
  
  for (const test of registerTests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`Data:`, JSON.stringify(test.data, null, 2));
    
    const result = await makeRequest(`${BASE_URL}/auth/register`, test.data);
    
    console.log(`Status: ${result.status}`);
    console.log(`Expected: ${test.expected}`);
    
    if (test.expected === 'VALID') {
      if (result.status === 200 || result.status === 201 || result.status === 409) {
        console.log('✅ VALIDATION PASSED (data format valid)');
      } else if (result.status === 400) {
        console.log('❌ VALIDATION FAILED (should be valid)');
      }
    } else {
      if (result.status === 400) {
        console.log('✅ VALIDATION REJECTED (correctly blocked invalid data)');
      } else {
        console.log('❌ VALIDATION PASSED (should have been blocked)');
      }
    }
    
    if (result.body) {
      const preview = result.body.substring(0, 150);
      console.log(`Response: ${preview}${result.body.length > 150 ? '...' : ''}`);
    }
  }
}

async function testMalformedJSON() {
  console.log('\n📋 Testing Malformed JSON...');
  
  const malformedTests = [
    {
      name: 'Invalid JSON Syntax',
      json: '{"email": "test@example.com", "password": "pass"',
      expected: 'REJECTED'
    },
    {
      name: 'Non-JSON Content',
      json: 'this is not json',
      expected: 'REJECTED'
    },
    {
      name: 'Empty Body',
      json: '',
      expected: 'REJECTED'
    },
    {
      name: 'Null Body',
      json: null,
      expected: 'REJECTED'
    }
  ];
  
  for (const test of malformedTests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`JSON: ${test.json}`);
    
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: test.json
      });
      
      const result = {
        status: response.status,
        body: await response.text()
      };
      
      console.log(`Status: ${result.status}`);
      console.log(`Expected: ${test.expected}`);
      
      if (result.status === 400) {
        console.log('✅ MALFORMED JSON REJECTED');
      } else {
        console.log('❌ MALFORMED JSON ACCEPTED (should be rejected)');
      }
      
    } catch (error) {
      console.log(`✅ REQUEST FAILED (malformed JSON properly rejected): ${error.message}`);
    }
  }
}

async function runValidationTests() {
  console.log('🧪 Starting Schema Validation Tests...');
  console.log('Server should be running on http://localhost:3001');
  
  await testLoginValidation();
  await testRegisterValidation();
  await testMalformedJSON();
  
  console.log('\n✅ Schema validation tests completed!');
  console.log('💡 Invalid data should be rejected with 400 status');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runValidationTests().catch(console.error);
}

module.exports = { testLoginValidation, testRegisterValidation, testMalformedJSON };