/* SilverStripe urlvartool
 * see http://doc.silverstripe.org/sapphire/en/reference/urlvariabletools for complete list of options
 *
 * @author dev at mulonation dot com
 * @license MIT License 
 * @credits h5o HTML5 outliner
 * 
 * */
(function () {
    var params = [          
        ['Templates'],
        ['flush', '1', 'This will clear out all cached information about the page. This is used frequently during development - for example, when adding new PHP or SS files. Flushes the current page and included templates.'],
        ['flush', 'all', 'This will clear out all cached information about the page. This is used frequently during development - for example, when adding new PHP or SS files. Flushes the entire template cache.'],
        ['showtemplate', '1', 'Show the compiled version of all the templates used, including line numbers. Good when you have a syntax error in a template. Cannot be used on a Live site without isDev.'],
        
        ['General Testing'],
        ['isDev', '1', 'Put the site into development mode, enabling debugging messages to the browser on a live server. For security, you\'ll be asked to log in with an administrator log-in'],
        ['isTest', '1', 'Put the site into test mode, enabling debugging messages to the admin email and generic errors to the browser on a live server'],
        ['debug', '1', 'Show a collection of debugging information about the director / controller operation'],
        ['debug_request', '1', 'Show all steps of the request from initial HTTPRequest to Controller to Template Rendering'],
        
        ['Classes and Objects'],
        ['debugmanifest', '1', 'Show the entire Sapphire manifest as currently built (Use /dev/build to rebuild)'],
        ['usetestmanifest', '1', 'Force use of the default test manifest'],
        ['debugmethods', '1', 'Shows all methods available when an object is constructed (useful when extending classes or using object decorators)'],
        ['debugfailover', '1', 'Shows failover methods from classes extended'],

        ['Database'],
        ['showqueries', '1', 'List all SQL queries executed'],
        ['previewwrite', '1', 'List all insert / update SQL queries, and don\'t execute them. Useful for previewing writes to the database.'],

        ['Profiling'],
        [ 'debug_memory',	'1', 'Output the number of bytes of memory used for this request' ],
        [ 'debug_profile', '1', 'Enable the profiler for the duration of the request' ],
        [ 'profile_trace', '1', 'Includes full stack traces, must be used with debug_profile' ],
        [ 'debug_behaviour', '1', 'Get profiling of Behaviour.js performance (Firebug recommended)' ],
        [ 'debug_javascript', '1', 'Force debug-output on live-sites'],

        ['Misc'],
        [ 'forceFormat', 'html', 'Force the content negotiator to deliver HTML or XHTML is allowed' ],
        [ 'forceFormat', 'xhtml',	'Force the content negotiator to deliver HTML or XHTML is allowed' ],
        [ 'showspam', '1', 'Show comments marked as spam when viewing Comments on a Page (Saving spam to the database must be enabled)' ],
        [ 'ajax', '1', 'Force request to process as AJAX request, useful for debugging from a browser' ],
        [ 'force_ajax', '1', 'Similar to ajax' ],

        ['Building and Publishing URLS'],
        [ '/dev/build', 'Rebuild the entire database and manifest, see below for additional URL Variables' ],
        [ '/admin/publishall/', 'Publish all pages on the site' ],
        [ '/home/images/flush', 'Creates new images for the page by deleting the resized ones and going back to the original to create new resized one' ]
    ];

    var urlvarobj = {};                             // will hold the options in the url
    var qs = decodeURIComponent(location.search);
    if (qs) {
        qs = qs.substring(1);                       // skip first char ('?')
        var pairs = qs.split('&');
        for (var j = 0; j < pairs.length; j++) {    // assign values to holder 
            var pair = pairs[j].split('=');
            urlvarobj[pair[0]] = pair[1];
        }
    }

    function go() {
        var str ='?';
        for (var key in urlvarobj) {
            str += key + '=' + urlvarobj[key] + '&';
        }
        if (str == '?') location.search = '';
        location.search = str.substring(0, str.length -1);  // remove trailing '&' 
    }

    var k = document.createElement('ul');           // container
    for (var i=0;i<params.length;i++) {
        var l = document.createElement('li');       // list element
        if (params[i].length == 1) {                // only one element, make it heading
            var h = document.createElement('h5');
            h.innerHTML = params[i][0];
        } else if (params[i].length == 2) {         // two elements, make it link directly to url (assuming SS at root, absolute urls)
            var h = document.createElement('a');
            h.innerHTML = params[i][0];
            h.title = params[i][1];
            h.onclick = (function(url) {
                return function() {
                    document.location = url;
                };
            })(params[i][0]);
        } else {                                    // more than two, make it link to append to query string
            var h = document.createElement('a');    // make link
            h.href = 'javascript:void();';
            if (urlvarobj.hasOwnProperty(params[i][0]) && urlvarobj[params[i][0]] == params[i][1]) {   // we're already there...
                h.innerHTML = '[-]';
                h.onclick = (function(key) { 
                    return function() {
                        delete urlvarobj[key];
                        go();
                    };
                })(params[i][0]);
            } else {
                h.innerHTML = '[+]';
                h.onclick = (function(key, val) {
                    return function() {
                        urlvarobj[key] = val;
                        go();
                    };
                })(params[i][0], params[i][1]);
            }
            l.appendChild(h);                       // append link

            var h = document.createElement('span'); // make entry
            h.innerHTML = '&nbsp;' + params[i][0] + '=' + params[i][1];
            h.title = params[i][2];
        }
        l.appendChild(h);
        k.appendChild(l);
    }

    var b = function (e, f) {
            for (var d = 0; d < e.length; d++) e[d].setAttribute('style', f)
        },
        a = document.createElement('div');
    b([a], 'position:fixed;top:10px;right:10px;border:2px solid #000;background:rgba(255,255,255,.9);padding:15px;z-index:999;max-height:400px;overflow:auto;font-size:11px;font-family:Verdana, sans-serif;');
    a.appendChild(k);                               // append list
    b(a.getElementsByTagName('li'), 'list-style:none outside;margin-left:20px;font-size:11px;font-family:Verdana, sans-serif;');
    b(a.getElementsByTagName('ul'), 'margin: 0;padding:0;font-size:11px;font-family:Verdana, sans-serif;');
    b(a.getElementsByTagName('a'), 'color:#008;text-decoration:underline;font-size:11px;font-family:Verdana, sans-serif;');
    var c = a.insertBefore(document.createElement('a'), a.firstChild);
    b([c], 'float: right; margin: 0 0 5px 5px; padding: 5px; border: 1px #008 solid;color:#00f;background-color:#ccf;');
    c.innerHTML = '[x]';
    c.title = 'Close';
    c.href = '#';
    c.onclick = function () {
        document.body.removeChild(a);
        a = c = null
    };
    document.body.appendChild(a)
})();;
