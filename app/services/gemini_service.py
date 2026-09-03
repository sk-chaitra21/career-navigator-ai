import os
import json

from dotenv import load_dotenv
from google import genai


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY not found. Please check your .env file."
    )


# =========================================================
# GEMINI CLIENT
# =========================================================

client = genai.Client(
    api_key=GEMINI_API_KEY
)


# =========================================================
# GENERATE JSON FROM GEMINI
# =========================================================

def _generate_json(prompt: str):

    try:

        print("\n====================================")
        print("CALLING GEMINI")
        print("====================================")

        interaction = client.interactions.create(
            model="gemini-3.6-flash",
            input=prompt
        )

        text = interaction.output_text.strip()

        print("\n====================================")
        print("RAW GEMINI RESPONSE")
        print("====================================")
        print(text)
        print("====================================\n")


        # -------------------------------------------------
        # Remove markdown code fences if Gemini adds them
        # -------------------------------------------------

        if text.startswith("```"):

            text = text.replace("```json", "", 1)
            text = text.replace("```", "")

            text = text.strip()


        # -------------------------------------------------
        # Try JSON parsing
        # -------------------------------------------------

        try:

            result = json.loads(text)

            print("Gemini JSON parsed successfully.")

            return result

        except json.JSONDecodeError as json_error:

            print("\n====================================")
            print("GEMINI JSON PARSING ERROR")
            print("====================================")
            print(json_error)
            print("====================================\n")

            # Try to find JSON object inside response

            start = text.find("{")
            end = text.rfind("}")

            if start != -1 and end != -1:

                possible_json = text[start:end + 1]

                try:

                    result = json.loads(possible_json)

                    print(
                        "Recovered JSON object successfully."
                    )

                    return result

                except json.JSONDecodeError:
                    pass


            # If still invalid, return safe response

            return {
                "readiness": "The AI generated a response, but it could not be formatted correctly.",
                "strengths": [],
                "skill_gaps": [],
                "next_steps": [],
                "action_plan": [],
                "advice": text
            }


    except Exception as e:

        print("\n====================================")
        print("GEMINI API ERROR")
        print("====================================")
        print(str(e))
        print("====================================\n")

        raise


# =========================================================
# CAREER ADVICE
# =========================================================

def generate_career_advice(
    role: str,
    skills: list[str]
):

    skills_text = ", ".join(skills) or "None"


    prompt = f"""
You are an expert IT career advisor.

Target role:
{role}

Current skills:
{skills_text}

Create a concise career assessment for an IT student.

Return ONLY valid JSON.

Do not use markdown.

Do not add any text before or after the JSON.

Use EXACTLY this structure:

{{
  "readiness": "Short assessment in 1-2 sentences",

  "strengths": [
    "Short strength",
    "Short strength",
    "Short strength"
  ],

  "skill_gaps": [
    "Skill to learn",
    "Skill to learn",
    "Skill to learn"
  ],

  "next_steps": [
    "First thing to learn",
    "Second thing to learn",
    "Third thing to learn",
    "Fourth thing to learn"
  ],

  "action_plan": [
    "Short practical action",
    "Short practical action",
    "Short practical action"
  ],

  "advice": "One short practical piece of career advice"
}}

Rules:

- Maximum 250 words total.
- Keep every item concise.
- Use short sentences.
- No long paragraphs.
- Do not guarantee employment.
- Do not guarantee salary.
- Do not invent job offers.
- Focus on practical IT career guidance.
- Assume the person is a student or early-career learner.
"""


    return _generate_json(prompt)


# =========================================================
# SKILL GAP ANALYSIS
# =========================================================

def generate_skill_gap_analysis(
    role: str,
    completed_skills: list[str],
    missing_skills: list[str]
):

    completed_text = (
        ", ".join(completed_skills)
        if completed_skills
        else "None"
    )

    missing_text = (
        ", ".join(missing_skills)
        if missing_skills
        else "None"
    )


    prompt = f"""
You are an expert IT career advisor.

Target role:
{role}

Completed skills:
{completed_text}

Missing skills:
{missing_text}

Analyze the student's skill gap.

Return ONLY valid JSON.

Do not use markdown.

Do not add explanations outside the JSON.

Use EXACTLY this structure:

{{
  "readiness": "Short assessment in 1-2 sentences",

  "strengths": [
    "Completed skill and its benefit",
    "Completed skill and its benefit"
  ],

  "skill_gaps": [
    "Most important missing skill",
    "Second important missing skill",
    "Third important missing skill"
  ],

  "next_steps": [
    "First thing to learn",
    "Second thing to learn",
    "Third thing to learn",
    "Fourth thing to learn"
  ],

  "action_plan": [
    "Short practical action",
    "Short practical action",
    "Short practical action"
  ],

  "advice": "One short practical recommendation"
}}

Rules:

- Maximum 250 words total.
- Keep every item short.
- No long paragraphs.
- Prioritize the most important skills.
- Do not guarantee employment.
- Do not guarantee salary.
- Do not invent job offers.
- Keep the advice practical and beginner-friendly.
"""


    return _generate_json(prompt)