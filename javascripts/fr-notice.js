/*
 * Soft notice for visitors in France before downloading the models.
 * Nothing is blocked: French visitors just get one extra click.
 * The country comes from Cloudflare's public trace endpoint (the visitor's
 * browser calls it directly). If the lookup fails or is slow, the download
 * proceeds normally.
 */
(function () {
    var MODEL_RE = /^https?:\/\/embeddings\.net\/embeddings\/.+\.bin$/i;
    var TRACE_URL = "https://www.cloudflare.com/cdn-cgi/trace";
    var LAW_URL = "https://www.assemblee-nationale.fr/dyn/17/amendements/3210A/AN/1358.pdf";
    var NOTICE_COUNTRIES = ["FR"];
    var TIMEOUT_MS = 2500;
    var country = null; // null = unknown, otherwise "FR", "BE", ...
    var ready = false;

    function remember(c) {
        country = c;
        ready = true;
        try { sessionStorage.setItem("geo_country", c || ""); } catch (e) {}
    }

    function lookup() {
        try {
            var cached = sessionStorage.getItem("geo_country");
            if (cached !== null) { country = cached || null; ready = true; return; }
        } catch (e) {}
        if (!window.fetch) { ready = true; return; }
        var ctrl = window.AbortController ? new AbortController() : null;
        var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, TIMEOUT_MS);
        fetch(TRACE_URL, { cache: "no-store", signal: ctrl ? ctrl.signal : undefined })
            .then(function (r) { return r.text(); })
            .then(function (t) {
                var m = /^loc=([A-Z]{2})$/m.exec(t);
                remember(m ? m[1] : null);
            })
            .catch(function () { ready = true; })
            .then(function () { clearTimeout(timer); });
    }

    function go(href) { window.location.href = href; }

    function showNotice(href) {
        var overlay = document.createElement("div");
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;" +
            "background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:20px;";
        overlay.innerHTML =
            '<div style="background:#fff;max-width:560px;width:100%;padding:24px;border-radius:6px;' +
            'box-shadow:0 8px 30px rgba(0,0,0,.35);font:14px/1.5 Helvetica,Arial,sans-serif;color:#333;max-height:90vh;overflow:auto;">' +
            '<p><strong>English</strong><br>Your request appears to come from France. Following a per-gigabyte ' +
            'data tax adopted by the French National Assembly on 30 October 2026 (amendment I-1358 to the 2027 ' +
            'finance bill, not yet law), these models may become unavailable in the future. For now, they can ' +
            'still be downloaded using the button below. ' +
            '<a href="' + LAW_URL + '" target="_blank" rel="noopener">Read the official text (French)</a>.</p>' +
            '<p><strong>Fran&ccedil;ais</strong><br>Votre requ&ecirc;te semble provenir de France. &Agrave; la suite ' +
            'de l\'adoption par l\'Assembl&eacute;e nationale, le 30 octobre 2026, d\'une taxe au gigaoctet sur les ' +
            'flux de donn&eacute;es (amendement I-1358 au projet de loi de finances 2027), ces mod&egrave;les ' +
            'pourraient devenir indisponibles &agrave; l\'avenir. Pour l\'instant, ils restent t&eacute;l&eacute;chargeables ' +
            'via le bouton ci-dessous. ' +
            '<a href="' + LAW_URL + '" target="_blank" rel="noopener">Lire le texte officiel</a>.</p>' +
            '<p style="text-align:right;margin-bottom:0;">' +
            '<button type="button" id="fr-cancel" style="margin-right:8px;padding:6px 14px;cursor:pointer;">Cancel / Annuler</button>' +
            '<button type="button" id="fr-ok" style="padding:6px 14px;cursor:pointer;font-weight:bold;">Download anyway / T&eacute;l&eacute;charger quand m&ecirc;me</button></p>' +
            '</div>';
        function close() { document.body.removeChild(overlay); document.removeEventListener("keydown", onKey); }
        function onKey(e) { if (e.key === "Escape") close(); }
        document.addEventListener("keydown", onKey);
        overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
        document.body.appendChild(overlay);
        overlay.querySelector("#fr-cancel").onclick = close;
        var ok = overlay.querySelector("#fr-ok");
        ok.onclick = function () { close(); go(href); };
        ok.focus();
    }

    document.addEventListener("click", function (e) {
        var a = e.target.closest ? e.target.closest("a") : null;
        if (!a || !MODEL_RE.test(a.href)) return;
        if (NOTICE_COUNTRIES.indexOf(country) !== -1) {
            e.preventDefault();
            showNotice(a.href);
        }
        // Otherwise (other country, unknown, lookup pending/failed): normal download.
    });

    lookup();
})();
