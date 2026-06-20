// ==UserScript==
// @name                Steam消费总额查看
// @name:en             Steam Spend Tracker
// @namespace           http://tampermonkey.net/
// @version             1.0.0
// @description         Efficiently read all bills to calculate spending, refunds, and net expenses
// @description:zh-CN                 高效读取全部账单计算消费、退款、净支出
// @description:zh-TW         高效讀取全部帳單計算消費、退款、淨支出
// @grant               none
// @author       hee1310
// @run-at              document-idle
// @match               https://store.steampowered.com/account/history*
// @match               https://store.steampowered.com/*
// @match               https://steamcommunity.com/*
// @exclude             https://store.steampowered.com/app/*
// @exclude             https://store.steampowered.com/dlc/*
// @exclude             https://steamcommunity.com/workshop/*
// ==/UserScript==

(function() {
    'use strict';

    const cfg = {
        maxPage: 120,
        wait: 450,
        cacheTime: 300000,
        domTick: 800
    };

    const lang = {
        'zh-CN': {
            link: '消费记录',
            btn: '查看消费统计',
            load: '正在加载所有账单...',
            empty: '账号暂无任何消费记录',
            total: '总支出（含退款订单）：',
            refund: '累计退款总额：',
            net: '实际净支出：',
            err: '账单加载失败，请刷新页面重试'
        },
        'zh-TW': {
            link: '消費紀錄',
            btn: '檢視消費統計',
            load: '載入帳單中...',
            empty: '帳號尚無消費紀錄',
            total: '總支出(含退款訂單)：',
            refund: '累計退款總額：',
            net: '實際淨支出：',
            err: '載入失敗，請重整頁面'
        },
        en: {
            link: 'Expenses Record',
            btn: 'View Spending Stats',
            load: 'Loading transactions...',
            empty: 'No transaction records found',
            total: 'Total Gross Spending: ',
            refund: 'Total Refund: ',
            net: 'Net Actual Spent: ',
            err: 'Load failed, refresh page'
        }
    };

    const state = {
        loading: false,
        pageCnt: 0,
        cache: { data: null, time: 0 },
        timer: null
    };

    const $ = s => document.querySelector(s);
    const $$ = s => Array.from(document.querySelectorAll(s));

    function el(tag, opt = {}) {
        const dom = document.createElement(tag);
        for (let k in opt) {
            if (k === 'onclick') dom.addEventListener('click', opt[k]);
            else dom[k] = opt[k];
        }
        return dom;
    }

    function getTxt() {
        const l = $('html')?.lang || '';
        if (l.toLowerCase() === 'zh-tw') return lang['zh-TW'];
        if (l.startsWith('zh')) return lang['zh-CN'];
        return lang.en;
    }
    const txt = getTxt();

    function fmtMoney(n) {
        n = Number(n) || 0;
        return (Math.round(n * 100) / 100).toFixed(2);
    }

    function getNum(str) {
        const s = str.replace(/,(?=\d{3})/g, '');
        const m = s.match(/\d+(?:\.\d+)?/);
        return m ? +m[0] : 0;
    }

    function getCurrency() {
        const row = $$('tbody .wht_total')[0];
        if (!row) return '';
        const t = row.innerText.trim();
        const num = t.match(/\d+(?:\.\d+)?/)?.[0] || '';
        return t.replace(num, '').trim();
    }

    function calc() {
        const rows = $$('tbody .wht_total');
        if (!rows.length) return null;
        let gross = 0, ref = 0;
        rows.forEach(r => {
            const v = getNum(r.innerText);
            if (v <= 0) return;
            gross += v;
            if (r.classList.contains('wht_refunded')) ref += v;
        });
        return {
            sym: getCurrency(),
            gross: fmtMoney(gross),
            refund: fmtMoney(ref),
            net: fmtMoney(gross - ref)
        };
    }

    async function loadAll(btn) {
        if (state.loading) return;
        const now = Date.now();
        if (state.cache.data && now - state.cache.time < cfg.cacheTime) {
            const d = state.cache.data;
            alert(`${txt.total}${d.sym}${d.gross}\n${txt.refund}${d.sym}${d.refund}\n${txt.net}${d.sym}${d.net}`);
            return;
        }

        state.loading = true;
        state.pageCnt = 0;
        const oldText = btn.innerText;
        btn.innerText = txt.load;

        try {
            const nextPage = async () => {
                const moreBtn = $('#load_more_button');
                if (!moreBtn || moreBtn.style.display === 'none' || state.pageCnt >= cfg.maxPage) return false;
                state.pageCnt++;
                moreBtn.click();
                await new Promise(res => setTimeout(res, cfg.wait));
                return true;
            };
            let run = true;
            while (run) run = await nextPage();

            const res = calc();
            state.cache = { data: res, time: now };
            if (!res) alert(txt.empty);
            else alert(`${txt.total}${res.sym}${res.gross}\n${txt.refund}${res.sym}${res.refund}\n${txt.net}${res.sym}${res.net}`);
        } catch (e) {
            alert(txt.err);
        } finally {
            state.loading = false;
            btn.innerText = oldText;
        }
    }

    function drawUI() {
        const bar = $('#global_actions') || $('#global_action_bar');
        const menu = $('#global_action_menu');
        if (bar && menu && !$('.steam-spend-link')) {
            const a = el('a', {
                className: 'steam-spend-link',
                href: '/account/history/',
                style: 'vertical-align:top;margin-right:12px;color:#c7d5e0;text-decoration:none',
                innerText: txt.link
            });
            bar.insertBefore(a, menu);
        }

        if (location.pathname.includes('/account/history')) {
            const wrap = $('.account_management .page_content') || $('.account_page_content');
            if (wrap && !$('.steam-spend-btn')) {
                const b = el('button', {
                    className: 'steam-spend-btn',
                    style: 'margin-top:10px;padding:6px 12px;background:#1b2838;color:#c7d5e0;border:1px solid #445060;cursor:pointer',
                    innerText: txt.btn,
                    onclick: function() { loadAll(this); }
                });
                wrap.appendChild(b);
            }
        }
    }

    const ob = new MutationObserver(drawUI);
    ob.observe(document.body, { childList: true, subtree: true });
    drawUI();
    state.timer = setInterval(drawUI, cfg.domTick);
    setTimeout(() => clearInterval(state.timer), 30000);
})();