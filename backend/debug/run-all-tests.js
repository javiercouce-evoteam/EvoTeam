#!/usr/bin/env node

/**
 * 🧪 Run All Security Tests
 * 
 * Este script ejecuta todos los tests de seguridad en secuencia
 * Proporciona un resumen completo de todas las pruebas
 */

const { testGlobalRateLimit, testAuthRateLimit } = require('./rate-limiting/test-rate-limits');
const { testXSSPayloads, testXSSInHeaders } = require('./xss-protection/test-xss');
const { testParameterPollution, testPOSTParameterPollution } = require('./hpp-protection/test-hpp');
const { testCORSHeaders, testPreflightRequest } = require('./cors-tests/test-cors');
const { testLoginValidation, testRegisterValidation } = require('./validation/test-validation');
const { testRegisterEndpoint, testLoginEndpoint, testProfileEndpoint } = require('./auth-endpoints/test-auth');

const BASE_URL = 'http://localhost:3001/api';

async function checkServerHealth() {
  console.log('🏥 Checking server health...');
  
  try {
    const response = await fetch(`${BASE_URL}/health`);
    if (response.status === 200) {
      console.log('✅ Server is running and healthy');
      return true;
    } else {
      console.log(`❌ Server responded with status ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Server is not accessible: ${error.message}`);
    console.log('💡 Make sure to run: pnpm --filter backend run dev');
    return false;
  }
}

async function runTestSuite(name, testFunctions) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🧪 ${name.toUpperCase()} TEST SUITE`);
  console.log(`${'='.repeat(60)}`);
  
  const results = [];
  
  for (const testFunc of testFunctions) {
    try {
      console.log(`\n🔄 Running ${testFunc.name}...`);
      await testFunc();
      results.push({ test: testFunc.name, status: 'PASSED' });
    } catch (error) {
      console.log(`❌ ${testFunc.name} failed: ${error.message}`);
      results.push({ test: testFunc.name, status: 'FAILED', error: error.message });
    }
  }
  
  return results;
}

async function generateReport(allResults) {
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 SECURITY TEST REPORT');
  console.log(`${'='.repeat(60)}`);
  
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  
  for (const [suiteName, results] of Object.entries(allResults)) {
    console.log(`\n📋 ${suiteName}:`);
    
    for (const result of results) {
      totalTests++;
      const status = result.status === 'PASSED' ? '✅' : '❌';
      console.log(`  ${status} ${result.test}`);
      
      if (result.status === 'PASSED') {
        passedTests++;
      } else {
        failedTests++;
        if (result.error) {
          console.log(`     Error: ${result.error}`);
        }
      }
    }
  }
  
  console.log(`\n📈 SUMMARY:`);
  console.log(`  Total Tests: ${totalTests}`);
  console.log(`  Passed: ${passedTests} ✅`);
  console.log(`  Failed: ${failedTests} ❌`);
  console.log(`  Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (failedTests === 0) {
    console.log('\n🎉 ALL SECURITY TESTS PASSED!');
    console.log('🛡️ Your backend security implementation is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Review the errors above.');
    console.log('🔧 Consider fixing the issues before deploying to production.');
  }
}

async function runAllSecurityTests() {
  console.log('🚀 Starting Comprehensive Security Test Suite');
  console.log('🎯 Testing all implemented security measures...');
  console.log(`📡 Target: ${BASE_URL}`);
  
  // Verificar que el servidor esté funcionando
  const serverHealthy = await checkServerHealth();
  if (!serverHealthy) {
    console.log('\n❌ Cannot proceed with tests - server is not accessible');
    process.exit(1);
  }
  
  const allResults = {};
  
  // 1. Rate Limiting Tests
  allResults['Rate Limiting'] = await runTestSuite('Rate Limiting', [
    testGlobalRateLimit,
    testAuthRateLimit
  ]);
  
  // 2. XSS Protection Tests
  allResults['XSS Protection'] = await runTestSuite('XSS Protection', [
    testXSSPayloads,
    testXSSInHeaders
  ]);
  
  // 3. HPP Protection Tests
  allResults['HPP Protection'] = await runTestSuite('HPP Protection', [
    testParameterPollution,
    testPOSTParameterPollution
  ]);
  
  // 4. CORS Tests
  allResults['CORS Configuration'] = await runTestSuite('CORS Configuration', [
    testCORSHeaders,
    testPreflightRequest
  ]);
  
  // 5. Schema Validation Tests
  allResults['Schema Validation'] = await runTestSuite('Schema Validation', [
    testLoginValidation,
    testRegisterValidation
  ]);
  
  // 6. Authentication Endpoint Tests
  allResults['Authentication Endpoints'] = await runTestSuite('Authentication Endpoints', [
    testRegisterEndpoint,
    testLoginEndpoint,
    testProfileEndpoint
  ]);
  
  // Generar reporte final
  await generateReport(allResults);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log('🏁 Security testing completed!');
  console.log(`${'='.repeat(60)}`);
}

// Función para ejecutar tests individuales
async function runIndividualTest(testName) {
  const tests = {
    'rate-limiting': () => require('./rate-limiting/test-rate-limits.js'),
    'xss': () => require('./xss-protection/test-xss.js'),
    'hpp': () => require('./hpp-protection/test-hpp.js'),
    'cors': () => require('./cors-tests/test-cors.js'),
    'validation': () => require('./validation/test-validation.js'),
    'auth': () => require('./auth-endpoints/test-auth.js')
  };
  
  if (tests[testName]) {
    console.log(`🧪 Running ${testName} tests only...`);
    const testModule = tests[testName]();
    // Ejecutar el test específico
  } else {
    console.log('❌ Unknown test name. Available tests:');
    console.log('  - rate-limiting');
    console.log('  - xss');
    console.log('  - hpp');
    console.log('  - cors');
    console.log('  - validation');
    console.log('  - auth');
  }
}

// Manejo de argumentos de línea de comandos
const args = process.argv.slice(2);
if (args.length > 0) {
  const testName = args[0];
  runIndividualTest(testName).catch(console.error);
} else {
  // Ejecutar todos los tests
  runAllSecurityTests().catch(console.error);
}

module.exports = { runAllSecurityTests, runIndividualTest };