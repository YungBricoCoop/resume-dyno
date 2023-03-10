from typing import List
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import PyPDF2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["chrome-extension://mmbpoeghfliajbbeijjnicijdaoedhcd"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/resume-to-text")
async def extract_text(files: List[UploadFile] = File(...)):
	results = []
	for file in files:
		text = ""
		content = await file.read()
		pdf_reader = PyPDF2.PdfReader(BytesIO(content))
		for page_num in range(len(pdf_reader.pages)):
			page = pdf_reader.pages[page_num]
			text += f"[PAGE]{page.extract_text()}[/PAGE]"
		results.append({"filename": file.filename, "text": text})
	return results