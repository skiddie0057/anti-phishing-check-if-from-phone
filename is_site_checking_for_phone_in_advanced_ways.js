(function() {
    // Override and log ALL fingerprinting methods
    console.log("%c🚀 Starting Mobile Detection Debugger...", "color: red; font-size: 16px;");

    // ===== 1. Battery API =====
    if ('getBattery' in navigator) {
        const oldGetBattery = navigator.getBattery;
        navigator.getBattery = function() {
            console.trace("📛 [Mobile Detection] navigator.getBattery() was called!");
            return oldGetBattery.apply(this, arguments);
        };
    }

    // ===== 2. Motion/Orientation APIs =====
    if ('DeviceMotionEvent' in window) {
        console.log("📛 [Mobile Detection] DeviceMotionEvent is supported (common on mobile).");
        const oldAddListener = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
            if (type === 'devicemotion' || type === 'deviceorientation') {
                console.trace(`📛 [Mobile Detection] ${type} event listener added!`);
            }
            return oldAddListener.call(this, type, listener, options);
        };
    }

    // ===== 3. Touch Detection =====
    if ('ontouchstart' in window) {
        console.log("📛 [Mobile Detection] Touch events detected (common on mobile).");
    }

    // ===== 4. Viewport/DPI Detection =====
    console.log(`📛 [Mobile Detection] Viewport: ${window.innerWidth}x${window.innerHeight}, DPI: ${window.devicePixelRatio}`);
    if (window.matchMedia) {
        const checkPointerCoarse = window.matchMedia('(pointer: coarse)');
        if (checkPointerCoarse.matches) {
            console.log("📛 [Mobile Detection] 'pointer: coarse' (likely touchscreen).");
        }
    }

    // ===== 5. CPU/GPU Detection =====
    console.log(`📛 [Mobile Detection] CPU threads: ${navigator.hardwareConcurrency || 'N/A'}`);
    if ('WebGLRenderingContext' in window) {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        if (gl) {
            const renderer = gl.getParameter(gl.RENDERER);
            console.log(`📛 [Mobile Detection] WebGL Renderer: ${renderer}`);
            if (renderer.includes('Adreno') || renderer.includes('Mali') || renderer.includes('PowerVR')) {
                console.log("📛 [Mobile Detection] Mobile GPU detected!");
            }
        }
    }

    // ===== 6. Network Detection =====
    if ('connection' in navigator) {
        const connection = navigator.connection;
        console.log(`📛 [Mobile Detection] Network type: ${connection.effectiveType || 'N/A'}`);
        if (connection.effectiveType === 'cellular') {
            console.log("📛 [Mobile Detection] Likely on mobile data!");
        }
    }

    // ===== 7. UserAgent Mismatch Detection =====
    const userAgent = navigator.userAgent;
    console.log(`📛 [Mobile Detection] UserAgent: ${userAgent}`);
    if (userAgent.includes('Android') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        console.log("📛 [Mobile Detection] Mobile UserAgent detected (even in Desktop Mode).");
    }

    // ===== 8. CSS Media Query Detection =====
    if (window.matchMedia) {
        const checkHoverNone = window.matchMedia('(hover: none)');
        if (checkHoverNone.matches) {
            console.log("📛 [Mobile Detection] 'hover: none' (likely touch device).");
        }
    }

    // ===== 9. AudioContext Fingerprinting =====
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log("📛 [Mobile Detection] AudioContext detected (can differ by device).");
    }

    // ===== 10. Screen Size/DPI Tricks =====
    console.log(`📛 [Mobile Detection] Screen: ${screen.width}x${screen.height}, Avail: ${screen.availWidth}x${screen.availHeight}`);
    if (screen.width < 1024 || screen.height < 768) {
        console.log("📛 [Mobile Detection] Small screen (possible mobile).");
    }

    // ===== 11. Platform Detection =====
    console.log(`📛 [Mobile Detection] Platform: ${navigator.platform}`);
    if (navigator.platform.includes('Linux arm') || navigator.platform.includes('iPhone')) {
        console.log("📛 [Mobile Detection] Mobile OS detected!");
    }

    // ===== 12. Plugins Detection (Desktop vs Mobile) =====
    if (navigator.plugins && navigator.plugins.length === 0) {
        console.log("📛 [Mobile Detection] No plugins (common on mobile).");
    }

    // ===== 13. Chrome-Specific Checks =====
    if (window.chrome && window.chrome.loadTimes) {
        console.log("📛 [Mobile Detection] Chrome-specific API detected.");
    }

    // ===== 14. Service Worker Detection =====
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => {
            if (regs.length > 0) {
                console.log("📛 [Mobile Detection] Service Workers registered:", regs);
            }
        });
    }

    console.log("%c✅ Mobile Detection Debugger is active. Check logs for fingerprinting attempts!", "color: green; font-size: 14px;");
})();
