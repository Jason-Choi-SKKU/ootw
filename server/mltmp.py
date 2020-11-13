from sklearn.linear_model import LinearRegression
import pandas as pd

df = pd.DataFrame({
    'max': [35,1,24,18],
    'min':    [28,-5,16,8],
    'feel': [0,0,0,0],
    'ootwindex':[10,170,50,70]
})
high = 16
low = 8
xData = df[['max','min','feel']]
yData = df[['ootwindex']]
print(xData,yData)
mlr = LinearRegression()
mlr.fit(xData,yData)
print(mlr.predict([[high,low,0]]))