import { useState, useEffect } from "react";

const useIsChatGPTPage = () => {
    const [isChatGPTPage, setIsChatGPTPage] = useState(false);

    useEffect(() => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
				console.log(tabs);
                const currentUrl = tabs[0].url;
				console.log(currentUrl);
                if (currentUrl.includes("chat.openai.com")) {
                    setIsChatGPTPage(true);
                } else {
                    setIsChatGPTPage(false);
                }
            }
        );
    }, []);

    return isChatGPTPage;
};

export default useIsChatGPTPage;
