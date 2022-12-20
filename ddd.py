import numpy as np
import tensorflow as tf
import datetime
import os

# x_train = [20221212, 20221213, 20221214, 20221214]
# y_train = [1, 2, 4, 8]
x_train = [1, 2, 3, 4]
y_train = [0, -1, -2, -3]

tf.model = tf.keras.Sequential()
# units == output shape, input_dim == input shape
tf.model.add(tf.keras.layers.Dense(units=1, input_dim=1, activation='sigmoid'))

#Stochastic gradient descent - 확률적 경사 하강법, lr == learning rate
sgd = tf.keras.optimizers.SGD(lr=0.1)  
tf.model.compile(loss='mse', optimizer=sgd)  # mse == mean_squared_error, 1/m * sig (y'-y)^2

# prints summary of the model to the terminal
tf.model.summary()

log_dir = os.path.join(".", "logg", "fit", datetime.datetime.now().strftime("%Y%m%d-%H%M%S"))
tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=log_dir,histogram_freq=0, write_graph=True, write_images=True)

# fit() executes training
tf.model.fit(x_train, y_train, epochs=200, callbacks=[tensorboard_callback])

# predict() returns predicted value
y_predict = tf.model.predict([5])
print(y_predict)