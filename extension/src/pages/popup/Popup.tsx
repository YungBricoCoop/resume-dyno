import { useCallback, useState } from "react";
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
        },
    });

    const sendFiles = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append("files", file);
        });

        const response = await fetch("https://mydomain.com:3000/resume-to-text", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        return data;
    };

    const handleUploadResume = async () => {
        const data = await sendFiles();
        const resumes = data.map((resume: any) => {
            return resume.text;
        });

        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    resumes,
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

            <button onClick={handleUploadResume}>Upload resume(s)</button>
        </div>
    );
}
