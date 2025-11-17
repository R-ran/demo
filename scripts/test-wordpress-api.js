#!/usr/bin/env node

/**
 * WordPress API 访问测试脚本
 * 用于在本地和部署环境测试 WordPress API 连通性
 */

const fetch = require('node-fetch');

async function testWordPressAPI() {
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://test2.wxlanyun.com';

  console.log('🔍 开始测试 WordPress API 访问...');
  console.log(`📍 API URL: ${wpApiUrl}`);
  console.log('');

  const tests = [];

  // 测试1: 基础连通性
  try {
    console.log('📡 测试1: 基础连通性...');
    const response = await fetch(`${wpApiUrl}/wp-json/`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js-WordPress-Test',
        'Accept': 'application/json',
      },
      timeout: 10000
    });

    tests.push({
      name: '基础连通性',
      status: response.status,
      ok: response.ok,
      success: response.ok
    });

    if (response.ok) {
      console.log(`✅ 基础连通性测试成功 (${response.status})`);
    } else {
      console.log(`❌ 基础连通性测试失败 (${response.status})`);
    }
  } catch (error) {
    tests.push({
      name: '基础连通性',
      error: error.message,
      success: false
    });
    console.log(`❌ 基础连通性测试失败: ${error.message}`);
  }

  console.log('');

  // 测试2: 成功案例API
  try {
    console.log('📊 测试2: 成功案例API...');
    const response = await fetch(`${wpApiUrl}/wp-json/wp/v2/successful_project?per_page=5&_embed&status=publish`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js-WordPress-Test',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      },
      timeout: 10000
    });

    if (response.ok) {
      const data = await response.json();
      tests.push({
        name: '成功案例API',
        status: response.status,
        ok: response.ok,
        count: Array.isArray(data) ? data.length : 0,
        success: response.ok
      });
      console.log(`✅ 成功案例API测试成功 (${response.status}) - 返回 ${data.length} 个项目`);

      if (data.length > 0) {
        console.log(`   示例项目: ${data[0].title?.rendered || 'N/A'}`);
        console.log(`   特色图片: ${data[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url ? '✅' : '❌'}`);
        console.log(`   分类信息: ${data[0]._embedded?.['wp:term']?.[0]?.length > 0 ? '✅' : '❌'}`);
      }
    } else {
      tests.push({
        name: '成功案例API',
        status: response.status,
        ok: response.ok,
        success: false
      });
      console.log(`❌ 成功案例API测试失败 (${response.status})`);
    }
  } catch (error) {
    tests.push({
      name: '成功案例API',
      error: error.message,
      success: false
    });
    console.log(`❌ 成功案例API测试失败: ${error.message}`);
  }

  console.log('');

  // 测试3: 项目分类API
  try {
    console.log('📂 测试3: 项目分类API...');
    const response = await fetch(`${wpApiUrl}/wp-json/wp/v2/project_category?per_page=10`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js-WordPress-Test',
        'Accept': 'application/json',
      },
      timeout: 10000
    });

    if (response.ok) {
      const data = await response.json();
      tests.push({
        name: '项目分类API',
        status: response.status,
        ok: response.ok,
        count: Array.isArray(data) ? data.length : 0,
        success: response.ok
      });
      console.log(`✅ 项目分类API测试成功 (${response.status}) - 返回 ${data.length} 个分类`);

      if (data.length > 0) {
        console.log(`   示例分类: ${data.slice(0, 3).map(cat => cat.name).join(', ')}`);
      }
    } else {
      tests.push({
        name: '项目分类API',
        status: response.status,
        ok: response.ok,
        success: false
      });
      console.log(`❌ 项目分类API测试失败 (${response.status})`);
    }
  } catch (error) {
    tests.push({
      name: '项目分类API',
      error: error.message,
      success: false
    });
    console.log(`❌ 项目分类API测试失败: ${error.message}`);
  }

  console.log('');

  // 总结
  const successCount = tests.filter(test => test.success).length;
  const totalTests = tests.length;
  const overallSuccess = successCount === totalTests;

  console.log('📋 测试总结:');
  console.log(`   总测试数: ${totalTests}`);
  console.log(`   成功测试: ${successCount}`);
  console.log(`   失败测试: ${totalTests - successCount}`);
  console.log(`   整体状态: ${overallSuccess ? '✅ 所有测试通过' : '❌ 部分测试失败'}`);

  if (!overallSuccess) {
    console.log('');
    console.log('🔧 故障排除建议:');
    console.log('   1. 检查网络连接');
    console.log('   2. 验证 WordPress 站点是否正常运行');
    console.log('   3. 确认 REST API 是否已启用');
    console.log('   4. 检查防火墙或安全策略设置');
    console.log('   5. 验证 CORS 设置（如果在浏览器中测试）');
  }

  process.exit(overallSuccess ? 0 : 1);
}

// 运行测试
testWordPressAPI().catch(error => {
  console.error('💥 测试脚本执行失败:', error);
  process.exit(1);
});