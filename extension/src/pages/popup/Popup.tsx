import React from "react";
import logo from "@assets/img/logo.svg";

export default function Popup(): JSX.Element {
    // send a message to the content script

    const handleClick = () => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    resume: `John Smith
				123 Main Street, Anytown USA 12345
				(555) 555-1234
				john.smith@email.com
				
				Objective:
				To obtain a challenging position in a dynamic organization that will allow me to utilize my skills and experience in a meaningful way.
				
				Experience:
				Acme Inc., Anytown USA
				Senior Sales Manager, 2018 - present
				
				Manage a team of 10 sales representatives
				Develop and implement sales strategies to achieve company targets
				Conduct market research and analyze data to identify new opportunities
				Collaborate with marketing team to develop promotional materials and campaigns
				Maintain relationships with key clients and negotiate contracts
				XYZ Corporation, Anytown USA
				Sales Representative, 2014 - 2018
				
				Prospected and cold-called potential clients to generate new business
				Managed sales pipeline and maintained customer relationships
				Prepared and delivered presentations to clients and stakeholders
				Collaborated with marketing team to develop sales materials and campaigns
				Education:
				Bachelor of Business Administration, Anytown University, 2014
				
				Major in Marketing
				Dean's List for academic achievement
				Skills:
				
				Sales management
				Customer relationship management
				Market research and analysis
				Negotiation and contract management
				Presentation skills
				Team leadership`,
                });
            }
        );
    };

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800 text-white">
            <button onClick={handleClick}>Send resume</button>
        </div>
    );
}
