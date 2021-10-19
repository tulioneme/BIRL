'use strict';

const CACHE_NAME = "coffee-app-static";

const FILES_STATIC = [    
    'css/bootstrap.min.css',
    'css/style.css',
    'icons/favicon.ico',
    'font/drawing_guides/Drawing_Guides.ttf',
    'font/made_with_b/MadeWithB.ttf',
    'font/made_with_b/NoLicense_MadeWithB.woff',
    'font/urban_sketch/Urban.ttf',
    'imgs/bg.jpeg',
    'imgs/bg2.png',        
    'imgs/fundo_giz_2.jpeg',
    'imgs/fundo_giz_3.jpeg',
    'imgs/fundo_giz.jpeg',    
    'imgs/icon.jpg',
    'imgs/loading2.gif', 
    'imgs/offline.png',   
    'js/bootstrap.bundle.min.js',
    'js/bootstrap.min.js',
    'js/jquery-3.2.1.slim.min.js',
    'js/popper.min.js',
    'offline.html'
];

//Instalação
self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_STATIC);
        })
    );
    self.skipWaiting();
});

//Ativação
self.addEventListener('activate', (evt) => {
    evt.waitUntil(
            caches.keys().then((keylist) => {
                return Promise.all(keylist.map((key) => {
                    if(key !== CACHE_NAME){
                        return caches.delete(key);
                    }
                }));
            })
    );
    self.clients.claim();
});

//Responder um página Offline 
self.addEventListener('fetch', (evt) => {
    if(evt.request.mode !== 'navigate'){
        return;
    }
    evt.respondWith(
        fetch(evt.request).catch(() => {
            return caches.open(CACHE_NAME).then((cache) => {
                return cache.match('offline.html');
            })
        })
    );
});