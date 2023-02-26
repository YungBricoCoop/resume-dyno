import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import useIsChatGPTPage from "./useIsChatGPTPage";
import ReactJson from "react-json-view";

import constants from "../../constants/constants";
import resume from "../../constants/resume";

import logo from "../../assets/img/logo.png";

export default function Popup(): JSX.Element {
    const localSchema = localStorage.getItem("schema");
    const defaultSchema = localSchema
        ? resume.SCHEMAS.find((schema) => schema.label === localSchema)?.schema
        : resume.SCHEMAS[0].schema;

    const isChatGPTPage = useIsChatGPTPage();

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [schema, setSchema] = useState<any>(defaultSchema);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (!acceptedFiles) return;
        setSelectedFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        ...resume.DROP_ZONE,
    });

    const sendFiles = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append("files", file);
        });

        const response = await fetch(constants.BACKEND_URL, {
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
                    schema,
                    resumes,
                });
            }
        );
    };

    const handleUpdateSchema = (updated_src: any) => {
        setSchema(updated_src);
    };

    const handleSelectSchema = (e: any) => {
        setSchema(
            resume.SCHEMAS.find((schema) => schema.label === e.target.value)
                ?.schema
        );
        localStorage.setItem("schema", e.target.value);
    };

    if (!isChatGPTPage) {
        return (
            <div className="text-center h-full p-3 bg-[#1E1E1E] text-white">
                <div className="flex justify-center items-end">
                    <img src={logo} className="h-6" />
                    <h1 className="text-2xl font-bold">esume Dyno</h1>
                </div>
                <p className="text-sm mt-2">
                    Please open{" "}
                    <a
                        href="https://chat.openai.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#EBA235]"
                    >
                        CHAT GPT
                    </a>{" "}
                    to use Resume Dyno
                </p>
            </div>
        );
    }

    return (
        <div className="text-center h-full p-3 bg-[#1E1E1E] text-white">
            <div className="flex justify-center items-end">
                <img src={logo} className="h-6" />
                <h1 className="text-2xl font-bold">esume Dyno</h1>
            </div>
            <select
                className="bg-[#1E1E1E] cursor-pointer text-white text-lg outline-none my-2"
                onChange={handleSelectSchema}
            >
                {resume.SCHEMAS.map((schema) => (
                    <option
                        className="bg-[#1E1E1E] text-white"
                        value={schema.label}
                        selected={schema.label === localSchema}
                    >
                        {schema.label}
                    </option>
                ))}
            </select>
            <div className="text-sm text-left my-2 mb-4">
                <ReactJson
                    theme="twilight"
                    displayDataTypes={false}
                    src={schema}
                    onAdd={(e) => handleUpdateSchema(e.updated_src)}
                    onEdit={(e) => handleUpdateSchema(e.updated_src)}
                    onDelete={(e) => handleUpdateSchema(e.updated_src)}
                />
            </div>
            <div className="flex flex-col gap-4 items-center justify-center w-full mb-2">
                <div
                    className="group flex flex-col items-center justify-center w-full border-2 border-white bg-white bg-opacity-0 border-dashed rounded-xl cursor-pointer hover:bg-opacity-20 transition-all"
                    {...getRootProps()}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <img
                            src={logo}
                            className="w-10 group-hover:scale-110 hover:rotate-3 transition-transform"
                        />
                        <p className="mb-2 text-sm">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">(PDF)</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {selectedFiles.map((file) => (
                                <span className="flex items-center justify-center bg-gray-700 rounded-md px-2">
                                    {file.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        {...getInputProps()}
                    />
                </div>
            </div>

            <button
                className="w-full p-2 bg-white bg-opacity-10 rounded-xl text-lg font-bold hover:scale-105 hover:bg-opacity-20 transition-transform"
                onClick={handleUploadResume}
            >
                Do some magic
            </button>
        </div>
    );
}
