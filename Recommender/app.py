from flask import Flask, jsonify, request
import pickle
import numpy as np

from flask_cors import CORS  # Import thêm Flask CORS

app = Flask(__name__)
CORS(app, origins='*')  # Kích hoạt Flask CORS

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

@app.route('/recommend', methods=['GET', 'POST'])  # Thêm phương thức POST
def get_recommendation():
    if request.method == 'POST':
        data = request.get_json()
        selected_book = data.get('selected_book')
        if not selected_book:
            return jsonify({'error': 'No book selected'}), 400
        
        recommended_books, poster_urls = recommend_book(selected_book)

        return jsonify({'recommended_books': recommended_books, 'poster_urls': poster_urls})
    else:
        return jsonify({'error': 'Method not allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True, port=5000)  
