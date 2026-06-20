# Steam Total Spending Check - Tampermonkey Script
## Read Documentation in Other Languages
### Root Directory Documents
[简体中文](README/README.md) | English | [日本語](README/README_JP.md) | [繁體中文](README/README_ZH.md)

### Nya Version Documents
[简体喵语](README/Nya/README.md) | [Lolcat](README/Nya/README_EN.md) | [NYA](README/Nya/README_JP.md) | [繁體喵语](README/Nya/README_ZH.md)

It has always been troublesome to calculate the total money spent on Steam by yourself. Steam’s official transaction history is paginated, so you need to keep clicking "Load More" manually, separately distinguish purchases and refunds one by one, and calculate amounts manually.

To fix this issue, I developed a lightweight Tampermonkey script named **Steam Total Spending Check**. It automatically fetches all billing records, distinguishes order types, calculates total spending and refunds automatically, supports multi-region currencies, multi-language display, local cache and multiple anti-freeze mechanisms.

## Core Script Features
### One-Click Full Billing Record Statistics✨
After entering the Steam transaction [history page](https://store.steampowered.com/account/history) , a button labeled "View Spending Statistics" will render automatically on the page. Click it to start the full statistics process automatically:
- Automatically loop to click the "Load More" pagination button to pull all historical bills, with a maximum limit of 120 pages to prevent page freezing from infinite loading
- Automatically identify page currency symbols, compatible with various currencies across all global Steam regions
- Intelligently separate purchase orders and refund orders, and automatically calculate three key figures:
	- Total Charged: Original amount of all orders (including orders that were later fully or partially refunded)
	- Total Refunded: Sum of all refund amounts
	- Net Actual Spending = Total Charged − Total Refunded (your real out-of-pocket cost)

### Local Cache Acceleration⚡
- Statistics results are cached locally for 5 minutes. Repeated clicks within this window will not reload all pages, greatly boosting speed and reducing page lag
- Once the cache expires, clicking the button again will re-fetch all billing records and recalculate the latest data

### Automatic Multi-Language Support🌍
The script auto-detects the Steam webpage language and switches all popups and button text accordingly. Three languages are currently supported:
- Simplified Chinese (zh-CN)
- Traditional Chinese (zh-TW)
- English

### Multi-Layer Anti-Freeze & Error Handling🛡️
- A 450ms delay between each page load to reserve rendering buffer time for Steam, avoiding rate limits from overly frequent requests
- Dual guarantee for proper button rendering: MutationObserver node monitoring + 800ms periodic DOM scan
- The periodic DOM scanner auto-shuts down after 30 seconds to lower browser resource usage
- Global error capture for page loading failures, with pop-up error prompts guiding users to refresh and retry
- Loading lock blocks duplicate clicks to avoid concurrent duplicate billing requests

## Custom Configuration Parameters
You can edit the `cfg` object at the top of the script code to adjust operational parameters.

```javascript
const cfg = {
    maxPage: 120,    // Maximum pages for bill reading, increase if there are massive bills, upper limit 200
    wait: 450,       // Single page loading waiting time, set to 800~1000 for poor network
    cacheTime: 300000, // Data cache expiration time (ms), 300000 equals 5 minutes
    domTick: 800     // Page element detection interval, no adjustment needed under normal circumstances
};
```

# Installation & Usage Guide
## Prerequisite
Install the **Tampermonkey** browser extension. Supported browsers include Chrome, Edge, Firefox and Opera.

## One-Click Script Installation
Greasy Fork script link: <https://greasyfork.org/scripts/583431>
Open the link and click "Install this script" to import it into Tampermonkey in one step.

## Usage Steps
- Log in to Steam Web Store
- Open the transaction history page: https://store.steampowered.com/account/history
- A "View Spending Statistics" button will appear at the bottom of the page
- Click the button and wait for all billing records to load automatically
- Once finished, a popup will display total charged amount, total refunds and your net actual spending

# Final Notes
This script runs entirely locally in your browser. It never uploads any billing or account data to third-party servers. There are no ads or background external requests; it is lightweight and non-intrusive to the webpage.

If you want to quickly tally up years of your Steam game expenses, feel free to install and try it out. You may leave comments for any usage issues encountered.