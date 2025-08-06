/**
 * 🚀 Quick Security Test
 * Test rápido de las medidas de seguridad implementadas
 */

const BASE_URL = 'http://localhost:3001/api';

async function testBasicSecurity() {
  console.log('🧪 Quick Security Test Starting...');
  console.log(`📡 Testing: ${BASE_URL}`);
  
  // Test 1: Health Check
  console.log('\n1️⃣ Testing Health Endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/health`);
    console.log(`✅ Health Check: ${response.status} ${response.statusText}`);
    console.log(`🛡️ Security Headers:`);
    console.log(`   X-Content-Type-Options: ${response.headers.get('x-content-type-options') || 'Not set'}`);
    console.log(`   X-Frame-Options: ${response.headers.get('x-frame-options') || 'Not set'}`);
    console.log(`   Content-Security-Policy: ${response.headers.get('content-security-policy') ? 'Set' : 'Not set'}`);
  } catch (error) {
    console.log(`❌ Health Check Failed: ${error.message}`);
    return;
  }
  
  // Test 2: Rate Limiting
  console.log('\n2️⃣ Testing Rate Limiting...');
  for (let i = 1; i <= 5; i++) {
    try {
      const response = await fetch(`${BASE_URL}/health`);
      const remaining = response.headers.get('x-ratelimit-remaining');
      console.log(`   Request ${i}: Status ${response.status}, Remaining: ${remaining || 'N/A'}`);
    } catch (error) {
      console.log(`   Request ${i}: Error - ${error.message}`);
    }
  }
  
  // Test 3: XSS Protection
  console.log('\n3️⃣ Testing XSS Protection...');
  try {
    const xssPayload = {
      email: 'test@example.com',
      password: 'password123',
      name: '<script>alert("XSS")</script>'
    };
    
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(xssPayload)
    });
    
    console.log(`   XSS Test: Status ${response.status}`);
    if (response.status === 400) {
      console.log(`   ✅ XSS Payload Blocked`);
    } else {
      console.log(`   ⚠️ XSS Payload Processed (check if sanitized)`);
    }
  } catch (error) {
    console.log(`   XSS Test Error: ${error.message}`);
  }
  
  // Test 4: Schema Validation
  console.log('\n4️⃣ Testing Schema Validation...');
  try {
    const invalidData = {
      email: 'not-an-email',
      password: 'weak'
    };
    
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidData)
    });
    
    console.log(`   Validation Test: Status ${response.status}`);
    if (response.status === 400) {
      console.log(`   ✅ Invalid Data Rejected`);
    } else {
      console.log(`   ❌ Invalid Data Accepted`);
    }
  } catch (error) {
    console.log(`   Validation Test Error: ${error.message}`);
  }
  
  // Test 5: CORS Headers
  console.log('\n5️⃣ Testing CORS Headers...');
  try {
    const response = await fetch(`${BASE_URL}/health`, {
      headers: { 'Origin': 'http://localhost:3000' }
    });
    
    const corsOrigin = response.headers.get('access-control-allow-origin');
    const corsCredentials = response.headers.get('access-control-allow-credentials');
    
    console.log(`   CORS Origin: ${corsOrigin || 'Not set'}`);
    console.log(`   CORS Credentials: ${corsCredentials || 'Not set'}`);
    
    if (corsOrigin) {
      console.log(`   ✅ CORS Headers Present`);
    } else {
      console.log(`   ❌ CORS Headers Missing`);
    }
  } catch (error) {
    console.log(`   CORS Test Error: ${error.message}`);
  }
  
  console.log('\n🎉 Quick Security Test Completed!');
  console.log('💡 For detailed testing, use the individual test scripts in each folder.');
}

// Ejecutar el test
testBasicSecurity().catch(console.error);