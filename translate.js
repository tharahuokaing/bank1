/* =========================================================
   HUOKAING THARA SYSTEM - GOOGLE TRANSLATE INTEGRATION (VIETNAMESE ADDED)
========================================================= */

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        // Removed 'ko' (Korean), added 'vi' (Vietnamese) alongside Khmer ('km'), English ('en'), Chinese ('zh-CN'), etc.
        includedLanguages: 'en,km,vi,zh-CN,th,ja,es,fr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

// Dynamically load the official Google Translate script asynchronously
(function() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
})();
