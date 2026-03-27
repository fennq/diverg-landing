(function() {
  var form = document.getElementById('demo-form');
  var successEl = document.getElementById('demo-success');
  var successEmail = document.getElementById('success-email');
  var nextInput = document.getElementById('form-next');
  if (nextInput) {
    var o = window.location.origin, p = window.location.pathname.replace(/\/+$/, '') || '/';
    var ok = /^https:\/\/divergsec\.com$/i.test(o) || /^https?:\/\/localhost(:\d+)?$/i.test(o);
    if (ok) nextInput.value = o + p + '?submitted=1';
  }
  if (new URLSearchParams(window.location.search).get('submitted') === '1') {
    var raw = sessionStorage.getItem('diverg_demo_email') || '';
    if (successEmail) successEmail.textContent = raw.replace(/[<>"&]/g, '');
    if (successEl) successEl.hidden = false;
    if (form) form.hidden = true;
  }
  if (form) {
    form.addEventListener('submit', function() {
      var e = document.getElementById('email');
      if (e && e.value) sessionStorage.setItem('diverg_demo_email', e.value.trim().slice(0, 254));
    });
  }
})();
