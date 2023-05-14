#########################
###### Imports ######
#########################
import sqlite3
import os
from dotenv import load_dotenv
import psycopg2
import psycopg2.extras as ext
#########################
###### Imports END ######
#########################


#####################
###### Configs ######
#####################
DATABASE_URL = os.environ.get('DATABASE_URL')
#########################
###### Configs END ######
#########################

####################
###### Models ######
####################
class ProductsTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        #self.conn = sqlite3.connect("spdb.db")
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute("""

                CREATE TABLE IF NOT EXISTS products
                    (
                        id    INTEGER NOT NULL,
                        title TEXT NOT NULL,
                        price INTEGER NOT NULL,
                        img   TEXT NOT NULL,
                        avail BOOLEAN 
                    ) 
                            
                        """)
                        #avail is short for availability

    def display(self):
        self.cur.execute("""

                SELECT * 
                FROM products
                        
                        """)
        self.records = self.cur.fetchall()
        return self.records

    def search(self, id):
        self.cur.execute(f"""

                SELECT * 
                FROM products 
                WHERE id = '{id}'

                        """)
        self.record = self.cur.fetchone()
        return self.record

    def searchImg(self, id):
        self.cur.execute(f"""

                SELECT img 
                FROM products 
                WHERE id = '{id}'

                        """)
        self.record = self.cur.fetchone()
        return self.record

    def insert(self, id, title, price, img, avail):
        if (id == "" or price == "" or title == "" or img == ""):
            raise Exception("One of the entries is empty")
        self.cur.execute(f"""

                INSERT INTO products
                            (
                                id,
                                title,
                                price,
                                img,
                                avail
                            )
                VALUES
                            {( 
                                id , 
                                title, 
                                price, 
                                img,
                                avail
                            )};

                        """)
        self.conn.commit()

    def update(self, id, title, price, avail):
        self.cur.execute(f"""

                UPDATE products 
                SET title = '{title}' 
                WHERE id = '{id}'
                        
                        """)
        self.cur.execute(f"""

                UPDATE products 
                SET price = '{price}' 
                WHERE id = '{id}'

                        """)
        self.cur.execute(f"""

                UPDATE products 
                SET avail = '{avail}' 
                WHERE id = '{id}'

                        """)
        self.conn.commit()
    

    def updateImage(self, id, img):
        print("yes it does run")
        self.cur.execute(f"""

                UPDATE products 
                SET img = '{img}' 
                WHERE id = '{id}'

                        """)
        self.conn.commit()

    def delete(self, id):
        if (id == None):
            raise Exception("You have to select an id to delete its values")
        self.cur.execute(f"""
            
                DELETE FROM products 
                WHERE id = '{id}'
            
                        """)
        self.conn.commit()

    def __del__(self):
        self.conn.close()


class PromocodesTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        #self.conn = sqlite3.connect("spdb.db")
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute("""

                CREATE TABLE IF NOT EXISTS promocodes
                    (
                        id     INTEGER NOT NULL,
                        code   TEXT NOT NULL,
                        amount FLOAT NOT NULL,
                        exp    TEXT
                    ) 
            
                        """)

    def display(self):
        self.cur.execute("""

                SELECT * 
                FROM promocodes

                        """)
        self.records = self.cur.fetchall()
        return self.records

    def search(self, id):
        self.cur.execute(f"""

                SELECT * 
                FROM promocodes 
                WHERE id = '{id}'

                        """)
        self.record = self.cur.fetchone()
        return self.record

    def insert(self, id, code, amount, exp):
        if (id == "" or code == "" or amount == ""):
            raise Exception("One of the entries is empty")
        if exp == None or exp == "None" or exp == "": exp = '9999-09-09'
        self.cur.execute(f"""

                INSERT INTO promocodes
                            (
                                id,
                                code,
                                amount,
                                exp
                            )
                VALUES
                            {( 
                                id, 
                                code , 
                                amount,
                                exp
                            )};

                        """)
        self.conn.commit()

    def update(self, id, code, amount, exp):
        if exp == None or exp == "None" or exp == "": exp = '9999-09-09'
        self.cur.execute(f"""

                UPDATE promocodes 
                SET code = '{code}' 
                WHERE id = '{id}'
                        
                        """)
        self.cur.execute(f"""

                UPDATE promocodes 
                SET amount = '{amount}' 
                WHERE id = '{id}'

                        """)

        self.cur.execute(f"""

                UPDATE promocodes 
                SET exp = '{exp}' 
                WHERE id = '{id}'

                        """)
        self.conn.commit()

    def delete(self, id):
        if (id == None):
            raise Exception("You have to select an id to delete its values")
        self.cur.execute(f"""

                DELETE FROM promocodes 
                WHERE id = '{id}'
        
                        """)
        self.conn.commit()

    def __del__(self):
        self.conn.close()


class StoreInfoTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        #self.conn = sqlite3.connect("spdb.db")
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute("""
                CREATE TABLE IF NOT EXISTS storeInfo
                    (
                        storeName TEXT NOT NULL,
                        storeDetails TEXT NOT NULL,
                        billDetails text,
                        storeNum BIGINT NOT NULL,
                        storeCurr TEXT NOT NULL
                        
                    )
                            """)

    def search(self, infoType):

        if infoType == 'name':

            self.cur.execute(f"""

                    SELECT storeName 
                    FROM storeInfo

                            """)

        elif infoType == 'details':

            self.cur.execute(f"""

                SELECT storeDetails
                FROM storeInfo

                        """)

        elif infoType == 'billDetails':

            self.cur.execute(f"""

                SELECT billDetails
                FROM storeInfo

                        """)

        elif infoType == 'num':

            self.cur.execute(f"""

                SELECT storeNum
                FROM storeInfo

                        """)

        elif infoType == 'storeCurr':

            self.cur.execute(f"""

                SELECT storeCurr
                FROM storeInfo

                        """)

        else:
            raise Exception("Error in variable 'infoType'")

        self.record = self.cur.fetchone()
        return self.record

    def insert(self, inputData):
        if (inputData == None):
            raise Exception("One of the entries is empty")

        self.cur.execute(f"""
                INSERT INTO storeInfo 
                            (
                                storeName,
                                storeDetails,
                                billDetails,
                                storenum,
                                storeCurr
                            ) 
                VALUES 
                            (
                                '{inputData["storeName"]}',
                                '{inputData["storeDetails"]}',
                                '{inputData["billDetails"]}',
                                '{inputData["storeNum"]}',
                                '{inputData["storeCurr"]}'
                            );
                        
                        """)

        self.conn.commit()

    def update(self, infoType, inputData):

        if infoType == 'name':

            self.cur.execute(f"""

                UPDATE storeInfo 
                SET storeName = '{inputData}'
                        
                        """)
        elif infoType == 'details':

            self.cur.execute(f"""

                UPDATE storeInfo 
                SET storeDetails = '{inputData}'
                        
                        """)

        elif infoType == 'billDetails':

            self.cur.execute(f"""

                UPDATE storeInfo 
                SET billDetails = '{inputData}'
                        
                        """)

        elif infoType == 'num':

            self.cur.execute(f"""

                UPDATE storeInfo 
                SET storeNum = '{inputData}'

                        """)
            
        elif infoType == 'storeCurr':

            self.cur.execute(f"""

                UPDATE storeInfo 
                SET storeCurr = '{inputData}'

                        """)

        else:
            raise Exception("Error in variable 'infoType'")

        self.conn.commit()

    def delete(self, infoType, inputData):
        if (inputData == None):
            raise Exception("You have to select an id to delete its values")

        if infoType == 'name':

            self.cur.execute(f"""

                DELETE FROM storeInfo 
                SET storeName = '{inputData}'
                        
                        """)
        elif infoType == 'details':

            self.cur.execute(f"""

                DELETE FROM storeInfo 
                SET storeDetails = '{inputData}'
                        
                        """)
        elif infoType == 'billDetails':

            self.cur.execute(f"""

                DELETE FROM storeInfo 
                SET billDetails = '{inputData}'
                        
                        """)

        elif infoType == 'num':

            self.cur.execute(f"""

                DELETE FROM storeInfo 
                SET storeNum = '{inputData}'

                        """)

        elif infoType == 'storeCurr':

            self.cur.execute(f"""

                DELETE FROM storeInfo 
                SET storeCurr = '{inputData}'

                        """)

        else:
            raise Exception("Error in variable 'infoType'")

        self.conn.commit()

    def __del__(self):
        self.conn.close()

     

# Store Customizations Table
class StoreCustomTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        #self.conn = sqlite3.connect("spdb.db")
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute("""

                CREATE TABLE IF NOT EXISTS storethemes
                    (
                        storetheme TEXT NOT NULL
                    ) 
                        """)

    def search(self):
        self.cur.execute(f"""
        
                SELECT * 
                FROM storeThemes

                        """)
        self.record = self.cur.fetchone()
        return self.record

    def insert(self, storeTheme):
        if (storeTheme == ""):
            raise Exception("One of the entries is empty")
        self.cur.execute(f"""

                 INSERT INTO storeThemes 
                             (
                                 storeTheme
                             ) 
                 VALUES 
                             (
                        '{storeTheme}'
                             );
        
                       """)
        self.conn.commit()

    def update(self, storeTheme):
        self.cur.execute(f"""
        
                UPDATE storeThemes 
                SET storeTheme = '{storeTheme}'
        
                        """)
        self.conn.commit()

    def delete(self, storeTheme):
        if (storeTheme == None):
            raise Exception("You have to select an id to delete its values")
        self.cur.execute(f"""

                DELETE FROM storeThemes 
                WHERE storeTheme = '{storeTheme}'

                        """)
        self.conn.commit()

    def __del__(self):
        self.conn.close()



class billingHistoryTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        #self.conn = sqlite3.connect("spdb.db")
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute("""

                CREATE TABLE IF NOT EXISTS billingHistory
                    (
                        id TEXT NOT NULL,
                        bill TEXT NOT NULL,
                        billDate TEXT NOT NULL
                    ) 
                        """)

    def display(self):
        self.cur.execute(f"""
        
                SELECT * 
                FROM billingHistory

                        """)
        self.records = self.cur.fetchall()
        return self.records

    def search(self, bill):
        self.cur.execute(f"""

                SELECT * 
                FROM billingHistory 
                WHERE bill = '{bill}'

                        """)
        self.record = self.cur.fetchone()
        return self.record

    def searchId(self, id):
        self.cur.execute(f"""

                SELECT * 
                FROM billingHistory 
                WHERE id = '{id}'

                        """)
        self.record = self.cur.fetchone()
        return self.record


    def insert(self, id, bill, billDate):
        if (bill == ""):
            raise Exception("One of the entries is empty")
        self.cur.execute(f"""

                 INSERT INTO billingHistory 
                             (
                                 id,
                                 bill,
                                 billDate
                             ) 
                 VALUES 
                             (
                        '{id}',
                        '{bill}',
                        '{billDate}'
                             );
        
                       """)
        self.conn.commit()

    def delete(self, id):
        if (id == None):
            raise Exception("You have to select an id to delete its values")
        self.cur.execute(f"""

                DELETE FROM billingHistory 
                WHERE id = '{id}'
        
                        """)
        self.conn.commit()

    def __del__(self):
        self.conn.close()
########################
###### Models END ######
########################