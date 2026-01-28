self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('push', (event) => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/work-helper/icon.png'
    });
});

// 監聽來自網頁的通知請求
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
        const { title, body, delay } = event.data;
        setTimeout(() => {
            self.registration.showNotification(title, {
                body: body,
                vibrate: [200, 100, 200]
            });
        }, delay);
    }
});
