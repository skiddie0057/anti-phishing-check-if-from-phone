(function() {
    console.log("%c🔍 Starting Advanced Phishing Debugger (Active Usage Only)", "color: #FF6B6B; font-size: 16px; font-weight: bold;");

    // ===== 1. Battery API =====
    if ('getBattery' in navigator) {
        const oldGetBattery = navigator.getBattery;
        navigator.getBattery = function() {
            console.trace("🚨 [Active Trigger] navigator.getBattery() CALLED");
            return oldGetBattery.apply(this, arguments);
        };
    }

    // ===== 2. Motion/Orientation APIs =====
    if ('DeviceMotionEvent' in window) {
        const oldAddListener = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
            if (type === 'devicemotion' || type === 'deviceorientation') {
                console.trace(`🚨 [Active Trigger] ${type} listener ADDED`);
            }
            return oldAddListener.call(this, type, listener, options);
        };
    }

    // ===== 3. Touch Detection =====
    const originalTouchStart = window.ontouchstart;
    Object.defineProperty(window, 'ontouchstart', {
        set: function(value) {
            console.trace("🚨 [Active Trigger] ontouchstart handler SET");
            return originalTouchStart;
        },
        configurable: true
    });

    // ===== 4. Viewport/DPI Detection =====
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = function(query) {
        if (query.includes('pointer: coarse') || query.includes('hover: none') || query.includes('max-device-width')) {
            console.trace(`🚨 [Active Trigger] matchMedia("${query}") CALLED`);
        }
        return originalMatchMedia.apply(this, arguments);
    };

    // ===== 5. CPU/GPU Detection =====
    const oldHardwareConcurrency = Object.getOwnPropertyDescriptor(Navigator.prototype, 'hardwareConcurrency');
    Object.defineProperty(Navigator.prototype, 'hardwareConcurrency', {
        get: function() {
            console.trace("🚨 [Active Trigger] navigator.hardwareConcurrency ACCESSED");
            return oldHardwareConcurrency.get.apply(this);
        },
        configurable: true
    });

    // ===== 6. WebGL Fingerprinting =====
    if ('WebGLRenderingContext' in window) {
        const oldGetContext = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function(type) {
            if (type === 'webgl' || type === 'experimental-webgl') {
                console.trace("🚨 [Active Trigger] WebGL context REQUESTED");
            }
            return oldGetContext.apply(this, arguments);
        };
    }

    // ===== 7. Network Detection =====
    if ('connection' in navigator) {
        const oldConnection = Object.getOwnPropertyDescriptor(Navigator.prototype, 'connection');
        Object.defineProperty(Navigator.prototype, 'connection', {
            get: function() {
                console.trace("🚨 [Active Trigger] navigator.connection ACCESSED");
                return oldConnection.get.apply(this);
            },
            configurable: true
        });
    }

    // ===== 8. AudioContext Fingerprinting =====
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const oldAudioContext = window.AudioContext || window.webkitAudioContext;
        window.AudioContext = function() {
            console.trace("🚨 [Active Trigger] AudioContext INITIALIZED");
            return new oldAudioContext();
        };
    }

    // ===== 9. Service Worker Detection =====
    if ('serviceWorker' in navigator) {
        const oldRegister = navigator.serviceWorker.register;
        navigator.serviceWorker.register = function() {
            console.trace("🚨 [Active Trigger] ServiceWorker REGISTERED");
            return oldRegister.apply(this, arguments);
        };
    }

    // ===== 10. UserAgent Redirection =====
    const oldUserAgent = Object.getOwnPropertyDescriptor(Navigator.prototype, 'userAgent');
    Object.defineProperty(Navigator.prototype, 'userAgent', {
        get: function() {
            console.trace("🚨 [Active Trigger] navigator.userAgent ACCESSED");
            return oldUserAgent.get.apply(this);
        },
        configurable: true
    });

    // ===== 11. Plugin Detection =====
    if ('plugins' in navigator) {
        const oldPlugins = Object.getOwnPropertyDescriptor(Navigator.prototype, 'plugins');
        Object.defineProperty(Navigator.prototype, 'plugins', {
            get: function() {
                console.trace("🚨 [Active Trigger] navigator.plugins ACCESSED");
                return oldPlugins.get.apply(this);
            },
            configurable: true
        });
    }

    // ===== 12. Chrome-Specific Checks =====
    if (window.chrome) {
        const oldLoadTimes = window.chrome.loadTimes;
        if (oldLoadTimes) {
            window.chrome.loadTimes = function() {
                console.trace("🚨 [Active Trigger] chrome.loadTimes() CALLED");
                return oldLoadTimes.apply(this, arguments);
            };
        }
    }

    console.log("%c✅ Debugger active. Will ONLY log when fingerprinting methods are executed.", 
                "color: #4CAF50; font-size: 14px; padding: 2px 4px; border-radius: 3px;");
})();
