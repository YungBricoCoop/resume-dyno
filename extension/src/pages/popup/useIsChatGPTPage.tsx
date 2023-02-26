import { useState, useEffect } from "react";

const useIsChatGPTPage = () => {
    const [isChatGPTPage, setIsChatGPTPage] = useState(false);

    useEffect(() => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            (tabs: any) => {
                const currentUrl = tabs[0].url;
                if (!currentUrl) return;
                if (currentUrl.includes("chat.openai.com")) {
                    return setIsChatGPTPage(true);
                }
                setIsChatGPTPage(false);
            }
        );
    }, []);

    return isChatGPTPage;
};

export default useIsChatGPTPage;
