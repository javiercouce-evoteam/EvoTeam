/**
 * 🚦 Force Rate Limiting Test
 * Test que fuerza el rate limiting haciendo muchas requests
 */

const BASE_URL = 'http://localhost:3001/api';

async function forceRateLimit() {
  console.log('🚦 Force Rate Limiting Test');
  console.log('📡 Making 150 requests to trigger rate limiting...');
  console.log('⏱️ This may take a moment...\n');
  
  let successCount = 0;
  let rateLimitedCount = 0;
  let errorCount = 0;
  
  // Hacer 150 requests para forzar el rate limit (límite en dev: 100)
  for (let i = 1; i <= 150; i++) {
    try {
      const response = await fetch(`${BASE_URL}/`, {
        method: 'GET'
      });
      
      if (response.status === 200) {
        successCount++;
        if (i % 20 === 0) {
          console.log(`✅ Request ${i}: Success (${successCount} total)`);
        }
      } else if (response.status === 429) {
        rateLimitedCount++;
        console.log(`🚫 Request ${i}: RATE LIMITED! (${rateLimitedCount} total)`);
        
        // Mostrar headers de rate limiting
        const retryAfter = response.headers.get('retry-after');
        const rateLimit = response.headers.get('ratelimit-limit');
        const remaining = response.headers.get('ratelimit-remaining');
        
        console.log(`   Retry-After: ${retryAfter || 'Not set'}`);
        console.log(`   Rate Limit: ${rateLimit || 'Not set'}`);
        console.log(`   Remaining: ${remaining || 'Not set'}`);
        
        if (rateLimitedCount >= 5) {
          console.log('🛑 Stopping test after 5 rate limited responses');
          break;
        }
      } else {
        errorCount++;
        console.log(`❌ Request ${i}: Error ${response.status}`);
      }
      
      // Pequeña pausa para no saturar
      if (i % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
    } catch (error) {
      errorCount++;
      console.log(`💥 Request ${i}: Network error - ${error.message}`);
    }
  }
  
  console.log('\n📊 Results Summary:');
  console.log(`✅ Successful requests: ${successCount}`);
  console.log(`🚫 Rate limited requests: ${rateLimitedCount}`);
  console.log(`❌ Error requests: ${errorCount}`);
  console.log(`📈 Total requests made: ${successCount + rateLimitedCount + errorCount}`);
  
  if (rateLimitedCount > 0) {
    console.log('\n🎉 Rate limiting is working!');
    console.log('🛡️ Server successfully blocked excessive requests');
  } else {
    console.log('\n⚠️ No rate limiting detected');
    console.log('💡 This might be expected in development mode');
  }
}

async function testAuthRateLimit() {
  console.log('\n🔐 Testing Auth Rate Limiting...');
  console.log('📡 Making 120 auth requests to trigger auth rate limiting...\n');
  
  let successCount = 0;
  let rateLimitedCount = 0;
  let errorCount = 0;
  
  // Hacer 120 requests de auth para forzar el rate limit (límite en dev: 100)
  for (let i = 1; i <= 120; i++) {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
      });
      
      if (response.status === 200 || response.status === 401) {
        successCount++;
        if (i % 20 === 0) {
          console.log(`✅ Auth Request ${i}: Processed (${successCount} total)`);
        }
      } else if (response.status === 429) {
        rateLimitedCount++;
        console.log(`🚫 Auth Request ${i}: RATE LIMITED! (${rateLimitedCount} total)`);
        
        if (rateLimitedCount >= 3) {
          console.log('🛑 Stopping auth test after 3 rate limited responses');
          break;
        }
      } else {
        errorCount++;
        console.log(`❌ Auth Request ${i}: Error ${response.status}`);
      }
      
      // Pausa más pequeña para auth
      if (i % 5 === 0) {
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      
    } catch (error) {
      errorCount++;
      console.log(`💥 Auth Request ${i}: Network error - ${error.message}`);
    }
  }
  
  console.log('\n📊 Auth Results Summary:');
  console.log(`✅ Processed auth requests: ${successCount}`);
  console.log(`🚫 Rate limited auth requests: ${rateLimitedCount}`);
  console.log(`❌ Error auth requests: ${errorCount}`);
  
  if (rateLimitedCount > 0) {
    console.log('\n🎉 Auth rate limiting is working!');
  } else {
    console.log('\n⚠️ No auth rate limiting detected');
    console.log('💡 This might be expected in development mode with high limits');
  }
}

async function runForceTests() {
  console.log('🧪 Starting Force Rate Limiting Tests...');
  console.log('⚡ This test will make many requests to trigger rate limits\n');
  
  await forceRateLimit();
  await testAuthRateLimit();
  
  console.log('\n🏁 Force rate limiting tests completed!');
  console.log('💡 In production, rate limits would be much stricter');
}

// Ejecutar el test
runForceTests().catch(console.error);