import React, { useCallback, useState } from "react";
import logo from "@assets/img/logo.svg";
import { useDropzone } from "react-dropzone";

export default function Popup(): JSX.Element {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (!acceptedFiles) return;
        setSelectedFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
		accept: {
			"application/pdf": [".pdf", ".PDF"],
		}
    });

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
        <div className="text-center h-full p-3 bg-gray-800 text-white">
            <div className="flex flex-col gap-4 items-center justify-center w-full">
                <div
                    className="flex flex-col items-center justify-center w-full border-2 border-white bg-white bg-opacity-0 border-dashed rounded-xl cursor-pointer hover:bg-opacity-20 transition-all"
                    {...getRootProps()}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                        </svg>
                        <p className="mb-2 text-sm">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">(PDF)</p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        {...getInputProps()}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {selectedFiles.map((file) => (
                        <span className="flex items-center justify-center bg-gray-700 rounded-md px-2">
                            {file.name}
                        </span>
                    ))}
                </div>
            </div>

            <button onClick={handleClick}>Send resume</button>
        </div>
    );
}
