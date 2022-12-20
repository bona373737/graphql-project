import tensorflow as tf;
import numpy as np;
import matplotlib.pyplot as plt
import datetime
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'

################################################################### 테스트데이터_GraphQL API 호출하기
# graphql api호출시 서버측에서 authorize token 없이 해당 api요청 받을 수 있도록 수정필요.
# https://me2nuk.com/Python-requests-module-example/
# operationName지정 추가 필요
import requests
query = """
query getDviceCountByDate{
  getDviceCountByDate{
    date
    count
  }
}
"""
uri = "http://localhost:4000/"
# headers = {"Authorization": "Bearer YOUR API KEY"}
response = requests.post(uri,json={'query':query, 'operationName':'getDviceCountByDate'})
print(response.status_code)

jsonData = response.json()
count = jsonData['data']['getDviceCountByDate']['count']
dateStr = jsonData['data']['getDviceCountByDate']['date'] 
date=[]
for item in dateStr:
    date.append(float(item.replace('-','')))
print(date)
print(count)


################################################################## 테스트데이터 CSV 파일 로드하기
# rowData = np.loadtxt('./originData.csv',delimiter=',',dtype=np.float64, encoding='utf-8')
# # 장비등록일
# date = rowData[:,0]
# # print(date, '\n', len(date), date.shape)
# #해당날짜 등록장비총계
# count=rowData[:,1]
# print(count, '\n', len(count), count.shape)


################################################################### 테스트데이터_DB직접연결 데이터 가져오기 
# https://walking-jamong.tistory.com/22
# import pymysql
# def dbconnect():
#     conn = pymysql.connect(
#         host='127.0.0.1',
#         user='root',
#         password='123qwe!@#',
#         db='ojt',
#         charset='utf8'
#     )
#     return conn

# def getTestData(conn):
#     cur = conn.cursor()
#     sql = "select date_format(reg_date,'%Y-%m-%d') as date, count(device_no) as count from devices group by date;"
#     cur.execute(sql)
#     # 리턴타입 : tuple
#     # (('2022-12-10', 1), ('2022-12-11', 2), ('2022-12-12', 1), ('2022-12-14', 7), ('2022-12-15', 6), ('2022-12-16', 4))
#     results = cur.fetchall()
#     print(results)
#     # 리턴받은 튜블데이터에서 날짜와 총계 추출
#     global date
#     date=[]
#     rowDate = [x[0] for x in results]
#     for item in rowDate:
#         date.append(float(item.replace('-','')))

#     global count
#     count = [x[1] for x in results]
#     print(date)
#     print(count)

# def main():
#     conn=dbconnect()
#     getTestData(conn)
#     conn.close()

# main()

#################################################################### 준비된 x축데이터(date), y축데이터(count)로 학습시키기 
tf.model = tf.keras.Sequential()

tf.model.add(tf.keras.layers.Dense(units=1, input_dim=1, activation='sigmoid'))
# tf.model.add(tf.keras.layers.Activation('linear'))
tf.model.summary()

tf.model.compile(loss='mse', optimizer=tf.keras.optimizers.SGD(learning_rate=1e-5))

#tensorboard --logdir=./logs/fit
log_dir = os.path.join(".", "logs", "fit", datetime.datetime.now().strftime("%Y%m%d-%H%M%S"))
tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=log_dir,histogram_freq=0, write_graph=True, write_images=True)
tf.model.fit(date, count, epochs=2000, callbacks=[tensorboard_callback])

tf.model.save_weights('./weights')
print("검증!! ", tf.model.predict([[20221230.0]]))
# print(tf.model.get_weights())

plt.plot(date,count,'b.-')
plt.show()