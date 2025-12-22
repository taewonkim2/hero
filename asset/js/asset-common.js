/* ========================================
   Asset Common JavaScript
   asset_inquiry.html, tax_overseas.html 공통 함수
   ======================================== */

// Tab 전환 기능
function initTabs() {
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 하단 네비게이션 탭 전환
function initNavTabs() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Tooltip 열기
function openTooltip(event) {
    event.stopPropagation();
    const tooltipOverlay = document.getElementById('tooltipOverlay');
    const tooltip = document.getElementById('tooltip');

    if (tooltipOverlay && tooltip) {
        const rect = event.target.getBoundingClientRect();
        tooltip.style.top = (rect.bottom + 10) + 'px';
        tooltip.style.left = Math.max(16, Math.min(rect.left - 100, window.innerWidth - 296)) + 'px';
        tooltipOverlay.classList.add('active');
    }
}

// Tooltip 닫기
function closeTooltip() {
    const tooltipOverlay = document.getElementById('tooltipOverlay');
    if (tooltipOverlay) {
        tooltipOverlay.classList.remove('active');
    }
}

// Bottom Sheet 열기
function openBottomSheet() {
    const overlay = document.getElementById('bottomSheetOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        overlay.offsetHeight; // Force reflow
        overlay.classList.add('active');
    }
}

// Bottom Sheet 닫기
function closeBottomSheet() {
    const overlay = document.getElementById('bottomSheetOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
}

// Toast 메시지 표시
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Popup 열기
function openPopup(popupId) {
    const overlay = document.getElementById(popupId + 'Overlay');
    const popup = document.getElementById(popupId);
    if (overlay && popup) {
        overlay.classList.add('active');
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Popup 닫기
function closePopup(popupId) {
    const overlay = document.getElementById(popupId + 'Overlay');
    const popup = document.getElementById(popupId);
    if (overlay && popup) {
        overlay.classList.remove('active');
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Toggle Switch
function toggleSwitch(element) {
    element.classList.toggle('active');
    const status = element.nextElementSibling;
    if (status) {
        status.textContent = element.classList.contains('active') ? 'ON' : 'OFF';
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initNavTabs();
});
