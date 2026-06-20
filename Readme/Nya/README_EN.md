# Steam Total Spending Check - Tampermonkey Script
## Read docs in other meow languages
### MainDocs
[简体中文](/README.md) | [English](/Readme/README_EN.md) | [日本語](/Readme/README_JP.md) | [繁體中文](/Readme/README_ZH.md)

### NekoDocs
[简体喵语](/Readme/Nya/README.md) | Lolcat | [NYA](/Readme/Nya/README_JP.md) | [繁體喵语](/Readme/Nya/README_ZH.md)

Trying to tally up how much gold I’ve blown on Steam is such a total hassle every single time~
Steam’s official billing page forces you to manually spam the load button nonstop, and sorting purchases and refunds by hand makes this kitty’s brain go all fuzzy (´• ω •`)ﾉ
That’s why this kitty crafted this ultra-light, fluffy Tampermonkey script **Steam Expense Counter Helper**!
It auto-scrapes your full billing history, auto-sorts every order type, auto-calculates total spending & full refunds. Multi-currency, multi-language, local cache supported, and it runs super smoothly without lagging your tab!

## Super Fluffy Kitty Exclusive Features
### One-Click Full Billing History Scan & Stats ✨
Head to Steam’s transaction [history page](https://store.steampowered.com/account/history)
A cute little button labelled "View Spending Stats" will pop up automatically on the page—just click it and leave everything to this kitty!
- Automatically loop through "Load More" to grab your complete transaction log, capped at 120 pages and behaves perfectly without glitching out
- Smartly recognizes currency symbols from all regions, works flawlessly with Steam worldwide
- This kitty’s clever sorting separates purchases and refunds, calculating three vital money stats instantly:
	-  Gross Total Spent: Full original payment amount of every order (including orders you later refunded)
	-  Total Refunded: Sum of all cash successfully returned to your wallet
	-  Actual Net Money Wasted = Gross Total Spent − Total Refunded (the real amount drained from your piggy bank)

### Blazing Fast Local Cache Boost ⚡
- Stats data cached for 5 whole minutes; rechecking quickly won’t re-scan the entire page again for silky-smooth performance
- Once the cache expires, clicking the button again will re-fetch your latest bills and recalculate everything fresh

### Auto-Shifting Multilingual Support 🌍
It automatically switches languages matching your Steam webpage setting! All buttons and popups carry that fluffy catgirl vibe:
- Simplified Chinese
- Traditional Chinese
- English


### Multi-Layer Anti-Crash Protection Barrier 🛡️
- Waits 450ms between loading each page to avoid flooding Steam’s servers with requests
- Dual monitoring system guarantees the stat button always renders properly, with an 800ms periodic scan for rock-solid stability
- Auto-shuts down background scanning after 30 seconds of inactivity to save browser resources
- If data loading hits an error, it’ll gently prompt you "Refresh the page and try again, okay?"
- Duplicate click interceptor prevents sending redundant repeated data requests

## Custom Config Tuning (Catgirl Exclusive Mode)
Tweak the script’s running parameters by editing the `cfg` section at the very top of the code~

```javascript
const cfg = {
    maxPage: 120,    // Max bill pages kitty can load, raise if needed, limit 200n
    wait: 450,       // Page load delay, set 800~1000 for laggy network meow
    cacheTime: 300000, // Stat cache lifespan(ms), 300000 = 5 mins
    domTick: 800     // DOM check interval, no changes needed normally
};
```

# Fluffy Installation & Beginner Guide
## Mandatory Prerequisite
Install the **Tampermonkey** extension on your browser first! Fully compatible with Chrome, Edge, Firefox and Opera~

## One-Click Kitty Script Install
Exclusive Greasy Fork script link: https://greasyfork.org/scripts/583431
Open the link and tap "Install this script" to import it straight into Tampermonkey!

## Super Simple Step-by-Step Usage
- Log into your Steam web account
- Navigate to the dedicated transaction history page: https://store.steampowered.com/account/history
- The fluffy "View Spending Stats" button will automatically appear at the bottom of the page
- Give it a soft click, then sit back and let this kitty load all your historical bills automatically
- Once data retrieval finishes, a popup will display your gross spending, total refunds, and real net expenditure

# Kitty’s Secret Whispers
This entire script runs purely locally on your browser—zero billing logs, account details or personal data get uploaded to any third-party servers whatsoever!
No ads, no hidden background data calls, lightweight and non-intrusive to your page, safe and utterly adorable (๑>ᴗ<๑)
If you wanna find out exactly how much treasure you’ve splurged on Steam, hurry up and install this script right meow!
If you hit any snags while using it, feel free to call out to this kitty in the comment section!