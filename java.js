/* === ФУНКЦИИ ДЛЯ ВИДЕО НА СТРАНИЦЕ === */

function openVideo(event, videoSrc) {
    event.preventDefault(); // останавливаем переход по ссылке
    
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('modalVideo');
    
    if (!modal || !player) {
        alert('❌ Ошибка модального окна');
        return;
    }
    
    // Устанавливаем источник видео
    player.querySelector('source').src = videoSrc;
    player.load();
    
    // Показываем модальное окно
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // запрещаем прокрутку
    
    // Запускаем видео
    player.play().catch(e => console.log('⚠️ Автоплей:', e));
    
    // Автозакрытие после окончания
    player.onended = closeVideo;
    
    // Ошибка загрузки
    player.onerror = function() {
        alert('❌ Видео не загрузилось. Проверьте путь к файлу.');
        closeVideo();
    };
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('modalVideo');
    
    if (player) {
        player.pause();
        player.src = '';
    } 
    
    if (modal) {
        modal.style.display = 'none';
    }
    
    document.body.style.overflow = ''; // возвращаем прокрутку
}

// Закрытие по клику на фон
document.getElementById('videoModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeVideo();
    }
});

// Закрытие по клавише Esc
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeVideo();
    }
});

