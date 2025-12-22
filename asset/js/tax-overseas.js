/* ========================================
   Tax Overseas Scripts (해외주식양도세 전용)
   ======================================== */

// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    bindEventListeners();
});

/* ========================================
   이벤트 바인딩
   ======================================== */
function bindEventListeners() {
    // Back 버튼
    var backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            history.back();
        });
    }

    // 토글 스위치 (타사 포함)
    var toggleSwitch = document.querySelector('.toggle-switch');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('click', function() {
            toggleSwitchHandler(this);
        });
    }

    // Tax Summary 헤더 (접기/펼치기)
    var taxSummaryHeader = document.querySelector('.tax-summary-header');
    if (taxSummaryHeader) {
        taxSummaryHeader.addEventListener('click', function() {
            toggleTaxSummary();
        });
    }

    // 탭 아이템들
    var tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var tabType = this.textContent.includes('해외') ? 'overseas' : 'income';
            switchTab(tabType, this);
        });
    });

    // 섹션 정보 아이콘 (팝업 열기)
    var infoIcons = document.querySelectorAll('.section-info-icon');
    infoIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            openPopup('taxInfoPopup');
        });
    });

    // 팝업 오버레이 (닫기)
    var popupOverlay = document.getElementById('taxInfoPopupOverlay');
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function() {
            closePopup('taxInfoPopup');
        });
    }

    // 팝업 닫기 버튼
    var popupClose = document.querySelector('#taxInfoPopup .popup-close');
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            closePopup('taxInfoPopup');
        });
    }

    // 팝업 확인 버튼
    var popupButton = document.querySelector('#taxInfoPopup .popup-button');
    if (popupButton) {
        popupButton.addEventListener('click', function() {
            closePopup('taxInfoPopup');
        });
    }
}

/* ========================================
   토글 스위치 핸들러
   ======================================== */
function toggleSwitchHandler(element) {
    element.classList.toggle('active');
    var statusText = element.nextElementSibling;
    if (statusText) {
        statusText.textContent = element.classList.contains('active') ? 'ON' : 'OFF';
    }
}

// 기존 toggleSwitch 함수 호환성 유지
function toggleSwitch(element) {
    toggleSwitchHandler(element);
}

/* ========================================
   Tax Summary 접기/펼치기
   ======================================== */
function toggleTaxSummary() {
    var incomeTreeGroup = document.getElementById('incomeTreeGroup');
    var taxTreeGroup = document.getElementById('taxTreeGroup');
    var icon = document.getElementById('taxSummaryIcon');

    if (incomeTreeGroup) {
        incomeTreeGroup.classList.toggle('hidden');
    }
    if (taxTreeGroup) {
        taxTreeGroup.classList.toggle('hidden');
    }
    if (icon) {
        icon.classList.toggle('expanded');
    }
}

/* ========================================
   탭 전환 (해외주식양도세 / 종합소득세)
   ======================================== */
function switchTab(tabType, clickedTab) {
    // 모든 탭 비활성화
    document.querySelectorAll('.tab-item').forEach(function(tab) {
        tab.classList.remove('active');
    });

    // 클릭된 탭 활성화
    if (clickedTab) {
        clickedTab.classList.add('active');
    }

    var overseasSection = document.getElementById('section-overseas');
    var incomeSections = [
        document.getElementById('section-interest'),
        document.getElementById('section-pension'),
        document.getElementById('section-other'),
        document.getElementById('section-employment'),
        document.getElementById('section-business')
    ];

    if (tabType === 'overseas') {
        if (overseasSection) {
            overseasSection.classList.remove('hidden');
        }
        incomeSections.forEach(function(section) {
            if (section) {
                section.classList.add('hidden');
            }
        });
    } else {
        if (overseasSection) {
            overseasSection.classList.add('hidden');
        }
        incomeSections.forEach(function(section) {
            if (section) {
                section.classList.remove('hidden');
            }
        });
    }
}
