/* ============================================
   ISA Common JavaScript
   공통으로 사용되는 함수 정의
   ============================================ */

// ============================================
// Navigation Functions
// ============================================

/**
 * 뒤로가기 버튼 클릭 시 실행
 * @param {string} fallbackUrl - history가 없을 때 이동할 기본 URL
 */
function goBack(fallbackUrl = 'isa_home.html') {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        location.href = fallbackUrl;
    }
}

/**
 * 페이지 이동
 * @param {string} page - 이동할 페이지명
 */
function navigateTo(page) {
    console.log(`Navigating to: ${page}`);
    location.href = page + '.html';
}

/**
 * 사이드 메뉴 열기
 */
function openSideMenu() {
    alert('메뉴가 열립니다.');
    // TODO: 실제 사이드 메뉴 구현 시 수정
}

/**
 * 탭 전환
 * @param {string} tabName - 이동할 탭명
 */
function switchTab(tabName) {
    location.href = tabName + '.html';
}

// ============================================
// Half Popup Functions (반팝업)
// ============================================

/**
 * 반팝업 열기
 * @param {string} overlayId - 오버레이 요소 ID
 * @param {string} popupId - 팝업 요소 ID
 */
function openHalfPopup(overlayId, popupId) {
    const overlay = document.getElementById(overlayId);
    const popup = document.getElementById(popupId);

    if (overlay && popup) {
        overlay.classList.add('active');
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * 반팝업 닫기
 * @param {string} overlayId - 오버레이 요소 ID
 * @param {string} popupId - 팝업 요소 ID
 */
function closeHalfPopup(overlayId, popupId) {
    const overlay = document.getElementById(overlayId);
    const popup = document.getElementById(popupId);

    if (overlay && popup) {
        overlay.classList.remove('active');
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * 반팝업에 스와이프로 닫기 기능 추가
 * @param {string} popupId - 팝업 요소 ID
 * @param {function} closeCallback - 닫기 시 호출할 콜백 함수
 */
function initPopupSwipe(popupId, closeCallback) {
    const popup = document.getElementById(popupId);
    if (!popup) return;

    let startY = 0;
    let currentY = 0;

    popup.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });

    popup.addEventListener('touchmove', function(e) {
        currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        if (diff > 0) {
            popup.style.transform = `translateX(-50%) translateY(${diff}px)`;
        }
    });

    popup.addEventListener('touchend', function(e) {
        const diff = currentY - startY;
        if (diff > 100) {
            closeCallback();
        }
        popup.style.transform = '';
        startY = 0;
        currentY = 0;
    });
}

// ============================================
// Toggle Functions (아코디언)
// ============================================

/**
 * 아코디언 토글
 * @param {string} id - 토글할 요소의 ID (prefix 제외)
 */
function toggleHolding(id) {
    const details = document.getElementById(`details-${id}`);
    const toggle = document.getElementById(`toggle-${id}`);

    if (details && toggle) {
        details.classList.toggle('collapsed');
        toggle.classList.toggle('collapsed');
    }
}

/**
 * 자산 상세 토글
 */
function toggleAssetDetails() {
    const details = document.getElementById('assetDetails');
    const toggle = document.getElementById('assetToggle');

    if (details && toggle) {
        details.classList.toggle('collapsed');
        toggle.classList.toggle('collapsed');
    }
}

/**
 * 차트 토글
 */
function toggleChart() {
    const content = document.getElementById('chartContent');
    const toggle = document.getElementById('chartToggle');

    if (content && toggle) {
        content.classList.toggle('collapsed');
        toggle.classList.toggle('collapsed');
    }
}

// ============================================
// ESC 키로 팝업 닫기 이벤트 등록
// ============================================

/**
 * ESC 키 이벤트 핸들러 등록
 * @param {function} closeCallback - ESC 키 입력 시 호출할 콜백 함수
 */
function initEscKeyHandler(closeCallback) {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCallback();
        }
    });
}

// ============================================
// Utility Functions
// ============================================

/**
 * 숫자에 천단위 콤마 추가
 * @param {number} num - 변환할 숫자
 * @returns {string} - 콤마가 추가된 문자열
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 금액 포맷팅 (원 단위)
 * @param {number} amount - 변환할 금액
 * @returns {string} - 포맷팅된 금액 문자열
 */
function formatCurrency(amount) {
    return formatNumber(amount) + '원';
}

/**
 * 수익률 포맷팅
 * @param {number} rate - 수익률 (소수점)
 * @param {boolean} showSign - 부호 표시 여부
 * @returns {string} - 포맷팅된 수익률 문자열
 */
function formatRate(rate, showSign = true) {
    const sign = rate >= 0 ? '+' : '';
    return (showSign ? sign : '') + rate.toFixed(2) + '%';
}

// ============================================
// DOMContentLoaded 공통 초기화
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // 공통 초기화 로직이 필요하면 여기에 추가
    console.log('ISA Common JS Loaded');
});
