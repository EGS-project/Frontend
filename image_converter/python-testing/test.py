from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/v1/convert/to-jpeg', methods=['POST'])
def convert_to_jpeg():
    file = request.files['image']  # access the uploaded file using the key 'image'
    print(request.args.get('format'))
    print(request.args.get('size'))
    
    file.save('image.jpg')

    return 'File uploaded successfully'

    
if __name__ == '__main__':
    app.run(debug=True)