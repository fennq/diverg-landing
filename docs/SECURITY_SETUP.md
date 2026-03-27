# Diverg Security Headers Setup

Current scan score: **30/100 (F)** — all issues are missing HTTP headers and TLS config.
Target after setup: **94–97/100 (A)**.

---

## Step 1 — Fix TLS (2 minutes, Cloudflare dashboard)

Fixes: `TLSv1.0 accepted` and `TLSv1.1 accepted` (+16 points)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → select `divergsec.com`
2. **SSL/TLS** → **Edge Certificates**
3. Scroll to **Minimum TLS Version** → set to **TLS 1.2**
4. Save

---

## Step 2 — Deploy the Cloudflare Worker (5 minutes)

Fixes all remaining header issues (+51 points). The worker is in `cloudflare-worker.js`.

1. Go to **Workers & Pages** → **Create** → **Create Worker**
2. Name it `diverg-security-headers`
3. Paste the contents of `cloudflare-worker.js` into the editor
4. Click **Deploy**
5. Go to **Workers & Pages** → select the worker → **Settings** → **Triggers**
6. Under **Routes**, add: `divergsec.com/*`  (zone: divergsec.com)
7. Also add: `www.divergsec.com/*` if applicable

That's it. The worker will now inject all security headers and remove the `Access-Control-Allow-Origin: *` that GitHub Pages adds.

---

## Step 3 — Verify

Run the scan after deploying:

```bash
cd /Users/fen/Documents/diverg-auto
python3 -c "
import sys, warnings; warnings.filterwarnings('ignore'); sys.path.insert(0,'.')
from diverg_lite import scan
r = scan('https://divergsec.com', scan_type='standard')
print(r.to_markdown())
"
```

Expected result: **90–97/100 (A)**

The only remaining finding will be `Server: cloudflare` (Low, -3) which Cloudflare itself sets and cannot be removed on the free plan.

---

## Why not just the `_headers` file?

The `_headers` file in the repo works on **Netlify** and **Cloudflare Pages** — but the site is currently on **GitHub Pages**, which ignores it. The Worker approach works regardless of hosting.

If you ever move to Cloudflare Pages (recommended — same workflow, just push to GitHub), the `_headers` file will activate automatically and you can remove the Worker.
