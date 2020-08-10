import requests, csv, sys

if __name__ == '__main__':
    
    confirmed_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
    death_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'
    recovered_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv'
    asterix_url = 'http://localhost:19002/query/service'
    
    data = {
    'pretty': 'true',
    'client_context_id': 'xyz',
    'statement': '''DROP DATAVERSE COVID IF EXISTS;'''
    }

    response = requests.post(asterix_url, data=data)
    print((response.text))


    data = {
    'pretty': 'true',
    'client_context_id': 'xyz',
    'statement': '''CREATE DATAVERSE COVID;'''
    }

    response = requests.post(asterix_url, data=data)
    print((response.text))

    data = {
    'pretty': 'true',
    'client_context_id': 'xyz',
    'statement': '''USE COVID;'''
    }

    response = requests.post(asterix_url, data=data)
    print((response.text))


    data = {
    'pretty': 'true',
    'client_context_id': 'xyz',
    'statement': '''DROP TYPE COVIDDataType IF EXISTS;'''
    }

    response = requests.post(asterix_url, data=data)
    print((response.text))


    data = {
    'pretty': 'true',
    'client_context_id': 'xyz',
    'statement': '''DROP TYPE CountryDataType IF EXISTS;'''
    }

    response = requests.post(asterix_url, data=data)
    print((response.text))


    data = {
    'pretty': 'true',
    'client_context_id': 'xyz',
    'statement': '''DROP TYPE ProvinceDataType IF EXISTS;'''
    }


    response = requests.post(asterix_url, data=data)
    print((response.text))

    data = {
    'pretty': 'true',
    'client_context_id': 'xyz',
    'statement': '''DROP TYPE LocationDataType IF EXISTS;'''
    }

    response = requests.post(asterix_url, data=data)
    print((response.text))

    data = {
    'pretty': 'true',
    'client_context_id': 'xyz',
    'statement': '''CREATE TYPE ProvinceDataType AS closed
                    {
                        date: string,
                        province: string,
                        country: string,
                        confirmed: int,
                        death: int,
                        recovered: int
                    };'''
    }

    response = requests.post(asterix_url, data=data)
    print((response.text))

    data = {
    'pretty': 'true',
    'client_context_id': 'xyz',
    'statement': '''CREATE TYPE LocationDataType AS closed
                    {
                        location_name: string,
                        longitude: float,
                        latitude: float
                    };'''
    }

    response = requests.post(asterix_url, data=data)
    print((response.text))

    data = {
    'pretty': 'true',
    'client_context_id': 'xyz',
    'statement': '''CREATE TYPE CountryDataType as open
                {
                        country_name: string,
                        pd: [ProvinceDataType]
                };'''
    }

    response = requests.post(asterix_url, data=data)
    print((response.text))



    data = {
    'pretty': 'true',
    'client_context_id': 'xyz',
    'statement': '''CREATE DATASET LocationDataset(LocationDataType)
                        PRIMARY KEY location_name;
                    
                    CREATE DATASET ProvinceDataset(ProvinceDataType)
                        PRIMARY KEY date;
                    
                    CREATE DATASET CountryDataset(CountryDataType)
                        PRIMARY KEY country_name;'''
    }

    response = requests.post(asterix_url, data=data)
    print((response.text))



    with requests.Session() as s:
        confirmed_data = s.get(confirmed_url)

        decoded_confirmed_data = confirmed_data.content.decode('utf-8')

        cd = csv.reader(decoded_confirmed_data.splitlines(), delimiter=',')
        confirmed_list = list(cd)
        

        # for row in confirmed_list[1:]:
        #     if row[0]:
        #         location_name = '"' + row[0] + '"'
        #     else:
        #         location_name = '"' + row[1] + '"'
                
        #     statement = '''
        #         INSERT INTO LocationDataset
        #         ([
        #         {"location_name":%s, "longitude":%f, "latitude":%f}
        #         ]);''' %(location_name, float(row[2]), float(row[3]))

        #     data = {
        #     'pretty': 'true',
        #     'client_context_id': 'xyz',
        #     'statement': statement
        #     }
            
        #     response = requests.post(asterix_url, data=data)
        #     print((response.text))

        
        #### retrieving death data
        death_data = s.get(death_url)

        decoded_death_data = death_data.content.decode('utf-8')

        dd = csv.reader(decoded_death_data.splitlines(), delimiter=',')
        death_list = list(dd)
        print(death_list[0])

        ### retrieving recovered data

        recovered_data = s.get(recovered_url)

        decoded_recovered_data = recovered_data.content.decode('utf-8')

        rd = csv.reader(decoded_recovered_data.splitlines(), delimiter=',')
        recovered_list = list(rd)
        print(recovered_list[0])


        dates = confirmed_list[0][4:]
        for j in range(1, len(confirmed_list)):
            i = 0
            if confirmed_list[j][0]:
                province = '"' + confirmed_list[j][0] + '"'
            else:
                province = 'NA'
            
            for k in range(4, len(confirmed_list[j])):
                try:
                    statement = '''
                        INSERT INTO ProvinceDataset
                        ([
                        {"date": %s, "province": %s, "country": %s, "confirmed": %d, "death": %d, "recovered": %d}
                        ]);''' %(dates[i], province, confirmed_list[j][1], int(confirmed_list[j][k]), int(death_list[j][k]), int(recovered_list[j][k]))
                except IndexError:
                    i = i + 1
                    continue

                print(statement + '\n')
                i = i + 1

                data = {
                'pretty': 'true',
                'client_context_id': 'xyz',
                'statement': statement
                }
                
                response = requests.post(asterix_url, data=data)
                print((response.text))



