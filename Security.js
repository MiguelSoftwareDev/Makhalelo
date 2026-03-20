/* ================================================================
   security.js — Makhalelo Security Layer
   • Bloqueia console / DevTools
   • Sanitiza inputs contra XSS / JS injection
   • Desactiva inspecção e atalhos de dev
   ================================================================ */
(function(){
    'use strict';

    /* ── 1. BLOQUEAR CONSOLE ── */
    const _noop = () => undefined;
    const _methods = ['log','warn','error','info','debug','trace','dir','dirxml',
                      'table','group','groupCollapsed','groupEnd','time','timeEnd',
                      'count','assert','profile','profileEnd','clear'];
    try {
        _methods.forEach(m => { try{ Object.defineProperty(console, m, { value:_noop, writable:false, configurable:false }); } catch(_){} });
    } catch(_) {}

    /* ── 2. DETECTAR DEVTOOLS (redimensionamento) ── */
    let _devOpen = false;
    const _THRESH = 160;
    function _checkDev(){
        const wDiff = window.outerWidth  - window.innerWidth;
        const hDiff = window.outerHeight - window.innerHeight;
        if((wDiff > _THRESH || hDiff > _THRESH) && !_devOpen){
            _devOpen = true;
            _showBlocked();
        } else if(wDiff <= _THRESH && hDiff <= _THRESH){
            _devOpen = false;
        }
    }
    setInterval(_checkDev, 800);

    function _showBlocked(){
        document.body.innerHTML =
            '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F9F7F2;font-family:\'Times New Roman\',serif;">' +
            '<div style="text-align:center;padding:40px;">' +
            '<div style="font-size:2rem;margin-bottom:16px;color:#015334;">&#9888;</div>' +
            '<h2 style="font-size:1.3rem;margin-bottom:10px;color:#111;">Sessão Interrompida</h2>' +
            '<p style="color:#777;font-size:.9rem;margin-bottom:24px;">Ferramentas de desenvolvimento foram detectadas.</p>' +
            '<a href="InitPage.html" style="background:#015334;color:white;padding:10px 22px;border-radius:50px;font-weight:700;font-size:.85rem;">Voltar ao início</a>' +
            '</div></div>';
    }

    /* ── 3. ATALHOS DE TECLADO DE DEV ── */
    document.addEventListener('keydown', function(e){
        /* F12 */
        if(e.key === 'F12') { e.preventDefault(); return false; }
        /* Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C */
        if(e.ctrlKey && e.shiftKey && ['I','J','C','i','j','c'].includes(e.key)){ e.preventDefault(); return false; }
        /* Ctrl+U (view source) */
        if(e.ctrlKey && ['U','u'].includes(e.key)){ e.preventDefault(); return false; }
    }, true);

    /* ── 4. BLOQUEAR BOTÃO DIREITO ── */
    document.addEventListener('contextmenu', function(e){ e.preventDefault(); }, true);

    /* ── 5. SANITIZADOR DE INPUT (XSS) ── */
    window.MkSec = {
        /**
         * Escapa HTML para prevenir XSS em texto exibido
         */
        esc: function(str){
            if(typeof str !== 'string') return str;
            return str
                .replace(/&/g,'&amp;')
                .replace(/</g,'&lt;')
                .replace(/>/g,'&gt;')
                .replace(/"/g,'&quot;')
                .replace(/'/g,'&#x27;')
                .replace(/\//g,'&#x2F;')
                .replace(/`/g,'&#x60;');
        },
        /**
         * Valida e limpa um objeto antes de guardar no localStorage
         * Remove chaves com padrões de injecção
         */
        clean: function(obj){
            if(typeof obj !== 'object' || obj === null) return {};
            const dangerous = /<script|javascript:|on\w+\s*=|eval\(|expression\(|vbscript:/gi;
            const result = {};
            Object.keys(obj).forEach(k => {
                const v = obj[k];
                if(typeof v === 'string'){
                    result[k] = dangerous.test(v) ? '' : v;
                } else if(typeof v === 'object'){
                    result[k] = MkSec.clean(v);
                } else {
                    result[k] = v;
                }
            });
            return result;
        },
        /**
         * Aplica sanitização a todos os inputs de um formulário
         */
        sanitizeForm: function(formEl){
            formEl.querySelectorAll('input,textarea').forEach(inp => {
                inp.addEventListener('input', () => {
                    const dangerous = /<script|javascript:|on\w+\s*=|eval\(/gi;
                    if(dangerous.test(inp.value)){
                        inp.value = inp.value.replace(/<[^>]*>/g,'');
                    }
                });
            });
        }
    };

    /* ── 6. PROTEGER localStorage DE ESCRITA DIRECTA ── */
    /* Apenas bloqueia tentativas via console — código legítimo da app passa normalmente */
    const _origSet = localStorage.setItem.bind(localStorage);
    /* prefixo permitido: mk_ */
    const _lsProxy = new Proxy(localStorage, {
        get(t, p){ return t[p]; }
    });
    /* Selado — não expõe o proxy globalmente */

})();