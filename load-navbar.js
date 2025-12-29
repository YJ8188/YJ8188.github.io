// load-navbar.js - 加载公共导航栏的脚本
// 这个文件需要在每个HTML页面中引入

(function() {
    'use strict';
    
    // 等待页面基本内容加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNavbar);
    } else {
        loadNavbar();
    }
    
    function loadNavbar() {
        // 创建导航栏容器
        const navbarContainer = document.createElement('div');
        navbarContainer.id = 'navbar-container';
        
        // 插入到body的最开始
        document.body.insertBefore(navbarContainer, document.body.firstChild);
        
        // 根据当前页面位置确定navbar.html的路径
        let navbarPath = 'navbar.html';
        
        // 如果页面在子目录中，需要调整路径
        const currentPath = window.location.pathname;
        if (currentPath.includes('/posts/') || currentPath.includes('/pages/')) {
            navbarPath = '../navbar.html';
        }
        
        // 加载navbar.html
        fetch(navbarPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`无法加载导航栏: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // 将HTML插入到容器中
                navbarContainer.innerHTML = html;
                
                // 重新初始化功能（因为新加载的内容需要绑定事件）
                setTimeout(() => {
                    // 触发navbar.html中的初始化函数
                    if (window.initAll) {
                        window.initAll();
                    }
                }, 100);
                
                console.log('导航栏加载成功');
            })
            .catch(error => {
                console.error('导航栏加载失败:', error);
                
                // 备用方案：显示一个简单的导航栏
                navbarContainer.innerHTML = `
                    <nav style="
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        background: #f8f9fa;
                        padding: 15px 20px;
                        border-bottom: 1px solid #dee2e6;
                        z-index: 1000;
                    ">
                        <a href="index.html" style="
                            font-weight: bold;
                            color: #3b82f6;
                            text-decoration: none;
                            font-size: 20px;
                        ">何哥的博客</a>
                        <div style="float: right;">
                            <a href="index.html" style="margin-left: 15px;">首页</a>
                            <a href="resume.html" style="margin-left: 15px;">简历</a>
                        </div>
                    </nav>
                    <div style="height: 70px;"></div>
                `;
            });
    }
    
    // 创建一个简单的回到顶部按钮作为备用
    function createFallbackBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'fallback-back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.title = '回到顶部';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: #3b82f6;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 20px;
            display: none;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(backToTopBtn);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // 如果5秒后还没有加载出导航栏，使用备用方案
    setTimeout(() => {
        if (!document.querySelector('.navbar')) {
            createFallbackBackToTop();
        }
    }, 5000);
})();
