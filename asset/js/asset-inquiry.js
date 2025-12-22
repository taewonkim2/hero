/* ========================================
   Asset Inquiry Scripts (자산조회 전용)
   ======================================== */

// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 카테고리 펼치기 초기화
    initCategoryExpand();

    // 이벤트 바인딩
    bindEventListeners();
});

/* ========================================
   초기화 함수
   ======================================== */
function initCategoryExpand() {
    const allCategories = document.querySelectorAll('.category-content');

    allCategories.forEach(function(category) {
        category.classList.add('active');
        category.style.maxHeight = category.scrollHeight + "px";

        const card = category.closest('.category-card');
        const icon = card.querySelector('.category-expand-icon');

        if (icon) {
            icon.classList.add('expanded');
            icon.style.transform = 'rotate(225deg)';
            icon.dataset.deg = "225";
        }
    });
}

/* ========================================
   이벤트 바인딩
   ======================================== */
function bindEventListeners() {
    // Back 버튼
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            history.back();
        });
    }

    // 자산연결하기 버튼
    const depositBtn = document.querySelector('.asset-deposit-btn');
    if (depositBtn) {
        depositBtn.addEventListener('click', function() {
            openBottomSheet();
        });
    }

    // 자산변동 정보 아이콘
    const changeInfoIcon = document.querySelector('.asset-change-info-icon');
    if (changeInfoIcon) {
        changeInfoIcon.addEventListener('click', function(event) {
            openTooltip(event);
        });
    }

    // 카테고리 헤더 (투자/은행/보험)
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            toggleCategory(this);
        });
    });

    // 기관별 총자산 토글
    const institutionTotals = document.querySelectorAll('.institution-total');
    institutionTotals.forEach(function(total) {
        total.addEventListener('click', function(event) {
            toggleInstitution(event, this);
        });
    });

    // 툴팁 오버레이
    const tooltipOverlay = document.getElementById('tooltipOverlay');
    if (tooltipOverlay) {
        tooltipOverlay.addEventListener('click', function() {
            closeTooltip();
        });
    }

    // 툴팁 내부 클릭 시 버블링 방지
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    // 툴팁 닫기 버튼
    const tooltipClose = document.querySelector('.tooltip-close');
    if (tooltipClose) {
        tooltipClose.addEventListener('click', function() {
            closeTooltip();
        });
    }

    // 바텀시트 오버레이
    const bottomSheetOverlay = document.getElementById('bottomSheetOverlay');
    if (bottomSheetOverlay) {
        bottomSheetOverlay.addEventListener('click', function() {
            closeBottomSheet();
        });
    }

    // 바텀시트 내부 클릭 시 버블링 방지
    const bottomSheet = document.querySelector('.bottom-sheet');
    if (bottomSheet) {
        bottomSheet.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    // 바텀시트 닫기 버튼
    const bottomSheetClose = document.querySelector('.bottom-sheet-close');
    if (bottomSheetClose) {
        bottomSheetClose.addEventListener('click', function() {
            closeBottomSheet();
        });
    }

    // 키움자산만 볼래요 버튼
    const kiwoomOnlyBtn = document.querySelector('.bottom-sheet-btn:not(.primary)');
    if (kiwoomOnlyBtn) {
        kiwoomOnlyBtn.addEventListener('click', function() {
            selectKiwoomOnly();
        });
    }

    // 다른 기관도 연결할래요 버튼
    const connectOtherBtn = document.querySelector('.bottom-sheet-btn.primary');
    if (connectOtherBtn) {
        connectOtherBtn.addEventListener('click', function() {
            closeBottomSheet();
        });
    }
}

/* ========================================
   카테고리 토글
   ======================================== */
function toggleCategory(element) {
    const expandIcon = element.querySelector('.category-expand-icon');
    const card = element.closest('.category-card');
    const contentSection = card.querySelector('.category-content');

    if (expandIcon) {
        let currentDeg = expandIcon.dataset.deg ? parseInt(expandIcon.dataset.deg) : 45;
        currentDeg += 180;
        expandIcon.style.transform = 'rotate(' + currentDeg + 'deg)';
        expandIcon.dataset.deg = currentDeg;
        expandIcon.classList.toggle('expanded');
    }

    if (contentSection) {
        if (contentSection.style.maxHeight) {
            contentSection.style.maxHeight = null;
            contentSection.classList.remove('active');
        } else {
            contentSection.classList.add('active');
            contentSection.style.maxHeight = contentSection.scrollHeight + "px";
        }
    }
}

/* ========================================
   기관별 상세 토글
   ======================================== */
function toggleInstitution(event, element) {
    event.stopPropagation();
    const expandIcon = element.querySelector('.expand-icon');
    const card = element.closest('.institution-card');
    const detailsSection = card.querySelector('.institution-details');

    if (expandIcon) {
        expandIcon.classList.toggle('expanded');
        let currentDeg = expandIcon.dataset.deg ? parseInt(expandIcon.dataset.deg) : 45;
        currentDeg += 180;
        expandIcon.style.transform = 'rotate(' + currentDeg + 'deg)';
        expandIcon.dataset.deg = currentDeg;
    }

    if (detailsSection) {
        const parentContent = card.closest('.category-content');

        if (detailsSection.style.maxHeight) {
            detailsSection.style.maxHeight = null;
            detailsSection.classList.remove('active');
        } else {
            detailsSection.classList.add('active');
            detailsSection.style.maxHeight = detailsSection.scrollHeight + "px";

            if (parentContent && parentContent.style.maxHeight) {
                parentContent.style.maxHeight = (parentContent.scrollHeight + detailsSection.scrollHeight) + "px";
            }
        }
    }
}

/* ========================================
   키움자산만 볼래요 클릭
   ======================================== */
function selectKiwoomOnly() {
    closeBottomSheet();
    showToast('키움증권 자산만 조회하도록 설정되었습니다');
}
