from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import model  # Ensure that your model module is correctly imported

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/questions/generate")
async def generate_questions(
    file: UploadFile = File(...),
    difficulty: str = Form(...),
    number_of_questions: int = Form(...)
):
    try:
        content = await file.read()
        questions = model.generate_questions(content, difficulty, number_of_questions)
        return JSONResponse(content={"questions": questions}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
