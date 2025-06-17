import json
import re

INPUT_FILE = "workout_programs_for_import.json"
OUTPUT_FILE = "workout_programs_for_import_fixed.json"

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

def generate_cover_url(title):
    slug = slugify(title)
    return f"https://via.placeholder.com/400x300/33A8FF/FFFFFF?text={slug.replace('-', '+').title()}"

def generate_tags(title):
    return [w.lower() for w in re.findall(r'\w+', title) if len(w) > 2]

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

for program in data:
    if "coverImageUrl" not in program:
        program["coverImageUrl"] = generate_cover_url(program["title"])
    if "tags" not in program:
        program["tags"] = generate_tags(program["title"])

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Dönüştürme tamamlandı! Yeni dosya: {OUTPUT_FILE}")