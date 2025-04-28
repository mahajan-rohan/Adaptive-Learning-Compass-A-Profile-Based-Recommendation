# For Student (Programming): python script.py 1 1 85 5 3 Python
# For Student (Theoretical): python script.py 1 2 85 5 3 machine_learning
# For Non-student: python script.py 2 8 3 java

# import json
# import requests
# from bs4 import BeautifulSoup
# from googlesearch import search
# import pandas as pd
# import pickle
# import neattext.functions as nfx
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# import sys
# import difflib

# # ---------------- Argument Parsing ------------------
# args = sys.argv[1:]

# # Define category before validation
# category = int(args[0])

# # Correct validation logic
# if (category == 1 and len(args) != 6) or (category == 2 and len(args) != 4):
#     print("Invalid input. Please provide valid arguments.")
#     exit()

# subject_inp = args[-1]  # Last argument is the subject
# values = list(map(float, args[2:5] if category == 1 else args[1:3]))


# # ---------------- Student Classification ------------------
# if category == 1:
#     print("Category: Student")
#     if args[1] == '1':  # Programming
#         print("Type: Programming")
#         if len(values) != 3:
#             print("Invalid input for Student (Programming). Please provide exactly 3 values for marks, coding_contest, and projects.")
#             exit()
#         marks, coding_contest, projects = values
#         model_filename = "stud_decision_model_programming.pkl"
#         encoder_filename = "stud_decision_label_encoder_programming.pkl"
#         input_features = pd.DataFrame([[marks, coding_contest, projects]], columns=["marks", "coding_contest", "projects"])

#     elif args[1] == '2':  # Theoretical
#         print("Type: Theoretical")
#         if len(values) != 3:
#             print("Invalid input for Student (Theoretical). Please provide exactly 3 values for marks, attendance, and study_hours.")
#             exit()
#         marks, attendance, study_hours = values
#         model_filename = "stud_decision_model_theoretical.pkl"
#         encoder_filename = "stud_decision_label_encoder_theoretical.pkl"
#         input_features = pd.DataFrame([[marks, attendance, study_hours]], columns=["marks", "attendance", "study_hours"])
#     else:
#         print("Invalid input for Student. Second argument must be 1 (Programming) or 2 (Theoretical).")
#         exit()

#     with open(model_filename, "rb") as model_file:
#         clf = pickle.load(model_file)
#     with open(encoder_filename, "rb") as encoder_file:
#         label_encoder = pickle.load(encoder_file)

#     predicted_encoded = clf.predict(input_features)[0]
#     predicted_category = label_encoder.inverse_transform([predicted_encoded])[0]
#     level_input = predicted_category.strip().lower()

#     print(f"\nPredicted Performance Category of student: {predicted_category}")
#     print(f"Subject: {subject_inp}")

# # ---------------- Non-Student Classification ------------------
# elif category == 2:
#     print("Category: Non-student")
#     if len(values) != 2:
#         print("Invalid input for Non-student. Please provide exactly two values: experience and certifications.")

#     experience, certifications = values

#     with open("non_stud_decision_model.pkl", "rb") as model_file:
#         model = pickle.load(model_file)
#     with open("non_stud_decision_label_encoder.pkl", "rb") as encoder_file:
#         label_encoder = pickle.load(encoder_file)

#     input_features = pd.DataFrame([[experience, certifications]], columns=["experience", "certifications"])
#     predicted_encoded = model.predict(input_features)[0]
#     predicted_category = label_encoder.inverse_transform([predicted_encoded])[0]
#     level_input = predicted_category.strip().lower()

#     print(f"\nPredicted Category: {predicted_category}")
#     print(f"Subject: {subject_inp}")

# else:
#     print("Invalid category. Use 1 for Student or 2 for Non-student.")

# import pandas as pd
# import difflib
# import neattext.functions as nfx
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# # Load dataset
# df = pd.read_csv('UdemyCleanedTitle.csv')

# # Preprocess course titles
# df['Clean_title'] = df['course_title'].astype(str).apply(lambda x: nfx.remove_stopwords(x.lower().strip()))
# df['Clean_title'] = df['Clean_title'].apply(nfx.remove_special_characters)

# # Compute TF-IDF Vectorization
# tfidf = TfidfVectorizer()
# tfidf_matrix = tfidf.fit_transform(df['Clean_title'])

# # Compute cosine similarity matrix
# cosine_mat = cosine_similarity(tfidf_matrix)

# # Preprocess input title
# cleaned_input = nfx.remove_stopwords(subject_inp.lower().strip())
# cleaned_input = nfx.remove_special_characters(cleaned_input)

# # Find the closest matches
# course_index = pd.Series(df.index, index=df['Clean_title']).drop_duplicates()

# cutoff_value = 0.8 if len(cleaned_input) < 5 else 0.5

# closest_matches = [
#     match for match in difflib.get_close_matches(cleaned_input, course_index.index, n=3, cutoff=cutoff_value)
#     if match.lower().startswith(cleaned_input.lower())
# ]

# rec_df = pd.DataFrame()
# matched_index = None
# subject_error = []

# if closest_matches:
#     matched_course = closest_matches[0]
#     matched_index = df[df['Clean_title'] == matched_course].index[0]
# else:
#     suggestions = df[df['Clean_title'].str.match(rf'\b{cleaned_input}\b', case=False, na=False)]
#     if suggestions.empty:
#         subject_error = [{"error": f"No courses found for the subject: {subject_inp}"}]
#     else:
#         matched_index = suggestions.index[0]

# if matched_index is not None:
#     scores = list(enumerate(cosine_mat[matched_index]))

#     # Dynamic keyword relevance scoring
#     core_keyword = cleaned_input.lower().strip()

#     for idx, score in scores:
#         course_title = df.iloc[idx]['Clean_title'].lower()

#         if core_keyword in course_title.split():
#             scores[idx] = (idx, score + 1.0)  # Exact match boost
#         elif core_keyword in course_title:
#             scores[idx] = (idx, score + 0.5)  # Partial match boost
#         else:
#             scores[idx] = (idx, score * 0.3)  # Irrelevant content penalty

#     sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
#     filtered_scores = [i for i in sorted_scores if i[1] >= 0.4]

#     recommended_indices = [i[0] for i in filtered_scores if i[0] != matched_index][:8]
#     recommended_scores = [i[1] for i in filtered_scores if i[0] != matched_index][:8]

#     rec_df = df.iloc[recommended_indices].copy()
#     rec_df['Similarity_Score'] = recommended_scores

# # Level filtering
# if level_input.lower() in ["advance", "advanced"]:
#     level_filtered = rec_df[rec_df['level'].str.contains("All Levels", case=False, na=False)].reset_index(drop=True)
# else:
#     level_filtered = rec_df[rec_df['level'].str.contains(level_input, case=False, na=False)].reset_index(drop=True)

# # Error handling for level filter
# level_error = []
# if level_filtered.empty:
#     level_error = [{"error": f"No courses found for the level: {level_input}"}]

# # Final result
# if level_filtered.empty and not subject_error:
#     subject_error = [{"error": f"No similar courses found for: {subject_inp}"}]


# def fetch_youtube_links(subject, level):
#     youtube_data = []
#     try:
#         for url in search(f"{subject} {level} tutorial site:youtube.com"):
#             if "youtube.com/watch" in url and len(youtube_data) < 3:
#                 response = requests.get(url)
#                 soup = BeautifulSoup(response.text, 'html.parser')
#                 title = soup.title.string if soup.title else "Unknown Title"
#                 youtube_data.append({"title": title, "link": url, "tags": "YouTube Link"})

#         if not youtube_data:
#             youtube_data = [{"error": "No YouTube links found."}]
#     except Exception as e:
#         youtube_data = [{"error": "YouTube link error", "details": str(e)}]
#     return youtube_data

# def fetch_pdf_links(subject, level):
#     pdf_links = []
#     try:
#         for url in search(f"{subject} {level} filetype:pdf"):
#             if url.endswith('.pdf'):
#                 pdf_links.append({"title": url.split('/')[-1], "link": url, "tags": "PDF Link"})
#                 if len(pdf_links) >= 3:
#                     break
#         if not pdf_links:
#             pdf_links = [{"error": "No PDF links found."}]
#     except Exception as e:
#         pdf_links = [{"error": "PDF link error", "details": str(e)}]
#     return pdf_links

# youtube_links = fetch_youtube_links(subject_inp, level_input)
# pdf_links = fetch_pdf_links(subject_inp, level_input)
# # Error prevention for undefined variables
# youtube_links = fetch_youtube_links(subject_inp, level_input) 
# pdf_links = fetch_pdf_links(subject_inp, level_input) 

# # ========================= integrate here 


# combined_data = {
#     "subject": subject_inp,
#     "level": level_input,
#     "results": youtube_links + pdf_links,
#     "udemy_courses": [
#         {"title": row['course_title'], "link": row['url']} for _, row in rec_df[['course_title', 'url']].iterrows()
#     ] if not rec_df.empty else [],
#     "errors": subject_error + level_error
# }

# with open("combined_links.json", "w") as file:
#     json.dump(combined_data, file, indent=4)

# print("✅ Combined links saved to 'combined_links.json'")






# ======================================== integrated with cousera final working added KNN for student only  =======================================

# pip install -r requirements.txt

# For Student (Programming): python script2.py 1 1 85 5 3 Python
# For Student (Theoretical): python script2.py 1 2 85 5 3 machine_learning
# For Non-student: python script2.py 2 8 3 java

import json
import requests
from bs4 import BeautifulSoup
from googlesearch import search
import pandas as pd
import pickle
import neattext.functions as nfx
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import sys
import difflib

# ---------------- Argument Parsing ------------------
args = sys.argv[1:]
category = int(args[0])

if (category == 1 and len(args) != 6) or (category == 2 and len(args) != 4):
    print("Invalid input. Please provide valid arguments.")
    exit()

# subject_inp = args[-1]  # Last argument is the subject
subject_inp = args[-1].replace("_", " ") 
values = list(map(float, args[2:5] if category == 1 else args[1:3]))

# ---------------- Student Classification ------------------
if category == 1:
    print("Category: Student")
    if args[1] == '1':  # Programming
        print("Type: Programming")
        if len(values) != 3:
            print("Invalid input for Student (Programming). Please provide exactly 3 values for marks, coding_contest, and projects.")
            exit()
        marks, coding_contest, projects = values

        # 🔽 Integrated KNN model loading
        with open('knn_model_practical.pkl', 'rb') as model_file:
            knn = pickle.load(model_file)
        with open('scaler_practical.pkl', 'rb') as scaler_file:
            scaler = pickle.load(scaler_file)

        # 🔽 KNN prediction
        student_scaled = scaler.transform([[marks, coding_contest, projects]])
        knn_prediction = knn.predict(student_scaled)[0]
        level_input = knn_prediction.strip().lower()
        print(f"\n[KNN] Student Practical Classification: {knn_prediction}")

    elif args[1] == '2':  # Theoretical
        print("Type: Theoretical")
        if len(values) != 3:
            print("Invalid input for Student (Theoretical). Please provide exactly 3 values for marks, attendance, and study_hours.")
            exit()
        marks, attendance, study_hours = values
        # ✅ Load the trained model and scaler
        with open('knn_model_theoretical.pkl', 'rb') as model_file:
            knn = pickle.load(model_file)

        with open('scaler_theoretical.pkl', 'rb') as scaler_file:
            scaler = pickle.load(scaler_file)

        student_scaled = scaler.transform([[marks, attendance, study_hours]])
        knn_prediction = knn.predict(student_scaled)[0]
        level_input = knn_prediction.strip().lower()
        print(f"\n[KNN] Student Practical Classification: {knn_prediction}")
        
    else:
        print("Invalid input for Student. Second argument must be 1 (Programming) or 2 (Theoretical).")
        exit()

# ---------------- Non-Student Classification ------------------
elif category == 2:
    print("Category: Non-student")
    if len(values) != 2:
        print("Invalid input for Non-student. Please provide exactly two values: experience and certifications.")

    experience, certifications = values

    with open('knn_model_non_stud.pkl', 'rb') as model_file:
        knn = pickle.load(model_file)

    with open('scaler_non_stud.pkl', 'rb') as scaler_file:
        scaler = pickle.load(scaler_file)

    input_scaled = scaler.transform([[certifications, experience]])
    prediction_non_stud = knn.predict(input_scaled)
    level_input = prediction_non_stud[0].strip().lower()

    print(f"\nPredicted Category: {level_input}")
    print(f"Subject: {subject_inp}")

else:
    print("Invalid category. Use 1 for Student or 2 for Non-student.")

# # ====================== Udemy course recomender =======================================
df = pd.read_csv('UdemyCleanedTitle.csv')

df['Clean_title'] = df['course_title'].astype(str).apply(lambda x: nfx.remove_stopwords(x.lower().strip()))
df['Clean_title'] = df['Clean_title'].apply(nfx.remove_special_characters)

tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(df['Clean_title'])

cosine_mat = cosine_similarity(tfidf_matrix)

cleaned_input = nfx.remove_stopwords(subject_inp.lower().strip())
cleaned_input = nfx.remove_special_characters(cleaned_input)

course_index = pd.Series(df.index, index=df['Clean_title']).drop_duplicates()

cutoff_value = 0.8 if len(cleaned_input) < 5 else 0.5

closest_matches = [
    match for match in difflib.get_close_matches(cleaned_input, course_index.index, n=3, cutoff=cutoff_value)
    if match.lower().startswith(cleaned_input.lower())
]

rec_df = pd.DataFrame()
matched_index = None
subject_error = []

if closest_matches:
    matched_course = closest_matches[0]
    matched_index = df[df['Clean_title'] == matched_course].index[0]
else:
    suggestions = df[df['Clean_title'].str.match(rf'\b{cleaned_input}\b', case=False, na=False)]
    if suggestions.empty:
        subject_error = [{"error": f"No courses found for the subject: {subject_inp}"}]
    else:
        matched_index = suggestions.index[0]

if matched_index is not None:
    scores = list(enumerate(cosine_mat[matched_index]))

    core_keyword = cleaned_input.lower().strip()

    for idx, score in scores:
        course_title = df.iloc[idx]['Clean_title'].lower()

        if core_keyword in course_title.split():
            scores[idx] = (idx, score + 1.0)  
        elif core_keyword in course_title:
            scores[idx] = (idx, score + 0.5)  
        else:
            scores[idx] = (idx, score * 0.3)  

    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
    filtered_scores = [i for i in sorted_scores if i[1] >= 0.4]

    recommended_indices = [i[0] for i in filtered_scores if i[0] != matched_index][:8]
    recommended_scores = [i[1] for i in filtered_scores if i[0] != matched_index][:8]

    rec_df = df.iloc[recommended_indices].copy()
    rec_df['Similarity_Score'] = recommended_scores

if 'level' in rec_df.columns:
    if level_input.lower() in ["advance", "advanced"]:
        level_filtered = rec_df[rec_df['level'].str.contains("All Levels", case=False, na=False)].reset_index(drop=True)
    else:
        level_filtered = rec_df[rec_df['level'].str.contains(level_input, case=False, na=False)].reset_index(drop=True)
else:
    print("Error: 'level' column not found in rec_df")
    level_filtered = pd.DataFrame()  

level_error = []
if level_filtered.empty:
    level_error = [{"error": f"No courses found for the level: {level_input}"}]

if level_filtered.empty and not subject_error:
    subject_error = [{"error": f"No similar courses found for: {subject_inp}"}]

# =============================== web scrapping ================================
def fetch_youtube_links(subject, level):
    youtube_data = []
    try:
        for url in search(f"{subject} {level} tutorial site:youtube.com"):
            if "youtube.com/watch" in url and len(youtube_data) < 3:
                response = requests.get(url)
                soup = BeautifulSoup(response.text, 'html.parser')
                title = soup.title.string if soup.title else "Unknown Title"
                youtube_data.append({"title": title, "link": url, "tags": "YouTube Link"})

        if not youtube_data:
            youtube_data = [{"error": "No YouTube links found."}]
    except Exception as e:
        youtube_data = [{"error": "YouTube link error", "details": str(e)}]
    return youtube_data

def fetch_pdf_links(subject, level):
    pdf_links = []
    try:
        for url in search(f"{subject} {level} filetype:pdf"):
            if url.endswith('.pdf'):
                pdf_links.append({"title": url.split('/')[-1], "link": url, "tags": "PDF Link"})
                if len(pdf_links) >= 3:
                    break
        if not pdf_links:
            pdf_links = [{"error": "No PDF links found."}]
    except Exception as e:
        pdf_links = [{"error": "PDF link error", "details": str(e)}]
    return pdf_links

youtube_links = fetch_youtube_links(subject_inp, level_input)
pdf_links = fetch_pdf_links(subject_inp, level_input)

youtube_links = fetch_youtube_links(subject_inp, level_input) 
pdf_links = fetch_pdf_links(subject_inp, level_input) 

# =================================================== cousera recommender ============================================
# Example input
# subject_inp = "machine learning"  
# level_input = "intermediate" 

cousera_df = pd.read_csv('Coursera_Cleaned_Updated.csv')

cousera_df.rename(columns={"Course Name": "course_title", "Difficulty Level": "level", "Course URL": "url"}, inplace=True)

cousera_df['Clean_title'] = cousera_df['course_title'].astype(str).apply(lambda x: nfx.remove_stopwords(x.lower().strip()))
cousera_df['Clean_title'] = cousera_df['Clean_title'].apply(nfx.remove_special_characters)

cousera_tfidf = TfidfVectorizer()
cousera_tfidf_matrix = cousera_tfidf.fit_transform(cousera_df['Clean_title'])

cousera_cosine_mat = cosine_similarity(cousera_tfidf_matrix)

cousera_cleaned_input = nfx.remove_stopwords(subject_inp.lower().strip())
cousera_cleaned_input = nfx.remove_special_characters(cousera_cleaned_input)

course_index = pd.Series(cousera_df.index, index=cousera_df['Clean_title']).drop_duplicates()

cousera_cutoff_value = 0.8 if len(cousera_cleaned_input) < 5 else 0.5

cousera_closest_matches = [
    cousera_match for cousera_match in difflib.get_close_matches(cousera_cleaned_input, course_index.index, n=5, cutoff=cousera_cutoff_value)
    if cousera_match.lower().startswith(cousera_cleaned_input.lower())
]

cousera_rec_df = pd.DataFrame()
cousera_matched_index = None
cousera_subject_error = []

if cousera_closest_matches:
    cousera_matched_course = cousera_closest_matches[0]
    cousera_matched_index = cousera_df[cousera_df['Clean_title'] == cousera_matched_course].index[0]
else:
    cousera_suggestions = cousera_df[cousera_df['Clean_title'].str.contains(rf'\b{cousera_cleaned_input}\b', case=False, na=False)]
    if cousera_suggestions.empty:
        cousera_subject_error = [{"error": f"No courses found for the subject: {subject_inp}"}]
    else:
        cousera_matched_index = cousera_suggestions.index[0]

if cousera_matched_index is not None:
    cousera_scores = list(enumerate(cousera_cosine_mat[cousera_matched_index]))

    core_keyword = cousera_cleaned_input.lower().strip()

    for cousera_idx, cousera_score in cousera_scores:
        course_title = cousera_df.iloc[cousera_idx]['Clean_title'].lower()

        if core_keyword in course_title.split():
            cousera_scores[cousera_idx] = (cousera_idx, cousera_score + 1.0)  
        elif core_keyword in course_title:
            cousera_scores[cousera_idx] = (cousera_idx, cousera_score + 0.5)  
        else:
            cousera_scores[cousera_idx] = (cousera_idx, cousera_score * 0.3)  

    cousera_sorted_scores = sorted(cousera_scores, key=lambda x: x[1], reverse=True)
    cousera_filtered_scores = [i for i in cousera_sorted_scores if i[1] >= 0.4]

    cousera_recommended_indices = [i[0] for i in cousera_filtered_scores if i[0] != cousera_matched_index]
    cousera_recommended_scores = [i[1] for i in cousera_filtered_scores if i[0] != cousera_matched_index]

    cousera_rec_df = cousera_df.iloc[cousera_recommended_indices].copy()
    cousera_rec_df['Similarity_Score'] = cousera_recommended_scores

cousera_level_filtered = cousera_rec_df[cousera_rec_df['level'].str.contains(level_input, case=False, na=False)].reset_index(drop=True)

if cousera_level_filtered.empty:
    cosuera_level_error = [{"error": f"No courses found for the level: {level_input}"}]
else:
    cosuera_level_error = []

if cousera_level_filtered.empty and not cousera_subject_error:
    cousera_subject_error = [{"error": f"No similar courses found for: {subject_inp}"}]

# if not cousera_level_filtered.empty:
#     print(cousera_level_filtered[['course_title', 'url', 'level']])
# else:
#     print(cousera_subject_error + cousera_level_error)

#  ======================================= Links frim GFG,tpoinetech, tutorialspoint ======================== 
results = []

domains = ["geeksforgeeks.org", "tpointtech.com", "tutorialspoint.com"]
domain_friendly = {
    "geeksforgeeks.org": "Geeksforgeeks",
    "tpointtech.com": "Tpointtech",
    "tutorialspoint.com": "Tutorialspoint"
}
num_results = 10

for domain in domains:
    query = f"site:{domain} {subject_inp} {level_input}"
    try:
        urls = list(search(query, num_results=num_results))
    except Exception as e:
        urls = []
    
    for url in urls:
        try:
            response = requests.get(url, timeout=10)
            if response.status_code != 200:
                continue
            soup = BeautifulSoup(response.text, 'html.parser')
            if level_input in soup.get_text().lower():
                results.append({
                    "link": url,
                    "website": domain_friendly.get(domain, domain)
                })
        except Exception as e:
            continue

combined_data = {
    "subject": subject_inp,
    "level": level_input,
    "results": youtube_links + pdf_links,
    "udemy_courses": [
        {"title": row['course_title'], "link": row['url']} for _, row in rec_df[['course_title', 'url']].iterrows()
    ] if not rec_df.empty else [],
    "coursera_courses": [
        {"title": row['course_title'], "link": row['url']} for _, row in cousera_level_filtered[['course_title', 'url']].iterrows()
    ] if not cousera_level_filtered.empty else [],
    "errors": subject_error + level_error
}

combined_data["links"] = results

with open("combined_links.json", "w") as file:
    json.dump(combined_data, file, indent=4)

print("Combined links saved")