# -*- coding: utf-8 -*-
"""
Created on Wed Jul 29 13:20:17 2020

@author: iman anooshehpour
"""
# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.metrics import mean_absolute_error, r2_score, mean_squared_error
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
import json


#   Function to calculate accuracy
def CalculateAccuracy(y_test, Y_predicted): 
    
    #   Mean Absolute Error (MAE)
    MAE = mean_absolute_error(y_test, Y_predicted)
    
    #   Correlation Coefficient of Regression (r^2)
    CCoR = r2_score(y_test, Y_predicted)
    
    #   Mean Squared Error
    MSE = mean_squared_error(y_test, Y_predicted)
    
    measurements = "The Mean Absolute Error: " + str(MAE)+ "\nCorrelation Coefficient of Regression (r²): " + str(CCoR) + "\nMean Squared Error : " + str(MSE)
    
    return measurements

def predict(countryName, statType):
    """
    

    Parameters
    ----------
    countryName : STRING
        from list of country used in JohnHopkins Github updating dataset.
    statType : STRING
        'confirmed', 'deaths', or 'recovered'.

    Returns
    -------
    nextWeekPredictionDict : DICTIONARY
            #JSON structure
            # nextWeekPredictionDict['data'] 
            # ({
            #     'countryName' : str(countryName), # :string of input country name
            #     'statType' : str(statType), # :float or ndarray of floats of input stat type ('confirmed', 'deaths', or 'recovered')
            #     'nextWeek' : nextWeek, # :list of next 7 days of predicted statType value 
            #     'errorRange' : errorRange, # :float or ndarray of floats as an range of error = value(+/-)errorRange
            #     'PolyRegDeg' : degree # :int of maximum degree of polynomial regression fit to the data
            #     })

    """
    # Manual Input
    #countryName = 'Canada'
    #statType = 'confirmed'
    
    ## Data Preprocessing
    # Loading the dataset from Github API ( https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series )
    url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_'+ str(statType) +'_global.csv'
    df = pd.read_csv(url)
    
    # Dropping unnecesary datas
    dataset = df.drop(['Province/State', 'Lat', 'Long'], axis=1)
    
    # Concatinating the values for each day in countries with more than 1 entries to have the country's data in whole
    newDataset = {}
    for index, country in enumerate(dataset['Country/Region']):
        if country in newDataset.keys():
            newDataset[country][1:] += dataset.iloc[index,1:].values
        else:
            newDataset[country] = dataset.iloc[index].values
    
    # Calculating daily values by substracting privious day's value from current value
    rawdata = newDataset[str(countryName)][1:]
    X = np.arange(0, len(rawdata), 1)
    y= np.array(rawdata, dtype=int)
    newy = []
    for i in range(0, len(y)):
        if i == 0:
            newy.append(y[i])
            continue
        newy.append(int(y[i]) - int(y[i-1]))
    
    y = np.array(newy, dtype=int)
    
    ##removing the 0s values from the begining of records
    recordNo = len(y)
    for i in range(0, recordNo, 1):
        if y[0] != 0:
            break;
        else:
            y = np.delete(y,0)
            
    recordNo = len(y)
    X = np.arange(0, len(y), 1)
    
    ## Polynomial Regression Fitting
    # Fitting Polynomial Regression to the dataset
    degree = 7
    poly_reg = PolynomialFeatures(degree = degree)
    X_poly = poly_reg.fit_transform(X.reshape(-1, 1))
    poly_reg.fit(X_poly, y)
    lin_reg_2 = LinearRegression()
    lin_reg_2.fit(X_poly, y)
    
    # Error Calculation till up to now
    X_grid = np.arange(0, len(y), 1).reshape(-1, 1)
    Y_predicted = lin_reg_2.predict(poly_reg.fit_transform(X_grid))
    measurements = CalculateAccuracy(y, Y_predicted)
    print("\n"+measurements)
    
    # Storing next weeks predicted values in an array
    nextWeekIndex = np.arange(len(y), len(y)+7, 1).reshape(-1, 1)
    nextWeek = lin_reg_2.predict(poly_reg.fit_transform(nextWeekIndex))
    errorRange = mean_absolute_error(y, Y_predicted)
    
    # Visualising the Polynomial Regression results (for higher resolution and smoother curve)
    plt.scatter(X, y, color = 'red')
    plt.plot(X_grid, Y_predicted, color = 'blue')
    plt.title('COVID-19 stat prediction (Using Polynomial Regression, with degree of ' + str(degree) + ')\n' + CalculateAccuracy(y, Y_predicted))
    plt.xlabel('Dates')
    plt.ylabel(str(statType))
    # plt.show()
    
    ## Crafting a JSON file as a return output
    #JSON structure
    # nextWeekPredictionDict['data'] 
    # ({
    #     'countryName' : str(countryName), # :string of input country name
    #     'statType' : str(statType), # :float or ndarray of floats of input stat type ('confirmed', 'deaths', or 'recovered')
    #     'nextWeek' : nextWeek, # :list of next 7 days of predicted statType value 
    #     'errorRange' : errorRange, # :float or ndarray of floats as an range of error = value(+/-)errorRange
    #     'PolyRegDeg' : degree # :int of maximum degree of polynomial regression fit to the data
    #     })
    
    nextWeekPredictionDict = {}
    nextWeekPredictionDict['data'] = []
    nextWeekPredictionDict['data'].append({
        'countryName' : str(countryName),
        'statType' : str(statType),
        'nextWeek' : nextWeek,
        'errorRange' : errorRange,
        'PolyRegDeg' : degree
        })
     
    
    return nextWeekPredictionDict

## Test Calls
predict('Canada', 'deaths')
predict('Canada', 'confirmed')
predict('Austria', 'confirms')
predict('Italy', 'deaths')
