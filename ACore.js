/* ================================================================
   ACore.js — Makhalelo Auth v3.1
   Admin: Makhalelomzn / ADM123
   ================================================================ */

const _Cripto = (() => {
    async function pbkdf2(senha, salt) {
        const key = await crypto.subtle.importKey(
            'raw', new TextEncoder().encode(senha), 'PBKDF2', false, ['deriveBits']
        );
        const bits = await crypto.subtle.deriveBits(
            { name:'PBKDF2', salt:new TextEncoder().encode(salt), iterations:150000, hash:'SHA-256' },
            key, 256
        );
        return Array.from(new Uint8Array(bits)).map(b=>b.toString(16).padStart(2,'0')).join('');
    }
    function novoSalt(n=32){
        const a=new Uint8Array(n); crypto.getRandomValues(a);
        return Array.from(a).map(b=>b.toString(16).padStart(2,'0')).join('');
    }
    function uid(){
        const a=new Uint8Array(16); crypto.getRandomValues(a);
        return Array.from(a).map(b=>b.toString(16).padStart(2,'0')).join('');
    }
    function comparar(a,b){
        if(a.length!==b.length) return false;
        let d=0; for(let i=0;i<a.length;i++) d|=a.charCodeAt(i)^b.charCodeAt(i);
        return d===0;
    }
    return { pbkdf2, novoSalt, uid, comparar };
})();

const _ADM = { login:"Makhalelomzn", salt:"mk_adm_s4lt_x9q7_2025", hash:"DEMO" };
const _DEMO_ADM_PASS = "ADM123";

const _DEMO_USERS = [
    { id:'demo_u1', name:'User 1', username:'user1', passPlain:'user123', role:'USER', photo:null }
];

/* ── REGRAS DE SENHA ── */
const PasswordRules = {
    validate(p){
        const e=[];
        if(!p||p.length<8)       e.push('mínimo de 8 caracteres');
        if(!/[A-Z]/.test(p))     e.push('pelo menos 1 maiúscula');
        if(!/[a-z]/.test(p))     e.push('pelo menos 1 minúscula');
        if(!/[0-9]/.test(p))     e.push('pelo menos 1 número');
        if(!/[^A-Za-z0-9]/.test(p)) e.push('pelo menos 1 caractere especial');
        const common=['password','123456','makhalelo','qwerty','abc123','111111','senha123'];
        if(common.includes(p.toLowerCase())) e.push('senha muito comum');
        return e;
    }
};

/* ── PROTEÇÃO LOCALSTORAGE ── */
(function(){
    try {
        const _orig = localStorage.setItem.bind(localStorage);
        const DANGER = /<script|javascript:|on\w+\s*=/gi;
        Object.defineProperty(localStorage, 'setItem', {
            value(k,v){ if(typeof v==='string'&&DANGER.test(v)) return; _orig(k,v); },
            writable:false, configurable:false
        });
    } catch(_){}
})();

class AuthManager {
    constructor(){ this._s=this._lerSessao(); }

    async tryAdminLogin(u,p){
        if(!u||!p||u.trim()!==_ADM.login) return false;
        const ok = _ADM.hash==='DEMO' ? p===_DEMO_ADM_PASS
            : _Cripto.comparar(await _Cripto.pbkdf2(p,_ADM.salt), _ADM.hash);
        if(!ok) return false;
        this._criarSessao({id:'adm_001',name:'Edson Abílio',username:_ADM.login,role:'ADM'});
        return true;
    }

    async loginUser(usernameOrEmail, senha){
        if(!usernameOrEmail||!senha) throw new Error('Credenciais inválidas.');
        const id = usernameOrEmail.toLowerCase();
        /* demo */
        const demo=_DEMO_USERS.find(u=>u.username===id);
        if(demo&&demo.passPlain===senha){
            this._criarSessao({id:demo.id,name:demo.name,username:demo.username,role:demo.role,photo:demo.photo});
            return true;
        }
        /* registados */
        const lista=this._getUsers();
        const user=lista.find(u=>u.username===id);
        if(!user) throw new Error('Utilizador não encontrado.');
        const h=await _Cripto.pbkdf2(senha,user.salt);
        if(!_Cripto.comparar(h,user.passHash)) throw new Error('Senha incorrecta.');
        this._criarSessao({id:user.id,name:user.name,username:user.username,role:user.role,photo:user.photo});
        return true;
    }

    async registerUser({ name, username, email, password, photoData }){
        const _s=v=>String(v||'').replace(/<[^>]*>/g,'').replace(/[<>"'`]/g,'').trim();
        name     = _s(name);
        username = _s(username).toLowerCase().replace(/\s+/g,'');
        email    = email ? _s(email).toLowerCase() : '';

        if(!name||name.length<3)      throw new Error('O nome deve ter pelo menos 3 caracteres.');
        if(!username||username.length<3) throw new Error('Nome de utilizador muito curto.');
        if(!/^[a-z0-9_.]+$/.test(username)) throw new Error('Nome de utilizador inválido.');
        if(!password)                 throw new Error('Senha obrigatória.');

        const erros=PasswordRules.validate(password);
        if(erros.length) throw new Error('Senha fraca: '+erros.join(', ')+'.');

        const lista=this._getUsers();
        if(lista.find(u=>u.username===username)||_DEMO_USERS.find(u=>u.username===username)||username===_ADM.login.toLowerCase())
            throw new Error('USERNAME_DUPLICADO');

        const salt=_Cripto.novoSalt(), passHash=await _Cripto.pbkdf2(password,salt);
        lista.push({
            id:_Cripto.uid(), name, username, email, passHash, salt,
            role:'USER', photo:photoData||null, criadoEm:new Date().toISOString()
        });
        this._saveUsers(lista);
        return {success:true};
    }

    _criarSessao(d){
        sessionStorage.setItem('mk_user',  JSON.stringify(d));
        sessionStorage.setItem('mk_token', _Cripto.novoSalt(24));
        sessionStorage.setItem('mk_exp',   String(Date.now()+8*3600*1000));
    }
    _lerSessao(){
        try{
            const exp=parseInt(sessionStorage.getItem('mk_exp')||'0');
            if(Date.now()>exp){this.logout();return null;}
            const d=sessionStorage.getItem('mk_user');
            return d?JSON.parse(d):null;
        }catch{return null;}
    }
    logout(){ ['mk_user','mk_token','mk_exp'].forEach(k=>sessionStorage.removeItem(k)); }
    getSessao()  { return this._lerSessao(); }
    isAdmin()    { const s=this.getSessao(); return s&&s.role==='ADM'; }
    isLoggedIn() { return !!this.getSessao(); }
    _getUsers()  { try{return JSON.parse(localStorage.getItem('mk_users')||'[]')}catch{return[]} }
    _saveUsers(a){ localStorage.setItem('mk_users',JSON.stringify(a)); }
}
const Auth = new AuthManager();