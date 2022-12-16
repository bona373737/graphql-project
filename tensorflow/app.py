from flask import Flask  # 서버 구현을 위한 Flask 객체 import
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import
import tensorflow as tf;
from flask import request;

app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
api = Api(app)  # Flask 객체에 Api 객체 등록

tf.model = tf.keras.Sequential()
tf.model.add(tf.keras.layers.Dense(units=1, input_dim=1))

@api.route('/result')  # 데코레이터 이용, '/hello' 경로에 클래스 등록
class HelloWorld(Resource):
    def get(self): 
        tf.model.load_weights('./weights') 
        print(tf.model.predict([[float(request.args.get("nana"))]]))
        result = tf.model.predict([[float(request.args.get("nana"))]])
        # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        return {'result':str(result[0][0])}

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=80)


