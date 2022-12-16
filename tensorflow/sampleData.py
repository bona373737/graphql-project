import tensorflow as tf;
import numpy as np;
import tensorboard as tb;

rowData = np.loadtxt('./originData.csv',delimiter=',',dtype=np.float64, encoding='utf-8')

# 장비등록일
date = rowData[:,0]
# date1 = np.split(date,len(date))
# print(date, '\n', len(date), date.shape)
print(date)

#해당날짜 장비총계
count=rowData[:,1]
print(count, '\n', len(count), count.shape)

tf.model = tf.keras.Sequential()
# activation function doesn't have to be added as a separate layer. Add it as an argument of Dense() layer
tf.model.add(tf.keras.layers.Dense(units=1, input_dim=1, activation='sigmoid'))
# tf.model.add(tf.keras.layers.Activation('linear'))
tf.model.summary()

tf.model.compile(loss='mse', optimizer=tf.keras.optimizers.SGD(lr=1e-5))
tf.model.fit(date, count, epochs=2000)

tf.model.save_weights('./weights')
# # Ask my score
print("검증!! ", tf.model.predict([[20211230]]))


print(tf.model.get_weights())
