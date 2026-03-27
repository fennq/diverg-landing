const SECURITY_HEADERS = {
  "Strict-Transport-Security":         "max-age=31536000; includeSubDomains; preload",
  "Content-Security-Policy":           "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' https:; connect-src 'self' https://formsubmit.co; frame-src https://formsubmit.co; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://formsubmit.co; upgrade-insecure-requests",
  "X-Frame-Options":                   "DENY",
  "X-Content-Type-Options":            "nosniff",
  "Referrer-Policy":                   "strict-origin-when-cross-origin",
  "Permissions-Policy":                "geolocation=(), microphone=(), camera=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy":        "same-origin",
  "Cross-Origin-Resource-Policy":      "same-site",
  "X-Permitted-Cross-Domain-Policies": "none",
};

export default {
  async fetch(request, env, ctx) {
    const response = await fetch(request);
    const newHeaders = new Headers(response.headers);

    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      newHeaders.set(name, value);
    }

    // Remove the Access-Control-Allow-Origin: * that GitHub Pages forces on every response
    newHeaders.delete("Access-Control-Allow-Origin");

    return new Response(response.body, {
      status:     response.status,
      statusText: response.statusText,
      headers:    newHeaders,
    });
  },
};
