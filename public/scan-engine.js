(function () {
  if (window.__scanEngineLoaded) return;
  window.__scanEngineLoaded = true;

  // ── Config ──────────────────────────────────────────────────────────
  var API_URL = window.ROOF_SCAN_API || 'http://localhost:3001';
  var DEFAULT_LAT = 37.6941;
  var DEFAULT_LNG = -122.0908;

  // ── State ───────────────────────────────────────────────────────────
  var state = {
    step: 1, address: '', roofData: null, scanResult: null,
    selectedTier: 'oc-supreme', lat: null, lng: null, mapsReady: false
  };

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return document.querySelectorAll(s); };

  // ── DOM refs ────────────────────────────────────────────────────────
  var ai = $('#address-input'), sb = $('#scan-btn'), dd = $('#address-dropdown');
  var s1 = $('#step-1'), s2 = $('#step-2'), s3 = $('#step-3');
  var sl = $('#scan-loading'), ss = $('#scan-status'), rl = $('#roof-legend');
  var cb = $('#continue-to-options'), ca = $('#change-address');
  var da = $('#display-address'), mb = $('#mobile-price-bar');

  // ── Google Maps (for autocomplete only) ─────────────────────────────
  var acs = null, gc = null, st = null;

  window.initRoofMap = function () {
    try {
      acs = new google.maps.places.AutocompleteService();
      gc = new google.maps.Geocoder();
      st = new google.maps.places.AutocompleteSessionToken();
      acs.getPlacePredictions(
        { input: 'test', types: ['address'], componentRestrictions: { country: 'us' } },
        function (p, s) { state.mapsReady = s !== google.maps.places.PlacesServiceStatus.REQUEST_DENIED; }
      );
    } catch (e) { state.mapsReady = false; }
  };
  window.gm_authFailure = function () { state.mapsReady = false; };

  function loadMaps() {
    if (window.__mapsLoaded) return;
    window.__mapsLoaded = true;
    var s = document.createElement('script');
    s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBGCiX3V0iXi1mtOKdes-3I2hXf5LJRls0&libraries=places&callback=initRoofMap';
    s.async = true; s.defer = true; s.onerror = function () {};
    document.head.appendChild(s);
  }
  ai.addEventListener('focus', loadMaps, { once: true });

  // ── Address autocomplete ────────────────────────────────────────────
  var dt = null;
  ai.addEventListener('input', function () {
    clearTimeout(dt);
    var v = ai.value.trim();
    if (v.length < 4) { dd.classList.add('hidden'); ai.setAttribute('aria-expanded', 'false'); return; }
    dt = setTimeout(function () {
      if (state.mapsReady && acs) {
        try {
          acs.getPlacePredictions({
            input: v, types: ['address'], componentRestrictions: { country: 'us' }, sessionToken: st
          }, function (predictions, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) { demoSug(v); return; }
            dd.innerHTML = predictions.slice(0, 5).map(function (p) {
              var safe = p.description.replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
              return '<div class="address-suggestion" role="option" data-place-id="' + p.place_id + '">' + safe + '</div>';
            }).join('');
            dd.classList.remove('hidden'); ai.setAttribute('aria-expanded', 'true');
          });
        } catch (e) { state.mapsReady = false; demoSug(v); }
      } else { demoSug(v); }
    }, 250);
  });

  function demoSug(q) {
    var ds = [
      { t: '21634 Redwood Rd, Castro Valley, CA 94546', a: 37.6941, o: -122.0908 },
      { t: '3785 Castro Valley Blvd, Castro Valley, CA 94546', a: 37.6944, o: -122.0864 },
      { t: '4500 Lincoln Ave, Oakland, CA 94602', a: 37.8044, o: -122.2156 },
      { t: '1600 Martin Luther King Jr Way, Berkeley, CA 94709', a: 37.8784, o: -122.2728 },
      { t: '350 Main St, Pleasanton, CA 94566', a: 37.6625, o: -121.8745 },
    ];
    var ql = q.toLowerCase();
    var m = ds.filter(function (a) { return a.t.toLowerCase().indexOf(ql) !== -1; });
    var r = m.length > 0 ? m : ds.slice(0, 3);
    dd.innerHTML = r.map(function (a) {
      return '<div class="address-suggestion" role="option" data-lat="' + a.a + '" data-lng="' + a.o + '">' + a.t + '</div>';
    }).join('');
    dd.classList.remove('hidden'); ai.setAttribute('aria-expanded', 'true');
  }

  dd.addEventListener('click', function (e) {
    var it = e.target.closest('.address-suggestion');
    if (!it) return;
    ai.value = it.textContent; state.address = it.textContent;
    dd.classList.add('hidden'); ai.setAttribute('aria-expanded', 'false');
    startScan(state.address);
  });

  sb.addEventListener('click', function () {
    if (ai.value.trim().length < 5) return;
    state.address = ai.value.trim();
    startScan(state.address);
  });

  ai.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); sb.click(); } });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('#address-input') && !e.target.closest('#address-dropdown')) {
      dd.classList.add('hidden'); ai.setAttribute('aria-expanded', 'false');
    }
  });

  // ── Scan orchestrator ───────────────────────────────────────────────
  var sip = false;

  function startScan(address) {
    if (sip) return;
    sip = true;
    goStep(2);
    da.textContent = address;
    sl.classList.remove('hidden');
    rl.classList.add('hidden');

    // Try real API first, fall back to demo
    tryRealApi(address)
      .then(function (result) {
        state.scanResult = result;
        renderRealScan(result);
        sip = false;
      })
      .catch(function (err) {
        console.warn('Real API unavailable, using demo mode:', err.message);
        runDemoScan();
      });
  }

  // ── Real API call ───────────────────────────────────────────────────
  function tryRealApi(address) {
    ss.textContent = 'Connecting to scan service...';
    return fetch(API_URL + '/api/roof-scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: address })
    }).then(function (res) {
      if (!res.ok) return res.json().then(function (d) { throw new Error(d.error || 'Scan failed'); });
      return res.json();
    });
  }

  function renderRealScan(result) {
    // Populate measurements from real data
    state.roofData = {
      sqft: Math.round(result.measurements.totalSquares * 100),
      pitch: result.facets[0] ? result.facets[0].pitchRatio : '6/12',
      facets: result.facets.length,
      ridges: result.measurements.ridgeLF + result.measurements.hipLF,
      valleys: result.measurements.valleyLF,
      eaves: result.measurements.eaveLF,
      complexity: result.measurements.totalSquares > 24 ? 'Complex' : result.measurements.totalSquares > 18 ? 'Moderate' : 'Simple'
    };

    populateMeasurements(state.roofData);
    sl.classList.add('hidden');
    rl.classList.remove('hidden');

    // Render roof visualization
    renderRoofMap(result);
  }

  function renderRoofMap(result) {
    var mapEl = $('#roof-map');

    // If we have GeoJSON facets, render them as colored SVG
    if (result.roofGeoJSON && result.roofGeoJSON.features.length > 0) {
      var bounds = result.dsm.bounds;
      var w = bounds.east - bounds.west;
      var h = bounds.north - bounds.south;

      var svgPaths = result.roofGeoJSON.features.map(function (f) {
        var coords = f.geometry.coordinates[0];
        var points = coords.map(function (c) {
          var x = ((c[0] - bounds.west) / w) * 400;
          var y = ((bounds.north - c[1]) / h) * 400;
          return x + ',' + y;
        }).join(' ');

        var pitch = f.properties.pitchDegrees;
        var color = pitch < 15 ? 'rgba(76,175,80,0.3)' : pitch < 30 ? 'rgba(255,193,7,0.3)' : 'rgba(244,67,54,0.3)';
        var stroke = pitch < 15 ? 'rgb(76,175,80)' : pitch < 30 ? 'rgb(255,193,7)' : 'rgb(244,67,54)';

        return '<polygon points="' + points + '" fill="' + color + '" stroke="' + stroke + '" stroke-width="1.5"/>';
      }).join('');

      mapEl.innerHTML = '<div style="width:100%;height:100%;background:#1e2d1e;position:relative;">' +
        '<div style="position:absolute;inset:0;background:linear-gradient(135deg,#2a3d2a,#1e2d1e 25%,#243424 50%,#1e2d1e 75%,#2a3d2a);"></div>' +
        '<svg viewBox="0 0 400 400" style="position:absolute;inset:0;width:100%;height:100%;" preserveAspectRatio="xMidYMid meet">' +
        svgPaths +
        '<text x="200" y="20" text-anchor="middle" fill="white" font-size="11" opacity="0.8">Imagery: ' + result.imageryDate + ' | ' + result.facets.length + ' facets detected</text>' +
        '</svg></div>';
    } else {
      renderDemoRoofSVG(mapEl);
    }
  }

  // ── Demo mode (no API) ──────────────────────────────────────────────
  function runDemoScan() {
    var mapEl = $('#roof-map');
    renderDemoRoofSVG(mapEl);

    var delay = function (t, ms) { return new Promise(function (r) { setTimeout(function () { ss.textContent = t; r(); }, ms); }); };
    delay('Locating property', 600)
      .then(function () { return delay('Capturing satellite imagery', 800); })
      .then(function () { return delay('Detecting roof edges', 1000); })
      .then(function () { return delay('Calculating measurements', 700); })
      .then(function () {
        state.roofData = genDemoData(DEFAULT_LAT, DEFAULT_LNG);
        populateMeasurements(state.roofData);
        sl.classList.add('hidden');
        rl.classList.remove('hidden');
        sip = false;
      });
  }

  function renderDemoRoofSVG(el) {
    el.innerHTML = '<div style="width:100%;height:100%;background:#1e2d1e;position:relative;overflow:hidden">' +
      '<div style="position:absolute;inset:0;background:linear-gradient(135deg,#2a3d2a,#1e2d1e 25%,#243424 50%,#1e2d1e 75%,#2a3d2a)"></div>' +
      '<div style="position:absolute;top:15%;left:15%;width:70%;height:70%;background:linear-gradient(145deg,#3a5a3a,#2d4a2d);border-radius:4px"></div>' +
      '<div style="position:absolute;bottom:15%;left:45%;width:12%;height:30%;background:#5a5a5a;border-radius:2px"></div>' +
      '<svg viewBox="0 0 400 400" style="position:absolute;inset:0;width:100%;height:100%" preserveAspectRatio="xMidYMid meet">' +
      '<polygon points="120,100 280,100 300,120 300,260 280,280 120,280 100,260 100,120" fill="rgba(196,112,75,.12)" stroke="rgb(196,112,75)" stroke-width="2.5"/>' +
      '<line x1="120" y1="100" x2="280" y2="280" stroke="rgb(196,112,75)" stroke-width="1.2" opacity=".5"/>' +
      '<line x1="280" y1="100" x2="120" y2="280" stroke="rgb(196,112,75)" stroke-width="1.2" opacity=".5"/>' +
      '<line x1="200" y1="100" x2="200" y2="280" stroke="rgb(196,112,75)" stroke-width="1.5" opacity=".6"/>' +
      '<text x="200" y="90" text-anchor="middle" fill="#fff" font-size="11" opacity=".9">62 ft</text>' +
      '<text x="310" y="195" fill="#fff" font-size="11" opacity=".9">48 ft</text>' +
      '<circle cx="200" cy="190" r="5" fill="rgb(37,99,70)" stroke="#fff" stroke-width="2"/>' +
      '</svg></div>';
  }

  function genDemoData(lat, lng) {
    var seed = Math.abs(Math.sin(lat * 1000 + lng * 500)) * 10000;
    var s = function (a, b) { return Math.floor(a + (seed % (b - a + 1))); };
    var sq = s(1400, 3200);
    return {
      sqft: sq, pitch: ['4/12', '5/12', '6/12', '7/12', '8/12', '9/12'][s(0, 5)],
      facets: s(6, 18), ridges: s(80, 220), valleys: s(2, 8), eaves: s(120, 300),
      complexity: sq > 2400 ? 'Complex' : sq > 1800 ? 'Moderate' : 'Simple'
    };
  }

  // ── Shared UI functions ─────────────────────────────────────────────
  function anim(id, start, end, dur, fmt) {
    var el = document.getElementById(id); if (!el) return;
    var t0 = performance.now();
    function tick(now) {
      var p = Math.min((now - t0) / dur, 1);
      el.textContent = fmt(Math.round(start + (end - start) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function populateMeasurements(d) {
    anim('meas-area', 0, d.sqft, 600, function (v) { return v.toLocaleString() + ' sq ft'; });
    setTimeout(function () { $('#meas-pitch').textContent = d.pitch; }, 200);
    anim('meas-facets', 0, d.facets, 400, function (v) { return '' + v; });
    anim('meas-ridges', 0, d.ridges, 500, function (v) { return v + ' ln ft'; });
    anim('meas-valleys', 0, d.valleys, 300, function (v) { return '' + v; });
    anim('meas-eaves', 0, d.eaves, 500, function (v) { return v + ' ln ft'; });
    setTimeout(function () {
      var el = $('#meas-complexity');
      el.textContent = d.complexity;
      el.style.color = d.complexity === 'Complex' ? 'rgb(196,112,75)' : d.complexity === 'Moderate' ? 'rgb(37,99,70)' : 'var(--color-charcoal)';
    }, 400);
  }

  function goStep(n) {
    state.step = n;
    [s1, s2, s3].forEach(function (s, i) { s.classList.toggle('hidden', i + 1 !== n); });
    $$('.step-dot').forEach(function (dot) {
      var s = parseInt(dot.dataset.step);
      dot.classList.toggle('active', s === n);
      dot.classList.toggle('completed', s < n);
      if (s === n) dot.setAttribute('aria-current', 'step'); else dot.removeAttribute('aria-current');
    });
    $$('.step-line').forEach(function (l, i) { l.classList.toggle('active', i + 1 < n); });
    if (n === 3 && window.innerWidth < 1024) {
      mb.classList.remove('hidden'); document.body.classList.add('has-mobile-bar');
    } else {
      mb.classList.add('hidden'); document.body.classList.remove('has-mobile-bar');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Step navigation events ──────────────────────────────────────────
  cb.addEventListener('click', function () { goStep(3); updatePrice(); $('#summary-address').textContent = state.address; });
  ca.addEventListener('click', function () { sip = false; goStep(1); ai.value = state.address; ai.focus(); });

  // ── Material selection ──────────────────────────────────────────────
  $$('.material-card').forEach(function (card) {
    card.addEventListener('click', function () {
      $$('.material-card').forEach(function (c) { c.classList.remove('selected'); });
      card.classList.add('selected');
      card.querySelector('input').checked = true;
      state.selectedTier = card.dataset.tier;
      updatePrice();
    });
  });

  $$('.color-swatches').forEach(function (c) {
    c.addEventListener('click', function (e) {
      var sw = e.target.closest('.swatch');
      if (!sw) return;
      c.querySelectorAll('.swatch').forEach(function (s) { s.classList.remove('active'); });
      sw.classList.add('active');
    });
  });

  $$('#addons input').forEach(function (c) { c.addEventListener('change', function () { updatePrice(); }); });

  // ── Pricing engine ──────────────────────────────────────────────────
  function updatePrice() {
    if (!state.roofData) return;
    var sq = state.roofData.sqft;
    var sc = $('.material-card[data-tier="' + state.selectedTier + '"]');
    var pps = parseFloat(sc.querySelector('[data-price-per-sqft]').dataset.pricePerSqft);
    var tm = sq * pps;
    var mt = Math.round(tm * 0.40), lb = Math.round(tm * 0.35);
    var tf = Math.round(tm * 0.15), pm = Math.round(tm * 0.10);

    // If we have real bid data, use it for the total but keep the breakdown visual
    if (state.scanResult && state.scanResult.bid) {
      // Scale real bid by tier ratio
      var baseTotal = state.scanResult.bid.total;
      var tierMultiplier = pps / 3.50; // ratio vs Good tier
      mt = Math.round(baseTotal * 0.40 * tierMultiplier);
      lb = Math.round(baseTotal * 0.35 * tierMultiplier);
      tf = Math.round(baseTotal * 0.15 * tierMultiplier);
      pm = Math.round(baseTotal * 0.10 * tierMultiplier);
    }

    var at = 0, as = $('#addons-summary');
    as.innerHTML = '';
    $$('#addons input:checked').forEach(function (c) {
      var p = parseInt(c.dataset.addonPrice);
      at += p;
      var r = document.createElement('div');
      r.className = 'flex justify-between'; r.style.fontSize = '15px';
      r.innerHTML = '<span style="color:var(--color-input)">' + c.parentElement.querySelector('.addon-label').textContent + '</span><span class="font-semibold text-charcoal">$' + p.toLocaleString() + '</span>';
      as.appendChild(r);
    });

    var tot = mt + lb + tf + pm + at, cs = Math.round(tot * 0.35);
    var f = function (v) { return '$' + v.toLocaleString(); };
    [['price-materials', mt], ['price-labor', lb], ['price-tearoff', tf], ['price-permits', pm], ['total-price', tot]].forEach(function (x) {
      var el = document.getElementById(x[0]); if (!el) return;
      anim(x[0], parseInt(el.textContent.replace(/[$,]/g, '')) || 0, x[1], 400, f);
    });

    var te = $('#total-price');
    te.classList.add('price-updating');
    setTimeout(function () { te.classList.remove('price-updating'); }, 300);
    $('#monthly-price').textContent = '$' + Math.round(tot / 60).toLocaleString() + '/mo';
    $('#commission-savings').textContent = '$' + cs.toLocaleString();

    $$('.material-card').forEach(function (c) {
      var p = parseFloat(c.querySelector('[data-price-per-sqft]').dataset.pricePerSqft);
      c.querySelector('.tier-price').textContent = Math.round(sq * p).toLocaleString();
    });

    var mt2 = $('#mobile-total-price');
    if (mt2) mt2.textContent = '$' + tot.toLocaleString();
  }

  // ── Auto-start from ?address= param ─────────────────────────────────
  var ua = new URLSearchParams(window.location.search).get('address');
  if (ua && ua.trim().length >= 5) {
    ai.value = ua; state.address = ua; loadMaps();
    s1.classList.add('hidden');
    sip = false;
    startScan(ua);
  }
})();
