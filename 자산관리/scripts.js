/* ========================================
   Asset Overview Scripts (자산관리 전용)
   ======================================== */

/**
 * 카테고리 카드 토글
 * @param {string} cardId - 카드 요소 ID
 */
function toggleCategory(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
        card.classList.toggle('expanded');
    }
}

/**
 * 연금 그룹 토글
 * @param {Event} event - 클릭 이벤트
 * @param {string} groupId - 그룹 요소 ID
 */
function togglePensionGroup(event, groupId) {
    event.stopPropagation();
    const group = document.getElementById(groupId);
    if (group) {
        group.classList.toggle('expanded');
    }
}
