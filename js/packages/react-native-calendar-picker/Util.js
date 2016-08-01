/**
 * Calendar Picker Component
 * By Stephani Alves - April 11, 2015
 */
'use strict';

module.exports = {
  WEEKDAYS: [
    '日', '一', '二', '三', '四', '五', '六'
  ],
  MONTHS: [
    '一月', '二月', '三月', '四月', '五月', '六月', '七月',
    '八月', '九月', '十月', '十一月', '十二月'
  ],
  MAX_ROWS: 7,
  MAX_COLUMNS: 7,
  getDaysInMonth: function(month, year) {
    var lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth.getDate();
  },
};
