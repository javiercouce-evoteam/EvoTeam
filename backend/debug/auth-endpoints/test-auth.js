#!/usr/bin/env node

/**
 * 🔑 Test Authentication Endpoints
 * 
 * Este script prueba todos los endpoints de autenticación
 * Verifica funcionalidad y seguridad de cada endpoint
 */

const BASE_URL = 'http://localhost:3001/api';

async function makeRequest(url, data = null, method = 'GET', headers = {}) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    
    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }
    
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

async function testRegisterEndpoint() {
  console.log('\n📝 Testing Register Endpoint...');
  
  const registerTests = [
    {
      name: 'Valid Registration',
      data: {
        email: 'testuser@example.com',
        password: 'SecurePassword123!',
        name: 'Test User'
      },
      expected: 'SUCCESS'
    },
    {
      name: 'Duplicate Email',
      data: {
        email: 'testuser@example.com',
        password: 'AnotherPassword123!',
        name: 'Another User'
      },
      expected: 'CONFLICT'
    },
    {
      name: 'Missing Required Fields',
      data: {
        email: 'incomplete@example.com'
      },
      expected: 'VALIDATION_ERROR'
    },
    {
      name: 'Invalid Email Format',
      data: {
        email: 'not-an-email',
        password: 'SecurePassword123!',
        name: 'Test User'
      },
      expected: 'VALIDATION_ERROR'
    }
  ];
  
  for (const test of registerTests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`Data:`, JSON.stringify(test.data, null, 2));
    
    const result = await makeRequest(`${BASE_URL}/auth/register`, test.data, 'POST');
    
    console.log(`Status: ${result.status}`);
    console.log(`Expected: ${test.expected}`);
    
    switch (test.expected) {
      case 'SUCCESS':
        if (result.status === 201 || result.status === 200) {
          console.log('✅ REGISTRATION SUCCESSFUL');
        } else {
          console.log('❌ REGISTRATION FAILED');
        }
        break;
      case 'CONFLICT':
        if (result.status === 409 || result.status === 400) {
          console.log('✅ DUPLICATE EMAIL DETECTED');
        } else {
          console.log('❌ DUPLICATE EMAIL NOT DETECTED');
        }
        break;
      case 'VALIDATION_ERROR':
        if (result.status === 400) {
          console.log('✅ VALIDATION ERROR (as expected)');
        } else {
          console.log('❌ VALIDATION SHOULD HAVE FAILED');
        }
        break;
    }
    
    if (result.body) {
      const preview = result.body.substring(0, 150);
      console.log(`Response: ${preview}${result.body.length > 150 ? '...' : ''}`);
    }
  }
}

async function testLoginEndpoint() {
  console.log('\n🔐 Testing Login Endpoint...');
  
  const loginTests = [
    {
      name: 'Valid Login (if user exists)',
      data: {
        email: 'testuser@example.com',
        password: 'SecurePassword123!'
      },
      expected: 'SUCCESS_OR_UNAUTHORIZED'
    },
    {
      name: 'Invalid Email',
      data: {
        email: 'nonexistent@example.com',
        password: 'anypassword'
      },
      expected: 'UNAUTHORIZED'
    },
    {
      name: 'Wrong Password',
      data: {
        email: 'testuser@example.com',
        password: 'wrongpassword'
      },
      expected: 'UNAUTHORIZED'
    },
    {
      name: 'Missing Credentials',
      data: {
        email: 'testuser@example.com'
      },
      expected: 'VALIDATION_ERROR'
    },
    {
      name: 'SQL Injection Attempt',
      data: {
        email: "admin@example.com' OR '1'='1",
        password: "password' OR '1'='1"
      },
      expected: 'UNAUTHORIZED'
    }
  ];
  
  for (const test of loginTests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`Data:`, JSON.stringify(test.data, null, 2));
    
    const result = await makeRequest(`${BASE_URL}/auth/login`, test.data, 'POST');
    
    console.log(`Status: ${result.status}`);
    console.log(`Expected: ${test.expected}`);
    
    switch (test.expected) {
      case 'SUCCESS_OR_UNAUTHORIZED':
        if (result.status === 200 || result.status === 401) {
          console.log('✅ LOGIN RESPONSE (success or properly rejected)');
        } else {
          console.log('❌ UNEXPECTED LOGIN RESPONSE');
        }
        break;
      case 'UNAUTHORIZED':
        if (result.status === 401) {
          console.log('✅ UNAUTHORIZED (as expected)');
        } else {
          console.log('❌ SHOULD BE UNAUTHORIZED');
        }
        break;
      case 'VALIDATION_ERROR':
        if (result.status === 400) {
          console.log('✅ VALIDATION ERROR (as expected)');
        } else {
          console.log('❌ VALIDATION SHOULD HAVE FAILED');
        }
        break;
    }
    
    if (result.body) {
      const preview = result.body.substring(0, 150);
      console.log(`Response: ${preview}${result.body.length > 150 ? '...' : ''}`);
    }
  }
}

async function testLogoutEndpoint() {
  console.log('\n🚪 Testing Logout Endpoint...');
  
  const result = await makeRequest(`${BASE_URL}/auth/logout`, null, 'POST');
  
  console.log(`Status: ${result.status}`);
  
  if (result.status === 200) {
    console.log('✅ LOGOUT SUCCESSFUL');
  } else {
    console.log('❌ LOGOUT FAILED');
  }
  
  if (result.body) {
    console.log(`Response: ${result.body}`);
  }
}

async function testProfileEndpoint() {
  console.log('\n👤 Testing Profile Endpoint...');
  
  const profileTests = [
    {
      name: 'Profile without Authentication',
      headers: {},
      expected: 'UNAUTHORIZED'
    },
    {
      name: 'Profile with Invalid Token',
      headers: {
        'Authorization': 'Bearer invalid-token-here'
      },
      expected: 'UNAUTHORIZED'
    },
    {
      name: 'Profile with Malformed Authorization',
      headers: {
        'Authorization': 'InvalidFormat token'
      },
      expected: 'UNAUTHORIZED'
    }
  ];
  
  for (const test of profileTests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    
    const result = await makeRequest(`${BASE_URL}/auth/profile`, null, 'GET', test.headers);
    
    console.log(`Status: ${result.status}`);
    console.log(`Expected: ${test.expected}`);
    
    if (test.expected === 'UNAUTHORIZED') {
      if (result.status === 401) {
        console.log('✅ UNAUTHORIZED (as expected)');
      } else {
        console.log('❌ SHOULD BE UNAUTHORIZED');
      }
    }
    
    if (result.body) {
      const preview = result.body.substring(0, 150);
      console.log(`Response: ${preview}${result.body.length > 150 ? '...' : ''}`);
    }
  }
}

async function testEndpointSecurity() {
  console.log('\n🛡️ Testing Endpoint Security...');
  
  const securityTests = [
    {
      name: 'Large Payload Attack',
      endpoint: '/auth/register',
      data: {
        email: 'test@example.com',
        password: 'A'.repeat(10000),
        name: 'B'.repeat(10000)
      },
      expected: 'REJECTED'
    },
    {
      name: 'Null Byte Injection',
      endpoint: '/auth/login',
      data: {
        email: 'test@example.com\\x00admin',
        password: 'password\\x00'
      },
      expected: 'VALIDATION_ERROR'
    },
    {
      name: 'Unicode Normalization Attack',
      endpoint: '/auth/register',
      data: {
        email: 'tëst@example.com',
        password: 'pässwörd',
        name: 'üser'
      },
      expected: 'HANDLED'
    }
  ];
  
  for (const test of securityTests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    
    const result = await makeRequest(`${BASE_URL}${test.endpoint}`, test.data, 'POST');
    
    console.log(`Status: ${result.status}`);
    console.log(`Expected: ${test.expected}`);
    
    if (result.status === 400) {
      console.log('✅ SECURITY THREAT BLOCKED');
    } else if (result.status === 413) {
      console.log('✅ PAYLOAD TOO LARGE');
    } else {
      console.log('⚠️ REQUEST PROCESSED (check if properly handled)');
    }
  }
}

async function runAuthTests() {
  console.log('🧪 Starting Authentication Endpoint Tests...');
  console.log('Server should be running on http://localhost:3001');
  
  await testRegisterEndpoint();
  await testLoginEndpoint();
  await testLogoutEndpoint();
  await testProfileEndpoint();
  await testEndpointSecurity();
  
  console.log('\n✅ Authentication endpoint tests completed!');
  console.log('💡 All endpoints should handle security properly');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runAuthTests().catch(console.error);
}

module.exports = { 
  testRegisterEndpoint, 
  testLoginEndpoint, 
  testLogoutEndpoint, 
  testProfileEndpoint, 
  testEndpointSecurity 
};