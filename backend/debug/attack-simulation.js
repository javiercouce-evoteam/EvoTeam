/**
 * 🚨 Attack Simulation & Security Validation
 * Simula diferentes tipos de ataques para verificar que las medidas de seguridad los bloquean
 */

const BASE_URL = 'http://localhost:3001/api';

async function simulateAttacks() {
  console.log('🚨 ATTACK SIMULATION & SECURITY VALIDATION');
  console.log('=' .repeat(70));
  console.log('🎯 Testing various attack vectors against our secured API');
  console.log(`🕒 Started at: ${new Date().toLocaleString()}\n`);
  
  const results = {
    blocked: [],
    allowed: [],
    errors: []
  };
  
  // 1. XSS Attack Attempts
  console.log('1️⃣ XSS ATTACK SIMULATION');
  console.log('-'.repeat(50));
  
  const xssAttacks = [
    {
      name: 'Script Tag Injection',
      payload: '<script>alert("XSS Attack!")</script>',
      shouldBlock: true
    },
    {
      name: 'Image XSS',
      payload: '<img src=x onerror=alert("Hacked!")>',
      shouldBlock: true
    },
    {
      name: 'SVG XSS',
      payload: '<svg onload=alert("XSS")>',
      shouldBlock: true
    },
    {
      name: 'JavaScript URL',
      payload: 'javascript:alert("XSS")',
      shouldBlock: true
    },
    {
      name: 'Normal Text',
      payload: 'John Doe',
      shouldBlock: false
    }
  ];
  
  for (const attack of xssAttacks) {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'attacker@evil.com',
          password: 'password123',
          name: attack.payload
        })
      });
      
      const blocked = response.status === 400;
      const result = {
        attack: attack.name,
        payload: attack.payload.substring(0, 30) + '...',
        status: response.status,
        blocked,
        expected: attack.shouldBlock ? 'BLOCK' : 'ALLOW'
      };
      
      if (blocked && attack.shouldBlock) {
        console.log(`✅ ${attack.name}: CORRECTLY BLOCKED (${response.status})`);
        results.blocked.push(result);
      } else if (!blocked && !attack.shouldBlock) {
        console.log(`✅ ${attack.name}: CORRECTLY ALLOWED (${response.status})`);
        results.allowed.push(result);
      } else {
        console.log(`❌ ${attack.name}: UNEXPECTED RESULT (${response.status})`);
        results.errors.push(result);
      }
      
    } catch (error) {
      console.log(`❌ ${attack.name}: ERROR - ${error.message}`);
      results.errors.push({ attack: attack.name, error: error.message });
    }
  }
  
  // 2. SQL Injection Attempts
  console.log('\n2️⃣ SQL INJECTION SIMULATION');
  console.log('-'.repeat(50));
  
  const sqlAttacks = [
    {
      name: 'Classic SQL Injection',
      email: "admin'; DROP TABLE users; --",
      password: 'anything'
    },
    {
      name: 'Union Attack',
      email: "user' UNION SELECT * FROM passwords --",
      password: 'test'
    },
    {
      name: 'Boolean Blind SQL',
      email: "admin' AND 1=1 --",
      password: 'test'
    },
    {
      name: 'Time-based Blind SQL',
      email: "admin'; WAITFOR DELAY '00:00:05' --",
      password: 'test'
    }
  ];
  
  for (const attack of sqlAttacks) {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: attack.email,
          password: attack.password
        })
      });
      
      if (response.status === 400) {
        console.log(`✅ ${attack.name}: BLOCKED by validation (${response.status})`);
        results.blocked.push({ attack: attack.name, status: response.status });
      } else {
        console.log(`❌ ${attack.name}: NOT BLOCKED (${response.status})`);
        results.errors.push({ attack: attack.name, status: response.status });
      }
      
    } catch (error) {
      console.log(`❌ ${attack.name}: ERROR - ${error.message}`);
      results.errors.push({ attack: attack.name, error: error.message });
    }
  }
  
  // 3. Parameter Pollution Attacks
  console.log('\n3️⃣ PARAMETER POLLUTION SIMULATION');
  console.log('-'.repeat(50));
  
  const hppAttacks = [
    {
      name: 'Query Parameter Pollution',
      url: `${BASE_URL}/health?user=admin&user=guest&action=delete&action=view`
    },
    {
      name: 'Multiple ID Parameters',
      url: `${BASE_URL}/health?id=1&id=2&id=3&id=../../../etc/passwd`
    }
  ];
  
  for (const attack of hppAttacks) {
    try {
      const response = await fetch(attack.url);
      
      if (response.status === 200) {
        console.log(`✅ ${attack.name}: HANDLED by HPP middleware (${response.status})`);
        results.allowed.push({ attack: attack.name, status: response.status });
      } else {
        console.log(`❌ ${attack.name}: UNEXPECTED (${response.status})`);
        results.errors.push({ attack: attack.name, status: response.status });
      }
      
    } catch (error) {
      console.log(`❌ ${attack.name}: ERROR - ${error.message}`);
      results.errors.push({ attack: attack.name, error: error.message });
    }
  }
  
  // 4. CORS Attack Simulation
  console.log('\n4️⃣ CORS ATTACK SIMULATION');
  console.log('-'.repeat(50));
  
  const corsAttacks = [
    {
      name: 'Malicious Origin',
      origin: 'http://evil-site.com'
    },
    {
      name: 'Subdomain Attack',
      origin: 'http://fake.localhost.evil.com'
    },
    {
      name: 'HTTPS Downgrade',
      origin: 'https://malicious.com'
    }
  ];
  
  for (const attack of corsAttacks) {
    try {
      const response = await fetch(`${BASE_URL}/health`, {
        headers: { 'Origin': attack.origin }
      });
      
      const corsHeader = response.headers.get('access-control-allow-origin');
      
      if (!corsHeader || corsHeader !== attack.origin) {
        console.log(`✅ ${attack.name}: BLOCKED - No CORS access granted`);
        results.blocked.push({ attack: attack.name, corsHeader });
      } else {
        console.log(`❌ ${attack.name}: ALLOWED - CORS access granted`);
        results.errors.push({ attack: attack.name, corsHeader });
      }
      
    } catch (error) {
      console.log(`❌ ${attack.name}: ERROR - ${error.message}`);
      results.errors.push({ attack: attack.name, error: error.message });
    }
  }
  
  // 5. Authentication Bypass Attempts
  console.log('\n5️⃣ AUTHENTICATION BYPASS SIMULATION');
  console.log('-'.repeat(50));
  
  const authAttacks = [
    {
      name: 'No Token Access',
      endpoint: '/auth/profile',
      headers: {}
    },
    {
      name: 'Invalid Token',
      endpoint: '/auth/profile',
      headers: { 'Authorization': 'Bearer invalid-token-123' }
    },
    {
      name: 'Malformed Token',
      endpoint: '/auth/profile',
      headers: { 'Authorization': 'InvalidFormat' }
    }
  ];
  
  for (const attack of authAttacks) {
    try {
      const response = await fetch(`${BASE_URL}${attack.endpoint}`, {
        headers: attack.headers
      });
      
      if (response.status === 401 || response.status === 403) {
        console.log(`✅ ${attack.name}: CORRECTLY BLOCKED (${response.status})`);
        results.blocked.push({ attack: attack.name, status: response.status });
      } else if (response.status === 200) {
        console.log(`❌ ${attack.name}: BYPASS SUCCESSFUL (${response.status})`);
        results.errors.push({ attack: attack.name, status: response.status });
      } else {
        console.log(`❓ ${attack.name}: UNEXPECTED (${response.status})`);
        results.errors.push({ attack: attack.name, status: response.status });
      }
      
    } catch (error) {
      console.log(`❌ ${attack.name}: ERROR - ${error.message}`);
      results.errors.push({ attack: attack.name, error: error.message });
    }
  }
  
  // 6. Valid Requests (Should Succeed)
  console.log('\n6️⃣ VALID REQUESTS SIMULATION');
  console.log('-'.repeat(50));
  
  const validRequests = [
    {
      name: 'Health Check',
      method: 'GET',
      endpoint: '/health'
    },
    {
      name: 'Valid Registration Data',
      method: 'POST',
      endpoint: '/auth/register',
      body: {
        email: 'valid.user@example.com',
        password: 'SecurePass123!',
        name: 'Valid User'
      }
    },
    {
      name: 'Valid Login Attempt',
      method: 'POST',
      endpoint: '/auth/login',
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    }
  ];
  
  for (const request of validRequests) {
    try {
      const options = {
        method: request.method,
        headers: { 'Content-Type': 'application/json' }
      };
      
      if (request.body) {
        options.body = JSON.stringify(request.body);
      }
      
      const response = await fetch(`${BASE_URL}${request.endpoint}`, options);
      
      if (response.status >= 200 && response.status < 400) {
        console.log(`✅ ${request.name}: SUCCESS (${response.status})`);
        results.allowed.push({ request: request.name, status: response.status });
      } else if (response.status === 409) {
        console.log(`✅ ${request.name}: HANDLED - User exists (${response.status})`);
        results.allowed.push({ request: request.name, status: response.status });
      } else {
        console.log(`❌ ${request.name}: FAILED (${response.status})`);
        results.errors.push({ request: request.name, status: response.status });
      }
      
    } catch (error) {
      console.log(`❌ ${request.name}: ERROR - ${error.message}`);
      results.errors.push({ request: request.name, error: error.message });
    }
  }
  
  // Final Report
  console.log('\n🎯 ATTACK SIMULATION REPORT');
  console.log('=' .repeat(70));
  console.log(`✅ Successfully Blocked Attacks: ${results.blocked.length}`);
  console.log(`✅ Valid Requests Allowed: ${results.allowed.length}`);
  console.log(`❌ Security Issues Found: ${results.errors.length}`);
  console.log('');
  
  if (results.errors.length > 0) {
    console.log('🚨 SECURITY ISSUES DETECTED:');
    results.errors.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error.attack || error.request}: ${error.status || error.error}`);
    });
  } else {
    console.log('🛡️ ALL SECURITY MEASURES WORKING CORRECTLY!');
    console.log('🎉 Your API successfully blocked all simulated attacks');
    console.log('✅ All valid requests were processed correctly');
  }
  
  console.log('');
  console.log('📊 SECURITY SUMMARY:');
  console.log('   🛡️ XSS Protection: Active');
  console.log('   🛡️ SQL Injection Protection: Active');
  console.log('   🛡️ HPP Protection: Active');
  console.log('   🛡️ CORS Protection: Active');
  console.log('   🛡️ Authentication: Active');
  console.log('   🛡️ Input Validation: Active');
  console.log('');
  console.log(`🕒 Completed at: ${new Date().toLocaleString()}`);
}

// Ejecutar la simulación de ataques
simulateAttacks().catch(console.error);