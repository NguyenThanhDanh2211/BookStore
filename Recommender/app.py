# import pickle
# import streamlit as st
# import numpy as np


# st.header('Book Recommender System Using Machine Learning')
# model = pickle.load(open('./artifacts/model.pkl','rb'))
# book_names = pickle.load(open('./artifacts/books_name.pkl','rb'))
# final_rating = pickle.load(open('./artifacts/final_rating.pkl','rb'))
# book_pivot = pickle.load(open('./artifacts/book_pivot.pkl','rb'))


# def fetch_poster(suggestion):
#     book_name = []
#     ids_index = []
#     poster_url = []

#     for book_id in suggestion:
#         book_name.append(book_pivot.index[book_id])

#     for name in book_name[0]: 
#         ids = np.where(final_rating['title'] == name)[0][0]
#         ids_index.append(ids)

#     for idx in ids_index:
#         url = final_rating.iloc[idx]['img_url']
#         poster_url.append(url)

#     return poster_url



# def recommend_book(book_name):
#     books_list = []
#     book_id = np.where(book_pivot.index == book_name)[0][0]
#     distance, suggestion = model.kneighbors(book_pivot.iloc[book_id,:].values.reshape(1,-1), n_neighbors=6 )

#     poster_url = fetch_poster(suggestion)
    
#     for i in range(len(suggestion)):
#             books = book_pivot.index[suggestion[i]]
#             for j in books:
#                 books_list.append(j)
#     return books_list , poster_url       



# selected_books = st.selectbox(
#     "Type or select a book from the dropdown",
#     book_names
# )

# if st.button('Show Recommendation'):
#     recommended_books,poster_url = recommend_book(selected_books)
#     col1, col2, col3, col4, col5 = st.columns(5)
#     with col1:
#         st.text(recommended_books[1])
#         st.image(poster_url[1])
#     with col2:
#         st.text(recommended_books[2])
#         st.image(poster_url[2])

#     with col3:
#         st.text(recommended_books[3])
#         st.image(poster_url[3])
#     with col4:
#         st.text(recommended_books[4])
#         st.image(poster_url[4])
#     with col5:
#         st.text(recommended_books[5])
#         st.image(poster_url[5])

#----------------------------------

from flask import Flask, jsonify, request
import pickle
import numpy as np

app = Flask(__name__)

# Load model and data
model = pickle.load(open('./artifacts/model.pkl','rb'))
book_names = pickle.load(open('./artifacts/books_name.pkl','rb'))
final_rating = pickle.load(open('./artifacts/final_rating.pkl','rb'))
book_pivot = pickle.load(open('./artifacts/book_pivot.pkl','rb'))

def fetch_poster(suggestion):
    poster_urls = []
    for book_id in suggestion:
        book_name = book_pivot.index[book_id]
        # Tìm index của sách trong DataFrame final_rating
        idx = np.where(final_rating['title'] == book_name)[0][0]
        # Lấy URL của poster từ DataFrame final_rating
        poster_url = final_rating.iloc[idx]['img_url']
        poster_urls.append(poster_url)
    return poster_urls

def recommend_book(book_name):
    books_list = []
    book_id = np.where(book_pivot.index == book_name)[0][0]
    # Sử dụng model để tìm các sách được đề xuất
    distance, suggestion = model.kneighbors(book_pivot.iloc[book_id,:].values.reshape(1,-1), n_neighbors=6)
    
    # Lấy URL của poster cho các sách được đề xuất
    poster_urls = fetch_poster(suggestion[0])
    
    for i in range(len(suggestion[0])):
        books_list.append(book_pivot.index[suggestion[0][i]])
    return books_list, poster_urls


@app.route('/recommend', methods=['POST'])
def get_recommendation():
    # print("yes")
    data = request.get_json()
    selected_book = data.get('selected_book')
    if not selected_book:
        return jsonify({'error': 'No book selected'}), 400

    recommended_books, poster_url = recommend_book(selected_book)

    # Chuẩn bị dữ liệu response
    response_data = {
        'recommended_books': recommended_books[1:],
        'poster_urls': poster_url[1:]
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
