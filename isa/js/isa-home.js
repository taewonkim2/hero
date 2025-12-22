/* ========================================
   ISA Home 페이지 전용 스크립트
   ======================================== */

// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    bindEventListeners();
    initAnimations();
    initCarouselIndicators();

    // 차트 초기화 (약간의 지연 후)
    setTimeout(function() {
        drawChart('1M');
    }, 100);
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

    // 상단 네비 서브메뉴 아이템
    var navSubmenuItem = document.querySelector('.top-nav-submenu-item');
    if (navSubmenuItem) {
        navSubmenuItem.addEventListener('click', function() {
            navigateTo('isa_balance');
        });
    }

    // 오버레이 (드롭다운 닫기)
    var overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeMoreMenu();
        });
    }

    // More 메뉴 버튼
    var moreMenuBtn = document.querySelector('.more-menu-btn');
    if (moreMenuBtn) {
        moreMenuBtn.addEventListener('click', function(event) {
            toggleMoreMenu(event);
        });
    }

    // More 드롭다운 아이템들
    var dropdownItems = document.querySelectorAll('.more-dropdown-item');
    dropdownItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            if (index === 0) {
                location.href = 'isa_account_info.html';
            } else if (index === 1) {
                navigateTo('close-account');
            } else if (index === 2) {
                navigateTo('reregister');
            }
        });
    });

    // 연장하기/IRP 전환 버튼들
    var extendBtns = document.querySelectorAll('.extend-btn');
    extendBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            openExtendPage();
        });
    });

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

    // 잔고 전체보기 링크
    var balanceMore = document.querySelector('.balance-more');
    if (balanceMore) {
        balanceMore.addEventListener('click', function() {
            location.href = 'isa_balance.html';
        });
    }

    // 입금/출금 버튼들
    var depositBtns = document.querySelectorAll('.deposit-btn');
    depositBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            navigateTo('deposit');
        });
    });

    // 카테고리 헤더들 (주식, 펀드, 채권, ELS, WRAP)
    var categoryHeaders = document.querySelectorAll('.category-header[data-category]');
    categoryHeaders.forEach(function(header) {
        var categoryId = header.getAttribute('data-category');
        header.addEventListener('click', function() {
            toggleCategory(categoryId);
        });
    });

    // 메뉴 칩들
    var chips = document.querySelectorAll('.menu-chips .chip');
    chips.forEach(function(chip, index) {
        chip.addEventListener('click', function() {
            if (index === 0) {
                location.href = 'isa_history.html';
            } else if (index === 1) {
                navigateTo('savings');
            }
        });
    });

    // 절세금액 카드
    var taxCard = document.querySelector('.tax_card');
    if (taxCard) {
        taxCard.addEventListener('click', function() {
            location.href = 'isa_tax_saving.html';
        });
    }

    // 납입현황 카드
    var benefitCard = document.querySelector('.benefit-card');
    if (benefitCard) {
        benefitCard.addEventListener('click', function() {
            location.href = 'isa_tax_saving.html';
        });
    }

    // ISA 알아보기 카드들
    var infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(function(card, index) {
        card.addEventListener('click', function() {
            if (index === 0) {
                navigateTo('isa_guide');
            } else if (index === 1) {
                playVideo('intro');
            } else if (index === 2) {
                navigateTo('tax_guide');
            } else if (index === 3) {
                playVideo('strategy');
            }
        });
    });

    // 메뉴 탭
    var menuTab = document.querySelector('.menu-tab');
    if (menuTab) {
        menuTab.addEventListener('click', function() {
            location.href = '../index.html';
        });
    }

    // 하단 탭바 아이템들
    var tabItems = document.querySelectorAll('.bottom-tab-bar .tab-item');
    var tabNames = ['isa_home', 'isa_account', 'isa_join', 'isa_task'];
    tabItems.forEach(function(tab, index) {
        tab.addEventListener('click', function() {
            switchTab(tabNames[index], this);
        });
    });

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.more-menu-container')) {
            closeMoreMenu();
        }
    });
}

/* ========================================
   More Menu Toggle
   ======================================== */
function toggleMoreMenu(event) {
    event.stopPropagation();
    var dropdown = document.getElementById('moreDropdown');
    var overlay = document.getElementById('overlay');
    dropdown.classList.toggle('show');
    overlay.classList.toggle('show');
}

function closeMoreMenu() {
    var dropdown = document.getElementById('moreDropdown');
    var overlay = document.getElementById('overlay');
    dropdown.classList.remove('show');
    overlay.classList.remove('show');
}

/* ========================================
   페이지 이동 함수들
   ======================================== */
function openExtendPage() {
    console.log('Opening extend page');
    alert('만기연장 신청 페이지로 이동합니다.');
}

function playVideo(videoId) {
    console.log('Playing video: ' + videoId);
    alert('영상을 재생합니다.');
}

/* ========================================
   탭 전환 (페이지 전용 - 서브메뉴 기능 포함)
   ======================================== */
function switchTab(tabName, element) {
    // Remove active from all tabs
    document.querySelectorAll('.tab-item').forEach(function(tab) {
        tab.classList.remove('active');
    });
    // Add active to clicked tab
    element.classList.add('active');

    var navSubmenu = document.getElementById('navSubmenu');

    // 서브메뉴 데이터
    var submenus = {
        'isa_home': [],
        'isa_account': [
            { label: 'ISA잔고', page: 'isa_balance' },
            { label: '거래내역', page: 'isa_history' },
            { label: '절세현황/한도', page: 'isa_tax' },
            { label: '계좌정보', page: 'isa_info' }
        ],
        'isa_join': [
            { label: 'ISA소개', page: 'isa_intro' },
            { label: 'ISA가입', page: 'isa_signup' },
            { label: 'ISA이전', page: 'isa_transfer' }
        ],
        'isa_task': [
            { label: '만기연장', page: 'isa_extend' },
            { label: '연금전환', page: 'isa_pension' },
            { label: '발급번호 재등록', page: 'isa_reregister' }
        ]
    };

    var items = submenus[tabName] || [];
    navSubmenu.innerHTML = items.map(function(item) {
        if (item.page === 'isa_balance') {
            return '<span class="top-nav-submenu-item" data-page="isa_balance.html">' + item.label + '</span>';
        }
        if (item.page === 'isa_history') {
            return '<span class="top-nav-submenu-item" data-page="isa_history.html">' + item.label + '</span>';
        }
        if (item.page === 'isa_tax') {
            return '<span class="top-nav-submenu-item" data-page="isa_tax_saving.html">' + item.label + '</span>';
        }
        if (item.page === 'isa_info') {
            return '<span class="top-nav-submenu-item" data-page="isa_account_info.html">' + item.label + '</span>';
        }
        return '<span class="top-nav-submenu-item" data-nav="' + item.page + '">' + item.label + '</span>';
    }).join('');

    // 동적으로 생성된 서브메뉴에 이벤트 바인딩
    var submenuItems = navSubmenu.querySelectorAll('.top-nav-submenu-item');
    submenuItems.forEach(function(submenuItem) {
        submenuItem.addEventListener('click', function() {
            var page = this.getAttribute('data-page');
            var nav = this.getAttribute('data-nav');
            if (page) {
                location.href = page;
            } else if (nav) {
                navigateTo(nav);
            }
        });
    });

    console.log('Switching to tab: ' + tabName);
}

/* ========================================
   Category toggle function
   ======================================== */
function toggleCategory(categoryId) {
    var content = document.getElementById('content-' + categoryId);
    var toggle = document.getElementById('toggle-' + categoryId);

    if (content && toggle) {
        content.classList.toggle('collapsed');
        toggle.classList.toggle('collapsed');
    }
}

/* ========================================
   Chart functions
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

    // Canvas 크기 설정
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // 기간별 데이터
    var data = {
        '1M': [42.1, 43.2, 42.8, 44.5, 43.9, 44.2, 45.1, 44.8, 45.3, 45.7],
        '3M': [38.5, 39.2, 40.1, 41.3, 40.8, 42.5, 43.1, 44.2, 44.8, 45.7],
        '6M': [35.2, 36.8, 38.1, 37.5, 39.2, 41.0, 42.3, 43.5, 44.1, 45.7],
        '1Y': [30.5, 32.1, 34.5, 36.2, 38.0, 39.5, 41.2, 43.0, 44.5, 45.7]
    };

    var values = data[period] || data['1M'];
    var width = rect.width;
    var height = rect.height;
    var padding = { top: 20, right: 20, bottom: 30, left: 50 };

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate scales
    var minVal = Math.min.apply(null, values) * 0.95;
    var maxVal = Math.max.apply(null, values) * 1.02;
    var xStep = (width - padding.left - padding.right) / (values.length - 1);
    var yScale = (height - padding.top - padding.bottom) / (maxVal - minVal);

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (var i = 0; i <= 4; i++) {
        var y = padding.top + (height - padding.top - padding.bottom) * i / 4;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();

        // Y axis labels
        var val = maxVal - (maxVal - minVal) * i / 4;
        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px Noto Sans KR';
        ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(1) + '백만', padding.left - 8, y + 4);
    }

    // Draw line chart
    ctx.beginPath();
    ctx.strokeStyle = '#1a73e8';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    values.forEach(function(val, i) {
        var x = padding.left + i * xStep;
        var chartY = padding.top + (maxVal - val) * yScale;
        if (i === 0) {
            ctx.moveTo(x, chartY);
        } else {
            ctx.lineTo(x, chartY);
        }
    });
    ctx.stroke();

    // Draw gradient fill
    var gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(26, 115, 232, 0.3)');
    gradient.addColorStop(1, 'rgba(26, 115, 232, 0)');

    ctx.beginPath();
    values.forEach(function(val, i) {
        var x = padding.left + i * xStep;
        var chartY = padding.top + (maxVal - val) * yScale;
        if (i === 0) {
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

    // Draw dots
    values.forEach(function(val, i) {
        var x = padding.left + i * xStep;
        var chartY = padding.top + (maxVal - val) * yScale;
        ctx.beginPath();
        ctx.arc(x, chartY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#1a73e8';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, chartY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    });
}

/* ========================================
   Carousel scroll indicator
   ======================================== */
function initCarouselIndicators() {
    document.querySelectorAll('.carousel-container').forEach(function(carousel) {
        carousel.addEventListener('scroll', function() {
            var section = carousel.closest('.carousel-section');
            var indicator = section ? section.querySelector('.swipe-indicator') : null;
            if (!indicator) return;

            var scrollLeft = carousel.scrollLeft;
            var firstChild = carousel.querySelector(':first-child');
            var itemWidth = firstChild ? firstChild.offsetWidth + 12 : 100;
            var activeIndex = Math.round(scrollLeft / itemWidth);

            indicator.querySelectorAll('.swipe-dot').forEach(function(dot, i) {
                if (i === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    });
}

/* ========================================
   Animate elements on scroll
   ======================================== */
function initAnimations() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-in').forEach(function(el) {
        el.style.opacity = '0';
        observer.observe(el);
    });
}
