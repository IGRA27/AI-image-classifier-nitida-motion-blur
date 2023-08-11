from  flask import Flask, jsonify, request
import numpy as np 
from PIL import Image
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
app.config['ENV'] = 'production'

model = tf.keras.models.load_model('modelo.h5')

CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    # Procesa la imagen recibida
    img = Image.open(request.files['image']).resize((256, 256)) #redimenciona a 256x256
    img = np.array(img) / 255.0 #normalizamos
    img = np.expand_dims(img, axis=0) #agrega una dimencion adicional (1,256,256,3)

    # Realiza la predicción utilizando el modelo cargado
    prediction = model.predict(img)[0]
    #Obtiene la etiqueta de la predicción
    label = 'Es nítida' if prediction[0] > prediction[1] and prediction[0] > prediction[2] else \
            'Está en movimiento' if prediction[1] > prediction[0] and prediction[1] > prediction[2] else \
            'Es gaussiana'
    
    # Devuelve la respuesta en formato JSON
    return jsonify({'prediction': label})


#Numevo metodo
@app.route('/inicio', methods=['GET'])
def inicio():
    #Mandamos un mensaje
    label = 'Aplicación funcionando :)'
    return jsonify({'message': label})

if __name__ == '__main__':
    app.run(debug=True)

