/* ========================================
   RP Common JavaScript
   rp 폴더 내 모든 HTML 공통 함수
   ======================================== */

// 뒤로가기
function goBack() {
    history.back();
}

// 페이지 이동
function navigateTo(url) {
    location.href = url;
}

// 탭 전환
function switchTab(tabElement, tabGroup) {
    const tabs = document.querySelectorAll(tabGroup + ' .tab-item, ' + tabGroup + ' .sub-nav-item');
    tabs.forEach(tab => tab.classList.remove('active'));
    tabElement.classList.add('active');
}

// 통화 탭 전환
function switchCurrencyTab(tabElement) {
    const tabs = document.querySelectorAll('.currency-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    tabElement.classList.add('active');
}

// 반팝업 열기
function openHalfPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 반팝업 닫기
function closeHalfPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 반팝업 외부 클릭 시 닫기
function initHalfPopupOverlay() {
    document.querySelectorAll('.half-popup-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// 숫자 포맷팅 (천단위 콤마)
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 금액 포맷팅
function formatCurrency(amount, currency = 'KRW') {
    const formatted = formatNumber(Math.abs(amount));
    const sign = amount >= 0 ? '+' : '-';

    switch(currency) {
        case 'USD':
            return sign + '$' + formatted;
        case 'JPY':
            return sign + '¥' + formatted;
        case 'EUR':
            return sign + '€' + formatted;
        default:
            return formatted + '원';
    }
}

// 토스트 메시지
function showToast(message, duration = 3000) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: #1f2937;
            color: white;
            padding: 14px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 3000;
            opacity: 0;
            transition: all 0.3s ease;
            max-width: calc(100% - 32px);
            text-align: center;
        `;
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, duration);
}

// 스와이프로 반팝업 닫기
function initSwipeToClose() {
    document.querySelectorAll('.half-popup').forEach(popup => {
        let startY = 0;
        let currentY = 0;

        popup.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        popup.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            const diff = currentY - startY;

            if (diff > 0) {
                popup.style.transform = `translateY(${diff}px)`;
            }
        });

        popup.addEventListener('touchend', () => {
            const diff = currentY - startY;

            if (diff > 100) {
                const overlay = popup.closest('.half-popup-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }

            popup.style.transform = '';
            startY = 0;
            currentY = 0;
        });
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initHalfPopupOverlay();
    initSwipeToClose();
});
