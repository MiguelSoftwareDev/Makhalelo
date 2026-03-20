/* ================================================================
   security.js — Makhalelo Security Layer v2
   Versão leve: apenas sanitização, sem bloquear DevTools
   (bloquear DevTools causa conflitos com i18n e outros scripts)
================================================================ */
(function(){
    'use strict';

    /* ── SANITIZADOR GLOBAL ── */
    window.MkSec = {
        esc: function(str){
            if(typeof str !== 'string') return String(str||'');
            return str
                .replace(/&/g,'&amp;').replace(/</g,'&lt;')
                .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
                .replace(/'/g,'&#x27;').replace(/\//g,'&#x2F;');
        },
        clean: function(obj){
            if(typeof obj !== 'object' || obj === null) return {};
            const danger = /<script|javascript:|on\w+\s*=|eval\(|expression\(/gi;
            const result = {};
            Object.keys(obj).forEach(k => {
                const v = obj[k];
                if(typeof v === 'string') result[k] = danger.test(v) ? '' : v;
                else if(typeof v === 'object') result[k] = MkSec.clean(v);
                else result[k] = v;
            });
            return result;
        }
    };

    /* ── PROTECÇÃO LOCALSTORAGE ── */
    try {
        const _orig = localStorage.setItem.bind(localStorage);
        const DANGER = /<script|javascript:|on\w+\s*=/gi;
        Object.defineProperty(localStorage, 'setItem', {
            value: function(k, v){
                if(typeof v === 'string' && DANGER.test(v)) return;
                _orig(k, v);
            },
            writable: false, configurable: false
        });
    } catch(_){}

    /* ── SANITIZAÇÃO EM TEMPO REAL NOS INPUTS ── */
    document.addEventListener('DOMContentLoaded', function(){
        document.querySelectorAll('input[type="text"],input[type="email"],textarea').forEach(inp => {
            inp.addEventListener('input', function(){
                if(/<script|javascript:|on\w+\s*=/gi.test(this.value))
                    this.value = this.value.replace(/<[^>]*>/g, '');
            });
        });
    });

})();