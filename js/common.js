/* ========================================
   Common Scripts - Hero App
   ======================================== */

/**
 * 숫자 포맷팅 (천단위 콤마)
 * @param {number} num - 포맷할 숫자
 * @returns {string} 포맷된 문자열
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 통화 포맷팅 (원화)
 * @param {number} amount - 금액
 * @returns {string} 포맷된 금액 문자열
 */
function formatCurrency(amount) {
    return formatNumber(amount) + '원';
}

/**
 * 퍼센트 포맷팅
 * @param {number} value - 퍼센트 값
 * @param {boolean} showSign - 부호 표시 여부
 * @returns {string} 포맷된 퍼센트 문자열
 */
function formatPercent(value, showSign = true) {
    const sign = showSign && value > 0 ? '+' : '';
    return sign + value.toFixed(2) + '%';
}

/**
 * 탭 전환 기능
 * @param {string} tabSelector - 탭 요소 선택자
 * @param {string} activeClass - 활성 클래스명
 */
function initTabs(tabSelector, activeClass = 'active') {
    document.querySelectorAll(tabSelector).forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll(tabSelector).forEach(t => t.classList.remove(activeClass));
            this.classList.add(activeClass);
        });
    });
}

/**
 * 클릭 효과 추가
 * @param {string} selector - 요소 선택자
 * @param {string} bgColor - 클릭 시 배경색
 */
function addClickEffect(selector, bgColor = '#f3f4f6') {
    document.querySelectorAll(selector).forEach(item => {
        item.addEventListener('click', function() {
            const originalBg = this.style.backgroundColor;
            this.style.backgroundColor = bgColor;
            setTimeout(() => {
                this.style.backgroundColor = originalBg;
            }, 150);
        });
    });
}

/**
 * 스케일 클릭 효과 추가
 * @param {string} selector - 요소 선택자
 */
function addScaleEffect(selector) {
    document.querySelectorAll(selector).forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

/**
 * 토글 기능 (expanded 클래스)
 * @param {string} elementId - 토글할 요소 ID
 */
function toggleExpand(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('expanded');
    }
}

/**
 * 날짜 포맷팅
 * @param {Date} date - 날짜 객체
 * @param {string} format - 포맷 ('YYYY/MM/DD', 'MM월 DD일' 등)
 * @returns {string} 포맷된 날짜 문자열
 */
function formatDate(date, format = 'YYYY/MM/DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
}

/**
 * 디바운스 함수
 * @param {Function} func - 실행할 함수
 * @param {number} wait - 대기 시간 (ms)
 * @returns {Function} 디바운스된 함수
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
