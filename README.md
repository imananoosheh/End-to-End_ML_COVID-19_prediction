# End-to-End_ML_COVID-19_prediction
### Introduction 
It is important to have a good overview on all the data and information related to COVID-19 for preventing the spread of the virus further in various societies and areas around the globe.
This App uses various technologies like Django, AsterixDB, ReactJS and Machine learning techniques like Polynomial Regression to pipline a predict based on an already available and existing database on COVID-19 confirmed cases. The predictions can be made for each country differently and charts are created to demonstrate the predictions better. By choosing this app as our project, we hope to contribute as much as we can to stop the outbreak and end this pandemic situation.
### Existing Related Work
Our project is based on a conference paper published on June 2018 named [ End-to-End Machine Learning with Apache AsterixDB](https://www.researchgate.net/publication/325131872_End-to-End_Machine_Learning_with_Apache_AsterixDB "Article Link"). The article explains how Apache AsterixDB, an opensource Big Data Management System can help to reduce the burden involved in using machine learning algorithms in Big Data Analytics. 

### Techniques Related to Advanced Database 
In this project, we have used Apache AsterixDB which is an open source Big Data Management System that provides distributed data management for large-scale, semi-structured data. It was an interesting tool to use because first of all it has a very flexible data model that can handle different data types efficiently. It also provides a feature called Data Feeds, AsterixDB provides “data feeds” for ingesting/parsing/storing data from external data sources with scalability and fault tolerance. And last but not least you can create External User Defined Functions which are useful for use cases in which a user wants to perform complex operations on stored data that cannot be neatly expressed in a declarative query language.
### Demo 
As demonstrated below, the application uses Polynomial Regression degree 7 to predict the future data for the prototype, but in the final version the degree range is chosen by the user. 
![Console ScreenShot](https://raw.githubusercontent.com/imananoosheh/End-to-End_ML_COVID-19_prediction/master/media/image_2020-08-05_23-10-59.png)

A sample of the results of the prediction can also be seen in the chart below.
![Console ScreenShot](https://raw.githubusercontent.com/imananoosheh/End-to-End_ML_COVID-19_prediction/master/media/Figure_2.png)


The UI which is created with ReactJS creates an understandable chart for the user. The user can choose the desired country and view the predictions based on the existing data. (The ScreenShot is created using dummy data.)
![Console ScreenShot](https://raw.githubusercontent.com/imananoosheh/End-to-End_ML_COVID-19_prediction/master/media/Screenshot_2020-08-05%20React%20App.png)
