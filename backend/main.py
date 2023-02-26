from typing import List
from fastapi import FastAPI, File, UploadFile
from io import BytesIO
import PyPDF2

app = FastAPI()

@app.post("/resume-to-text")
async def extract_text(files: List[UploadFile] = File(...)):
	results = []
	for file in files:
		text = ""
		content = await file.read()
		pdf_reader = PyPDF2.PdfFileReader(BytesIO(content))
		for page_num in range(pdf_reader.getNumPages()):
			page = pdf_reader.getPage(page_num)
			text += f"[PAGE]{page.extractText()}[/PAGE]"
		results.append({"filename": file.filename, "text": text})
	return results