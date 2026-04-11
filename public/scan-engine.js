(function () {
  if (window.__scanEngineLoaded) return;
  window.__scanEngineLoaded = true;

  // ── Config ──────────────────────────────────────────────────────────
  var API_URL = window.BACKEND_URL || 'http://localhost:3001';
  var DEFAULT_LAT = 37.6941;
  var DEFAULT_LNG = -122.0908;

  // ── State ───────────────────────────────────────────────────────────
  var state = {
    step: 1, address: '', roofData: null, scanResult: null,
    selectedTier: 'gaf-hdz', lat: null, lng: null, mapsReady: false
  };

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return document.querySelectorAll(s); };

  // ── DOM refs ────────────────────────────────────────────────────────
  var ai = $('#address-input'), sb = $('#scan-btn'), dd = $('#address-dropdown');
  var s1 = $('#step-1'), s2 = $('#step-2'), s3 = $('#step-3');
  var sl = $('#scan-loading'), ss = $('#scan-status'), rl = $('#roof-legend');
  var cb = $('#continue-to-options'), ca = $('#change-address');
  var da = $('#display-address'), mb = $('#mobile-price-bar');

  // ── Service Area Validation ─────────────────────────────────────────
  // Scan works across Northern/Central California — Google Solar API has coverage
  var SERVICE_STATES = ['california', ', ca', ' ca '];
  var SERVICE_CITIES = [
    // Bay Area
    'oakland','berkeley','alameda','fremont','hayward','san leandro','castro valley',
    'dublin','pleasanton','livermore','union city','newark','emeryville',
    'walnut creek','concord','richmond','antioch','pittsburg','brentwood','san ramon',
    'danville','martinez','pleasant hill','lafayette','orinda','moraga','el cerrito',
    'san francisco','daly city','south san francisco',
    'san mateo','redwood city','menlo park','burlingame','san carlos','foster city',
    'belmont','half moon bay','pacifica','millbrae','san bruno','east palo alto',
    'san jose','santa clara','sunnyvale','mountain view','palo alto','milpitas',
    'cupertino','campbell','saratoga','los gatos','gilroy','morgan hill','los altos',
    // Sacramento metro
    'sacramento','elk grove','roseville','folsom','rancho cordova','citrus heights',
    'rocklin','davis','woodland','west sacramento','carmichael','fair oaks','orangevale',
    'lincoln','loomis','granite bay','el dorado hills','placerville','auburn',
    // Stockton / San Joaquin
    'stockton','lodi','tracy','manteca','modesto','turlock','merced','lathrop','ripon',
    // Solano / Napa
    'vallejo','fairfield','vacaville','benicia','napa','sonoma','petaluma','santa rosa',
    'san rafael','novato','mill valley','larkspur','calistoga','yountville',
    'american canyon','st. helena','healdsburg','windsor','sebastopol','rohnert park',
    // Other NorCal
    'santa cruz','watsonville','salinas','monterey','fresno','visalia','bakersfield',
    'chico','redding','eureka','san luis obispo','paso robles'
  ];

  function isInServiceArea(addr) {
    if (!addr) return false;
    var lower = addr.toLowerCase();
    // Check if it's in California at all
    for (var i = 0; i < SERVICE_STATES.length; i++) {
      if (lower.indexOf(SERVICE_STATES[i]) !== -1) return true;
    }
    for (var i = 0; i < SERVICE_CITIES.length; i++) {
      if (lower.indexOf(SERVICE_CITIES[i]) !== -1) return true;
    }
    return false;
  }

  function showServiceAreaError() {
    goStep(1);
    var errEl = $('#service-area-error');
    if (errEl) {
      errEl.innerHTML = 'We currently serve California.<br><strong>Please enter a California address.</strong>';
      errEl.classList.remove('hidden');
    }
    ai.value = '';
    ai.focus();
  }

  // ── Mapbox Address Autocomplete ──────────────────────────────────────
  var MAPBOX_TOKEN = window.MAPBOX_TOKEN || '';

  function loadMaps() { /* no-op — Mapbox uses fetch, no script to load */ }

  // ── Address autocomplete (Mapbox Search API) ────────────────────────
  var dt = null;
  var sessionToken = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);

  ai.addEventListener('input', function () {
    clearTimeout(dt);
    var v = ai.value.trim();
    if (v.length < 4) { dd.classList.add('hidden'); ai.setAttribute('aria-expanded', 'false'); return; }
    dt = setTimeout(function () {
      if (!MAPBOX_TOKEN) { demoSug(v); return; }
      fetch('https://api.mapbox.com/search/searchbox/v1/suggest?q=' + encodeURIComponent(v) +
        '&types=address&country=us&language=en&limit=5&bbox=-123.1,36.9,-121.2,38.9' +
        '&session_token=' + sessionToken + '&access_token=' + MAPBOX_TOKEN)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data.suggestions || data.suggestions.length === 0) { demoSug(v); return; }
          dd.innerHTML = data.suggestions.map(function (s) {
            var text = s.full_address || s.name || '';
            var safe = text.replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
            return '<div class="address-suggestion" role="option" data-mapbox-id="' + (s.mapbox_id || '') + '">' + safe + '</div>';
          }).join('');
          dd.classList.remove('hidden'); ai.setAttribute('aria-expanded', 'true');
        })
        .catch(function () { demoSug(v); });
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
    // If Mapbox suggestion, retrieve full details for lat/lng
    var mbId = it.dataset.mapboxId;
    if (mbId && MAPBOX_TOKEN) {
      fetch('https://api.mapbox.com/search/searchbox/v1/retrieve/' + mbId +
        '?session_token=' + sessionToken + '&access_token=' + MAPBOX_TOKEN)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.features && data.features[0]) {
            var coords = data.features[0].geometry.coordinates;
            state.lat = coords[1]; state.lng = coords[0];
          }
          sessionToken = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
          if (!isInServiceArea(state.address)) { showServiceAreaError(); return; }
          startScan(state.address);
        })
        .catch(function () {
          if (!isInServiceArea(state.address)) { showServiceAreaError(); return; }
          startScan(state.address);
        });
    } else {
      if (!isInServiceArea(state.address)) { showServiceAreaError(); return; }
      startScan(state.address);
    }
  });

  sb.addEventListener('click', function () {
    if (ai.value.trim().length < 5) return;
    state.address = ai.value.trim();
    if (!isInServiceArea(state.address)) { showServiceAreaError(); return; }
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
        // If error mentions quality/imagery, show error modal
        if (err.message && (err.message.indexOf('quality') !== -1 || err.message.indexOf('HIGH') !== -1 || err.message.indexOf('not found') !== -1)) {
          showScanError(err.message);
        } else {
          // API just not running — fall back to demo
          runDemoScan();
        }
      });
  }

  // ── Real API call ───────────────────────────────────────────────────
  function tryRealApi(address) {
    ss.textContent = 'Connecting to scan service...';
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 30000);
    return fetch(API_URL + '/api/roof-scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: address }),
      signal: controller.signal
    }).then(function (res) {
      clearTimeout(timeout);
      if (!res.ok) return res.json().then(function (d) { throw new Error(d.error || 'Scan failed'); });
      return res.json();
    }).catch(function (err) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') throw new Error('Scan timed out — please try again');
      throw err;
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

    // If we have GeoJSON facets, render them as colored SVG over satellite imagery
    if (result.roofGeoJSON && result.roofGeoJSON.features.length > 0) {
      var ib = result.imageBounds || result.dsm.bounds;
      var minX = ib.west, maxX = ib.east;
      var minY = ib.south, maxY = ib.north;
      var w = maxX - minX;
      var h = maxY - minY;

      // Build SVG polygon overlay
      var svgPaths = result.roofGeoJSON.features.map(function (f) {
        var coords = f.geometry.coordinates[0];
        var points = coords.map(function (c) {
          var x = ((c[0] - minX) / w) * 400;
          var y = ((maxY - c[1]) / h) * 400;
          return x + ',' + y;
        }).join(' ');

        return '<polygon points="' + points + '" fill="rgba(37,99,70,0.25)" stroke="rgba(255,222,33,0.9)" stroke-width="2"/>';
      }).join('');

      // Build Mapbox Static Image URL for satellite background
      var token = window.MAPBOX_TOKEN;
      var cLng = (minX + maxX) / 2;
      var cLat = (minY + maxY) / 2;
      var bgStyle = 'background:#1e2d1e';
      if (token) {
        // Build GeoJSON overlay for Mapbox (green fill, yellow stroke)
        var overlay = {
          type: 'FeatureCollection',
          features: result.roofGeoJSON.features.map(function (f) {
            return {
              type: 'Feature',
              geometry: f.geometry,
              properties: { 'stroke': '#FFDE21', 'stroke-width': 2, 'stroke-opacity': 0.9, 'fill': '#256346', 'fill-opacity': 0.25 }
            };
          })
        };
        var geoStr = encodeURIComponent(JSON.stringify(overlay));
        var satUrl = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/geojson(' + geoStr + ')/' + cLng.toFixed(6) + ',' + cLat.toFixed(6) + ',19,0/600x600@2x?access_token=' + token;
        bgStyle = 'background:url(' + satUrl + ') center/cover no-repeat';
      }

      mapEl.innerHTML = '<div style="width:100%;height:100%;position:relative;">' +
        '<div style="position:absolute;inset:0;' + bgStyle + ';border-radius:4px;"></div>' +
        '<svg viewBox="0 0 400 400" style="position:absolute;inset:0;width:100%;height:100%;opacity:0;" preserveAspectRatio="xMidYMid meet">' +
        svgPaths +
        '</svg>' +
        '<div style="position:absolute;bottom:8px;left:0;right:0;text-align:center;">' +
        '<span style="background:rgba(0,0,0,0.55);color:white;font-size:11px;padding:3px 10px;border-radius:3px;">' +
        result.imageryDate + ' &middot; ' + result.facets.length + ' facets detected</span></div>' +
        '</div>';
    } else {
      renderDemoRoofSVG(mapEl);
    }
  }

  // ── Demo mode (no API) ──────────────────────────────────────────────
  function runDemoScan() {
    var mapEl = $('#roof-map');
    renderDemoRoofSVG(mapEl);

    var delay = function (t, ms) {
      return new Promise(function (r) {
        if (prefersReducedMotion) { ss.textContent = t; r(); return; }
        setTimeout(function () { ss.textContent = t; r(); }, ms);
      });
    };
    delay('Locating property', 600)
      .then(function () { return delay('Capturing satellite imagery', 800); })
      .then(function () { return delay('Detecting roof edges', 1000); })
      .then(function () { return delay('Calculating measurements', 700); })
      .then(function () {
        state.roofData = genDemoData(DEFAULT_LAT, DEFAULT_LNG);
        state.isDemo = true;
        populateMeasurements(state.roofData);
        sl.classList.add('hidden');
        rl.classList.remove('hidden');
        sip = false;
        // Show demo banner
        var banner = document.getElementById('demo-banner');
        if (banner) banner.classList.remove('hidden');
        // Change purchase CTA text in demo mode
        var purchaseBtn = document.getElementById('purchase-btn');
        if (purchaseBtn) purchaseBtn.textContent = 'Request Your Quote';
        var mobilePurchaseBtn = document.getElementById('mobile-purchase-btn');
        if (mobilePurchaseBtn) mobilePurchaseBtn.textContent = 'Request Quote';
      })
      .catch(function () {
        sl.classList.add('hidden');
        sip = false;
        showScanError('Something went wrong. Please try again or call us for a quote.');
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
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function anim(id, start, end, dur, fmt) {
    var el = document.getElementById(id); if (!el) return;
    if (prefersReducedMotion) { el.textContent = fmt(end); return; }
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

  function goStep(n, fromPopstate) {
    state.step = n;
    // ── Analytics: track funnel steps ──
    var stepNames = { 1: 'address_entry', 2: 'roof_scan_viewed', 3: 'shingle_selection' };
    if (window.op && stepNames[n]) window.op('track', 'scan_funnel_step', { step: n, step_name: stepNames[n], address: state.address || '' });
    if (window.dataLayer && stepNames[n]) window.dataLayer.push({ event: 'scan_funnel_step', step: n, step_name: stepNames[n] });
    // Push browser history so back button navigates between steps
    if (!fromPopstate && n > 1) {
      var url = new URL(window.location);
      url.searchParams.set('step', n);
      history.pushState({ step: n }, '', url);
    }
    // Remove the pre-paint hiding style if going back to step 1
    if (n === 1) {
      var hideStyle = document.getElementById('hide-step1');
      if (hideStyle) hideStyle.remove();
      s1.removeAttribute('style');
    }
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
  cb.addEventListener('click', function () {
    goStep(3); updatePrice(); $('#summary-address').textContent = state.address;
    var s3addr = $('#step3-address'); if (s3addr) s3addr.textContent = state.address;
  });
  ca.addEventListener('click', function () { sip = false; goStep(1); ai.value = state.address; ai.focus(); });

  // ── Step 3 edit address link ────────────────────────────────────────
  var s3edit = $('#step3-edit-address');
  if (s3edit) s3edit.addEventListener('click', function () { sip = false; goStep(1); ai.value = state.address; ai.focus(); });

  // ── Clickable completed step dots for back-navigation ──────────────
  $$('.step-dot').forEach(function (dot) {
    dot.addEventListener('click', function () {
      var target = parseInt(dot.dataset.step);
      if (target >= state.step) return; // only allow going backward
      if (target === 1) { sip = false; goStep(1); ai.value = state.address; ai.focus(); }
      else if (target === 2) { goStep(2); }
    });
  });

  // ── Material selection ──────────────────────────────────────────────
  $$('.material-card').forEach(function (card) {
    card.setAttribute('role', 'radio');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-checked', card.classList.contains('selected') ? 'true' : 'false');
    card.addEventListener('click', function () {
      $$('.material-card').forEach(function (c) { c.classList.remove('selected'); c.setAttribute('aria-checked', 'false'); });
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');
      var inp = card.querySelector('input');
      if (inp) inp.checked = true;
      state.selectedTier = card.dataset.tier;
      updatePrice();
      // Analytics: shingle selection
      var tierName = card.querySelector('.text-lg') ? card.querySelector('.text-lg').textContent.trim() : card.dataset.tier;
      if (window.op) window.op('track', 'shingle_selected', { tier: card.dataset.tier, name: tierName });
      if (window.dataLayer) window.dataLayer.push({ event: 'shingle_selected', tier: card.dataset.tier });
      if (typeof fbq === 'function') fbq('track', 'AddToCart', { content_name: tierName, content_ids: [card.dataset.tier], content_type: 'product' });
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });

  $$('.color-swatches').forEach(function (c) {
    c.setAttribute('role', 'radiogroup');
    c.addEventListener('click', function (e) {
      var sw = e.target.closest('.swatch');
      if (!sw) return;
      c.querySelectorAll('.swatch').forEach(function (s) { s.classList.remove('active'); s.setAttribute('aria-checked', 'false'); });
      sw.classList.add('active');
      sw.setAttribute('aria-checked', 'true');
    });
  });

  $$('.swatch').forEach(function (sw) {
    sw.setAttribute('role', 'radio');
    sw.setAttribute('tabindex', '0');
    sw.setAttribute('aria-checked', sw.classList.contains('active') ? 'true' : 'false');
    sw.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sw.click(); }
    });
  });

  $$('#addons input').forEach(function (c) { c.addEventListener('change', function () { updatePrice(); }); });


  // ── Pricing engine ──────────────────────────────────────────────────
  function updatePrice() {
    if (!state.roofData) return;
    var sq = state.roofData.sqft;
    var sc = $('.material-card[data-tier="' + state.selectedTier + '"]');
    if (!sc) return;
    var priceEl = sc.querySelector('[data-price-per-sqft]');
    var pricePerSq = priceEl ? parseFloat(priceEl.dataset.pricePerSqft) : 9.50;
    // pricePerSq is $/square (100 sqft), e.g. 9.50 = $950/sq
    var numSquares = sq / 100;
    var tm = numSquares * pricePerSq * 100; // total in dollars
    var mt = Math.round(tm * 0.40), lb = Math.round(tm * 0.35);
    var tf = Math.round(tm * 0.15), pm = Math.round(tm * 0.10);

    // If we have real bid data, use it for the total but keep the breakdown visual
    if (state.scanResult && state.scanResult.bid) {
      // Scale real bid by tier ratio
      var baseTotal = state.scanResult.bid.total;
      var tierMultiplier = pricePerSq / 9.50; // ratio vs HDZ base tier
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
      var pEl = c.querySelector('[data-price-per-sqft]');
      var tpEl = c.querySelector('.tier-price');
      if (!pEl || !tpEl) return;
      var p = parseFloat(pEl.dataset.pricePerSqft);
      tpEl.textContent = Math.round(numSquares * p * 100).toLocaleString();
    });

    var mt2 = $('#mobile-total-price');
    if (mt2) mt2.textContent = '$' + tot.toLocaleString();
    // Update mobile product name
    var mpn = document.getElementById('mobile-product-name');
    if (mpn) {
      var sc = $('.material-card.selected');
      var nameEl = sc ? (sc.querySelector('.text-lg.font-semibold') || sc.querySelector('h3')) : null;
      mpn.textContent = nameEl ? nameEl.textContent.trim() : '';
    }
  }

  // ── Tier group collapse/expand ───────────────────────────────────────
  $$('.tier-toggle').forEach(function (btn) {
    var groupName = btn.dataset.tierGroup;
    var group = document.querySelector('.tier-group[data-tier-group="' + groupName + '"]');
    if (!group) return;
    // Start collapsed
    group.classList.add('collapsed');
    btn.classList.add('collapsed');
    btn.addEventListener('click', function () {
      group.classList.toggle('collapsed');
      btn.classList.toggle('collapsed');
    });
  });

  // ── Measurement info tooltips ─────────────────────────────────────
  $$('.meas-info').forEach(function (btn) {
    var tip = btn.getAttribute('data-tip');
    if (!tip) return;
    var el = document.createElement('span');
    el.className = 'meas-tip';
    el.textContent = tip;
    btn.appendChild(el);
  });

  // ── Swatch preview on hover/click ──────────────────────────────────
  var preview = $('#swatch-preview');
  var previewImg = $('#swatch-preview-img');
  var previewName = $('#swatch-preview-name');

  if (previewImg) {
    previewImg.addEventListener('error', function () {
      preview.classList.add('hidden');
    });
  }
  if (preview) {
    $$('.swatch').forEach(function (sw) {
      sw.addEventListener('mouseenter', function (e) {
        var bg = sw.style.backgroundImage;
        if (!bg || bg === 'none') return;
        var url = bg.replace(/url\(["']?/, '').replace(/["']?\)/, '');
        previewImg.src = url;
        previewName.textContent = sw.getAttribute('aria-label') || '';
        preview.classList.remove('hidden');
        var rect = sw.getBoundingClientRect();
        preview.style.left = Math.max(10, rect.left - 50) + 'px';
        preview.style.top = (rect.top - 150) + 'px';
      });
      sw.addEventListener('mouseleave', function () {
        preview.classList.add('hidden');
      });
    });
  }

  // ── Purchase modal ───────────────────────────────────────────────────
  var purchaseModal = $('#purchase-modal');
  var purchaseForm = $('#purchase-form');
  var pfSuccess = $('#pf-success');
  var pfClose = $('#pf-close');
  var errorModal = $('#scan-error-modal');
  var errorRetry = $('#error-retry');

  // ── Purchase form: phone auto-format ────────────────────────────────
  var pfPhoneInput = $('#pf-phone');
  function pfFormatPhone(value) {
    var raw = value.replace(/\D/g, '');
    if (raw.length === 11 && raw.charAt(0) === '1') raw = raw.slice(1);
    raw = raw.slice(0, 10);
    if (raw.length === 0) return '';
    if (raw.length <= 3) return '(' + raw;
    if (raw.length <= 6) return '(' + raw.slice(0, 3) + ') ' + raw.slice(3);
    return '(' + raw.slice(0, 3) + ') ' + raw.slice(3, 6) + '-' + raw.slice(6);
  }
  if (pfPhoneInput) {
    pfPhoneInput.addEventListener('input', function () {
      pfPhoneInput.value = pfFormatPhone(pfPhoneInput.value);
    });
  }

  // ── Purchase form: inline validation helpers ──────────────────────
  function pfShowError(input, errorId, msg) {
    input.setAttribute('aria-invalid', 'true');
    var errEl = document.getElementById(errorId);
    if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); }
  }
  function pfClearError(input, errorId) {
    input.removeAttribute('aria-invalid');
    var errEl = document.getElementById(errorId);
    if (errEl) { errEl.textContent = ''; errEl.classList.add('hidden'); }
  }

  var pfValidations = {
    name: { id: 'pf-name', errorId: 'pf-name-error', validate: function (v) { return v.trim().length < 2 ? 'Full name is required' : null; } },
    email: { id: 'pf-email', errorId: 'pf-email-error', validate: function (v) { if (!v.trim()) return 'Email is required'; return (!v.includes('@') || !v.includes('.')) ? 'Enter a valid email address' : null; } },
    phone: { id: 'pf-phone', errorId: 'pf-phone-error', validate: function (v) { var digits = v.replace(/\D/g, ''); if (digits.length === 0) return 'Phone number is required'; return digits.length < 10 ? 'Enter a 10-digit phone number' : null; } }
  };

  // Attach blur validation + input clearing to each field
  Object.keys(pfValidations).forEach(function (key) {
    var cfg = pfValidations[key];
    var el = document.getElementById(cfg.id);
    if (!el) return;
    el.addEventListener('blur', function () {
      var err = cfg.validate(el.value);
      if (err) pfShowError(el, cfg.errorId, err);
    });
    el.addEventListener('input', function () {
      pfClearError(el, cfg.errorId);
    });
  });

  // Validate all purchase form fields; returns true if valid
  function pfValidateAll() {
    var allValid = true;
    var firstInvalid = null;
    var errorMessages = [];
    Object.keys(pfValidations).forEach(function (key) {
      var cfg = pfValidations[key];
      var el = document.getElementById(cfg.id);
      if (!el) return;
      var err = cfg.validate(el.value);
      if (err) {
        pfShowError(el, cfg.errorId, err);
        if (!firstInvalid) firstInvalid = el;
        errorMessages.push(err);
        allValid = false;
      } else {
        pfClearError(el, cfg.errorId);
      }
    });
    // Announce to screen readers
    var liveEl = document.getElementById('pf-form-errors');
    if (liveEl) liveEl.textContent = allValid ? '' : 'Please fix: ' + errorMessages.join('. ');
    if (firstInvalid) firstInvalid.focus();
    return allValid;
  }

  function getSelectedProductName() {
    var selectedCard = $('.material-card.selected');
    if (!selectedCard) return state.selectedTier || '';
    // Try the product name element (text-lg font-semibold)
    var nameEl = selectedCard.querySelector('.text-lg.font-semibold') || selectedCard.querySelector('.font-fraunces') || selectedCard.querySelector('.tier-name') || selectedCard.querySelector('h3');
    return nameEl ? nameEl.textContent.trim() : state.selectedTier;
  }

  function openPurchaseModal() {
    if (!state.roofData) return;
    // Clear any previous validation errors
    Object.keys(pfValidations).forEach(function (key) {
      var cfg = pfValidations[key];
      var el = document.getElementById(cfg.id);
      if (el) pfClearError(el, cfg.errorId);
    });
    // Populate hidden fields
    $('#pf-address').value = state.address;
    var productName = getSelectedProductName();
    $('#pf-product').value = productName;
    var selectedCard = $('.material-card.selected');
    var activeSwatch = selectedCard ? selectedCard.querySelector('.swatch.active') : null;
    $('#pf-color').value = activeSwatch ? activeSwatch.getAttribute('aria-label') : '';
    $('#pf-total').value = $('#total-price').textContent;
    $('#pf-sqft').value = state.roofData.sqft;
    // Populate structured summary
    var saEl = document.getElementById('pf-summary-address');
    var spEl = document.getElementById('pf-summary-product');
    var stEl = document.getElementById('pf-summary-total');
    var smEl = document.getElementById('pf-summary-monthly');
    if (saEl) saEl.textContent = state.address;
    if (spEl) spEl.textContent = productName + ' \u2014 ' + ($('#pf-color').value || 'Default');
    if (stEl) stEl.textContent = $('#pf-total').value;
    if (smEl) smEl.textContent = 'or ' + $('#monthly-price').textContent + ' for 60 months';
    purchaseModal.classList.remove('hidden');
    // Focus the first input in the modal for keyboard users
    var firstInput = purchaseModal.querySelector('input:not([type="hidden"])');
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 100);
  }

  if ($('#purchase-btn')) $('#purchase-btn').addEventListener('click', openPurchaseModal);
  if ($('#mobile-purchase-btn')) $('#mobile-purchase-btn').addEventListener('click', openPurchaseModal);

  function closeModal(modal) { if (modal) modal.classList.add('hidden'); }
  if (pfClose) pfClose.addEventListener('click', function () { closeModal(purchaseModal); });
  if (purchaseModal) purchaseModal.addEventListener('click', function (e) { if (e.target === purchaseModal) closeModal(purchaseModal); });

  // Escape key closes modals
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (purchaseModal && !purchaseModal.classList.contains('hidden')) closeModal(purchaseModal);
    if (errorModal && !errorModal.classList.contains('hidden')) closeModal(errorModal);
  });

  if (purchaseForm) {
    var submitBtn = purchaseForm.querySelector('button[type="submit"]');
    purchaseForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitBtn && submitBtn.disabled) return; // prevent double submit
      // Validate before proceeding
      if (!pfValidateAll()) return;
      var data = Object.fromEntries(new FormData(purchaseForm));
      var ref = 'HE-' + Date.now().toString(36).toUpperCase();
      data.ref = ref;

      // Disable button during submission
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting...'; }

      fetch(API_URL + '/api/purchase', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(15000)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Server error');
          purchaseForm.classList.add('hidden');
          $('#pf-ref').textContent = ref;
          pfSuccess.classList.remove('hidden');
          // Analytics: purchase completed
          var totalNum = parseFloat(String(data.total || '0').replace(/[^0-9.]/g, '')) || 0;
          var buyerEmail = data.email || '';
          var buyerName = data.name || '';
          if (window.op) {
            // Identify the buyer so revenue is attributed to their profile
            if (buyerEmail) {
              window.op('identify', {
                profileId: buyerEmail,
                email: buyerEmail,
                firstName: buyerName.split(' ')[0] || '',
                lastName: buyerName.split(' ').slice(1).join(' ') || '',
                phone: data.phone || '',
                properties: { address: state.address || '', source: 'buy_flow' }
              });
            }
            window.op('track', 'purchase_completed', { ref: ref, product: data.product || '', total: data.total || '', address: data.address || '' });
            // OpenPanel revenue tracking — ties purchase value to the user profile
            window.op('revenue', totalNum, { ref: ref, product: data.product || '', source: 'buy_flow' });
          }
          if (window.dataLayer) window.dataLayer.push({ event: 'purchase_completed', ref: ref, product: data.product || '', total: data.total || '' });
          if (window.dataLayer) window.dataLayer.push({
            event: 'enhanced_conversion_data',
            enhanced_conversions: {
              email: data.email || '',
              phone_number: data.phone || '',
              first_name: (data.name || '').split(' ')[0] || '',
              last_name: (data.name || '').split(' ').slice(1).join(' ') || '',
            }
          });
          // Meta Pixel — client-side Purchase event (deduped with server CAPI via eventId)
          var purchaseEventId = 'purchase_' + ref;
          if (typeof fbq === 'function') fbq('track', 'Purchase', { value: totalNum, currency: 'USD', content_ids: [data.product || ''], content_type: 'product' }, { eventID: purchaseEventId });
          // Server-side CAPI Purchase — deduped with client Pixel via shared eventId
          var email = data.email || data['pf-email'] || '';
          if (email) {
            fetch('/api/track-purchase', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: email,
                value: totalNum,
                phone: data.phone || data['pf-phone'] || '',
                firstName: (data.name || data['pf-name'] || '').split(' ')[0],
                lastName: (data.name || data['pf-name'] || '').split(' ').slice(1).join(' '),
                service: data.product || 'roofing',
                ref: ref,
                fbc: sessionStorage.getItem('he_fbc') || '',
              })
            }).catch(function () {}); // fire-and-forget
          }
        })
        .catch(function () {
          // Show success anyway but with a note — order is captured client-side
          // and we'll email/call the customer regardless
          purchaseForm.classList.add('hidden');
          $('#pf-ref').textContent = ref;
          pfSuccess.classList.remove('hidden');
          // Log for retry — store locally so it can be re-sent
          try {
            var pending = JSON.parse(localStorage.getItem('he_pending_orders') || '[]');
            pending.push({ ref: ref, data: data, ts: Date.now() });
            localStorage.setItem('he_pending_orders', JSON.stringify(pending));
          } catch (e) {}
        })
        .finally(function () {
          // Only re-enable if the form is still visible (not after success)
          if (submitBtn && !purchaseForm.classList.contains('hidden')) {
            submitBtn.disabled = false; submitBtn.textContent = 'Confirm Purchase';
          }
        });
    });
  }

  // Error modal
  if (errorRetry) {
    errorRetry.addEventListener('click', function () {
      errorModal.classList.add('hidden');
      sip = false;
      goStep(1);
      var s1el = document.getElementById('step-1');
      if (s1el) { s1el.style.display = ''; s1el.classList.remove('hidden'); }
      ai.value = '';
      ai.focus();
    });
  }

  function showScanError(msg) {
    $('#scan-error-msg').textContent = msg || 'High-resolution satellite imagery is not available for this address. Please call us for a manual quote.';
    errorModal.classList.remove('hidden');
    sl.classList.add('hidden');
    sip = false;
    // Focus the error modal for screen readers and keyboard users
    var focusTarget = errorModal.querySelector('a, button');
    if (focusTarget) setTimeout(function () { focusTarget.focus(); }, 100);
  }

  // ── Schedule a Call button — tel: on mobile, info on desktop ────────
  $$('[id$="schedule-call-btn"], button').forEach(function (btn) {
    if (btn.textContent.trim() === 'Schedule a Call Instead') {
      btn.addEventListener('click', function () {
        var isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
        if (isMobile) {
          window.location.href = 'tel:6509773351';
        } else {
          // Show inline call info instead of silent tel: failure
          var panel = btn.closest('div');
          btn.outerHTML = '<div class="w-full rounded-[4px] border border-border bg-cream px-4 py-3 text-center">' +
            '<p class="text-sm font-semibold text-charcoal">(650) 977-3351</p>' +
            '<p class="mt-1 text-xs text-muted">Mon–Fri 8am–6pm &middot; Sat 9am–2pm</p>' +
            '</div>';
        }
      });
    }
  });

  // ── Browser back button support ────────────────────────────────────
  window.addEventListener('popstate', function (e) {
    if (e.state && typeof e.state.step === 'number') {
      goStep(e.state.step, true);
    } else if (state.step > 1) {
      goStep(state.step - 1, true);
    }
  });

  // ── Auto-start from ?address= param ─────────────────────────────────
  var ua = new URLSearchParams(window.location.search).get('address');
  if (ua && ua.trim().length >= 5) {
    ai.value = ua; state.address = ua; loadMaps();
    if (!isInServiceArea(ua)) { showServiceAreaError(); }
    else { s1.classList.add('hidden'); sip = false; startScan(ua); }
  }
})();
