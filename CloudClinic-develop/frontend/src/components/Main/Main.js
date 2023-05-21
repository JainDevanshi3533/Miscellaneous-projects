import React from 'react';
import './Main.scss';

const Main = ({ children }) => {

    (function(d, m){
        var kommunicateSettings = 
            {"appId":"21f204744aa7faffb7ca76f75c655da11","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});

  return <div className="main-wrapper">{children}</div>;
};

export default Main;
