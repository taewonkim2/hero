/* ============================================
   ISA Balance 페이지 전용 JavaScript
   ============================================ */

// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    bindEventListeners();
    initKakaoPopup();

    // 차트 초기화
    setTimeout(function() {
        drawChart('1M');
    }, 100);

    // 초기 상태: 전체 탭 선택
    switchProductTab('all');
});

/* ========================================
   이벤트 바인딩
   ======================================== */
function bindEventListeners() {
    // Back 버튼
    var backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            goBack();
        });
    }

    // 상단 네비 서브메뉴 아이템들
    var submenuItems = document.querySelectorAll('.top-nav-submenu-item');
    submenuItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            if (index === 0) {
                navigateTo('isa_balance');
            } else if (index === 1) {
                location.href = 'isa_history.html';
            } else if (index === 2) {
                location.href = 'isa_tax_saving.html';
            } else if (index === 3) {
                location.href = 'isa_account_info.html';
            }
        });
    });

    // 자산 토글 버튼
    var assetToggle = document.getElementById('assetToggle');
    if (assetToggle) {
        assetToggle.addEventListener('click', function() {
            toggleAssetDetails();
        });
    }

    // 차트 헤더 (토글)
    var chartHeader = document.querySelector('.chart-header');
    if (chartHeader) {
        chartHeader.addEventListener('click', function() {
            toggleChart();
        });
    }

    // 기간 버튼들
    var periodBtns = document.querySelectorAll('.period-btn');
    periodBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var period = this.textContent;
            var periodMap = {
                '1개월': '1M',
                '3개월': '3M',
                '6개월': '6M',
                '1년': '1Y'
            };
            changePeriod(periodMap[period] || '1M', this);
        });
    });

    // Product tab 클릭
    document.querySelectorAll('.product-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            var category = this.getAttribute('data-category');
            switchProductTab(category);
        });
    });

    // Holding main 클릭 (종목별 상세 토글)
    document.querySelectorAll('.holding-main').forEach(function(main) {
        main.addEventListener('click', function() {
            var holdingItem = this.closest('.holding-item');
            var toggle = holdingItem.querySelector('.holding-toggle');

            if (toggle) {
                var toggleId = toggle.id;
                if (toggleId && toggleId.startsWith('toggle-')) {
                    var holdingId = toggleId.replace('toggle-', '');

                    // 카카오는 팝업으로 열기
                    if (holdingId === 'kakao' || holdingItem.querySelector('.holding-icon.kakao')) {
                        openKakaoPopup();
                    } else {
                        toggleHolding(holdingId);
                    }
                }
            }
        });
    });

    // 카카오 팝업 오버레이 클릭
    var kakaoOverlay = document.getElementById('kakaoPopupOverlay');
    if (kakaoOverlay) {
        kakaoOverlay.addEventListener('click', function() {
            closeKakaoPopup();
        });
    }

    // 카카오 팝업 닫기 버튼
    var kakaoCloseBtn = document.querySelector('#kakaoHalfPopup .popup-close-btn');
    if (kakaoCloseBtn) {
        kakaoCloseBtn.addEventListener('click', function() {
            closeKakaoPopup();
        });
    }

    // 메뉴 탭
    var menuTab = document.querySelector('.menu-tab');
    if (menuTab) {
        menuTab.addEventListener('click', function() {
            openSideMenu();
        });
    }

    // 하단 탭바 아이템들
    var tabItems = document.querySelectorAll('.bottom-tab-bar .tab-item');
    tabItems.forEach(function(tab, index) {
        tab.addEventListener('click', function() {
            if (index === 0) {
                location.href = 'isa_home.html';
            } else if (index === 1) {
                // 현재 페이지 (ISA계좌)
            } else if (index === 2) {
                switchTab('isa_join');
            } else if (index === 3) {
                switchTab('isa_task');
            }
        });
    });
}

/* ========================================
   카카오 반팝업 열기/닫기 (페이지 전용)
   ======================================== */
function openKakaoPopup() {
    openHalfPopup('kakaoPopupOverlay', 'kakaoHalfPopup');
}

function closeKakaoPopup() {
    closeHalfPopup('kakaoPopupOverlay', 'kakaoHalfPopup');
}

function initKakaoPopup() {
    // ESC 키로 팝업 닫기
    initEscKeyHandler(closeKakaoPopup);

    // 스와이프로 팝업 닫기
    initPopupSwipe('kakaoHalfPopup', closeKakaoPopup);
}

/* ========================================
   차트 관련 함수
   ======================================== */
function changePeriod(period, element) {
    document.querySelectorAll('.period-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    element.classList.add('active');
    drawChart(period);
}

function drawChart(period) {
    period = period || '1M';
    var canvas = document.getElementById('profitChart');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 150 * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '150px';

    var data = {
        '1M': [42.1, 43.2, 42.8, 44.5, 43.9, 44.2, 45.1, 44.8, 45.3, 45.7],
        '3M': [38.5, 39.2, 40.1, 41.3, 40.8, 42.5, 43.1, 44.2, 44.8, 45.7],
        '6M': [35.2, 36.8, 38.1, 37.5, 39.2, 41.0, 42.3, 43.5, 44.1, 45.7],
        '1Y': [30.5, 32.1, 34.5, 36.2, 38.0, 39.5, 41.2, 43.0, 44.5, 45.7]
    };

    var values = data[period] || data['1M'];
    var width = rect.width;
    var height = 150;
    var padding = { top: 15, right: 15, bottom: 25, left: 45 };

    ctx.clearRect(0, 0, width, height);

    var minVal = Math.min.apply(null, values) * 0.95;
    var maxVal = Math.max.apply(null, values) * 1.02;
    var xStep = (width - padding.left - padding.right) / (values.length - 1);
    var yScale = (height - padding.top - padding.bottom) / (maxVal - minVal);

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (var i = 0; i <= 4; i++) {
        var y = padding.top + (height - padding.top - padding.bottom) * i / 4;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();

        var val = maxVal - (maxVal - minVal) * i / 4;
        ctx.fillStyle = '#9ca3af';
        ctx.font = '10px Noto Sans KR';
        ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(1) + '백만', padding.left - 6, y + 3);
    }

    ctx.beginPath();
    ctx.strokeStyle = '#1a73e8';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    values.forEach(function(val, idx) {
        var x = padding.left + idx * xStep;
        var chartY = padding.top + (maxVal - val) * yScale;
        if (idx === 0) {
            ctx.moveTo(x, chartY);
        } else {
            ctx.lineTo(x, chartY);
        }
    });
    ctx.stroke();

    var gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(26, 115, 232, 0.2)');
    gradient.addColorStop(1, 'rgba(26, 115, 232, 0)');

    ctx.beginPath();
    values.forEach(function(val, idx) {
        var x = padding.left + idx * xStep;
        var chartY = padding.top + (maxVal - val) * yScale;
        if (idx === 0) {
            ctx.moveTo(x, chartY);
        } else {
            ctx.lineTo(x, chartY);
        }
    });
    ctx.lineTo(padding.left + (values.length - 1) * xStep, height - padding.bottom);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    values.forEach(function(val, idx) {
        var x = padding.left + idx * xStep;
        var chartY = padding.top + (maxVal - val) * yScale;
        ctx.beginPath();
        ctx.arc(x, chartY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#1a73e8';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, chartY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    });
}

/* ========================================
   상품별 자산 데이터
   ======================================== */
var assetData = {
    'all': {
        value: '45,678,900원',
        profit: '▲ 3,456,700원',
        rate: '+8.18%',
        isPositive: true,
        purchase: '42,222,200원',
        evaluation: '45,678,900원',
        cash: '678,900원'
    },
    'stock': {
        value: '23,550,000원',
        profit: '▲ 1,567,500원',
        rate: '+7.14%',
        isPositive: true,
        purchase: '21,982,500원',
        evaluation: '23,550,000원',
        cash: '0원'
    },
    'domestic-bond': {
        value: '8,210,000원',
        profit: '▲ 210,000원',
        rate: '+2.63%',
        isPositive: true,
        purchase: '8,000,000원',
        evaluation: '8,210,000원',
        cash: '0원'
    },
    'foreign-bond': {
        value: '4,280,000원',
        profit: '▲ 280,000원',
        rate: '+7.00%',
        isPositive: true,
        purchase: '4,000,000원',
        evaluation: '4,280,000원',
        cash: '0원'
    },
    'els': {
        value: '3,170,000원',
        profit: '▲ 170,000원',
        rate: '+5.67%',
        isPositive: true,
        purchase: '3,000,000원',
        evaluation: '3,170,000원',
        cash: '0원'
    },
    'fund': {
        value: '13,170,000원',
        profit: '▲ 1,170,000원',
        rate: '+9.75%',
        isPositive: true,
        purchase: '12,000,000원',
        evaluation: '13,170,000원',
        cash: '0원'
    },
    'rp': {
        value: '8,015,500원',
        profit: '▲ 15,500원',
        rate: '+0.19%',
        isPositive: true,
        purchase: '8,000,000원',
        evaluation: '8,015,500원',
        cash: '0원'
    },
    'note': {
        value: '10,075,000원',
        profit: '▲ 75,000원',
        rate: '+0.75%',
        isPositive: true,
        purchase: '10,000,000원',
        evaluation: '10,075,000원',
        cash: '0원'
    }
};

/* ========================================
   탭 전환 및 자산 정보 업데이트 함수
   ======================================== */
function switchProductTab(category) {
    // 모든 탭 비활성화
    document.querySelectorAll('.product-tab').forEach(function(t) {
        t.classList.remove('active');
    });
    // 선택된 탭 활성화
    var selectedTab = document.querySelector('.product-tab[data-category="' + category + '"]');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // 모든 holdings-section 숨기기
    document.querySelectorAll('.holdings-section').forEach(function(section) {
        section.style.display = 'none';
    });

    // 선택된 카테고리의 holdings-section 표시
    if (category === 'all') {
        // 전체 선택 시 모든 섹션 표시
        document.querySelectorAll('.holdings-section').forEach(function(section) {
            section.style.display = 'block';
        });
    } else {
        // 특정 카테고리만 표시
        var targetSection = document.querySelector('.holdings-section[data-category="' + category + '"]');
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }

    // asset-card 금액 업데이트
    var data = assetData[category];
    if (data) {
        var assetValue = document.querySelector('.asset-value');
        if (assetValue) {
            assetValue.textContent = data.value;
        }

        var profitAmount = document.querySelector('.profit-amount');
        if (profitAmount) {
            profitAmount.textContent = data.profit;
            profitAmount.className = 'profit-amount ' + (data.isPositive ? 'positive' : 'negative');
        }

        var profitRate = document.querySelector('.profit-rate');
        if (profitRate) {
            profitRate.textContent = data.rate;
        }

        // 상세 정보 업데이트
        var detailValues = document.querySelectorAll('.detail-value');
        if (detailValues.length >= 3) {
            detailValues[0].textContent = data.purchase;
            detailValues[1].textContent = data.evaluation;
            detailValues[2].textContent = data.cash;
        }
    }
}
