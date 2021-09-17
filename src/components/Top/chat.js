import React ,{ Component } from 'react' ;
import { auth} from "./firebase";

class KommunicateChat extends Component {
    constructor(props)
    {
        super(props);
    }
    
componentDidMount()
{
	(function (d, m) {
            var kommunicateSettings = {
                "appId": "3f9b94be7d3a38326fdbbcb66df24eba3",
                "automaticChatOpenOnNavigation":true,
                "onInit": function () {
                    var iframeStyle = document.createElement('style');
                    var classSettings = ".change-kommunicate-iframe-height{height:100%!important;width:100%!important;right:0!important;bottom:0!important;max-height: 100%!important;}";
                    iframeStyle.type = 'text/css';
                    iframeStyle.innerHTML = classSettings;
                    document.getElementsByTagName('head')[0].appendChild(iframeStyle);
                    var launcherIconStyle = "@media(min-width: 510px){.mck-sidebox.fade.in,.mck-box .mck-box-sm{width:100%; height:100%;max-height:100%!important;border-radius:0px!important;}.mck-sidebox{right:0!important;bottom:0!important;}}";
                    window.Kommunicate.customizeWidgetCss(launcherIconStyle);

                    var iframe = window.parent.document.getElementById("kommunicate-widget-iframe"),
                        launcher = window.KommunicateGlobal.document.getElementById('mck-sidebox-launcher'),
                        preChatPopup = window.KommunicateGlobal.document.querySelector('#chat-popup-widget-container .chat-popup-widget-text-wrapper'),
                        closeButton = window.KommunicateGlobal.document.getElementById('km-chat-widget-close-button').style.display = "none";
                        
                    [launcher, preChatPopup].forEach(function (element) {
                        element && element.addEventListener('click', function () {
                            iframe.classList.add("change-kommunicate-iframe-height");
                        });
                    });
               
            
                 var cssChanges = ".mck-msg-left .mck-msg-box{background-color: #53B77B!important;color:white!important;}";
                window.Kommunicate.customizeWidgetCss(cssChanges);


                    //  closeButton.addEventListener('click', function () {
                    //      iframe.classList.remove("change-kommunicate-iframe-height");
                    //  });
                    window.Kommunicate.launchConversation();
                    window.KommunicateGlobal.document.getElementById('mck-sidebox-launcher').click()

                    var chatContext = {
                        "email":auth.currentUser.email
                   }
                     console.log(chatContext);
                     //window.Kommunicate(chatContext);
                    window.Kommunicate.updateChatContext(chatContext);

                    
                },

            };
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }
    render(){
        return (
            <div></div>
        )
    }
}


export default KommunicateChat;
	