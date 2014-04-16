/* http://keith-wood.name/svg.html
   jQuery DOM compatibility for jQuery SVG v1.4.5.
   Written by Keith Wood (kbwood{at}iinet.com.au) April 2009.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */
eval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [
            function(e) {
                return r[e]
            }
        ];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('(7($){$.q.S=7(e){8 7(d){d=d||\'\';8 9.w(7(){k($.r.v(9)){l c=9;$.w(d.E(/\\s+/),7(i,a){l b=(c.o?c.o.p:c.B(\'z\'));k($.T(a,b.E(/\\s+/))==-1){b+=(b?\' \':\'\')+a;(c.o?c.o.p=b:c.H(\'z\',b))}})}x{e.A($(9),[d])}})}}($.q.S);$.q.U=7(e){8 7(d){d=d||\'\';8 9.w(7(){k($.r.v(9)){l c=9;$.w(d.E(/\\s+/),7(i,a){l b=(c.o?c.o.p:c.B(\'z\'));b=$.1d(b.E(/\\s+/),7(n,i){8 n!=a}).1e(\' \');(c.o?c.o.p=b:c.H(\'z\',b))})}x{e.A($(9),[d])}})}}($.q.U);$.q.V=7(c){8 7(a,b){8 9.w(7(){k($.r.v(9)){k(M b!==\'1f\'){b=!$(9).N(a)}$(9)[(b?\'1g\':\'1h\')+\'1i\'](a)}x{c.A($(9),[a,b])}})}}($.q.V);$.q.N=7(d){8 7(b){b=b||\'\';l c=I;9.w(7(){k($.r.v(9)){l a=(9.o?9.o.p:9.B(\'z\')).E(/\\s+/);c=($.T(b,a)>-1)}x{c=(d.A($(9),[b]))}8!c});8 c}}($.q.N);$.q.O=7(h){8 7(b,c,d){k(M b===\'W\'&&c===1j){l e=h.A(9,[b]);k(e&&e.p&&e.p.X!=J){c=\'\';e=e.p;k(b==\'1k\'){F(l i=0;i<e.X;i++){l f=e.Y(i);1l(f.1m){C 1:c+=\' u(\'+f.u.a+\',\'+f.u.b+\',\'+f.u.c+\',\'+f.u.d+\',\'+f.u.e+\',\'+f.u.f+\')\';D;C 2:c+=\' 1n(\'+f.u.e+\',\'+f.u.f+\')\';D;C 3:c+=\' 1o(\'+f.u.a+\',\'+f.u.d+\')\';D;C 4:c+=\' 1p(\'+f.P+\')\';D;C 5:c+=\' 1q(\'+f.P+\')\';D;C 6:c+=\' 1r(\'+f.P+\')\';D}}e=c.1s(1)}x{e=e.Y(0).Z}}8(e&&e.p?e.p.Z:e)}l g=b;k(M b===\'W\'){g={};g[b]=c}8 9.w(7(){k($.r.v(9)){F(l n 1t g){l a=($.1u(g[n])?g[n]():g[n]);(d?9.1v[n]=a:9.H(n,a))}}x{h.A($(9),[b,c,d])}})}}($.q.O);$.q.10=7(b){8 7(a){8 9.w(7(){k($.r.v(9)){(9[a]&&9[a].p?9[a].p.1w=\'\':9.H(a,\'\'))}x{b.A($(9),[a])}})}}($.q.10);$.1x($.1y,{\'1z\':K,\'1A\':K,\'1B\':K});k($.11){$.12=7(e){8 7(a,b,c){l d=(b.1C(/^r.*/)?$(a).O($.11[b]||b):\'\');8 d||e(a,b,c)}}($.12)}7 G(a){F(l i=0;i<a.13;i++){k(a[i].14==1&&a[i].1D==$.r.1E){8 K}}8 I}$.m.y[\'+\']=7(d){8 7(a,b,c){d(a,b,c||G(a))}}($.m.y[\'+\']);$.m.y[\'>\']=7(d){8 7(a,b,c){d(a,b,c||G(a))}}($.m.y[\'>\']);$.m.y[\'\']=7(d){8 7(a,b,c){d(a,b,c||G(a))}}($.m.y[\'\']);$.m.y[\'~\']=7(d){8 7(a,b,c){d(a,b,c||G(a))}}($.m.y[\'~\']);$.m.Q.15=7(d){8 7(a,b,c){8($.r.v(b)?[b.1F.1G(a[1])]:d(a,b,c))}}($.m.Q.15);l j=16.1H(\'1I\');j.1J(16.1K(\'\'));k(j.17(\'*\').13>0){$.m.Q.1L=7(a,b){l c=b.17(a[1]);k(a[1]===\'*\'){l d=[];F(l i=0;c[i]||c.L(i);i++){k((c[i]||c.L(i)).14===1){d.18(c[i]||c.L(i))}}c=d}8 c}}$.m.1M.19=7(a,b,c,d,f,g){a=\' \'+a[1].1N(/\\\\/g,\'\')+\' \';k(g){8 a}F(l i=0,t={};t!=J;i++){t=b[i];k(!t){1O{t=b.L(i)}1P(e){}}k(t){l h=(!$.r.v(t)?t.o:(t.o?t.o.p:\'\')||t.B(\'z\'));k(f^(h&&(\' \'+h+\' \').1a(a)>-1)){k(!c)d.18(t)}x k(c){b[i]=I}}}8 I};$.m.R.19=7(a,b){l c=(!$.r.v(a)?a.o:(a.o?a.o.p:a.B(\'z\')));8(\' \'+c+\' \').1a(b)>-1};$.m.R.1b=7(g){8 7(c,d){l e=J;k($.r.v(c)){e=d[1];$.m.1c[e]=7(a){l b=a.B(e);8 b&&b.p||b}}l f=g(c,d);k(e){$.m.1c[e]=J}8 f}}($.m.R.1b)})(1Q);', 62, 115, '|||||||function|return|this|||||||||||if|var|expr||className|baseVal|fn|svg||elem|matrix|isSVGElem|each|else|relative|class|apply|getAttribute|case|break|split|for|anySVG|setAttribute|false|null|true|item|typeof|hasClass|attr|angle|find|filter|addClass|inArray|removeClass|toggleClass|string|numberOfItems|getItem|valueAsString|removeAttr|cssProps|css|length|nodeType|ID|document|getElementsByTagName|push|CLASS|indexOf|ATTR|attrHandle|grep|join|boolean|add|remove|Class|undefined|transform|switch|type|translate|scale|rotate|skewX|skewY|substring|in|isFunction|style|value|extend|cssNumber|stopOpacity|strokeMitrelimit|strokeOpacity|match|namespaceURI|svgNS|ownerDocument|getElementById|createElement|div|appendChild|createComment|TAG|preFilter|replace|try|catch|jQuery'.split('|'), 0, {}))
