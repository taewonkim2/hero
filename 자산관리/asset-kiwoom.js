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
