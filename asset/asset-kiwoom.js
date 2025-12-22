/* ========================================
   Asset Kiwoom Scripts (자산키움 전용)
   ======================================== */

// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    // Header 탭 전환
    initTabs('.header-tab');

    // Main 탭 전환
    initTabs('.main-tab');

    // 메뉴 아이템 클릭 효과
    addClickEffect('.menu-item');

    // Premium 아이템 클릭 효과
    addClickEffect('.premium-item');

    // 서비스 버튼 스케일 효과
    addScaleEffect('.service-btn');

    // Back 버튼 이벤트 바인딩
    const backBtn = document.querySelector('.header-top svg');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            history.back();
        });
    }

    // Section 토글 이벤트 바인딩
    const sectionIds = ['popular', 'strategy', 'single', 'hot', 'trending'];
    sectionIds.forEach(function(sectionId) {
        const header = document.querySelector('#section-' + sectionId + ' .section-header');
        if (header) {
            header.addEventListener('click', function() {
                toggleSection(sectionId);
            });
        }
    });
});

/* ========================================
   Section Toggle (접기/펼치기) 기능
   ======================================== */
function toggleSection(sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const toggle = document.getElementById(`toggle-${sectionId}`);

    if (content && toggle) {
        content.classList.toggle('collapsed');
        toggle.classList.toggle('collapsed');
    }
}

/* ========================================
   Popular View Toggle (리스트/캐러셀 뷰 전환)
   ======================================== */
let isCarouselView = false;

function togglePopularView(event) {
    // 이벤트 버블링 방지 (섹션 접기/펼치기 방지)
    event.stopPropagation();

    const listView = document.getElementById('popular-list-view');
    const carouselView = document.getElementById('popular-carousel-view');

    if (listView && carouselView) {
        isCarouselView = !isCarouselView;

        if (isCarouselView) {
            listView.classList.add('hidden');
            carouselView.classList.remove('hidden');
        } else {
            listView.classList.remove('hidden');
            carouselView.classList.add('hidden');
        }
    }
}
