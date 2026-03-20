/* ================================================================
   i18n.js — Makhalelo | PT / EN / ES / FR
   ================================================================ */
const i18n = (() => {
    const T = {
        pt: {
            nav_sobre:'Sobre Nós',nav_entrar:'Entrar',
            hero_h1a:'Descortinando Moçambique:',hero_h1b:'Pensamento',hero_h1c:', Cultura e Política.',
            hero_p:'Uma revista digital dedicada a narrativas autênticas e análise crítica, celebrando a voz moçambicana.',
            hero_btn1:'Acessar Conteúdo',hero_btn2:'Ler Destaques',
            hero_stat1:'100+ Artigos',hero_stat2:'50+ Autores',hero_stat3:'+100 Contribuidores',
            tags_titulo:'Filtrar por tema',tag_todos:'Todos',
            destaque_label:'Artigo em Destaque',destaque_ler:'Ler artigo completo',
            leia_titulo:'Leia Também',leia_previa:'Ler prévia',
            art_voltar:'← Voltar',art_autor:'Por',art_partilhar:'Partilhar',art_relacionados:'Artigos Relacionados',
            footer_copy:'© 2025 Makhalelo. Todos os direitos reservados.',
            login_titulo:'Bem-vindo de volta',login_sub:'Insira seus dados para acessar.',
            login_user:'E-mail ou Usuário',login_pass:'Senha',login_btn:'Entrar',
            login_reg:'Não tem conta?',login_reg_link:'Crie agora',
            reg_titulo:'Junte-se a nós',reg_sub:'Crie seu perfil para começar.',
            reg_nome:'Nome Completo',reg_email:'E-mail',reg_tel:'Telefone',
            reg_pass:'Senha (mín. 8 caracteres)',reg_pass2:'Confirmar senha',
            reg_btn:'Criar Perfil',reg_login:'Já possui conta?',reg_login_link:'Faça Login',
            reg_foto:'Toque para adicionar foto',
            visual_h1:'Faça parte da conversa.',
            visual_p:'"A cultura é a arma mais poderosa para libertar a mente."',
            sobre_kicker:'Sobre a Plataforma',sobre_h1a:'Análise crítica,',sobre_h1b:'desde dentro',sobre_h1c:'de Moçambique.',
            sobre_p:'Makhalelo é um espaço digital independente dedicado à publicação de artigos de opinião, análises e reflexões.',
            sobre_btn:'Publicar na Makhalelo',
            dd_perfil:'Meu Perfil', dd_publicar:'Publicar Artigo',
            nav_painel:'Painel Admin', nav_sair:'Sair',
        },
        en: {
            nav_sobre:'About Us',nav_entrar:'Sign In',
            hero_h1a:'Uncovering Mozambique:',hero_h1b:'Thought',hero_h1c:', Culture and Politics.',
            hero_p:'A digital magazine dedicated to authentic narratives and critical analysis, celebrating the Mozambican voice.',
            hero_btn1:'Access Content',hero_btn2:'Read Highlights',
            hero_stat1:'100+ Articles',hero_stat2:'50+ Authors',hero_stat3:'+100 Contributors',
            tags_titulo:'Filter by topic',tag_todos:'All',
            destaque_label:'Featured Article',destaque_ler:'Read full article',
            leia_titulo:'Also Read',leia_previa:'Read preview',
            art_voltar:'← Back',art_autor:'By',art_partilhar:'Share',art_relacionados:'Related Articles',
            footer_copy:'© 2025 Makhalelo. All rights reserved.',
            login_titulo:'Welcome back',login_sub:'Enter your details to access.',
            login_user:'Email or Username',login_pass:'Password',login_btn:'Sign In',
            login_reg:"Don't have an account?",login_reg_link:'Create one',
            reg_titulo:'Join us',reg_sub:'Create your profile to get started.',
            reg_nome:'Full Name',reg_email:'Email',reg_tel:'Phone',
            reg_pass:'Password (min. 8 chars)',reg_pass2:'Confirm password',
            reg_btn:'Create Profile',reg_login:'Already have an account?',reg_login_link:'Sign In',
            reg_foto:'Tap to add photo',
            visual_h1:'Be part of the conversation.',
            visual_p:'"Culture is the most powerful weapon to liberate the mind."',
            sobre_kicker:'About the Platform',sobre_h1a:'Critical analysis,',sobre_h1b:'from within',sobre_h1c:'Mozambique.',
            sobre_p:'Makhalelo is an independent digital space dedicated to publishing opinion pieces, analyses and reflections.',
            sobre_btn:'Publish at Makhalelo',
            dd_perfil:'My Profile', dd_publicar:'Publish Article',
            nav_painel:'Admin Panel', nav_sair:'Sign Out',
            nav_sobre:'Sobre Nosotros',nav_entrar:'Entrar',
            hero_h1a:'Descubriendo Mozambique:',hero_h1b:'Pensamiento',hero_h1c:', Cultura y Política.',
            hero_p:'Una revista digital dedicada a narrativas auténticas y análisis crítico, celebrando la voz mozambiqueña.',
            hero_btn1:'Acceder Contenido',hero_btn2:'Leer Destacados',
            hero_stat1:'100+ Artículos',hero_stat2:'50+ Autores',hero_stat3:'+100 Colaboradores',
            tags_titulo:'Filtrar por tema',tag_todos:'Todos',
            destaque_label:'Artículo Destacado',destaque_ler:'Leer artículo completo',
            leia_titulo:'Leer También',leia_previa:'Leer vista previa',
            art_voltar:'← Volver',art_autor:'Por',art_partilhar:'Compartir',art_relacionados:'Artículos Relacionados',
            footer_copy:'© 2025 Makhalelo. Todos los derechos reservados.',
            login_titulo:'Bienvenido de nuevo',login_sub:'Ingresa tus datos para acceder.',
            login_user:'Email o Usuario',login_pass:'Contraseña',login_btn:'Entrar',
            login_reg:'¿No tienes cuenta?',login_reg_link:'Crear ahora',
            reg_titulo:'Únete a nosotros',reg_sub:'Crea tu perfil para comenzar.',
            reg_nome:'Nombre Completo',reg_email:'Email',reg_tel:'Teléfono',
            reg_pass:'Contraseña (mín. 8 caracteres)',reg_pass2:'Confirmar contraseña',
            reg_btn:'Crear Perfil',reg_login:'¿Ya tienes cuenta?',reg_login_link:'Iniciar Sesión',
            reg_foto:'Toca para agregar foto',
            visual_h1:'Sé parte de la conversación.',
            visual_p:'"La cultura es el arma más poderosa para liberar la mente."',
            sobre_kicker:'Sobre la Plataforma',sobre_h1a:'Análisis crítico,',sobre_h1b:'desde adentro',sobre_h1c:'de Mozambique.',
            sobre_p:'Makhalelo es un espacio digital independiente dedicado a publicar artículos de opinión, análisis y reflexiones.',
            sobre_btn:'Publicar en Makhalelo',
            dd_perfil:'Mi Perfil', dd_publicar:'Publicar Artículo',
            nav_painel:'Panel Admin', nav_sair:'Cerrar Sesión',
        },
        fr: {
            nav_sobre:'À Propos',nav_entrar:'Se Connecter',
            hero_h1a:'Dévoiler le Mozambique :',hero_h1b:'Pensée',hero_h1c:', Culture et Politique.',
            hero_p:"Un magazine numérique dédié aux récits authentiques et à l'analyse critique, célébrant la voix mozambicaine.",
            hero_btn1:'Accéder au Contenu',hero_btn2:'Lire les Sélections',
            hero_stat1:'100+ Articles',hero_stat2:'50+ Auteurs',hero_stat3:'+100 Contributeurs',
            tags_titulo:'Filtrer par thème',tag_todos:'Tous',
            destaque_label:'Article en Vedette',destaque_ler:"Lire l'article complet",
            leia_titulo:'Lire Aussi',leia_previa:"Lire l'aperçu",
            art_voltar:'← Retour',art_autor:'Par',art_partilhar:'Partager',art_relacionados:'Articles Liés',
            footer_copy:'© 2025 Makhalelo. Tous droits réservés.',
            login_titulo:'Bon retour',login_sub:'Entrez vos informations pour accéder.',
            login_user:'Email ou Utilisateur',login_pass:'Mot de passe',login_btn:'Connexion',
            login_reg:'Pas de compte ?',login_reg_link:'Créer maintenant',
            reg_titulo:'Rejoignez-nous',reg_sub:'Créez votre profil pour commencer.',
            reg_nome:'Nom Complet',reg_email:'Email',reg_tel:'Téléphone',
            reg_pass:'Mot de passe (min. 8 caractères)',reg_pass2:'Confirmer le mot de passe',
            reg_btn:'Créer le Profil',reg_login:'Vous avez déjà un compte ?',reg_login_link:'Se Connecter',
            reg_foto:'Appuyez pour ajouter une photo',
            visual_h1:'Faites partie de la conversation.',
            visual_p:"\"La culture est l'arme la plus puissante pour libérer l'esprit.\"",
            sobre_kicker:'Sur la Plateforme',sobre_h1a:"Analyse critique,",sobre_h1b:"de l'intérieur",sobre_h1c:'du Mozambique.',
            sobre_p:"Makhalelo est un espace numérique indépendant dédié à la publication d'articles d'opinion, d'analyses et de réflexions.",
            sobre_btn:'Publier sur Makhalelo',
            dd_perfil:'Mon Profil', dd_publicar:"Publier un Article",
            nav_painel:"Panneau Admin", nav_sair:'Se Déconnecter',
        }
    };

    let lang = localStorage.getItem('mk_lang') || 'pt';

    function setLang(l) {
        if(!T[l]) return;
        lang = l;
        localStorage.setItem('mk_lang', l);
        apply();
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
    }

    function apply() {
        const d = T[lang] || T.pt;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const v = d[el.dataset.i18n];
            if(v === undefined) return;
            if(el.tagName==='INPUT'||el.tagName==='TEXTAREA') el.placeholder = v;
            else el.textContent = v;
        });
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const v = d[el.dataset.i18nPh];
            if(v !== undefined) el.placeholder = v;
        });
    }

    function t(key) { return (T[lang]||T.pt)[key] || key; }
    function getLang() { return lang; }

    function init() {
        apply();
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.addEventListener('click', () => setLang(b.dataset.lang));
            b.classList.toggle('active', b.dataset.lang === lang);
        });
    }

    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    return { setLang, apply, t, getLang, init };
})();